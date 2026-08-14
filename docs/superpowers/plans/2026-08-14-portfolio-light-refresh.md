# Archive Worldline Light Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Alléger le portfolio et clarifier sa lecture mobile tout en conservant la DA Archive Worldline, les preuves, le décodeur et les scores d'accessibilité.

**Architecture:** Le layout racine ne publie que le JSON-LD indispensable ; le graphe complet reste servi par sa route dédiée. Les optimisations visuelles restent dans les composants existants et le CSS global afin de limiter le risque, avec des tests de contrat sur les sources et une validation réelle du rendu.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS natif, `next/font`, tests Node via `tsx --test`, Lighthouse CLI.

**Spec:** `docs/superpowers/specs/2026-08-14-portfolio-light-refresh-design.md`

## Global Constraints

- Conserver les animations de page, texte et fond, avec `prefers-reduced-motion`.
- Ne pas modifier la promesse, les CTA, les pages projet détaillées ou la logique du décodeur.
- Ne pas ajouter de dépendance, de script tiers ou de requête décorative.
- Conserver des cibles tactiles d'au moins 44 px.
- Ne pas pousser ni déployer sans autorisation explicite.
- Chaque changement de production suit rouge, vert, refactor et commit isolé.

---

### Task 1: Charte et mémoire récupérable

**Files:**
- Modify: `DESIGN.md`
- Create: `docs/audits/2026-08-14-portfolio-source-recovery.md`
- Create: `docs/superpowers/specs/2026-08-14-portfolio-light-refresh-design.md`
- Create: `docs/superpowers/plans/2026-08-14-portfolio-light-refresh.md`

**Interfaces:**
- Consumes: tokens actuels de `app/globals.css` et traces d'archives listées dans l'audit de récupération.
- Produces: charte Design.md canonique et exigences vérifiables pour les tâches suivantes.

- [x] **Step 1: Écrire la charte et le dossier de récupération**

Définir les tokens, les 12 niveaux typographiques, les règles responsive, le budget motion et le statut des documents perdus sans en inventer le contenu.

- [x] **Step 2: Valider la charte**

Run: `cd ~/Desktop/PROJETS_DEV/design-md-google && bun run validate ~/Desktop/SITE_PREUVES_PORTFOLIO_2026/PORTFOLIO_PREUVES/DESIGN.md`

Expected: YAML valide, sections ordonnées, 9 à 15 niveaux typographiques, références résolues et contrastes AA.

Résultat : validation structurelle locale réussie (YAML, 12 niveaux, ordre des huit sections, références et contrastes de 5,35:1 à 16,54:1). Le CLI du dépôt Google local est inutilisable car sa dépendance `citty` n'est pas installée ; aucune dépendance du portfolio n'a été ajoutée pour contourner ce défaut externe.

- [x] **Step 3: Commit**

```bash
git add DESIGN.md docs/audits docs/superpowers
git commit -m "docs(design): restore Archive Worldline source of truth"
```

### Task 2: JSON-LD racine compact

**Files:**
- Modify: `lib/json-ld.ts`
- Modify: `app/layout.tsx`
- Create: `tests/seo.test.ts`

**Interfaces:**
- Consumes: `personJsonLd()`, `websiteJsonLd()` et `knowledgeGraphJsonLd()`.
- Produces: `rootJsonLd()` avec exactement `Person` et `WebSite`.

- [x] **Step 1: Écrire le test rouge**

Tester que `rootJsonLd()` expose deux nœuds `Person` et `WebSite`, que `knowledgeGraphJsonLd()` conserve les projets et que le layout appelle la fonction compacte.

- [x] **Step 2: Vérifier l'échec**

Run: `npx tsx --test tests/seo.test.ts`

Expected: FAIL car `rootJsonLd` n'existe pas.

- [x] **Step 3: Implémenter la fonction compacte**

Ajouter `rootJsonLd()` dans `lib/json-ld.ts`, l'utiliser dans `app/layout.tsx` et déclarer `/knowledge-graph.json` dans les alternates de métadonnées.

- [x] **Step 4: Vérifier le contrat**

Run: `npx tsx --test tests/seo.test.ts && npm run typecheck`

Expected: PASS et zéro erreur TypeScript.

- [x] **Step 5: Commit**

```bash
git add lib/json-ld.ts app/layout.tsx tests/seo.test.ts
git commit -m "perf(seo): trim root structured data"
```

### Task 3: Polices et titre animé sans contrôleur

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/animated-title.tsx`
- Modify: `app/globals.css`
- Delete: `app/glitch-controller.tsx`
- Modify: `tests/performance.test.ts`

**Interfaces:**
- Consumes: `AnimatedTitle({ children, glitch })` inchangé pour les pages.
- Produces: un seul nœud texte visible, `data-text` serveur et glitch CSS périodique.

- [x] **Step 1: Écrire les tests rouges**

Exiger l'absence de `Newsreader`, `IBM_Plex_Mono` et `GlitchController`, un seul `.title-text`, `data-text={children}` lorsque `glitch` est vrai, et une désactivation en mouvement réduit.

- [x] **Step 2: Vérifier l'échec**

Run: `npx tsx --test tests/performance.test.ts`

Expected: FAIL sur les imports de polices et le contrôleur.

- [x] **Step 3: Implémenter**

Supprimer les deux imports `next/font`, faire pointer `--ft-data` vers `--ft-body` et `--ft-italic` vers Georgia, rendre un seul span visible et déplacer le glitch sur `::before` et `::after`.

- [x] **Step 4: Vérifier**

Run: `npx tsx --test tests/performance.test.ts && npm run typecheck`

Expected: PASS, aucun import orphelin et aucun changement d'API des pages.

- [x] **Step 5: Commit**

```bash
git add app/layout.tsx app/animated-title.tsx app/globals.css tests/performance.test.ts
git rm app/glitch-controller.tsx
git commit -m "perf(ui): remove redundant fonts and glitch client"
```

### Task 4: Header et menu mobile

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/nixie-clock.tsx`
- Modify: `app/globals.css`
- Modify: `tests/performance.test.ts`

