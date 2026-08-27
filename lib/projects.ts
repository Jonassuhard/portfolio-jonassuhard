import type { Metadata } from "next";

export type ProjectTier = 1 | 2 | 3;
export type EvidenceLevel = "public" | "private" | "self-declared";
export type ProofImage = { src: string; caption: string; width: number; height: number };

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
  v2?: string[];
  notMeasured?: string[];
  repoStatus?: string;
  liveLabel?: string;
  evidenceNote?: string;
  metaDescription?: string;
  cardLine?: string;
  video?: string;
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
  // Profil Malt temporairement masqué : son contenu doit être réaligné avec
  // les affirmations vérifiables du portfolio avant de redevenir public ici.
  malt: null as string | null,
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
    title: "Job Radar - transformer des offres dispersées en décisions explicables",
    shortTitle: "Job Radar Community",
    type: "Radar d'offres local et open source",
    period: "Août 2026 · v0.1.0-beta.1",
    role: "Conception produit, architecture, développement full-stack, sécurité, QA open source",
    status: "Beta publique open source v0.1.0-beta.1",
    evidenceLevel: "public",
    tier: 1,
    image: "/assets/cards/job-radar-art.webp",
    heroImage: {
      src: "/assets/proof/job-radar/radar-overview.webp",
      caption: "Radar de démonstration : offres fictives classées avec score, confiance, fraîcheur, source et raison principale.",
      width: 1440,
      height: 900
    },
    architectureImage: {
      src: "/assets/proof/job-radar/architecture.webp",
      caption: "Pipeline public : sources autorisées et imports manuels, normalisation, faits, scoring configurable, SQLite, API locale et interface React.",
      width: 1440,
      height: 900
    },
    fullColorMedia: true,
    cardStatus: "Beta publique · données locales · corpus fictif",
    repoStatus: "Repo public MIT : github.com/Jonassuhard/job-radar-community",
    liveLabel: "Repo GitHub et release v0.1.0-beta.1",
    evidenceNote:
      "La preuve v0.1.0-beta.1 rapporte 234 tests backend, 30 tests frontend et 37 tests E2E sans échec ; 8 scénarios E2E sont ignorés intentionnellement. Axe et responsive ont été contrôlés sur 20 combinaisons route/viewport, sans violation ni débordement.",
    metaDescription:
      "Job Radar Community classe des offres d'emploi avec un score configurable et explicable, en local, sans CV publié ni auto-candidature.",
    cardLine:
      "Radar local qui normalise les offres, sépare pertinence, confiance et fraîcheur, puis explique chaque décision.",
    need: {
      title: "Les offres utiles sont dispersées.",
      lead:
        "APIs, ATS publics, alertes et imports manuels produisent des formats différents. Relire les mêmes annonces et subir des filtres opaques fait perdre du temps avant même de candidater.",
      items: [
        "Comparer des offres hétérogènes sans perdre leur provenance ni les extraits qui justifient les faits.",
        "Adapter les critères au parcours, aux contraintes et aux priorités de chaque utilisateur sans modifier le code.",
        "Écarter les doublons et les offres trop anciennes sans confondre fraîcheur et pertinence métier."
      ]
    },
    intention: {
      title: "Construire un classement utile et explicable.",
      lead:
        "Le radar transforme les annonces en faits comparables, applique une grille YAML contrôlable et rend chaque score lisible. Les données restent locales par défaut.",
      items: [
        "Séparer la pertinence professionnelle, la confiance d'extraction et l'âge de l'annonce.",
        "Expliquer les axes, règles, bonus, malus et blocages avec les extraits source associés.",
        "Permettre de configurer profil, recherche, scoring, sources et taxonomie sans toucher au code.",
        "Limiter l'automatisation aux sources autorisées et conserver une validation humaine avant toute candidature."
      ]
    },
    architecture: [
      "France Travail, Adzuna, Jooble, Remotive et ATS publics alimentent le pipeline via des connecteurs autorisés ; les autres offres entrent par import manuel.",
      "Le noyau Python normalise, canonicalise, déduplique et extrait les faits avant d'appliquer la configuration YAML.",
      "Le score, la confiance et la fraîcheur sont persistés dans SQLite puis exposés par une API FastAPI locale.",
      "L'interface React affiche Radar, Insights, Sources et Configuration sans recalculer le score côté navigateur."
    ],
    v2: [
      "Recueillir des retours utilisateurs publics pour calibrer la grille et les presets sans imposer un profil universel.",
      "Élargir les connecteurs uniquement lorsque leur API ou leur politique de collecte l'autorise explicitement."
    ],
    notMeasured: [
      "Adoption externe, candidatures obtenues et gain de temps réel : pas encore mesurés pour cette beta.",
      "Qualité du classement sur un corpus professionnel réel : la démonstration publique utilise 42 offres fictives."
    ],
    proofLine:
      "La preuve publique v0.1.0-beta.1 rapporte 234 tests backend, 30 tests frontend et 37 tests E2E sans échec, ainsi que 20 combinaisons route/viewport sans violation Axe ni débordement.",
    summary:
      "Job Radar Community est un radar d'offres local et configurable. Il normalise les annonces, retire les doublons et explique séparément la pertinence, la confiance et la fraîcheur, sans publier le CV ni envoyer de candidature.",
    stack: ["Python", "FastAPI", "React", "SQLite", "Pydantic", "Playwright"],
    recruiterProof: [
      "Transformer un besoin personnel en produit générique configurable et documenté.",
      "Concevoir un pipeline déterministe où chaque décision peut être reliée à une règle et à un extrait source.",
      "Préparer une publication open source sans historique privé, secret, CV ni donnée de candidature."
    ],
    constraints: [
      "Préserver la version personnelle et son historique tout en reconstruisant une édition publique par liste blanche.",
      "Fonctionner hors ligne avec un corpus fictif et garder les données utilisateur sur la machine par défaut.",
      "Refuser le crawl automatique des sources qui ne l'autorisent pas et rendre leur politique visible dans l'interface.",
      "Rester configurable sans masquer les règles derrière un modèle opaque ou un service cloud obligatoire."
    ],
    decisions: [
      {
        decision: "Noyau déterministe et configuration YAML",
        why: "Les critères restent auditables, versionnables et modifiables sans toucher au code.",
        rejected: "Un classement LLM opaque impossible à reproduire précisément."
      },
      {
        decision: "SQLite et API loopback",
        why: "La démonstration reste locale, légère et utilisable sans compte cloud.",
        rejected: "Une base distante obligatoire pour un outil personnel."
      },
      {
        decision: "Sources automatisées sur liste blanche",
        why: "Chaque connecteur expose sa provenance et respecte une politique de collecte explicite.",
        rejected: "Crawler LinkedIn, Indeed ou Welcome to the Jungle sans autorisation."
      },
      {
        decision: "Score, confiance et fraîcheur séparés",
        why: "Une offre peut être pertinente mais ancienne, ou bien extraite avec peu de certitude ; le produit ne mélange pas ces signaux.",
        rejected: "Un score unique dont les causes seraient impossibles à lire."
      }
    ],
    delivered: [
      "CLI Python pour initialiser, valider, diagnostiquer, rafraîchir, importer et recalculer les offres.",
      "Pipeline de normalisation, déduplication, extraction de faits et scoring configurable avec provenance.",
      "API FastAPI locale, stockage SQLite et interface React responsive en quatre vues.",
      "Corpus de démonstration hors ligne de 42 offres fictives et documentation de configuration.",
      "Contrats de sécurité, audits publics et archive de release reproductible."
    ],
    results: [
      "234 tests backend, 30 tests frontend et 37 tests E2E réussis ; 8 scénarios E2E ignorés intentionnellement.",
      "20 combinaisons route/viewport contrôlées à 320, 390, 768, 1024 et 1440 px, sans violation Axe ni débordement.",
      "Audits de l'arbre public, de l'historique propre, de l'archive, des distributions Python, des dépendances et des captures : zéro finding déclaré dans la preuve v0.1.0-beta.1.",
      "Corpus de démonstration de 42 offres fictives utilisable hors ligne et sans clé API."
    ],
    limits: [
      "Cette beta n'envoie aucune candidature et ne génère ni CV ni lettre ; elle prépare et explique la sélection.",
      "LinkedIn, Indeed et Welcome to the Jungle restent des sources manual_only : aucun refresh automatique ne les appelle.",
      "La preuve v0.1.0-beta.1 est une validation locale datée ; elle ne prouve ni adoption externe ni résultat de recherche d'emploi.",
      "Le corpus public est fictif ; la pertinence sur les recherches d'un tiers dépend de sa propre configuration."
    ],
    gallery: [
      {
        src: "/assets/proof/job-radar/score-explained.webp",
        caption: "Détail d'une offre fictive : score par axe, règles appliquées et explications restent visibles.",
        width: 1024,
        height: 768
      },
      {
        src: "/assets/proof/job-radar/insights.webp",
        caption: "Insights calculés depuis la base locale : décisions, compétences demandées et santé du corpus.",
        width: 1440,
        height: 900
      },
      {
        src: "/assets/proof/job-radar/mobile.webp",
        caption: "Le radar conserve filtres, score, confiance, fraîcheur et décision sur un écran mobile de 390 px.",
        width: 390,
        height: 844
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
      src: "/assets/proof/educool/cool-bank-v3-world-20260826.webp",
      caption: "Capture locale V3 : l'élève entre dans le bourg, découvre sa première quête et prend ses repères dans le monde 3D.",
      width: 1280,
      height: 800
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
      purposeTitle: "Rendre l'argent et la responsabilité plus concrets.",
      purposeLead:
        "La banque existait déjà dans la classe. Le projet lui donne des lieux, des personnages et des conséquences visibles, sans transformer l'outil de l'enseignante en jeu.",
      purpose: [
        "Les élèves explorent le bourg, accomplissent des missions, économisent et font évoluer progressivement leur maison.",
        "Un élève peut tenir le guichet pendant une période donnée, avec des plafonds clairs et un registre vérifiable.",
        "L'enseignante conserve les commandes essentielles et peut interrompre le monde ou les échanges sans perdre son espace de travail calme."
      ],
      roles: [
        {
          title: "L'élève",
          text: "Il explore le bourg, parle aux habitants, accomplit des missions, économise et choisit comment utiliser ses centicools."
        },
        {
          title: "Le banquier",
          text: "C'est un élève responsabilisé. Il tient un guichet guidé, applique des plafonds et laisse une trace de chaque opération."
        },
        {
          title: "L'enseignante",
          text: "Elle suit la classe, garde le contrôle du monde et valide les progressions depuis une interface séparée du jeu."
        }
      ],
      galleryGroups: [
        {
          kicker: "Reconstruction V3",
          title: "V3 — la reconstruction locale",
          description:
            "Captures réelles du 26 août 2026 avec des profils de démonstration. Elles montrent les trois rôles et des interactions rejouées localement, pas une validation en classe.",
          featuredFirst: true,
          images: [
            { src: "/assets/proof/educool/cool-bank-v3-world-20260826.webp", caption: "V3 : l'élève entre dans le bourg, découvre sa première quête et apprend à déplacer la caméra.", width: 1280, height: 800 },
            { src: "/assets/proof/educool/cool-bank-v3-roles.webp", caption: "V3 : élève, banquier et professeure entrent avec des responsabilités différentes.", width: 1440, height: 900 },
            { src: "/assets/proof/educool/cool-bank-v3-dialogue.webp", caption: "V3 : l'élève peut choisir une question ou écrire la sienne à un personnage du bourg.", width: 1440, height: 900 },
            { src: "/assets/proof/educool/cool-bank-v3-banker.webp", caption: "V3 : le guichet du banquier guide l'opération et affiche une limite de transaction.", width: 1440, height: 900 },
            { src: "/assets/proof/educool/cool-bank-v3-teacher.webp", caption: "V3 : la professeure peut bloquer le monde, couper les échanges et rouvrir l'expérience.", width: 1440, height: 900 }
          ]
        },
        {
          kicker: "Version jouable",
          title: "V2 — la boucle 3D déjà jouable",
          description:
            "La V2 est déjà un monde 3D multijoueur. Ces écrans prouvent la boucle locale sur un appareil ; ils ne doivent jamais être présentés comme une ancienne version 2D.",
          images: [
            { src: "/assets/proof/educool/cool-bank-v2-world.webp", caption: "V2 : monde 3D, personnages, HUD et économie visibles dans la boucle locale jouable.", width: 1440, height: 900 },
            { src: "/assets/proof/educool/cool-bank-v2-dialogue.webp", caption: "V2 : le maire donne une mission qui relie le déplacement dans le bourg à l'économie de classe.", width: 1440, height: 900 },
            { src: "/assets/proof/educool/cool-bank-v2-banker.webp", caption: "V2 : le guichet banquier encadre le camarade, le motif, le montant et le registre du jour.", width: 1124, height: 899 },
            { src: "/assets/proof/educool/cool-bank-v2-teacher.webp", caption: "V2 : la télécommande donne à l'enseignante les commandes de classe sans afficher de donnée d'élève.", width: 1280, height: 800 }
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
      "Captures du staging et présentation client de 14 slides, détaillées en entretien.",
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
      { src: "/assets/proof/capselys/capselys-site.webp", caption: "Home Capsélys (staging) avec l'assistant IA ouvert en contexte.", width: 1400, height: 800 },
      { src: "/assets/proof/capselys/capselys-assistant.webp", caption: "L'assistant répond à une vraie question (DUERP) : réponse cadrée, CTA et disclaimer « réponses générées automatiquement ».", width: 900, height: 1063 },
      { src: "/assets/proof/capselys/capselys-audit-roadmap.webp", caption: "Extrait du rapport d'audit : problèmes observés, priorité et correction proposée pour la suite de la refonte.", width: 1600, height: 456 }
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
      "Article publié en ligne, plus une checklist QA de pré-publication et un extrait d'audit de cannibalisation anonymisés.",
    metaDescription:
      "Production SEO dans Drupal : rédaction, vérification de chaque information, audits Semrush et validation humaine avant publication.",
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
      "Des articles SEO publiés en ligne dans le CMS d'un employeur, vérifiés avant mise en ligne.",
    summary:
      "Je prépare et saisis des contenus SEO dans Drupal. Je vérifie chaque information, j'utilise Semrush pour éviter les pages qui se concurrencent et je laisse la validation finale à l'équipe éditoriale.",
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
      { src: "/assets/proof/iscom/iscom-article-hero.webp", caption: "Article publié sur iscom.fr : titre, date et introduction visibles sur la page publique.", width: 1440, height: 1000 },
      { src: "/assets/proof/iscom/iscom-article-agent.webp", caption: "Passage de l'article qui explique simplement le rôle des agents IA dans les métiers de la communication.", width: 1440, height: 1000 },
      { src: "/assets/proof/iscom/iscom-article-method.webp", caption: "Suite de l'article public : méthode, limites et mise en contexte éditoriale vérifiables sur le site ISCOM.", width: 1440, height: 1000 }
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
      { src: "/assets/proof/preuvia/preuvia-hero-live.webp", caption: "Page d'accueil publique de Preuvia : la promesse explique directement ce que l'audit vérifie.", width: 1440, height: 1000 },
      { src: "/assets/proof/preuvia/preuvia-process-live.webp", caption: "Process public de l'audit : tester les réponses, repérer les écarts, puis prioriser ce qu'il faut publier.", width: 1440, height: 1000 },
      { src: "/assets/proof/preuvia/preuvia-output-live.webp", caption: "Exemple fictif du livrable public : sources citées, manque observé et actions proposées, sans résultat client inventé.", width: 1440, height: 1000 }
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
      { src: "/assets/proof/cortex-bridge/cortex-onboarding.webp", caption: "Onboarding public de Cortex Bridge : choix du dossier local et consentement avant toute exécution.", width: 1440, height: 900 },
      { src: "/assets/proof/cortex-bridge/cortex-preflight.webp", caption: "Contrôle avant exécution : commande proposée, dossier ciblé et niveau de risque restent visibles avant validation.", width: 1440, height: 900 },
      { src: "/assets/proof/cortex-bridge/cortex-execution.webp", caption: "Trace d'exécution : chaque étape, sa sortie et son état restent consultables dans l'interface locale.", width: 1440, height: 900 },
      { src: "/assets/proof/cortex-bridge/cortex-stop-diagnostic.webp", caption: "Diagnostic d'arrêt : les processus actifs sont listés et le bouton d'arrêt d'urgence reste disponible dans l'interface locale.", width: 1440, height: 900 }
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
    slug: "battle-engine",
    title: "Battle Engine - pipeline vidéo automatisé",
    shortTitle: "Battle Engine",
    type: "Pipeline vidéo / automation",
    period: "2026",
    role: "Pipeline Python, Godot, rendu, FFmpeg, publication",
    status: "Actif / lab · sources vérifiées jusqu'au 25 août 2026",
    evidenceLevel: "private",
    tier: 2,
    image: "/assets/cards/battle-engine-art.webp",
    fullColorMedia: true,
    video: "/assets/video/battle-engine-intro-hd.mp4",
    repoStatus: "Dépôt privé",
    liveLabel: "Lab",
    noindex: true,
    evidenceNote:
      "Preuves locales privées vérifiées jusqu'au 25/08/2026 : reprise du pipeline après interruption et ajout d'analyses d'exploitation en lecture seule.",
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
      "Battle Engine automatise la fabrication de vidéos de combats 1 contre 1. Python pilote le rendu Godot, le montage FFmpeg, l'interpolation d'images et la publication YouTube.",
    stack: ["Godot", "Python", "FFmpeg", "RIFE", "YouTube API"],
    recruiterProof: [
      "Automatiser un travail qui traverse plusieurs outils.",
      "Reprendre une publication après une interruption sans recommencer tout le rendu.",
      "Documenter les droits audio, les contrôles qualité et les étapes d'exploitation."
    ],
    constraints: ["Contenu lab à cadrer pour ne pas brouiller le positionnement CDI."],
    decisions: [
      {
        decision: "Le garder en Tier 2",
        why: "Bonne preuve technique, mais moins directement recruteur marketing IA.",
        rejected: "Le mettre en première ligne."
      }
    ],
    delivered: ["Pipeline de rendu", "Vidéos de test générées", "Scripts d'automatisation"],
    results: [
      "Le pipeline nightly peut reprendre après une interruption au lieu de recommencer toute la chaîne.",
      "Aucune métrique d'audience n'est citée."
    ],
    limits: [
      "Projet lab : automatisation créative, éloignée du poste visé, gardée comme preuve technique.",
      "La vidéo publique montre uniquement l'introduction rendue en haute définition, pas un combat complet."
    ],
    gallery: [
      { src: "/assets/proof/battle-engine/pipeline-resumable.webp", caption: "Schéma du pipeline reprenable : Godot rend le combat, FFmpeg et RIFE préparent la vidéo, puis l'API YouTube publie.", width: 1600, height: 960 },
      { src: "/assets/proof/battle-engine/intro-platforms.webp", caption: "Séquence d'intro : les plateformes des deux combattants et le champ de particules, rendus par un shader custom sous Godot.", width: 620, height: 1103 },
      { src: "/assets/proof/battle-engine/intro-buildup.webp", caption: "Montée du champ de particules avant le face-à-face, générée en temps réel côté moteur.", width: 620, height: 1103 }
    ],
    links: [
      { label: "Version Markdown", href: "/projects/battle-engine.md" },
      {
        label: "Chaîne YouTube",
        href: "https://www.youtube.com/channel/UCBdIZLI1Z_EmaZgalR8GsHw",
        external: true
      }
    ]
  },
  {
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
      { src: "/assets/proof/hoopsphere/hoopsphere-landing-team.webp", caption: "Vue du prototype produit réalisé en équipe. Je la montre pour situer HoopSphere ; le design et le développement ne sont pas les miens.", width: 1600, height: 900 },
      { src: "/assets/proof/hoopsphere/hoopsphere-import-emarque.webp", caption: "Écran réel du prototype d'équipe : import OCR d'une feuille e-Marque. Le design et le développement sont ceux de l'équipe ; ma contribution porte sur le marketing et le lancement.", width: 1170, height: 2532 },
      { src: "/assets/proof/hoopsphere/hoopsphere-acquisition-plan.webp", caption: "Extrait du plan d'acquisition préparé pour le projet MBA : canaux, cibles et séquence de lancement, sans les présenter comme des résultats obtenus.", width: 1600, height: 555 }
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
    slug: "edusemantix",
    title: "Edusemantix - jeu de devinette sémantique multijoueur",
    shortTitle: "Edusemantix",
    type: "Lab / projet perso",
    period: "2026",
    role: "Conception et développement",
    status: "Lab privé actif · refonte V2 en cours",
    evidenceLevel: "private",
    tier: 3,
    image: "/assets/cards/edusemantix-art.webp",
    fullColorMedia: true,
    repoStatus: "Dépôt privé actif, vérifié le 27 août 2026",
    liveLabel: "Démo privée",
    noindex: true,
    proofLine:
      "Jeu multijoueur en temps réel où l'on cherche un mot secret : chaque proposition reçoit un score de proximité sémantique (similarité cosinus sur vecteurs de mots), scores en direct via WebSocket.",
    summary:
      "Faire jouer plusieurs personnes en simultané sur une mécanique de proximité sémantique, avec scoring temps réel.",
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
    results: ["Jeu fonctionnel déployable.", "Audience / engagement : pas encore mesurés."],
    limits: [
      "Projet lab en refonte V2 ; les captures publiées restent celles de la version de démonstration auditée.",
      "Une prévisualisation existe, mais n'est pas présentée comme une démo publique stable.",
      "Persistance des stats dépend de Firebase (mode mémoire sans credentials)."
    ],
    gallery: [
      { src: "/assets/proof/edusemantix/edusemantix-login.webp", caption: "Écran de connexion de la démo locale, lancé avec un profil fictif créé uniquement pour cette capture.", width: 1440, height: 1000 },
      { src: "/assets/proof/edusemantix/edusemantix-game.webp", caption: "Partie locale : une proposition reçoit immédiatement un score de proximité avec le mot secret.", width: 1440, height: 1000 },
      { src: "/assets/proof/edusemantix/edusemantix-score.webp", caption: "Retour après une proposition fictive : score sémantique, progression et historique affichés par l'interface réelle.", width: 1440, height: 1000 }
    ],
    links: [{ label: "Version Markdown", href: "/projects/edusemantix.md" }]
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
      { src: "/assets/proof/claude-code-soul/soul-layers.webp", caption: "Architecture du pack : l'identité, les règles, les skills, les agents et les hooks restent dans des couches séparées.", width: 1600, height: 960 },
      { src: "/assets/proof/claude-code-soul/soul-security-gates.webp", caption: "Garde-fous de publication : secrets dans le trousseau, validation locale et contrôle gitleaks avant le dépôt public.", width: 1600, height: 960 },
      { src: "/assets/proof/claude-code-soul/soul-github-repo.webp", caption: "Dépôt GitHub public : fichiers du pack, licence et documentation sont directement consultables.", width: 1440, height: 1000 }
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
