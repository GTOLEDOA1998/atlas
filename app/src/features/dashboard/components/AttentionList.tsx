import { Video } from "lucide-react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/EmptyState";
import type { AttentionItem } from "../dashboard.types";
import { AttentionItemCard } from "./AttentionItemCard";

interface Props {
  items: AttentionItem[];
}

/**
 * The Dashboard's primary block: who needs the coach today.
 *
 * Order comes from the service, not from sorting here — priority ordering is
 * the Priority Engine's judgment, and the interface must not silently
 * re-rank it.
 */
export function AttentionList({ items }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Requiere tu atención</CardTitle>
      </CardHeader>

      {items.length === 0 ? (
        <EmptyState
          icon={Video}
          title="Nada pendiente"
          description="Cuando Atlas analice un vídeo, lo que merezca tu atención aparecerá aquí."
        />
      ) : (
        <ul className="divide-y divide-border border-t border-border">
          {items.map((item) => (
            <AttentionItemCard key={item.id} item={item} />
          ))}
        </ul>
      )}
    </Card>
  );
}
