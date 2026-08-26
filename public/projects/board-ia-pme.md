# Board IA PME - comité consultatif multi-agents

## Repères

| Repère | Détail |
| --- | --- |
| Format | POC / preuve technique |
| Période | 2026 |
| Rôle de Jonas | Conception et développement (POC) |
| Statut | POC privé initié |
| Niveau de preuve | Démo privée |
| Stack | Python / FastAPI, Mistral Small + Large, Qdrant (1 collection/agent), Celery + Redis, Docker Compose |

## À quoi ça sert

Faire ressortir les désaccords utiles entre plusieurs analyses, puis produire une synthèse dont les règles restent lisibles.

## Ce que Jonas a fait

- Backend Python avec cinq agents spécialisés et un module qui regroupe leurs réponses selon des règles fixes.
- Structure d'orchestration async (Celery/Redis) et RAG Qdrant par agent.
- Documentation de l'architecture, du concept et de la roadmap.

## Ce que ça prouve

Cinq agents analysent la même question avec des informations différentes. Des règles explicites regroupent leurs réponses et signalent les désaccords.

- Donner une source différente à chaque agent pour éviter cinq réponses identiques.
- Regrouper les réponses avec des règles de pondération visibles plutôt qu'avec un sixième modèle opaque.
- Garder les données sur une infrastructure contrôlée avec Mistral et Qdrant auto-hébergé.

## Visuels

![Schéma des cinq agents : chacun reçoit une source différente pour produire de vrais points de vue séparés.](/assets/proof/board-ia-pme/board-isolated-agents.webp)

![Orchestration prévue : les analyses parallèles remontent vers des règles de pondération lisibles, sans sixième modèle opaque.](/assets/proof/board-ia-pme/board-orchestration.webp)

![État honnête du POC : backend et règles posés ; dashboard, export PDF et validation client restent à construire.](/assets/proof/board-ia-pme/board-status.webp)


## Limites

- POC initié, non terminé : le dashboard React Flow et l'export PDF décrits ne sont pas implémentés.
- Pas de test automatisé côté backend pour l'instant.

## Liens

- [Étude de cas](/projets/board-ia-pme)
