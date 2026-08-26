// Génère public/projects/<slug>.md depuis lib/projects.ts (source unique).
// Lancé en `prebuild` : les .md ne peuvent plus dériver du .ts à la main.
// Exécuté via tsx (voir package.json). Format volontairement stable pour un
// diff minimal ; toute divergence de contenu vient donc du .ts, pas du gabarit.
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { evidenceLevelMeta, projects, type Project } from "../lib/projects";
import { knowledgePages, type KnowledgePage } from "../lib/knowledge";
import { faqMeta, faqItems } from "../lib/faq";
import {
  claimStatusMeta,
  contentReviewDate,
  verificationItems
} from "../lib/verification";

const here = dirname(fileURLToPath(import.meta.url));
const publicDir = join(here, "..", "public");
const outDir = join(publicDir, "projects");
const knowledgeDir = join(publicDir, "knowledge");

function bullets(items: string[]) {
  return items.map((item) => `- ${item}`).join("\n");
}

function storyToMarkdown(project: Project) {
  const story = project.story;
  if (!story) return "";

  const lines = [
    `# ${project.title}`,
    "",
    "## À quoi ça sert",
    "",
    project.summary,
    "",
    `## ${story.purposeTitle}`,
    "",
    story.purposeLead,
    "",
    bullets(story.purpose),
    "",
    "## Trois rôles",
    "",
    bullets(story.roles.map((role) => `${role.title} — ${role.text}`)),
    "",
    "## Versions",
    ""
  ];

  for (const version of project.versions ?? []) {
    lines.push(
      `### ${version.label} — ${version.name}`,
      "",
      `État public : ${version.publicStatus ?? version.status}.`,
      "",
      version.summary,
      ""
    );
  }

  lines.push(
    "## Ce que Jonas a fait",
    "",
    bullets(project.delivered),
    "",
    "## Ce que ça prouve",
    "",
    project.proofLine,
    "",
    bullets(project.recruiterProof)
  );

  if (project.evidenceNote) lines.push("", project.evidenceNote);

  lines.push("", "## Visuels", "");
  for (const group of story.galleryGroups) {
    lines.push(`### ${group.title}`, "", group.description, "");
    for (const visual of group.images) {
      lines.push(`![${visual.caption}](${visual.src})`, "");
    }
  }

  lines.push(
    "",
    "## Limites",
    "",
    bullets([
      ...project.limits,
      ...(project.versions ?? []).flatMap((version) =>
        version.limits.map((limit) => `${version.label} : ${limit}`)
      ),
      ...(project.notMeasured ?? [])
    ]),
    "",
    "## Repères techniques",
    "",
    "| Repère | Détail |",
    "| --- | --- |",
    `| Format | ${project.type} |`,
    `| Période | ${project.period} |`,
    `| Rôle de Jonas | ${project.role} |`,
    `| Statut | ${project.status} |`,
    `| Niveau de preuve | ${evidenceLevelMeta[project.evidenceLevel].label} |`,
    `| Stack | ${project.stack.join(", ")} |`,
    "",
    "## Preuves techniques",
    ""
  );

  for (const version of project.versions ?? []) {
    lines.push(
      `### ${version.label}`,
      "",
      `Statut interne : ${version.status}.`,
      "",
      bullets(version.evidence),
      ""
    );
  }

  lines.push(
    "## Liens",
    "",
    `- [Étude de cas](/projets/${project.slug})`,
    ...project.links
      .filter((link) => link.href !== `/projects/${project.slug}.md`)
      .map((link) => `- [${link.label}](${link.href})`)
  );

  return `${lines.join("\n").trimEnd()}\n`;
}

