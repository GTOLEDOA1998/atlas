import { cn } from "@/lib/utils";
import { SidebarBrand } from "./SidebarBrand";
import { SidebarNav } from "./SidebarNav";
import { SidebarUserMenu } from "./SidebarUserMenu";

interface Props {
  className?: string;
}

/**
 * The sidebar is a Server Component; only `SidebarNavItem` and
 * `SidebarUserMenu` cross into the client.
 *
 * The same component backs both the fixed desktop rail and the mobile drawer
 * — the drawer receives it as `children` rather than importing it, which
 * keeps it out of the client bundle. Two navigation trees would drift apart.
 */
export function Sidebar({ className }: Props) {
  return (
    <div
      className={cn(
        "flex h-full w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar",
        className
      )}
    >
      <SidebarBrand />
      <SidebarNav />
      <SidebarUserMenu />
    </div>
  );
}
