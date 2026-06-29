# RAG Starter Kit - API de retrieval augmenté multi-tenant

Type : api rag · multi-tenant.

Période : 2026.

Rôle : Conception et développement (full-stack).

Stack : FastAPI, Qdrant, Mistral AI, LangChain, SQLite, pytest, Next.js 16 / React 19, Docker Compose.

Statut : Copie publique anonymisée (publication à venir).

En bref : API FastAPI qui ingère des documents (PDF, DOCX, Markdown), les indexe dans Qdrant et répond en citant ses sources, avec auth multi-tenant et un module d'évaluation type Ragas.

## Problème

Servir plusieurs clients sur un même backend RAG, données isolées par client_id, et mesurer la qualité des réponses.

## Ce que ça montre

- Architecture RAG de bout en bout : ingestion multi-format, indexation vectorielle, génération sourcée.
- Isolation multi-tenant (un backend, plusieurs clients) avec couche d'auth.
- Module d'évaluation type Ragas avec cas de scoring versionnés et suite pytest.

## Limites

- Copie anonymisée : pas de démo publique hébergée.
- Scores de qualité non publiés.
