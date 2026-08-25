# Cortex Bridge - orchestration ChatGPT et exécution locale contrôlée

## Repères

| Repère | Détail |
| --- | --- |
| Format | Agent local open source : extension Chrome, console et exécuteur |
| Période | Juillet - août 2026 · v0.5.2 |
| Rôle de Jonas | Conception produit, architecture, extension MV3, backend FastAPI, sécurité, QA |
| Statut | Preview technique open source v0.5.2 |
| Niveau de preuve | Preuve publique |
| Stack | Chrome MV3, FastAPI, Next.js, React, SQLite, Python, Ollama |

## À quoi ça sert

Cortex Bridge relie ChatGPT à un programme local sur Mac. Les actions restent limitées au dossier choisi, sont montrées avant exécution et sont bloquées en cas de doute. Le code et la preuve de release sont publics.

## Ce que Jonas a fait

- Extension Chrome MV3 (service worker, scripts de contenu, commandes DOM en liste blanche).
- Console FastAPI loopback : appairage à token unique, chat, pièces jointes, captures d'onglet, missions.
- Interface React et Next.js statique en français avec états d'envoi explicites.
- Orchestration SQLite et exécuteur déterministe confiné au workspace, fonctionnel sans Ollama.
- Installation macOS contrôlée par plan immuable et diagnostic local reproductible.

## Ce que ça prouve

ChatGPT propose une action. Vous la validez. Cortex l'exécute dans le dossier choisi et garde une trace de chaque étape.

- Construire un produit complet avec une extension, un backend local, une interface et des tests.
- Limiter les actions au dossier choisi et bloquer l'exécution en cas de doute.
- Publier le code, les preuves de release et les limites du projet.

Code public sous licence MIT. Preuve de release v0.5.2 publiée le 22/08/2026 : 434 tests backend, 127 frontend, 56 extension, 12 E2E et 4 accessibilité sans échec ; 1 test E2E ignoré.

## Limites

- Les suites automatisées utilisent aussi des fixtures : elles ne prouvent pas une compatibilité continue avec un compte ChatGPT réel.
- Le transport automatique par l'interface ChatGPT entre en conflit avec les conditions du fournisseur : activation opt-in et risque de restriction du compte.
- Preview technique macOS/Chrome : extension installée manuellement et dépendance à un DOM externe susceptible de changer.
- Stabilité de la boucle sur plusieurs semaines d'usage réel : pas encore de métrique publiable.
- Compatibilité continue avec l'interface ChatGPT : les preuves restent datées et une modification du DOM peut casser le transport.

## Liens

- [Étude de cas](/projets/cortex-bridge)
- [Repo GitHub](https://github.com/Jonassuhard/cortex-bridge)
- [Preuve de release v0.5.2](https://github.com/Jonassuhard/cortex-bridge/blob/64af9ce1e88dea8404acb11893eb96d75dd1baaa/docs/verification/v0.5.2.json)
