# Portfolio — Jonas Suhard

Portfolio de preuves, **recruteur-first et agent-readable**.
Live : **[jonassuhard.com](https://jonassuhard.com)**

Growth Engineer junior spécialisé en IA appliquée et automatisation, avec les rôles voisins Product Builder IA et Chef de projet IA junior. Ce site présente les décisions, limites et niveaux de preuve de chaque projet, plutôt qu'une simple liste de compétences.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19**
- CSS natif (pas de framework), `next/font` (Google + local)
- Déploiement **Vercel** · Vercel Web Analytics / Speed Insights (mesure agrégée) + Microsoft Clarity chargé uniquement après consentement

## Ce que le projet démontre (mesuré)

- **Lighthouse** : la CI du 20 juillet 2026 vérifie quatre pages à **100** en accessibilité, bonnes pratiques et SEO. Baseline PageSpeed mobile de production avant cette série d'optimisations : **96/100** ; nouvelle mesure publique à effectuer après déploiement.
- **Sécurité A+** ([securityheaders.com](https://securityheaders.com)) : CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy
- **Agent-readable** : JSON-LD (Person, WebSite, Project), `llms.txt`, profils machine, fiches Markdown et registre de preuves
- Optimisations LCP : `experimental.inlineCss`, `display:optional` + préchargement ciblé des fonts du hero

## Architecture

- `lib/projects.ts` — source des données projet et des pages React ; `npm run generate:md` en dérive `public/projects/*.md`
- `lib/knowledge.ts`, `lib/faq.ts`, `lib/verification.ts` — sources respectives de `public/knowledge/*.md`, `public/claims.json` et `public/verification.json`, générés par la même commande
- `lib/json-ld.ts` — données structurées schema.org
- `next.config.mjs` — headers de sécurité + inline CSS
- `app/` — App Router (home, projets, case studies, recruteurs, méthode, à-propos, mentions légales, confidentialité)

Les fichiers `public/llms.txt`, `public/profile.md`, `public/profile.json`, `public/skills.md` et `public/cv.md` sont maintenus manuellement. Ils sont relus avec les PDF du CV et les sources de preuve ; ils ne sont pas écrasés par `generate:md`.

> Détails d'ingénierie (perf/LCP, sécurité, données structurées) + le pattern de l'assistant IA cadré, avec snippets : **[ARCHITECTURE.md](ARCHITECTURE.md)**

## Lancer en local

```bash
npm install
npm run build
npx next start -p 3027   # http://localhost:3027
```

## Notes

- Aucun secret ni donnée client dans ce dépôt (les projets clients restent privés).
- Contenu et données structurées en français (cible : recruteurs FR).
- La typographie de corps est Courier Prime, chargée via `next/font` ; Courier New reste seulement le fallback CSS.

---
Contact : [contact@jonassuhard.com](mailto:contact@jonassuhard.com) · [LinkedIn](https://www.linkedin.com/in/jonas-suhard-b73923245/)
