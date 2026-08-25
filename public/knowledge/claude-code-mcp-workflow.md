# Comment structurer un workflow Claude Code avec MCP et agents ?

Publication : 2026-07-02.
Dernière vérification : 2026-07-20.

## Réponse courte

- Claude Code gagne à avoir une identité, des règles et des outils séparés.
- Le protocole MCP relie des outils externes ; les agents prennent les tâches longues à part.
- Les hooks, des contrôles automatiques, demandent une confirmation ou Touch ID avant une action sensible et évitent les secrets dans les journaux.
- Le chargement à la demande évite de tout ouvrir au démarrage.
- Le but est un système lisible et réutilisable, pas une collection d'outils.

## Problème

Sans règles ni contexte écrit, un assistant peut oublier les décisions et agir sans les contrôles attendus. Chaque session repart alors de zéro.

## Méthode

- Séparer l'identité de l'assistant et sa configuration technique dans des fichiers dédiés.
- Choisir le bon outil pour chaque tâche : règle, agent, MCP ou commande simple.
- Mettre les recherches lourdes dans des agents pour garder le contexte principal lisible.
- Ajouter des contrôles sur les actions sensibles : confirmation, Touch ID et masquage des secrets.
- Charger les MCP et les agents seulement quand ils servent.

## Exemple

claude-code-soul est un projet open source sous licence MIT. Il rassemble un fichier d'identité, des règles, des outils et des contrôles : Touch ID pour les actions sensibles, secrets dans Keychain et contrôle avant publication. Le dépôt publié ne contient ni donnée personnelle, ni secret, ni chemin local.

## Limites

- Cette configuration reflète des choix personnels et doit être adaptée avant réutilisation.
- Plus de structure demande plus d'entretien : il faut nettoyer les outils et les règles.
- Un contrôle automatique réduit un risque, il ne le supprime pas.

## À retenir

- Un bon workflow Claude Code est lisible, pas seulement riche en outils.
- Un contrôle automatique est plus fiable qu'une simple consigne pour une action sensible.
- Séparer l'identité et la configuration aide à réutiliser et publier le système.

## Preuves

- Repo claude-code-soul (GitHub) : https://github.com/Jonassuhard/claude-code-soul
- Fiche claude-code-soul : /projects/claude-code-soul.md
- skills.md : /skills.md
