# Comment organiser la mémoire d'un agent IA en Markdown ?

Publication : 2026-07-02.
Dernière vérification : 2026-07-20.

## Réponse courte

- Un agent sans mémoire repart de zéro à chaque session. La solution la plus simple qui tient dans le temps, c'est du Markdown en clair.
- Je sépare trois couches. L'identité de l'agent, sa méthode de travail, et son contexte projet du moment.
- Chaque projet garde son propre contexte, chargé quand on l'ouvre, pas empilé dans un fichier géant.
- Les corrections deviennent des règles écrites, pour ne pas refaire deux fois la même erreur.
- J'ai testé d'autres pistes. Le Markdown en masse reste le plus lisible quand plusieurs agents travaillent sur le même projet.

## Problème

Sorti de la boîte, un assistant oublie tout entre deux sessions. On lui réexplique le contexte, les préférences, les erreurs déjà commises. Sans structure, la mémoire devient soit un dump illisible, soit une base de données que l'agent ne relit jamais au bon moment.

## Méthode

- Poser un fichier d'identité stable, avec le ton, les valeurs et ce que l'agent refuse de faire.
- Séparer les règles de méthode dans leurs propres fichiers, courts et actionnables.
- Donner à chaque projet son fichier de contexte, lu à l'ouverture et mis à jour à la fin de chaque tâche.
- Transformer chaque correction en une ligne de règle, datée, avec la cause et le correctif.
- Garder chaque fichier court. Quand il dépasse sa limite, on externalise et on pointe, on n'empile pas.

## Exemple

Sur claude-code-soul, la mémoire tient dans des fichiers Markdown versionnés. Un fichier d'âme pour l'identité, des règles séparées, un contexte par projet et un journal de leçons. Plusieurs modèles lisent les mêmes fichiers, Claude, Gemini et Codex, sans se marcher dessus. L'agent relit le fichier à jour au lieu de se fier à un résumé qui se dégrade.

## Limites

- C'est du Markdown, pas une base vectorielle. Pour retrouver un fait précis dans des milliers de notes, une recherche sémantique reste plus adaptée.
- La méthode demande de la discipline. Un fichier qu'on ne met pas à jour ment vite.
- Cette organisation reflète une façon de travailler. Elle s'adapte, elle ne se copie pas telle quelle.

## À retenir

- La mémoire utile d'un agent, c'est celle qu'il relit au bon moment, pas la plus grosse.
- Trois couches suffisent : identité, méthode, contexte projet.
- Le Markdown en clair gagne quand plusieurs agents doivent lire la même mémoire.

## Preuves

- Repo claude-code-soul (GitHub) : https://github.com/Jonassuhard/claude-code-soul
- Fiche claude-code-soul : /projects/claude-code-soul.md
- skills.md : /skills.md

## FAQ

### Pourquoi pas Obsidian ou une base de notes ?

Obsidian est très bien pour un cerveau humain. Pour un agent, le plus fiable reste des fichiers texte simples qu'il lit et réécrit directement, sans passer par une couche d'application. Le Markdown en clair se versionne, se compare et se partage entre plusieurs modèles.

### Ça marche avec d'autres modèles que Claude ?

Oui. Les mêmes fichiers Markdown sont lus par Claude, Gemini et Codex. Le format neutre, c'est justement ce qui permet de changer de modèle sans réécrire la mémoire.
