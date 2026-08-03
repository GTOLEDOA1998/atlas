import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Development only. Next.js allows "localhost" out of the box but blocks
  // internal /_next and /__nextjs requests from any other origin, so the dev
  // server returns 403 for assets and the HMR socket when opened at
  // http://127.0.0.1:3000. Has no effect on `next build` or production.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
