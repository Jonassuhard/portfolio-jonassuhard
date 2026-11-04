# Job Radar - radar d'offres, scoring et dashboard

Type : Outil local - ingestion, scoring, dashboard.
Période : 2026 - en cours.
Rôle : Conception, développement, data, UX, QA.
Stack : Python, FastAPI, SQLite, React, TypeScript, Playwright, Connecteurs ATS.
Statut : Outil personnel, en usage.
Niveau de preuve : Démo privée.

En bref : Un pipeline complet : connecteurs ATS, fusion des offres, scoring de pertinence et de confiance séparés, dashboard local. Le refresh ne prépare ni n'envoie aucune candidature.

Preuves : Captures du dashboard et rapports de refresh datés, montrables en entretien. Outil personnel, pas un produit commercialisé ; les données de candidature restent privées.

## Problème

Radar local d'offres d'emploi : collecter des sources autorisées, fusionner les doublons, extraire les faits, séparer le score de pertinence du score de confiance, puis rendre le tout lisible dans un dashboard. Le refresh ne prépare ni n'envoie de candidature.

## Ce que ça montre

- Automatisation de bout en bout : ingestion, normalisation, scoring, API et interface.
- Séparation explicite entre pertinence et confiance : un score élevé ne masque pas une source douteuse.
- Garde-fous produit : sources autorisées, secrets hors dépôt, aucune soumission automatique.

## Limites

- Outil personnel, pas un produit commercialisé : pas de client ni de revenu.
- Précision du scoring non mesurée publiquement.
- Les connecteurs dépendent des APIs et de leurs quotas ; certaines plateformes restent manuelles.
