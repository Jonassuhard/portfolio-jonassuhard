import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // Inline le CSS critique dans le HTML -> supprime la requête CSS render-blocking
  // (le dernier verrou du LCP mobile sur 4G lente).
  experimental: {
    inlineCss: true
  },
  turbopack: {
    root
  }
};

export default nextConfig;
