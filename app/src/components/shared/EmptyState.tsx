import type { ComponentType, ReactNode } from "react";

interface Props {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  /** The single next step. Empty states offer one action, never a menu. */
  action?: ReactNode;
}

/**
 * The screen a coach sees before there is any data.
 *
 * Every new account starts here and many never see a populated view, so this
 * is treated as a first-class screen rather than a fallback.
 */
export function EmptyState({ icon: Icon, title, description, action }: Props) {
  return (
    <div className="flex flex-col items-center gap-4 px-6 py-12 text-center">
      <div className="flex size-10 items-center justify-center rounded-xl border border-border bg-muted/50">
        <Icon className="size-4.5 text-muted-foreground" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      </div>

      {action}
    </div>
  );
}
