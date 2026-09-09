import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, statSync } from "node:fs";
import { projects } from "../lib/projects";
import { knowledgePages } from "../lib/knowledge";

test("Battle Engine expose cinq vidéos locales avec poster et démarrage progressif", () => {
  const project = projects.find(p => p.slug === "battle-engine")!;
  const sources = [project.video!, ...project.gallery!.map(shot => shot.src)];
  assert.equal(sources.length, 5);
  assert.equal(new Set(sources).size, 5);
  for (const src of sources) {
    const path = new URL(`../public${src}`, import.meta.url);
    assert.ok(statSync(path).size < 4_000_000, `${src} dépasse 4 Mo`);
    assert.ok(existsSync(new URL(`../public${src.replace(".mp4", "-poster.webp")}`, import.meta.url)));
    const bytes = readFileSync(path);
    const boxes: string[] = [];
    for (let offset = 0; offset + 8 <= bytes.length;) {
      const length = bytes.readUInt32BE(offset);
      boxes.push(bytes.toString("ascii", offset + 4, offset + 8));
      assert.ok(length >= 8 && offset + length <= bytes.length, `${src} : conteneur invalide`);
      offset += length;
    }
    assert.equal(boxes[0], "ftyp");
    assert.ok(boxes.includes("moov") && boxes.includes("mdat"));
    assert.ok(boxes.indexOf("moov") < boxes.indexOf("mdat"), `${src} : faststart absent`);
  }
});

test("le Markdown lie les vidéos à leurs posters sans les déclarer comme images", () => {
  const md = readFileSync(new URL("../public/projects/battle-engine.md", import.meta.url), "utf8");
  assert.doesNotMatch(md, /!\[[^\]]*\]\([^)]*\.mp4\)/);
  assert.match(md, /Voir la vidéo de présentation/);
  assert.equal((md.match(/-poster\.webp/g) ?? []).length, 4);
});

test("Les Petites Griffes conserve ses captures et sa vidéo", () => {
  const project = projects.find(p => p.slug === "les-petites-griffes")!;
  assert.equal(project.video, "/assets/video/les-petites-griffes.mp4");
  assert.deepEqual(project.gallery!.map(s => s.src), [
    "/assets/proof/les-petites-griffes/lpg-home.webp",
    "/assets/proof/les-petites-griffes/lpg-compose.webp",
    "/assets/proof/les-petites-griffes/lpg-assistant.webp",
    "/assets/proof/les-petites-griffes/lpg-assistant-vision.webp"
  ]);
});

test("les tableaux de décisions restent utilisables au clavier sur mobile", () => {
  const page = readFileSync(new URL("../app/projets/[slug]/page.tsx", import.meta.url), "utf8");
  assert.match(page, /className="table-scroll" tabIndex=\{0\} role="region" aria-label="Décisions du projet"/);
});

test("les liens de capture Knowledge suivent les galeries actuelles", () => {
  const current = new Set(projects.flatMap(project => [
    ...(project.gallery ?? []).map(shot => shot.src),
    ...(project.story?.galleryGroups.flatMap(group => group.images.map(shot => shot.src)) ?? [])
  ]));
  for (const page of knowledgePages) {
    for (const proof of page.proofs.filter(link => link.href.startsWith("/assets/proof/"))) {
      assert.ok(current.has(proof.href), `${page.slug} pointe vers une ancienne capture : ${proof.href}`);
    }
  }
});
