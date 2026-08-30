import type { MetadataRoute } from "next";
import { knowledgePages } from "@/lib/knowledge";
import { projects, siteUrl } from "@/lib/projects";
import { contentReviewDate } from "@/lib/verification";

const routeLastModified = new Map<string, string>([
  ["", contentReviewDate],
  ["/contact", "2026-08-31"],
  ["/recruteurs", contentReviewDate],
  ["/projets", contentReviewDate],
  ["/projets/job-radar", contentReviewDate],
  ["/projets/educool-la-herse", contentReviewDate],
  ["/llms.txt", contentReviewDate]
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/recruteurs",
    "/projets",
    "/competences",
    "/methode",
    "/preuves",
    "/a-propos",
    "/contact",
    "/knowledge",
    "/outils/decodeur-offre-ia"
  ];
  const indexedProjects = projects.filter((project) => !project.noindex);
  const projectRoutes = indexedProjects.map((project) => `/projets/${project.slug}`);
  const knowledgeRoutes = knowledgePages.map((page) => `/knowledge/${page.slug}`);
  const infrastructureRoutes = ["/llms.txt"];
  return [...staticRoutes, ...projectRoutes, ...knowledgeRoutes, ...infrastructureRoutes].map((path) => ({
    url: `${siteUrl}${path === "" ? "/" : path}`,
    lastModified: new Date(routeLastModified.get(path) ?? contentReviewDate),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path.startsWith("/projets/") ? 0.7 : 0.6
  }));
}
