import type { MetadataRoute } from "next";
import { knowledgePages } from "@/lib/knowledge";
import { projects, siteUrl } from "@/lib/projects";
import { contentReviewDate } from "@/lib/verification";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/recruteurs", "/projets", "/competences", "/methode", "/preuves", "/a-propos", "/knowledge"];
  const indexedProjects = projects.filter((project) => !project.noindex);
  const projectRoutes = indexedProjects.map((project) => `/projets/${project.slug}`);
  const knowledgeRoutes = knowledgePages.map((page) => `/knowledge/${page.slug}`);
  const infrastructureRoutes = ["/llms.txt"];
  const lastModified = new Date(contentReviewDate);

  return [...staticRoutes, ...projectRoutes, ...knowledgeRoutes, ...infrastructureRoutes].map((path) => ({
    url: `${siteUrl}${path === "" ? "/" : path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path.startsWith("/projets/") ? 0.7 : 0.6
  }));
}
