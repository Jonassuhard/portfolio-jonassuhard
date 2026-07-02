# Ajouter une page Knowledge (article citable)

Template pensé pour être référencé par Google et cité par les LLM. Une page = une entrée dans `lib/knowledge.ts`. Tout le reste (HTML, Markdown agent, JSON-LD Article + FAQ, sitemap) se génère.

## 1. Écrire la page

Ouvrir `lib/knowledge.ts`, copier une entrée existante, remplir :

- `slug` : url courte, en-minuscules-avec-tirets (devient `/knowledge/<slug>`).
- `title` : la question complète (h1). `shortTitle` : version courte (nav, onglet, OG).
- `description` : 1 phrase ≤ 155 caractères (meta description + OG).
- `updated` : date `AAAA-MM-JJ`.
- `answer` : 4 à 5 puces, la réponse directe en premier.
- `problem` : 1 paragraphe, ce qui bloque.
- `method` : les étapes concrètes.
- `example` : « Sur ce portfolio… », relié à une preuve réelle.
- `proofs` : liens vérifiables (fiche projet `.md`, repo, fichier). Pas de preuve en ligne, pas de page.
- `limits` : ce que ça ne prouve pas.
- `takeaway` : 3 puces à retenir.

Optionnel :

- `images` : `[{ src, alt, caption }]`. Déposer les webp dans `public/assets/knowledge/<slug>/`, largeur ~1200px, compresser (`cwebp -q 78`).
- `faq` : `[{ q, a }]`. Rend un accordéon + un JSON-LD `FAQPage` (rich results).

## 2. Style

Style Jonas : phrases de longueurs variées, pas de tiret cadratin, deux-points rares, aucun mot IA générique (robuste, exhaustif, plonger, incontournable…). Aucun chiffre inventé, chaque donnée tirée d'un audit ou d'un projet réel.

## 3. Référencer

Ajouter une ligne dans `public/llms.txt`, section « Pages citables ».

## 4. Construire et vérifier

```bash
npm run build     # régénère les .md, claims.json, le sitemap ; échoue si le TS casse
```

Vérifier : la page répond en 200 (`/knowledge/<slug>`), le `.md` agent existe (`public/knowledge/<slug>.md`), le JSON-LD Article est dans le HTML.

## 5. Déployer

```bash
git add -A && git commit -m "knowledge: <slug>"
git push && vercel --prod --yes
```

Après déploiement, l'edge Vercel sert parfois l'ancien HTML quelques minutes. Vérifier avec un cache-buster : `curl -s "https://jonassuhard.com/knowledge/<slug>?v=$(date +%s)"`.
