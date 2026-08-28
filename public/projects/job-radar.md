# Job Radar - transformer des offres dispersées en décisions explicables

## Repères

| Repère | Détail |
| --- | --- |
| Format | Radar d'offres local et open source |
| Période | Août 2026 · v0.1.0-beta.1 |
| Rôle de Jonas | Conception produit, architecture, développement full-stack, sécurité, QA open source |
| Statut | Beta publique open source v0.1.0-beta.1 |
| Niveau de preuve | Preuve publique |
| Stack | Python, FastAPI, React, SQLite, Pydantic, Playwright |

## À quoi ça sert

Job Radar Community est un radar d'offres local et configurable. Il normalise les annonces, retire les doublons et explique séparément la pertinence, la confiance et la fraîcheur, sans publier le CV ni envoyer de candidature.

## Besoin

### Les offres utiles sont dispersées.

APIs, ATS publics, alertes et imports manuels produisent des formats différents. Relire les mêmes annonces et subir des filtres opaques fait perdre du temps avant même de candidater.

- Comparer des offres hétérogènes sans perdre leur provenance ni les extraits qui justifient les faits.
- Adapter les critères au parcours, aux contraintes et aux priorités de chaque utilisateur sans modifier le code.
- Écarter les doublons et les offres trop anciennes sans confondre fraîcheur et pertinence métier.

## Intention

### Construire un classement utile et explicable.

Le radar transforme les annonces en faits comparables, applique une grille YAML contrôlable et rend chaque score lisible. Les données restent locales par défaut.

- Séparer la pertinence professionnelle, la confiance d'extraction et l'âge de l'annonce.
- Expliquer les axes, règles, bonus, malus et blocages avec les extraits source associés.
- Permettre de configurer profil, recherche, scoring, sources et taxonomie sans toucher au code.
- Garder les entrées et le classement locaux dans cette beta, puis conserver une validation humaine avant toute candidature.

## Architecture

![Schéma de l'architecture livrée : corpus hors ligne local_demo ou import JSON local normalisé, sans accès distant dans cette beta.](/assets/proof/job-radar/architecture.webp)

- La beta publique reçoit uniquement le corpus hors ligne local_demo, fourni, ou un import JSON local normalisé ; elle ne livre aucun connecteur distant.
- Le noyau Python normalise, canonicalise, déduplique et extrait les faits avant d'appliquer la configuration YAML.
- Le score, la confiance et la fraîcheur sont persistés dans SQLite puis exposés par une API FastAPI locale.
- L'interface React affiche Radar, Insights, Sources et Configuration sans recalculer le score côté navigateur.

## Ce que Jonas a fait

- CLI Python pour initialiser, valider, diagnostiquer, rafraîchir, importer et recalculer les offres.
- Pipeline de normalisation, déduplication, extraction de faits et scoring configurable avec provenance.
- API FastAPI locale, stockage SQLite et interface React responsive en quatre vues.
- Corpus local_demo hors ligne de 42 offres fictives, import JSON local normalisé et documentation de configuration.
- Contrats de sécurité, audits publics et archive de release reproductible.

## Ce que ça prouve

La preuve publique v0.1.0-beta.1 rapporte 336 tests backend, 36 tests frontend et 37 tests E2E sans échec, ainsi que 20 combinaisons route/viewport sans violation Axe ni débordement.

- Transformer un besoin personnel en produit générique configurable et documenté.
- Concevoir un pipeline déterministe où chaque décision peut être reliée à une règle et à un extrait source.
- Préparer une publication open source sans historique privé, secret, CV ni donnée de candidature.

La preuve v0.1.0-beta.1 rapporte 336 tests backend, 36 tests frontend et 37 tests E2E sans échec ; 8 scénarios E2E sont ignorés intentionnellement. Axe et responsive ont été contrôlés sur 20 combinaisons route/viewport, sans violation ni débordement.

## Visuels

![Radar de démonstration : offres fictives classées avec score, confiance, fraîcheur, source et raison principale.](/assets/proof/job-radar/radar-overview.webp)

![Détail d'une offre fictive : score par axe, règles appliquées et explications restent visibles.](/assets/proof/job-radar/score-explained.webp)

![Insights calculés depuis la base locale : décisions, compétences demandées et santé du corpus.](/assets/proof/job-radar/insights.webp)

![Le radar conserve filtres, score, confiance, fraîcheur et décision sur un écran mobile de 390 px.](/assets/proof/job-radar/mobile.webp)


## Résultats vérifiés

- 336 tests backend, 36 tests frontend et 37 tests E2E réussis ; 8 scénarios E2E ignorés intentionnellement.
- 20 combinaisons route/viewport contrôlées à 320, 390, 768, 1024 et 1440 px, sans violation Axe ni débordement.
- Audits de l'arbre public, de l'historique propre, de l'archive, des distributions Python, des dépendances et des captures : zéro finding déclaré dans la preuve v0.1.0-beta.1.
- Corpus de démonstration de 42 offres fictives utilisable hors ligne et sans clé API.

## Limites

- Cette beta n'envoie aucune candidature et ne génère ni CV ni lettre ; elle prépare et explique la sélection.
- LinkedIn, Indeed et Welcome to the Jungle restent des sources manual_only : aucun refresh automatique ne les appelle.
- France Travail, Adzuna, Jooble, Remotive et les ATS publics sont des pistes futures sous conditions d'accès, d'API et de limites ; aucun de ces connecteurs distants n'est livré dans cette beta.
- La preuve v0.1.0-beta.1 est une validation locale datée ; elle ne prouve ni adoption externe ni résultat de recherche d'emploi.
- Le corpus public est fictif ; la pertinence sur les recherches d'un tiers dépend de sa propre configuration.
- Adoption externe, candidatures obtenues et gain de temps réel : pas encore mesurés pour cette beta.
- Qualité du classement sur un corpus professionnel réel : la démonstration publique utilise 42 offres fictives.

## Liens

- [Étude de cas](/projets/job-radar)
- [Repo GitHub](https://github.com/Jonassuhard/job-radar-community)
- [Configurer son radar](https://github.com/Jonassuhard/job-radar-community/blob/main/docs/CONFIGURATION.md)
- [Architecture publique](https://github.com/Jonassuhard/job-radar-community/blob/main/docs/ARCHITECTURE.md)
- [Preuve v0.1.0-beta.1](https://github.com/Jonassuhard/job-radar-community/blob/main/docs/verification/v0.1.0-beta.1.json)
