import { NAV_SECTIONS } from "@/config/navigation";
import { SidebarSection } from "./SidebarSection";

/**
 * Structural navigation, rendered entirely from the navigation registry.
 * No destination is hardcoded here — adding a page is one registry entry.
 */
export function SidebarNav() {
  return (
    <nav
      aria-label="Navegación principal"
      className="flex-1 overflow-y-auto px-2 pb-4"
    >
      {NAV_SECTIONS.map((section) => (
        <SidebarSection key={section.id} section={section} />
      ))}
    </nav>
  );
}
