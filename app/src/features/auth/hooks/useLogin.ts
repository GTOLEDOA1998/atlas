"use client";

import { useCallback, useState } from "react";
import { AuthError } from "@supabase/supabase-js";
import { authService } from "../auth.service";
import { toAuthError } from "../auth.errors";
import type { LoginCredentials } from "../auth.types";

interface UseLoginResult {
  login: (data: LoginCredentials) => Promise<boolean>;
  loading: boolean;
  error: AuthError | null;
}

/**
 * Signs in an existing Atlas user using Supabase Authentication.
 */
export function useLogin(): UseLoginResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  const login = useCallback(
    async ({ email, password }: LoginCredentials): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        const { error: signInError } = await authService.signIn(
          email,
          password
        );

        if (signInError) {
          setError(signInError);
          return false;
        }

        return true;
      } catch (thrown) {
        setError(
          toAuthError(thrown, "An unexpected error occurred during login")
        );
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    login,
    loading,
    error,
  };
}
