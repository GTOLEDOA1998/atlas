import type { ComponentType } from "react";

import { Card, CardContent } from "@/components/ui/card";

interface Props {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  /** What this section will do, stated plainly rather than left blank. */
  capabilities: string[];
  /** The release this section is planned for, e.g. "Sprint 3". */
  plannedFor: string;
}

/**
 * The placeholder every unbuilt section renders.
 *
 * A section that is not built yet should say so and say what is coming — an
 * empty screen reads as broken. This component is temporary by design and is
 * retired one page at a time as each feature lands.
 */
export function ComingSoon({
  icon: Icon,
  title,
  description,
  capabilities,
  plannedFor,
}: Props) {
  return (
    <Card className="mx-auto max-w-xl">
      <CardContent className="flex flex-col items-center gap-5 px-6 py-10 text-center">
        <div className="flex size-11 items-center justify-center rounded-xl border border-border bg-muted/50">
          <Icon className="size-5 text-muted-foreground" />
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <ul className="w-full space-y-2 text-left">
          {capabilities.map((capability) => (
            <li
              key={capability}
              className="flex items-start gap-2.5 text-sm text-muted-foreground"
            >
              <span
                aria-hidden="true"
                className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/40"
              />
              {capability}
            </li>
          ))}
        </ul>

        <p className="text-xs text-muted-foreground/70">
          Previsto para {plannedFor}
        </p>
      </CardContent>
    </Card>
  );
}
