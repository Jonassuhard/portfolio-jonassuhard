# Cortex Bridge - ChatGPT comme cerveau d'un agent de code local

## Repères

| Repère | Détail |
| --- | --- |
| Format | Agent de code local open source piloté par ChatGPT |
| Période | Juillet - août 2026 · tag v0.5.3 |
| Rôle de Jonas | Conception produit, architecture, extension MV3, backend FastAPI, sécurité, QA |
| Statut | Preview technique open source · tag public v0.5.3 |
| Niveau de preuve | Preuve publique |
| Stack | Chrome MV3, FastAPI, Next.js, React, SQLite, Python, Ollama |

## À quoi ça sert

Cortex Bridge transforme ChatGPT en cerveau d'un agent de code local open source. ChatGPT analyse et planifie ; vous validez ; Cortex exécute uniquement dans le dossier choisi et garde une trace. Le projet vise l'usage d'un agent de code sans ajouter un second abonnement dédié. Le code et la preuve de release sont publics.

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

Code public sous licence MIT. La preuve du tag v0.5.3 datée du 26/08/2026 rapporte 629 tests backend, 155 frontend, 126 extension, 12 E2E et 4 accessibilité sans échec ; 1 test E2E est ignoré.

## Visuels

![Onboarding public de Cortex Bridge : choix du dossier local et consentement avant toute exécution.](/assets/proof/cortex-bridge/cortex-onboarding.webp)

![Contrôle avant exécution : commande proposée, dossier ciblé et niveau de risque restent visibles avant validation.](/assets/proof/cortex-bridge/cortex-preflight.webp)

![Trace d'exécution : chaque étape, sa sortie et son état restent consultables dans l'interface locale.](/assets/proof/cortex-bridge/cortex-execution.webp)

![Diagnostic d'arrêt : les processus actifs sont listés et le bouton d'arrêt d'urgence reste disponible dans l'interface locale.](/assets/proof/cortex-bridge/cortex-stop-diagnostic.webp)


## Limites

- Les suites automatisées utilisent aussi des fixtures : elles ne prouvent pas une compatibilité continue avec un compte ChatGPT réel.
- Le cycle macOS propre de la v0.5.2 n'a pas été rejoué pour la preuve v0.5.3.
- Le transport automatique par l'interface ChatGPT entre en conflit avec les conditions du fournisseur : activation opt-in et risque de restriction du compte.
- Preview technique macOS/Chrome : extension installée manuellement et dépendance à un DOM externe susceptible de changer.
- Stabilité de la boucle sur plusieurs semaines d'usage réel : pas encore de métrique publiable.
- Compatibilité continue avec l'interface ChatGPT : les preuves restent datées et une modification du DOM peut casser le transport.

## Liens

- [Étude de cas](/projets/cortex-bridge)
- [GitHub](https://github.com/Jonassuhard/cortex-bridge)
- [Preuve du tag v0.5.3](https://github.com/Jonassuhard/cortex-bridge/blob/v0.5.3/docs/verification/v0.5.3.json)
