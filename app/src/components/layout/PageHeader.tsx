import type { ReactNode } from "react";

interface Props {
  title: string;
  description?: string;
  /** Primary actions for the page, rendered inline on wide viewports. */
  actions?: ReactNode;
}

/**
 * The title block every page opens with. Product Principles §4: one screen,
 * one obvious primary job — the header is where that job is named.
 */
export function PageHeader({ title, description, actions }: Props) {
  return (
    <header className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>

        {description && (
          <p className="max-w-2xl text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </header>
  );
}
