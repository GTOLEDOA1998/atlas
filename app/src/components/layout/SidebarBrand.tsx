import Link from "next/link";

import { ROUTES } from "@/config/routes";

export function SidebarBrand() {
  return (
    <div className="flex h-14 shrink-0 items-center px-4">
      <Link
        href={ROUTES.overview}
        className="rounded-md text-sm font-semibold tracking-tight text-sidebar-foreground outline-none focus-visible:ring-3 focus-visible:ring-sidebar-ring/50"
      >
        Atlas
      </Link>
    </div>
  );
}
