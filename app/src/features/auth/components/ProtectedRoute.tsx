"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../useAuth";
import { LOGIN_ROUTE, REDIRECT_QUERY_PARAM } from "../auth.constants";

interface Props {
  children: React.ReactNode;
}

/**
 * Renders children only for authenticated users.
 * Redirects to /login otherwise, once the session has finished loading.
 *
 * The proxy already blocks unauthenticated requests server-side; this is the
 * client-side layer that also covers sessions expiring mid-navigation.
 */
export function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading || user) {
      return;
    }

    // Read the location directly instead of useSearchParams(): this component
    // wraps a statically prerendered layout, and useSearchParams() would force
    // it into a Suspense boundary.
    const target = `${window.location.pathname}${window.location.search}`;
    const loginUrl = new URL(LOGIN_ROUTE, window.location.origin);
    loginUrl.searchParams.set(REDIRECT_QUERY_PARAM, target);

    router.replace(`${loginUrl.pathname}${loginUrl.search}`);
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex min-h-screen items-center justify-center bg-background"
      >
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
