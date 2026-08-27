# Board IA PME - comité consultatif multi-agents

## Repères

| Repère | Détail |
| --- | --- |
| Format | POC / preuve technique |
| Période | 2026 |
| Rôle de Jonas | Conception et développement (POC) |
| Statut | Concept documenté · source à retrouver |
| Niveau de preuve | À documenter |
| Stack | Systèmes multi-agents, Sources séparées, Règles de pondération, Traçabilité |

## À quoi ça sert

Faire ressortir les désaccords utiles entre plusieurs analyses, puis produire une synthèse dont les règles restent lisibles.

## Ce que Jonas a fait

- Schémas conceptuels des cinq points de vue, de l'orchestration et des règles de synthèse.
- Documentation du concept, de ses limites et des validations encore nécessaires.

## Ce que ça prouve

Concept de cinq points de vue séparés sur une même question, puis d'une synthèse fondée sur des règles explicites. Le code correspondant reste à retrouver.

- Donner une source différente à chaque agent pour éviter cinq réponses identiques.
- Regrouper les réponses avec des règles de pondération visibles plutôt qu'avec un sixième modèle opaque.
- Prévoir une infrastructure contrôlée sans en revendiquer l'implémentation tant que la source n'est pas retrouvée.

## Visuels

![Schéma des cinq agents : chacun reçoit une source différente pour produire de vrais points de vue séparés.](/assets/proof/board-ia-pme/board-isolated-agents.webp)

![Orchestration prévue : les analyses parallèles remontent vers des règles de pondération lisibles, sans sixième modèle opaque.](/assets/proof/board-ia-pme/board-orchestration.webp)

![État honnête du POC : backend et règles posés ; dashboard, export PDF et validation client restent à construire.](/assets/proof/board-ia-pme/board-status.webp)


## Limites

- Source locale non retrouvée lors de l'audit du 27 août 2026.
- Les schémas montrent une direction de produit, pas un POC techniquement prouvé.

## Liens

- [Étude de cas](/projets/board-ia-pme)
