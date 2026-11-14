// Fiche longue d'un projet, écrite comme une page de développeur de jeu :
// fiche du jeu, piliers, histoire par versions, étapes datées (problème puis
// solution), méthode, chiffres sourcés, leçons. Un projet sans entrée ici garde
// la page standard. Chaque chiffre porte sa source ; un chiffre sans source ne
// s'écrit pas.

export type DevlogMedia = {
  kind: "image" | "video";
  src: string;
  poster?: string;
  caption: string;
  width: number;
  height: number;
};

export type ProjectDevlog = {
  pitch: string;
  sheet: { label: string; value: string }[];
  pillarsTitle: string;
  pillars: { title: string; text: string }[];
  versionsTitle: string;
  versionsLead: string;
  versions: {
    label: string;
    period: string;
    name: string;
    text: string[];
    kept: string;
    media: DevlogMedia[];
  }[];
  stepsTitle: string;
  stepsLead: string;
  steps: {
    title: string;
    when: string;
    problem: string;
    solution: string;
    result?: string;
    media: DevlogMedia[];
  }[];
  measureTitle: string;
  measureLead: string;
  measureRows: { where: string; fps: string; slow: string }[];
  measureNote: string;
  methodTitle: string;
  method: { title: string; text: string }[];
  numbersTitle: string;
  numbers: { value: string; label: string; source: string }[];
  learnedTitle: string;
  learned: { title: string; text: string }[];
  nextTitle: string;
  next: string[];
};

const video = (name: string, caption: string, width = 960, height = 540): DevlogMedia => ({
  kind: "video",
  src: `/assets/video/${name}.mp4`,
  poster: `/assets/video/${name}-poster.webp`,
  caption,
  width,
  height
});

const image = (name: string, caption: string, width: number, height: number): DevlogMedia => ({
  kind: "image",
  src: `/assets/proof/educool/${name}.webp`,
  caption,
  width,
  height
});

