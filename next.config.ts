import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Variante B do teste A/B — servida em www.baseperformance.com.br/b/
  basePath: "/b",
  images: {
    unoptimized: true,
    qualities: [75, 90, 92],
  },
};

export default nextConfig;
