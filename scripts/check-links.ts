import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgePages } from "../lib/knowledge";
import { projects, site } from "../lib/projects";
import { verificationItems } from "../lib/verification";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const checkExternal = process.argv.includes("--external");
const errors: string[] = [];

const routes = new Set([
  "/",
  "/a-propos",
  "/competences",
  "/confidentialite",
  "/knowledge",
  "/mentions-legales",
  "/methode",
  "/preuves",
  "/projets",
  "/recruteurs",
  "/robots.txt",
  "/sitemap.xml",
  "/knowledge-graph.json",
  ...projects.map((project) => `/projets/${project.slug}`),
  ...knowledgePages.map((page) => `/knowledge/${page.slug}`)
]);

const links = new Set<string>([
  `mailto:${site.email}`,
  site.github,
  site.linkedin,
  site.malt,
  site.cvClassic,
  site.cvStyled,
  "/profile.json",
  "/profile.md",
  "/claims.json",
  "/verification.json",
  "/skills.md",
  ...projects.flatMap((project) => [
    `/projets/${project.slug}`,
    `/projects/${project.slug}.md`,
    project.image,
    ...(project.gallery?.map((image) => image.src) ?? []),
    ...project.links.map((link) => link.href)
  ]),
  ...knowledgePages.flatMap((page) => [
    `/knowledge/${page.slug}`,
    `/knowledge/${page.slug}.md`,
    ...page.proofs.map((proof) => proof.href)
  ]),
  ...verificationItems.flatMap((item) => item.sourceHref ? [item.sourceHref] : [])
]);

function checkInternal(href: string) {
  const pathname = href.split(/[?#]/, 1)[0] || "/";
  if (routes.has(pathname)) return;
  const publicPath = join(publicDir, ...pathname.replace(/^\//, "").split("/"));
  if (!existsSync(publicPath)) errors.push(`Lien interne introuvable : ${href}`);
}

for (const href of links) {
  if (href.startsWith("/")) checkInternal(href);
  else if (!href.startsWith("http") && !href.startsWith("mailto:")) {
    errors.push(`Schéma de lien inattendu : ${href}`);
  }
}

async function probe(url: string) {
  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      headers: { "user-agent": "JonasSuhard-Portfolio-LinkCheck/1.0" },
      signal: AbortSignal.timeout(15_000)
    });
    if (
      response.status === 404 ||
      response.status === 410 ||
      (response.status >= 500 && response.status <= 599)
    ) {
      errors.push(`Lien externe en erreur ${response.status} : ${url}`);
    } else if (response.status >= 400) {
      console.warn(`check:links avertissement ${response.status} (accès automatisé limité) : ${url}`);
    }
  } catch (error) {
    errors.push(`Lien externe inaccessible : ${url} — ${String(error)}`);
  }
}

async function main() {
  if (checkExternal) {
    const external = [...links].filter((href) => href.startsWith("http"));
    for (let index = 0; index < external.length; index += 4) {
      await Promise.all(external.slice(index, index + 4).map(probe));
    }
  }

  if (errors.length) {
    console.error(errors.map((error) => `- ${error}`).join("\n"));
    process.exit(1);
  }

  console.log(`check:links OK — ${links.size} liens${checkExternal ? " internes et externes" : " internes"}`);
}

void main();
