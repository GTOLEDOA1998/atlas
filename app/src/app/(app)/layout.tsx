import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/AppShell";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";

interface Props {
  children: ReactNode;
}

/**
 * The single persistent layout for every authenticated route.
 *
 * `ProtectedRoute` wraps only the content area, not the shell. It renders a
 * loading screen *instead of* its children while the session resolves, so
 * placing it outside would flash the whole application on every first paint —
 * and the proxy has already verified the session server-side by this point.
 * The sidebar and header paint immediately; only the content waits.
 */
export default function AppLayout({ children }: Props) {
  return (
    <AppShell>
      <ProtectedRoute>{children}</ProtectedRoute>
    </AppShell>
  );
}
