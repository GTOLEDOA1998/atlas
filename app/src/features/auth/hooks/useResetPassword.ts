"use client";

import { useCallback, useState } from "react";
import { AuthError } from "@supabase/supabase-js";

import { authService } from "../auth.service";
import { toAuthError } from "../auth.errors";
import type { ResetPasswordPayload } from "../auth.types";

interface UseResetPasswordResult {
  resetPassword: (data: ResetPasswordPayload) => Promise<boolean>;
  loading: boolean;
  error: AuthError | null;
  success: boolean;
}

/**
 * Sets a new password for the session created by a recovery link.
 */
export function useResetPassword(): UseResetPasswordResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const [success, setSuccess] = useState(false);

  const resetPassword = useCallback(
    async ({ password }: ResetPasswordPayload): Promise<boolean> => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        const { error: updateError } =
          await authService.updatePassword(password);

        if (updateError) {
          setError(updateError);
          return false;
        }

        setSuccess(true);
        return true;
      } catch (thrown) {
        setError(
          toAuthError(
            thrown,
            "An unexpected error occurred while updating your password"
          )
        );
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    resetPassword,
    loading,
    error,
    success,
  };
}
