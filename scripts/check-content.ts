import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { faqMeta } from "../lib/faq";
import { projects, site, siteUrl } from "../lib/projects";
import { contentReviewDate } from "../lib/verification";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors: string[] = [];

const forbidden = [
  "Copie publique anonymisée",
  "POC initié - copie publique anonymisée",
  "En activité - premiers audits livrés",
  "807 abonnés",
  "58% d'ouverture",
  "58 % d'ouverture",
  "app publiée sur Google Play",
  "session juillet 2026",
  "Certification Anthropic"
];

const textExtensions = new Set([".ts", ".tsx", ".md", ".json", ".txt", ".mjs"]);

function extension(path: string) {
  const match = path.match(/(\.[^.\\/]+)$/);
  return match?.[1] ?? "";
}

function walk(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    if ([".git", ".next", "node_modules"].includes(entry)) return [];
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

for (const path of walk(root)) {
  if (!textExtensions.has(extension(path))) continue;
  if (path === fileURLToPath(import.meta.url)) continue;
  const content = readFileSync(path, "utf8");
  for (const phrase of forbidden) {
    if (content.includes(phrase)) {
      errors.push(`${relative(root, path)} contient la formulation interdite « ${phrase} »`);
    }
  }
}

if (siteUrl !== "https://jonassuhard.com") {
  errors.push(`Origine canonique inattendue : ${siteUrl}`);
}

if (!site.title.toLowerCase().includes("junior")) {
  errors.push("Le niveau junior doit être explicite dans le titre canonique.");
}

if (faqMeta.verified_at !== contentReviewDate) {
  errors.push("La date de la FAQ et la date du registre de preuves divergent.");
}

for (const project of projects) {
  if (project.evidenceLevel === "public" && !project.links.some((link) => link.external)) {
    errors.push(`${project.slug} est marqué public sans lien externe vérifiable.`);
  }
  if (project.evidenceLevel !== "public" && /copie publique/i.test(project.status)) {
    errors.push(`${project.slug} revendique encore une copie publique.`);
  }
}

const profile = JSON.parse(readFileSync(join(root, "public", "profile.json"), "utf8"));
if (profile.verified_at !== contentReviewDate) {
  errors.push("public/profile.json n'a pas la date de revue canonique.");
}
if (profile.title !== site.title) {
  errors.push("Le titre de public/profile.json diverge du titre canonique.");
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`check:content OK — ${projects.length} projets, revue ${contentReviewDate}`);
