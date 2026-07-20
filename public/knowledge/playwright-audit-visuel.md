# Comment auditer visuellement une page web avec Playwright ?

Publication : 2026-07-02.
Dernière vérification : 2026-07-20.

## Réponse courte

- Un audit visuel utile ne commence pas par une opinion : il commence par des captures reproductibles.
- Playwright permet de vérifier mobile, tablette et desktop avec les mêmes étapes.
- Le contrôle porte sur le rendu, les erreurs console, l'overflow, les éléments masqués et les preuves visuelles.
- L'objectif n'est pas de remplacer le jugement design, mais d'éviter les angles morts mécaniques.
- Chaque recommandation doit finir en patch vérifiable, pas en préférence de goût.

## Problème

Une page peut sembler correcte sur un écran et casser ailleurs : texte trop long, bouton compressé, image absente, header qui couvre le contenu ou animation qui masque la lecture.

## Méthode

- Lister les parcours à vérifier avant d'ouvrir le navigateur.
- Capturer au moins mobile 390px et desktop 1440px pour les pages clés.
- Contrôler les erreurs console, les requêtes échouées et l'overflow horizontal.
- Comparer les captures avec les contraintes DA au lieu de chercher un style générique.
- Transformer chaque défaut en changement de fichier précis, puis reconstruire.

## Exemple

Sur les chantiers Capsélys et Les Petites Griffes, les captures servent à vérifier le rendu avant de parler de conversion : textes, blocs, assistant IA, preuves visuelles et contraintes client.

## Limites

- Playwright vérifie ce qu'on lui demande : un mauvais scénario peut rater un vrai défaut.
- Une capture ne mesure pas une conversion ; elle prouve seulement un état visuel.
- Le jugement DA reste humain : l'automatisation sert à ne pas rater le basique.

## À retenir

- Capturer avant de corriger évite les débats flous.
- Un audit visuel fiable combine navigateur réel, contraintes design et preuve de build.
- La meilleure recommandation est celle qu'on peut vérifier au prochain screenshot.

## Preuves

- Fiche Capsélys : /projects/capselys.md
- Capture assistant Capsélys : /assets/proof/capselys/capselys-assistant.webp
- Capture site Capsélys : /assets/proof/capselys/capselys-site.webp
- Fiche Les Petites Griffes : /projects/les-petites-griffes.md
- Capture home Les Petites Griffes : /assets/proof/les-petites-griffes/lpg-home.webp