function toMarkdown(project: Project) {
  if (project.story) return storyToMarkdown(project);

  const lines = [
    `# ${project.title}`,
    "",
    "## Repères",
    "",
    "| Repère | Détail |",
    "| --- | --- |",
    `| Format | ${project.type} |`,
    `| Période | ${project.period} |`,
    `| Rôle de Jonas | ${project.role} |`,
    `| Statut | ${project.status} |`,
    `| Niveau de preuve | ${evidenceLevelMeta[project.evidenceLevel].label} |`,
    `| Stack | ${project.stack.join(", ")} |`,
    "",
    "## À quoi ça sert",
    "",
    project.summary,
    "",
    "## Ce que Jonas a fait",
    "",
    bullets(project.delivered),
    "",
    "## Ce que ça prouve",
    "",
    project.proofLine,
    "",
    bullets(project.recruiterProof)
  ];
  if (project.evidenceNote) {
    lines.push("", project.evidenceNote);
  }
  if (project.versions?.length) {
    lines.push("", "### Versions", "");
    for (const version of project.versions) {
      lines.push(
        `#### ${version.label} — ${version.name}`,
        "",
        "| Repère | Détail |",
        "| --- | --- |",
        `| État actuel | ${version.status} |`,
        "",
        version.summary,
        "",
        "##### Éléments vérifiés",
        "",
        bullets(version.evidence),
        ""
      );
    }
  }
  if (project.gallery?.length) {
    lines.push("", "## Visuels", "");
    for (const visual of project.gallery) {
      lines.push(`![${visual.caption}](${visual.src})`, "");
    }
  }
  lines.push(
    "",
    "## Limites",
    "",
    bullets([
      ...project.limits,
      ...(project.versions ?? []).flatMap((version) =>
        version.limits.map((limit) => `${version.label} : ${limit}`)
      ),
      ...(project.notMeasured ?? [])
    ]),
    "",
    "## Liens",
    "",
    `- [Étude de cas](/projets/${project.slug})`,
    ...project.links
      .filter((link) => link.href !== `/projects/${project.slug}.md`)
      .map((link) => `- [${link.label}](${link.href})`)
  );
  return `${lines.join("\n")}\n`;
}

function knowledgeToMarkdown(page: KnowledgePage) {
  const lines = [
    `# ${page.title}`,
    "",
    `Publication : ${page.published}.`,
    `Dernière vérification : ${page.updated}.`,
    "",
    "## Réponse courte",
    "",
    bullets(page.answer),
    "",
    "## Problème",
    "",
    page.problem,
    "",
    "## Méthode",
    "",
    bullets(page.method),
    "",
    "## Exemple",
    "",
    page.example,
    "",
    "## Limites",
    "",
    bullets(page.limits),
    "",
    "## À retenir",
    "",
    bullets(page.takeaway),
    "",
    "## Preuves",
    "",
    bullets(page.proofs.map((proof) => `${proof.label} : ${proof.href}`))
  ];
  if (page.faq && page.faq.length) {
    lines.push("", "## FAQ", "");
    for (const item of page.faq) {
      lines.push(`### ${item.q}`, "", item.a, "");
    }
  }
  return `${lines.join("\n").trimEnd()}\n`;
}

mkdirSync(outDir, { recursive: true });
for (const project of projects as Project[]) {
  writeFileSync(join(outDir, `${project.slug}.md`), toMarkdown(project), "utf8");
}

mkdirSync(knowledgeDir, { recursive: true });
for (const page of knowledgePages as KnowledgePage[]) {
  writeFileSync(join(knowledgeDir, `${page.slug}.md`), knowledgeToMarkdown(page), "utf8");
}

// claims.json régénéré depuis lib/faq (source unique partagée avec la FAQ humaine).
const claims = { ...faqMeta, claims: faqItems.map((item) => ({ q: item.q, a: item.a })) };
writeFileSync(join(publicDir, "claims.json"), `${JSON.stringify(claims, null, 2)}\n`, "utf8");

const verification = {
  reviewed_at: contentReviewDate,
  methodology: Object.fromEntries(
    Object.entries(claimStatusMeta).map(([status, meta]) => [status, meta.description])
  ),
  claims: verificationItems
};
writeFileSync(
  join(publicDir, "verification.json"),
  `${JSON.stringify(verification, null, 2)}\n`,
  "utf8"
);

console.log(
  `generate: ${projects.length} projets, ${knowledgePages.length} knowledge, claims.json (${faqItems.length} Q/R), verification.json (${verificationItems.length} entrées)`
);
