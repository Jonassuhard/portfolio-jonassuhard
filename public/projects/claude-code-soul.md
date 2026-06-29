# claude-code-soul - pack de configuration Claude Code

Type : Projet open source (config / outillage).
Période : 2026.
Rôle : Auteur.
Stack : Claude Code CLI, Shell (hooks), Markdown, macOS Keychain + Touch ID, gitleaks.
Statut : Public.

En bref : Pack de configuration open source pour Claude Code CLI : un soul.md (identité/ton/refus) plus skills, agents, hooks et rules, pour transformer le CLI en assistant à personnalité dosée plutôt qu'en chatbot poli.

## Problème

Séparer l'« âme » de l'assistant (ton, valeurs, refus) de la config technique, et packager un outillage Claude Code réutilisable et publiable sans fuite de données.

## Ce que ça montre

- Conception d'un système de configuration en couches (identité, personnalité, workflow, skills, agents, hooks) documenté et installable via script.
- Sécurité by design : Touch ID sur actions sensibles, secrets via Keychain, rédaction des secrets dans les transcrits, règle 0 PII / 0 chemin perso.
- Publication open source propre (MIT) avec crédits explicites des packs tiers exclus.

## Limites

- Config opinionnée (ton majordome, workflow personnel) : à adapter avant réutilisation.
- Certaines briques tierces sont exclues du repo et doivent être réinstallées séparément.
