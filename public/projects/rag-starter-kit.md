# RAG Starter Kit - rechercher dans des documents avec leurs sources

## Repères

| Repère | Détail |
| --- | --- |
| Format | Projet perso / preuve technique |
| Période | 2026 |
| Rôle de Jonas | Conception et développement (full-stack) |
| Statut | Prototype privé historique · source à restaurer |
| Niveau de preuve | Démo privée |
| Stack | FastAPI, Qdrant, Mistral AI, LangChain, SQLite, Next.js 15, React 19, Docker Compose |

## À quoi ça sert

Prototype privé historique pour interroger des documents sans mélanger les données de plusieurs clients. Son architecture et son historique Git sont documentés, mais le code n'est plus présent localement et aucune exécution actuelle n'est revendiquée.

## Ce que Jonas a fait

- Le prototype historique audité réunissait ingestion, retriever, chat avec citations, authentification multi-tenant et journaux d'usage.
- Interface historique Next.js 15 / React 19 avec espaces cabinet, administration et portail.
- Docker Compose, documentation d'onboarding et cas d'évaluation inspirés de Ragas.

## Ce que ça prouve

Un prototype privé multi-tenant a été audité en juin 2026 : ingestion de documents, recherche Qdrant, réponses Mistral avec citations et cas d'évaluation. Sa source doit maintenant être restaurée.

- Construire historiquement un parcours complet : ingestion, recherche, réponse et citations.
- Séparer les données par client_id avec authentification, journaux d'usage et filtres de recherche.
- Prévoir des cas versionnés pour mesurer le retrieval sans inventer de score actuel.

Audit privé du 29 juin 2026 : dépôt master au commit 1fc9629, quatre commits et structure complète documentés. Le manifeste du 29 avril recensait 3,4 Go. Les octets de la source et de sa copie de publication sont absents des volumes montés au 28 août 2026.

## Visuels

![Reconstitution éditoriale du parcours historique : ingestion, indexation, recherche puis réponse avec ses sources.](/assets/proof/rag-starter-kit/rag-document-pipeline-20260828.webp)

![Reconstitution de l'isolation historique par client_id ; ce schéma n'est pas une certification de sécurité actuelle.](/assets/proof/rag-starter-kit/rag-tenant-isolation-20260828.webp)

![Cas d'évaluation présents dans le dépôt historique ; aucun résultat actuel n'est publié sans restauration de la source.](/assets/proof/rag-starter-kit/rag-evaluation-loop-20260828.webp)


## Limites

- Source d'origine et copie de publication absentes après migration ; le prototype n'est pas exécutable aujourd'hui.
- La présence historique de fichiers de test ne prouve pas leur réussite actuelle.
- L'ancienne copie anonymisée conservait encore des coordonnées professionnelles et son historique Git ; elle n'était pas publiable telle quelle.

## Liens

- [Étude de cas](/projets/rag-starter-kit)
