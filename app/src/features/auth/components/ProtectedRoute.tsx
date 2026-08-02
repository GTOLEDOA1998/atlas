"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../useAuth";
import { LOGIN_ROUTE } from "../auth.constants";

interface Props {
  children: React.ReactNode;
}

/**
 * Renders children only for authenticated users.
 * Redirects to /login otherwise, once the session has finished loading.
 */
export function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(LOGIN_ROUTE);
    }
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
