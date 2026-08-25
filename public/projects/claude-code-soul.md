# claude-code-soul - pack de configuration Claude Code

## Repères

| Repère | Détail |
| --- | --- |
| Format | Projet open source (config / outillage) |
| Période | 2026 |
| Rôle de Jonas | Auteur |
| Statut | Public |
| Niveau de preuve | Preuve publique |
| Stack | Claude Code CLI, Shell (hooks), Markdown, macOS Keychain + Touch ID, gitleaks |

## À quoi ça sert

Séparer l'« âme » de l'assistant (ton, valeurs, refus) de la config technique, et packager un outillage Claude Code réutilisable et publiable sans fuite de données.

## Ce que Jonas a fait

- Repo public MIT : soul.md, rules, skills, agents, hooks, script setup et docs.
- Pipeline de publication propre : gitleaks, exclusion des packs tiers, crédits.

## Ce que ça prouve

Pack de configuration open source pour Claude Code CLI : un soul.md (identité/ton/refus) plus skills, agents, hooks et rules, pour transformer le CLI en assistant à personnalité dosée plutôt qu'en chatbot poli.

- Conception d'un système de configuration en couches (identité, personnalité, workflow, skills, agents, hooks) documenté et installable via script.
- Sécurité pensée dès le départ, avec Touch ID sur actions sensibles, secrets via Keychain, rédaction des secrets dans les transcrits et règle 0 PII / 0 chemin perso.
- Publication open source propre (MIT) avec crédits explicites des packs tiers exclus.

## Limites

- Config opinionnée (ton majordome, workflow personnel) : à adapter avant réutilisation.
- Certaines briques tierces sont exclues du repo et doivent être réinstallées séparément.

## Liens

- [Étude de cas](/projets/claude-code-soul)
- [Repo GitHub](https://github.com/Jonassuhard/claude-code-soul)
