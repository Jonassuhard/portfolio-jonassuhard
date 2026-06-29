# Board IA PME - comité consultatif multi-agents

Type : comité multi-agents · poc.

Période : 2026.

Rôle : Conception et développement (POC).

Stack : Python / FastAPI, Mistral Small + Large, Qdrant, Celery + Redis, Docker Compose.

Statut : POC initié - copie publique anonymisée.

En bref : POC d'audit stratégique TPE/PME : 5 agents Mistral analysent une question, chacun avec sa donnée exclusive (asymétrie d'information), puis un CIO déterministe agrège les verdicts par confiance.

## Problème

Faire émerger de vraies divergences d'analyse plutôt qu'une synthèse lissée, en isolant les données de chaque agent.

## Ce que ça montre

- Système multi-agents avec asymétrie d'information (financier, marché, client, ops, macro).
- Agrégation par un CIO déterministe (pondération explicite, pas un 6e LLM) avec quality gate.
- Architecture orientée souveraineté des données.

## Limites

- POC non terminé : dashboard et export PDF non implémentés.
- Pas de test automatisé backend pour l'instant.
