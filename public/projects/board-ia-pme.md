# Board IA PME - comité consultatif multi-agents

Type : POC / preuve technique.
Période : 2026.
Rôle : Conception et développement (POC).
Stack : Python / FastAPI, Mistral Small + Large, Qdrant (1 collection/agent), Celery + Redis, Docker Compose.
Statut : POC initié - copie publique anonymisée.

En bref : POC d'audit stratégique pour TPE/PME : 5 agents Mistral analysent une question, chacun avec sa donnée exclusive (asymétrie d'information), puis un CIO déterministe agrège les verdicts par niveau de confiance.

## Problème

Faire émerger de vraies divergences d'analyse plutôt qu'une synthèse lissée, en privant chaque agent de la vue des autres et en agrégeant via des règles explicites.

## Ce que ça montre

- Conception d'un système multi-agents avec asymétrie d'information : chaque agent (financier, marché, client, ops, macro) a sa donnée exclusive.
- Agrégation par un CIO déterministe à pondération explicite plutôt qu'un 6e LLM, avec quality gate sur le niveau de confiance.
- Architecture orientée souveraineté des données (Mistral, Qdrant self-hosted).

## Limites

- POC initié, non terminé : le dashboard React Flow et l'export PDF décrits ne sont pas implémentés.
- Pas de test automatisé côté backend pour l'instant.
