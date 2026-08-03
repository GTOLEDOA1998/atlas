"use client";

import Link from "next/link";

import { Avatar, AvatarFallback, getAvatarInitials } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { SETTINGS_NAV_ITEM } from "@/config/navigation";
import { LogoutButton, useAuth } from "@/features/auth";

/**
 * Identity and account actions at the foot of the sidebar.
 *
 * Settings and sign-out are deliberately not sidebar destinations — they are
 * not day-to-day navigation and would spend primary space. They are rendered
 * inline rather than behind a dropdown: two actions do not justify a portal,
 * a positioner and a focus trap, and inline costs the coach one fewer click.
 *
 * Sign-out reuses `LogoutButton` from the auth feature's public barrel rather
 * than reimplementing sign-out, redirect and error handling.
 */
export function SidebarUserMenu() {
  const { user, loading } = useAuth();

  return (
    <div className="shrink-0 border-t border-sidebar-border p-3">
      {loading ? (
        <div className="flex items-center gap-2.5">
          <Skeleton className="size-8 rounded-full" />
          <div className="min-w-0 flex-1 space-y-1.5">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-2.5 w-32" />
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <Avatar>
              <AvatarFallback>{getAvatarInitials(user?.email)}</AvatarFallback>
            </Avatar>

            <p className="min-w-0 flex-1 truncate text-sm text-sidebar-foreground">
              {user?.email ?? "—"}
            </p>
          </div>

          <div className="flex items-center justify-between gap-2">
            <Link
              href={SETTINGS_NAV_ITEM.href}
              className="rounded-md px-1 py-0.5 text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-sidebar-ring/50"
            >
              {SETTINGS_NAV_ITEM.label}
            </Link>

            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  );
}
