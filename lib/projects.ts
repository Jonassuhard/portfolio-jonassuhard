import type { Metadata } from "next";

export type ProjectTier = 1 | 2 | 3;
export type EvidenceLevel = "public" | "private" | "self-declared";

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
  gallery?: Array<{ src: string; caption: string; width: number; height: number }>;
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
    slug: "les-petites-griffes",
    title: "Les Petites Griffes - site live, CMS et assistant IA",
    shortTitle: "Les Petites Griffes",
    type: "Site live + CMS + assistant IA",
    period: "Avril 2026 - Juin 2026",
    role: "Stratégie, design, développement, SEO, déploiement, QA",
    status: "Prod live",
    evidenceLevel: "private",
    tier: 1,
    image: "/assets/cards/les-petites-griffes.webp",
    repoStatus: "Privé, code et données client",
    liveLabel: "Live · URL communiquée en entretien",
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
      { label: "Version Markdown", href: "/projects/les-petites-griffes.md" }
    ]
  },
  {
    slug: "educool-la-herse",
    title: "Cool Bank / La Herse - du jeu local V2 au monde 3D V3",
    shortTitle: "Cool Bank / La Herse",
    type: "Jeu scolaire multijoueur + interface métier",
    period: "Juillet - août 2026",
    role: "Conception produit, UX, développement full-stack, systèmes de jeu, sécurité, QA",
    status: "V2 jouable localement · V3 prête pour recette humaine",
    evidenceLevel: "private",
    tier: 1,
    image: "/assets/cards/cool-bank-la-herse.webp",
    repoStatus: "Dépôts privés, données scolaires exclues des preuves",
    liveLabel: "Démo locale sur données fictives",
    evidenceNote:
      "Preuves privées et datées : état V2 vérifié le 22/08/2026, candidate V3 vérifiée le 06/08/2026. Démonstrations et captures uniquement sur données fictives ; aucune donnée de mineur n'est publiée.",
    metaDescription:
      "Cool Bank / La Herse : V2 multijoueur local et V3 en monde 3D, trois rôles, économie serveur et interface Educool sur données fictives.",
    cardLine:
      "Deux versions documentées : V2 jouable localement, V3 prête pour recette humaine, jamais sur données réelles d'enfants.",
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
        name: "Jeu local multijoueur relié à Educool",
        status: "Jouable localement · LOCAL_SINGLE_DEVICE_READY : GO · V2_PRODUCT_COMPLETE et ONLINE_READY : NO-GO",
        summary:
          "Version web locale avec parcours élève, professeure et banquier, maisons, quêtes, économie et interface Educool reliée à Firebase.",
        evidence: [
          "État du 22/08/2026 : 12 123 tests réussis sur 12 148, 11 échecs et 14 ignorés ; les 3 échecs stables restants concernent l'i18n.",
          "Educool : 645/645 tests, TypeScript vert et build Next de 42 pages réussi.",
          "Parcours navigateur élève, professeure et banquier rejoués ; HUD, clavier et premier choix : 18/18."
        ],
        limits: [
          "Deux PC et une tablette physique, coupure Wi-Fi et audio multi-appareils restent à rejouer ensemble.",
          "Le pré-RC reste bloqué par 3 échecs i18n, 20 assets provisoires et une gate online à 87/89."
        ]
      },
      {
        label: "V3",
        name: "Monde 3D et économie centicool serveur",
        status: "Prête pour recette humaine · READY_FOR_HUMAN_RECIPE · GO_PILOTE_LOCAL : en attente",
        summary:
          "Version 3D plus ambitieuse avec 22 zones, trois rôles, économie serveur, maisons, marchands, lecture écrite et interface Educool locale.",
        evidence: [
          "Game : gate 9/9, 12 064 tests réussis et 14 ignorés ; Control : 383/383 ; Product/UI Kit : 333/333.",
          "Educool : 735 tests unitaires, 162 tests de règles Auth/Firestore et 174 tests Functions, avec builds Next et Node 20 réussis.",
          "Candidate restaurable 20260806_FINAL_RECIPE : 9 ZIP et 97 259 entrées extraites et vérifiées."
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
      "La V2 se joue déjà sur un appareil. La V3 fonctionne techniquement, mais doit encore être testée par des humains avant tout pilote.",
    summary:
      "Cool Bank transforme une banque scolaire en jeu multijoueur relié à Educool. La V2 est jouable localement. La V3 ajoute un monde 3D, mais attend encore une recette humaine.",
    stack: ["Next.js", "Firebase", "Firestore", "Cloud Functions", "TypeScript", "Vite", "Node.js", "Playwright"],
    recruiterProof: [
      "Faire évoluer un produit complexe sans mélanger les preuves de la V2 et de la V3.",
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
      "V2 : jeu local multijoueur, trois rôles, quêtes, maisons, mini-jeux et pont Educool/Firebase.",
      "V3 : monde 3D, économie centicool serveur, 22 zones, marchands, PNJ et maisons complètes.",
      "Interface Educool : authentification, rôles, règles Firestore, Cloud Functions et suivi scolaire.",
      "Harnais de tests, preuves responsive, manifestes de candidate et scripts de démarrage/arrêt locaux."
    ],
    results: [
      "V2 : LOCAL_SINGLE_DEVICE_READY ; multi-appareils physique, produit complet et mise en ligne encore NO-GO.",
      "V3 : candidate READY_FOR_HUMAN_RECIPE, pile locale démarrée, contrôlée puis arrêtée proprement.",
      "Les deux versions disposent de preuves de tests distinctes et utilisent uniquement des données fictives pour la QA publiée."
    ],
    limits: [
      "Preuve privée : code, captures complètes et données de contexte se montrent uniquement sur fixtures anonymisées.",
      "V2 n'est pas prête pour Internet ; V3 n'est pas validée comme pilote local auprès d'enfants.",
      "Les volumes de tests prouvent le comportement technique, pas l'utilité pédagogique ni l'adoption."
    ],
    gallery: [
      { src: "/assets/proof/educool/educool-dashboard.webp", caption: "Interface Educool liée au système : tableau de bord sur données fictives, sans identité d'enfant publiée.", width: 1600, height: 870 },
      { src: "/assets/proof/educool/educool-saisie-ceintures.webp", caption: "Saisie des progressions : matrice de classe anonymisée, commune au contexte métier de Cool Bank.", width: 1600, height: 873 },
      { src: "/assets/proof/educool/educool-livrets.webp", caption: "Exports pédagogiques : aperçu et génération PDF/ZIP depuis l'interface scolaire associée.", width: 1600, height: 870 },
      { src: "/assets/proof/educool/cool-bank-v2-market.webp", caption: "Marché de Cool Bank V2 lancé localement sur des données de démonstration fictives.", width: 1600, height: 1000 },
      { src: "/assets/proof/educool/cool-bank-v2-v3-worldline.webp", caption: "Schéma des deux versions : V2 relie le jeu web à Educool ; V3 sépare le monde 3D, les contrôles et l'interface scolaire.", width: 1600, height: 960 }
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
    image: "/assets/cards/capselys.webp",
    repoStatus: "Privé, projet client",
    liveLabel: "Staging (non public)",
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
      { label: "Version Markdown", href: "/projects/capselys.md" }
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
    image: "/assets/cards/iscom.webp",
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
      "Actu IA agentique publiée live le 16/06.",
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
        label: "Actu live",
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
    image: "/assets/cards/preuvia.webp",
    repoStatus: "Privé, produit commercial",
    liveLabel: "Site en ligne (preuvia.vercel.app)",
    evidenceNote:
      "Site et détail public de l'offre accessibles en ligne. Les éventuelles missions clients restent hors du périmètre des preuves publiques.",
    metaDescription:
      "Audit GEO productisé : savoir si une marque apparaît dans les réponses des IA, qui ressort à sa place, quoi publier, puis quoi re-tester au prochain audit.",
    architecture: [
      "Site et tunnel de prise de contact en Next.js, déployés et suivis en production.",
      "Protocole d'audit reproductible : un jeu de requêtes testé sur plusieurs assistants (ChatGPT, Claude, Perplexity, Gemini, Mistral).",
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
      "Un audit qui montre si les assistants IA citent une marque, qui apparaît à sa place et quoi publier avant le prochain contrôle.",
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
      { label: "Voir le site", href: "https://preuvia.vercel.app", external: true },
      { label: "Version Markdown", href: "/projects/preuvia.md" }
    ]
  },
  {
    slug: "cortex-bridge",
    title: "Cortex Bridge - ChatGPT comme cerveau d'un agent de code local",
    shortTitle: "Cortex Bridge",
    type: "Agent de code local open source piloté par ChatGPT",
    period: "Juillet - août 2026 · v0.5.2",
    role: "Conception produit, architecture, extension MV3, backend FastAPI, sécurité, QA",
    status: "Preview technique open source v0.5.2",
    evidenceLevel: "public",
    tier: 1,
    image: "/assets/cards/cortex-bridge.webp",
    repoStatus: "Repo public sous MIT : github.com/Jonassuhard/cortex-bridge",
    liveLabel: "Repo GitHub (lien)",
    evidenceNote:
      "Code public sous licence MIT. Preuve de release v0.5.2 publiée le 22/08/2026 : 434 tests backend, 127 frontend, 56 extension, 12 E2E et 4 accessibilité sans échec ; 1 test E2E ignoré.",
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
      "Preuve de release v0.5.2 du 22/08/2026 : 434 tests backend, 127 frontend, 56 extension, 12 E2E et 4 accessibilité sans échec ; 1 E2E ignoré.",
      "Dix scénarios à deux conversations exécutés sans croisement ; le brouillon du troisième writer est conservé lors du refus.",
      "Auto-diagnostic v0.5.2 validé dans un worktree jetable : installation, consentement, démarrage, API loopback et arrêt propre."
    ],
    limits: [
      "Les suites automatisées utilisent aussi des fixtures : elles ne prouvent pas une compatibilité continue avec un compte ChatGPT réel.",
      "Le transport automatique par l'interface ChatGPT entre en conflit avec les conditions du fournisseur : activation opt-in et risque de restriction du compte.",
      "Preview technique macOS/Chrome : extension installée manuellement et dépendance à un DOM externe susceptible de changer."
    ],
    gallery: [
      { src: "/assets/proof/cortex-bridge/cortex-onboarding.webp", caption: "Onboarding public de Cortex Bridge : choix du dossier local et consentement avant toute exécution.", width: 1440, height: 900 },
      { src: "/assets/proof/cortex-bridge/cortex-preflight.webp", caption: "Contrôle avant exécution : commande proposée, dossier ciblé et niveau de risque restent visibles avant validation.", width: 1440, height: 900 },
      { src: "/assets/proof/cortex-bridge/cortex-execution.webp", caption: "Trace d'exécution : chaque étape, sa sortie et son état restent consultables dans l'interface locale.", width: 1440, height: 900 }
    ],
    links: [
      {
        label: "Repo GitHub",
        href: "https://github.com/Jonassuhard/cortex-bridge",
        external: true
      },
      {
        label: "Preuve de release v0.5.2",
        href: "https://github.com/Jonassuhard/cortex-bridge/blob/64af9ce1e88dea8404acb11893eb96d75dd1baaa/docs/verification/v0.5.2.json",
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
    status: "Actif / lab · pipeline repris le 23 août 2026",
    evidenceLevel: "private",
    tier: 2,
    image: "/assets/cards/battle-engine.webp",
    video: "/assets/video/battle-engine.mp4",
    repoStatus: "Dépôt privé",
    liveLabel: "Lab",
    noindex: true,
    evidenceNote:
      "Preuve locale privée : le commit du 23/08/2026 rend la publication nightly reprenable après une interruption.",
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
    limits: ["Projet lab : automatisation créative, éloignée du poste visé, gardée comme preuve technique."],
    gallery: [
      { src: "/assets/proof/battle-engine/pipeline-resumable.webp", caption: "Schéma du pipeline reprenable : Godot rend le combat, FFmpeg et RIFE préparent la vidéo, puis l'API YouTube publie.", width: 1600, height: 960 },
      { src: "/assets/proof/battle-engine/intro-platforms.webp", caption: "Séquence d'intro : les plateformes des deux combattants et le champ de particules, rendus par un shader custom sous Godot.", width: 620, height: 1103 },
      { src: "/assets/proof/battle-engine/intro-buildup.webp", caption: "Montée du champ de particules avant le face-à-face, générée en temps réel côté moteur.", width: 620, height: 1103 }
    ],
    links: [{ label: "Version Markdown", href: "/projects/battle-engine.md" }]
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
    image: "/assets/cards/hoopsphere.webp",
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
      { src: "/assets/proof/hoopsphere/hoopsphere-product-context.webp", caption: "Section de la landing du prototype d'équipe consacrée à l'expérience communautaire. Ma contribution porte sur le marketing et le lancement.", width: 1600, height: 900 },
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
    status: "Prototype privé - publication à préparer",
    evidenceLevel: "private",
    tier: 2,
    image: "/assets/cards/rag-starter-kit.webp",
    repoStatus: "Publication prévue après anonymisation",
    liveLabel: "Démo locale",
    noindex: true,
    proofLine:
      "Une API reçoit des documents, retrouve les passages utiles et répond en citant ses sources. Les données de chaque client restent séparées.",
    summary:
      "Permettre à plusieurs clients d'interroger leurs documents sans mélanger leurs données, puis vérifier la qualité des réponses.",
    stack: ["FastAPI", "Qdrant", "Mistral AI", "LangChain", "SQLite", "pytest", "Next.js 16 / React 19", "Docker Compose"],
    recruiterProof: [
      "Recevoir plusieurs formats de documents, retrouver les bons passages et citer les sources dans la réponse.",
      "Séparer les données de chaque client sur un même serveur, avec authentification.",
      "Tester la qualité des réponses avec des cas versionnés et une suite pytest."
    ],
    constraints: [
      "Données de démonstration, secrets et identités retirés avant toute future publication.",
      "Backend unique servant plusieurs clients : isolation stricte des données par tenant."
    ],
    decisions: [
      {
        decision: "Qdrant comme base vectorielle, orchestration via LangChain.",
        why: "Stack RAG éprouvée, intégration directe avec les embeddings Mistral et les text-splitters.",
        rejected: "Recherche full-text classique sans vecteurs, insuffisante pour gérer la similarité sémantique."
      },
      {
        decision: "Module d'évaluation type Ragas avec cas de scoring versionnés.",
        why: "Mesurer la qualité du retrieval au lieu de juger les réponses à l'œil.",
        rejected: "Validation manuelle ad hoc, difficile à reproduire et à comparer entre versions."
      }
    ],
    delivered: [
      "Backend FastAPI pour recevoir les documents, retrouver les passages, répondre avec les sources, authentifier les clients et journaliser l'usage.",
      "Frontend Next.js 16 / React 19 (App Router, TypeScript, Tailwind 4).",
      "Stack dockerisée (Qdrant + backend + frontend) lançable via docker compose, + docs d'onboarding."
    ],
    results: [
      "Suite de tests pytest et jeux de cas de scoring en place pour évaluer le retrieval.",
      "Performance et qualité chiffrées du RAG : pas encore mesurées publiquement."
    ],
    limits: [
      "Code et démonstration non publics à ce jour ; l'architecture décrite n'est donc pas auditée publiquement.",
      "Le module d'évaluation fournit le harnais ; les scores de qualité ne sont pas publiés."
    ],
    gallery: [
      { src: "/assets/proof/rag-starter-kit/rag-document-pipeline.webp", caption: "Schéma du parcours d'un document : ingestion, découpage, indexation, recherche puis réponse avec ses sources.", width: 1600, height: 960 },
      { src: "/assets/proof/rag-starter-kit/rag-tenant-isolation.webp", caption: "Isolation des clients : chaque requête reste dans son espace de données et ne peut pas récupérer les documents d'un autre client.", width: 1600, height: 960 },
      { src: "/assets/proof/rag-starter-kit/rag-evaluation-loop.webp", caption: "Boucle d'évaluation : cas versionnés, mesure du retrieval, comparaison et correction avant une nouvelle exécution.", width: 1600, height: 960 }
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
    status: "POC privé initié",
    evidenceLevel: "private",
    tier: 2,
    image: "/assets/cards/board-ia-pme.webp",
    repoStatus: "Publication prévue après anonymisation",
    liveLabel: "Lab",
    noindex: true,
    proofLine:
      "Cinq agents analysent la même question avec des informations différentes. Des règles explicites regroupent leurs réponses et signalent les désaccords.",
    summary:
      "Faire ressortir les désaccords utiles entre plusieurs analyses, puis produire une synthèse dont les règles restent lisibles.",
    stack: ["Python / FastAPI", "Mistral Small + Large", "Qdrant (1 collection/agent)", "Celery + Redis", "Docker Compose"],
    recruiterProof: [
      "Donner une source différente à chaque agent pour éviter cinq réponses identiques.",
      "Regrouper les réponses avec des règles de pondération visibles plutôt qu'avec un sixième modèle opaque.",
      "Garder les données sur une infrastructure contrôlée avec Mistral et Qdrant auto-hébergé."
    ],
    constraints: [
      "Éviter le piège des comités d'agents qui se reformulent entre eux, en forçant la divergence par l'isolation des données.",
      "POC à valeur business pour PME françaises : contrainte de souveraineté des données."
    ],
    decisions: [
      {
        decision: "CIO d'agrégation déterministe (règles de pondération), pas un LLM supplémentaire.",
        why: "Rendre la synthèse traçable et reproductible plutôt que de déléguer l'arbitrage à un modèle opaque.",
        rejected: "Un 6e agent LLM de synthèse, moins traçable et susceptible de lisser les divergences."
      },
      {
        decision: "Asymétrie d'information stricte entre les 5 agents.",
        why: "Obtenir de vraies divergences exploitables au lieu d'un consensus artificiel.",
        rejected: "Agents partageant le même contexte, ce qui donne des conclusions redondantes."
      }
    ],
    delivered: [
      "Backend Python avec cinq agents spécialisés et un module qui regroupe leurs réponses selon des règles fixes.",
      "Structure d'orchestration async (Celery/Redis) et RAG Qdrant par agent.",
      "Documentation de l'architecture, du concept et de la roadmap."
    ],
    results: [
      "POC : pipeline d'agents et CIO posés ; dashboard, export PDF et tests E2E restent à implémenter.",
      "Validation sur cas client réel : pas encore mesurée."
    ],
    limits: [
      "POC initié, non terminé : le dashboard React Flow et l'export PDF décrits ne sont pas implémentés.",
      "Pas de test automatisé côté backend pour l'instant."
    ],
    gallery: [
      { src: "/assets/proof/board-ia-pme/board-isolated-agents.webp", caption: "Schéma des cinq agents : chacun reçoit une source différente pour produire de vrais points de vue séparés.", width: 1600, height: 960 },
      { src: "/assets/proof/board-ia-pme/board-orchestration.webp", caption: "Orchestration prévue : les analyses parallèles remontent vers des règles de pondération lisibles, sans sixième modèle opaque.", width: 1600, height: 960 },
      { src: "/assets/proof/board-ia-pme/board-status.webp", caption: "État honnête du POC : backend et règles posés ; dashboard, export PDF et validation client restent à construire.", width: 1600, height: 960 }
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
    status: "Lab privé",
    evidenceLevel: "private",
    tier: 3,
    image: "/assets/cards/edusemantix.webp",
    repoStatus: "Publication prévue après anonymisation",
    liveLabel: "Lab",
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
      "Projet lab plus ancien, avec une base de mots à rafraîchir et quelques correctifs à reprendre.",
      "Lab personnel, pas de démo publique maintenue.",
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
    image: "/assets/cards/pokemon-gen4-toolkit.webp",
    repoStatus: "Publication prévue après anonymisation",
    liveLabel: "Lab",
    noindex: true,
    proofLine:
      "Boîte à outils Python (ndspy) pour explorer des formats de données de jeu (textes, events, scripts, stats) et écrire ses propres outils d'édition. Aucune ROM ni asset distribué.",
    summary:
      "Explorer des formats de données de jeu et écrire mes propres outils d'édition Python, sans publier d'assets ni de ROM.",
    stack: ["Python 3", "ndspy", "Format NARC", "Moteur de texte Gen 4 maison", "EmulatorJS (viewer web)"],
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
      "Viewer web EmulatorJS avec serveur de dev configuré et notes techniques."
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
    image: "/assets/cards/claude-code-soul.webp",
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
      { src: "/assets/proof/claude-code-soul/soul-install-flow.webp", caption: "Installation du pack : audit local, choix des couches, copie contrôlée puis vérification sans donnée personnelle.", width: 1600, height: 960 }
    ],
    links: [
      { label: "Version Markdown", href: "/projects/claude-code-soul.md" },
      { label: "Repo GitHub", href: "https://github.com/Jonassuhard/claude-code-soul", external: true }
    ]
  }
];

export const featuredProjects = ["cortex-bridge", "les-petites-griffes", "educool-la-herse"]
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is Project => Boolean(project));

// Preuves recruteur découplées de la home : produit IA open source (Cortex),
// livraison client bout-en-bout (LPG), couche IA sur le sujet du poste (Preuvia).
export const recruiterFeatured = ["cortex-bridge", "les-petites-griffes", "preuvia"]
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
    proofSlugs: ["cortex-bridge", "battle-engine"],
    proofExtra: "audits Playwright, scripts Python",
    proof: "Cortex Bridge, Battle Engine, audits Playwright, scripts Python",
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
    proofSlugs: ["cortex-bridge", "les-petites-griffes", "educool-la-herse"],
    proofExtra: "ce portfolio",
    proof: "Cortex Bridge, Les Petites Griffes, Cool Bank / La Herse, ce portfolio",
    note: "Je construis des sites et des outils web, du premier écran au déploiement.",
    limit: "Surtout front et intégrations ; pas de backend distribué à forte charge."
  },
  {
    name: "Documentation / transmission",
    group: "Web & produit" as SkillGroup,
    proofSlugs: ["claude-code-soul", "educool-la-herse"],
    proofExtra: "ce portfolio",
    proof: "claude-code-soul, Cool Bank / La Herse, ce portfolio",
    note: "Je note les décisions et les étapes pour qu'une autre personne puisse reprendre le projet.",
    limit: "Documentation de projets solo ; pas encore d'onboarding formalisé sur un codebase partagé."
  },
  {
    name: "Sécurité / RGPD / limites",
    group: "IA & automatisation" as SkillGroup,
    proofSlugs: ["cortex-bridge", "educool-la-herse", "les-petites-griffes"],
    proofExtra: "",
    proof: "Cortex Bridge, Cool Bank / La Herse, Les Petites Griffes",
    note: "Je limite les droits, bloque en cas de doute, anonymise les données sensibles et garde les secrets hors du code.",
    limit: "Bonnes pratiques appliquées ; pas d'audit sécurité formel ni de conformité validée par un DPO."
  }
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
