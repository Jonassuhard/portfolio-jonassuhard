import type { MetadataRoute } from "next";
import { projects, siteUrl } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/recruteurs", "/projets", "/competences", "/methode", "/a-propos"];
  const projectRoutes = projects
    .filter((project) => !project.noindex)
    .map((project) => `/projets/${project.slug}`);
  const agentFiles = ["/profile.md", "/profile.json", "/llms.txt"];

  return [...staticRoutes, ...projectRoutes, ...agentFiles].map((path) => ({
    url: `${siteUrl}${path === "" ? "/" : path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path.startsWith("/projets/") ? 0.7 : 0.6
  }));
}
