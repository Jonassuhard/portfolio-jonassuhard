# Comment structurer un workflow Claude Code avec MCP et agents ?

Publication : 2026-07-02.
Dernière vérification : 2026-07-20.

## Réponse courte

- Claude Code devient utile quand on lui donne une structure : identité, règles, skills, agents, hooks, MCP.
- Le MCP branche des outils externes ; les agents isolent les tâches longues du contexte principal.
- Les hooks imposent des garde-fous déterministes : confirmation ou Touch ID sur action sensible, secrets hors des logs.
- Le lazy-load évite de tout charger au démarrage : moins de tokens, moins de RAM.
- L'intérêt n'est pas le nombre d'outils, mais un système lisible et réutilisable.

## Problème

Sorti de la boîte, un assistant CLI répond poliment mais oublie le contexte, recharge tout, et n'a aucun garde-fou sur les actions dangereuses. Sans structure, chaque session repart de zéro et les mauvaises habitudes reviennent.

## Méthode

- Séparer l'identité (ton, valeurs, refus) de la config technique, dans des fichiers dédiés.
- Router chaque tâche vers le bon outil : skill, agent, MCP ou commande simple.
- Isoler les investigations lourdes dans des agents pour garder le contexte principal propre.
- Poser des hooks sur les actions sensibles : confirmation, Touch ID, rédaction des secrets.
- Charger les MCP et agents à la demande, pas au démarrage.

## Exemple

claude-code-soul est un pack open source (MIT) qui applique ça : un soul.md pour l'identité, des rules, skills, agents et hooks, avec Touch ID sur les actions sensibles, secrets via Keychain et gitleaks au moment de publier. Le repo est publié sans fuite : 0 PII, 0 secret, 0 chemin personnel.

## Limites

- Une config opinionnée : ce workflow reflète des choix personnels, à adapter avant réutilisation.
- Plus de structure veut dire plus de maintenance : il faut nettoyer régulièrement skills et règles.
- Un garde-fou ne remplace pas la vigilance : le hook réduit le risque, il ne l'annule pas.

## À retenir

- Un bon workflow Claude Code se juge à sa lisibilité, pas au nombre d'outils branchés.
- Les hooks déterministes valent mieux qu'une consigne polie pour les actions sensibles.
- Séparer identité et config rend le tout réutilisable et publiable.

## Preuves

- Repo claude-code-soul (GitHub) : https://github.com/Jonassuhard/claude-code-soul
- Fiche claude-code-soul : /projects/claude-code-soul.md
- skills.md : /skills.md