export const projectDevlogs: Record<string, ProjectDevlog> = {
  "educool-la-herse": {
    pitch:
      "Cool Bank est un jeu en 3D pour une classe de CM1-CM2. Les élèves y gagnent la monnaie de leur classe, la déposent à la banque et font grandir leur maison sur une île.",
    sheet: [
      { label: "Genre", value: "Jeu de vie et de gestion en 3D, à jouer seul ou avec sa classe" },
      { label: "Pour qui", value: "Une classe de CM1-CM2, des élèves de 9 à 11 ans, et leur enseignante" },
      { label: "Mon rôle", value: "Conception du jeu, direction, pilotage des agents IA qui écrivent le code, tests, mises en ligne" },
      { label: "Équipe", value: "Moi, avec plusieurs sessions d'agents IA qui travaillent en parallèle" },
      { label: "Durée", value: "Depuis juin 2026 pour la première version. La V4 a commencé le 17 octobre 2026." },
      { label: "Moteur et outils", value: "Godot 4.6, GDScript, Blender, Python, Firebase, Vercel" },
      { label: "Plateformes", value: "Windows 64 bits, Windows 32 bits pour les vieux PC, Mac" },
      { label: "Version", value: "0.3.1, publiée le 13 novembre 2026" }
    ],
    pillarsTitle: "Les quatre piliers du jeu.",
    pillars: [
      {
        title: "L'argent se voit",
        text: "Un élève qui économise finit par acheter une tente, puis une maison. Celui qui dépense tout reste sur son terrain vide. Personne n'a besoin de lui expliquer."
      },
      {
        title: "La classe ouvre le jeu",
        text: "Les ceintures passées en classe décident des quêtes et des questions du jeu. Ce qu'on apprend le matin sert l'après-midi."
      },
      {
        title: "La maîtresse garde la main",
        text: "Elle suit sa classe depuis son propre outil et peut ajouter des cools à un élève. Entre élèves, il n'y a pas de messages libres. Ils choisissent des phrases polies et des gestes."
      },
      {
        title: "Ça doit tourner à l'école",
        text: "Les ordinateurs de la classe ont plus de dix ans. Un jeu qui rame sur ces machines ne sert à rien, même s'il est beau sur la mienne."
      }
    ],
    versionsTitle: "L'histoire en quatre versions.",
    versionsLead:
      "J'ai refait Cool Bank trois fois. Je garde les anciennes versions sur cette page parce qu'elles expliquent la dernière.",
    versions: [
      {
        label: "V1",
        period: "Juin 2026",
        name: "La banque de classe en site web",
        text: [
          "La première version était un site. L'élève y voyait son solde, ses onze ceintures de la rose à la dorée, une boutique d'avatars, les métiers de la classe, les amendes et les enchères.",
          "C'était un outil de gestion, sans monde à explorer."
        ],
        kept: "La monnaie, les onze ceintures et leurs animations.",
        media: []
      },
      {
        label: "V2",
        period: "Juillet et août 2026",
        name: "Le premier monde en 3D",
        text: [
          "J'ai mis la banque dans un village en 3D, joué dans le navigateur. Trois rôles y existaient déjà, l'élève, le banquier (un élève qui tient le guichet) et l'enseignante.",
          "La boucle se jouait sur un seul appareil, avec des profils de démonstration. Elle n'a jamais été prête pour Internet."
        ],
        kept: "Les trois rôles, les maisons et le lien avec l'outil de l'enseignante.",
        media: [
          image("v2-village-20260817", "V2, la place du village. Capture de contrôle du 17 août 2026.", 1440, 900),
          image("v2-world-20260817", "V2, le monde vu de haut avec l'interface du joueur. Archive du 17 août 2026.", 1440, 900),
          image("v2-house-20260822", "V2, l'intérieur d'une maison dans le scénario de test du 22 août 2026.", 910, 522)
        ]
      },
      {
        label: "V3",
        period: "Août et septembre 2026",
        name: "La reconstruction, plus grande",
        text: [
          "J'ai tout reconstruit avec une carte plus large, dessinée dans Blender, et des interfaces refaites.",
          "Le jeu restait dans le navigateur et la fluidité ne suivait pas. Sur un vieux PC, un monde de cette taille dans une page web, ça ne tient pas."
        ],
        kept: "Une leçon surtout. Un monde de cette taille demande un vrai moteur de jeu.",
        media: [
          image("v3-map-city-20260908", "V3, le bourg vu par la caméra de contrôle. Build du 7 septembre 2026.", 1440, 900),
          image("v3-map-castle-20260908", "V3, le château dans le même build.", 1440, 900),
          image("v3-map-island-20260908", "V3, le terrain entier pour situer les zones.", 1440, 900)
        ]
      },
      {
        label: "V4",
        period: "Depuis le 17 octobre 2026",
        name: "Le jeu de la classe, dans Godot",
        text: [
          "J'ai quitté le navigateur pour un vrai moteur de jeu, Godot. Le jeu s'installe sur l'ordinateur, se met à jour tout seul et se joue seul ou avec la classe.",
          "C'est la version en cours. Huit versions sont sorties entre le 5 et le 13 novembre 2026."
        ],
        kept: "Tout ce qui précède, dans un moteur fait pour ça. La suite de la page la raconte étape par étape.",
        media: [
          image("v4-bourg-20261105", "V4, la place du marché et l'interface du joueur. Profil de démonstration, capture du 5 novembre 2026.", 1440, 1003)
        ]
      }
    ],
    stepsTitle: "La V4, étape par étape.",
    stepsLead:
      "Pour chaque étape, je note ce qui coinçait et ce que j'ai fait. Les images viennent des essais du jeu. Tous les élèves qu'on y voit sont inventés.",
    steps: [
      {
        title: "Le monde",
        when: "Octobre et début novembre 2026",
        problem:
          "L'île existait, mais elle paraissait vide et figée. L'herbe était faite de cartes plates, le jeu se figeait pendant qu'il construisait le décor.",
        solution:
          "J'ai refait l'herbe en vrais brins. Ils bougent avec le vent et se couchent quand on marche dedans, avec une herbe différente pour la prairie, la forêt, le bord de l'eau ou la plage. Une journée dure dix minutes, la nuit cinq.",
        result: "La nouvelle herbe est sortie dans la version 0.2.1 du 7 novembre.",
        media: [
          video("coolbank-herbe-20261107", "L'herbe du pré fleuri, en brins séparés qui suivent le vent. Essai du 7 novembre 2026.")
        ]
      },
      {
        title: "Les habitants et leurs réponses",
        when: "Fin octobre et novembre 2026",
        problem:
          "Un village sans personne, ça ne donne pas envie de rester. Et des habitants qui répètent trois phrases lassent vite.",
        solution:
          "Le bourg compte 19 habitants. Chacun a son métier, son apparence et sa façon de parler. L'élève peut écrire une question, une intelligence artificielle écrit la réponse, courte et filtrée pour des enfants.",
        result:
          "Les détails comptent aussi. Le collier du maire était droit au lieu de faire le tour de son cou. C'est un ticket comme un autre, avec sa capture avant et sa capture après.",
        media: [
          image("v4-collier-avant-20261114", "Avant, le collier du maire flotte en ligne droite devant lui.", 1440, 250),
          image("v4-collier-apres-20261114", "Après, il fait le tour de son cou sous tous les angles. Planches du 14 novembre 2026.", 1440, 250)
        ]
      },
      {
        title: "L'argent et la banque de classe",
        when: "Novembre 2026",
        problem:
          "La monnaie de la classe existe en vrai, sur papier. Le jeu ne devait ni la remplacer ni la mélanger avec ce qu'on gagne en jouant.",
        solution:
          "Un cool vaut 100 centicools et les cools sont des cartes de cinq valeurs. Ceux gagnés en classe et ceux gagnés en jeu sont comptés à part. L'écran « Mon compte » réunit l'argent, l'épargne et le mois à payer.",
        media: [
          image("v4-banque-20261105", "Le compte de l'élève à la banque, avec le bureau de change. Habitante et soldes inventés, capture du 5 novembre 2026.", 1440, 1003)
        ]
      },
      {
        title: "Les logements",
        when: "Novembre 2026",
        problem:
          "J'ai filmé l'achat d'un logement à deux joueurs sur deux appareils. Les vidéos ont montré dix défauts que je n'avais pas vus en jouant seul, par exemple une maison impossible à décorer au clavier.",
        solution:
          "Je les ai corrigés un par un. L'élève achète une tente pour 200 à 300 centicools, puis l'agrandit en maison simple, grande maison et maison double. Son camarade voit la maison se monter et le nom de son propriétaire au-dessus.",
        media: [
          video("coolbank-maison-duo-20261114", "Deux appareils côte à côte. À gauche l'élève qui agrandit sa maison, à droite ce que voit son camarade. Essai du 14 novembre 2026.", 1440, 404)
        ]
      },
      {
        title: "Le lien avec l'outil de l'enseignante",
        when: "Novembre 2026",
        problem:
          "Au début, l'argent et la progression vivaient dans un fichier sur chaque ordinateur. Un élève qui changeait de poste repartait de zéro.",
        solution:
          "Le jeu lit la liste de la classe dans l'outil de l'enseignante, avec le prénom, l'initiale du nom, le niveau et les ceintures. Il lui renvoie un résumé de la partie. Le compte et la sauvegarde suivent maintenant l'élève.",
        result: "Le jeu ne reçoit ni nom de famille, ni adresse, ni photo.",
        media: []
      },
      {
        title: "La classe en ligne",
        when: "Novembre 2026",
        problem:
          "Un essai à deux postes ne dit rien d'une classe de trente. Je ne voulais pas découvrir les pannes le jour de la séance.",
        solution:
          "J'ai écrit un banc de 21 situations de classe, avec trente élèves simulés, une coupure de réseau de dix secondes, des messages perdus et de la triche. Le serveur garde seul le compte de l'argent.",
        result:
          "Le 5 novembre, 18 situations sur 21 passaient et les trente élèves entraient dans la partie en 15,1 secondes. Les trois autres concernaient l'heure du jeu et la place des habitants, qui différaient d'un poste à l'autre.",
        media: [
          video("coolbank-classe-chateau-20261114", "Une classe d'essai dans le château des maths. La salle du cristal a cinq places, le sixième attend son tour. Élèves inventés, essai du 14 novembre 2026.")
        ]
      },
      {
        title: "Le lanceur et les mises à jour",
        when: "Novembre 2026",
        problem:
          "La version 0.2.0 est partie sans les habitants ni les ceintures. Les modèles étaient bien dans le projet, mais l'export ne les embarquait pas.",
        solution:
          "J'ai corrigé les 86 fichiers concernés et ajouté un contrôle du paquet avant chaque version. Un lanceur installe le jeu, le met à jour, vérifie les fichiers et sait le réparer sans toucher aux sauvegardes.",
        media: []
      },
      {
        title: "Les châteaux et les cristaux",
        when: "14 novembre 2026",
        problem:
          "Les quêtes rapportaient de l'argent, mais rien ne donnait envie de réviser ses tables. Il manquait un défi qui revienne chaque jour.",
        solution:
          "Il y a trois châteaux, un par matière, et celui des maths ouvre en premier. Dans la salle du cristal, l'élève reçoit une question par ceinture, de la rose à la dorée, avec 60 secondes pour répondre. Une bonne réponse rapporte des centicools. À la première erreur, le cristal le renvoie dehors avec ses gains et le château rouvre le lendemain.",
        result:
          "Le meilleur de la classe s'assoit sur le trône avec une couronne à la couleur de sa ceinture. Les châteaux sont prêts et testés, pas encore dans la version publiée.",
        media: [
          video("coolbank-cristaux-20261114", "Les onze cristaux, un par ceinture. Les effets grossissent jusqu'au cristal doré. Essai du 14 novembre 2026."),
          video("coolbank-expulsion-20261114", "Une mauvaise réponse. Le cristal tremble, repousse le joueur et la fenêtre donne la bonne réponse."),
          video("coolbank-couronnes-20261114", "Les onze couronnes qui tombent sur la tête du champion, de la rose à la dorée."),
          image("v4-cristaux-20261114", "La planche des onze cristaux qui m'a servi à comparer les effets d'un seul coup d'œil.", 1440, 796)
        ]
      },
      {
        title: "La fiche des élèves",
        when: "13 et 14 novembre 2026",
        problem:
          "Un enfant de neuf ans ne lit pas une notice. Il lui faut les touches et les premières étapes sous les yeux, à côté du clavier.",
        solution:
          "J'ai fait un guide d'une seule page à imprimer, avec les dix étapes dans l'ordre, les touches dessinées et quoi faire si ça bloque.",
        media: [
          image("v4-guide-eleves-20261114", "Le guide d'une page distribué aux élèves. La carte « Qui es-tu ? » montre des élèves de test.", 900, 1226)
        ]
      },
      {
        title: "Les sons",
        when: "Octobre et novembre 2026",
        problem:
          "Mon premier retour sur le jeu, le 25 octobre, a été de couper tous les bruits et de garder la musique.",
        solution:
          "J'ai repris les sons un par un. 116 sons ont été fabriqués pour les cristaux, la couronne et les actions du jeu. J'ai validé le premier lot à l'oreille, les autres attendent.",
        media: []
      }
    ],
    measureTitle: "Le vrai test, sur un ordinateur de l'école.",
    measureLead:
      "Le 14 novembre, j'ai mesuré le jeu sur un poste d'élève, un PC de bureau avec 4 Go de mémoire et une puce graphique intégrée de 2013. Le jeu choisit seul un profil allégé sur ces machines.",
    measureRows: [
      { where: "La place du bourg", fps: "11,3", slow: "9,0" },
      { where: "Devant le château des maths", fps: "13,5", slow: "11,3" },
      { where: "La salle du trône", fps: "22,2", slow: "20,0" },
      { where: "La salle du cristal, cristal rose", fps: "25,1", slow: "23,3" },
      { where: "La salle du cristal, cristal doré", fps: "24,1", slow: "22,4" }
    ],
    measureNote:
      "Dans les salles, ça se joue. Dehors, c'est encore lent, et le tout premier chargement prend neuf minutes sur ce poste. Aucune erreur de script pendant la mesure. C'est le chantier en cours.",
    methodTitle: "Comment je travaille avec des agents IA.",
    method: [
      {
        title: "Un ticket par demande",
        text: "Chaque retour devient une ligne numérotée. Le compteur en est à 732. Quand je dis « le collier du maire est droit », ça devient le ticket 730."
      },
      {
        title: "Une preuve avant de dire « fait »",
        text: "Une capture avant, une capture après, un journal. Un test qui passe ne veut pas dire que j'ai validé. Les deux statuts sont séparés dans le suivi et moi seul donne le second."
      },
      {
        title: "Des sessions en parallèle",
        text: "Plusieurs agents travaillent en même temps, chacun sur son lot. Une session cheffe tient le suivi et relit les preuves. Un seul agent écrit un fichier à la fois."
      },
      {
        title: "Un regard neuf",
        text: "Je fais jouer le jeu par une session qui ne l'a jamais vu. Elle note ce qu'un enfant ne comprendrait pas, sans rien savoir de ce que j'ai voulu faire."
      }
    ],
    numbersTitle: "Les chiffres, avec leur source.",
    numbers: [
      { value: "1 132", label: "commits dans le dépôt du jeu, du 17 octobre au 14 novembre 2026", source: "historique git" },
      { value: "732", label: "tickets numérotés depuis l'audit du 25 octobre 2026", source: "suivi des tickets" },
      { value: "8", label: "versions publiées entre le 5 et le 13 novembre", source: "journal des versions" },
      { value: "19", label: "habitants dans le bourg", source: "fiche publique du jeu" },
      { value: "11", label: "ceintures, de la rose à la dorée", source: "fiche publique du jeu" },
      { value: "206", label: "modèles 3D dans le paquet Windows de la 0.3.1", source: "bilan de la version" },
      { value: "116", label: "sons fabriqués pour le jeu", source: "suivi des tickets" },
      { value: "3", label: "paquets par version : Windows 64 bits, 32 bits et Mac", source: "bilan de la version" }
    ],
    learnedTitle: "Mes leçons de ce projet.",
    learned: [
      {
        title: "Mesurer sur la machine de l'utilisateur",
        text: "Sur mon Mac, tout allait bien. Sur le poste de l'école, la place tournait à 11 images par seconde. Je mesure maintenant là-bas avant de publier."
      },
      {
        title: "Filmer plutôt que raconter",
        text: "L'essai filmé des logements a montré dix défauts. Aucun compte rendu écrit ne les avait signalés."
      },
      {
        title: "Refaire coûte cher",
        text: "Trois reconstructions en cinq mois, c'est beaucoup. Chaque fois j'ai gardé ce qui marchait, la monnaie, les ceintures, la carte. J'aurais gagné du temps en choisissant un vrai moteur de jeu plus tôt."
      },
      {
        title: "Un agent qui dit « fait » n'a rien prouvé",
        text: "Tant que je n'ai pas vu la capture, le ticket reste ouvert. La version partie sans ses habitants m'a servi de rappel."
      }
    ],
    nextTitle: "La suite du chantier.",
    next: [
      "Rendre le jeu fluide dehors sur les ordinateurs de l'école et raccourcir le premier chargement.",
      "Publier les châteaux, puis brancher tous les sons.",
      "Rejouer le banc de la classe en ligne au complet, puis une séance de deux heures.",
      "Finir la version tablette, encore en essai.",
      "Mesurer ce que les élèves comprennent et retiennent. Aujourd'hui, je n'ai aucun chiffre là-dessus et je n'en avance aucun."
    ]
  }
};
