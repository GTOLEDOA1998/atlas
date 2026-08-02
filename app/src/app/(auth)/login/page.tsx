import { LoginForm } from "@/features/auth/components/LoginForm";
import { GuestOnlyRoute } from "@/features/auth/components/GuestOnlyRoute";

export default function LoginPage() {
  return (
    <GuestOnlyRoute>
      <main className="flex min-h-screen items-center justify-center bg-background p-6">
        <LoginForm />
      </main>
    </GuestOnlyRoute>
  );
}
