import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/projects";

// Accès large + on déclare explicitement les crawlers IA (GEO) bien que "*" les couvre déjà.
const aiAgents = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "CCBot",
  "Bingbot",
  "Applebot",
  "Applebot-Extended",
  "Amazonbot",
  "Meta-ExternalAgent",
  "Bytespider"
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: aiAgents, allow: "/" }
    ],
    sitemap: `${siteUrl}/sitemap.xml`
  };
}
