import { Breadcrumbs } from "./Breadcrumbs";
import { MobileNav } from "./MobileNav";
import { Sidebar } from "./Sidebar";

/**
 * The persistent top bar.
 *
 * Laid out as three regions — navigation, context, actions. The context
 * region is empty today; it is where the player switcher lands in Sprint 3
 * (Product Architecture §8.1, plane 2). Reserving the region costs nothing;
 * an unused prop would have been speculative, so there isn't one.
 */
export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex min-w-0 items-center gap-2">
        <MobileNav>
          <Sidebar />
        </MobileNav>

        <Breadcrumbs />
      </div>

      {/* Context region — player switcher lands here. */}
      <div className="flex-1" />

      <div className="flex shrink-0 items-center gap-2" />
    </header>
  );
}
