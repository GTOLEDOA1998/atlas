import { createBrowserClient } from "@supabase/ssr";

import { env } from "@/lib/env";

/**
 * Supabase client for browser code.
 *
 * Sessions are persisted in cookies (not localStorage) so that the proxy and
 * Server Components can read them on every request. `createBrowserClient`
 * returns a singleton per configuration, so calling this repeatedly is cheap.
 * It is created lazily rather than at module scope because client components
 * are also rendered on the server, where `document` does not exist.
 */
export function createClient() {
  return createBrowserClient(env.supabaseUrl, env.supabaseAnonKey);
}
