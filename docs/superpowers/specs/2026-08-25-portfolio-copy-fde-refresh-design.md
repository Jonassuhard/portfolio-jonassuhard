# Refonte éditoriale simple et trajectoire FDE

## Objectif

Rendre le portfolio compréhensible en moins d'une minute par un recruteur non technique, sans perdre les preuves, les limites ni les surfaces destinées aux agents IA.

## Positionnement

- Le titre actuel reste `Growth Engineer junior`.
- `Forward Deployed Engineer` est un objectif de progression, jamais un poste déjà occupé.
- Formulation canonique : « Je cherche à évoluer vers un rôle de Forward Deployed Engineer : comprendre un besoin concret, construire une première solution avec l'équipe ou le client, puis la tester et la rendre transmissible. »
- Une explication courte accompagne le terme anglais : partir d'un besoin terrain, construire avec les personnes concernées, livrer puis vérifier l'usage.

## Règles de rédaction

Chaque bloc public répond dans cet ordre :

1. À quoi cela sert.
2. Ce que Jonas a fait.
3. Ce que cela prouve.
4. Ce qui reste limité ou non mesuré.

Les phrases sont courtes, actives et compréhensibles sans connaître la stack. Le jargon utile reste présent dans les sections techniques, avec une explication courante. Les fragments décoratifs `Type :`, `En bref :` et `Preuves :` disparaissent du gabarit Markdown. Les chiffres détaillés restent dans les blocs de preuve et ne sont pas transformés en compteurs marketing ambigus.

## Projets

- Cortex Bridge : conserver la release publique v0.5.2 comme preuve canonique et expliquer simplement le contrôle local, le consentement et le blocage en cas de doute.
- Cool Bank / La Herse : séparer V2 et V3, traduire les statuts techniques en français courant et conserver les NO-GO. Ajouter le GitHub Educool V2 uniquement s'il est public.
- Les Petites Griffes : conserver le statut familial non facturé, la preuve privée et les mesures datées.
- Capsélys : ajouter uniquement les dépôts publics vérifiés, conserver le statut staging.
- ISCOM : expliquer la publication Drupal et la vérification humaine sans métrique de trafic inventée.
- Battle Engine : actualiser l'exploitation du pipeline et ajouter le dépôt s'il est public, tout en gardant le projet secondaire.
- Preuvia, HoopSphere et CiteGap : ne pas augmenter artificiellement leur niveau de preuve.

## Surfaces alignées

- Pages humaines : home, recruteurs, à-propos, méthode, compétences, projets, fiches et knowledge.
- Sources machine : `llms.txt`, `profile.json`, `profile.md`, `claims.json`, `skills.md`, JSON-LD et fiches Markdown.
- `lib/projects.ts` reste la source des projets ; `lib/faq.ts` reste la source de la FAQ et de `claims.json`.
- Les fichiers manuels indiquent clairement leur mode de maintenance ; aucun README ne prétend qu'ils sont générés s'ils ne le sont pas.

## Interface

La direction artistique Archive Worldline, les typographies et les animations de titres sont conservées. Les corrections UI se limitent aux défauts prouvés : navigation recouverte à 768 px, titlebar comprimée, bandeau de consentement mobile trop haut et coupure du titre du décodeur.

## Validation

- Tests TypeScript et contenu.
- Build Next.js de production.
- Liens internes et externes.
- Contrôle des secrets et du diff.
- 29 routes HTML à 375, 768 et 1440 px, soit 87 rendus.
- Pour chaque rendu : HTTP 200, console propre, aucun overflow horizontal et inspection visuelle réelle.

## Hors périmètre

- Aucun commit, push ou déploiement.
- Aucun nouveau portrait ni publication de lien client privé.
- Aucun changement des PDF du CV dans ce lot ; `cv.md` doit rester cohérent avec les PDF existants.
