# Illustration de presentation Job Radar

## Perimetre

Remplacer la capture utilisee dans la carte de presentation par un embleme
personnalise, comme les autres projets. Ne pas remplacer les captures reelles
de la fiche et de sa galerie. Jonas a ensuite demande « met le sur le site »,
en reponse a la proposition de detourage local et d'integration. Le perimetre
inclut cette carte et sa publication sur le portfolio existant.

## Direction

- Marque porteuse : Portfolio Archive Worldline, `DESIGN.md` conforme au registre.
- Marque du projet : Job Radar, `docs/DESIGN_JOB_RADAR.md` dans son depot source.
- Noir chaud du portfolio, bleu signal Job Radar, fond transparent.
- Format final vise : 760 x 460, ratio 38/23.
- Titre serif a gauche, une ligne courte, radar et offres a droite.
- Illustration generative, pas interface simulee ni preuve produit.
- Outil : generation d'image integree a Codex, pas de CLI/API externe.

## Generation

Sources de style : `cortex-bridge-art.webp` et `preuvia-art.webp`, pour leur
composition uniquement. Le cerveau, le levier, la tour informatique et la
loupe de ces projets ne sont pas repris.

Prompt initial transmis :

```text
Create ONE original raster portfolio project card for JOB RADAR. Input images 1 and 2 are STYLE AND COMPOSITION REFERENCES ONLY: match their quiet black-ink illustrative language, transparent negative space, title on the left and a single recognizable emblem on the right. Do NOT copy their brain, lever, computer tower, magnifying glass, braces, logos, or text. IMPORTANT: the black-looking empty background of the source PNG/WebP is TRANSPARENCY, NOT black paint. Your entire background must be truly transparent alpha, including around the black title; do NOT render a checkerboard or any opaque paper backdrop.
Use case: stylized-concept / editorial brand illustration.
Asset: wide horizontal card intended to display at 760 x 460 pixels, ratio 38:23. Generate a high-resolution landscape canvas with this aspect ratio. Composition must remain fully legible at 320 px wide. Safe margins at least 32 px at the 760 px scale. Leftmost edge: one thin vertical signal-blue rule, matching the reference family. All remaining page negative space transparent. No outer frame, no grid printed in the image (the real website supplies the cream paper and grid).
Left 43%: black Cormorant Garamond-style elegant bold serif title, exactly 'Job Radar', preferably on two lines 'Job' and 'Radar' so no collision with illustration. Below it a single tiny Courier Prime-like typewriter line, exactly 'Repérer les bonnes offres', in signal blue. This is ALL the text. No extra label, no dates, no fake scores, no footer, no logo.
Right 53%: one compact, very clear custom hand-inked emblem of a job-opportunity radar. A circular mechanical radar dial with two concentric rings and one small blue sweeping sector. Three small paper job-offer sheets positioned on its outer ring, two discreet neutral ones and one clearly selected foreground sheet with a simple briefcase pictogram and a blue checkmark. The selected offer, radar, and three paper sheets must read as ONE cohesive emblem, not a flow chart. Make shapes bold, economical and clean, slightly hand-crafted scientific notebook character, with restrained fine hatching for depth and subtle physical thickness like the reference illustrations. No busy micro-details. No large magnifier, no realistic computer or phone, no UI panels, absolutely no screenshot or mock screenshot.
Palette: mostly warm near-black ink #15120E and black fine lines, with restrained Job Radar signal blue #1D4ED8 only on the sweep, selected offer/checkmark, small subtitle and left rule. A few opaque cream #F6F1E2 fills inside the paper sheets only; negative areas remain transparent. No green radar glow, neon, purple, orange, gold, rainbow, gradient background, shadows across the empty canvas, stock 3D business icons, watermark or decorative stars. The feeling is a simplified personal project emblem, not a software sales advertisement. High precision black lettering with French accents spelled exactly.
```

Le premier fichier genere (`exec-d13abde3-05d6-4b9d-975d-247a26a65b45.png`)
est un PNG RGB 1612 x 975 sans alpha. Le damier est imprime, pas transparent.
Une seconde passe de detourage par le meme outil
(`exec-fd969df3-380c-4811-bbe3-b6315a9bac1b.png`) reste egalement RGB sans alpha.
Les deux originaux restent dans le dossier des images generees de ce fil.

## Integration

- Asset : `public/assets/cards/job-radar-illustration-20260909-art.webp`.
- 760 x 460, 66 352 octets, RGBA, 73,02 % des pixels totalement transparents.
- SHA-256 : `1f935e277770e86a4d376c5c0697d22c97d1e354451b22cf1e2e06ca44450201`.
- Detourage local avec Sharp : segmentation des plages neutres connectees aux
  bords et des espaces entre lettres ; les blancs internes des fiches et du
  radar sont conserves. Dessin source conserve, aucun element redessine.
- Originaux et script reproductible conserves dans `tmp/` ; aucun damier brut
  ajoute aux medias publics. Export WebP qualite 92, alpha 100.
- Seul le champ `image` de Job Radar change dans `lib/projects.ts`. Les trois
  cartes accueil/projets/recruteurs utilisent deja ce champ partage.
- Hero et galerie reelle, textes, composants, CSS et autres projets inchanges.
- Ancien fichier conserve ; URL versionnee pour eviter le cache de l'ancienne carte.

## Controles avant publication

- Test de regression execute en echec sur l'ancienne couverture, puis en succes
  sur la nouvelle : URL illustree, separation de la capture hero et ratio alpha.
- `npm run check` : PASS, 103 tests, 14 projets, 126 liens internes.
- `npm run build` : PASS, 40 pages generees.
- Playwright Chromium : accueil, projets, recruteurs et fiche Job Radar en 375
  et 1440 px. Huit HTTP 200, images chargees, aucun debordement, aucune erreur
  JavaScript et aucune violation Axe WCAG 2.2 sur ces controles.
- Illustration rendue en `object-fit: contain`, ratio 38/23 conserve. Captures
  ouvertes pour controle visuel ; detourage inspecte sur creme et fond contraste.
- Fichier servi par le build local identique par SHA-256 a l'asset source.
- `git diff --check` : PASS. Fichiers Markdown/JSON generes inchanges.
- Mesures : `tmp/job-radar-card-local-qa-20260909.json` ; captures :
  `qa/screenshots/job-radar-card-local-*-20260909.png`.

## Publication et limites

La publication vise `master` du depot `Jonassuhard/portfolio-jonassuhard`,
projet Vercel existant `portfolio-jonassuhard`, domaine `jonassuhard.com`.
Le controle post-push doit confirmer le commit sur Vercel, le fichier live par
SHA-256 et les huit vues navigateur. Les preuves de cette etape sont conservees
dans `tmp/job-radar-card-production-qa-20260909.json` et le contexte `PRIMER.md`.

Retour arriere possible vers la production precedente `5146c51` sans effacer
les assets. Aucun nouveau projet Vercel, dependance ni requete tierce ajoutee.
L'illustration n'est pas une capture produit. Ce controle cible la couverture,
pas un nouvel audit exhaustif du site ni un test sur iPhone physique.
