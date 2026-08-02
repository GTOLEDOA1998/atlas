"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLogin } from "../hooks/useLogin";
import { getAuthErrorMessage } from "../auth.errors";
import { OVERVIEW_ROUTE, REGISTER_ROUTE } from "../auth.constants";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const inputClassName = cn(
  "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs",
  "placeholder:text-muted-foreground",
  "transition-colors outline-none",
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20"
);

/**
 * Login form for signing in to an existing Atlas account.
 * UI only. All business logic lives inside useLogin().
 */
export function LoginForm() {
  const router = useRouter();
  const { login, loading, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values: LoginFormValues) => {
    const success = await login(values);

    if (success) {
      router.replace(OVERVIEW_ROUTE);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      noValidate
      className="mx-auto w-full max-w-md space-y-6 px-4 sm:px-0"
      aria-labelledby="login-form-title"
    >
      <div className="space-y-2 text-center sm:text-left">
        <h1
          id="login-form-title"
          className="text-2xl font-semibold tracking-tight text-foreground"
        >
          Sign in to Atlas
        </h1>

        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your account.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="login-email"
            className="text-sm font-medium text-foreground"
          >
            Email
          </label>

          <input
            id="login-email"
            type="email"
            autoComplete="email"
            inputMode="email"
            disabled={loading}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "login-email-error" : undefined}
            className={inputClassName}
            placeholder="you@example.com"
            {...register("email")}
          />

          {errors.email && (
            <p
              id="login-email-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="login-password"
            className="text-sm font-medium text-foreground"
          >
            Password
          </label>

          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            disabled={loading}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={
              errors.password ? "login-password-error" : undefined
            }
            className={inputClassName}
            placeholder="Enter your password"
            {...register("password")}
          />

          {errors.password && (
            <p
              id="login-password-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      {error && (
        <p
          role="alert"
          aria-live="polite"
          className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {getAuthErrorMessage(error)}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className="h-10 w-full"
        aria-busy={loading}
      >
        {loading ? "Signing in..." : "Sign in"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href={REGISTER_ROUTE}
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Create one
        </Link>
      </p>
    </form>
  );
}
