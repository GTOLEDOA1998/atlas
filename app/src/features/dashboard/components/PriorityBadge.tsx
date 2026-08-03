import { Badge } from "@/components/ui/badge";
import type { PriorityState } from "../dashboard.types";

const PRIORITY_LABELS: Record<PriorityState, string> = {
  WORK_NOW: "Trabajar ahora",
  MONITOR: "Observar",
  WAIT: "Esperar",
};

const PRIORITY_VARIANTS: Record<
  PriorityState,
  "warning" | "info" | "outline"
> = {
  WORK_NOW: "warning",
  MONITOR: "info",
  WAIT: "outline",
};

interface Props {
  state: PriorityState;
}

/**
 * The three Priority Engine states. Colour signals meaning only — `WORK_NOW`
 * is not an error, so it reads as attention rather than alarm.
 */
export function PriorityBadge({ state }: Props) {
  return (
    <Badge variant={PRIORITY_VARIANTS[state]}>{PRIORITY_LABELS[state]}</Badge>
  );
}
