import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { knowledgePages } from "../lib/knowledge";
import { featuredProjects, projects, recruiterFeatured, site } from "../lib/projects";
import { verificationItems } from "../lib/verification";
import { projectJsonLd } from "../lib/json-ld";

test("les slugs et liens de projet sont uniques", () => {
  assert.equal(new Set(projects.map((project) => project.slug)).size, projects.length);
  for (const project of projects) {
    const hrefs = project.links.map((link) => link.href);
    assert.equal(new Set(hrefs).size, hrefs.length, `Liens dupliqués pour ${project.slug}`);
  }
});

test("un projet publiquement vérifiable expose une source externe", () => {
  for (const project of projects.filter((item) => item.evidenceLevel === "public")) {
    assert.ok(
      project.links.some((link) => link.external && link.href.startsWith("https://")),
      `${project.slug} n'a pas de source publique`
    );
  }
});

test("les cartes de projets exposent leurs destinations publiques vérifiées", () => {
  const expectedDestinations = {
    "les-petites-griffes": {
      label: "Site live",
      href: "https://lespetitesgriffes.fr/"
    },
    capselys: {
      label: "Production actuelle, hors staging",
      href: "https://www.capselys.fr/"
    },
    iscom: {
      label: "Article public",
      href: "https://www.iscom.fr/actualites/lia-change-de-role-les-communicants-aussi"
    },
    preuvia: {
      label: "Site live",
      href: "https://preuvia.vercel.app"
    },
    "cortex-bridge": {
      label: "GitHub",
      href: "https://github.com/Jonassuhard/cortex-bridge"
    },
    "battle-engine": {
      label: "Chaîne YouTube",
      href: "https://www.youtube.com/channel/UCBdIZLI1Z_EmaZgalR8GsHw"
    },
    "claude-code-soul": {
      label: "GitHub",
      href: "https://github.com/Jonassuhard/claude-code-soul"
    }
  } as const;

  for (const [slug, destination] of Object.entries(expectedDestinations)) {
    const project = projects.find((item) => item.slug === slug);
    assert.ok(project, `${slug} est absent du portfolio`);
    assert.ok(
      project.links.some(
        (link) =>
          link.external &&
          link.label === destination.label &&
          link.href === destination.href
      ),
      `${slug} n'expose pas ${destination.label} sur sa carte`
    );
  }
});

test("les cartes projet utilisent des illustrations bitmap transparentes en couleur", async () => {
  assert.equal(projects.length, 14);
  assert.equal(
    existsSync(new URL("../scripts/generate-card-schematics.mjs", import.meta.url)),
    false,
    "l'ancien générateur de schémas ne doit plus pouvoir écraser les illustrations"
  );

  for (const project of projects) {
    assert.match(project.image, /-art\.webp$/, `${project.slug} utilise encore une URL d'image mise en cache`);
    assert.equal(project.fullColorMedia, true, `${project.slug} perd encore sa couleur`);
    const assetUrl = new URL(`../public${project.image}`, import.meta.url);
    assert.ok(existsSync(assetUrl), `Illustration absente pour ${project.slug}`);
    const metadata = await sharp(fileURLToPath(assetUrl)).metadata();
    assert.equal(metadata.width, 760, `${project.slug} n'est pas large de 760 px`);
    assert.equal(metadata.height, 460, `${project.slug} n'est pas haut de 460 px`);
    assert.equal(metadata.hasAlpha, true, `${project.slug} n'a pas de transparence réelle`);
  }
});

test("les sélections recruteur ne contiennent que des projets principaux", () => {
  for (const project of [...featuredProjects, ...recruiterFeatured]) {
    assert.equal(project.tier, 1, `${project.slug} n'est pas un projet principal`);
  }
});

test("les sélections principales placent Job Radar devant les preuves complémentaires", () => {
  assert.deepEqual(
    featuredProjects.map((project) => project.slug),
    ["job-radar", "cortex-bridge", "les-petites-griffes"]
  );
  assert.deepEqual(
    recruiterFeatured.map((project) => project.slug),
    ["job-radar", "cortex-bridge", "les-petites-griffes"]
  );
  assert.equal(featuredProjects.some((project) => project.slug === "iscom"), false);
  assert.equal(recruiterFeatured.some((project) => project.slug === "iscom"), false);
  assert.ok(projects.some((project) => project.slug === "iscom"));
});

