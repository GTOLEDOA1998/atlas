"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { useRegister } from "../hooks/useRegister";
import { getAuthErrorMessage } from "../auth.errors";
import {
  authErrorBannerClassName,
  authInputClassName,
  authSuccessBannerClassName,
} from "./authFormStyles";

const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

/**
 * Register form for creating a new Atlas account.
 * UI only. All business logic lives inside useRegister().
 */
export function RegisterForm() {
  const { register: registerUser, loading, error, success } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegister = async (values: RegisterFormValues) => {
    await registerUser({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      noValidate
      className="mx-auto w-full max-w-md space-y-6 px-4 sm:px-0"
      aria-labelledby="register-form-title"
    >
      <div className="space-y-2 text-center sm:text-left">
        <h1
          id="register-form-title"
          className="text-2xl font-semibold tracking-tight text-foreground"
        >
          Create your account
        </h1>

        <p className="text-sm text-muted-foreground">
          Enter your details to register with Atlas.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="register-email"
            className="text-sm font-medium text-foreground"
          >
            Email
          </label>

          <input
            id="register-email"
            type="email"
            autoComplete="email"
            inputMode="email"
            disabled={loading || success}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={
              errors.email ? "register-email-error" : undefined
            }
            className={authInputClassName}
            placeholder="you@example.com"
            {...register("email")}
          />

          {errors.email && (
            <p
              id="register-email-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="register-password"
            className="text-sm font-medium text-foreground"
          >
            Password
          </label>

          <input
            id="register-password"
            type="password"
            autoComplete="new-password"
            disabled={loading || success}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={
              errors.password ? "register-password-error" : undefined
            }
            className={authInputClassName}
            placeholder="At least 8 characters"
            {...register("password")}
          />

          {errors.password && (
            <p
              id="register-password-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="register-confirm-password"
            className="text-sm font-medium text-foreground"
          >
            Confirm password
          </label>

          <input
            id="register-confirm-password"
            type="password"
            autoComplete="new-password"
            disabled={loading || success}
            aria-invalid={Boolean(errors.confirmPassword)}
            aria-describedby={
              errors.confirmPassword
                ? "register-confirm-password-error"
                : undefined
            }
            className={authInputClassName}
            placeholder="Re-enter your password"
            {...register("confirmPassword")}
          />

          {errors.confirmPassword && (
            <p
              id="register-confirm-password-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      {error && (
        <p
          role="alert"
          aria-live="polite"
          className={authErrorBannerClassName}
        >
          {getAuthErrorMessage(error)}
        </p>
      )}

      {success && (
        <p
          role="status"
          aria-live="polite"
          className={authSuccessBannerClassName}
        >
          Registration successful. Check your email to confirm your account.
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={loading || success}
        className="h-10 w-full"
        aria-busy={loading}
      >
        {loading ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}