import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

import { env } from "@/lib/env";

/**
 * Refreshes the Supabase session for an incoming request and returns both the
 * authenticated user and a response carrying any rotated auth cookies.
 *
 * The returned response must be used (or its cookies copied onto a redirect),
 * otherwise refreshed tokens are lost and users get logged out at random.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        response = NextResponse.next({ request });

        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });

        // Responses that set auth cookies must never be cached by a CDN.
        Object.entries(headers).forEach(([key, value]) => {
          response.headers.set(key, value);
        });
      },
    },
  });

  // `getUser()` revalidates the token with Supabase. Never trust `getSession()`
  // on the server — its payload comes straight from the cookie.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { user, response };
}
