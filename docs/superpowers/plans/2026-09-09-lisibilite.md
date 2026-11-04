# Portfolio : une lecture plus directe

## Accord et sauvegarde

Jonas autorise une version locale a relire. Aucun commit, push ou deploiement
avant son accord sur le rendu. Base conservee sur `master` :
`0a59f2ec86ad8d8adf131f5cd117da6a66923af9`.
Branche de travail : `preview/lisibilite-20260909`.
Les quatre fichiers de contexte preexistants restent non suivis.

Mise a jour du 9 septembre : Jonas a repondu « go » apres la livraison de la
preview. Accord retenu pour le commit local de ce lot uniquement. Aucun push,
merge vers `master` ou deploiement autorise par cette reponse.

## Direction

Faire comprendre rapidement le role recherche, l'utilite des projets et le
travail personnel de Jonas. Garder Archive Worldline : memes couleurs,
polices, grille, illustrations et animation chromatique de 40 secondes.
Ce n'est ni une nouvelle marque ni une reecriture des resultats.

Trois niveaux de lecture :
1. Le role, le CV et les trois projets principaux.
2. Le besoin, le travail realise, les captures et les limites importantes.
3. Les decisions, la stack, les versions et les preuves techniques detaillees.

## Execution

- [x] Lire les sources, la charte et les lecons ; preserver la base Git.
- [x] Ajouter les regressions de lisibilite et constater leur echec initial (6/6 RED, puis 6/6 GREEN).
- [x] Accueil : presentation courte, CV visible, suppression du resume de projets en double, competences condensees.
- [x] Recruteurs : projets juste apres l'introduction ; enlever les repetitions ; conserver limites et FAQ.
- [x] Projets : meme trio Job Radar / Cortex Bridge / Les Petites Griffes en tete ; statut du produit distinct de la confidentialite des preuves ; description utile et courte.
- [x] Fiches : intention et role avant le dossier technique ; galeries reelles avec agrandissement accessible ; details techniques repliables sans perte de contenu.
- [x] Navigation et Contact : quatre entrees principales, ressources dans le footer, mots et email non coupes sur mobile.
- [x] A propos : parcours et formation conserves ; objectif FDE explique une seule fois, sans le presenter comme un poste deja occupe.
- [x] Synchroniser les Markdown generes et llms.txt, documenter le comportement dans DESIGN.md.
- [x] Executer tests, typecheck, contenu, liens, build, controles visuels et clavier.
- [x] Fournir la preview et les comparaisons ; consigner les mesures et limites.
- [x] Accord de poursuite de Jonas recu (« go ») : commit local de la preview uniquement, sans publication.

## Fichiers et responsabilite

Codex est le seul writer de ce lot. `lib/projects.ts` porte les descriptions
courtes et l'ordre ; `app/page.tsx`, `app/recruteurs/page.tsx`,
`app/projets/page.tsx`, `app/a-propos/page.tsx`, `app/contact/page.tsx` portent
la hierarchie. `app/projets/[slug]/page.tsx` et `project-story.tsx` portent
les fiches. Une petite ile client `app/project-image.tsx` gere l'agrandissement.
CSS dans `app/globals.css`, navigation/footer dans `site-nav.tsx` et `layout.tsx`.
Les sources des projets et les fichiers media ne sont pas modifies.

## Garde-fous

- Conserver les 14 projets, leurs liens publics et Markdown, leurs captures et videos.
- Garder les illustrations des cartes en 760 x 460, transparentes, non recadrees, sans titre double.
- Conserver les medias des Petites Griffes et les cinq videos Battle Engine.
- Garder autoplay muet, pause hors ecran et mouvement reduit ; pas de commandes video visibles ajoutees.
- V2 Cool Bank deja 3D, jouable localement sur un appareil ; V3 distincte, sans validation humaine revendiquee.
- Ni metrique, diplome, usage client, disponibilite de preuve ni maturite inventes.
- Garder les qualifications SEO et machine ; FDE reste une direction de progression.
- Pas de changement analytics, consentement, authentification, DNS ou production.

## Preuves attendues

- Tests : trio coherent, tous les projets conserves une fois, produit/preuve distincts,
  CV dans l'introduction, projets avant les longs arguments, agrandissement avec lien sans JS.
