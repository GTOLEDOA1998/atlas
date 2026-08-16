-- =====================================================================
-- Atlas · Migration 0001 — startup structures
-- ---------------------------------------------------------------------
-- Realizes the seven startup structures (DBDS Part II) and their
-- default-deny access model (DBDS Part IV / SDS §5). Traceable to the
-- approved corpus; no column, constraint, vocabulary or structure is
-- invented. Physical name note: "User" -> app_user (reserved word);
-- Assignment "from"/"until" -> valid_from/valid_until (reserved word).
--
-- MIGRATION SAFETY — recorded choices (SDS §4 / sprint-03 S3.1 DoD):
--   * This migration is FORWARD-ONLY.
--   * There is NO down migration.
--   * Development rollback is by database reset or a new corrective
--     migration — NEVER by editing this file after it is applied.
--   * It creates STRUCTURE ONLY. It creates NO rows: no seed, no
--     bootstrap, no initial club/membership/user/assertion (SDS §5.6.4).
--   * No transaction wrapper (BEGIN/COMMIT) is written here: atomicity
--     of application depends on the migration-application mechanism,
--     which is not yet chosen. To be decided when the migration is
--     applied (S3.1 apply step), not assumed here.
--
-- Target: Supabase (requires the auth schema, auth.uid(), and the
-- authenticated role — present in a Supabase project).
--
-- Bootstrap (cold start: app_user -> club -> membership ->
-- recording_assertion) is deliberately NOT here. It is deferred to
-- S3.3 / features/club per SDS §5.6.4. club and membership therefore
-- have no INSERT policy in this migration.
-- =====================================================================

-- 0 · Extension --------------------------------------------------------
-- Opaque id generation. Idempotent; gen_random_uuid() is core in PG13+.
create extension if not exists pgcrypto;

-- =====================================================================
-- 1 · club  (Fact · tenancy boundary · self-owned)  — DBDS Part II Club
-- =====================================================================
create table public.club (
    id          uuid        primary key default gen_random_uuid(),
    name        text        not null,
    kind        text        not null check (kind in ('independent', 'institution')),
    status      text        not null,   -- status vocabulary is not canonically closed → no CHECK
    created_at  timestamptz not null default now()
);

-- =====================================================================
-- 2 · app_user  ("User" · account + holder identity · NOT club-scoped)
--     — DBDS Part II User · DM-023 (no Profile)
-- =====================================================================
create table public.app_user (
    id                uuid        primary key default gen_random_uuid(),
    account_reference uuid        not null unique
                                  references auth.users (id) on delete restrict,  -- G5: never cascade
    display_name      text        not null,
    locale            text,
    avatar_reference  text,
    created_at        timestamptz not null default now()
    -- credentials are never stored here (owned by authentication)
);

-- =====================================================================
-- 3 · membership  (Decision · contained in club)  — DBDS Part II Membership
-- =====================================================================
create table public.membership (
    id          uuid        primary key default gen_random_uuid(),
    user_id     uuid        not null references public.app_user (id) on delete restrict,
    club_id     uuid        not null references public.club (id)     on delete restrict,
    role        text        not null check (role   in ('owner', 'coach', 'staff')),
    scope       text,       -- scope semantics undefined in the corpus → no CHECK
    status      text        not null check (status in ('active', 'revoked')),
    granted_by  uuid        not null references public.app_user (id) on delete restrict,
    granted_at  timestamptz not null default now(),
    created_at  timestamptz not null default now()
);

-- =====================================================================
-- 4 · player  (Fact · the person · NOT club-scoped)  — DBDS Part II Player · DM-018
-- =====================================================================
create table public.player (
    id          uuid        primary key default gen_random_uuid(),
    user_id     uuid        references public.app_user (id) on delete restrict,  -- 0:1 optional (nullable)
    given_name  text,       -- nullable: business identity is for display/search, not integrity (G2)
    family_name text,       -- nullable: same rationale
    birth_date  date,       -- "birth date or age band" — either may be null; no exclusivity CHECK
    age_band    text,       -- "birth date or age band" — either may be null; no exclusivity CHECK
    created_at  timestamptz not null default now()
    -- dominant hand / playing style / level / stage are ABSENT here
    -- (declared ones live on roster_membership; concluded ones are IdentityMemory)
);

