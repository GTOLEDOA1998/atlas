import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/AppShell";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { ensureTenancyForCurrentUser } from "@/features/club";

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
 *
 * Tenancy cold start (SDS §5.6): this is the first authenticated *server-side*
 * boundary Sprint 1 established — after `proxy.ts` validated the session and
 * before the first default-denied domain read. On the first entry with no
 * `Membership`, `ensureTenancyForCurrentUser` provisions the coach's
 * club-of-one; every later entry is a cheap idempotent no-op. It never runs in
 * `proxy.ts` (per-request hot path) or the auth callback (owned by Sprint 1),
 * and uses the user's session — no service-role. A failed bootstrap yields an
 * explained, retryable state (SDS §5.6.3), never a blank or a half-built club.
 */
export default async function AppLayout({ children }: Props) {
  const tenancy = await ensureTenancyForCurrentUser();

  return (
    <AppShell>
      <ProtectedRoute>
        {tenancy.ok ? children : <TenancyUnavailable />}
      </ProtectedRoute>
    </AppShell>
  );
}

/**
 * Shown when the cold-start provisioning could not complete. The session is
 * valid; only the club is missing, and the next authenticated request retries.
 */
function TenancyUnavailable() {
  return (
    <div
      role="alert"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-2 p-8 text-center"
    >
      <p className="text-sm font-medium text-foreground">
        No pudimos preparar tu club todavía.
      </p>
      <p className="max-w-sm text-sm text-muted-foreground">
        Tu sesión está activa. Vuelve a cargar la página en unos segundos para
        reintentar; no se perdió ningún dato.
      </p>
    </div>
  );
}
