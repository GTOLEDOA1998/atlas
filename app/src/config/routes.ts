/**
 * Every route inside the authenticated application shell.
 *
 * This module has **no imports on purpose**. `auth.constants.ts` consumes it,
 * and that module is pulled into the Edge runtime by `proxy.ts` — anything
 * imported here would be bundled there too. Navigation metadata (labels,
 * icons) therefore lives in `navigation.ts`, which is never imported by the
 * proxy.
 */
export const ROUTES = {
  overview: "/overview",
  assistant: "/assistant",
  players: "/players",
  videos: "/videos",
  analysis: "/analysis",
  training: "/training",
  library: "/library",
  settings: "/settings",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

/**
 * Route prefixes that require an authenticated session.
 *
 * Consumed by `auth.constants.ts` so the proxy and the client guards protect
 * exactly the same set. Adding a route to `ROUTES` is not enough — a new
 * authenticated route must appear here to be protected server-side.
 */
export const APP_ROUTE_PREFIXES = [
  ROUTES.overview,
  ROUTES.assistant,
  ROUTES.players,
  ROUTES.videos,
  ROUTES.analysis,
  ROUTES.training,
  ROUTES.library,
  ROUTES.settings,
] as const;
