import type { NextConfig } from "next";

const defaultApiUrl =
  process.env.NODE_ENV === "production"
    ? "https://back-end-render-bbn4.onrender.com"
    : "http://localhost:3000";

const API_URL = process.env.API_URL ?? defaultApiUrl;

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${API_URL}/:path*` }];
  },
};

export default nextConfig;
