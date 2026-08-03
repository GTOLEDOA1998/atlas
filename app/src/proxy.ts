import { NextResponse, type NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/proxy-client";
import {
  DEFAULT_AUTHENTICATED_REDIRECT,
  LOGIN_ROUTE,
  REDIRECT_QUERY_PARAM,
  isGuestOnlyRoute,
  isProtectedRoute,
  resolveSafeRedirect,
} from "@/features/auth/auth.constants";

/**
 * Server-side session refresh plus optimistic route guards.
 *
 * This runs before any rendering, so unauthenticated requests never receive
 * protected HTML. `ProtectedRoute` still guards on the client as a second
 * layer, and any real authorization belongs in Supabase RLS.
 */
export async function proxy(request: NextRequest) {
  const { user, response } = await updateSession(request);
  const { pathname, search } = request.nextUrl;

  if (!user && isProtectedRoute(pathname)) {
    return redirectPreservingCookies(request, response, LOGIN_ROUTE, {
      [REDIRECT_QUERY_PARAM]: `${pathname}${search}`,
    });
  }

  if (user && isGuestOnlyRoute(pathname)) {
    // An authenticated user landing on /login?redirect=/x was on their way to
    // /x — honour that instead of dumping them on the overview.
    const redirectTo = resolveSafeRedirect(
      request.nextUrl.searchParams.get(REDIRECT_QUERY_PARAM)
    );

    return redirectPreservingCookies(
      request,
      response,
      redirectTo ?? DEFAULT_AUTHENTICATED_REDIRECT
    );
  }

  return response;
}

/**
 * Redirects without dropping any auth cookies that `updateSession` rotated —
 * losing them causes random logouts that are painful to debug.
 *
 * `target` is a same-origin path that may carry its own query string. It comes
 * either from a route constant or from `resolveSafeRedirect`, so it can never
 * point at another host.
 */
function redirectPreservingCookies(
  request: NextRequest,
  response: NextResponse,
  target: string,
  query: Record<string, string> = {}
) {
  const [targetPathname, targetSearch = ""] = target.split("?");

  const url = request.nextUrl.clone();
  url.pathname = targetPathname;
  url.search = targetSearch;

  Object.entries(query).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const redirect = NextResponse.redirect(url);

  response.cookies.getAll().forEach((cookie) => {
    redirect.cookies.set(cookie);
  });

  return redirect;
}

export const config = {
  matcher: [
    /*
     * Every path except:
     * - /auth/callback  (owns its own cookie writes during the PKCE exchange)
     * - Next.js internals and static assets
     */
    "/((?!auth/callback|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)",
  ],
};
