-- =====================================================================
-- Atlas · Migration 0002 — tenancy bootstrap provisioner
-- ---------------------------------------------------------------------
-- Realizes SDS §5.6 (lazy, server-side, idempotent, atomic tenancy
-- cold start) as the hardened SECURITY DEFINER routine chosen by the
-- S3.3 security review (Option B). It is invoked by `features/club`
-- (Sprint 3 code) on the first authenticated request that resolves to
-- NO Membership.
--
-- MIGRATION SAFETY — recorded choices:
--   * FORWARD-ONLY. No down migration. Rollback = drop the function in a
--     later corrective migration or `db reset`; never edit this file
--     after it is applied.
--   * Creates STRUCTURE ONLY (one function + its grants). It creates NO
--     rows (SDS §5.6.4 "It creates structure, never rows"). The four
--     bootstrap rows are written at runtime, per call, by this routine.
--   * Does NOT open any INSERT policy on `club`/`membership`; default-deny
--     (Migration 0001 / S3.2, proven by S3.8) is preserved. This routine
--     is the ONLY authorised writer of the cold-start quartet, and it is
--     bound to auth.uid() — it can only ever provision the caller's own
--     club-of-one.
--   * No service-role. No trigger on auth.users. Auth flow untouched.
--
-- Target: Supabase (requires auth.uid(), auth.users, the authenticated role).
-- Produces EXACTLY the DBDS structures: User (app_user), Club, owner
-- Membership, RecordingAssertion(subject=club). No Profile. No Assignment.
-- Player is not touched.
-- =====================================================================

create or replace function public.provision_current_user_club()
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_account uuid := auth.uid();     -- identity source: the JWT, never a client argument
    v_user_id uuid;
    v_club_id uuid;
    v_email   text;
begin
    -- Must be an authenticated caller.
    if v_account is null then
        raise exception 'provision_current_user_club: not authenticated'
            using errcode = '28000';
    end if;

    -- Fast path (cheap steady state): already provisioned -> no-op.
    select u.id into v_user_id
    from public.app_user u
    where u.account_reference = v_account;

    if v_user_id is not null then
        select m.club_id into v_club_id
        from public.membership m
        where m.user_id = v_user_id and m.status = 'active'
        order by m.granted_at asc
        limit 1;

        if v_club_id is not null then
            return v_club_id;                       -- idempotent: existing club-of-one
        end if;
    end if;

    -- Slow path: serialize per account so concurrent first requests cannot
    -- mint two clubs (idempotency anchor = one User per account, Migration 0001).
    perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtext(v_account::text));

    -- Double-checked: re-read after acquiring the lock.
    select u.id into v_user_id
    from public.app_user u
    where u.account_reference = v_account;

    if v_user_id is not null then
        select m.club_id into v_club_id
        from public.membership m
        where m.user_id = v_user_id and m.status = 'active'
        order by m.granted_at asc
        limit 1;

        if v_club_id is not null then
            return v_club_id;
        end if;
    end if;

    -- display_name / club name default to the account email (editable in
    -- Settings later — Sprint 3 impl note, sprint-03-players.md §6).
    select au.email into v_email
    from auth.users au
    where au.id = v_account;

    -- 1) User (self-owned). Create only if missing.
    if v_user_id is null then
        insert into public.app_user (account_reference, display_name)
        values (v_account, pg_catalog.coalesce(v_email, v_account::text))
        on conflict (account_reference) do nothing
        returning id into v_user_id;

        if v_user_id is null then
            select u.id into v_user_id
            from public.app_user u
            where u.account_reference = v_account;
        end if;
    end if;

    -- 2) Club (self-owned): the independent coach is a club-of-one.
    insert into public.club (name, kind, status)
    values (pg_catalog.coalesce(v_email, v_account::text), 'independent', 'active')
    returning id into v_club_id;

    -- 3) Membership: owner, granted by self.
    insert into public.membership (user_id, club_id, role, status, granted_by)
    values (v_user_id, v_club_id, 'owner', 'active', v_user_id);

    -- 4) RecordingAssertion: the club is the Recording Authority for itself.
    insert into public.recording_assertion
        (club_id, subject_kind, subject_id, asserted_by, status)
    values (v_club_id, 'club', v_club_id, v_user_id, 'active');

    return v_club_id;
end;
$$;

-- Least privilege: only authenticated callers may execute it; never anon/public.
revoke all on function public.provision_current_user_club() from public;
revoke all on function public.provision_current_user_club() from anon;
grant execute on function public.provision_current_user_club() to authenticated;

comment on function public.provision_current_user_club() is
'Atlas tenancy bootstrap (SDS §5.6). Idempotent, atomic, concurrency-safe. '
'Provisions the caller''s own club-of-one (User, Club[independent], owner '
'Membership, RecordingAssertion[subject=club]) bound to auth.uid(). '
'SECURITY DEFINER with empty search_path; execute granted to authenticated only.';

-- =====================================================================
-- End of Migration 0002. One function + grants. No rows. No policy change.
-- =====================================================================