test("Job Radar publie un contrat produit configurable sans auto-candidature", () => {
  const project = projects.find((item) => item.slug === "job-radar");

  assert.ok(project);
  const architecture = project.architecture ?? [];
  assert.equal(project.tier, 1);
  assert.equal(project.evidenceLevel, "public");
  assert.equal(project.fullColorMedia, true);
  assert.match(project.repoStatus ?? "", /github\.com\/Jonassuhard\/job-radar-community/i);
  assert.match(project.need?.title ?? "", /offres|recherche/i);
  assert.ok((project.need?.items.length ?? 0) >= 3);
  assert.match(project.intention?.title ?? "", /classer|radar|pertinence|explicable/i);
  assert.ok((project.intention?.items.length ?? 0) >= 4);
  assert.match(
    project.architectureImage?.caption ?? "",
    /architecture livrée[\s\S]*local_demo[\s\S]*import JSON local normalisé[\s\S]*sans accès distant[\s\S]*beta/i
  );
  assert.match(project.limits.join("\n"), /pas d.auto-candidature|n.envoie aucune candidature/i);
  assert.match(project.limits.join("\n"), /LinkedIn[\s\S]*Indeed[\s\S]*Welcome to the Jungle/i);
  assert.match(
    architecture.join("\n"),
    /local_demo[\s\S]*import JSON local normalisé[\s\S]*aucun connecteur distant/i
  );
  assert.doesNotMatch(
    architecture.join("\n"),
    /France Travail|Adzuna|Jooble|Remotive|ATS publics/i
  );
  assert.match(
    (project.v2 ?? []).join("\n"),
    /France Travail[\s\S]*Adzuna[\s\S]*Jooble[\s\S]*Remotive[\s\S]*ATS publics[\s\S]*futurs/i
  );
  assert.match(
    project.limits.join("\n"),
    /France Travail[\s\S]*Adzuna[\s\S]*Jooble[\s\S]*Remotive[\s\S]*ATS publics[\s\S]*aucun de ces connecteurs distants n.est livré/i
  );
  assert.ok(
    project.links.some(
      (link) =>
        link.external &&
        link.href === "https://github.com/Jonassuhard/job-radar-community"
    )
  );

  const visuals = [project.heroImage, project.architectureImage, ...(project.gallery ?? [])]
    .filter(Boolean);
  assert.equal(visuals.length, 5);
  assert.equal(new Set(visuals.map((visual) => visual?.src)).size, 5);
  for (const visual of visuals) {
    assert.ok(visual);
    const asset = new URL(`../public${visual.src}`, import.meta.url);
    assert.ok(existsSync(asset), `${visual.src} est absent du dossier public`);
    assert.ok(statSync(asset).size < 700_000, `${visual.src} dépasse 700 ko`);
  }

  const jsonLd = projectJsonLd("job-radar");
  assert.ok(jsonLd);
  assert.equal(jsonLd["@type"], "SoftwareSourceCode");
  assert.equal(
    jsonLd.codeRepository,
    "https://github.com/Jonassuhard/job-radar-community"
  );
});

test("la page projet rend les blocs besoin, intention et architecture sans dépendre de Cool Bank", () => {
  const page = readFileSync(
    new URL("../app/projets/[slug]/page.tsx", import.meta.url),
    "utf8"
  );

  assert.match(page, /project\.need/);
  assert.match(page, /project\.intention/);
  assert.match(page, /project\.architectureImage/);
  assert.doesNotMatch(page, /sources autorisées/i);
  assert.doesNotMatch(page, /Cool Bank|educool-la-herse/);
});

test("les surfaces publiques et machine citent la même preuve Job Radar", () => {
  const homepage = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
  const recruiters = readFileSync(
    new URL("../app/recruteurs/page.tsx", import.meta.url),
    "utf8"
  );
  const llms = readFileSync(new URL("../public/llms.txt", import.meta.url), "utf8");
  const profileMarkdown = readFileSync(
    new URL("../public/profile.md", import.meta.url),
    "utf8"
  );
  const skillsMarkdown = readFileSync(
    new URL("../public/skills.md", import.meta.url),
    "utf8"
  );
  const profile = JSON.parse(
    readFileSync(new URL("../public/profile.json", import.meta.url), "utf8")
  );
  const machineProject = profile.projects.find(
    (item: { project: string }) => item.project === "Job Radar Community"
  );
  const verification = verificationItems.find(
    (item) => item.id === "job-radar-community-beta-1"
  );

  for (const surface of [homepage, recruiters, llms, profileMarkdown, skillsMarkdown]) {
    assert.match(surface, /Job Radar/);
  }
  assert.ok(machineProject);
  assert.equal(machineProject.repository, "https://github.com/Jonassuhard/job-radar-community");
  assert.ok(machineProject.verification_ids.includes("job-radar-community-beta-1"));
  assert.ok(verification);
  assert.equal(verification.status, "publicly-verified");
  assert.match(verification.sourceHref ?? "", /job-radar-community[\s\S]*v0\.1\.0-beta\.1\.json/);
  assert.match(verification.claim, /336 tests backend/);
  assert.match(verification.claim, /36 tests frontend/);
  assert.match(verification.claim, /37 tests E2E/);
});

