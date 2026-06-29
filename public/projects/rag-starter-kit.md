# RAG Starter Kit - API de retrieval augmenté multi-tenant

Type : Projet perso / preuve technique.
Période : 2026.
Rôle : Conception et développement (full-stack).
Stack : FastAPI, Qdrant, Mistral AI, LangChain, SQLite, pytest, Next.js 16 / React 19, Docker Compose.
Statut : Copie publique anonymisée.

En bref : API FastAPI qui ingère des documents (PDF, DOCX, Markdown, texte), les indexe dans Qdrant et répond en citant ses sources, avec auth multi-tenant et un module d'évaluation type Ragas.

## Problème

Servir plusieurs clients sur un même backend RAG, en gardant les données isolées par client_id et en mesurant la qualité des réponses.

## Ce que ça montre

- Architecture RAG complète de bout en bout : ingestion multi-format, indexation vectorielle, génération avec citation des sources.
- Isolation multi-tenant (un backend, plusieurs clients séparés par client_id) avec couche d'auth.
- Module d'évaluation de la qualité des réponses inspiré de Ragas, avec cas de scoring versionnés et suite pytest.

## Limites

- Copie anonymisée : données et clients réels remplacés par des placeholders, pas de démo publique hébergée.
- Le module d'évaluation fournit le harnais ; les scores de qualité ne sont pas publiés.
