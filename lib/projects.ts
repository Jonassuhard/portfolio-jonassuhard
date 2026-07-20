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
  title: "Chef de projet IA appliquée & automatisation junior",
  description:
    "Portfolio de Jonas Suhard, Chef de projet IA appliquée & automatisation junior : projets, décisions, limites et niveau de preuve.",
  email: "contact@jonassuhard.com",
  github: "https://github.com/Jonassuhard",
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
      "Captures anonymisées, démo privée et rapport Lighthouse interne daté du 29/06/2026. Les scores ne sont pas vérifiables publiquement sans ce rapport.",
    metaDescription:
      "Site vitrine live d'un studio de nail art : Next.js, CMS maison et assistant IA cadré. Rapport Lighthouse interne du 29/06/2026 : SEO 100.",
    cardLine:
      "Site client live, CMS maison, SEO local et assistant IA cadré. Mesures Lighthouse issues d'un rapport interne daté du 29/06/2026.",
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
      "Site client live en production, URL et démo communiquées en entretien. Rapport Lighthouse interne du 29/06/2026 : mobile 88 / SEO 100 / accessibilité 93.",
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
      "Rapport Lighthouse interne du 29/06/2026 : mobile 88, SEO 100, accessibilité 93.",
      "Site et back-office livrés pour permettre à la gérante de mettre ses contenus à jour."
    ],
    limits: [
      "Projet d'une TPE locale : vrai contexte de production, à petite échelle.",
      "Mesure business encore à consolider."
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
    title: "Educool / La Herse - app web pour une classe",
    shortTitle: "Educool / La Herse",
    type: "Application web éducation",
    period: "2026",
    role: "Développement, UX, sécurité, PDF, Firebase, maintenance",
    status: "Prod / maintenance",
    evidenceLevel: "private",
    tier: 1,
    image: "/assets/cards/educool.webp",
    repoStatus: "Privé, RGPD (données mineurs)",
    liveLabel: "Classe, non public",
    evidenceNote:
      "Captures sur données fictives et démonstration privée. L'usage en classe ne peut pas être vérifié publiquement en raison des données de mineurs.",
    metaDescription:
      "Application web utilisée en classe : suivi des compétences, livrets PDF, Firebase, données de mineurs anonymisées, opérations sensibles en Cloud Functions.",
    cardLine:
      "Application utilisée en classe : suivi de compétences, génération PDF, Firebase, données élèves anonymisées.",
    architecture: [
      "Application web / PWA Next.js utilisable sur tablette par une non-dev.",
      "Données et authentification sur Firebase / Firestore.",
      "Opérations sensibles déportées en Cloud Functions (l'autorité métier n'est pas seulement côté client).",
      "Génération de livrets PDF et export ZIP.",
      "Rules Firebase et tests (Vitest) sur les lots livrés."
    ],
    v2: [
      "Durcissement continu des rules et des audits de sécurité.",
      "Industrialisation des exports PDF."
    ],
    notMeasured: [
      "Aucune métrique élève n'est publiable (données de mineurs).",
      "Gain de temps enseignant : observé en retours terrain, non chiffré publiquement."
    ],
    proofLine:
      "Application utilisée par une classe, Firebase, données sensibles, PDF et audits de sécurité.",
    summary:
      "Application web utilisée par une enseignante en classe : suivi des compétences des élèves et génération de livrets PDF, sur Firebase, avec les opérations sensibles déportées en Cloud Functions.",
    stack: ["Next.js", "Firebase", "Firestore", "Cloud Functions", "Vitest", "PDF"],
    recruiterProof: [
      "Produit utilisé par une vraie utilisatrice avec retours terrain.",
      "Conscience sécurité sur données enfants et rules Firebase.",
      "Capacité à investiguer des bugs PDF, déploiement, auth et données."
    ],
    constraints: [
      "Données enfants strictement anonymisées.",
      "Usage tablette/PWA par une non-dev.",
      "PDF imprimables et logique métier dense."
    ],
    decisions: [
      {
        decision: "Firebase / Firestore",
        why: "Rapide pour auth, données, functions et déploiement.",
        rejected: "Backend custom trop coûteux pour le contexte."
      },
      {
        decision: "Cloud Functions pour opérations sensibles",
        why: "Éviter de mettre l'autorité métier uniquement côté client.",
        rejected: "Tout faire dans le front."
      },
      {
        decision: "Audits sécurité documentés",
        why: "Données mineurs = pas de validation au doigt mouillé.",
        rejected: "Se contenter d'un 'ça marche'."
      }
    ],
    delivered: [
      "Application web/PWA.",
      "Suivi élèves et compétences.",
      "Génération PDF et ZIP.",
      "Rules Firebase, Cloud Functions et tests.",
      "Refontes UX successives après retours."
    ],
    results: [
      "Usage en contexte de classe, données élèves strictement anonymisées.",
      "Tests documentés sur les lots livrés (génération PDF, rules, parcours).",
      "Incidents identifiés, documentés et corrigés progressivement."
    ],
    limits: [
      "Données de mineurs : rien n'est publiable, la preuve se montre sur données fictives ou en entretien.",
      "Le durcissement des règles d'accès Firebase est un chantier continu, pas un état figé."
    ],
    gallery: [
      { src: "/assets/proof/educool/educool-dashboard.webp", caption: "Tableau de bord enseignante : progression de la classe, réussite par domaine et saisie rapide. Noms masqués sur toutes les captures : données de mineurs.", width: 1600, height: 870 },
      { src: "/assets/proof/educool/educool-saisie-ceintures.webp", caption: "Saisie des ceintures : la matrice classe entière par matière, pensée pour valider un palier en quelques secondes pendant le cours.", width: 1600, height: 873 },
      { src: "/assets/proof/educool/educool-livrets.webp", caption: "Livrets élèves : aperçu, personnalisation puis export PDF, individuel ou en lot (ZIP pour toute la classe).", width: 1600, height: 870 }
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
      "Refonte du site d'un client (WordPress / Divi) sur un staging sécurisé : nouveau parcours d'adhésion, audits de rendu multi-viewports avec Playwright, et prototype d'assistant IA qui oriente vers le bon service.",
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
      { src: "/assets/proof/capselys/capselys-assistant.webp", caption: "L'assistant répond à une vraie question (DUERP) : réponse cadrée, CTA et disclaimer « réponses générées automatiquement ».", width: 900, height: 1063 }
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
      "Production éditoriale SEO dans Drupal : rédaction, fact-check claim par claim, audits de cannibalisation Semrush, validation humaine avant publication.",
    architecture: [
      "Production éditoriale SEO saisie dans Drupal (CMS sensible).",
      "Audits de cannibalisation et inter-marques via Semrush.",
      "Automatisations Playwright pour la saisie et les contrôles.",
      "Checklist de pré-publication et fact-check claim par claim avant mise en ligne."
    ],
    v2: [
      "Étendre les garde-fous qualité à d'autres types de contenus."
    ],
    notMeasured: [
      "Impact trafic SEO des contenus : suivi côté employeur, non publiable ici."
    ],
    proofLine:
      "Contenus SEO qui vont réellement en ligne dans le CMS d'un employeur, avec fact-check de chaque affirmation et validation humaine avant publication.",
    summary:
      "Production éditoriale SEO dans le Drupal d'ISCOM : rédaction et fact-check d'articles, audits de cannibalisation avec Semrush, et automatisations Playwright pour la saisie, avec validation humaine avant chaque publication.",
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
        decision: "Fact-check claim par claim",
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
      "Audit GEO productisé : mesurer qui les IA citent à la place d'une marque, comparer les écarts, puis livrer un plan de publication re-testable.",
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
      "Livrable PDF : score, sources citées, écarts et plan d'action re-testable.",
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
      { src: "/assets/proof/preuvia/preuvia-landing.webp", caption: "Landing Preuvia en ligne : la promesse (« qui les IA recommandent avant vous ») et le démonstrateur d'écart de visibilité — question posée, sources qui ressortent, marque non citée.", width: 1600, height: 921 }
    ],
    links: [
      { label: "Voir le site", href: "https://preuvia.vercel.app", external: true },
      { label: "Version Markdown", href: "/projects/preuvia.md" }
    ]
  },
  {
    slug: "battle-engine",
    title: "Battle Engine - pipeline vidéo automatisé",
    shortTitle: "Battle Engine",
    type: "Pipeline vidéo / automation",
    period: "2026",
    role: "Pipeline Python, Godot, rendu, FFmpeg, publication",
    status: "Actif / lab",
    evidenceLevel: "private",
    tier: 2,
    image: "/assets/cards/battle-engine.webp",
    video: "/assets/video/battle-engine.mp4",
    repoStatus: "Publication prévue après anonymisation",
    liveLabel: "Lab",
    noindex: true,
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
      "Pipeline Godot -> FFmpeg -> interpolation -> YouTube API pour vidéos 1VS1.",
    summary:
      "Pipeline vidéo automatisé pour une chaîne YouTube de simulations 1v1 : rendu sous Godot, montage et encodage FFmpeg, interpolation d'images avec RIFE, le tout scripté en Python.",
    stack: ["Godot", "Python", "FFmpeg", "RIFE", "YouTube API"],
    recruiterProof: [
      "Automatisation de pipeline créatif.",
      "Orchestration fichiers, rendu et publication.",
      "Passage d'une idée personnelle à un pipeline structuré."
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
    results: ["Aucune métrique d'audience citée."],
    limits: ["Projet lab : automatisation créative, éloignée du poste visé, gardée comme preuve technique."],
    gallery: [
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
    links: [{ label: "Version Markdown", href: "/projects/hoopsphere.md" }]
  },
  {
    slug: "rag-starter-kit",
    title: "RAG Starter Kit - API de retrieval augmenté multi-tenant",
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
      "API FastAPI qui ingère des documents (PDF, DOCX, Markdown, texte), les indexe dans Qdrant et répond en citant ses sources, avec auth multi-tenant et un module d'évaluation type Ragas.",
    summary:
      "Servir plusieurs clients sur un même backend RAG, en gardant les données isolées par client_id et en mesurant la qualité des réponses.",
    stack: ["FastAPI", "Qdrant", "Mistral AI", "LangChain", "SQLite", "pytest", "Next.js 16 / React 19", "Docker Compose"],
    recruiterProof: [
      "Architecture RAG complète de bout en bout, avec ingestion multi-format, indexation vectorielle et génération avec citation des sources.",
      "Isolation multi-tenant (un backend, plusieurs clients séparés par client_id) avec couche d'auth.",
      "Module d'évaluation de la qualité des réponses inspiré de Ragas, avec cas de scoring versionnés et suite pytest."
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
      "Backend FastAPI : ingestion, retriever, chat avec sources, auth multi-tenant, logs d'usage et d'audit.",
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
      "POC d'audit stratégique pour TPE/PME : 5 agents Mistral analysent une question, chacun avec sa donnée exclusive (asymétrie d'information), puis un CIO déterministe agrège les verdicts par niveau de confiance.",
    summary:
      "Faire émerger de vraies divergences d'analyse plutôt qu'une synthèse lissée, en privant chaque agent de la vue des autres et en agrégeant via des règles explicites.",
    stack: ["Python / FastAPI", "Mistral Small + Large", "Qdrant (1 collection/agent)", "Celery + Redis", "Docker Compose"],
    recruiterProof: [
      "Conception d'un système multi-agents avec asymétrie d'information : chaque agent (financier, marché, client, ops, macro) a sa donnée exclusive.",
      "Agrégation par un CIO déterministe à pondération explicite plutôt qu'un 6e LLM, avec quality gate sur le niveau de confiance.",
      "Architecture orientée souveraineté des données (Mistral, Qdrant self-hosted)."
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
      "Backend Python : 5 agents spécialisés, CIO déterministe, orchestrateur run_board.",
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
    links: [
      { label: "Version Markdown", href: "/projects/claude-code-soul.md" },
      { label: "Repo GitHub", href: "https://github.com/Jonassuhard/claude-code-soul", external: true }
    ]
  }
];

export const featuredProjects = ["les-petites-griffes", "educool-la-herse", "iscom"]
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is Project => Boolean(project));

// Preuves recruteur découplées de la home : contexte employeur (ISCOM), livraison
// client bout-en-bout (LPG), couche IA sur le sujet exact du poste (Preuvia).
export const recruiterFeatured = ["iscom", "les-petites-griffes", "preuvia"]
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is Project => Boolean(project));

export const skills = [
  {
    name: "SEO / contenu / CMS",
    proofSlugs: ["iscom", "capselys", "les-petites-griffes"],
    proofExtra: "",
    proof: "ISCOM, Capsélys, Les Petites Griffes",
    note: "Recherche, structure, maillage, production éditoriale dans Drupal, vérification et publication encadrée.",
    limit: "Pas encore de programmatic SEO à grande échelle ni de domaine à fort trafic historisé."
  },
  {
    name: "Automatisation / QA / Playwright",
    proofSlugs: ["battle-engine"],
    proofExtra: "audits Playwright, scripts Python",
    proof: "Battle Engine, audits Playwright, scripts Python",
    note: "Pipelines Python, audits Playwright multi-viewports, génération et contrôles automatisés.",
    limit: "Automatisation de projets perso ; pas encore de QA en CI/CD dans une équipe multi-dev."
  },
  {
    name: "IA appliquée / workflows LLM",
    proofSlugs: ["capselys", "les-petites-griffes", "iscom"],
    proofExtra: "RAG Starter Kit, Board IA PME",
    proof: "Capsélys, Les Petites Griffes, ISCOM",
    note: "Assistants cadrés, workflows LLM, fact-check, détection d'hallucinations et garde-fous avant publication.",
    limit: "POC et projets cadrés ; pas encore de LLM en production sous charge avec SLA."
  },
  {
    name: "Full-stack web",
    proofSlugs: ["les-petites-griffes", "educool-la-herse"],
    proofExtra: "ce portfolio",
    proof: "Les Petites Griffes, Educool, ce portfolio",
    note: "Next.js, React, pages publiques, CMS léger, rendu statique, déploiement et production.",
    limit: "Surtout front et intégrations ; pas de backend distribué à forte charge."
  },
  {
    name: "Documentation / transmission",
    proofSlugs: ["claude-code-soul", "educool-la-herse"],
    proofExtra: "ce portfolio",
    proof: "claude-code-soul, Educool, ce portfolio",
    note: "Décisions écrites, cadres réutilisables, fichiers lisibles par un agent ; un travail qu'un autre reprend.",
    limit: "Documentation de projets solo ; pas encore d'onboarding formalisé sur un codebase partagé."
  },
  {
    name: "Sécurité / RGPD / limites",
    proofSlugs: ["educool-la-herse", "les-petites-griffes"],
    proofExtra: "",
    proof: "Educool, Les Petites Griffes",
    note: "Données sensibles et mineurs anonymisées, secrets hors du code, règles d'accès, prudence de publication.",
    limit: "Bonnes pratiques appliquées ; pas d'audit sécurité formel ni de conformité validée par un DPO."
  }
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
