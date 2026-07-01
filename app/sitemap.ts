import type { MetadataRoute } from "next";
import { projects, siteUrl } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/recruteurs", "/projets", "/competences", "/methode", "/a-propos"];
  const indexedProjects = projects.filter((project) => !project.noindex);
  const projectRoutes = indexedProjects.map((project) => `/projets/${project.slug}`);
  // Versions Markdown lisibles par les agents/crawlers qui ne lisent pas encore llms.txt.
  const projectMarkdown = indexedProjects.map((project) => `/projects/${project.slug}.md`);
  const agentFiles = [
    "/profile.md",
    "/profile.json",
    "/claims.json",
    "/skills.md",
    "/llms.txt"
  ];

  return [...staticRoutes, ...projectRoutes, ...projectMarkdown, ...agentFiles].map((path) => ({
    url: `${siteUrl}${path === "" ? "/" : path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path.startsWith("/projets/") ? 0.7 : 0.6
  }));
}
