import { cn } from "@/lib/utils";

/** Shared input styling for every auth form. */
export const authInputClassName = cn(
  "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs",
  "placeholder:text-muted-foreground",
  "transition-colors outline-none",
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20"
);

export const authErrorBannerClassName =
  "rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive";

export const authSuccessBannerClassName =
  "rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary";
