import { createClient } from "@/lib/supabase/client";
import { AUTH_CALLBACK_ROUTE, RESET_PASSWORD_ROUTE } from "./auth.constants";

/**
 * Builds the absolute URL Supabase should send the user back to after they
 * click a link in an email. Supabase requires an absolute URL here, and it must
 * be listed under Authentication → URL Configuration → Redirect URLs.
 */
function buildCallbackUrl(next?: string): string {
  const url = new URL(AUTH_CALLBACK_ROUTE, window.location.origin);

  if (next) {
    url.searchParams.set("next", next);
  }

  return url.toString();
}

export const authService = {
  async signUp(email: string, password: string) {
    return await createClient().auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: buildCallbackUrl(),
      },
    });
  },

  async signIn(email: string, password: string) {
    return await createClient().auth.signInWithPassword({
      email,
      password,
    });
  },

  async signOut() {
    return await createClient().auth.signOut();
  },

  /** Sends a password recovery email pointing back at /reset-password. */
  async requestPasswordReset(email: string) {
    return await createClient().auth.resetPasswordForEmail(email, {
      redirectTo: buildCallbackUrl(RESET_PASSWORD_ROUTE),
    });
  },

  /** Sets a new password for the currently authenticated (recovery) session. */
  async updatePassword(password: string) {
    return await createClient().auth.updateUser({ password });
  },
};
