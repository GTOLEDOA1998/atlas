import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";

/**
 * Not wrapped in GuestOnlyRoute: the recovery link signs the user in before
 * they get here, so a guest-only guard would bounce them straight out.
 */
export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <ResetPasswordForm />
    </main>
  );
}
