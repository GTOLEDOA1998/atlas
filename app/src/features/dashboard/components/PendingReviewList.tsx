import { Clock } from "lucide-react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/EmptyState";
import type { PendingReview } from "../dashboard.types";

interface Props {
  reviews: PendingReview[];
}

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

/**
 * Analyses that finished processing and have not been opened yet.
 * Product Principles §6 names this as one of the three things the Dashboard
 * surfaces.
 */
export function PendingReviewList({ reviews }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Listos para revisar</CardTitle>
      </CardHeader>

      {reviews.length === 0 ? (
        <EmptyState
          icon={Clock}
          title="Sin análisis pendientes"
          description="Los análisis completados aparecerán aquí hasta que los revises."
        />
      ) : (
        <ul className="divide-y divide-border border-t border-border">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="flex items-center justify-between gap-3 px-5 py-3.5"
            >
              <span className="min-w-0 truncate text-sm text-foreground">
                {review.playerName}
              </span>

              <time
                dateTime={review.completedAt}
                className="shrink-0 text-xs text-muted-foreground"
              >
                {dateFormatter.format(new Date(review.completedAt))}
              </time>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
