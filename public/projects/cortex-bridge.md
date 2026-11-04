# Cortex Bridge - ChatGPT comme cerveau d'un agent de code local

## Repères

| Repère | Détail |
| --- | --- |
| Format | Agent de code local open source piloté par ChatGPT |
| Période | Juillet - septembre 2026 · v0.6.5-preview.1 |
| Rôle de Jonas | Conception produit, architecture, extension MV3, backend FastAPI, sécurité, QA |
| Statut | Preview technique open source · v0.6.5-preview.1 non finalisée |
| Niveau de preuve | Preuve publique |
| Stack | Chrome MV3, FastAPI, Next.js, React, SQLite, Python, Ollama |

## À quoi ça sert

Cortex Bridge transforme ChatGPT en cerveau d'un agent de code local open source. ChatGPT analyse et planifie ; vous validez ; Cortex exécute dans le dossier choisi et garde une trace. Le projet vise l'usage d'un agent de code sans ajouter un second abonnement dédié. La preview v0.6.5 ajoute le suivi des fichiers transmis et la supervision des actions. Elle reste non finalisée : l'installation complète, l'isolation entre projets et l'acceptation fournisseur ne sont pas acquises.

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

Revue du dépôt public le 23 septembre 2026 : v0.6.5-preview.1 est une preview non finalisée, pas une release stable. Le document de publication laisse plusieurs validations ouvertes. La preuve historique v0.6.1 rapporte 724 tests backend, 207 frontend, 138 extension, 26 E2E et 4 accessibilité sans échec ; ces résultats ne valident pas la nouvelle version.

## Visuels

![Autoriser un fichier, une capture ou un lien séparément. Écran de test v0.6.2 conservé dans le package v0.6.5 : données synthétiques, aucune exécution réelle revendiquée.](/assets/proof/cortex-bridge/context-request-v062.webp)

![Console locale : conversations et dossier de travail, avec les données fictives des tests du dépôt. Ce n'est pas une exécution réelle.](/assets/proof/cortex-bridge/workspace-20260908.webp)

![Avant exécution : dossier, durée et permissions à vérifier. Scénario fictif rejoué dans l'interface locale.](/assets/proof/cortex-bridge/approval-20260908.webp)

![Archive du dépôt GitHub capturée le 8 septembre 2026. Pour la preview actuelle, consulter le lien v0.6.5 ci-dessous.](/assets/proof/cortex-bridge/public-0-20260908.webp)


## Limites

- Les suites automatisées utilisent aussi des fixtures : elles ne prouvent pas une compatibilité continue avec un compte ChatGPT réel.
- Installation sur un nouveau compte macOS, validation Windows et isolation complète de plusieurs projets restent à vérifier. Le contrôle de confidentialité signale encore une fixture de test ; la preview n'est pas déclarée entièrement validée.
- Le transport automatique par l'interface ChatGPT entre en conflit avec les conditions du fournisseur : activation opt-in et risque de restriction du compte.
- Preview technique macOS/Chrome : extension installée manuellement et dépendance à un DOM externe susceptible de changer.
- Stabilité de la boucle sur plusieurs semaines d'usage réel : pas encore de métrique publiable.
- Compatibilité continue avec l'interface ChatGPT : les preuves restent datées et une modification du DOM peut casser le transport.

## Liens

- [Étude de cas](/projets/cortex-bridge)
- [GitHub](https://github.com/Jonassuhard/cortex-bridge)
- [État de la preview v0.6.5](https://github.com/Jonassuhard/cortex-bridge/blob/v0.6.5-preview.1/PREVIEW_V065.md)
- [Preuve du tag v0.6.1](https://github.com/Jonassuhard/cortex-bridge/blob/v0.6.1/docs/verification/v0.6.1.json)
