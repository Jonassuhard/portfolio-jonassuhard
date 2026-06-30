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
  // Headers de sécurité (durcissement defense-in-depth). On évite volontairement
  // une CSP script-src/style-src stricte : le site inline le CSS (experimental.inlineCss)
  // et des scripts (JSON-LD + hydratation Next), une CSP trop dure casserait le rendu.
  // On garde les directives sûres qui n'affectent pas le chargement des ressources.
  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), browsing-topics=()"
      },
      {
        key: "Content-Security-Policy",
        value:
          "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests"
      }
    ];
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  turbopack: {
    root
  }
};

export default nextConfig;
