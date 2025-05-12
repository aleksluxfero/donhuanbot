import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["grammy"],
  functions: {
    maxDuration: 60, // Увеличиваем до 30 секунд для обработки запросов к внешнему API
  },
};

export default nextConfig;
