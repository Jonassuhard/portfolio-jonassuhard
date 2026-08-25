# Comment auditer visuellement une page web avec Playwright ?

Publication : 2026-07-02.
Dernière vérification : 2026-07-20.

## Réponse courte

- Un audit visuel commence par des captures qu'on peut refaire.
- Playwright vérifie mobile, tablette et ordinateur avec les mêmes étapes.
- Le contrôle regarde le rendu, les erreurs, le débordement et les éléments masqués.
- Il complète le regard humain ; il ne le remplace pas.
- Chaque constat doit mener à une correction vérifiable.

## Problème

Une page peut sembler correcte sur un écran et casser ailleurs : texte trop long, bouton compressé, image absente, header qui couvre le contenu ou animation qui masque la lecture.

## Méthode

- Lister les parcours à vérifier avant d'ouvrir le navigateur.
- Capturer au moins mobile 390px et desktop 1440px pour les pages clés.
- Contrôler les erreurs, les requêtes échouées et le débordement horizontal.
- Comparer les captures avec la direction visuelle prévue.
- Transformer chaque défaut en changement de fichier précis, puis reconstruire.

## Exemple

Sur Capsélys et Les Petites Griffes, les captures servent à vérifier les textes, les blocs, l'assistant IA et les contraintes client avant de parler de conversion.

## Limites

- Playwright vérifie ce qu'on lui demande : un mauvais scénario peut rater un vrai défaut.
- Une capture ne mesure pas une conversion ; elle prouve seulement un état visuel.
- Le jugement DA reste humain : l'automatisation sert à ne pas rater le basique.

## À retenir

- Capturer avant de corriger évite les débats flous.
- Un audit visuel fiable combine navigateur, règles visuelles et build réussi.
- Une recommandation utile peut être vérifiée à la capture suivante.

## Preuves

- Fiche Capsélys : /projects/capselys.md
- Capture assistant Capsélys : /assets/proof/capselys/capselys-assistant.webp
- Capture site Capsélys : /assets/proof/capselys/capselys-site.webp
- Fiche Les Petites Griffes : /projects/les-petites-griffes.md
- Capture home Les Petites Griffes : /assets/proof/les-petites-griffes/lpg-home.webp
