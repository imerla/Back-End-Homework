import type { NextConfig } from "next";

const defaultApiUrl =
  process.env.NODE_ENV === "production"
    ? "https://back-end-render-bbn4.onrender.com"
    : "http://localhost:3000";

const API_URL =
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  defaultApiUrl;

const nextConfig: NextConfig = {
  async rewrites() {
    const baseUrl = API_URL.replace(/\/$/, "");
    return [{ source: "/api/:path*", destination: `${baseUrl}/:path*` }];
  },
};

export default nextConfig;
