"use client";

import { useCallback, useState } from "react";
import { AuthError } from "@supabase/supabase-js";
import { authService } from "../auth.service";

interface RegisterData {
  email: string;
  password: string;
}

interface UseRegisterResult {
  register: (data: RegisterData) => Promise<void>;
  loading: boolean;
  error: AuthError | null;
  success: boolean;
}

/**
 * Registers a new Atlas user using Supabase Authentication.
 */
export function useRegister(): UseRegisterResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const [success, setSuccess] = useState(false);

  const register = useCallback(
    async ({ email, password }: RegisterData): Promise<void> => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        const { error: signUpError } = await authService.signUp(
          email,
          password
        );

        if (signUpError) {
          setError(signUpError);
          return;
        }

        setSuccess(true);
      } catch (thrown) {
        setError(
          thrown instanceof AuthError
            ? thrown
            : new AuthError(
                thrown instanceof Error
                  ? thrown.message
                  : "An unexpected error occurred during registration"
              )
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    register,
    loading,
    error,
    success,
  };
}