// Génère public/projects/<slug>.md depuis lib/projects.ts (source unique).
// Lancé en `prebuild` : les .md ne peuvent plus dériver du .ts à la main.
// Exécuté via tsx (voir package.json). Format volontairement stable pour un
// diff minimal ; toute divergence de contenu vient donc du .ts, pas du gabarit.
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { projects, type Project } from "../lib/projects";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "..", "public", "projects");

function bullets(items: string[]) {
  return items.map((item) => `- ${item}`).join("\n");
}

function toMarkdown(project: Project) {
  const externalLink = project.links.find((link) => link.external);
  const lines = [
    `# ${project.title}`,
    "",
    `Type : ${project.type}.`,
    `Période : ${project.period}.`,
    `Rôle : ${project.role}.`,
    `Stack : ${project.stack.join(", ")}.`,
    `Statut : ${project.status}.`,
    "",
    `En bref : ${project.proofLine}`
  ];
  if (externalLink) {
    lines.push("", `Lien : ${externalLink.href}`);
  }
  lines.push(
    "",
    "## Problème",
    "",
    project.summary,
    "",
    "## Ce que ça montre",
    "",
    bullets(project.recruiterProof),
    "",
    "## Limites",
    "",
    bullets(project.limits)
  );
  return `${lines.join("\n")}\n`;
}

mkdirSync(outDir, { recursive: true });
for (const project of projects as Project[]) {
  writeFileSync(join(outDir, `${project.slug}.md`), toMarkdown(project), "utf8");
}
console.log(`generate-project-md: ${projects.length} fichiers écrits dans public/projects/`);
