import type { Metadata } from "next";

export type ProjectTier = 1 | 2 | 3;
export type EvidenceLevel = "public" | "private" | "self-declared";
export type ProofImage = { src: string; caption: string; width: number; height: number; poster?: string };

export type ProjectNarrativeBlock = {
  title: string;
  lead: string;
  items: string[];
};

export type ProjectStory = {
  purposeTitle: string;
  purposeLead: string;
  purpose: string[];
  roles: Array<{ title: string; text: string }>;
  galleryGroups: Array<{
    kicker: string;
    title: string;
    description: string;
    featuredFirst?: boolean;
    images: ProofImage[];
  }>;
};

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  type: string;
  period: string;
  role: string;
  status: string;
  evidenceLevel: EvidenceLevel;
  tier: ProjectTier;
  image: string;
  heroImage?: ProofImage;
  architectureImage?: ProofImage;
  architectureTitle?: string;
  architectureLead?: string;
  fullColorMedia?: boolean;
  cardStatus?: string;
  story?: ProjectStory;
  need?: ProjectNarrativeBlock;
  intention?: ProjectNarrativeBlock;
  proofLine: string;
  summary: string;
  stack: string[];
  recruiterProof: string[];
  constraints: string[];
  decisions: Array<{
    decision: string;
    why: string;
    rejected: string;
  }>;
  delivered: string[];
  results: string[];
  limits: string[];
  architecture?: string[];
  versions?: Array<{
    label: string;
    name: string;
    publicStatus?: string;
    status: string;
    summary: string;
    evidence: string[];
    limits: string[];
  }>;
  versionsTitle?: string;
  v2?: string[];
  notMeasured?: string[];
  repoStatus?: string;
  liveLabel?: string;
  evidenceNote?: string;
  metaDescription?: string;
  cardLine?: string;
  video?: string;
  videoWidth?: number;
  videoHeight?: number;
  noindex?: boolean;
  // Le code vient de l'équipe, pas de Jonas (ex. HoopSphere : sa part est le marketing).
  // Pilote le JSON-LD : contributor au lieu d'author, pas de programmingLanguage.
  codeByOthers?: boolean;
  gallery?: ProofImage[];
  links: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
};

// Origine canonique unique : env en prod (jonassuhard.com dès SSL), sinon URL Vercel live.
// Pilote metadataBase, sitemap, robots et JSON-LD pour qu'ils pointent tous la même origine crawlable.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://jonassuhard.com"
).replace(/\/$/, "");

export const site = {
  name: "Jonas Suhard",
  title: "Growth Engineer junior",
  seoTitle: "Growth Engineer IA & automatisation à Paris | Jonas Suhard",
  headline: "Growth Engineer junior · IA appliquée & automatisation",
  roleAliases: ["Product Builder IA", "Chef de projet IA junior"] as const,
  careerGoalTitle: "Forward Deployed Engineer",
  careerGoalShort:
    "Je cherche à évoluer vers un rôle de Forward Deployed Engineer.",
  careerGoal:
    "Je cherche à évoluer vers un rôle de Forward Deployed Engineer. Je veux comprendre un besoin concret, construire une première solution avec l'équipe ou le client, la tester, puis la rendre facile à reprendre.",
  description:
    "Growth Engineer junior à Paris : IA appliquée, automatisations, sites Next.js, workflows LLM et dashboards. Projets documentés, preuves, CV et contact.",
  email: "contact@jonassuhard.com",
  github: "https://github.com/Jonassuhard",
  portfolioRepo: "https://github.com/Jonassuhard/portfolio-jonassuhard",
  linkedin: "https://www.linkedin.com/in/jonas-suhard-b73923245/",
  malt: "https://www.malt.fr/profile/jonassuhard?overview",
  location: "Paris, France",
  availability: "1er septembre 2026",
  cvClassic: "/cv.pdf",
  cvStyled: "/cv-portfolio.pdf"
};

export const evidenceLevelMeta: Record<
  EvidenceLevel,
  { label: string; description: string }
> = {
  public: {
    label: "Preuve publique",
    description: "Un lien public permet de contrôler au moins l'élément principal."
  },
  private: {
    label: "Démo privée",
    description: "La preuve existe hors ligne ou contient des données qui ne peuvent pas être publiées."
  },
  "self-declared": {
    label: "À documenter",
    description: "L'élément est conservé comme contexte, sans métrique citée tant que la preuve manque."
  }
};