-- =====================================================================
-- 5 · roster_membership  (Fact · person-in-club · tenancy anchor)
--     — DBDS Part II RosterMembership · DM-018
-- =====================================================================
create table public.roster_membership (
    id            uuid        primary key default gen_random_uuid(),
    club_id       uuid        not null references public.club (id)   on delete restrict,
    player_id     uuid        not null references public.player (id) on delete restrict,
    status        text        not null,   -- status vocabulary is not canonically closed → no CHECK
    enrolled_at   timestamptz not null default now(),
    left_at       timestamptz,            -- null while active
    dominant_hand text,                   -- declared, club-scoped, optional
    playing_style text,                   -- declared, club-scoped, optional
    created_at    timestamptz not null default now()
);

-- =====================================================================
-- 6 · assignment  (Decision · contained in roster_membership)
--     — DBDS Part II Assignment · DM-018
--     NOTE: DM-017A is OPEN — no group/session target column exists.
-- =====================================================================
create table public.assignment (
    id                   uuid        primary key default gen_random_uuid(),
    coach_id             uuid        not null references public.app_user (id)          on delete restrict,
    roster_membership_id uuid        not null references public.roster_membership (id) on delete restrict,
    scope                text,       -- scope semantics undefined in the corpus → no CHECK
    authority_kind       text        not null,   -- authority_kind vocabulary not canonically closed → no CHECK
    granted_by           uuid        not null references public.app_user (id)          on delete restrict,
    valid_from           timestamptz not null default now(),
    valid_until          timestamptz,            -- null = open-ended (supports the temporary coach)
    created_at           timestamptz not null default now()
);

-- =====================================================================
-- 7 · recording_assertion  (Decision · permission-to-hold-memory)
--     — DBDS Part II RecordingAssertion · DM-025
--     subject_id is POLYMORPHIC and has NO FK: the assertion is its own
--     L4 tombstone and must outlive its subject (memory-governance §8.2).
-- =====================================================================
create table public.recording_assertion (
    id           uuid        primary key default gen_random_uuid(),
    club_id      uuid        not null references public.club (id)     on delete restrict,
    subject_kind text        not null check (subject_kind in ('club', 'coach', 'group', 'player')),
    subject_id   uuid        not null,   -- polymorphic subject reference; intentionally no FK
    asserted_by  uuid        not null references public.app_user (id) on delete restrict,
    asserted_at  timestamptz not null default now(),
    status       text        not null check (status in ('active', 'revoked')),
    revoked_at   timestamptz,            -- set only on revocation
    created_at   timestamptz not null default now()
);

-- =====================================================================
-- 8 · Uniqueness / partial-unique indexes
-- =====================================================================
-- One active roster membership per (player, club) — DBDS RosterMembership.
create unique index ux_roster_membership_active
    on public.roster_membership (player_id, club_id)
    where status = 'active';

-- One active assertion per (club, subject_kind, subject_id) — DBDS RecordingAssertion.
create unique index ux_recording_assertion_active
    on public.recording_assertion (club_id, subject_kind, subject_id)
    where status = 'active';

-- =====================================================================
-- 9 · Authorization / RLS-lookup indexes (FK columns are not auto-indexed)
-- =====================================================================
create index ix_membership_user_id              on public.membership (user_id);
create index ix_membership_club_id              on public.membership (club_id);
create index ix_roster_membership_club_id       on public.roster_membership (club_id);
create index ix_assignment_roster_membership_id on public.assignment (roster_membership_id);
-- roster_membership(player_id) is served by the leading column of ux_roster_membership_active.
-- recording_assertion(club_id) is served by the leading column of ux_recording_assertion_active.

