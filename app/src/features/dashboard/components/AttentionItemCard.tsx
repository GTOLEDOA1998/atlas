import { Avatar, AvatarFallback, getAvatarInitials } from "@/components/ui/avatar";
import type { AttentionItem, ConfidenceLevel } from "../dashboard.types";
import { PriorityBadge } from "./PriorityBadge";

const CONFIDENCE_LABELS: Record<ConfidenceLevel, string> = {
  high: "Confianza alta",
  medium: "Confianza media",
  low: "Confianza baja",
};

interface Props {
  item: AttentionItem;
}

/**
 * One player needing attention: who, what state, and why.
 *
 * The reason and the confidence are always shown together — a recommendation
 * without its reasoning is a verdict, and Atlas does not issue verdicts.
 */
export function AttentionItemCard({ item }: Props) {
  return (
    <li className="flex gap-3 px-5 py-4">
      <Avatar className="mt-0.5">
        <AvatarFallback>{getAvatarInitials(item.playerName)}</AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <span className="text-sm font-medium text-foreground">
            {item.playerName}
          </span>

          <PriorityBadge state={item.state} />
        </div>

        <p className="text-sm text-muted-foreground">{item.reason}</p>

        <p className="text-xs text-muted-foreground/70">
          {CONFIDENCE_LABELS[item.confidence]}
        </p>
      </div>
    </li>
  );
}
