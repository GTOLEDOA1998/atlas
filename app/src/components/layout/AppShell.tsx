import type { ReactNode } from "react";

import { AppHeader } from "./AppHeader";
import { Sidebar } from "./Sidebar";

interface Props {
  children: ReactNode;
}

/**
 * The persistent frame every authenticated route renders inside.
 *
 * App Router keeps this layout mounted across navigations — only the children
 * slot changes — so the sidebar never remounts, loses scroll position or
 * re-runs effects. That only holds while state stays in the smallest possible
 * leaves, which is why the shell itself holds none.
 */
export function AppShell({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar className="hidden lg:flex" />

      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader />

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