test("la fiche Markdown Job Radar projette le besoin, l'intention et les limites", () => {
  const markdown = readFileSync(
    new URL("../public/projects/job-radar.md", import.meta.url),
    "utf8"
  );

  assert.match(markdown, /## Besoin/);
  assert.match(markdown, /## Intention/);
  assert.match(markdown, /## Architecture/);
  assert.match(markdown, /## Résultats vérifiés/);
  assert.match(markdown, /## Limites/);
  assert.match(markdown, /github\.com\/Jonassuhard\/job-radar-community/);
  assert.match(markdown, /LinkedIn[\s\S]*Indeed[\s\S]*Welcome to the Jungle/i);
});

test("Cool Bank raconte deux versions 3D distinctes avant ses statuts techniques", () => {
  const project = projects.find((item) => item.slug === "educool-la-herse") as
    | ((typeof projects)[number] & {
        fullColorMedia?: boolean;
        heroImage?: { src: string };
        story?: {
          purpose: string[];
          roles: Array<{ title: string }>;
          galleryGroups: Array<{ title: string; images: unknown[] }>;
        };
      })
    | undefined;

  assert.ok(project);
  assert.equal(project.title, "Cool Bank - donner vie à une banque de classe");
  assert.equal(project.fullColorMedia, true);
  assert.match(project.heroImage?.src ?? "", /cool-bank-v3-world/);
  assert.deepEqual(project.story?.roles.map((role) => role.title), [
    "L'élève",
    "Le banquier",
    "L'enseignante"
  ]);
  assert.deepEqual(project.story?.galleryGroups.map((group) => group.title), [
    "V3 — la reconstruction locale",
    "V2 — la boucle 3D déjà jouable"
  ]);
  assert.ok(project.story?.galleryGroups.every((group) => group.images.length >= 3));

  const publicCopy = [
    project.title,
    project.summary,
    project.cardLine,
    ...(project.versions ?? []).flatMap((version) => [version.name, version.summary])
  ].join("\n");
  assert.doesNotMatch(publicCopy, /V2[^\n]*2D|V3 ajoute (?:un )?monde 3D|2D[^\n]*V3[^\n]*3D/i);
  assert.match(project.versions?.[0].summary ?? "", /monde 3D/i);
  assert.match(project.versions?.[1].summary ?? "", /reconstruction séparée/i);

  const storyComponent = readFileSync(
    new URL("../app/projets/[slug]/project-story.tsx", import.meta.url),
    "utf8"
  );
  assert.doesNotMatch(storyComponent, /version\.limits/);
});

test("la carte Cool Bank utilise l'illustration des deux mondes et non l'écran de rôles", () => {
  const project = projects.find((item) => item.slug === "educool-la-herse");
  const illustration = new URL(
    "../public/assets/cards/cool-bank-art.webp",
    import.meta.url
  );
  const formerScreen = new URL(
    "../public/assets/cards/cool-bank-roles.webp",
    import.meta.url
  );

  assert.ok(project);
  assert.equal(project.image, "/assets/cards/cool-bank-art.webp");
  assert.equal(existsSync(illustration), true);
  assert.equal(existsSync(formerScreen), false);
});

test("Cortex Bridge reste une preuve logicielle publique et qualifiée", () => {
  const cortex = projects.find((project) => project.slug === "cortex-bridge");
  const release = verificationItems.find(
    (claim) => claim.id === "cortex-bridge-release-0-5-3"
  );

  assert.ok(cortex);
  assert.equal(cortex.evidenceLevel, "public");
  assert.ok(cortex.stack.includes("Next.js"));
  assert.match(cortex.summary, /ChatGPT en cerveau d'un agent de code local/i);
  assert.match(cortex.summary, /sans ajouter un second abonnement dédié/i);
  assert.match(cortex.evidenceNote ?? "", /629 tests backend/);
  assert.ok(release);
  assert.equal(release.status, "publicly-verified");
  assert.equal(release.checkedAt, "2026-08-26");
  assert.equal(
    release.sourceHref,
    "https://github.com/Jonassuhard/cortex-bridge/blob/v0.5.3/docs/verification/v0.5.3.json"
  );
  assert.match(release.note, /ne prouve pas une compatibilité continue/i);
  assert.match(release.note, /cycle macOS propre[^.]*pas été rejoué/i);
});

test("aucune capture Educool issue d'une classe réelle n'est publiée", () => {
  const project = projects.find((item) => item.slug === "educool-la-herse");
  const unsafeAssets = [
    "educool-dashboard.webp",
    "educool-saisie-ceintures.webp",
    "educool-livrets.webp"
  ];

  assert.ok(project?.story);
  const publishedMedia = JSON.stringify(project.story.galleryGroups);
  for (const asset of unsafeAssets) {
    assert.equal(
      existsSync(new URL(`../public/assets/proof/educool/${asset}`, import.meta.url)),
      false,
      `${asset} expose encore une capture scolaire non synthétique`
    );
    assert.doesNotMatch(publishedMedia, new RegExp(asset.replace(".", "\\.")));
  }
  assert.doesNotMatch(publishedMedia, /données fictives|sans identité réelle d'enfant/i);
});

test("les prototypes historiques RAG et Board restent qualifiés par leurs preuves archivées", () => {
  const rag = projects.find((item) => item.slug === "rag-starter-kit");
  const board = projects.find((item) => item.slug === "board-ia-pme");
  const archivedProof = verificationItems.find(
    (item) => item.id === "rag-board-historical-prototypes"
  );
  const edusemantix = projects.find((item) => item.slug === "edusemantix");
  const pokemon = projects.find((item) => item.slug === "pokemon-gen4-toolkit");
  const battle = projects.find((item) => item.slug === "battle-engine");
  const preuvia = projects.find((item) => item.slug === "preuvia");

  for (const project of [rag, board]) {
    assert.ok(project);
    assert.equal(project.evidenceLevel, "private");
    assert.match(project.status, /prototype privé historique.*source à restaurer/i);
    assert.match(project.repoStatus ?? "", /source d'origine.*absente/i);
    assert.match(project.evidenceNote ?? "", /audit privé.*29 juin 2026/i);
  }
  assert.ok(archivedProof);
  assert.equal(archivedProof.status, "private-evidence");
  assert.match(archivedProof.note, /octets.*absents/i);

  assert.ok(rag?.stack.includes("Next.js 15"));
  assert.doesNotMatch(JSON.stringify(rag), /Next\.js 16|tests? (?:verts?|passés?|sans échec)/i);
  assert.match(rag?.delivered.join("\n") ?? "", /prototype historique/i);

  assert.match(board?.delivered.join("\n") ?? "", /437 lignes.*10 fichiers/i);
  assert.doesNotMatch(
    [...(board?.stack ?? []), ...(board?.delivered ?? [])].join("\n"),
    /FastAPI|Celery|Redis|Qdrant/i
  );
  assert.match(board?.limits.join("\n") ?? "", /FastAPI.*pas dans l'implémentation/i);
  assert.match(JSON.stringify(board), /Mistral Large.*conclusion/i);

  const updatedSchematics = [
    "rag-starter-kit/rag-document-pipeline-20260828.webp",
    "rag-starter-kit/rag-tenant-isolation-20260828.webp",
    "rag-starter-kit/rag-evaluation-loop-20260828.webp",
    "board-ia-pme/board-isolated-agents-20260828.webp",
    "board-ia-pme/board-orchestration-20260828.webp",
    "board-ia-pme/board-status-20260828.webp"
  ];
  for (const asset of updatedSchematics) {
    assert.equal(
      existsSync(new URL(`../public/assets/proof/${asset}`, import.meta.url)),
      true,
      `${asset} manque`
    );
    assert.match(JSON.stringify([rag, board]), new RegExp(asset.replaceAll(".", "\\.")));
  }
  assert.match(edusemantix?.status ?? "", /actif.*refonte V2/i);
  assert.doesNotMatch(JSON.stringify(pokemon), /EmulatorJS/i);
  assert.match(battle?.status ?? "", /25 août 2026/i);
  assert.match(preuvia?.proofLine ?? "", /quatre IA principales.*Mistral/i);
});

test("les projets utilisent les médias frais retenus lors de l'audit", () => {
  const expectedAssets = [
    "/assets/proof/educool/cool-bank-v3-world-20260826.webp",
    "/assets/proof/educool/cool-bank-v2-teacher.webp",
    "/assets/proof/hoopsphere/hoopsphere-import-emarque.webp",
    "/assets/proof/cortex-bridge/cortex-stop-diagnostic.webp",
    "/assets/proof/claude-code-soul/soul-github-repo.webp",
    "/assets/video/les-petites-griffes.mp4",
    "/assets/video/les-petites-griffes-poster.webp",
    "/assets/video/battle-engine-intro-hd.mp4",
    "/assets/video/battle-engine-intro-hd-poster.webp"
  ];

  for (const asset of expectedAssets) {
    assert.ok(existsSync(new URL(`../public${asset}`, import.meta.url)), `${asset} manque`);
  }

  const bySlug = (slug: string) => projects.find((item) => item.slug === slug);
  assert.equal(bySlug("les-petites-griffes")?.video, "/assets/video/les-petites-griffes.mp4");
  assert.equal(bySlug("battle-engine")?.video, "/assets/video/battle-engine-intro-hd.mp4");
  assert.equal(
    bySlug("educool-la-herse")?.heroImage?.src,
    "/assets/proof/educool/cool-bank-v3-world-20260826.webp"
  );
  assert.match(JSON.stringify(bySlug("educool-la-herse")?.story), /cool-bank-v2-teacher\.webp/);
  assert.match(JSON.stringify(bySlug("hoopsphere")?.gallery), /hoopsphere-import-emarque\.webp/);
  assert.match(JSON.stringify(bySlug("cortex-bridge")?.gallery), /cortex-stop-diagnostic\.webp/);
  assert.match(JSON.stringify(bySlug("claude-code-soul")?.gallery), /soul-github-repo\.webp/);
});

test("Cool Bank / La Herse expose séparément les versions V2 et V3", () => {
  const project = projects.find((item) => item.slug === "educool-la-herse") as
    | ((typeof projects)[number] & {
        versions?: Array<{ label: string; status: string; publicStatus?: string }>;
      })
    | undefined;
  const llms = readFileSync(new URL("../public/llms.txt", import.meta.url), "utf8");
  const markdown = readFileSync(
    new URL("../public/projects/educool-la-herse.md", import.meta.url),
    "utf8"
  );
  const profile = JSON.parse(
    readFileSync(new URL("../public/profile.json", import.meta.url), "utf8")
  );
  const machineProject = profile.projects.find(
    (item: { project: string }) => item.project === "Cool Bank / La Herse"
  );

  assert.ok(project);
  assert.equal(project.shortTitle, "Cool Bank / La Herse");
  assert.deepEqual(project.versions?.map((version) => version.label), ["V2", "V3"]);
  assert.match(project.versions?.[0].status ?? "", /LOCAL_SINGLE_DEVICE_READY/);
  assert.match(project.versions?.[1].status ?? "", /READY_FOR_HUMAN_RECIPE/);
  assert.doesNotMatch(
    project.versions?.[1].publicStatus ?? "",
    /READY_FOR_HUMAN_RECIPE|GO_PILOTE_LOCAL/
  );
  assert.match(llms, /Cortex Bridge/);
  assert.match(llms, /Cool Bank \/ La Herse/);
  assert.match(llms, /V2[^\n]*LOCAL_SINGLE_DEVICE_READY/);
  assert.match(llms, /V3[^\n]*READY_FOR_HUMAN_RECIPE/);
  assert.match(markdown, /## Versions[\s\S]*### V2[\s\S]*### V3/);
  assert.equal(machineProject.versions.length, 2);
});

test("aucun projet privé ne se présente comme copie publique", () => {
  for (const project of projects.filter((item) => item.evidenceLevel !== "public")) {
    assert.doesNotMatch(project.status, /copie publique/i);
  }
});

test("les liens externes incohérents restent masqués jusqu'à leur mise à jour", () => {
  assert.equal(site.malt, null);
});

test("les dates de publication et de modification des articles restent distinctes", () => {
  for (const page of knowledgePages) {
    assert.ok(page.published <= page.updated, `${page.slug} a une date incohérente`);
  }
});

test("les galeries réservent leurs dimensions intrinsèques", () => {
  const imagesFor = (project: (typeof projects)[number]) =>
    project.story?.galleryGroups.flatMap((group) => group.images) ?? project.gallery ?? [];
  const sources = projects.flatMap(imagesFor).map((image) => image.src);

  assert.equal(new Set(sources).size, sources.length, "Une image est réutilisée dans plusieurs galeries");
  for (const project of projects) {
    const images = imagesFor(project);
    assert.ok(images.length >= 3, `${project.slug} a moins de trois visuels`);
    for (const image of images) {
      const asset = new URL(`../public${image.src}`, import.meta.url);
      assert.ok(image.width > 0 && image.height > 0, `${image.src} n'a pas de dimensions`);
      assert.ok(existsSync(asset), `${image.src} est absent du dossier public`);
      assert.ok(statSync(asset).size < 700_000, `${image.src} dépasse 700 ko`);
    }
  }
});

test("le registre ne revendique pas de dépôt GitHub privé invérifiable", () => {
  const item = verificationItems.find(
    (claim) => claim.id === "rag-board-historical-prototypes"
  );
  assert.ok(item);
  assert.doesNotMatch(item.claim, /dépôts? GitHub|repositories/i);
});

test("les projets secondaires utilisent une preuve courte sans perdre leur détail", () => {
  const page = readFileSync(new URL("../app/projets/page.tsx", import.meta.url), "utf8");

  assert.match(
    page,
    /group\.tier === 1\s*\? project\.summary\s*:\s*project\.cardLine \?\? project\.proofLine \?\? project\.summary/
  );
  assert.match(page, /group\.tier === 1 \? "case-grid" : "case-grid case-grid-compact"/);
});

test("la source machine qualifie l'audit LPG comme preuve privée", () => {
  const profile = JSON.parse(
    readFileSync(new URL("../public/profile.json", import.meta.url), "utf8")
  );
  const fact = profile.citable_facts.les_petites_griffes_live_audit_2026_08_01;
  const project = profile.projects.find(
    (item: { project: string }) => item.project === "Les Petites Griffes"
  );

  assert.equal(fact.status, "private-evidence");
  assert.equal(fact.verification_id, "lpg-live-audit-2026-08-01");
  assert.equal(project.evidence_status, "private-evidence");
  assert.equal(project.verification_id, "lpg-live-audit-2026-08-01");
});

test("la limite LPG reste explicite sur les surfaces humaine et machine", () => {
  const profile = JSON.parse(
    readFileSync(new URL("../public/profile.json", import.meta.url), "utf8")
  );
  const project = projects.find((item) => item.slug === "les-petites-griffes");
  const machineProject = profile.projects.find(
    (item: { project: string }) => item.project === "Les Petites Griffes"
  );
  const surfaces = [
    project?.limits.join("\n") ?? "",
    profile.citable_facts.les_petites_griffes_limit,
    machineProject?.limits ?? "",
    readFileSync(new URL("../public/llms.txt", import.meta.url), "utf8"),
    readFileSync(new URL("../public/profile.md", import.meta.url), "utf8"),
    readFileSync(new URL("../public/projects/les-petites-griffes.md", import.meta.url), "utf8")
  ];

  for (const surface of surfaces) {
    assert.match(surface, /projet familial non factur[ée]/i);
  }
});

test("les fiches Markdown générées évitent les libellés décoratifs", () => {
  const projectDir = new URL("../public/projects/", import.meta.url);
  const markdownFiles = readdirSync(projectDir).filter((file) => file.endsWith(".md"));

  assert.ok(markdownFiles.length > 0);
  for (const file of markdownFiles) {
    const markdown = readFileSync(new URL(`../public/projects/${file}`, import.meta.url), "utf8");
    assert.doesNotMatch(markdown, /^(?:Type|En bref|Preuves)\s*:/m, file);
  }
});

test("la source machine rattache Cortex Bridge à ses preuves publiques", () => {
  const profile = JSON.parse(
    readFileSync(new URL("../public/profile.json", import.meta.url), "utf8")
  );
  const fact = profile.citable_facts.cortex_bridge_release_0_5_3;
  const project = profile.projects.find(
    (item: { project: string }) => item.project === "Cortex Bridge"
  );

  assert.equal(fact.status, "publicly-verified");
  assert.equal(fact.verification_id, "cortex-bridge-release-0-5-3");
  assert.deepEqual(project.verification_ids, [
    "cortex-bridge-repo",
    "cortex-bridge-release-0-5-3"
  ]);
});
