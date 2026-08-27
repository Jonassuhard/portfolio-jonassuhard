# RAG Starter Kit - rechercher dans des documents avec leurs sources

## Repères

| Repère | Détail |
| --- | --- |
| Format | Projet perso / preuve technique |
| Période | 2026 |
| Rôle de Jonas | Conception et développement (full-stack) |
| Statut | Concept documenté · source à retrouver |
| Niveau de preuve | À documenter |
| Stack | RAG, Recherche sémantique, Citations, Isolation des données, Évaluation |

## À quoi ça sert

Permettre à plusieurs clients d'interroger leurs documents sans mélanger leurs données, puis vérifier la qualité des réponses.

## Ce que Jonas a fait

- Schémas conceptuels du parcours documentaire, de l'isolation des clients et de la boucle d'évaluation.
- Cadrage des preuves à produire avant de présenter le concept comme un produit fonctionnel.

## Ce que ça prouve

Concept d'un outil qui retrouverait les passages utiles d'un document et répondrait avec leurs sources. Le code correspondant reste à retrouver.

- Cadrer un parcours de recherche documentaire qui remonte les passages utilisés dans la réponse.
- Prévoir la séparation des données de chaque client dès la conception.
- Documenter une boucle d'évaluation avant de retrouver ou reconstruire une implémentation.

## Visuels

![Schéma du parcours d'un document : ingestion, découpage, indexation, recherche puis réponse avec ses sources.](/assets/proof/rag-starter-kit/rag-document-pipeline.webp)

![Isolation des clients : chaque requête reste dans son espace de données et ne peut pas récupérer les documents d'un autre client.](/assets/proof/rag-starter-kit/rag-tenant-isolation.webp)

![Boucle d'évaluation : cas versionnés, mesure du retrieval, comparaison et correction avant une nouvelle exécution.](/assets/proof/rag-starter-kit/rag-evaluation-loop.webp)


## Limites

- Source locale non retrouvée lors de l'audit du 27 août 2026.
- Les schémas montrent une intention de conception, pas une application prouvée.

## Liens

- [Étude de cas](/projets/rag-starter-kit)
