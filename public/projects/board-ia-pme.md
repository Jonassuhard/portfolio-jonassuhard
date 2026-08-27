# Board IA PME - comité consultatif multi-agents

## Repères

| Repère | Détail |
| --- | --- |
| Format | POC / preuve technique |
| Période | 2026 |
| Rôle de Jonas | Conception et développement (POC) |
| Statut | Prototype privé historique · source à restaurer |
| Niveau de preuve | Démo privée |
| Stack | Python, Mistral Large, Pondération déterministe, JSON |

## À quoi ça sert

Prototype privé historique conçu pour faire ressortir les désaccords entre cinq analyses. Le petit socle Python a existé, mais sa source n'est plus présente et les infrastructures décrites dans le README n'étaient pas implémentées.

## Ce que Jonas a fait

- Prototype historique de 437 lignes réparties dans 10 fichiers : cinq agents, cio.py et run_board.py.
- Classement, pondération et gate déterministes, puis conclusion narrative par Mistral Large.

## Ce que ça prouve

Un prototype Python historique de 437 lignes faisait travailler cinq agents, puis appliquait un classement, une pondération et une gate déterministes avant une conclusion rédigée par Mistral Large.

- Prototyper cinq rôles d'analyse et une orchestration minimale dans un socle Python court.
- Garder le classement, la pondération et la gate de confiance lisibles dans cio.py.
- Distinguer le code réellement audité de l'infrastructure seulement décrite dans les dépendances et le README.

Audit privé du 29 juin 2026 : commit unique 0b9a4cb, 437 lignes dans 10 fichiers, cinq agents, cio.py et run_board.py. Les octets de la source et de sa copie de publication sont absents des volumes montés au 28 août 2026.

## Visuels

![Reconstitution éditoriale des cinq rôles du prototype historique ; ce n'est pas une capture d'exécution.](/assets/proof/board-ia-pme/board-isolated-agents-20260828.webp)

![Structure auditée : cinq agents, règles de classement et conclusion Mistral Large, sans infrastructure distribuée implémentée.](/assets/proof/board-ia-pme/board-orchestration-20260828.webp)

![État vérifié : 437 lignes et 10 fichiers historiques ; source absente, frontend et tests non implémentés.](/assets/proof/board-ia-pme/board-status-20260828.webp)


## Limites

- Source d'origine et copie de publication absentes après migration ; aucune exécution actuelle n'est possible.
- FastAPI, Celery, Redis et Qdrant apparaissaient dans le README ou les dépendances, pas dans l'implémentation auditée.
- Frontend, tests et documentation applicative étaient vides ; aucun résultat client n'est revendiqué.

## Liens

- [Étude de cas](/projets/board-ia-pme)