-- =====================================================================
-- 10 · Enable Row Level Security on all seven (default deny)
-- =====================================================================
alter table public.club                enable row level security;
alter table public.app_user            enable row level security;
alter table public.membership          enable row level security;
alter table public.player              enable row level security;
alter table public.roster_membership   enable row level security;
alter table public.assignment          enable row level security;
alter table public.recording_assertion enable row level security;

-- =====================================================================
-- 11 · Privileges  (GRANT enables an operation; RLS filters the rows;
--      COLUMN-scoped UPDATE enforces SDS §3.3 immutability.)
--      anon receives nothing -> fully denied.
-- =====================================================================
-- Establish a known-zero baseline first: GRANT is additive and does not
-- override pre-existing privileges (e.g. Supabase default privileges on
-- public tables). Without this REVOKE, a default table-level UPDATE would
-- defeat the column-scoped UPDATE grants below. Revoking first makes the
-- grants that follow the complete, intended privilege surface.
revoke all on
    public.club,
    public.app_user,
    public.membership,
    public.player,
    public.roster_membership,
    public.assignment,
    public.recording_assertion
from anon, authenticated, public;

grant select, insert on public.app_user to authenticated;
grant update (display_name, locale, avatar_reference)
                     on public.app_user to authenticated;           -- SDS §3.3 "profile"

grant select         on public.club     to authenticated;           -- no INSERT: bootstrap deferred to S3.3

grant select         on public.membership to authenticated;         -- no INSERT: bootstrap deferred to S3.3

grant select, insert on public.player  to authenticated;
grant update (user_id, given_name, family_name, birth_date, age_band)
                     on public.player  to authenticated;            -- SDS §3.3 "intrinsic attributes only"

grant select, insert on public.roster_membership to authenticated;
grant update (status, left_at)
                     on public.roster_membership to authenticated;  -- SDS §3.3 "status only"

grant select, insert on public.assignment          to authenticated;
grant select, insert on public.recording_assertion to authenticated;
-- No DELETE granted on any table. No table-level UPDATE anywhere.

-- =====================================================================
-- 12 · Policies — default-deny model (SDS §5 / DBDS Part IV)
--      Writes of management data are gated to role='owner' for S3
--      (multi-member role matrix is v1.1). SELECT = visibility for any
--      active member. Assignment/RecordingAssertion INSERT add "= self".
-- =====================================================================

-- 12.1 · app_user — own row only --------------------------------------
create policy app_user_select_own on public.app_user
    for select to authenticated
    using (account_reference = auth.uid());

create policy app_user_insert_own on public.app_user
    for insert to authenticated
    with check (account_reference = auth.uid());

create policy app_user_update_own on public.app_user
    for update to authenticated
    using      (account_reference = auth.uid())
    with check (account_reference = auth.uid());
-- No DELETE policy: closure is a state, never deletion.

-- 12.2 · club — SELECT via active membership only ---------------------
create policy club_select_member on public.club
    for select to authenticated
    using (
        id in (
            select m.club_id from public.membership m
            where m.user_id = (select u.id from public.app_user u
                               where u.account_reference = auth.uid())
              and m.status = 'active'
        )
    );
-- No write policy on club: the cold-start (first club) is deferred to S3.3.

-- 12.3 · membership — SELECT own only ---------------------------------
create policy membership_select_own on public.membership
    for select to authenticated
    using (
        user_id = (select u.id from public.app_user u
                   where u.account_reference = auth.uid())
    );
-- No write policy on membership: the owner membership is deferred to S3.3.

-- 12.4 · player — subject-scoped read; write gated to club owner ------
create policy player_select_rostered on public.player
    for select to authenticated
    using (
        id in (
            select rm.player_id from public.roster_membership rm
            where rm.club_id in (
                select m.club_id from public.membership m
                where m.user_id = (select u.id from public.app_user u
                                   where u.account_reference = auth.uid())
                  and m.status = 'active'
            )
        )
    );

create policy player_insert_owner on public.player
    for insert to authenticated
    with check (
        exists (
            select 1 from public.membership m
            where m.user_id = (select u.id from public.app_user u
                               where u.account_reference = auth.uid())
              and m.role = 'owner' and m.status = 'active'
        )
    );