export function toAnchorId(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Canonical par page. En App Router, `alternates` défini dans une page REMPLACE
// entièrement celui du layout (pas de merge profond) : ce helper réinjecte donc
// les types agent-readable en même temps que le canonical propre à la page.
export const pageAlternates = (path: string) => ({
  canonical: path,
  types: {
    "application/json": "/profile.json",
    "text/markdown": "/profile.md"
  }
});

// Image OG partagée (fichier de convention app/opengraph-image.png, 1200x630).
// À réinjecter à la main : dès qu'une page déclare son propre openGraph, Next
// n'ajoute plus l'image de convention automatiquement.
export const ogImage = "/opengraph-image.png";

// Métadonnées d'une page statique : canonical + types agent-readable, plus un
// bloc OpenGraph/Twitter PROPRE à la page. Sans ça, partager /recruteurs sert la
// carte de la home (le layout ne porte pas d'url, chaque page pose la sienne).
export const pageMeta = (opts: {
  path: string;
  title: string;
  description: string;
  ogTitle?: string;
}): Metadata => {
  const ogTitle = opts.ogTitle ?? `${opts.title} | Jonas Suhard`;
  return {
    title: opts.title,
    description: opts.description,
    alternates: pageAlternates(opts.path),
    openGraph: {
      title: ogTitle,
      description: opts.description,
      url: opts.path,
      type: "website",
      locale: "fr_FR",
      images: [ogImage]
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: opts.description,
      images: [ogImage]
    }
  };
};

export const projects: Project[] = [
  {
    slug: "job-radar",
    title: "Job Radar - savoir quelles offres méritent mon temps",
    shortTitle: "Job Radar",
    type: "Radar d'offres déployé + édition open source",
    period: "Juillet - septembre 2026",
    role: "Conception produit, architecture, développement full-stack, déploiement cloud, sécurité et QA",
    status: "Version personnelle déployée · Community v0.1.0-beta.1 publique",
    evidenceLevel: "public",
    tier: 1,
    image: "/assets/cards/job-radar-20260909-art.webp",
    heroImage: {
      "src": "/assets/proof/job-radar/offer-detail-20260908.webp",
      "caption": "Radar local : liste et détail d'une offre, raisons de la note et préparation du dossier. Données fictives.",
      "width": 1440,
      "height": 960
    },
    architectureImage: {
      src: "/assets/proof/job-radar/architecture-v2-20260831.webp",
      caption: "Architecture actuelle : la version personnelle relie Vercel, les jobs et l'API Cloud Run, Turso et Google Drive ; l'édition Community reste locale.",
      width: 1440,
      height: 900
    },
    architectureTitle: "Deux versions, un même principe : expliquer chaque décision.",
    architectureLead:
      "La version personnelle tourne dans le cloud. L'édition Community reste locale et utilise un corpus fictif. Les deux gardent la décision finale côté humain.",
    fullColorMedia: true,
    cardStatus: "Version personnelle déployée · Community publique",
    repoStatus: "Version personnelle privée · édition Community publique MIT : github.com/Jonassuhard/job-radar-community",
    liveLabel: "Repo Community et preuve v0.1.0-beta.1",
    evidenceNote:
      "La version personnelle déployée a été contrôlée en privé le 25 août 2026. L'édition Community v0.1.0-beta.1 apporte une preuve publique séparée : 336 tests backend, 36 frontend et 37 E2E sans échec ; 8 E2E sont ignorés intentionnellement.",
    metaDescription:
      "Job Radar rassemble les offres, retire les doublons et explique lesquelles méritent une action. Version personnelle déployée et édition Community publique.",
    cardLine:
      "Un poste de contrôle qui rassemble les offres, explique leur pertinence et indique la prochaine action.",
    need: {
      title: "Chercher des offres prenait trop de temps.",
      lead:
        "Les annonces arrivent par plusieurs sources, avec des doublons, des dates différentes et des intitulés parfois trompeurs. Il fallait les comparer sans relire chaque page depuis le début.",
      items: [
        "Réunir les offres autorisées dans un même endroit sans perdre leur source.",
        "Voir rapidement le métier réel, le niveau attendu et les compétences demandées.",
        "Savoir pourquoi une offre remonte, ce qui manque et quelle action faire ensuite."
      ]
    },
    intention: {
      title: "Classer les offres et expliquer chaque décision.",
      lead:
        "Job Radar transforme le texte des annonces en faits comparables. La note reste déterministe et chaque résultat montre ses preuves, ses limites et sa fraîcheur.",
      items: [
        "Séparer pertinence, confiance dans les données et fraîcheur de l'offre.",
        "Montrer les extraits qui justifient la note et le niveau réel du poste.",
        "Faire remonter une courte file d'actions plutôt qu'un tableau infini.",
        "Garder une validation humaine avant la préparation et l'envoi d'une candidature."
      ]
    },
    architecture: [
      "L'interface React personnelle est servie par Vercel et appelle une API FastAPI sur Cloud Run.",
      "Des jobs Cloud Run collectent uniquement les sources autorisées, normalisent les annonces et retirent les doublons.",
      "Turso conserve les offres et leurs états ; Google Drive conserve les documents et sauvegardes prévus par le parcours privé.",
      "Le scoring reste déterministe : métier, compétences, preuves, séniorité et contraintes sont expliqués séparément.",
      "L'édition Community utilise le même principe avec un corpus fictif, FastAPI, React et SQLite sur la machine."
    ],
    versions: [
      {
        label: "Version personnelle",
        name: "Signal Desk déployé",
        status: "Déployée en privé",
        summary:
          "Elle collecte les sources autorisées, classe les offres, explique le métier réel et organise les prochaines actions. Le frontend, l'API et les tâches planifiées sont déployés.",
        evidence: [
          "Frontend Vercel et huit routes contrôlés en HTTP 200 le 25 août 2026.",
          "Dernière exécution de production vérifiée avec huit sources en état OK et intégrité de la base confirmée.",
          "QA privée sur cinq largeurs, navigation clavier et contrôles Axe."
        ],
        limits: [
          "L'application et ses données restent privées ; aucune démo publique connectée à la base réelle n'est proposée.",
          "Application Assist est validé localement mais pas activé en production."
        ]
      },
      {
        label: "Édition Community",
        name: "v0.1.0-beta.1",
        publicStatus: "Beta publique open source",
        status: "Publique sur GitHub sous licence MIT",
        summary:
          "Cette édition partage le noyau du Radar sans profil, CV, candidatures ni données privées. Elle fonctionne localement avec 42 offres fictives et un import JSON contrôlé.",
        evidence: [
          "336 tests backend, 36 tests frontend et 37 tests E2E sans échec.",
          "20 combinaisons route et viewport sans violation Axe ni débordement.",
          "Dépôt, historique nettoyé, archive et distributions audités dans la preuve publique."
        ],
        limits: [
          "La beta Community est plus petite que la version personnelle et ne contient pas son infrastructure cloud.",
          "Elle ne prouve ni adoption externe ni résultat de recherche d'emploi."
        ]
      }
    ],
    versionsTitle: "Deux versions, deux niveaux de preuve.",
    notMeasured: [
      "Gain de temps moyen et effet sur les réponses obtenues : pas encore mesurés sur un échantillon suffisant.",
      "Adoption externe de l'édition Community : pas encore mesurée."
    ],
    proofLine:
      "La version personnelle est déployée et vérifiée en privé ; l'édition Community apporte une preuve publique avec 409 tests réussis et 20 contrôles route/viewport.",
    summary:
      "La version personnelle de Job Radar rassemble les offres, retire les doublons et explique lesquelles méritent une action. Une édition Community plus petite publie le noyau avec des données fictives.",
    stack: ["Python", "FastAPI", "React", "Turso", "Cloud Run", "Vercel", "Playwright"],
    recruiterProof: [
      "Transformer un besoin personnel en produit complet, déployé et utilisé dans un vrai workflow.",
      "Relier collecte, données, scoring explicable, interface et opérations cloud.",
      "Extraire une édition open source sans publier le profil, les candidatures ni l'historique privé."
    ],
    constraints: [
      "Ne collecter automatiquement que les sources et APIs qui l'autorisent.",
      "Garder le profil, les documents et les candidatures hors du dépôt public.",
      "Ne jamais laisser un score ou un agent envoyer une candidature à la place de l'utilisateur.",
      "Conserver un chemin local et reproductible pour l'édition Community."
    ],
    decisions: [
      {
        decision: "Score déterministe et preuves visibles",
        why: "Chaque note peut être reliée à une règle et à un extrait de l'annonce.",
        rejected: "Un classement LLM opaque impossible à reproduire."
      },
      {
        decision: "Pertinence, confiance et fraîcheur séparées",
        why: "Une bonne offre peut être ancienne ou mal documentée ; un seul score cacherait cette différence.",
        rejected: "Une note globale sans explication."
      },
      {
        decision: "Version privée et édition Community séparées",
        why: "Le produit personnel garde ses données et son infrastructure ; le public reçoit uniquement le noyau partageable.",
        rejected: "Nettoyer à la main une copie du dépôt privé avec un risque de fuite."
      },
      {
        decision: "Validation humaine avant toute action externe",
        why: "Le produit prépare et explique ; l'utilisateur garde le contrôle du dossier et du dernier geste.",
        rejected: "Une auto-candidature autonome."
      }
    ],
    delivered: [
      "Une interface de travail avec Aujourd'hui, Radar, Candidatures, Entreprises, Insights et Système.",
      "Un pipeline multi-source autorisé, avec normalisation, déduplication, fraîcheur et provenance.",
      "Un scoring V3 qui explique le métier réel, le niveau attendu, les compétences et les preuves manquantes.",
      "Depuis septembre 2026, des contrôles locaux du CV et des preuves manquantes dans la fiche offre et les documents, sans modifier le score ni déclencher un envoi.",
      "Une infrastructure privée Vercel, Cloud Run, Turso et Google Drive avec tâches planifiées.",
      "Une édition Community MIT, installable localement avec corpus fictif et preuve de release."
    ],
    results: [
      "Version personnelle contrôlée en production le 25 août 2026 : huit sources en état OK, base intègre et huit routes frontend en HTTP 200.",
      "Interface personnelle vérifiée en privé sur cinq largeurs, au clavier et avec Axe.",
      "Édition Community v0.1.0-beta.1 : 336 tests backend, 36 frontend et 37 E2E sans échec ; 8 E2E ignorés intentionnellement.",
      "Édition Community : 20 combinaisons route/viewport sans violation Axe ni débordement."
    ],
    limits: [
      "Aucun envoi autonome : la préparation et l'envoi final restent sous validation humaine.",
      "Application Assist est testé localement mais n'est pas activé en production.",
      "LinkedIn, Indeed et Welcome to the Jungle restent des imports manuels ; Job Radar ne les scrape pas automatiquement.",
      "La version personnelle et sa base ne sont pas publiques ; les captures du portfolio utilisent uniquement des données fictives.",
      "La preuve Community est datée et ne prouve ni adoption externe ni résultat de recherche d'emploi."
    ],
    gallery: [
      {
        "src": "/assets/proof/job-radar/radar-20260908.webp",
        "caption": "Radar : quatre offres retenues à partir d'une base de démonstration. Entreprises et données fictives.",
        "width": 1440,
        "height": 960
      },
      {
        "src": "/assets/proof/job-radar/insights-20260908.webp",
        "caption": "Insights : volumes, décisions et compétences. L'interface signale que l'échantillon est insuffisant pour une tendance. Données fictives.",
        "width": 1440,
        "height": 960
      },
      {
        "src": "/assets/proof/job-radar/radar-mobile-20260908.webp",
        "caption": "Détail d'une offre sur mobile, avec les mêmes raisons de classement. Données fictives.",
        "width": 390,
        "height": 844
      }
    ],
    links: [
      {
        label: "Repo GitHub",
        href: "https://github.com/Jonassuhard/job-radar-community",
        external: true
      },
      {
        label: "Configurer son radar",
        href: "https://github.com/Jonassuhard/job-radar-community/blob/main/docs/CONFIGURATION.md",
        external: true
      },
      {
        label: "Architecture publique",
        href: "https://github.com/Jonassuhard/job-radar-community/blob/main/docs/ARCHITECTURE.md",
        external: true
      },
      {
        label: "Preuve v0.1.0-beta.1",
        href: "https://github.com/Jonassuhard/job-radar-community/blob/main/docs/verification/v0.1.0-beta.1.json",
        external: true
      },
      { label: "Version Markdown", href: "/projects/job-radar.md" }
    ]
  },
  {
    slug: "les-petites-griffes",
    title: "Les Petites Griffes - site live, CMS et assistant IA",
    shortTitle: "Les Petites Griffes",
    type: "Site live + CMS + assistant IA",
    period: "Avril 2026 - Juin 2026",
    role: "Stratégie, design, développement, SEO, déploiement, QA",
    status: "Prod live",
    evidenceLevel: "private",
    tier: 1,
    image: "/assets/cards/les-petites-griffes-art.webp",
    fullColorMedia: true,
    video: "/assets/video/les-petites-griffes.mp4",
    repoStatus: "Privé, code et données client",
    liveLabel: "Site public",
    evidenceNote:
      "Captures anonymisées, démo privée et audit live daté du 2026-08-01. L'audit complet reste une preuve privée montrable en entretien, pas une source publique autonome.",
    metaDescription:
      "Site vitrine live d'un studio de nail art : Next.js, CMS maison, assistant IA cadré et audit live du 2026-08-01 sur 18 pages publiques.",
    cardLine:
      "Site live, CMS maison, SEO local et assistant IA cadré. Audit du 2026-08-01 : 18 pages publiques, 36 captures et cinq scores Lighthouse mobile.",
    architecture: [
      "Front Next.js (React) rendu et déployé sur Vercel.",
      "Contenus dynamiques (galerie, prestations, tarifs, FAQ) servis depuis Supabase, éditables via un CMS maison protégé.",
      "Authentification du back-office via Clerk.",
      "Assistant IA cadré par une base de connaissance avec garde-fous (prix, disponibilités, adresse).",
      "SEO local : JSON-LD, sitemap et contenus structurants."
    ],
    v2: [
      "Instrumenter les demandes entrantes pour mesurer la conversion.",
      "Itérer l'assistant à partir des vraies questions clientes."
    ],
    notMeasured: [
      "Impact business (CA, demandes générées) : non mesuré à ce stade.",
      "Taux d'usage de l'assistant côté visiteurs : non instrumenté."
    ],
    proofLine:
      "L'audit live du 2026-08-01 couvre 18 pages publiques contrôlées à 390 px et 1440 px, 36 captures pleine page, 30 images uniques chargées sur le live et cinq scores de performance Lighthouse mobile : Accueil 91, Galerie 87, Compose 97, Méthode 97, Le studio 66.",
    summary:
      "Site vitrine d'un studio de nail art : front Next.js, un CMS maison pour que la gérante édite seule sa galerie, ses tarifs et sa FAQ, et un assistant IA cadré sur ses prix et ses disponibilités.",
    stack: ["Next.js", "React", "Supabase", "Clerk", "Vercel", "LLM"],
    recruiterProof: [
      "Livraison d'un site public réel avec domaine et contraintes de production.",
      "Connexion entre SEO local, UX de conversion, CMS et assistant IA.",
      "Gestion d'incidents sur le domaine .fr, les données DB, les prix, la galerie et l'harmonisation du contenu."
    ],
    constraints: [
      "Contraintes de budget d'une TPE et besoin d'autonomie côté cliente.",
      "Données privées à ne pas exposer.",
      "Contenus variables servis par base de données, pas seulement par le code."
    ],
    decisions: [
      {
        decision: "Next.js + Vercel",
        why: "Performance, contrôle du rendu, déploiement rapide.",
        rejected: "WordPress trop lourd pour ce besoin précis."
      },
      {
        decision: "CMS maison",
        why: "La cliente peut modifier galerie, tarifs, FAQ et contenus sans toucher au code.",
        rejected: "CMS externe plus lent à cadrer et plus cher à maintenir."
      },
      {
        decision: "Assistant IA cadré",
        why: "Aider les clientes à formuler leur demande sans promettre une automation magique.",
        rejected: "Chatbot libre, trop risqué pour prix, disponibilités et adresse."
      }
    ],
    delivered: [
      "Site public responsive.",
      "CMS admin protégé.",
      "Galerie, prestations, tarifs, FAQ et parcours Compose ta pose.",
      "Assistant IA avec base de connaissance et garde-fous.",
      "SEO local, JSON-LD, sitemap et contenus structurants."
    ],
    results: [
      "L'audit live du 2026-08-01 couvre 18 pages publiques contrôlées à 390 px et 1440 px, 36 captures pleine page, 30 images uniques chargées sur le live et cinq scores de performance Lighthouse mobile : Accueil 91, Galerie 87, Compose 97, Méthode 97, Le studio 66.",
      "Site et back-office livrés pour permettre à la gérante de mettre ses contenus à jour."
    ],
    limits: [
      "Projet familial non facturé ; aucune vente à un client externe n'est prouvée ; mesures datées du 2026-08-01, non continues."
    ],
    gallery: [
      { src: "/assets/proof/les-petites-griffes/lpg-home.webp", caption: "Home du studio de nail art, front Next.js déployé sur Vercel.", width: 1400, height: 798 },
      { src: "/assets/proof/les-petites-griffes/lpg-compose.webp", caption: "« Compose ta pose » : devis guidé qui cadre la demande de la cliente.", width: 1400, height: 810 },
      { src: "/assets/proof/les-petites-griffes/lpg-assistant.webp", caption: "Assistant IA cadré sur les prix, la durée, la méthode et le style, avec garde-fous et sans promesse magique.", width: 816, height: 1142 },
      { src: "/assets/proof/les-petites-griffes/lpg-assistant-vision.webp", caption: "L'assistant analyse une photo d'ongles envoyée par la cliente.", width: 810, height: 1114 }
    ],
    links: [
      { label: "Version Markdown", href: "/projects/les-petites-griffes.md" },
      {
        label: "Site live",
        href: "https://lespetitesgriffes.fr/",
        external: true
      }
    ]
  },
  {
    slug: "educool-la-herse",
    title: "Cool Bank - donner vie à une banque de classe",
    shortTitle: "Cool Bank / La Herse",
    type: "Jeu scolaire 3D + outil enseignant",
    period: "Juillet - août 2026",
    role: "Conception produit, UX, développement full-stack, systèmes de jeu, sécurité, QA",
    status: "V2 jouable localement sur un appareil · V3 en recette humaine",
    evidenceLevel: "private",
    tier: 1,
    image: "/assets/cards/cool-bank-art.webp",
    heroImage: {
      "src": "/assets/proof/educool/v2-village-20260817.webp",
      "caption": "Cool Bank V2 : le bourg 3D dans la boucle locale. Capture de contrôle du 17 août 2026, conservée comme archive de cette version.",
      "width": 1440,
      "height": 900
    },
    fullColorMedia: true,
    cardStatus: "Prototype local · trois rôles · données fictives",
    repoStatus: "Dépôts privés, données scolaires exclues des preuves",
    liveLabel: "Démo locale sur données fictives",
    evidenceNote:
      "Preuves privées et datées : état V2 vérifié le 22/08/2026 ; parcours visuels V3 rejoués le 26/08/2026. Les captures publiées sont des écrans de démonstration sans donnée de mineur.",
    metaDescription:
      "Cool Bank transforme une banque de classe en monde 3D partagé : élève, banquier et enseignante y vivent trois responsabilités différentes.",
    cardLine:
      "Un jeu scolaire local où les responsabilités de classe deviennent des rôles, des choix et des aventures dans un monde 3D partagé.",
    story: {
      "purposeTitle": "Rendre l'argent et la responsabilité plus concrets.",
      "purposeLead": "La banque existait déjà dans la classe. Le projet lui donne des lieux, des personnages et des conséquences visibles, sans transformer l'outil de l'enseignante en jeu.",
      "purpose": [
        "Les élèves explorent le bourg, accomplissent des missions, économisent et font évoluer progressivement leur maison.",
        "Un élève peut tenir le guichet pendant une période donnée, avec des plafonds clairs et un registre vérifiable.",
        "L'enseignante conserve les commandes essentielles et peut interrompre le monde ou les échanges sans perdre son espace de travail calme."
      ],
      "roles": [
        {
          "title": "L'élève",
          "text": "Il explore le bourg, parle aux habitants, accomplit des missions, économise et choisit comment utiliser ses centicools."
        },
        {
          "title": "Le banquier",
          "text": "C'est un élève responsabilisé. Il tient un guichet guidé, applique des plafonds et laisse une trace de chaque opération."
        },
        {
          "title": "L'enseignante",
          "text": "Elle suit la classe, garde le contrôle du monde et valide les progressions depuis une interface séparée du jeu."
        }
      ],
      "galleryGroups": [
        {
          "kicker": "Reconstruction V3",
          "title": "V3 — la reconstruction locale",
          "description": "Nouvelles vues du build local du 7 septembre 2026, capturées le 8 septembre en mode de prévisualisation de carte. Le code source a encore évolué depuis ce build. Aucun usage en classe ni test humain n'est déduit de ces images.",
          "featuredFirst": true,
          "images": [
            {
              "src": "/assets/proof/educool/v3-map-city-20260908.webp",
              "caption": "V3 : vue du bourg dans le mode de prévisualisation de la carte. Build local du 7 septembre, capture du 8 septembre ; ce n'est pas une session élève.",
              "width": 1440,
              "height": 900
            },
            {
              "src": "/assets/proof/educool/v3-map-castle-20260908.webp",
              "caption": "V3 : vue du château dans le même build local, avec la caméra de contrôle de la carte.",
              "width": 1440,
              "height": 900
            },
            {
              "src": "/assets/proof/educool/v3-map-island-20260908.webp",
              "caption": "V3 : vue d'ensemble du terrain pour situer les zones. Prévisualisation technique, pas validation humaine du jeu.",
              "width": 1440,
              "height": 900
            }
          ]
        },
        {
          "kicker": "Version jouable",
          "title": "V2 — la boucle 3D déjà jouable",
          "description": "Vues différentes issues des preuves locales d'août 2026 : bourg 3D, organisation du monde et intérieur de maison. Ce sont des archives de la V2, pas une nouvelle recette complète.",
          "images": [
            {
              "src": "/assets/proof/educool/v2-village-20260817.webp",
              "caption": "V2 : la place du village et les chemins, capture de contrôle locale du 17 août 2026.",
              "width": 1440,
              "height": 900
            },
            {
              "src": "/assets/proof/educool/v2-world-20260817.webp",
              "caption": "V2 : vue d'ensemble du monde 3D et du HUD, archive locale du 17 août 2026.",
              "width": 1440,
              "height": 900
            },
            {
              "src": "/assets/proof/educool/v2-house-20260822.webp",
              "caption": "V2 : intérieur de maison en 3D dans le scénario de test du 22 août 2026. Aucune donnée d'élève réelle.",
              "width": 910,
              "height": 522
            }
          ]
        }
      ]
    },
    architecture: [
      "V2 sépare le jeu web multijoueur, le runtime 3D et l'interface scolaire Educool, tout en partageant les contrats Firebase.",
      "V3 sépare quatre autorités : Game, Control, Product/UI Kit et Educool, réunies par une pile locale reproductible.",
      "Économie centicool, mouvements, collisions, rôles, soldes et récompenses restent autoritaires côté serveur.",
      "Authentification et données scolaires utilisent Firebase / Firestore / Cloud Functions sur un projet fictif local.",
      "Les preuves de test, manifestes de release et limites sont conservés séparément pour empêcher toute confusion entre V2 et V3."
    ],
    versions: [
      {
        label: "V2",
        name: "Boucle 3D locale déjà jouable",
        publicStatus: "Jouable localement sur un appareil",
        status: "Jouable localement · LOCAL_SINGLE_DEVICE_READY : GO · V2_PRODUCT_COMPLETE et ONLINE_READY : NO-GO",
        summary:
          "La V2 relie déjà un monde 3D à architecture multijoueur, les trois rôles et Educool. La boucle a été validée localement sur un appareil avec des profils de démonstration.",
        evidence: [
          "État daté du 22/08/2026 avec parcours élève, professeure et banquier rejoués localement.",
          "HUD, clavier, première mission, guichet et pont Educool contrôlés sur des profils fictifs.",
          "Le monde 3D vient déjà du fork World of ClaudeCraft ; la V3 n'est pas le passage de la 2D à la 3D."
        ],
        limits: [
          "Deux PC et une tablette physique, coupure Wi-Fi et audio multi-appareils restent à rejouer ensemble.",
          "Le pré-RC reste bloqué par 3 échecs i18n, 20 assets provisoires et une gate online à 87/89."
        ]
      },
      {
        label: "V3",
        name: "Reconstruction séparée plus large",
        publicStatus: "Prototype local prêt pour des tests humains",
        status:
          "READY_FOR_HUMAN_RECIPE (dernier verdict documenté) · gate complète actuelle à rejouer · aucun pilote revendiqué",
        summary:
          "La V3 est une reconstruction séparée, avec une carte, une architecture et un périmètre plus larges. Ses parcours locaux fonctionnent, mais elle doit encore être comprise, éprouvée et jugée par des humains.",
        evidence: [
          "Recette visuelle du 26/08/2026 : trois rôles entrés dans le monde, mouvements réels et 396 placements chargés.",
          "Dialogues, guichet banquier et télécommande professeure rejoués localement sans requête externe.",
          "Les compteurs de tests exacts et les anciennes candidates restent hors de l'accroche tant que la gate complète actuelle n'est pas rejouée."
        ],
        limits: [
          "Validation de la direction artistique, test sur appareil enfant modeste et observation de la compréhension par un enfant encore requis.",
          "Aucun déploiement, aucune donnée réelle d'enfant et aucun verdict d'usage terrain ne sont revendiqués."
        ]
      }
    ],
    notMeasured: [
      "Compréhension, plaisir et autonomie des enfants : recette terrain non publiée.",
      "Gain de temps pour l'enseignante : non chiffré publiquement."
    ],
    proofLine:
      "La V2 permet déjà de vivre la boucle 3D sur un appareil. La V3 élargit le projet, mais aucune efficacité pédagogique ni utilisation en classe n'est encore revendiquée.",
    summary:
      "Une banque de classe transformée en petit monde vivant : les élèves explorent, économisent et tiennent des rôles, pendant que l'enseignante garde un outil de pilotage séparé.",
    stack: ["Three.js", "Next.js", "Firebase", "Firestore", "Cloud Functions", "TypeScript", "Vite", "Node.js", "Playwright"],
    recruiterProof: [
      "Partir d'un besoin réel de classe, construire une expérience testable, puis séparer clairement ce qui fonctionne de ce qui reste à valider.",
      "Relier le jeu, les trois rôles, Firebase, la sécurité et les tests.",
      "Dire clairement ce qui fonctionne et ce qui reste bloqué avant un pilote."
    ],
    constraints: [
      "Aucune donnée réelle de mineur dans les preuves, captures ou environnements de démonstration.",
      "Trois rôles distincts : élève, professeure et banquier, sans classement financier humiliant.",
      "Usage clavier, tactile et tablette, y compris sur matériel modeste.",
      "V2 et V3 physiquement et techniquement séparées : aucune preuve recyclée d'une version à l'autre."
    ],
    decisions: [
      {
        decision: "Deux versions conservées comme autorités séparées",
        why: "V2 est une base locale jouable ; V3 change l'architecture, la carte et le niveau de validation.",
        rejected: "Présenter V3 comme une simple mise à jour visuelle de V2."
      },
      {
        decision: "Autorité serveur pour l'économie et les actions sensibles",
        why: "Les soldes, récompenses, mouvements et rôles ne doivent pas dépendre d'un client modifiable.",
        rejected: "Faire confiance au navigateur pour valider les transactions."
      },
      {
        decision: "Fixtures exclusivement fictives dans les preuves",
        why: "Le contexte scolaire implique des mineurs et interdit toute démonstration publique sur données réelles.",
        rejected: "Publier des captures de classe pour rendre la preuve plus spectaculaire."
      }
    ],
    delivered: [
      "V2 : prototype local à architecture multijoueur, validé sur un appareil avec trois rôles, quêtes, maisons, mini-jeux et pont Educool/Firebase.",
      "V3 : monde 3D, économie centicool serveur, 22 zones, marchands, PNJ et maisons complètes.",
      "Interface Educool : authentification, rôles, règles Firestore, Cloud Functions et suivi scolaire.",
      "Harnais de tests, preuves responsive, manifestes de candidate et scripts de démarrage/arrêt locaux."
    ],
    results: [
      "La boucle V2 se joue localement sur un appareil avec les trois rôles et des données fictives.",
      "Les parcours visuels V3 élève, banquier et professeure ont été rejoués localement le 26/08/2026.",
      "Les deux versions gardent des preuves séparées ; aucune utilisation réelle en classe n'est inventée."
    ],
    limits: [
      "Preuve privée : code, captures complètes et données de contexte se montrent uniquement sur fixtures anonymisées.",
      "V2 n'est pas prête pour Internet ; V3 n'est pas validée comme pilote local auprès d'enfants.",
      "Les volumes de tests prouvent le comportement technique, pas l'utilité pédagogique ni l'adoption."
    ],
    links: [
      { label: "Version Markdown", href: "/projects/educool-la-herse.md" }
    ]
  },
  {
    slug: "capselys",
    title: "Capsélys - refonte conversion et expérimentation IA",
    shortTitle: "Capsélys",
    type: "Conversion + expérimentation IA",
    period: "Juin 2026 - Juillet 2026",
    role: "Stratégie, audit, UX, contenus, expérimentation IA, présentation client",
    status: "Staging / workshop MBA",
    evidenceLevel: "private",
    tier: 1,
    image: "/assets/cards/capselys-art.webp",
    fullColorMedia: true,
    repoStatus: "Privé, projet client",
    liveLabel: "Production actuelle, hors staging",
    evidenceNote:
      "Trois vues différentes de l'archive de staging retrouvée localement : navigation, formulaire et en-tête. La date de capture d'origine n'est pas certifiée ; ce n'est pas l'état du site public actuel.",
    metaDescription:
      "Refonte de conversion (WordPress / Divi) sur staging sécurisé : nouveau parcours d'adhésion, audits Playwright multi-viewports, prototype d'assistant IA.",
    cardLine:
      "Refonte de conversion en staging : audit UX, parcours d'adhésion et prototype d'assistant IA.",
    architecture: [
      "WordPress + Divi imposés ; refonte sur un environnement de staging sécurisé.",
      "Audits de rendu multi-viewports via Playwright (le DOM Divi ne suffit pas à prouver le visuel).",
      "Déploiement séquentiel sur staging pour ne pas casser la prod client.",
      "Prototype d'assistant IA qualifiant orientant vers le bon service.",
      "Frontière nette entre le contenu éditable dans Divi (textes, images, modules) et les composants système gardés en code (assistant IA, popup d'adhésion, SEO, sécurité, formulaires)."
    ],
    v2: [
      "Passage en production après validation client.",
      "Mesure des retombées conversion une fois en ligne."
    ],
    notMeasured: [
      "Retombées business (conversion, adhésions) non mesurées, c'est un staging, pas une prod utilisée.",
      "Les gains attendus restent des hypothèses à valider après déploiement."
    ],
    proofLine:
      "Refonte orientée conversion, staging WordPress sécurisé, présentation orale client et audits multi-viewports.",
    summary:
      "J'ai revu sur un staging le parcours d'adhésion d'un site WordPress. J'ai aussi testé le rendu sur plusieurs écrans et construit un assistant qui oriente vers le bon service.",
    stack: ["WordPress", "Divi", "Playwright", "PHP", "PDF", "LLM workflows"],
    recruiterProof: [
      "Cadrage client et conversion, pas seulement exécution front.",
      "Capacité à travailler avec une stack existante imposée.",
      "Sait arbitrer entre un builder et du code selon qui maintiendra le site, pas par dogme.",
      "Présentation honnête du staging, des mesures lab, des limites et du plan d'action."
    ],
    constraints: [
      "Staging, pas prod finale.",
      "Client présent à l'oral MBA.",
      "WordPress et Divi imposés, avec un risque de régression visuelle."
    ],
    decisions: [
      {
        decision: "Déploiement séquentiel sur staging",
        why: "Valider sans casser la prod client.",
        rejected: "Push prod direct."
      },
      {
        decision: "Audits Playwright multi-viewport",
        why: "Le DOM Divi ne suffit pas à prouver le rendu.",
        rejected: "Validation visuelle ponctuelle."
      },
      {
        decision: "Assistant IA qualifiant",
        why: "Orienter vers le bon service et contact humain.",
        rejected: "Chatbot gadget sans cadre métier."
      },
      {
        decision: "Contenu éditable dans Divi, système en code",
        why: "La gérante modifie ses textes et ses images sans risquer de casser la sécurité, le SEO, les formulaires ou l'assistant IA.",
        rejected: "Promettre du 100 % Divi, fragile et faux."
      },
      {
        decision: "Rester sur Divi 4 pour la partie éditable",
        why: "J'ai testé Divi 5, l'édition visuelle et les interactions cassaient une fois le contenu en place.",
        rejected: "Migrer le site sur Divi 5."
      }
    ],
    delivered: [
      "Staging visuel retravaillé.",
      "Pages service et adhésion mieux structurées.",
      "Présentation orale client (14 slides).",
      "Audits visuels et rapports.",
      "Prototype d'assistant / tunnel."
    ],
    results: [
      "Support oral MBA prêt avec garde-fous client.",
      "Refonte staging auditée sur plusieurs tailles.",
      "Frontière éditable/code documentée pour la cliente. Sur ce type de site, un CMS léger sur mesure évite souvent les limites d'un builder lourd.",
      "Mesures business réelles à qualifier après déploiement."
    ],
    limits: [
      "Environnement de staging, non déployé en production : les effets conversion restent à mesurer une fois en ligne.",
      "Retombées business non disponibles à court terme.",
      "Certaines décisions dépendent de la validation du client."
    ],
    gallery: [
      {
        "src": "/assets/proof/capselys/navigation-archive-20260908.webp",
        "caption": "Archive du staging : accès aux services depuis la navigation. Ce visuel ne représente pas le site public actuel.",
        "width": 1440,
        "height": 900
      },
      {
        "src": "/assets/proof/capselys/adhesion-archive-20260908.webp",
        "caption": "Archive du staging : formulaire d'adhésion ouvert, sans donnée renseignée.",
        "width": 1440,
        "height": 900
      },
      {
        "src": "/assets/proof/capselys/header-archive-20260908.webp",
        "caption": "Archive du staging : l'en-tête reste accessible pendant le défilement.",
        "width": 1440,
        "height": 900
      }
    ],
    links: [
      { label: "Version Markdown", href: "/projects/capselys.md" },
      {
        label: "Production actuelle, hors staging",
        href: "https://www.capselys.fr/",
        external: true
      }
    ]
  },
  {
    slug: "iscom",
    title: "ISCOM - SEO, Drupal et production éditoriale",
    shortTitle: "ISCOM",
    type: "SEO + Drupal + production éditoriale",
    period: "2026",
    role: "SEO, fact-check, contenu, audits, CMS, process qualité",
    status: "Alternance / client interne",
    evidenceLevel: "public",
    tier: 1,
    image: "/assets/cards/iscom-art.webp",
    fullColorMedia: true,
    repoStatus: "CMS employeur, non publiable",
    liveLabel: "Actu publiée (lien)",
    evidenceNote:
      "Captures fraîches d'un article public. Elles prouvent sa publication et sa mise en page, pas l'exactitude de chacune de ses affirmations ni un gain de trafic.",
    metaDescription:
      "Production SEO dans Drupal : rédaction, recherche de sources, audits Semrush et validation éditoriale avant publication.",
    architecture: [
      "Production éditoriale SEO saisie dans Drupal (CMS sensible).",
      "Audits de cannibalisation et inter-marques via Semrush.",
      "Automatisations Playwright pour la saisie et les contrôles.",
      "Checklist de pré-publication et vérification de chaque information avant mise en ligne."
    ],
    v2: [
      "Étendre les garde-fous qualité à d'autres types de contenus."
    ],
    notMeasured: [
      "Impact trafic SEO des contenus : suivi côté employeur, non publiable ici."
    ],
    proofLine:
      "Des contenus publiés dans Drupal et un travail d'audit SEO mené dans le processus éditorial de l'employeur.",
    summary:
      "Je prépare des contenus SEO, les saisis dans Drupal et utilise Semrush pour repérer les pages qui se concurrencent. Je confronte les informations aux sources ; l'équipe éditoriale garde la validation finale.",
    stack: ["Drupal", "Playwright", "Semrush", "SEO", "LLM-assisted QA"],
    recruiterProof: [
      "Livrer dans le process de publication d'un employeur sans court-circuiter la validation éditoriale.",
      "Capacité à transformer un audit SEO en décisions nommées.",
      "Discipline sur les actions sensibles, avec validation avant publication."
    ],
    constraints: [
      "Publication CMS sensible.",
      "Faits, chiffres et sources à vérifier.",
      "Validation éditoriale interne avant publication."
    ],
    decisions: [
      {
        decision: "Checklist avant publication",
        why: "Éviter erreurs live et publication irréversible.",
        rejected: "Automatiser le bouton enregistrer."
      },
      {
        decision: "Vérifier chaque information",
        why: "Les contenus IA inventent vite des chiffres plausibles.",
        rejected: "Rédaction IA brute."
      }
    ],
    delivered: [
      "Actus SEO montées dans Drupal.",
      "Audits cannibalisation et inter-marques.",
      "Payloads éditoriaux prêts à coller.",
      "Images et champs médias contrôlés.",
      "Lessons qualité et garde-fous."
    ],
    results: [
      "Actu IA agentique publiée sur iscom.fr.",
      "Audit cannibalisation livré en PDF.",
      "Process de pré-publication durci après erreurs."
    ],
    limits: [
      "Impact trafic mesuré côté employeur, non publiable ici.",
      "Chaque publication passe par une validation humaine ; l'automatisation couvre la saisie et les contrôles.",
      "Certaines preuves sont montrables en entretien, pas en ligne."
    ],
    gallery: [
      {
        "src": "/assets/proof/iscom/public-0-20260908.webp",
        "caption": "Article public : titre et mise en page vérifiés le 8 septembre 2026.",
        "width": 1440,
        "height": 960
      },
      {
        "src": "/assets/proof/iscom/public-750-20260908.webp",
        "caption": "Corps de l'article dans Drupal : introduction et hiérarchie des sections.",
        "width": 1440,
        "height": 960
      },
      {
        "src": "/assets/proof/iscom/public-1500-20260908.webp",
        "caption": "Suite de l'article public : développement et sous-titre. Le trafic et la performance SEO ne sont pas déduits de cette capture.",
        "width": 1440,
        "height": 960
      }
    ],
    links: [
      {
        label: "Article public",
        href: "https://www.iscom.fr/actualites/lia-change-de-role-les-communicants-aussi",
        external: true
      },
      { label: "Version Markdown", href: "/projects/iscom.md" }
    ]
  },
  {
    slug: "preuvia",
    title: "Preuvia - audit de visibilité dans les réponses des IA",
    shortTitle: "Preuvia",
    type: "Produit - audit GEO (visibilité IA)",
    period: "Juin 2026 - en cours",
    role: "Conception produit, méthode d'audit, site, prototypage du livrable",
    status: "Offre en ligne - phase de lancement",
    evidenceLevel: "public",
    tier: 1,
    image: "/assets/cards/preuvia-art.webp",
    fullColorMedia: true,
    repoStatus: "Privé, produit commercial",
    liveLabel: "Site en ligne (preuvia.vercel.app)",
    evidenceNote:
      "Site et détail public de l'offre accessibles en ligne. Les éventuelles missions clients restent hors du périmètre des preuves publiques.",
    metaDescription:
      "Audit GEO productisé : savoir si une marque apparaît dans les réponses des IA, qui ressort à sa place, quoi publier, puis quoi re-tester au prochain audit.",
    architecture: [
      "Site et tunnel de prise de contact en Next.js, déployés et suivis en production.",
      "Protocole d'audit reproductible : un jeu de requêtes testé sur quatre IA principales (ChatGPT, Claude, Perplexity et Gemini), avec Mistral selon le contexte.",
      "Grille de lecture publique : présence, exactitude, fraîcheur et citabilité, notées de 0 à 3 par assistant.",
      "Comparaison des sources citées (concurrents, comparatifs, forums) pour situer la marque.",
      "Livrable PDF structuré : score de visibilité, écarts, contenus et balisage à publier, puis éléments à re-tester au prochain audit."
    ],
    v2: [
      "Industrialiser la collecte multi-modèles.",
      "Suivi mensuel des écarts de citation pour les clients sous abonnement."
    ],
    notMeasured: [
      "Revenus récurrents : trop tôt, offre en phase de lancement.",
      "Effet réel sur les citations IA des clients : mesuré au cas par cas, pas de moyenne publiable."
    ],
    proofLine:
      "Un audit sur quatre IA principales, avec Mistral selon le contexte, qui montre si elles citent une marque, qui apparaît à sa place et quoi publier avant le prochain contrôle.",
    summary:
      "Aider une marque à savoir si elle apparaît dans les réponses des assistants IA, qui ressort à sa place, quoi publier, puis quoi re-tester au prochain audit.",
    stack: ["Next.js", "GEO / AEO", "LLM multi-modèles", "Schema JSON-LD", "PDF"],
    recruiterProof: [
      "Produit pensé de bout en bout : positionnement, offre, site, livraison.",
      "Méthode d'audit rejouable de la visibilité d'une marque dans les réponses des assistants IA.",
      "Protocole, grille de lecture et livrable conçus pour être rejoués et comparés dans le temps."
    ],
    constraints: [
      "Sujet mouvant : les réponses des IA varient selon le modèle, le prompt et le moment.",
      "Promesse honnête imposée : ne jamais garantir l'apparition dans les IA.",
      "Méthode et template d'audit = actif commercial, non publiés."
    ],
    decisions: [
      {
        decision: "Score public sur 4 dimensions",
        why: "Rendre l'audit vérifiable : présence, exactitude, fraîcheur et citabilité peuvent être re-testées au lieu de rester dans un score opaque.",
        rejected: "Score propriétaire impossible à expliquer."
      },
      {
        decision: "Offre productisée plutôt que SaaS",
        why: "Livrer une valeur claire et facturable tout de suite, sans construire une plateforme avant d'avoir des clients.",
        rejected: "Développer un outil de monitoring self-service d'emblée."
      },
      {
        decision: "Promesse explicitement non garantie",
        why: "Question de crédibilité, personne ne contrôle ce que les modèles citent.",
        rejected: "Vendre une garantie d'apparition invérifiable."
      },
      {
        decision: "Sortie = contenus prêts à publier",
        why: "Donner l'action, pas seulement le constat.",
        rejected: "Se limiter à un score de visibilité."
      }
    ],
    delivered: [
      "Site en ligne avec tunnel de prise de contact.",
      "Protocole d'audit multi-modèles reproductible.",
      "Questions test séparant requêtes génériques et requêtes marque.",
      "Livrable PDF avec le score, les sources citées, les écarts et un plan d'action à vérifier lors du prochain audit.",
      "Prototype de mini-audit et modèle de livrable."
    ],
    results: [
      "Offre, site et principes de la méthode présentés publiquement.",
      "Grille de lecture et structure de livrable documentées.",
      "Ce portfolio est lui-même optimisé selon cette méthode (llms.txt, profile.json, données structurées)."
    ],
    limits: [
      "Ne garantit pas l'apparition dans les réponses IA.",
      "Ne force pas les modèles à citer une marque.",
      "Les scores sont datés : ils dépendent du modèle, du prompt et du moment du test.",
      "Ne remplace pas le SEO classique ; il ajoute une couche de visibilité dans les moteurs de réponse."
    ],
    gallery: [
      {
        "src": "/assets/proof/preuvia/public-0-20260908.webp",
        "caption": "Accueil public : la promesse et un exemple de comparaison entre réponses d'IA.",
        "width": 1440,
        "height": 960
      },
      {
        "src": "/assets/proof/preuvia/public-750-20260908.webp",
        "caption": "Le site explique ce que l'audit observe et les étapes de la prestation.",
        "width": 1440,
        "height": 960
      },
      {
        "src": "/assets/proof/preuvia/public-1500-20260908.webp",
        "caption": "Exemple de matrice de citations sur la page publique. C'est une démonstration du livrable, pas un résultat client.",
        "width": 1440,
        "height": 960
      }
    ],
    links: [
      { label: "Site live", href: "https://preuvia.vercel.app", external: true },
      { label: "Version Markdown", href: "/projects/preuvia.md" }
    ]
  },
  {
    slug: "cortex-bridge",
    title: "Cortex Bridge - ChatGPT comme cerveau d'un agent de code local",
    shortTitle: "Cortex Bridge",
    type: "Agent de code local open source piloté par ChatGPT",
    period: "Juillet - août 2026 · tag v0.5.3",
    role: "Conception produit, architecture, extension MV3, backend FastAPI, sécurité, QA",
    status: "Preview technique open source · tag public v0.5.3",
    evidenceLevel: "public",
    tier: 1,
    image: "/assets/cards/cortex-bridge-art.webp",
    fullColorMedia: true,
    repoStatus: "Repo public sous MIT : github.com/Jonassuhard/cortex-bridge",
    liveLabel: "Repo GitHub (lien)",
    evidenceNote:
      "Code public sous licence MIT. La preuve du tag v0.5.3 datée du 26/08/2026 rapporte 629 tests backend, 155 frontend, 126 extension, 12 E2E et 4 accessibilité sans échec ; 1 test E2E est ignoré.",
    metaDescription:
      "Cortex Bridge utilise ChatGPT comme cerveau d'un agent de code local open source : vous validez, puis il exécute dans le dossier choisi.",
    architecture: [
      "Extension Chrome MV3 : service worker, scripts de contenu, commandes DOM structurées en liste blanche.",
      "Console FastAPI en loopback (port 8420) : appairage WebSocket à token unique, chat, pièces jointes, captures d'onglet, missions.",
      "Interface React et Next.js statique en français : appairage, états d'envoi explicites, navigation sur 50 conversations.",
      "Orchestration SQLite + exécuteur déterministe confiné au workspace ; Ollama optionnel pour les modèles locaux.",
      "Boucle contrôlée : ChatGPT planifie, Cortex extrait la décision, l'exécuteur local agit après validation, puis le rapport revient dans la conversation."
    ],
    v2: [
      "Sonde DOM quotidienne pour détecter une mise à jour de ChatGPT cassant le bridge avant usage.",
      "Transport officiellement supporté par le fournisseur si une option locale compatible devient disponible.",
      "Distribution de l'extension au-delà de l'installation locale manuelle."
    ],
    notMeasured: [
      "Stabilité de la boucle sur plusieurs semaines d'usage réel : pas encore de métrique publiable.",
      "Compatibilité continue avec l'interface ChatGPT : les preuves restent datées et une modification du DOM peut casser le transport."
    ],
    proofLine:
      "ChatGPT réfléchit et prépare le travail. Vous validez. Cortex exécute dans le dossier choisi et garde une trace de chaque étape.",
    summary:
      "Cortex Bridge transforme ChatGPT en cerveau d'un agent de code local open source. ChatGPT analyse et planifie ; vous validez ; Cortex exécute uniquement dans le dossier choisi et garde une trace. Le projet vise l'usage d'un agent de code sans ajouter un second abonnement dédié. Le code et la preuve de release sont publics.",
    stack: ["Chrome MV3", "FastAPI", "Next.js", "React", "SQLite", "Python", "Ollama"],
    recruiterProof: [
      "Construire un produit complet avec une extension, un backend local, une interface et des tests.",
      "Limiter les actions au dossier choisi et bloquer l'exécution en cas de doute.",
      "Publier le code, les preuves de release et les limites du projet."
    ],
    constraints: [
      "Éviter le copier-coller entre la conversation et l'exécution locale sans laisser le modèle agir librement.",
      "Fonctionner dans le vrai profil Chrome de l'utilisateur, avec un exécuteur déterministe disponible sans Ollama.",
      "Lignes rouges assumées : pas d'endpoints privés, pas de cookies de session, pas de contournement de protections ou de limites.",
      "Transport ChatGPT grand public en opt-in explicite, jamais présenté comme affilié, autorisé ou supporté par OpenAI."
    ],
    decisions: [
      {
        decision: "Exécuteur déterministe confiné au workspace",
        why: "L'IA propose, mais seule une action bornée et validée s'exécute ; le système reste utile même sans modèle local disponible.",
        rejected: "Laisser le LLM lancer librement des commandes shell."
      },
      {
        decision: "Bridge DOM en module opt-in explicite",
        why: "Le conflit avec les conditions du fournisseur est réel : l'utilisateur doit comprendre le risque avant d'activer ce transport.",
        rejected: "Activer le bridge par défaut ou le présenter comme officiellement supporté."
      },
      {
        decision: "Transport extension MV3 par défaut",
        why: "Travailler dans le vrai Chrome avec la vraie session, sans environnement parallèle fragile.",
        rejected: "Piloter un navigateur Playwright séparé comme produit principal."
      },
      {
        decision: "Bloquer en cas de doute",
        why: "Une validation mal formée arrête la mission au lieu de l'autoriser : ce comportement est testé.",
        rejected: "Mode permissif avec simples alertes."
      }
    ],
    delivered: [
      "Extension Chrome MV3 (service worker, scripts de contenu, commandes DOM en liste blanche).",
      "Console FastAPI loopback : appairage à token unique, chat, pièces jointes, captures d'onglet, missions.",
      "Interface React et Next.js statique en français avec états d'envoi explicites.",
      "Orchestration SQLite et exécuteur déterministe confiné au workspace, fonctionnel sans Ollama.",
      "Installation macOS contrôlée par plan immuable et diagnostic local reproductible."
    ],
    results: [
      "Preuve du tag v0.5.3 du 26/08/2026 : 629 tests backend, 155 frontend, 126 extension, 12 E2E et 4 accessibilité sans échec ; 1 E2E ignoré.",
      "Dix scénarios à deux conversations exécutés sans croisement ; le brouillon du troisième writer est conservé lors du refus.",
      "Le diagnostic d'arrêt rend visibles les processus actifs et permet de couper immédiatement l'exécution locale."
    ],
    limits: [
      "Les suites automatisées utilisent aussi des fixtures : elles ne prouvent pas une compatibilité continue avec un compte ChatGPT réel.",
      "Le cycle macOS propre de la v0.5.2 n'a pas été rejoué pour la preuve v0.5.3.",
      "Le transport automatique par l'interface ChatGPT entre en conflit avec les conditions du fournisseur : activation opt-in et risque de restriction du compte.",
      "Preview technique macOS/Chrome : extension installée manuellement et dépendance à un DOM externe susceptible de changer."
    ],
    gallery: [
      {
        "src": "/assets/proof/cortex-bridge/workspace-20260908.webp",
        "caption": "Console locale : conversations et dossier de travail, avec les données fictives des tests du dépôt. Ce n'est pas une exécution réelle.",
        "width": 1440,
        "height": 960
      },
      {
        "src": "/assets/proof/cortex-bridge/approval-20260908.webp",
        "caption": "Avant exécution : dossier, durée et permissions à vérifier. Scénario fictif rejoué dans l'interface locale.",
        "width": 1440,
        "height": 960
      },
      {
        "src": "/assets/proof/cortex-bridge/public-0-20260908.webp",
        "caption": "Dépôt GitHub public : code et documentation consultables. La version publiée reste v0.5.3, distincte du travail local.",
        "width": 1440,
        "height": 960
      }
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Jonassuhard/cortex-bridge",
        external: true
      },
      {
        label: "Preuve du tag v0.5.3",
        href: "https://github.com/Jonassuhard/cortex-bridge/blob/v0.5.3/docs/verification/v0.5.3.json",
        external: true
      },
      { label: "Version Markdown", href: "/projects/cortex-bridge.md" }
    ]
  },
  {
    videoWidth: 360,
    videoHeight: 640,
    slug: "battle-engine",
    title: "Battle Engine - pipeline vidéo automatisé",
    shortTitle: "Battle Engine",
    type: "Pipeline vidéo / automation",
    period: "2026",
    role: "Pipeline Python, Godot, rendu, FFmpeg, publication",
    status: "Lab actif · combats publiés sur YouTube",
    evidenceLevel: "private",
    tier: 2,
    image: "/assets/cards/battle-engine-art.webp",
    fullColorMedia: true,
    video: "/assets/video/battle-league-20260908.mp4",
    repoStatus: "Dépôt privé",
    liveLabel: "Lab",
    noindex: true,
    evidenceNote:
      "Combat publié le 31 août 2026, deux autres extraits de combat et deux montages d'archive. Les vidéos sont muettes et démarrent à l'écran, sauf préférence de réduction des animations.",
    architecture: [
      "Pipeline Python orchestrant : rendu Godot → FFmpeg → interpolation RIFE → publication via l'API YouTube."
    ],
    v2: [
      "Cadrer le contenu pour ne pas brouiller le positionnement CDI."
    ],
    notMeasured: [
      "Audience YouTube : à vérifier, non avancée comme preuve recruteur."
    ],
    proofLine:
      "Un pipeline Python lance le combat dans Godot, prépare la vidéo avec FFmpeg et reprend la publication si une étape est interrompue.",
    summary:
      "Battle Engine fabrique des vidéos de combats 1 contre 1. Python lance le rendu Godot, FFmpeg prépare le montage, RIFE lisse les mouvements et le pipeline gère la publication YouTube. Les extraits ci-dessous montrent ce qu'il produit.",
    stack: ["Godot", "Python", "FFmpeg", "RIFE", "YouTube API"],
    recruiterProof: [
      "Automatiser un travail qui traverse plusieurs outils.",
      "Reprendre une publication après une interruption sans recommencer tout le rendu.",
      "Documenter les droits audio, les contrôles qualité et les étapes d'exploitation."
    ],
    constraints: [
      "Enchaîner rendu, montage et publication sans perdre l'état du travail après une interruption.",
      "Vérifier le résultat vidéo et les droits des contenus avant publication."
    ],
    decisions: [
      {
        "decision": "Sauvegarder l'état entre les étapes",
        "why": "Reprendre au dernier travail terminé après une interruption, sans recalculer toute la vidéo.",
        "rejected": "Relancer systématiquement le pipeline depuis le début."
      }
    ],
    delivered: [
      "Pipeline Python de rendu et de publication reprenable.",
      "Combats rendus dans Godot et montés avec FFmpeg.",
      "Montages courts, roster animé et teaser."
    ],
    results: [
      "Le pipeline nightly peut reprendre après une interruption au lieu de recommencer toute la chaîne.",
      "Aucune métrique d'audience n'est citée."
    ],
    limits: [
      "Laboratoire personnel, pas un service vidéo exploité pour des clients.",
      "Les extraits montrent le rendu obtenu, pas une preuve de succès d'audience.",
      "Le roster et le teaser sont des archives : leurs personnages et leurs chiffres décrivent la version de l'époque."
    ],
    gallery: [
      {
        "src": "/assets/video/battle-saitama-20260908.mp4",
        "poster": "/assets/video/battle-saitama-20260908-poster.webp",
        "caption": "Extrait de combat issu du corpus local : arène sombre, effets et fin de combat. Archive de juillet 2026, 20 secondes.",
        "width": 540,
        "height": 960
      },
      {
        "src": "/assets/video/battle-goku-20260908.mp4",
        "poster": "/assets/video/battle-goku-20260908-poster.webp",
        "caption": "Goku contre MrBeast : extrait du rendu local d'août 2026. Combat, effets et barre de vie, 20 secondes.",
        "width": 720,
        "height": 1280
      },
      {
        "src": "/assets/video/battle-roster-20260908.mp4",
        "poster": "/assets/video/battle-roster-20260908-poster.webp",
        "caption": "Montage du roster de juin 2026 : 44 personnages présentés dans cette archive. Ce nombre ne décrit pas le roster actuel.",
        "width": 1280,
        "height": 720
      },
      {
        "src": "/assets/video/battle-teaser-20260908.mp4",
        "poster": "/assets/video/battle-teaser-20260908-poster.webp",
        "caption": "Teaser d'avril 2026 : montage de présentation du projet. Archive de lancement, distincte du rendu actuel des combats.",
        "width": 1280,
        "height": 720
      }
    ],
    links: [
      {
        "label": "Version Markdown",
        "href": "/projects/battle-engine.md"
      },
      {
        "label": "Chaîne YouTube",
        "href": "https://www.youtube.com/channel/UCBdIZLI1Z_EmaZgalR8GsHw",
        "external": true
      },
      {
        "label": "Combat publié le 31 août",
        "href": "https://www.youtube.com/watch?v=0wiPb9gWH7g",
        "external": true
      }
    ]
  },
  {
    evidenceNote: "Nouvelles captures locales de la landing d'équipe archivée. Elles situent le concept ; elles ne prouvent ni une application distribuée ni des résultats d'acquisition. Le design et le développement sont ceux de l'équipe.",
    slug: "hoopsphere",
    title: "HoopSphere - prototype produit MBA",
    shortTitle: "HoopSphere",
    type: "Prototype produit",
    period: "2025 - 2026",
    role: "Co-fondateur, responsable marketing et projections financières",
    status: "Archive / MBA",
    evidenceLevel: "self-declared",
    tier: 3,
    image: "/assets/cards/hoopsphere-art.webp",
    fullColorMedia: true,
    repoStatus: "Projet d'équipe (MBA)",
    liveLabel: "Lab / archive",
    noindex: true,
    codeByOthers: true,
    v2: [
      "Aucune suite prévue : gardé comme apprentissage produit."
    ],
    notMeasured: [
      "Aucune traction marché ni revenu : projet scolaire."
    ],
    proofLine:
      "Projet MBA à quatre : responsabilité marketing, étude de marché et projections financières. Les résultats d'acquisition restent à documenter avant citation.",
    summary:
      "Application mobile de stats de basket amateur (lecture OCR des feuilles e-Marque FFBB), montée à quatre en MBA. Je suis co-fondateur et responsable marketing : acquisition, contenu et les projections financières du business plan. Le développement est porté par l'équipe, le design par une associée.",
    stack: ["Business plan", "Projections financières", "Étude de marché", "Personas", "Instagram", "Emailing (Brevo)"],
    recruiterProof: [
      "Responsabilité du marketing dans un projet MBA mené à quatre.",
      "Étude de marché, personas, plan d'acquisition et campagnes organiques.",
      "Business plan et projections financières à présenter avec leurs sources en entretien."
    ],
    constraints: ["Projet scolaire, pas de traction marché."],
    decisions: [
      {
        decision: "Le présenter comme archive honnête",
        why: "La lucidité vaut mieux qu'un pitch startup vide.",
        rejected: "Le vendre comme SaaS abouti."
      }
    ],
    delivered: [
      "Business plan et projections financières",
      "Étude de marché et personas",
      "Plan d'acquisition Instagram",
      "Campagne d'emailing coachs via Brevo"
    ],
    results: [
      "Prototype produit et plan de lancement réalisés dans le cadre du MBA.",
      "Métriques d'acquisition et statut de publication à confirmer par des exports ou liens publics avant de les citer."
    ],
    limits: [
      "Le développement et le design ne sont pas de moi : ma part est le marketing, l'acquisition et le business plan.",
      "Projet MBA : audience construite, mais pas encore de traction payante."
    ],
    gallery: [
      {
        "src": "/assets/proof/hoopsphere/landing-20260908.webp",
        "caption": "Landing d'équipe archivée : proposition de valeur pour les joueurs de basket. Ma contribution porte sur le marketing, pas sur le design de cet écran.",
        "width": 1440,
        "height": 960
      },
      {
        "src": "/assets/proof/hoopsphere/product-20260908.webp",
        "caption": "Landing d'équipe : les publics joueur, club et entraîneur. Capture locale de l'archive, pas une application mobile en production.",
        "width": 1440,
        "height": 960
      },
      {
        "src": "/assets/proof/hoopsphere/landing-mobile-20260908.webp",
        "caption": "La landing d'équipe sur mobile, capturée depuis l'archive locale. Elle présente le concept, pas une application distribuée.",
        "width": 390,
        "height": 844
      }
    ],
    links: [{ label: "Version Markdown", href: "/projects/hoopsphere.md" }]
  },
  {
    slug: "rag-starter-kit",
    title: "RAG Starter Kit - rechercher dans des documents avec leurs sources",
    shortTitle: "RAG Starter Kit",
    type: "Projet perso / preuve technique",
    period: "2026",
    role: "Conception et développement (full-stack)",
    status: "Prototype privé historique · source à restaurer",
    evidenceLevel: "private",
    tier: 2,
    image: "/assets/cards/rag-starter-kit-art.webp",
    fullColorMedia: true,
    repoStatus: "Source d'origine absente après migration · historique Git privé conservé",
    liveLabel: "Archive privée non exécutable",
    noindex: true,
    evidenceNote:
      "Audit privé du 29 juin 2026 : dépôt master au commit 1fc9629, quatre commits et structure complète documentés. Le manifeste du 29 avril recensait 3,4 Go. Les octets de la source et de sa copie de publication sont absents des volumes montés au 28 août 2026.",
    proofLine:
      "Un prototype privé multi-tenant a été audité en juin 2026 : ingestion de documents, recherche Qdrant, réponses Mistral avec citations et cas d'évaluation. Sa source doit maintenant être restaurée.",
    summary:
      "Prototype privé historique pour interroger des documents sans mélanger les données de plusieurs clients. Son architecture et son historique Git sont documentés, mais le code n'est plus présent localement et aucune exécution actuelle n'est revendiquée.",
    stack: ["FastAPI", "Qdrant", "Mistral AI", "LangChain", "SQLite", "Next.js 15", "React 19", "Docker Compose"],
    recruiterProof: [
      "Construire historiquement un parcours complet : ingestion, recherche, réponse et citations.",
      "Séparer les données par client_id avec authentification, journaux d'usage et filtres de recherche.",
      "Prévoir des cas versionnés pour mesurer le retrieval sans inventer de score actuel."
    ],
    constraints: [
      "Données de démonstration, secrets et identités retirés avant toute future publication.",
      "L'isolation des données doit être prouvée par des tests avant toute présentation comme produit utilisable."
    ],
    decisions: [
      {
        decision: "Séparer l'ingestion, la recherche, les citations et l'évaluation.",
        why: "Le dépôt historique séparait déjà ces étapes pour permettre leur vérification et leur maintenance.",
        rejected: "Recherche full-text classique sans vecteurs, insuffisante pour gérer la similarité sémantique."
      },
      {
        decision: "Prévoir des cas d'évaluation versionnés.",
        why: "Mesurer la qualité du retrieval au lieu de juger les réponses à l'œil.",
        rejected: "Validation manuelle ad hoc, difficile à reproduire et à comparer entre versions."
      }
    ],
    delivered: [
      "Le prototype historique audité réunissait ingestion, retriever, chat avec citations, authentification multi-tenant et journaux d'usage.",
      "Interface historique Next.js 15 / React 19 avec espaces cabinet, administration et portail.",
      "Docker Compose, documentation d'onboarding et cas d'évaluation inspirés de Ragas."
    ],
    results: [
      "L'audit privé du 29/06/2026 a documenté quatre commits, les modules du prototype et les cas d'évaluation présents dans le dépôt.",
      "Aucune performance, qualité de réponse ou exécution actuelle n'est revendiquée sans les octets de la source."
    ],
    limits: [
      "Source d'origine et copie de publication absentes après migration ; le prototype n'est pas exécutable aujourd'hui.",
      "La présence historique de fichiers de test ne prouve pas leur réussite actuelle.",
      "L'ancienne copie anonymisée conservait encore des coordonnées professionnelles et son historique Git ; elle n'était pas publiable telle quelle."
    ],
    gallery: [
      { src: "/assets/proof/rag-starter-kit/rag-document-pipeline-20260828.webp", caption: "Reconstitution éditoriale du parcours historique : ingestion, indexation, recherche puis réponse avec ses sources.", width: 1600, height: 960 },
      { src: "/assets/proof/rag-starter-kit/rag-tenant-isolation-20260828.webp", caption: "Reconstitution de l'isolation historique par client_id ; ce schéma n'est pas une certification de sécurité actuelle.", width: 1600, height: 960 },
      { src: "/assets/proof/rag-starter-kit/rag-evaluation-loop-20260828.webp", caption: "Cas d'évaluation présents dans le dépôt historique ; aucun résultat actuel n'est publié sans restauration de la source.", width: 1600, height: 960 }
    ],
    links: [{ label: "Version Markdown", href: "/projects/rag-starter-kit.md" }]
  },
  {
    slug: "board-ia-pme",
    title: "Board IA PME - comité consultatif multi-agents",
    shortTitle: "Board IA PME",
    type: "POC / preuve technique",
    period: "2026",
    role: "Conception et développement (POC)",
    status: "Prototype privé historique · source à restaurer",
    evidenceLevel: "private",
    tier: 2,
    image: "/assets/cards/board-ia-pme-art.webp",
    fullColorMedia: true,
    repoStatus: "Source d'origine absente après migration · historique Git privé conservé",
    liveLabel: "Archive privée non exécutable",
    noindex: true,
    evidenceNote:
      "Audit privé du 29 juin 2026 : commit unique 0b9a4cb, 437 lignes dans 10 fichiers, cinq agents, cio.py et run_board.py. Les octets de la source et de sa copie de publication sont absents des volumes montés au 28 août 2026.",
    proofLine:
      "Un prototype Python historique de 437 lignes faisait travailler cinq agents, puis appliquait un classement, une pondération et une gate déterministes avant une conclusion rédigée par Mistral Large.",
    summary:
      "Prototype privé historique conçu pour faire ressortir les désaccords entre cinq analyses. Le petit socle Python a existé, mais sa source n'est plus présente et les infrastructures décrites dans le README n'étaient pas implémentées.",
    stack: ["Python", "Mistral Large", "Pondération déterministe", "JSON"],
    recruiterProof: [
      "Prototyper cinq rôles d'analyse et une orchestration minimale dans un socle Python court.",
      "Garder le classement, la pondération et la gate de confiance lisibles dans cio.py.",
      "Distinguer le code réellement audité de l'infrastructure seulement décrite dans les dépendances et le README."
    ],
    constraints: [
      "Éviter le piège des comités d'agents qui se reformulent entre eux, en forçant la divergence par l'isolation des données.",
      "POC à valeur business pour PME françaises : contrainte de souveraineté des données."
    ],
    decisions: [
      {
        decision: "Classement, pondération et gate de confiance déterministes.",
        why: "Garder une partie de l'arbitrage lisible et reproductible avant la rédaction finale.",
        rejected: "Déléguer aussi le classement et la gate au modèle."
      },
      {
        decision: "Mistral Large pour la conclusion narrative.",
        why: "Transformer les sorties classées en une réponse lisible, sans prétendre que toute la synthèse est déterministe.",
        rejected: "Présenter la conclusion comme entièrement produite par des règles fixes."
      }
    ],
    delivered: [
      "Prototype historique de 437 lignes réparties dans 10 fichiers : cinq agents, cio.py et run_board.py.",
      "Classement, pondération et gate déterministes, puis conclusion narrative par Mistral Large."
    ],
    results: [
      "L'audit privé du 29/06/2026 confirme le commit 0b9a4cb et la structure du prototype.",
      "Validation sur cas client réel : pas encore mesurée."
    ],
    limits: [
      "Source d'origine et copie de publication absentes après migration ; aucune exécution actuelle n'est possible.",
      "FastAPI, Celery, Redis et Qdrant apparaissaient dans le README ou les dépendances, pas dans l'implémentation auditée.",
      "Frontend, tests et documentation applicative étaient vides ; aucun résultat client n'est revendiqué."
    ],
    gallery: [
      { src: "/assets/proof/board-ia-pme/board-isolated-agents-20260828.webp", caption: "Reconstitution éditoriale des cinq rôles du prototype historique ; ce n'est pas une capture d'exécution.", width: 1600, height: 960 },
      { src: "/assets/proof/board-ia-pme/board-orchestration-20260828.webp", caption: "Structure auditée : cinq agents, règles de classement et conclusion Mistral Large, sans infrastructure distribuée implémentée.", width: 1600, height: 960 },
      { src: "/assets/proof/board-ia-pme/board-status-20260828.webp", caption: "État vérifié : 437 lignes et 10 fichiers historiques ; source absente, frontend et tests non implémentés.", width: 1600, height: 960 }
    ],
    links: [{ label: "Version Markdown", href: "/projects/board-ia-pme.md" }]
  },
  {
    evidenceNote: "Trois captures de la démo publique du 8 septembre 2026, dans une session anonyme Joueur Preview. Les scores proviennent des propositions réellement jouées pour la capture.",
    slug: "edusemantix",
    title: "Edusemantix - jeu de devinette sémantique multijoueur",
    shortTitle: "Edusemantix",
    type: "Lab / projet perso",
    period: "2026",
    role: "Conception et développement",
    status: "Démo publique en ligne · projet personnel",
    evidenceLevel: "public",
    tier: 3,
    image: "/assets/cards/edusemantix-art.webp",
    fullColorMedia: true,
    repoStatus: "Code privé · démo publique sur Render",
    liveLabel: "Jouer à la démo",
    noindex: true,
    proofLine:
      "Jeu multijoueur en temps réel où l'on cherche un mot secret : chaque proposition reçoit un score de proximité sémantique (similarité cosinus sur vecteurs de mots), scores en direct via WebSocket.",
    summary:
      "Deviner un mot à partir de sa proximité avec d'autres mots. Chaque proposition reçoit un score, et les joueurs voient la progression de la partie en direct.",
    stack: ["React 19 / Vite 6", "Node.js / Express / Socket.io", "ConceptNet Numberbatch", "Python (pré-calcul)", "Firebase Firestore"],
    recruiterProof: [
      "Scoring sémantique sur vecteurs de mots (similarité cosinus) avec pré-calcul Python et stockage binaire pour la performance.",
      "Temps réel multijoueur via Socket.io (parties simultanées, scores en direct)."
    ],
    constraints: [
      "Servir un gros jeu de vecteurs sans pénaliser le temps de réponse : réduction et stockage binaire.",
      "Persistance optionnelle : le serveur tourne même sans Firestore (mode mémoire)."
    ],
    decisions: [
      {
        decision: "Vecteurs réduits puis stockés en binaire, un seul process Node servant le build et le WebSocket.",
        why: "Réduire l'empreinte et simplifier le déploiement sur une cible légère.",
        rejected: "Appel à une API d'embeddings à chaque proposition, avec une latence et un coût incompatibles avec le temps réel."
      }
    ],
    delivered: [
      "Application React + serveur Node/Socket.io avec moteur de jeu et scoring sémantique.",
      "Scripts Python de génération/pré-calcul des vecteurs."
    ],
    results: [
      "Démo publique accessible sur Render, avec propositions et scores en direct.",
      "Audience et engagement non mesurés ici."
    ],
    limits: [
      "L'hébergement peut demander un temps de réveil à la première visite.",
      "Cette démonstration ne prouve pas un bénéfice pédagogique ni une utilisation en classe.",
      "La persistance des statistiques dépend de la configuration du serveur."
    ],
    gallery: [
      {
        "src": "/assets/proof/edusemantix/game-20260908.webp",
        "caption": "Démo publique : trois propositions jouées dans une session anonyme, avec leur score sémantique.",
        "width": 1440,
        "height": 960
      },
      {
        "src": "/assets/proof/edusemantix/rules-20260908.webp",
        "caption": "Règles accessibles depuis la partie : proximité, température et progression.",
        "width": 1440,
        "height": 960
      },
      {
        "src": "/assets/proof/edusemantix/mobile-20260908.webp",
        "caption": "La même partie sur un écran de 390 px : proposition, score et historique.",
        "width": 390,
        "height": 844
      }
    ],
    links: [
      {
        "label": "Jouer à la démo",
        "href": "https://edusemantix.onrender.com",
        "external": true
      },
      {
        "label": "Version Markdown",
        "href": "/projects/edusemantix.md"
      }
    ]
  },
  {
    slug: "pokemon-gen4-toolkit",
    title: "Pokémon Gen-4 Toolkit - outils d'exploration de données de jeu",
    shortTitle: "Pokémon Gen-4 Toolkit",
    type: "Lab / projet perso",
    period: "2026",
    role: "Conception et développement",
    status: "Lab privé - aucune ROM distribuée",
    evidenceLevel: "private",
    tier: 3,
    image: "/assets/cards/pokemon-gen4-toolkit-art.webp",
    fullColorMedia: true,
    repoStatus: "Archive privée · aucune donnée de jeu publiée",
    liveLabel: "Lab",
    noindex: true,
    proofLine:
      "Boîte à outils Python (ndspy) pour explorer des formats de données de jeu (textes, events, scripts, stats) et écrire ses propres outils d'édition. Aucune ROM ni asset distribué.",
    summary:
      "Explorer des formats de données de jeu et écrire mes propres outils d'édition Python, sans publier d'assets ni de ROM.",
    stack: ["Python 3", "ndspy", "Format NARC", "Moteur de texte Gen 4 maison"],
    recruiterProof: [
      "Reverse-engineering d'un format binaire propriétaire, avec décodage et encodage du texte chiffré Gen 4 (charmap + chiffrement seed/XOR) écrits à la main.",
      "Outillage complet : édition des events (PNJ, warps, triggers), du bytecode des scripts, des stats/espèces, et cartographie des zones."
    ],
    constraints: [
      "Aucune ROM ou save versionnés (copyright) : l'utilisateur fournit sa propre copie légale.",
      "Format binaire non documenté officiellement : analyse de headers et d'archives NARC."
    ],
    decisions: [
      {
        decision: "Moteur de texte Gen 4 réimplémenté en Python plutôt qu'une dépendance d'un éditeur existant.",
        why: "Contrôle total du chiffrement/charmap et intégration au reste de l'outillage.",
        rejected: "Éditeurs ROM grand public, des boîtes noires peu scriptables."
      }
    ],
    delivered: [
      "Scripts d'édition (textes, events, scripts, espèces) et d'analyse de zones.",
      "Notes techniques sur les formats explorés et les limites de publication."
    ],
    results: ["Outils fonctionnels sur ROM Gen 4 fournie par l'utilisateur.", "Aucune métrique d'usage (exploration technique)."],
    limits: [
      "Sans ROM légale fournie, le toolkit ne fait rien : aucun contenu jouable distribué.",
      "Lab ciblé sur la 4e génération NDS, non généralisé."
    ],
    gallery: [
      { src: "/assets/proof/pokemon-gen4-toolkit/narc-anatomy.webp", caption: "Schéma d'une archive NARC : en-tête, table de fichiers, noms et données sont séparés avant toute édition.", width: 1600, height: 960 },
      { src: "/assets/proof/pokemon-gen4-toolkit/text-codec.webp", caption: "Chaîne du codec de texte réimplémenté en Python : caractères, codes Gen 4, seed puis chiffrement XOR.", width: 1600, height: 960 },
      { src: "/assets/proof/pokemon-gen4-toolkit/editor-surface.webp", caption: "Périmètre des outils : textes, événements, scripts et statistiques, sans ROM ni asset distribué.", width: 1600, height: 960 }
    ],
    links: [{ label: "Version Markdown", href: "/projects/pokemon-gen4-toolkit.md" }]
  },
  {
    slug: "claude-code-soul",
    title: "claude-code-soul - pack de configuration Claude Code",
    shortTitle: "claude-code-soul",
    type: "Projet open source (config / outillage)",
    period: "2026",
    role: "Auteur",
    status: "Public",
    evidenceLevel: "public",
    tier: 3,
    image: "/assets/cards/claude-code-soul-art.webp",
    fullColorMedia: true,
    repoStatus: "Public",
    noindex: true,
    proofLine:
      "Pack de configuration open source pour Claude Code CLI : un soul.md (identité/ton/refus) plus skills, agents, hooks et rules, pour transformer le CLI en assistant à personnalité dosée plutôt qu'en chatbot poli.",
    summary:
      "Séparer l'« âme » de l'assistant (ton, valeurs, refus) de la config technique, et packager un outillage Claude Code réutilisable et publiable sans fuite de données.",
    stack: ["Claude Code CLI", "Shell (hooks)", "Markdown", "macOS Keychain + Touch ID", "gitleaks"],
    recruiterProof: [
      "Conception d'un système de configuration en couches (identité, personnalité, workflow, skills, agents, hooks) documenté et installable via script.",
      "Sécurité pensée dès le départ, avec Touch ID sur actions sensibles, secrets via Keychain, rédaction des secrets dans les transcrits et règle 0 PII / 0 chemin perso.",
      "Publication open source propre (MIT) avec crédits explicites des packs tiers exclus."
    ],
    constraints: [
      "Publier une config personnelle sans fuiter de données : 0 PII, 0 secret, 0 chemin absolu personnel.",
      "Rester une couche par-dessus Claude Code, pas une refonte de l'outil."
    ],
    decisions: [
      {
        decision: "Séparer soul.md (identité/ton) de la config technique.",
        why: "Isoler l'âme de la config rend les deux plus lisibles et réutilisables.",
        rejected: "Tout mélanger dans un seul fichier, illisible et difficile à réutiliser."
      },
      {
        decision: "Lazy-load des MCP, LaunchAgents et agents lourds (à la demande, pas au startup).",
        why: "Réduire la consommation de tokens et de RAM au démarrage.",
        rejected: "Tout charger au démarrage, avec un coût inutile en tokens et en RAM."
      }
    ],
    delivered: [
      "Repo public MIT : soul.md, rules, skills, agents, hooks, script setup et docs.",
      "Pipeline de publication propre : gitleaks, exclusion des packs tiers, crédits."
    ],
    results: ["Repo public en ligne sur GitHub.", "Étoiles / adoption : pas encore mesurées."],
    limits: [
      "Config opinionnée (ton majordome, workflow personnel) : à adapter avant réutilisation.",
      "Certaines briques tierces sont exclues du repo et doivent être réinstallées séparément."
    ],
    gallery: [
      {
        "src": "/assets/proof/claude-code-soul/soul-layers.webp",
        "caption": "Architecture du pack : l'identité, les règles, les skills, les agents et les hooks restent dans des couches séparées.",
        "width": 1600,
        "height": 960
      },
      {
        "src": "/assets/proof/claude-code-soul/soul-security-gates.webp",
        "caption": "Garde-fous de publication : secrets dans le trousseau, validation locale et contrôle gitleaks avant le dépôt public.",
        "width": 1600,
        "height": 960
      },
      {
        "src": "/assets/proof/claude-code-soul/public-0-20260908.webp",
        "caption": "Dépôt GitHub public consulté le 8 septembre 2026 : fichiers, licence et documentation du pack.",
        "width": 1440,
        "height": 960
      }
    ],
    links: [
      { label: "Version Markdown", href: "/projects/claude-code-soul.md" },
      { label: "GitHub", href: "https://github.com/Jonassuhard/claude-code-soul", external: true }
    ]
  }
];

