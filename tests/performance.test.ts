import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const read = (relativePath: string) =>
  readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");

test("les cartes utilisent une image responsive sans JavaScript client", () => {
  const component = read("app/project-card-image.tsx");
  const cardPages = [
    read("app/page.tsx"),
    read("app/recruteurs/page.tsx"),
    read("app/projets/page.tsx")
  ].join("\n");

  assert.match(component, /from "next\/image"/);
  assert.match(component, /sizes=/);
  assert.match(component, /preload=\{preload\}/);
  assert.match(read("app/projets/page.tsx"), /preload=\{groupIndex === 0 && projectIndex === 0\}/);
  assert.doesNotMatch(cardPages, /<img[^>]+src=\{project\.image\}/);
});

test("le blueprint utilise exactement onze images locales transparentes", () => {
  const blueprint = read("app/blueprint-bg.tsx");
  const css = read("app/globals.css");
  const assets = [
    "01-gears.webp",
    "02-gauge.webp",
    "03-signal-diagram.webp",
    "04-axis-horizontal.webp",
    "05-axis-vertical.webp",
    "06-registration-target.webp",
    "07-construction-ruler.webp",
    "08-dimension-line.webp",
    "09-callout-line.webp",
    "10-frame-corners.webp",
    "11-title-block.webp"
  ];

  assert.equal((blueprint.match(/name: "/g) ?? []).length, 11);
  assert.equal((blueprint.match(/src: "\/assets\/blueprint\//g) ?? []).length, 11);
  assert.doesNotMatch(css, /background-image:url\("\/assets\/blueprint\//);
  assert.match(blueprint, /loading="lazy"/);
  assert.match(blueprint, /fetchPriority="low"/);
  assert.doesNotMatch(blueprint, /<svg|dangerouslySetInnerHTML|blueprintMarkup/);
  assert.doesNotMatch(blueprint + "\n" + css, /https?:\/\/[^"')]*blueprint/i);
  assert.match(css, /\.blueprint-bg__mobile-muted \{ display:none; \}/);
  assert.match(
    css,
    /@media \(max-width:640px\)[\s\S]*\.blueprint-bg__ruler \{ left:14%; top:10%; width:72%; height:10%; \}/
  );
  for (const asset of assets) {
    assert.ok(
      existsSync(new URL("../public/assets/blueprint/" + asset, import.meta.url)),
      asset + " manque"
    );
  }
});

test("tous les grands titres rejouent un glitch chromatique lent et lisible", () => {
  const title = read("app/animated-title.tsx");
  const css = read("app/globals.css");

  assert.match(title, /glitch = true/);
  assert.match(title, /data-glitch=\{glitch \? "true" : undefined\}/);
  assert.match(css, /\.chroma-title\[data-glitch="true"\]::before \{ animation:glitch-cyan-cycle 40s linear infinite; \}/);
  assert.match(css, /\.chroma-title\[data-glitch="true"\]::after \{ animation:glitch-red-cycle 40s linear infinite; \}/);
  assert.match(css, /53\.5%,100% \{ clip-path:inset\(0 0 100% 0\); transform:none; opacity:0; \}/);
  assert.match(css, /color:rgba\(67,174,169,\.82\)/);
  assert.match(css, /color:rgba\(142,31,47,\.78\)/);
  assert.doesNotMatch(css, /@keyframes glitch-(?:cyan|red)-cycle[\s\S]*?translate3d\([^)]*[3-9]px/);
});

test("les optimisations de performance ne retirent aucune animation", () => {
  const layout = read("app/layout.tsx");
  const title = read("app/animated-title.tsx");
  const template = read("app/template.tsx");
  const css = read("app/globals.css");

  assert.doesNotMatch(layout, /Newsreader|IBM_Plex_Mono|Special_Elite|GlitchController/);
  assert.match(title, /data-text=\{children\}/);
  assert.equal((title.match(/className="title-text"/g) ?? []).length, 1);
  assert.doesNotMatch(title, /chroma-layer/);
  assert.match(css, /\.chroma-title::before/);
  assert.match(css, /\.chroma-title::after/);
  assert.match(css, /content:attr\(data-text\) \/ "";/);
  assert.match(css, /@keyframes glitch-cyan-cycle/);
  assert.match(css, /@keyframes glitch-red-cycle/);
  assert.match(css, /@keyframes chroma-cyan/);
  assert.match(css, /prefers-reduced-motion:reduce[\s\S]*\.chroma-title\[data-glitch="true"\]::before,[^}]*animation:none/);
  assert.match(css, /@keyframes holo-diag/);
  assert.match(css, /@keyframes hero-bounce/);
  assert.match(css, /@keyframes page-marker-enter/);
  assert.match(
    css,
    /\.page-transition::before \{[^}]*animation:page-marker-enter \.28s ease-out both;/
  );
  assert.match(template, /className="page-transition"/);
  assert.doesNotMatch(layout, /PageTransition/);
  assert.match(css, /prefers-reduced-motion:reduce[\s\S]*\.nixie-clock::after[^}]*animation:none/);
});

test("le premier écran précharge les deux fontes critiques", () => {
  const layout = read("app/layout.tsx");
  const nav = read("app/site-nav.tsx");
  const home = read("app/page.tsx");

  assert.match(layout, /const fontTitle = localFont\(\{[\s\S]*?cormorant-garamond-700\.woff2[\s\S]*?weight: "700"[\s\S]*?preload: true/);
  assert.match(layout, /const fontBody = Courier_Prime\(\{[\s\S]*?weight: "400"[\s\S]*?display: "optional"[\s\S]*?preload: true/);
  assert.doesNotMatch(layout, /fontTitleSemibold|fontBodyBold|weight: \[/);
  assert.equal((layout.match(/preload: true/g) ?? []).length, 2);
  assert.match(layout, /oslo-ii\.bold\.woff2/);
  assert.match(read("app/globals.css"), /@media \(max-width:640px\)[\s\S]*?\.nixie-clock \{[^}]*font-family:var\(--ft-body\); font-weight:400/);
  assert.equal((nav.match(/<Link\b/g) ?? []).length, (nav.match(/prefetch=\{false\}/g) ?? []).length);
  assert.match(home, /<p className="eyebrow">CDI · Paris ou hybride/);
  assert.match(home, /className="button" href="\/projets" prefetch=\{false\}/);
  const css = read("app/globals.css");
  assert.match(css, /h1 \{[\s\S]*?font-family:var\(--ft-title\)/);
  assert.doesNotMatch(css, /\.hero \.lead \{ font-family:"Courier New",monospace; \}/);
  assert.match(css, /\.hero \.lead \{ line-height:1\.6; \}/);
  assert.match(home, /<p className="lead">[\s\S]*?je construis[\s\S]*?recommande\./i);
  assert.match(css, /h1 \{ font-size:clamp\(34px,9vw,42px\); \}/);
});

test("les assets publics ont un cache long sans être figés", () => {
  const config = read("next.config.mjs");
  assert.match(config, /max-age=2592000, stale-while-revalidate=31536000/);
  assert.doesNotMatch(config, /assetCache[\s\S]*immutable/);
});

test("les ajustements responsive préservent les dimensions et comportements critiques", () => {
  const css = read("app/globals.css");
  const clock = read("app/nixie-clock.tsx");

  assert.match(css, /@media \(min-width:641px\) and \(max-width:840px\)[\s\S]*?\.menubar \{ justify-content:flex-end; padding-left:80px; \}/);
  assert.match(css, /@media \(min-width:641px\) and \(max-width:960px\)[\s\S]*?\.nixie-clock \{ min-inline-size:5ch;/);
  assert.match(css, /@media \(max-width:640px\)[\s\S]*?\.consent-actions \.button \{ flex:1; justify-content:center; min-height:44px; \}/);
  assert.match(css, /\.decoder-hero h1 \{ max-width:18ch; hyphens:none; overflow-wrap:normal; word-break:normal; \}/);
  assert.match(clock, /<span className="nixie-date">—<\/span>/);
  assert.doesNotMatch(clock, /<span className="nixie-date">lun\. 00 sept\. 0000<\/span>/);
});

test("l'observabilité Vercel reste hors du bundle critique", () => {
  const layout = read("app/layout.tsx");
  const observability = read("app/observability.tsx");

  assert.doesNotMatch(layout, /@vercel\/analytics|@vercel\/speed-insights/);
  assert.match(layout, /<Observability \/>/);
  assert.match(observability, /dynamic\(/);
  assert.equal((observability.match(/ssr: false/g) ?? []).length, 2);
  assert.match(observability, /@vercel\/analytics\/next/);
  assert.match(observability, /@vercel\/speed-insights\/next/);
});

test("le header mobile reste compact et le menu répond en moins de 550 ms", () => {
  const layout = read("app/layout.tsx");
  const clock = read("app/nixie-clock.tsx");
  const css = read("app/globals.css");

  assert.match(layout, /className="titlebar-name"/);
  assert.match(layout, /className="titlebar-role"/);
  assert.match(clock, /className="nixie-seconds"/);
  assert.match(clock, /className="nixie-date"/);
  assert.match(css, /\.titlebar-role[^{]*\{[^}]*display:none/);
  assert.match(css, /\.nixie-seconds[^{]*\{[^}]*display:none/);
  assert.match(css, /\.main-nav\.open[^}]*transition:clip-path \.5s/);
  assert.match(css, /\.main-nav\.open a:nth-child\(6\)[^{]*\{[^}]*transition-delay:\.12s/);
  assert.doesNotMatch(css, /\.main-nav\.open[^}]*transition:clip-path 1\.4s/);
});

test("les médias projet réservent leur espace et respectent le mouvement réduit", () => {
  const detailPage = read("app/projets/[slug]/page.tsx");
  const video = read("app/project-video.tsx");

  assert.match(detailPage, /width=\{shot\.width\}/);
  assert.match(detailPage, /height=\{shot\.height\}/);
  assert.match(video, /prefers-reduced-motion: reduce/);
  assert.match(video, /controls/);
  assert.doesNotMatch(detailPage, /<img src=\{shot\.src\}/);
});