- `npm run check` et `npm run build` reussis ; aucun seuil existant abaisse.
- Navigateur sur les pages principales et les 14 fiches en 375 et 1440 px ;
  controle intermediaire 768 px et petit mobile 320 px sur les vues sensibles.
- Zero image cassee, debordement horizontal, erreur JS ou violation Axe WCAG ciblee.
- Ouvrir/fermer les images au clavier, retour du focus, Escape, clic hors image,
  lien natif sans JS ; boutons et menus accessibles.
- Verifier les videos en mouvement normal et reduit, les titres animes et la navigation mobile.
- Comparer les positions reelles des projets sur Recruteurs a la base :
  2239 px desktop et 3983 px mobile. Objectif de conception : moins de 1200 px
  sur mobile, sans ruser avec la taille du texte.
- Mesurer la performance sur un build local, avec URL et horodatage verifies.
  Les tests navigateur ne prouvent ni conversion ni recrutement effectif.

## Livraison et retour arriere

La production et `master` restent a la base. La preview utilise une URL locale
separee. Ne pas lancer de restauration destructive pour comparer : captures
avant conservees dans `qa/screenshots/opinion-*-20260909.jpg`, code avant lisible
avec `git show master:chemin`. Un abandon de la preview exige une decision
explicite, pas un reset automatique. L'accord de creation n'est pas un accord
de publication.

## Compte rendu du 9 septembre 2026

### Verdict a la livraison de la preview

PASS technique pour la preview locale. Validation editoriale et visuelle finale
reservee a Jonas. Aucun commit, push ou deploiement effectue.

