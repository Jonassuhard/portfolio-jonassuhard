# Décodeur d’offres IA — spécification de conception

Date : 10 août 2026  
Statut : design validé — approche A  
Produit hôte : `jonassuhard.com`  
Route : `/outils/decodeur-offre-ia`

## 1. Objectif

Construire un outil public qui transforme le texte d’une offre d’emploi IA en lecture métier explicable. Il doit aider Jonas à décider si une offre correspond à sa trajectoire et servir de preuve portfolio : taxonomie métier, règles transparentes, confidentialité, évaluation et restitution accessible.

Le succès du MVP ne se mesure pas au nombre de fonctionnalités. Il se mesure à quatre propriétés :

1. une offre est classée selon trois axes compréhensibles ;
2. chaque verdict est justifié par des extraits de l’offre ;
3. l’outil distingue clairement preuve existante, preuve partielle et preuve absente chez Jonas ;
4. vingt cas de test annotés permettent de vérifier le moteur.

## 2. Décisions fermes

- Le moteur est **déterministe et exécuté intégralement dans le navigateur**.
- Aucun fournisseur LLM, aucune API et aucun secret ne sont utilisés en V1.
- Le texte collé n’est ni envoyé, ni stocké, ni journalisé.
- L’outil analyse des offres en français ou en anglais.
- Les résultats ne comportent aucun pourcentage de compatibilité opaque.
- Un niveau de confiance et les indices détectés sont toujours affichés.
- L’outil n’envoie aucune candidature et ne produit pas de décision automatique définitive.
- L’interface réutilise strictement la DA « Archive Worldline » déjà en production.

## 3. Hors périmètre V1

- Récupération automatique d’une offre depuis une URL.
- Import PDF, DOCX ou capture d’écran.
- Compte utilisateur, historique ou sauvegarde locale.
- Génération de lettre de motivation ou de CV.
- Publication automatique sur LinkedIn ou dans un ATS.
- Appel LLM facultatif ou payant.
- Tableau de bord agrégé du marché.
- Traduction de l’offre.
- Export PDF.

Ces exclusions évitent de transformer un outil de preuve en produit SaaS inachevé.

## 4. Parcours utilisateur

### 4.1 Entrée

La page présente :

- un champ facultatif « Intitulé du poste » ;
- un champ facultatif « Entreprise » ;
- une zone obligatoire « Texte de l’offre » ;
- un bouton « Analyser l’offre » ;
- la mention visible « L’analyse reste dans votre navigateur ».

Contraintes :

- minimum : 250 caractères pour le texte de l’offre ;
- maximum : 30 000 caractères ;
- les espaces successifs et caractères invisibles sont normalisés ;
- l’entrée est toujours traitée comme du texte, jamais injectée comme HTML.

### 4.2 Sortie

Après analyse, la page affiche dans cet ordre :

1. synthèse de lecture ;
2. classification selon les trois axes ;
3. niveau de séniorité réel ;
4. preuves demandées par l’offre ;
5. correspondance avec les preuves publiques de Jonas ;
6. signal de candidature ;
7. limites et points à vérifier humainement.

Un bouton permet de « Modifier l’offre ». Aucun état n’est conservé après rechargement.

## 5. Taxonomie des trois axes

### Axe A — Relation à l’IA

Valeurs :

- `applied-ai` : construction d’un produit ou workflow utilisant effectivement des modèles ;
- `ai-infrastructure` : plateforme, données, déploiement ou infrastructure pour les systèmes IA ;
- `rebranded-role` : métier historique auquel le vocabulaire IA a été ajouté sans responsabilité IA substantielle ;
- `mixed` : plusieurs familles ont des signaux proches ;
- `unknown` : matière insuffisante.

### Axe B — Nature technique

Valeurs :

- `build-model` : entraînement, recherche, fine-tuning substantiel ou conception de modèles ;
- `integrate-model` : RAG, agents, outils, API, évaluations et mise en production autour de modèles existants ;
- `mixed` ;
- `unknown`.

### Axe C — Position dans l’organisation

Valeurs :

- `product` : équipe produit ou plateforme interne ;
- `field` : client, déploiement terrain, conseil d’implémentation ou conduite du changement ;
- `governance` : audit, conformité, sécurité, risques ou évaluation indépendante ;
- `mixed` ;
- `unknown`.

## 6. Moteur de règles

### 6.1 Structure d’une règle

Chaque règle contient :

```ts
type DecoderRule = {
  id: string;
  axis: "relation" | "technical" | "position" | "seniority" | "evidence";
  target: string;
  patterns: RegExp[];
  weight: 1 | 2 | 3 | 4;
  label: string;
};
```

