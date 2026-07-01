# Architecture — jonassuhard.com

Notes d'ingénierie sur ce portfolio (Next.js 16) et sur le pattern d'assistant IA cadré que j'utilise en mission. Objectif : montrer le raisonnement, pas seulement le résultat.

---

## 1. Couche de données : une source unique

Le contenu applicatif (projets, profil, compétences) vit dans un module typé, `lib/projects.ts`. Il alimente les pages React et les données structurées. Les fichiers agent-readable publics (`profile.json`, `profile.md`, `skills.md`, `projects/*.md`, `llms.txt`) sont des miroirs statiques relus pendant les audits AEO pour éviter la dérive.

```ts
export type Project = {
  slug: string;
  title: string;
  type: string;
  period: string;
  stack: string[];
  architecture?: string[];
  decisions: Array<{ decision: string; why: string; rejected: string }>;
  results: string[];
  limits: string[];
  gallery?: Array<{ src: string; caption: string }>;
  // ...
};

export const projects: Project[] = [ /* … */ ];
```

Les pages projet (`app/projets/[slug]/page.tsx`) sont générées statiquement depuis cette liste via `generateStaticParams`, et `lib/json-ld.ts` en dérive les données structurées schema.org.

---

## 2. Performance : tenir le LCP

PageSpeed 100/100/100/100 mobile et desktop. Deux décisions font le travail.

**Le CSS critique est inliné dans le HTML**, ce qui supprime la requête CSS bloquante (le dernier verrou du LCP en 4G lente).

```js
// next.config.mjs
experimental: { inlineCss: true }
```

**Les polices sont chargées avec parcimonie.** Seules les fonts du hero (titre + corps) sont préchargées, en `display: optional` pour ne pas décaler le texte quand la police custom arrive. Le reste passe en `swap`, non préchargé, pour libérer la bande passante mobile.

```ts
const fontTitle = Cormorant_Garamond({ display: "optional", preload: true /* … */ });
const fontType  = Special_Elite({ display: "swap", preload: false /* … */ });
```

Résultat : le premier paint se fait sur un fallback métrique-ajusté (Georgia / Courier New), la font custom prend la main dès qu'elle est en cache. Zéro décalage de mise en page, LCP ≈ FCP.

---

## 3. Sécurité : A+ sans casser le rendu

Note A+ sur securityheaders.com. Les headers sont posés dans `next.config.mjs`. Choix assumé : pas de CSP `script-src` / `style-src` stricte, parce que le site inline du CSS et des scripts (JSON-LD + hydratation Next), et qu'une CSP trop dure casserait le rendu. On garde les directives qui durcissent sans rien casser.

```js
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Content-Security-Policy",
    value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests" }
];
```

Surface d'attaque minimale par construction : site statique, pas d'auth, pas de formulaire, pas d'input utilisateur (seulement des `mailto:`).

---

## 4. Lisible par les agents IA

Un recruteur lit le site. Un agent (ou un crawler LLM) lit les versions structurées. Le même contenu est exposé en JSON-LD (Person, WebSite, Project), en `profile.json`, en `profile.md`, et via `llms.txt`. C'est volontaire : quand un assistant IA résume mon profil, il tape dans une source que je contrôle, pas dans une supposition.

---

## 5. Pattern : l'assistant IA cadré (mission client)

Le code client reste privé, mais voici la méthode que j'applique quand je déploie un assistant en production. Le principe : un chatbot libre est risqué sur des sujets sensibles (prix, disponibilités, adresse). Donc on cadre.

```
Visiteur ─▶ widget chat
              │
              ▼
        garde-fous (scope autorisé : prix, dispo, méthode)
              │  requête cadrée
              ▼
        récupération (base de connaissance : tarifs, FAQ, créneaux)
              │  contexte sourcé
              ▼
        LLM (réponse dans le ton de marque, sans promesse magique)
              │
       ┌──────┴───────┐
       ▼              ▼
  réponse cadrée   hors-scope ─▶ relais humain (DM / contact)
```

Points de design qui comptent en vrai :

- **Récupération avant génération** (RAG simple) sur une petite base de connaissance maîtrisée, plutôt qu'un modèle qui répond de mémoire.
- **Garde-fous explicites** sur le périmètre. L'assistant dit ce qu'il sait et renvoie vers l'humain pour le reste.
- **Disclaimer assumé** côté utilisateur (réponses générées, ne remplacent pas un conseil).
- **Entrée multimodale** quand c'est utile (un assistant analyse une photo envoyée par le client).
- **Sortie qui prépare l'action** (le message de réservation déjà rédigé), pas juste du texte.

Captures de ces assistants en fonctionnement : [les cas concrets sur jonassuhard.com](https://jonassuhard.com/projets/les-petites-griffes).

---

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · CSS natif · Vercel · Vercel Web Analytics / Speed Insights (mesure agrégée) · Microsoft Clarity uniquement après consentement explicite. Côté missions : Python, Playwright, Firebase, Supabase, workflows LLM (RAG, prompt engineering, automatisation).
