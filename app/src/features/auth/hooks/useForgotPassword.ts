"use client";

import { useCallback, useState } from "react";
import { AuthError } from "@supabase/supabase-js";

import { authService } from "../auth.service";
import { toAuthError } from "../auth.errors";
import type { ForgotPasswordPayload } from "../auth.types";

interface UseForgotPasswordResult {
  requestReset: (data: ForgotPasswordPayload) => Promise<void>;
  loading: boolean;
  error: AuthError | null;
  success: boolean;
}

/**
 * Sends a password recovery email through Supabase Authentication.
 */
export function useForgotPassword(): UseForgotPasswordResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const [success, setSuccess] = useState(false);

  const requestReset = useCallback(
    async ({ email }: ForgotPasswordPayload): Promise<void> => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        const { error: resetError } =
          await authService.requestPasswordReset(email);

        if (resetError) {
          setError(resetError);
          return;
        }

        setSuccess(true);
      } catch (thrown) {
        setError(
          toAuthError(
            thrown,
            "An unexpected error occurred while requesting the reset email"
          )
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    requestReset,
    loading,
    error,
    success,
  };
}
