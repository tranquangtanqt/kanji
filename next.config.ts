import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Only use static export for production builds, not dev mode
  ...(process.env.NODE_ENV === "production" && { output: "export" }),
};

export default nextConfig;
