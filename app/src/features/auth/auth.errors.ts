import { AuthError } from "@supabase/supabase-js";

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  invalid_credentials: "Incorrect email or password.",
  email_not_confirmed: "Please confirm your email before signing in.",
  user_already_exists: "An account with this email already exists.",
  email_exists: "An account with this email already exists.",
  weak_password: "Password is too weak. Choose a stronger password.",
  same_password:
    "Your new password must be different from your current password.",
  email_address_invalid: "Enter a valid email address.",
  otp_expired: "This link has expired. Request a new one and try again.",
  over_email_send_rate_limit:
    "Too many emails requested. Wait a few minutes before trying again.",
  over_request_rate_limit:
    "Too many attempts. Wait a few minutes before trying again.",
  session_not_found: "Your session has expired. Sign in again.",
  flow_state_not_found:
    "This link is no longer valid. Request a new one and try again.",
  signup_disabled: "New registrations are currently disabled.",
  validation_failed: "Some of the details you entered are not valid.",
};

const GENERIC_AUTH_ERROR_MESSAGE =
  "An unexpected error occurred. Please try again.";

export function getAuthErrorMessage(error: AuthError): string {
  if (error.code && AUTH_ERROR_MESSAGES[error.code]) {
    return AUTH_ERROR_MESSAGES[error.code];
  }

  return error.message || GENERIC_AUTH_ERROR_MESSAGE;
}

/**
 * Wraps an unknown thrown value into an `AuthError` so callers only ever have
 * one error shape to render.
 */
export function toAuthError(
  thrown: unknown,
  fallbackMessage: string
): AuthError {
  if (thrown instanceof AuthError) {
    return thrown;
  }

  return new AuthError(
    thrown instanceof Error ? thrown.message : fallbackMessage
  );
}