Preview : [nouvel accueil](http://127.0.0.1:3199/) et
[nouvelle page Recruteurs](http://127.0.0.1:3199/recruteurs).
Serveur Next de production locale, limite au loopback du Mac, PID 2339
au moment de la livraison. La demande d'ouverture dans Codex a ete mise en
file par l'application ; l'URL fonctionne independamment du panneau.

### Changements visibles

- Accueil : un seul titre de role, presentation directe, CV en action principale,
  trois vraies cartes au lieu du recapitulatif de projets en double.
- Recruteurs : projets juste apres l'introduction ; contribution et progression
  ensuite ; intitulés voisins et reponses factuelles au second niveau.
- Les trois entrees montrent Job Radar, Cortex Bridge, Les Petites Griffes,
  dans le meme ordre. Les 14 projets restent accessibles.
- Cartes : a quoi sert le projet, puis son etat. La preuve privee n'est plus
  confondue avec l'acces au site public.
- Fiches : nom court, utilite, phrase sur mon role, capture ou video, galerie,
  travail realise, limites, puis dossier technique repliable.
- Images agrandissables : ouverture, fermeture, Escape et boucle clavier,
  restitution du focus et du defilement. Lien direct fonctionnel sans JS.
- Navigation : quatre entrees principales ; ressources preservees dans le footer.
  Contact utilise des informations empilees, sans mots casses.
- Les Petites Griffes garde ses quatre captures et sa video. Les cinq videos
  Battle gardent leur fonctionnement. Aucun fichier media n'a ete modifie.
- Polices reelles verifiees dans Chromium : Cormorant Garamond et Courier Prime.
  Fallback monospace explicite ; animation chromatique de 40 secondes conservee.

### Avant / apres mesure

Meme largeur et hauteur de navigateur (1440 ou 375 x 900). Positions du titre
de la section et de la premiere carte, pas une estimation du temps de lecture.

| Recruteurs | Avant | Preview |
| --- | ---: | ---: |
| Titre des projets, desktop | 2239 px | 512 px |
| Premiere carte, desktop | 2357 px | 586 px |
| Hauteur totale, desktop | 4596 px | 3074 px |
| Titre des projets, mobile | 3983 px | 688 px |
| Premiere carte, mobile | 4219 px | 824 px |
| Hauteur totale, mobile | 8258 px | 5672 px |

Le titre des projets arrive environ 83 % plus tot dans le defilement mobile.
La page Recruteurs est environ 31 % plus courte sur mobile. Cela ne prouve
pas une hausse du nombre de contacts ou de recrutements.

Comparaisons reelles, non retouchees :
- Accueil desktop : [avant](../../../qa/screenshots/opinion-home-1440-top-20260909.jpg) / [apres](../../../qa/screenshots/readability-home-1440-top-20260909.jpg).
- Accueil mobile : [avant](../../../qa/screenshots/opinion-home-375-top-20260909.jpg) / [apres](../../../qa/screenshots/readability-home-375-top-20260909.jpg).
- Recruteurs : [avant](../../../qa/screenshots/opinion-recruteurs-1440-full-20260909.jpg) / [apres](../../../qa/screenshots/readability-recruteurs-1440-full-20260909.jpg).
- Contact mobile : [apres](../../../qa/screenshots/readability-contact-375-full-20260909.jpg).
- Agrandissement : [dialogue mobile](../../../qa/screenshots/readability-zoom-375-20260909.jpg).

### Verifications executees

- `npm run check` : 110 tests, typecheck, contenu et 126 liens internes PASS.
- `npm run build` : PASS, 40 pages generees.
- 22 routes, dont les 14 fiches, en 1440 et 375 px : 44 HTTP 200,
  zero debordement horizontal, image cassee, erreur JS ou violation Axe ciblee
  WCAG 2.0/2.1/2.2. Dossiers techniques egalement ouverts et controles.
- 18 vues complementaires en 320 et 768 px : aucun debordement.
- Galerie testee au clavier et sans JS ; menu mobile et retour du focus verifies.
- Cinq videos Battle decodees et lues, muettes et sans controles visibles.
  Pause clavier et passage dynamique au mouvement reduit verifies.
- Le test de conservation compare les objets projet a la base Git. Tous les
  champs sont identiques sauf les textes de carte et le nouveau resume du role.
  Identite, faits, versions, limites, liens et medias sont conserves.
- Gitleaks : aucun secret detecte dans le diff ni le nouveau composant image.
- `git diff --check` : PASS. Aucun seuil de qualite abaisse.

Lighthouse mobile, un passage final par route sur le build local :

| Page | Performance | Accessibilite | Bonnes pratiques | SEO |
| --- | ---: | ---: | ---: | ---: |
| Accueil | 94 | 100 | 100 | 100 |
| Recruteurs | 96 | 100 | 100 | 100 |
| Projets | 96 | 100 | 100 | 100 |
| Preuves | 97 | 100 | 100 | 100 |

Le prechargement de la premiere carte n'a pas ameliore le score mesure de
l'accueil (94 dans les deux passages). Il n'y a donc pas de gain chiffre
revendique sur ce point. L'accueil mesure un LCP de 3,1 s et un CLS de 0.

### Preuves locales et limites

Rapports reproductibles dans `tmp/` :
`readability-check-20260909.log`, `readability-build-20260909.log`,
`readability-qa-20260909.json`, `readability-interactions-20260909.json`,
`readability-preservation-20260909.json` et les quatre
`readability-lighthouse-*-final-20260909.json`.
Captures avant/apres dans `qa/screenshots/`.

La performance n'est pas a 100 partout. Aucun test Safari/iPhone physique,
aucun nouvel audit complet de securite ou RGPD, aucune mesure de conversion,
aucune nouvelle recette humaine des projets sources. Les qualifications et
dates de preuve historiques ne sont pas reinterpretees. Le MBA reste presente
comme en cours en l'absence d'une nouvelle preuve d'obtention.

L'ancienne version est conservee dans Git au commit de base et aucun appel
de publication n'a ete effectue. A la livraison de la preview, les modifications
n'etaient pas commitees et attendaient l'accord de Jonas.

### Accord de commit local

La reponse « go » autorise maintenant le commit de la preview sur
`preview/lisibilite-20260909`. Les 25 fichiers du manifeste local ont ete
compares par SHA-256 avant cette mise a jour documentaire : aucune derive.
Les controles sont relances avant le commit ; son identifiant et leurs
resultats seront consignes dans `PRIMER.md`, qui reste local et non suivi.
Les quatre fichiers de contexte preexistants sont exclus du commit.
La publication reste une etape distincte, soumise a un accord explicite.
