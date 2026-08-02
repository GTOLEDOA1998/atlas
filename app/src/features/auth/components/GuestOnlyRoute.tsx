"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../useAuth";
import { OVERVIEW_ROUTE } from "../auth.constants";

interface Props {
  children: React.ReactNode;
}

/**
 * Renders children only for unauthenticated users.
 * Redirects already-authenticated users to /overview.
 */
export function GuestOnlyRoute({ children }: Props) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace(OVERVIEW_ROUTE);
    }
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
