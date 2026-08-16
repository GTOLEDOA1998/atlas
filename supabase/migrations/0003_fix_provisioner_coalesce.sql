-- =====================================================================
-- Atlas · Migration 0003 — corrective: provisioner COALESCE fix
-- ---------------------------------------------------------------------
-- Migration 0002 qualified the SQL COALESCE construct as
-- `pg_catalog.coalesce(...)`. COALESCE is a parser-level SQL expression,
-- NOT a function in pg_catalog, so the routine raised
--   42883  function pg_catalog.coalesce(text, text) does not exist
-- on the first real cold-start invocation (before any row was written;
-- the four-record unit rolled back atomically, leaving no residue).
--
-- This migration re-establishes `public.provision_current_user_club()`
-- via CREATE OR REPLACE with a body IDENTICAL to Migration 0002 except
-- the two COALESCE calls are un-qualified (bare `coalesce(...)`). Bare
-- COALESCE is a reserved parser construct and is unaffected by the
-- `search_path = ''` hardening, so the search-path guarantee is kept.
--
-- MIGRATION SAFETY — recorded choices:
--   * FORWARD-ONLY corrective. 0001 and 0002 are NOT edited.
--   * Structure only: one CREATE OR REPLACE. Creates NO rows.
--   * CREATE OR REPLACE preserves the existing owner (postgres) and the
--     existing EXECUTE grant to authenticated. The grant/revoke block
--     from 0002 is re-asserted below verbatim for idempotent safety.
--   * NO change to any 0001 table, column, FK, index, RLS policy or
--     grant. NO change to the RPC contract, SECURITY DEFINER, empty
--     search_path, auth.uid() identity, advisory lock, idempotency or
--     atomicity. The ONLY functional change is the two COALESCE fixes.
--
-- Target: Supabase (auth.uid(), auth.users, the authenticated role).
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
        values (v_account, coalesce(v_email, v_account::text))
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
    values (coalesce(v_email, v_account::text), 'independent', 'active')
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
-- Re-asserted verbatim from Migration 0002 (idempotent).
revoke all on function public.provision_current_user_club() from public;
revoke all on function public.provision_current_user_club() from anon;
grant execute on function public.provision_current_user_club() to authenticated;

comment on function public.provision_current_user_club() is
'Atlas tenancy bootstrap (SDS §5.6). Idempotent, atomic, concurrency-safe. '
'Provisions the caller''s own club-of-one (User, Club[independent], owner '
'Membership, RecordingAssertion[subject=club]) bound to auth.uid(). '
'SECURITY DEFINER with empty search_path; execute granted to authenticated only.';

-- =====================================================================
-- End of Migration 0003. Corrective CREATE OR REPLACE only. No rows.
-- No policy change. No table/column/FK/index/RLS change.
-- =====================================================================