Les listes de termes couvrent le français et l’anglais. Une règle ne peut pas produire seule un verdict « clair » si elle ne représente qu’un terme générique comme `AI`, `LLM` ou `machine learning`.

### 6.2 Calcul par axe

Pour chaque axe :

1. normaliser le texte ;
2. appliquer toutes les règles ;
3. compter une règle une seule fois par phrase, même si le motif apparaît plusieurs fois ;
4. additionner les poids par cible ;
5. conserver les phrases ayant déclenché les règles ;
6. comparer les deux meilleurs scores.

### 6.3 Niveau de confiance

- `clear` : meilleur score ≥ 6 et avance ≥ 3 sur le deuxième ;
- `mixed` : meilleur score ≥ 4, mais avance < 3 ;
- `insufficient` : meilleur score < 4.

Un axe `mixed` ou `unknown` est présenté comme une incertitude, jamais résolu artificiellement par une valeur par défaut.

### 6.4 Extraits justificatifs

- Maximum trois extraits par axe.
- Chaque extrait provient du texte utilisateur.
- Longueur maximale : 220 caractères par extrait.
- Les extraits sont échappés par React et ne passent jamais par `dangerouslySetInnerHTML`.
- Si aucun extrait suffisamment spécifique n’existe, l’interface dit explicitement « Aucun indice assez précis ».

## 7. Détection de séniorité

Le moteur extrait :

- années d’expérience explicites ;
- termes junior, graduate, internship, alternance ou entry-level ;
- termes senior, staff, principal, lead, head ou manager ;
- responsabilités d’architecture, de mentorat, de budget, de recrutement ou de direction client ;
- autonomie de production et astreintes éventuelles.

Sorties :

- `true-junior` ;
- `inflated-junior` ;
- `confirmed` ;
- `senior` ;
- `unknown`.

`inflated-junior` s’applique lorsqu’un titre junior ou entry-level coexiste avec au moins trois ans d’expérience, une responsabilité d’architecture globale, du management ou la propriété autonome d’un système critique.

## 8. Preuves attendues et correspondance Jonas

### 8.1 Catégories de preuves

- système réellement déployé ;
- évaluations ou jeux de tests ;
- RAG, agents ou orchestration ;
- sécurité, confidentialité ou gouvernance ;
- infrastructure, MLOps ou cloud ;
- connaissance métier ;
- travail client et conduite du changement ;
- mesure du coût, de la qualité ou de la performance ;
- recherche ou entraînement de modèles.

### 8.2 États de correspondance

- `existing` : preuve publique ou démontrable déjà reliée à un projet ;
- `partial` : expérience proche, mais preuve incomplète ;
- `missing` : aucune preuve revendiquée.

La correspondance est une table statique, versionnée et relue. Elle pointe vers les pages projets existantes. Elle ne transforme jamais une compétence partielle en compétence acquise.

Exemples :

- déploiement web → Les Petites Griffes ;
- validation humaine et workflow métier → ISCOM ;
- données sensibles et sécurité → Educool ;
- évaluation multi-modèles → Preuvia ;
- pipeline automatisé → Battle Engine ;
- entraînement de modèles fondamentaux → manquant.

## 9. Signal de candidature

Le signal ne remplace pas la décision humaine.

Valeurs :

- `coherent` : aucune incompatibilité majeure et au moins une preuve existante correspondant au cœur du poste ;
- `investigate` : classification incertaine, exigence importante seulement partiellement couverte ou annonce contradictoire ;
- `large-gap` : rôle clairement centré sur la recherche/entraînement avancé, infrastructure senior ou responsabilité de direction non démontrée.

Chaque signal est accompagné de raisons nommées et d’une phrase : « Ce signal organise les indices de l’offre ; il ne décide pas à votre place. »

## 10. Architecture logicielle

### 10.1 Modules

- `app/outils/decodeur-offre-ia/page.tsx` : page serveur, metadata et contenu introductif ;
- `app/outils/decodeur-offre-ia/job-decoder-client.tsx` : formulaire, état local et rendu interactif ;
- `lib/job-decoder.ts` : types, normalisation, extraction, scoring et agrégation ;
- `lib/job-decoder-rules.ts` : taxonomie et règles FR/EN ;
- `lib/job-decoder-profile.ts` : correspondance entre catégories de preuves et projets Jonas ;
- `tests/job-decoder.test.ts` : cas annotés et propriétés du moteur.

### 10.2 Flux de données

```text
Saisie utilisateur
→ validation locale
→ normalisation
→ segmentation en phrases
→ application des règles
→ scores + extraits
→ séniorité + preuves attendues
→ correspondance profil Jonas
→ signal de candidature
→ rendu React
```

Aucune route API n’est créée.

## 11. Confidentialité et sécurité