create policy player_update_owner on public.player
    for update to authenticated
    using (
        id in (
            select rm.player_id from public.roster_membership rm
            where rm.club_id in (
                select m.club_id from public.membership m
                where m.user_id = (select u.id from public.app_user u
                                   where u.account_reference = auth.uid())
                  and m.role = 'owner' and m.status = 'active'
            )
        )
    )
    with check (
        id in (
            select rm.player_id from public.roster_membership rm
            where rm.club_id in (
                select m.club_id from public.membership m
                where m.user_id = (select u.id from public.app_user u
                                   where u.account_reference = auth.uid())
                  and m.role = 'owner' and m.status = 'active'
            )
        )
    );
-- No DELETE policy: removal is directed forgetting, not an RLS delete.

-- 12.5 · roster_membership — SELECT active member; WRITE owner --------
create policy roster_membership_select_tenant on public.roster_membership
    for select to authenticated
    using (
        club_id in (
            select m.club_id from public.membership m
            where m.user_id = (select u.id from public.app_user u
                               where u.account_reference = auth.uid())
              and m.status = 'active'
        )
    );

create policy roster_membership_insert_owner on public.roster_membership
    for insert to authenticated
    with check (
        club_id in (
            select m.club_id from public.membership m
            where m.user_id = (select u.id from public.app_user u
                               where u.account_reference = auth.uid())
              and m.role = 'owner' and m.status = 'active'
        )
    );

create policy roster_membership_update_owner on public.roster_membership
    for update to authenticated
    using (
        club_id in (
            select m.club_id from public.membership m
            where m.user_id = (select u.id from public.app_user u
                               where u.account_reference = auth.uid())
              and m.role = 'owner' and m.status = 'active'
        )
    )
    with check (
        club_id in (
            select m.club_id from public.membership m
            where m.user_id = (select u.id from public.app_user u
                               where u.account_reference = auth.uid())
              and m.role = 'owner' and m.status = 'active'
        )
    );
-- No DELETE policy.

-- 12.6 · assignment — SELECT active member; INSERT owner + self -------
create policy assignment_select_tenant on public.assignment
    for select to authenticated
    using (
        roster_membership_id in (
            select rm.id from public.roster_membership rm
            where rm.club_id in (
                select m.club_id from public.membership m
                where m.user_id = (select u.id from public.app_user u
                                   where u.account_reference = auth.uid())
                  and m.status = 'active'
            )
        )
    );

create policy assignment_insert_self_owner on public.assignment
    for insert to authenticated
    with check (
        coach_id = (select u.id from public.app_user u
                    where u.account_reference = auth.uid())
        and roster_membership_id in (
            select rm.id from public.roster_membership rm
            where rm.club_id in (
                select m.club_id from public.membership m
                where m.user_id = (select u.id from public.app_user u
                                   where u.account_reference = auth.uid())
                  and m.role = 'owner' and m.status = 'active'
            )
        )
    );
-- No UPDATE/DELETE policy: an Assignment is an immutable Decision in S3 scope.

-- 12.7 · recording_assertion — SELECT active member; INSERT owner + self
create policy recording_assertion_select_tenant on public.recording_assertion
    for select to authenticated
    using (
        club_id in (
            select m.club_id from public.membership m
            where m.user_id = (select u.id from public.app_user u
                               where u.account_reference = auth.uid())
              and m.status = 'active'
        )
    );

create policy recording_assertion_insert_owner on public.recording_assertion
    for insert to authenticated
    with check (
        asserted_by = (select u.id from public.app_user u
                       where u.account_reference = auth.uid())
        and club_id in (
            select m.club_id from public.membership m
            where m.user_id = (select u.id from public.app_user u
                               where u.account_reference = auth.uid())
              and m.role = 'owner' and m.status = 'active'
        )
    );
-- No UPDATE/DELETE policy: never edited; it is its own L4 tombstone.

-- =====================================================================
-- End of Migration 0001. Structure only. No rows. Bootstrap: S3.3.
-- =====================================================================
