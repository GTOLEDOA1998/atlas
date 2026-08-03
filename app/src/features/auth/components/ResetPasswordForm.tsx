"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "../useAuth";
import { useResetPassword } from "../hooks/useResetPassword";
import { getAuthErrorMessage } from "../auth.errors";
import {
  FORGOT_PASSWORD_ROUTE,
  OVERVIEW_ROUTE,
} from "../auth.constants";
import {
  authErrorBannerClassName,
  authInputClassName,
  authSuccessBannerClassName,
} from "./authFormStyles";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

/**
 * Sets a new password using the session created by a recovery link.
 * UI only. All business logic lives inside useResetPassword().
 */
export function ResetPasswordForm() {
  const { user, loading: sessionLoading } = useAuth();
  const { resetPassword, loading, error, success } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  if (sessionLoading) {
    return (
      <div role="status" aria-live="polite" className="text-center">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  // Reaching this page without a session means the recovery link expired,
  // was already used, or was opened in a different browser.
  if (!user) {
    return (
      <div className="mx-auto w-full max-w-md space-y-4 px-4 text-center sm:px-0">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          This link is no longer valid
        </h1>

        <p className="text-sm text-muted-foreground">
          Password reset links expire after a short while and can only be used
          once. Request a new one to continue.
        </p>

        <Link
          href={FORGOT_PASSWORD_ROUTE}
          className={cn(buttonVariants({ size: "lg" }), "h-10 w-full")}
        >
          Request a new link
        </Link>
      </div>
    );
  }

  const handleReset = async (values: ResetPasswordFormValues) => {
    await resetPassword({ password: values.password });
  };

  return (
    <form
      onSubmit={handleSubmit(handleReset)}
      noValidate
      className="mx-auto w-full max-w-md space-y-6 px-4 sm:px-0"
      aria-labelledby="reset-password-form-title"
    >
      <div className="space-y-2 text-center sm:text-left">
        <h1
          id="reset-password-form-title"
          className="text-2xl font-semibold tracking-tight text-foreground"
        >
          Choose a new password
        </h1>

        <p className="text-sm text-muted-foreground">
          Set a new password for {user.email}.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="reset-password"
            className="text-sm font-medium text-foreground"
          >
            New password
          </label>

          <input
            id="reset-password"
            type="password"
            autoComplete="new-password"
            disabled={loading || success}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={
              errors.password ? "reset-password-error" : undefined
            }
            className={authInputClassName}
            placeholder="At least 8 characters"
            {...register("password")}
          />

          {errors.password && (
            <p
              id="reset-password-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="reset-confirm-password"
            className="text-sm font-medium text-foreground"
          >
            Confirm new password
          </label>

          <input
            id="reset-confirm-password"
            type="password"
            autoComplete="new-password"
            disabled={loading || success}
            aria-invalid={Boolean(errors.confirmPassword)}
            aria-describedby={
              errors.confirmPassword
                ? "reset-confirm-password-error"
                : undefined
            }
            className={authInputClassName}
            placeholder="Re-enter your new password"
            {...register("confirmPassword")}
          />

          {errors.confirmPassword && (
            <p
              id="reset-confirm-password-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      {error && (
        <p role="alert" aria-live="polite" className={authErrorBannerClassName}>
          {getAuthErrorMessage(error)}
        </p>
      )}

      {success ? (
        <div className="space-y-4">
          <p
            role="status"
            aria-live="polite"
            className={authSuccessBannerClassName}
          >
            Your password has been updated.
          </p>

          <Link
            href={OVERVIEW_ROUTE}
            className={cn(buttonVariants({ size: "lg" }), "h-10 w-full")}
          >
            Continue to Atlas
          </Link>
        </div>
      ) : (
        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="h-10 w-full"
          aria-busy={loading}
        >
          {loading ? "Updating password..." : "Update password"}
        </Button>
      )}
    </form>
  );
}
