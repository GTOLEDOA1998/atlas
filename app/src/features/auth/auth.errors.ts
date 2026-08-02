import { AuthError } from "@supabase/supabase-js";

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  invalid_credentials: "Incorrect email or password.",
  email_not_confirmed: "Please confirm your email before signing in.",
  user_already_exists: "An account with this email already exists.",
  weak_password: "Password is too weak. Choose a stronger password.",
};

export function getAuthErrorMessage(error: AuthError): string {
  if (error.code && AUTH_ERROR_MESSAGES[error.code]) {
    return AUTH_ERROR_MESSAGES[error.code];
  }

  return error.message || "An unexpected error occurred. Please try again.";
}
