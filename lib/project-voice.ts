// Récit à la première personne et schéma de présentation de chaque projet.
// Les faits viennent des fiches de lib/projects.ts : rien n'est ajouté ici
// qui ne soit déjà documenté là-bas. Le ton est celui de Jonas, en prose,
// sans liste dans le récit.

export type ProjectFlowStep = { label: string; text: string };

export type ProjectVoice = {
  narrative: string[];
  flowTitle: string;
  flow: ProjectFlowStep[];
};

export const projectVoice: Record<string, ProjectVoice> = {
  "job-radar": {
    narrative: [
      "Je cherchais un poste et je retombais sur les mêmes annonces, d'un site à l'autre. Un titre me plaisait, puis je découvrais trois lignes plus bas qu'il fallait huit ans d'expérience. J'ai fini par construire mon propre outil.",
      "Job Radar réunit les offres, retire les doublons et m'explique pourquoi une annonce remonte. Le score ne sort pas d'une boîte noire, puisque chaque note renvoie à une règle et à un extrait de l'annonce. Ensuite c'est moi qui décide. L'outil prépare, il n'envoie rien tout seul.",
      "Une erreur m'a servi. Des candidatures parties hors de l'application manquaient au suivi, et j'ai dû en réintégrer six à la main le 12 septembre. Depuis, la version publique tourne avec des données fictives et la mienne reste privée."
    ],
    flowTitle: "D'une annonce à une candidature suivie",
    flow: [
      { label: "Collecte", text: "Les sources autorisées sont lues, les doublons retirés." },
      { label: "Classement", text: "Chaque note renvoie à une règle et à un extrait." },
      { label: "Lecture", text: "Je lis l'offre et ce qu'il lui manque." },
      { label: "Dossier", text: "Je prépare, je relis, je valide." },
      { label: "Suivi", text: "Toutes mes démarches au même endroit." }
    ]
  },
  "les-petites-griffes": {
    narrative: [
      "Ma sœur tient un studio de nail art. Elle avait besoin d'un site qu'elle puisse tenir seule, sans m'appeler à chaque changement de tarif.",
      "J'ai donc monté le site en Next.js et, à côté, un petit back-office fait pour elle. Elle y change sa galerie, ses prestations, ses prix et sa FAQ. Pour les questions qui reviennent tout le temps, un assistant répond à sa place, mais seulement sur ce qu'il connaît, c'est-à-dire les prix, les disponibilités et l'adresse.",
      "C'est un projet de famille, pas une vente. Je le dis tel quel. Le site est en ligne, et l'audit du 1er août 2026 a passé 18 pages au crible sur mobile et sur grand écran."
    ],
    flowTitle: "Qui touche à quoi sur le site",
    flow: [
      { label: "La gérante", text: "Elle modifie galerie, tarifs et FAQ." },
      { label: "Back-office", text: "Un accès protégé, pensé pour elle." },
      { label: "Contenus", text: "Tout est rangé dans Supabase." },
      { label: "Site public", text: "Next.js, servi par Vercel." },
      { label: "Assistant", text: "Il répond sur les prix et les créneaux." }
    ]
  },
  "educool-v2": {
    narrative: [
      "Dans la classe, les acquis se suivent avec des ceintures de compétences. Le souci, c'est que la même information se recopiait ensuite dans les livrets. Deux fois le travail.",
      "Educool V2 sert à l'enseignante et à elle seule. Elle retrouve un élève, saisit ses ceintures, écrit une appréciation, et le livret se prépare à partir de cette même saisie. J'ai replié les formulaires secondaires pour que la liste des élèves reste sous les yeux.",
      "Ce n'est pas terminé. Les captures montrent une version locale, et je ne revendique aucun gain de temps tant que rien n'est mesuré. Les données scolaires ne sortent pas."
    ],
    flowTitle: "De la saisie au livret",
    flow: [
      { label: "Élève", text: "Retrouvé avec les filtres de classe." },
      { label: "Ceintures", text: "Saisies matière par matière." },
      { label: "Appréciation", text: "Écrite dans la même fiche." },
      { label: "Livret", text: "Préparé depuis cette saisie." },
      { label: "Sauvegarde", text: "Locale, avec import confirmé." }
    ]
  },
  "educool-la-herse": {
    narrative: [
      "La banque existait déjà dans la classe. Je lui ai donné des lieux, des personnages et des conséquences qui se voient.",
      "Cool Bank est devenu un bourg en 3D. On y gagne des cools avec des quêtes, on les place à la banque, on achète un terrain et la maison grandit, de la tente au manoir. Jusqu'à 30 élèves entrent dans la même partie. L'enseignante garde la main, puisqu'elle peut geler le monde, rappeler tout le monde ou couper le chat.",
      "J'ai refait le jeu trois fois. D'abord dans le navigateur, puis une reconstruction, et enfin Godot pour la V4, parce qu'un client natif tient mieux sur les PC et les vieilles tablettes de l'école. Les mesures viennent d'élèves simulés. Aucune séance réelle en classe n'est inventée ici."
    ],
    flowTitle: "Ce que fait un élève dans la partie",
    flow: [
      { label: "Quête", text: "L'élève accomplit une mission du bourg." },
      { label: "Cools", text: "Il gagne des cools et des centicools." },
      { label: "Banque", text: "Il les dépose et suit son solde." },
      { label: "Maison", text: "Terrain, tente, cabane, puis manoir." },
      { label: "Serveur de classe", text: "Il fait foi et l'enseignante commande." }
    ]
  },
  capselys: {
    narrative: [
      "Capsélys a un site WordPress sous Divi, avec un parcours d'adhésion à simplifier. C'était mon terrain d'atelier pendant le MBA.",
      "J'ai travaillé sur un staging, jamais sur la prod. J'ai restructuré les pages de service et d'adhésion, puis vérifié le rendu écran par écran, car avec Divi le code de la page ne dit pas ce que l'œil verra. J'ai aussi construit un assistant qui pose deux ou trois questions et oriente vers le bon service.",
      "Un choix compte plus que les autres. Ce que la gérante modifie reste dans Divi, et ce qui peut casser (sécurité, SEO, formulaires, assistant) reste en code. La refonte n'est pas en production, donc je n'ai aucun chiffre de conversion à montrer."
    ],
    flowTitle: "Comment la refonte a avancé",
    flow: [
      { label: "Audit", text: "Le rendu contrôlé sur plusieurs écrans." },
      { label: "Staging", text: "La refonte, sans toucher à la prod." },
      { label: "Adhésion", text: "Un parcours plus court à suivre." },
      { label: "Assistant", text: "Il oriente vers le bon service." },
      { label: "Passation", text: "Divi pour le contenu, le code pour le reste." }
    ]
  },
  iscom: {
    narrative: [
      "C'est mon alternance. Chez ISCOM, je prépare des contenus SEO et je les monte dans Drupal, sur un site de 359 pages qu'on ne peut pas se permettre de casser.",
      "Mon travail commence avant l'écriture. Je regarde dans Semrush quelles pages se marchent dessus, je rédige, puis je confronte chaque chiffre à sa source. Les IA inventent vite des chiffres plausibles. J'en ai fait les frais, et la checklist d'avant publication vient de là.",
      "J'ai automatisé une partie de la saisie et des contrôles. Pas la publication. L'équipe éditoriale valide toujours en dernier, et c'est très bien comme ça. Le trafic se mesure côté employeur, je ne le publie pas ici."
    ],
    flowTitle: "Le trajet d'un article",
    flow: [
      { label: "Audit", text: "Semrush repère les pages en concurrence." },
      { label: "Rédaction", text: "Chaque chiffre retrouve sa source." },
      { label: "Checklist", text: "Les points à vérifier avant d'aller plus loin." },
      { label: "Drupal", text: "Saisie et contrôles en partie automatisés." },
      { label: "Validation", text: "L'équipe éditoriale décide de publier." }
    ]
  },
  preuvia: {
    narrative: [
      "Les gens posent leurs questions à un assistant IA, et la réponse cite deux ou trois marques. La tienne y est, ou pas. Preuvia sert à le savoir.",
      "Je pose le même jeu de questions à quatre assistants (ChatGPT, Claude, Perplexity et Gemini). Je note ensuite la présence, l'exactitude, la fraîcheur et la citabilité, de 0 à 3. Je regarde aussi qui ressort à la place de la marque et d'où viennent les sources. Le client repart avec un PDF, des contenus à publier et la liste de ce qu'on re-testera.",
      "Je ne promets pas qu'une marque sera citée. Personne ne contrôle ce que les modèles répondent, et un score vaut pour le jour du test. L'offre est en ligne, en phase de lancement."
    ],
    flowTitle: "Le déroulé d'un audit",
    flow: [
      { label: "Questions", text: "Requêtes génériques et requêtes de marque." },
      { label: "Quatre assistants", text: "Le même jeu de questions partout." },
      { label: "Grille", text: "Quatre critères notés de 0 à 3." },
      { label: "Sources", text: "Qui est cité à la place de la marque." },
      { label: "Livrable", text: "Un PDF, quoi publier, quoi re-tester." }
    ]
  },
  "cortex-bridge": {
    narrative: [
      "Je voulais un agent de code sans ajouter un second abonnement à celui de ChatGPT. Alors j'ai branché l'un sur l'autre.",
      "Cortex Bridge laisse ChatGPT réfléchir et planifier. Toi, tu valides. Cortex exécute ensuite sur ton ordinateur, dans le dossier que tu as choisi, et garde une trace de chaque étape. En cas de doute il bloque. Une validation mal formée arrête la mission au lieu de la laisser passer.",
      "Je préfère prévenir. C'est une preview, pas un produit fini. Le pilotage par l'interface de ChatGPT entre en conflit avec les conditions du fournisseur, donc il ne s'active que si tu le demandes. L'installation sur un Mac neuf et la version Windows restent à vérifier."
    ],
    flowTitle: "Une action, du plan à l'exécution",
    flow: [
      { label: "ChatGPT", text: "Il analyse et propose un plan." },
      { label: "Extension", text: "Elle lit la décision dans Chrome." },
      { label: "Console locale", text: "Elle reçoit la mission sur ta machine." },
      { label: "Toi", text: "Tu valides ou tu refuses." },
      { label: "Exécuteur", text: "Il agit dans le dossier choisi." },
      { label: "Rapport", text: "Le résultat revient dans la conversation." }
    ]
  },
  "battle-engine": {
    narrative: [
      "Battle Engine fabrique des vidéos de combats en un contre un. Le combat est rendu par un moteur de jeu, monté puis publié, sans que j'ouvre un logiciel de montage.",
      "Un script Python lance le rendu dans Godot. FFmpeg assemble, RIFE lisse les mouvements, puis la vidéo part sur YouTube. Si la chaîne s'interrompt en pleine nuit, elle reprend à la dernière étape terminée. Pas besoin de tout recalculer.",
      "Le 23 septembre, mon contrôle de lisibilité refusait un épisode correct. Je n'ai pas baissé le seuil. J'ai corrigé ce qu'il regardait, et l'épisode BL05 est sorti. C'est un laboratoire personnel, et je ne cite aucun chiffre d'audience."
    ],
    flowTitle: "Comment une vidéo se fabrique",
    flow: [
      { label: "Script", text: "Python lance et suit toute la chaîne." },
      { label: "Rendu", text: "Godot joue et filme le combat." },
      { label: "Montage", text: "FFmpeg assemble les séquences." },
      { label: "Lissage", text: "RIFE ajoute les images manquantes." },
      { label: "Contrôle", text: "Le bandeau doit rester lisible." },
      { label: "YouTube", text: "La vidéo est publiée." }
    ]
  },
  hoopsphere: {
    narrative: [
      "HoopSphere, c'est un projet de MBA monté à quatre. Une application qui lit les feuilles de match du basket amateur pour en tirer des statistiques.",
      "Je n'ai pas écrit le code. Je le dis d'entrée, parce que ma part est ailleurs. J'ai fait l'étude de marché, les personas, le plan d'acquisition sur Instagram, une campagne d'emailing vers les coachs et les projections financières du business plan.",
      "On a construit une audience. Pas encore de clients payants. Je garde le projet ici comme une archive honnête plutôt que comme un pitch de startup."
    ],
    flowTitle: "Ma part dans le projet",
    flow: [
      { label: "Marché", text: "Qui joue, qui coache, qui paierait." },
      { label: "Personas", text: "Le coach, le joueur, le club." },
      { label: "Instagram", text: "Le plan pour se faire connaître." },
      { label: "Emailing", text: "Une campagne vers les coachs." },
      { label: "Business plan", text: "Les projections financières." }
    ]
  },
  "rag-starter-kit": {
    narrative: [
      "Un cabinet qui interroge ses documents avec une IA ne veut surtout pas voir remonter ceux d'un autre client. Ce prototype partait de cette peur, qui est légitime.",
      "J'avais séparé quatre étapes pour pouvoir les vérifier une à une. L'ingestion des documents, la recherche, la réponse avec ses citations, puis l'évaluation sur des cas versionnés. Chaque client avait son espace.",
      "Je dois être clair. Le code source a disparu pendant une migration, et le prototype ne tourne plus aujourd'hui. Il reste l'audit du 29 juin 2026 et l'historique des commits. Je ne revendique aucune performance."
    ],
    flowTitle: "Le chemin d'une question",
    flow: [
      { label: "Ingestion", text: "Les documents d'un client sont découpés." },
      { label: "Isolation", text: "Chaque client garde son espace." },
      { label: "Recherche", text: "Les passages utiles sont retrouvés." },
      { label: "Réponse", text: "Elle cite ses sources." },
      { label: "Évaluation", text: "Des cas de test rejouables." }
    ]
  },
  "board-ia-pme": {
    narrative: [
      "Quand on demande un avis à une IA, elle en donne un. Un seul, et bien sûr d'elle. Je voulais voir ce qui se passe quand cinq analyses se contredisent.",
      "Le prototype faisait travailler cinq agents sur la même question, classait leurs sorties, les pondérait, puis passait un seuil de confiance avant de rédiger une synthèse. La partie arbitrage restait déterministe pour qu'on puisse la relire.",
      "C'était petit, 437 lignes dans 10 fichiers. La source n'est plus sur ma machine, et le README annonçait des briques qui n'ont jamais été codées. Je préfère l'écrire ici que le laisser deviner."
    ],
    flowTitle: "De la question à la synthèse",
    flow: [
      { label: "Question", text: "Un dirigeant pose son problème." },
      { label: "Cinq agents", text: "Chacun répond de son côté." },
      { label: "Classement", text: "Les sorties sont pondérées." },
      { label: "Seuil", text: "Sous le seuil, pas de conclusion." },
      { label: "Synthèse", text: "Les désaccords restent visibles." }
    ]
  },
  edusemantix: {
    narrative: [
      "Tu connais peut-être ces jeux où il faut deviner un mot secret. Chaque essai reçoit une note selon sa proximité de sens avec le mot à trouver.",
      "J'en ai fait une version à plusieurs. Chaque proposition part au serveur, qui renvoie un score, et tout le monde voit la partie avancer en direct. Les vecteurs de mots sont calculés à l'avance en Python puis stockés en binaire, ce qui permet à un seul petit serveur de tout servir.",
      "La démo est en ligne. Elle met parfois quelques secondes à se réveiller. Rien ne prouve un usage en classe, et je ne mesure pas l'audience."
    ],
    flowTitle: "Ce qui se passe à chaque essai",
    flow: [
      { label: "Pré-calcul", text: "Python prépare les vecteurs de mots." },
      { label: "Proposition", text: "Le joueur tente un mot." },
      { label: "Serveur", text: "Il compare avec le mot secret." },
      { label: "Score", text: "La proximité de sens est notée." },
      { label: "En direct", text: "Tous les joueurs voient l'avancée." }
    ]
  },
  "pokemon-gen4-toolkit": {
    narrative: [
      "Je voulais comprendre comment un jeu de cette époque range ses textes, ses événements et ses zones. Le plus simple était d'aller regarder.",
      "J'ai écrit mes outils en Python plutôt que de dépendre d'un éditeur existant. Ils ouvrent les archives du jeu, décodent les textes et me laissent modifier des scripts ou des espèces. J'ai réécrit le moteur de texte moi-même pour maîtriser l'encodage.",
      "Rien n'est distribué. Sans une ROM que tu possèdes légalement, le toolkit ne fait rien du tout. C'est un laboratoire privé, limité à la quatrième génération."
    ],
    flowTitle: "Ce que font les outils",
    flow: [
      { label: "ROM fournie", text: "Celle de l'utilisateur, jamais distribuée." },
      { label: "Archives", text: "Les fichiers NARC sont ouverts." },
      { label: "Décodage", text: "Les textes redeviennent lisibles." },
      { label: "Édition", text: "Textes, événements, scripts, espèces." },
      { label: "Réécriture", text: "Les fichiers sont remis en place." }
    ]
  },
  "claude-code-soul": {
    narrative: [
      "À force de régler Claude Code pour mon usage, je me suis retrouvé avec deux choses mélangées. D'un côté la personnalité de l'assistant, son ton et ses refus. De l'autre la plomberie.",
      "Je les ai séparées. Un fichier porte l'identité, d'autres portent les règles, les skills, les agents et les hooks. Les outils lourds se chargent à la demande et non au démarrage, ce qui économise de la mémoire.",
      "Le dépôt est public, sous licence MIT. Avant chaque publication un contrôle cherche les secrets oubliés. C'est une configuration très personnelle, donc à adapter avant de la reprendre."
    ],
    flowTitle: "Comment le pack est organisé",
    flow: [
      { label: "Identité", text: "Le ton, les valeurs, les refus." },
      { label: "Règles", text: "La méthode de travail." },
      { label: "Skills et agents", text: "Chargés seulement à la demande." },
      { label: "Hooks", text: "Les garde-fous automatiques." },
      { label: "Publication", text: "Un contrôle des secrets, puis GitHub." }
    ]
  }
};
