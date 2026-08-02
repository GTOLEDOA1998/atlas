"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "../useAuth";
import { LOGIN_ROUTE } from "../auth.constants";
import { getAuthErrorMessage } from "../auth.errors";

export function LogoutButton() {
  const { signOut } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error: signOutError } = await signOut();

      if (signOutError) {
        setError(getAuthErrorMessage(signOutError));
        return;
      }

      router.replace(LOGIN_ROUTE);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleLogout}
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? "Signing out..." : "Sign out"}
      </Button>

      {error && (
        <p
          role="alert"
          aria-live="polite"
          className="text-sm text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
}
