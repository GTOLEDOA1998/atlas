"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { getBreadcrumbTrail } from "@/config/navigation";

/**
 * Location derived from the pathname, resolved against the navigation
 * registry. No page declares its own breadcrumb — a second place holding the
 * hierarchy would drift out of sync with the sidebar.
 */
export function Breadcrumbs() {
  const pathname = usePathname();
  const trail = getBreadcrumbTrail(pathname);

  if (trail.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Ruta de navegación" className="min-w-0">
      <ol className="flex min-w-0 items-center gap-1.5 text-sm">
        {trail.map((entry, index) => {
          const isLast = index === trail.length - 1;

          return (
            <li key={entry.href} className="flex min-w-0 items-center gap-1.5">
              {index > 0 && (
                <ChevronRight
                  aria-hidden="true"
                  className="size-3.5 shrink-0 text-muted-foreground/50"
                />
              )}

              {isLast ? (
                <span
                  aria-current="page"
                  className="truncate font-medium text-foreground"
                >
                  {entry.label}
                </span>
              ) : (
                <Link
                  href={entry.href}
                  className="truncate rounded-md text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {entry.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
