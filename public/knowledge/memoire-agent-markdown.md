# Comment organiser la mémoire d'un agent IA en Markdown ?

Publication : 2026-07-02.
Dernière vérification : 2026-07-20.

## Réponse courte

- Sans mémoire, un agent repart de zéro à chaque session. Des fichiers Markdown simples peuvent garder le contexte.
- Je sépare l'identité de l'agent, sa méthode de travail et le contexte du projet.
- Chaque projet garde son contexte, chargé quand on l'ouvre, au lieu d'un fichier unique très long.
- Les corrections deviennent des règles écrites pour éviter la même erreur.
- Le Markdown reste simple à lire quand plusieurs agents travaillent sur un même projet.

## Problème

Entre deux sessions, un assistant peut perdre le contexte, les préférences et les erreurs déjà connues. Sans structure, les notes deviennent trop longues ou ne sont pas relues au bon moment.

## Méthode

- Créer un fichier d'identité stable avec le ton, les valeurs et les refus de l'agent.
- Garder les règles de méthode dans des fichiers courts et utilisables.
- Donner à chaque projet un fichier de contexte, lu au début et mis à jour à la fin de la tâche.
- Transformer une correction en règle datée, avec sa cause et son correctif.
- Garder les fichiers courts. Quand ils deviennent trop longs, créer un fichier séparé et faire un lien.

## Exemple

Sur claude-code-soul, la mémoire tient dans des fichiers Markdown versionnés : identité, règles, contexte par projet et leçons. Claude, Gemini et Codex lisent les mêmes fichiers. L'agent relit le fichier à jour au lieu de se fier à un ancien résumé.

## Limites

- C'est du Markdown, pas une base de recherche sémantique. Pour retrouver un fait parmi des milliers de notes, une recherche dédiée est plus adaptée.
- La méthode demande de la discipline. Un fichier non mis à jour devient vite faux.
- Cette organisation reflète une façon de travailler. Il faut l'adapter, pas la copier telle quelle.

## À retenir

- La mémoire utile est celle que l'agent relit au bon moment, pas la plus longue.
- Trois couches suffisent : identité, méthode, contexte projet.
- Le Markdown en clair gagne quand plusieurs agents doivent lire la même mémoire.

## Preuves

- Repo claude-code-soul (GitHub) : https://github.com/Jonassuhard/claude-code-soul
- Fiche claude-code-soul : /projects/claude-code-soul.md
- skills.md : /skills.md

## FAQ

### Pourquoi pas Obsidian ou une base de notes ?

Obsidian convient bien à des notes humaines. Pour un agent, des fichiers texte simples sont plus faciles à lire et modifier directement. Le Markdown se versionne, se compare et se partage entre plusieurs modèles.

### Ça marche avec d'autres modèles que Claude ?

Oui. Claude, Gemini et Codex peuvent lire les mêmes fichiers Markdown. Ce format permet de changer de modèle sans réécrire la mémoire.
