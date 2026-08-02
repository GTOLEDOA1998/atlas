import type { ReactNode } from "react";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { LogoutButton } from "@/features/auth/components/LogoutButton";

interface Props {
  children: ReactNode;
}

export default function AppLayout({ children }: Props) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <header className="flex items-center justify-between border-b border-border px-6 py-4">
          <span className="text-lg font-semibold text-foreground">Atlas</span>
          <LogoutButton />
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
