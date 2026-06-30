# Portfolio — Jonas Suhard

Portfolio de preuves, **recruteur-first et agent-readable**.
Live : **[jonassuhard.com](https://jonassuhard.com)**

Growth Engineer · IA appliquée & Automatisation — un profil hybride marketing, IA générative et développement full-stack. Ce site présente des projets réels avec leurs décisions, contraintes, limites et résultats, plutôt qu'une liste de compétences.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19**
- CSS natif (pas de framework), `next/font` (Google + local)
- Déploiement **Vercel** · analytics **cookieless** (Vercel Web Analytics + Speed Insights, sans bannière)

## Ce que le projet démontre (mesuré)

- **PageSpeed 100 / 100 / 100 / 100** (performance · accessibilité · best practices · SEO), mobile **et** desktop
- **Sécurité A+** ([securityheaders.com](https://securityheaders.com)) : CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy
- **Agent-readable** : JSON-LD (Person, WebSite, Project), `llms.txt`, `profile.json`, `profile.md`, un `.md` par projet
- Optimisations LCP : `experimental.inlineCss`, `display:optional` + préchargement ciblé des fonts du hero

## Architecture

- `lib/projects.ts` — **source unique** des données (projets, profil, compétences) → alimente les pages, les `/projects/*.md` et `profile.json`
- `lib/json-ld.ts` — données structurées schema.org
- `next.config.mjs` — headers de sécurité + inline CSS
- `app/` — App Router (home, projets, case studies, recruteurs, méthode, à-propos, mentions légales, confidentialité)

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

---
Contact : [contact@jonassuhard.com](mailto:contact@jonassuhard.com) · [LinkedIn](https://www.linkedin.com/in/jonas-suhard-b73923245/)
