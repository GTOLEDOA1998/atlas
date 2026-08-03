import { redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  DEFAULT_AUTHENTICATED_REDIRECT,
  DEFAULT_UNAUTHENTICATED_REDIRECT,
} from "@/features/auth/auth.constants";

/**
 * Entry point. Sends visitors to the app or to sign-in depending on their
 * session, decided on the server so there is no flash of the wrong screen.
 */
export default async function Home() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  redirect(
    user ? DEFAULT_AUTHENTICATED_REDIRECT : DEFAULT_UNAUTHENTICATED_REDIRECT
  );
}
