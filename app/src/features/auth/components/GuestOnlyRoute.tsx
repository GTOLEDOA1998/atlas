"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../useAuth";
import {
  OVERVIEW_ROUTE,
  REDIRECT_QUERY_PARAM,
  resolveSafeRedirect,
} from "../auth.constants";

interface Props {
  children: React.ReactNode;
}

/**
 * Renders children only for unauthenticated users.
 * Redirects already-authenticated users to wherever they were headed, or to
 * /overview when there is no pending destination.
 */
export function GuestOnlyRoute({ children }: Props) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading || !user) {
      return;
    }

    // Read the location directly instead of useSearchParams(): this wraps
    // statically prerendered pages, which useSearchParams() would force into a
    // Suspense boundary.
    const params = new URLSearchParams(window.location.search);
    const redirectTo = resolveSafeRedirect(params.get(REDIRECT_QUERY_PARAM));

    router.replace(redirectTo ?? OVERVIEW_ROUTE);
  }, [loading, user, router]);

  if (loading || user) {
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
