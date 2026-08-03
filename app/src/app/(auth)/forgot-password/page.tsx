import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";
import { GuestOnlyRoute } from "@/features/auth/components/GuestOnlyRoute";

export default function ForgotPasswordPage() {
  return (
    <GuestOnlyRoute>
      <main className="flex min-h-screen items-center justify-center bg-background p-6">
        <ForgotPasswordForm />
      </main>
    </GuestOnlyRoute>
  );
}
