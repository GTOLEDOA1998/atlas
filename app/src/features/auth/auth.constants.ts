import { APP_ROUTE_PREFIXES, ROUTES } from "@/config/routes";

export const LOGIN_ROUTE = "/login";
export const REGISTER_ROUTE = "/register";
export const FORGOT_PASSWORD_ROUTE = "/forgot-password";
export const RESET_PASSWORD_ROUTE = "/reset-password";
export const AUTH_CALLBACK_ROUTE = "/auth/callback";
export const OVERVIEW_ROUTE = ROUTES.overview;

export const DEFAULT_AUTHENTICATED_REDIRECT = OVERVIEW_ROUTE;
export const DEFAULT_UNAUTHENTICATED_REDIRECT = LOGIN_ROUTE;

/** Query param carrying the page a user was trying to reach before signing in. */
export const REDIRECT_QUERY_PARAM = "redirect";

/** Query param used by the callback route to report a failed exchange. */
export const AUTH_ERROR_QUERY_PARAM = "error";

/**
 * Route prefixes that require an authenticated session.
 *
 * Sourced from the application route registry so the proxy protects exactly
 * the set of routes the shell renders. A new authenticated route is protected
 * by adding it to `APP_ROUTE_PREFIXES`, not by editing this file.
 */
export const PROTECTED_ROUTE_PREFIXES = APP_ROUTE_PREFIXES;

/**
 * Routes that only make sense while signed out.
 *
 * `/reset-password` is deliberately excluded: the recovery link creates a
 * session, so the user *is* authenticated by the time they land there.
 */
export const GUEST_ONLY_ROUTES = [
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  FORGOT_PASSWORD_ROUTE,
] as const;

export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export function isGuestOnlyRoute(pathname: string): boolean {
  return GUEST_ONLY_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

/**
 * Normalises an untrusted redirect target into a safe same-origin path.
 *
 * Anything that could send the user to another host — an absolute URL, a
 * protocol-relative `//evil.com`, or a backslash variant browsers normalise to
 * one — is rejected.
 */
export function resolveSafeRedirect(
  value: string | null | undefined
): string | null {
  if (!value) {
    return null;
  }

  const normalized = value.replace(/\\/g, "/");

  if (!normalized.startsWith("/") || normalized.startsWith("//")) {
    return null;
  }

  return normalized;
}
