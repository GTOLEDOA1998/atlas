"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { isNavItemActive } from "@/config/navigation";

interface Props {
  href: string;
  label: string;
  /**
   * The icon as an already-rendered element, not a component reference.
   * Component references are functions and cannot cross the server/client
   * boundary; elements can.
   */
  icon: ReactNode;
}

/**
 * A single sidebar destination.
 *
 * This is the only part of the navigation tree that needs to be a Client
 * Component — it reads the pathname to mark itself active. Keeping the
 * boundary at the leaf lets the rest of the shell stay server-rendered and
 * stay mounted across navigations.
 */
export function SidebarNavItem({ href, label, icon }: Props) {
  const pathname = usePathname();
  const isActive = isNavItemActive(href, pathname);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors outline-none",
        "focus-visible:ring-3 focus-visible:ring-sidebar-ring/50",
        isActive
          ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
          : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
      )}
    >
      {icon}
      <span className="truncate">{label}</span>
    </Link>
  );
}
