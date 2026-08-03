import { NextResponse, type NextRequest } from "next/server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  AUTH_ERROR_QUERY_PARAM,
  DEFAULT_AUTHENTICATED_REDIRECT,
  LOGIN_ROUTE,
  RESET_PASSWORD_ROUTE,
  resolveSafeRedirect,
} from "@/features/auth/auth.constants";

/**
 * Completes the PKCE flow for every email Supabase sends: signup confirmation,
 * password recovery, and magic links. The code in the URL is exchanged for a
 * session and written to cookies, then the user is sent somewhere useful.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const type = searchParams.get("type");
  const next = resolveSafeRedirect(searchParams.get("next"));

  // Supabase reports link problems (expired, already used) as query params.
  const providerError =
    searchParams.get("error_description") ?? searchParams.get("error");

  if (providerError) {
    return redirectToLoginWithError(origin, providerError);
  }

  if (!code) {
    return redirectToLoginWithError(
      origin,
      "This link is no longer valid. Request a new one and try again."
    );
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return redirectToLoginWithError(origin, error.message);
  }

  const destination =
    next ??
    (type === "recovery" ? RESET_PASSWORD_ROUTE : DEFAULT_AUTHENTICATED_REDIRECT);

  return NextResponse.redirect(`${origin}${destination}`);
}

function redirectToLoginWithError(origin: string, message: string) {
  const url = new URL(LOGIN_ROUTE, origin);
  url.searchParams.set(AUTH_ERROR_QUERY_PARAM, message);

  return NextResponse.redirect(url);
}
