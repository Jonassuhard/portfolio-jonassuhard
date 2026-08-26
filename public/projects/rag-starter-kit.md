# RAG Starter Kit - rechercher dans des documents avec leurs sources

## Repères

| Repère | Détail |
| --- | --- |
| Format | Projet perso / preuve technique |
| Période | 2026 |
| Rôle de Jonas | Conception et développement (full-stack) |
| Statut | Prototype privé - publication à préparer |
| Niveau de preuve | Démo privée |
| Stack | FastAPI, Qdrant, Mistral AI, LangChain, SQLite, pytest, Next.js 16 / React 19, Docker Compose |

## À quoi ça sert

Permettre à plusieurs clients d'interroger leurs documents sans mélanger leurs données, puis vérifier la qualité des réponses.

## Ce que Jonas a fait

- Backend FastAPI pour recevoir les documents, retrouver les passages, répondre avec les sources, authentifier les clients et journaliser l'usage.
- Frontend Next.js 16 / React 19 (App Router, TypeScript, Tailwind 4).
- Stack dockerisée (Qdrant + backend + frontend) lançable via docker compose, + docs d'onboarding.

## Ce que ça prouve

Une API reçoit des documents, retrouve les passages utiles et répond en citant ses sources. Les données de chaque client restent séparées.

- Recevoir plusieurs formats de documents, retrouver les bons passages et citer les sources dans la réponse.
- Séparer les données de chaque client sur un même serveur, avec authentification.
- Tester la qualité des réponses avec des cas versionnés et une suite pytest.

## Visuels

![Schéma du parcours d'un document : ingestion, découpage, indexation, recherche puis réponse avec ses sources.](/assets/proof/rag-starter-kit/rag-document-pipeline.webp)

![Isolation des clients : chaque requête reste dans son espace de données et ne peut pas récupérer les documents d'un autre client.](/assets/proof/rag-starter-kit/rag-tenant-isolation.webp)

![Boucle d'évaluation : cas versionnés, mesure du retrieval, comparaison et correction avant une nouvelle exécution.](/assets/proof/rag-starter-kit/rag-evaluation-loop.webp)


## Limites

- Code et démonstration non publics à ce jour ; l'architecture décrite n'est donc pas auditée publiquement.
- Le module d'évaluation fournit le harnais ; les scores de qualité ne sont pas publiés.

## Liens

- [Étude de cas](/projets/rag-starter-kit)
