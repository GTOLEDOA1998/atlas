import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { GuestOnlyRoute } from "@/features/auth/components/GuestOnlyRoute";

export default function RegisterPage() {
  return (
    <GuestOnlyRoute>
      <main className="flex min-h-screen items-center justify-center bg-background p-6">
        <RegisterForm />
      </main>
    </GuestOnlyRoute>
  );
}