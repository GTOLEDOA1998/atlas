# Sprint 2 — Application Shell

> **Status:** Approved and delivered. Frozen as the record of what was specified.
> **Tier:** 4 — Work. A sprint specification is written before implementation and frozen on approval; it is not edited afterwards to match what was built.
> **Owns:** the scope, component inventory, acceptance criteria and risks of Sprint 2.
> **Inherits:** [`product-architecture.md`](../../architecture/product-architecture.md) · [`product-principles.md`](../../constitution/product-principles.md) · [`development-rules.md`](../../constitution/development-rules.md) · the Intelligence Core.
> **Does not own:** the outcome — recorded in [`roadmap.md`](../roadmap.md).

---

## Conflicts recorded before approval

Four were raised; all four were approved as exceptions by the Product Owner.

**C-1 · "One feature per sprint" vs the requested scope.** The development rules forbid bundling unrelated work. Shell + navigation + primitives + placeholders is one coherent feature — none of the parts is independently useful. The Dashboard, the font fix and the dead-code removal are separate. *Approved as one feature in five commit units.*

**C-2 · The font fix touches a Sprint 1 file.** `--font-sans` was self-referential in `globals.css`, so Geist was downloaded and never applied. A bug, not a refactor. *Approved.*

**C-3 · New routes had no server-side protection.** `PROTECTED_ROUTE_PREFIXES` contained only `/overview`; the seven new routes would have been served without a session check. Fixing it required editing an auth file. *Approved as a data-only change.*

**C-4 · ADR-0001 sequences Data Model and SDS before implementation.** Acceptable here because Sprint 2 persists nothing and this specification functions as a scoped SDS. **Not acceptable for Sprint 3.**

---

## 1 · Objective

Atlas had working authentication and no application behind it. This sprint built the place the product would live in.

It delivers no coaching capability. It delivers the structure that lets the capabilities of the following months be added one at a time without renegotiating layout, navigation or visual language.

The problem is not "a dashboard is missing". It is that **every future feature would otherwise have to invent where it lives, how it is navigated to, and what it looks like** — multiplied by twenty screens, that is guaranteed incoherence.

---

## 2 · Scope

### Implemented

| # | Unit | Content |
|---|---|---|
| U1 | Visual foundation | `--font-sans` fix (C-2) · semantic state tokens |
| U2 | Navigation registry | `routes.ts` + `navigation.ts` — single source of truth |
| U3 | UI primitives | `card` · `badge` · `avatar` · `separator` · `skeleton` |
| U4 | App Shell | Persistent layout · Sidebar · Header · mobile drawer · breadcrumbs |
| U5 | Placeholders | Shared component + 7 pages |
| U6 | Dashboard | Overview on simulated data behind a service boundary |
| U7 | Cleanup | Removal of `components/home/**` |

### Explicitly not implemented

No Supabase. No authentication changes beyond C-3. No real data. No domain modules. No player switcher (no players exist). No `/club` or `/groups` (v1.1). No `/progress` (lives in the player profile, Sprint 3+). No collapsible sidebar, theme toggle, command palette or notifications — not requested. No directory renames. No tests — no runner is configured, and adding one is infrastructure work outside this sprint. **No new dependencies.**

---

## 3 · Expected result

Like a professional tool with nothing in it yet. Empty, not unfinished.

The coach can sign in and reach a Dashboard answering one question; navigate all seven MVP sections with no broken link; always know where they are; use it on mobile; sign out.

**Honesty is not negotiable.** The Dashboard shows simulated data and must say so visibly. A coach seeing fabricated priorities without warning is receiving a claim Atlas cannot justify.

---

## 4 · Architecture

**Persistent layout.** App Router keeps layouts mounted across navigations — only the children slot changes. That holds only while state lives in the smallest possible leaves, which is why the shell holds none. Exactly four client components: `SidebarNavItem`, `Breadcrumbs`, `SidebarUserMenu`, `MobileNav`.

**`ProtectedRoute` nesting inverted.** It renders a loading screen *instead of* its children, so placing it outside the shell would flash the whole application on every first paint — and the proxy has already verified the session by then. The shell moves outside; `ProtectedRoute` wraps only the content area. **The component itself is not modified.**

**Two config files, not one.** `routes.ts` is pure with no imports; `navigation.ts` imports routes and icons. If route constants lived alongside icons, any module needing a route would pull in every icon — and `proxy.ts` runs on the Edge runtime.

**Breadcrumbs derived, not declared.** A breadcrumb declared per page is a second place holding the navigation hierarchy, and it drifts.

**The Dashboard's data boundary.** The page awaits `dashboardService`, which reads from `dashboard.mock.ts`. Components receive props and never import the mock. The service is `async` from day one, so switching to real queries changes no call site.

---

## 5 · Acceptance criteria

**Structure** — one layout for all protected routes · sidebar and header persist without remounting · only four `"use client"` components.

**Navigation** — sidebar renders from the registry with nothing hardcoded · all seven entries resolve to an existing page (**zero 404**) · active item correct on all routes · breadcrumbs derived · `routes.ts` imports nothing.

**Dashboard** — no component imports the mock · service functions are `async` · every simulated field is derivable from observable data · zero aggregate metrics, composite indices or charts · sample-data notice visible.

**Quality** — no duplication · no literal colours · no `any` · `aria-current` on the active item · labelled `<nav>` elements · mobile drawer traps focus and closes on `Escape` · no component beyond ~150 lines.

**Responsive** — fixed sidebar at `≥ lg`, drawer below · no horizontal scroll at 375px · touch targets ≥ 44px.

**Verification** — `npm run lint` and `npm run build` green · the five auth routes still work · the proxy protects all eight `(app)` routes.

---

## 6 · Risks

| | Risk | Mitigation |
|---|---|---|
| R1 | The player switcher breaks the header in Sprint 3 | Header composed as three flex regions with the centre empty. **No unused prop** — that would be speculative |
| R2 | The simulated data shape proves wrong | Types derived from the frozen Priority Engine output, not from what is convenient to render. Residual risk contained to one file by the service boundary |
| R3 | Dynamic breadcrumb segments | Extension point documented, not built — there is no dynamic route to test |
| R4 | Loading states invented per page in Sprint 3 | `Skeleton` and `EmptyState` shipped here with a real consumer |
| R5 | `features/dashboard` becomes a junk drawer | Its service is **temporary by design** and must shrink to pure composition once real sources exist |
| R6 | Registry drifts from real routes | Both derive from `routes.ts` |

---

## 7 · Preparation for Sprint 3

Persistent layout · navigation registry (one field flips `planned` → `live`) · `PageHeader` and `PageContainer` · five primitives plus `EmptyState` · the service-boundary pattern to copy · the header's reserved context region · two reference implementations of Feature First (`auth`, `dashboard`).

**Two inherited blockers, neither affecting Sprint 2:**

**B1 — The Data Model phase has not been done.** Sprint 3 persists player data; ADR-0001 sequences Data Model before implementation.

**B2 — Memory governance is still owed.** Sprint 3 creates the first persistent record of a person, frequently a minor.

---

## Delivery note

Delivered with three declared deviations: the user menu renders inline rather than as a dropdown (its dependency list in this specification never included a menu primitive); the `onNavigate` prop threading was removed in favour of the drawer receiving the sidebar as `children`; and `auth.constants.ts` changed three lines rather than one, sourcing route prefixes from the registry to avoid duplicating eight strings.

One build failure occurred and was fixed: icon component references cannot cross the server/client boundary.

Outcome recorded in [`roadmap.md`](../roadmap.md).
