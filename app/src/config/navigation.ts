import type { ComponentType } from "react";
import {
  BookOpen,
  ChartLine,
  Dumbbell,
  LayoutDashboard,
  Settings,
  Sparkles,
  Users,
  Video,
} from "lucide-react";

import { ROUTES } from "./routes";

/**
 * Minimal icon contract. Deliberately not `LucideIcon` — the navigation tree
 * only ever needs to pass a className, and a narrow type keeps the registry
 * independent of the icon library's own typings.
 */
export type NavIcon = ComponentType<{ className?: string }>;

/**
 * `planned` marks a destination whose page exists but is still a placeholder.
 * Every entry resolves to a real page, so the sidebar cannot produce a broken
 * link by construction.
 */
export type NavStatus = "live" | "planned";

export interface NavItem {
  href: string;
  /** Interface copy is Spanish; routes and code are English. */
  label: string;
  icon: NavIcon;
  status: NavStatus;
}

export interface NavSection {
  id: string;
  /** `null` renders the group without a visible heading. */
  label: string | null;
  items: NavItem[];
}

/**
 * The single source of truth for structural navigation.
 *
 * Order follows the coach's working day: today's attention first, then the
 * improvement cycle in its natural sequence — players, evidence,
 * interpretation, action — then reference material.
 */
export const NAV_SECTIONS: NavSection[] = [
  {
    id: "primary",
    label: null,
    items: [
      {
        href: ROUTES.overview,
        label: "Inicio",
        icon: LayoutDashboard,
        status: "live",
      },
      {
        href: ROUTES.assistant,
        label: "Asistente",
        icon: Sparkles,
        status: "planned",
      },
    ],
  },
  {
    id: "development",
    label: "Desarrollo",
    items: [
      {
        href: ROUTES.players,
        label: "Jugadores",
        icon: Users,
        status: "planned",
      },
      {
        href: ROUTES.videos,
        label: "Vídeos",
        icon: Video,
        status: "planned",
      },
      {
        href: ROUTES.analysis,
        label: "Análisis",
        icon: ChartLine,
        status: "planned",
      },
      {
        href: ROUTES.training,
        label: "Entrenamientos",
        icon: Dumbbell,
        status: "planned",
      },
    ],
  },
  {
    id: "resources",
    label: "Recursos",
    items: [
      {
        href: ROUTES.library,
        label: "Biblioteca",
        icon: BookOpen,
        status: "planned",
      },
    ],
  },
];

/**
 * Destinations reachable from the user menu rather than the sidebar. Settings
 * is not day-to-day navigation, so it does not spend primary space.
 */
export const SETTINGS_NAV_ITEM: NavItem = {
  href: ROUTES.settings,
  label: "Ajustes",
  icon: Settings,
  status: "planned",
};

const ALL_NAV_ITEMS: NavItem[] = [
  ...NAV_SECTIONS.flatMap((section) => section.items),
  SETTINGS_NAV_ITEM,
];

export function findNavItem(href: string): NavItem | undefined {
  return ALL_NAV_ITEMS.find((item) => item.href === href);
}

/**
 * Whether a nav item should render as active for the current pathname.
 * Matches the item itself and anything nested beneath it, so
 * `/players/123` keeps `Jugadores` highlighted.
 */
export function isNavItemActive(href: string, pathname: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export interface BreadcrumbEntry {
  label: string;
  href: string;
}

/**
 * Derives the breadcrumb trail from the pathname by resolving each segment
 * against the registry. Nothing declares its own breadcrumb — a second place
 * holding the navigation hierarchy would drift out of sync with the sidebar.
 *
 * **Sprint 3 extension point:** dynamic segments (`/players/[id]`) have no
 * registry entry and currently fall back to the humanised segment, which for
 * an id is the raw id. Resolving those to a real name (a player's name) is
 * where a segment resolver plugs in.
 */
export function getBreadcrumbTrail(pathname: string): BreadcrumbEntry[] {
  const segments = pathname.split("/").filter(Boolean);
  const trail: BreadcrumbEntry[] = [];

  let href = "";

  for (const segment of segments) {
    href += `/${segment}`;

    trail.push({
      href,
      label: findNavItem(href)?.label ?? humanizeSegment(segment),
    });
  }

  return trail;
}

function humanizeSegment(segment: string): string {
  return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
}