export const featuredProjects = ["job-radar", "cortex-bridge", "les-petites-griffes"]
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is Project => Boolean(project));

// Preuves recruteur : produit IA open source, livraison client en production,
// puis besoin terrain transformé en produit local testable.
export const recruiterFeatured = ["job-radar", "cortex-bridge", "les-petites-griffes"]
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is Project => Boolean(project));

export type SkillGroup = "IA & automatisation" | "Web & produit" | "Growth & SEO";

export const skillGroups: SkillGroup[] = ["IA & automatisation", "Web & produit", "Growth & SEO"];

export const skills = [
  {
    name: "SEO / contenu / CMS",
    group: "Growth & SEO" as SkillGroup,
    proofSlugs: ["iscom", "capselys", "les-petites-griffes"],
    proofExtra: "",
    proof: "ISCOM, Capsélys, Les Petites Griffes",
    note: "Je recherche les sujets, j'organise les pages, je prépare les contenus et je vérifie chaque information avant publication.",
    limit: "Pas encore de programmatic SEO à grande échelle ni de domaine à fort trafic historisé."
  },
  {
    name: "Automatisation / QA / Playwright",
    group: "IA & automatisation" as SkillGroup,
    proofSlugs: ["job-radar", "cortex-bridge", "battle-engine"],
    proofExtra: "audits Playwright, scripts Python",
    proof: "Job Radar, Cortex Bridge, Battle Engine, audits Playwright, scripts Python",
    note: "J'automatise les tâches répétitives et je contrôle le résultat sur plusieurs tailles d'écran.",
    limit: "Automatisation de projets perso ; pas encore de QA en CI/CD dans une équipe multi-dev."
  },
  {
    name: "IA appliquée / workflows LLM",
    group: "IA & automatisation" as SkillGroup,
    proofSlugs: ["cortex-bridge", "capselys", "les-petites-griffes", "iscom"],
    proofExtra: "RAG Starter Kit, Board IA PME",
    proof: "Cortex Bridge, Capsélys, Les Petites Griffes, ISCOM",
    note: "Je construis des assistants avec des sources, des limites claires et une vérification humaine avant publication.",
    limit: "POC et projets cadrés ; pas encore de LLM en production sous charge avec SLA."
  },
  {
    name: "Full-stack web",
    group: "Web & produit" as SkillGroup,
    proofSlugs: ["job-radar", "cortex-bridge", "les-petites-griffes", "educool-la-herse"],
    proofExtra: "ce portfolio",
    proof: "Job Radar, Cortex Bridge, Les Petites Griffes, Cool Bank / La Herse, ce portfolio",
    note: "Je construis des sites et des outils web, du premier écran au déploiement.",
    limit: "Surtout front et intégrations ; pas de backend distribué à forte charge."
  },
  {
    name: "Documentation / transmission",
    group: "Web & produit" as SkillGroup,
    proofSlugs: ["job-radar", "claude-code-soul", "educool-la-herse"],
    proofExtra: "ce portfolio",
    proof: "Job Radar, claude-code-soul, Cool Bank / La Herse, ce portfolio",
    note: "Je note les décisions et les étapes pour qu'une autre personne puisse reprendre le projet.",
    limit: "Documentation de projets solo ; pas encore d'onboarding formalisé sur un codebase partagé."
  },
  {
    name: "Sécurité / RGPD / limites",
    group: "IA & automatisation" as SkillGroup,
    proofSlugs: ["job-radar", "cortex-bridge", "educool-la-herse", "les-petites-griffes"],
    proofExtra: "",
    proof: "Job Radar, Cortex Bridge, Cool Bank / La Herse, Les Petites Griffes",
    note: "Je limite les droits, bloque en cas de doute, anonymise les données sensibles et garde les secrets hors du code.",
    limit: "Bonnes pratiques appliquées ; pas d'audit sécurité formel ni de conformité validée par un DPO."
  }
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