- Aucun `fetch` dans le composant du décodeur.
- Aucun `localStorage`, `sessionStorage`, cookie ou paramètre d’URL contenant l’offre.
- La zone de saisie et les résultats portent `data-clarity-mask="true"`.
- Vercel Analytics ne reçoit que la consultation de page standard, pas le contenu.
- Le texte n’est jamais inclus dans les logs, erreurs ou événements.
- La limite de 30 000 caractères borne le coût CPU côté navigateur.
- React assure l’échappement des extraits ; aucun HTML utilisateur n’est interprété.

## 12. Interface et marque

La page reprend les tokens et composants du `app/globals.css` en production :

- fond crème vieilli ;
- encre chaude ;
- accent rouille ;
- typographies existantes ;
- bordures fines et panneaux documentaires ;
- zéro nouvelle couleur de marque ;
- aucun faux terminal, aucune jauge et aucun score spectaculaire.

Composition :

- hero court ;
- panneau de saisie traité comme un dossier entrant ;
- résultats traités comme une fiche d’analyse ;
- badges textuels accompagnés d’un libellé, jamais couleur seule ;
- extraits présentés comme pièces justificatives ;
- aucun mouvement ajouté au-delà de la transition de page existante.

Avant l’implémentation visuelle, la DA réellement en production sera documentée dans un `DESIGN.md` local au dépôt. L’ancienne charte « Paris Nuit » ne sera pas réutilisée : elle ne correspond plus au site live.

## 13. Accessibilité

- Labels explicites associés aux champs.
- Erreurs reliées par `aria-describedby`.
- Résultat annoncé par une région `aria-live="polite"`.
- Ordre de lecture identique à l’ordre visuel.
- Navigation intégrale au clavier.
- Focus visible existant conservé.
- États différenciés par texte et structure, pas seulement par couleur.
- Tableau replié en cartes ou rendu scrollable sur petit écran.
- Respect de `prefers-reduced-motion` hérité du site.

## 14. SEO et lisibilité agent

- Metadata dédiée avec canonical `/outils/decodeur-offre-ia`.
- Ajout au sitemap.
- Ajout d’une section « Outils » dans `public/llms.txt`.
- Lien depuis la page recruteurs ; pas d’entrée supplémentaire dans la navigation principale en V1.
- Aucun résultat utilisateur indexable ou partageable dans l’URL.

## 15. Stratégie de tests

### 15.1 Jeu d’évaluation

Vingt offres synthétiques ou extraits anonymisés, annotés manuellement :

- quatre applied AI / intégration ;
- trois infrastructure ;
- trois recherche ou entraînement ;
- trois client / Forward Deployed ;
- deux gouvernance / audit ;
- trois faux juniors ;
- deux offres volontairement ambiguës.

Les fixtures ne recopient pas de longues offres protégées et ne contiennent ni entreprise ni donnée personnelle.

### 15.2 Tests unitaires

- normalisation FR/EN ;
- non-surcomptage d’un motif répété ;
- seuils `clear`, `mixed`, `insufficient` ;
- extraction et troncature des extraits ;
- détection des années d’expérience ;
- faux junior ;
- correspondance des preuves Jonas ;
- absence de verdict fort sans matière suffisante ;
- déterminisme : même entrée, même sortie ;
- aucune règle générique ne suffit seule à produire `clear`.

### 15.3 Vérifications projet

- `npm run typecheck` ;
- `npm run test` ;
- `npm run check` ;
- `npm run build` ;
- contrôle visuel desktop 1440 px et mobile 375 px ;
- test clavier ;
- inspection réseau confirmant qu’aucun texte d’offre ne sort du navigateur ;
- canonical propre à la route.

## 16. Critères d’acceptation

Le MVP est terminé uniquement si :

1. une offre suffisamment longue produit les six blocs de sortie ;
2. chaque axe affiche un niveau de confiance et des extraits ;
3. une offre ambiguë reste ambiguë ;
4. un faux junior est signalé avec sa contradiction ;
5. les preuves Jonas renvoient vers des pages existantes ;
6. aucun contenu utilisateur n’est envoyé ou stocké ;
7. les vingt fixtures sont présentes et les tests passent ;
8. le build Next.js réussit ;
9. le rendu est contrôlé sur mobile et desktop ;
10. la page respecte la DA actuelle sans couleur ou police étrangère.

## 17. Déploiement et rollback

- Travail sur une branche dédiée.
- Aucun déploiement de production ni push sans validation explicite de Jonas.
- Le changement est isolé : nouvelle route, modules du décodeur, tests et liens d’entrée.
- Rollback : retirer le lien recruteur et la route ; aucune migration, donnée ou secret n’est impliqué.