**Interfaces:**
- Consumes: `NixieClock()`.
- Produces: `.titlebar-name`, `.titlebar-role`, `.nixie-seconds` et menu ouvert en 500 ms maximum.

- [ ] **Step 1: Écrire les tests rouges**

Exiger les trois sélecteurs, la dissimulation du rôle et des secondes sous 640 px, une ouverture de menu au plus égale à `.55s` et des délais au plus égaux à `.18s`.

- [ ] **Step 2: Vérifier l'échec**

Run: `npx tsx --test tests/performance.test.ts`

Expected: FAIL sur les classes absentes et les durées actuelles.

- [ ] **Step 3: Implémenter**

Séparer le nom du rôle, formater l'heure et les secondes dans deux spans, réduire la hauteur du header mobile et borner les transitions.

- [ ] **Step 4: Vérifier**

Run: `npx tsx --test tests/performance.test.ts && npm run typecheck`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/nixie-clock.tsx app/globals.css tests/performance.test.ts
git commit -m "fix(ui): tighten mobile header and navigation"
```

### Task 5: Densité des projets et consentement

**Files:**
- Modify: `app/projets/page.tsx`
- Modify: `app/globals.css`
- Modify: `tests/content.test.ts`
- Modify: `tests/privacy.test.ts`

**Interfaces:**
- Consumes: `Project.cardLine`, `Project.proofLine`, `Project.summary` et `Project.tier`.
- Produces: cartes compactes pour tiers 2 et 3, sans modifier les pages détaillées ni le consentement.

- [ ] **Step 1: Écrire les tests rouges**

Exiger `cardLine ?? proofLine ?? summary` pour les groupes secondaires, la classe `case-grid-compact`, deux actions de consentement et `min-height:44px` sur mobile.

- [ ] **Step 2: Vérifier l'échec**

Run: `npx tsx --test tests/content.test.ts tests/privacy.test.ts`

Expected: FAIL sur le format court et la classe compacte.

- [ ] **Step 3: Implémenter**

Calculer le texte de carte selon le niveau, appliquer la classe compacte et réduire image, marges et interlignes secondaires. Compacter uniquement l'espacement de la bannière mobile.

- [ ] **Step 4: Vérifier**

Run: `npx tsx --test tests/content.test.ts tests/privacy.test.ts && npm run typecheck`

Expected: PASS et logique de consentement inchangée.

- [ ] **Step 5: Commit**

```bash
git add app/projets/page.tsx app/globals.css tests/content.test.ts tests/privacy.test.ts
git commit -m "fix(ui): reduce secondary project density"
```

### Task 6: Validation intégrale

**Files:**
- Modify: `docs/superpowers/plans/2026-08-14-portfolio-light-refresh.md`

**Interfaces:**
- Consumes: branche complète des tâches 1 à 5.
- Produces: preuves de build, sécurité, SEO/AEO, responsive, accessibilité et performance.

- [ ] **Step 1: Vérifier le dépôt**

Run: `npm run check && npm run build`

Expected: tous les tests, contenus, liens, types et routes passent.

- [ ] **Step 2: Vérifier sécurité et dépendances**

Run: `npm audit --omit=dev && gitleaks detect --no-banner --redact --source .`

Expected: zéro vulnérabilité de production et zéro fuite.

- [ ] **Step 3: Tester le rendu local**

Démarrer `npm run start -- -p 3027`, parcourir `/`, `/recruteurs`, `/projets`, `/competences`, `/methode`, `/a-propos` et `/outils/decodeur-offre-ia` à 375, 768 et 1440 px.

Expected: zéro débordement horizontal, zéro erreur console, contenu non masqué, menu utilisable et consentement compact.

- [ ] **Step 4: Mesurer Lighthouse**

Run: `npx lighthouse http://localhost:3027 --only-categories=performance,accessibility,best-practices,seo --form-factor=mobile --output=json --output-path=/tmp/portfolio-lighthouse.json --chrome-flags='--headless=new --no-sandbox'`

Expected: performance au moins 95 ; accessibilité, bonnes pratiques et SEO à 100 ; LCP au plus 2,5 s ; CLS inférieur à 0,05 ; TBT inférieur à 100 ms.

- [ ] **Step 5: Vérifier les endpoints agents et les headers**

Contrôler `/llms.txt`, `/profile.json`, `/claims.json`, `/knowledge-graph.json`, `/sitemap.xml`, CSP, HSTS, X-Content-Type-Options, Referrer-Policy et Permissions-Policy.

Expected: réponses 200, JSON valide, graphe complet disponible et headers présents.

- [ ] **Step 6: Mettre à jour ce plan et arrêter avant publication**

Cocher chaque étape prouvée, consigner les métriques finales, vérifier `git status --short --branch`, puis proposer merge local, PR ou conservation de branche. Aucun push ou déploiement implicite.
