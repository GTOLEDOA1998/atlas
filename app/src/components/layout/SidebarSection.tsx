import type { NavSection } from "@/config/navigation";
import { SidebarNavItem } from "./SidebarNavItem";

interface Props {
  section: NavSection;
}

/**
 * Renders one navigation group. Icons are instantiated here, on the server,
 * and handed to the client item as elements — a component reference is a
 * function and cannot cross the boundary.
 */
export function SidebarSection({ section }: Props) {
  return (
    <div className="space-y-1">
      {section.label && (
        <h2 className="px-2.5 pt-4 pb-1 text-xs font-medium tracking-wide text-muted-foreground/70 uppercase">
          {section.label}
        </h2>
      )}

      {section.items.map((item) => {
        const Icon = item.icon;

        return (
          <SidebarNavItem
            key={item.href}
            href={item.href}
            label={item.label}
            icon={<Icon className="size-4 shrink-0" />}
          />
        );
      })}
    </div>
  );
}
