import { CircleAlert } from "lucide-react";

/**
 * States plainly that the Dashboard is showing simulated data.
 *
 * Not optional while the service returns mocks. Product Architecture §1.5 and
 * the Intelligence Core's honesty principles both forbid presenting something
 * as observed when it was not. Removed in the same change that connects real
 * data.
 */
export function SampleDataNotice() {
  return (
    <div
      role="status"
      className="mb-6 flex items-start gap-2.5 rounded-lg border border-border bg-muted/40 px-3.5 py-2.5"
    >
      <CircleAlert
        aria-hidden="true"
        className="mt-0.5 size-4 shrink-0 text-muted-foreground"
      />

      <p className="text-sm text-muted-foreground">
        Datos de ejemplo. Ninguna de estas prioridades procede de un análisis
        real todavía.
      </p>
    </div>
  );
}
