"use client";

import { useSyncExternalStore } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useLogin } from "../hooks/useLogin";
import { getAuthErrorMessage } from "../auth.errors";
import {
  AUTH_ERROR_QUERY_PARAM,
  FORGOT_PASSWORD_ROUTE,
  OVERVIEW_ROUTE,
  REDIRECT_QUERY_PARAM,
  REGISTER_ROUTE,
  resolveSafeRedirect,
} from "../auth.constants";
import {
  authErrorBannerClassName,
  authInputClassName,
} from "./authFormStyles";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

/**
 * Reads the `error` message /auth/callback puts in the URL when an email link
 * could not be exchanged for a session.
 *
 * The query string is read straight off `window.location` rather than through
 * useSearchParams(), which would force this statically prerendered page into a
 * Suspense boundary. It never changes while the page is mounted, hence the
 * no-op subscription.
 */
const subscribeToNothing = () => () => {};

function readCallbackError(): string | null {
  return new URLSearchParams(window.location.search).get(
    AUTH_ERROR_QUERY_PARAM
  );
}

function readCallbackErrorOnServer(): string | null {
  return null;
}

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

  const callbackError = useSyncExternalStore(
    subscribeToNothing,
    readCallbackError,
    readCallbackErrorOnServer
  );

  const handleLogin = async (values: LoginFormValues) => {
    const success = await login(values);

    if (!success) {
      return;
    }

    // Send the user back to whatever they were trying to reach. Reading the
    // location directly avoids forcing this page into a Suspense boundary,
    // which useSearchParams() would require at build time.
    const params = new URLSearchParams(window.location.search);
    const redirectTo = resolveSafeRedirect(params.get(REDIRECT_QUERY_PARAM));

    router.replace(redirectTo ?? OVERVIEW_ROUTE);
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
            className={authInputClassName}
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
          <div className="flex items-center justify-between gap-2">
            <label
              htmlFor="login-password"
              className="text-sm font-medium text-foreground"
            >
              Password
            </label>

            <Link
              href={FORGOT_PASSWORD_ROUTE}
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            disabled={loading}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={
              errors.password ? "login-password-error" : undefined
            }
            className={authInputClassName}
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

      {(error || callbackError) && (
        <p role="alert" aria-live="polite" className={authErrorBannerClassName}>
          {error ? getAuthErrorMessage(error) : callbackError}
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
