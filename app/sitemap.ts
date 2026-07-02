import type { MetadataRoute } from "next";
import { projects, siteUrl } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/recruteurs", "/projets", "/competences", "/methode", "/a-propos"];
  const indexedProjects = projects.filter((project) => !project.noindex);
  const projectRoutes = indexedProjects.map((project) => `/projets/${project.slug}`);
  const infrastructureRoutes = ["/llms.txt"];
  const lastModified = new Date("2026-07-02");

  return [...staticRoutes, ...projectRoutes, ...infrastructureRoutes].map((path) => ({
    url: `${siteUrl}${path === "" ? "/" : path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path.startsWith("/projets/") ? 0.7 : 0.6
  }));
}
