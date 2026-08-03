/**
 * Public environment variables required by Atlas.
 *
 * Next.js inlines `process.env.NEXT_PUBLIC_*` at build time only when it is
 * read as a literal member expression, so each value is read explicitly below.
 * Failing fast here turns a missing variable into an actionable message instead
 * of an opaque "Invalid URL" crash deep inside the Supabase client.
 */
function requireEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        `Add it to .env.local for local development, or to your hosting ` +
        `provider's environment settings before deploying.`
    );
  }

  return value;
}

export const env = {
  supabaseUrl: requireEnv(
    "NEXT_PUBLIC_SUPABASE_URL",
    process.env.NEXT_PUBLIC_SUPABASE_URL
  ),
  supabaseAnonKey: requireEnv(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ),
} as const;
