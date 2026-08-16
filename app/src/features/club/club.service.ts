import { createServerSupabaseClient } from "@/lib/supabase/server";

/**
 * Tenancy bootstrap — the cold start (SDS §5.6).
 *
 * A newly registered coach arrives authenticated but with no `Membership`.
 * This delegates to the hardened `SECURITY DEFINER` routine
 * `provision_current_user_club` (Migration 0002), which atomically and
 * idempotently creates the caller's own club-of-one: `User`, `Club`
 * (independent), owner `Membership`, and the club's `RecordingAssertion`.
 *
 * The routine derives identity from `auth.uid()` server-side — no client
 * input is trusted, and it can only ever provision the *caller's* tenancy.
 * It is safe to call on every authenticated entry: once provisioned it is a
 * cheap no-op that returns the existing club id.
 *
 * Runs under the user's session (anon key + JWT); no service-role is used.
 */
export type ProvisionResult =
  | { ok: true; clubId: string }
  | { ok: false; error: string };

export async function ensureTenancyForCurrentUser(): Promise<ProvisionResult> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.rpc("provision_current_user_club");

  if (error) {
    return { ok: false, error: error.message };
  }

  if (typeof data !== "string") {
    return { ok: false, error: "Bootstrap returned no club id." };
  }

  return { ok: true, clubId: data };
}
