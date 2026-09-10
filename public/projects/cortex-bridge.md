# Cortex Bridge - ChatGPT comme cerveau d'un agent de code local

## Repères

| Repère | Détail |
| --- | --- |
| Format | Agent de code local open source piloté par ChatGPT |
| Période | Juillet - septembre 2026 · tag v0.6.1 |
| Rôle de Jonas | Conception produit, architecture, extension MV3, backend FastAPI, sécurité, QA |
| Statut | Preview technique open source · tag public v0.6.1, provider-gated |
| Niveau de preuve | Preuve publique |
| Stack | Chrome MV3, FastAPI, Next.js, React, SQLite, Python, Ollama |

## À quoi ça sert

Cortex Bridge transforme ChatGPT en cerveau d'un agent de code local open source. ChatGPT analyse et planifie ; vous validez ; Cortex exécute uniquement dans le dossier choisi et garde une trace. Le projet vise l'usage d'un agent de code sans ajouter un second abonnement dédié. Le code et la preuve technique du tag v0.6.1 sont publics ; l'acceptation fournisseur et le cycle macOS propre restent hors périmètre.

## Ce que Jonas a fait

- Extension Chrome MV3 (service worker, scripts de contenu, commandes DOM en liste blanche).
- Console FastAPI loopback : appairage à token unique, chat, pièces jointes, captures d'onglet, missions.
- Interface React et Next.js statique en français avec états d'envoi explicites.
- Orchestration SQLite et exécuteur déterministe confiné au workspace, fonctionnel sans Ollama.
- Installation macOS contrôlée par plan immuable et diagnostic local reproductible.

## Ce que ça prouve

ChatGPT réfléchit et prépare le travail. Vous validez. Cortex exécute dans le dossier choisi et garde une trace de chaque étape.

- Construire un produit complet avec une extension, un backend local, une interface et des tests.
- Limiter les actions au dossier choisi et bloquer l'exécution en cas de doute.
- Publier le code, les preuves de release et les limites du projet.

Code public sous licence MIT. La preuve du tag v0.6.1 datée du 10/09/2026 rapporte 724 tests backend, 207 frontend, 138 extension, 26 E2E et 4 accessibilité sans échec ; 1 test E2E optionnel est ignoré. Le manifeste reste explicitement bloqué par les conditions du fournisseur et le cycle macOS propre n'est pas exécuté.

## Visuels

![Console locale : conversations et dossier de travail, avec les données fictives des tests du dépôt. Ce n'est pas une exécution réelle.](/assets/proof/cortex-bridge/workspace-20260908.webp)

![Avant exécution : dossier, durée et permissions à vérifier. Scénario fictif rejoué dans l'interface locale.](/assets/proof/cortex-bridge/approval-20260908.webp)

![Dépôt GitHub public : code, tag v0.6.1 et manifeste technique consultables. Le tag reste un technical preview provider-gated.](/assets/proof/cortex-bridge/public-0-20260908.webp)


## Limites

- Les suites automatisées utilisent aussi des fixtures : elles ne prouvent pas une compatibilité continue avec un compte ChatGPT réel.
- Le cycle macOS propre n'a pas été exécuté pour la preuve v0.6.1.
- Le transport automatique par l'interface ChatGPT entre en conflit avec les conditions du fournisseur : activation opt-in et risque de restriction du compte.
- Preview technique macOS/Chrome : extension installée manuellement et dépendance à un DOM externe susceptible de changer.
- Stabilité de la boucle sur plusieurs semaines d'usage réel : pas encore de métrique publiable.
- Compatibilité continue avec l'interface ChatGPT : les preuves restent datées et une modification du DOM peut casser le transport.

## Liens

- [Étude de cas](/projets/cortex-bridge)
- [GitHub](https://github.com/Jonassuhard/cortex-bridge)
- [Preuve du tag v0.6.1](https://github.com/Jonassuhard/cortex-bridge/blob/v0.6.1/docs/verification/v0.6.1.json)
