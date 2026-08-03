"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useForgotPassword } from "../hooks/useForgotPassword";
import { getAuthErrorMessage } from "../auth.errors";
import { LOGIN_ROUTE } from "../auth.constants";
import {
  authErrorBannerClassName,
  authInputClassName,
  authSuccessBannerClassName,
} from "./authFormStyles";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

/**
 * Requests a password recovery email.
 * UI only. All business logic lives inside useForgotPassword().
 */
export function ForgotPasswordForm() {
  const { requestReset, loading, error, success } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(requestReset)}
      noValidate
      className="mx-auto w-full max-w-md space-y-6 px-4 sm:px-0"
      aria-labelledby="forgot-password-form-title"
    >
      <div className="space-y-2 text-center sm:text-left">
        <h1
          id="forgot-password-form-title"
          className="text-2xl font-semibold tracking-tight text-foreground"
        >
          Reset your password
        </h1>

        <p className="text-sm text-muted-foreground">
          Enter your email and we&apos;ll send you a link to choose a new
          password.
        </p>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="forgot-password-email"
          className="text-sm font-medium text-foreground"
        >
          Email
        </label>

        <input
          id="forgot-password-email"
          type="email"
          autoComplete="email"
          inputMode="email"
          disabled={loading || success}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={
            errors.email ? "forgot-password-email-error" : undefined
          }
          className={authInputClassName}
          placeholder="you@example.com"
          {...register("email")}
        />

        {errors.email && (
          <p
            id="forgot-password-email-error"
            role="alert"
            className="text-sm text-destructive"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      {error && (
        <p role="alert" aria-live="polite" className={authErrorBannerClassName}>
          {getAuthErrorMessage(error)}
        </p>
      )}

      {success && (
        <p
          role="status"
          aria-live="polite"
          className={authSuccessBannerClassName}
        >
          If an account exists for that email, a reset link is on its way.
          Check your inbox.
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={loading || success}
        className="h-10 w-full"
        aria-busy={loading}
      >
        {loading ? "Sending link..." : "Send reset link"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Remembered it?{" "}
        <Link
          href={LOGIN_ROUTE}
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Back to sign in
        </Link>
      </p>
    </form>
  );
}
