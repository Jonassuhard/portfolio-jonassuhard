export type ProjectTier = 1 | 2 | 3;

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  type: string;
  period: string;
  role: string;
  status: string;
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
  cardLine?: string;
  video?: string;
  noindex?: boolean;
  links: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
};

// Origine canonique unique : env en prod (jonassuhard.com dès SSL), sinon URL Vercel live.
// Pilote metadataBase, sitemap, robots et JSON-LD pour qu'ils pointent tous la même origine crawlable.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-jonassuhard.vercel.app"
).replace(/\/$/, "");

export const site = {
  name: "Jonas Suhard",
  title: "Builder IA appliquée & Growth Engineer",
  description:
    "Portfolio de Jonas Suhard : projets réels, décisions, contraintes, stacks et résultats — profil hybride marketing, IA appliquée et développement full-stack.",
  email: "contact@jonassuhard.com",
  github: "https://github.com/Jonassuhard",
  linkedin: "https://www.linkedin.com/in/jonas-suhard-b73923245/",
  malt: "https://www.malt.fr/profile/jonassuhard",
  location: "Paris, France",
  availability: "1er octobre 2026",
  cvClassic: "/cv.pdf",
  cvStyled: "/cv-portfolio.pdf"
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
    tier: 1,
    image: "/assets/cards/les-petites-griffes.webp",
    repoStatus: "Privé — code et données client",
    liveLabel: "Live · URL communiquée en entretien",
    evidenceNote:
      "Captures anonymisées (home, CMS, assistant IA) et démo courte sur demande ou en entretien ; rapport Lighthouse daté disponible.",
    cardLine:
      "Site client live, CMS maison, SEO local et assistant IA cadré. Signaux : prod réelle, contenus éditables, Lighthouse mobile 88 / SEO 100 / a11y 93.",
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
      "Site client live en production (URL communiquée en entretien · captures anonymisées sur demande), CMS maison, SEO local, assistant IA cadré, Lighthouse mobile 88 / SEO 100 / a11y 93 (audit revérifié le 29/06).",
    summary:
      "Transformer une activité Instagram en présence web crédible, éditable et utile pour les demandes clientes.",
    stack: ["Next.js", "React", "Supabase", "Clerk", "Vercel", "LLM"],
    recruiterProof: [
      "Livraison d'un site public réel avec domaine et contraintes de production.",
      "Connexion entre SEO local, UX de conversion, CMS et assistant IA.",
      "Gestion d'incidents: domaine .fr, données DB, prix, galerie, cohérentisation contenu."
    ],
    constraints: [
      "Budget quasi nul et besoin d'autonomie côté cliente.",
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
      "Lighthouse mobile 88, SEO 100, accessibilité 93 (audit revérifié le 29/06).",
      "Site client live en production, URL masquée publiquement pour confidentialité (captures anonymisées sur demande).",
      "Back-office utilisable par la cliente."
    ],
    limits: [
      "Projet client réel (TPE) : vrai contexte utilisateur en production, pas un client enterprise.",
      "Mesure business encore à consolider.",
      "Captures dashboards et adresse précise non publiables (confidentialité cliente)."
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
    tier: 1,
    image: "/assets/cards/educool.webp",
    repoStatus: "Privé — RGPD (données mineurs)",
    liveLabel: "Classe, non public",
    evidenceNote:
      "Captures anonymisées sur données fictives et démo sur demande ; aucune donnée élève réelle n'est publiée.",
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
      "Construire un produit terrain pour une enseignante: suivi de compétences, livrets, PDF, PWA et logique métier scolaire.",
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
        rejected: "Se contenter d'un 'ca marche'."
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
      "Aucune donnée élève ne doit apparaître publiquement.",
      "Certaines phases sécurité sont à contextualiser finement.",
      "Projet très dense: la case study doit rester lisible."
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
    tier: 1,
    image: "/assets/cards/capselys.webp",
    repoStatus: "Privé — projet client",
    liveLabel: "Staging (non public)",
    evidenceNote:
      "Captures du staging et présentation client (14 slides) sur demande ; mesures lab, pas une prod.",
    cardLine:
      "Refonte de conversion en staging : audit UX, parcours d'adhésion et prototype d'assistant IA.",
    architecture: [
      "WordPress + Divi imposés ; refonte sur un environnement de staging sécurisé.",
      "Audits de rendu multi-viewports via Playwright (le DOM Divi ne suffit pas à prouver le visuel).",
      "Déploiement séquentiel sur staging pour ne pas casser la prod client.",
      "Prototype d'assistant IA qualifiant orientant vers le bon service."
    ],
    v2: [
      "Passage en production après validation client.",
      "Mesure des retombées conversion une fois en ligne."
    ],
    notMeasured: [
      "Retombées business (conversion, adhésions) : non mesurées — staging, pas une prod utilisée.",
      "Les gains attendus restent des hypothèses à valider après déploiement."
    ],
    proofLine:
      "Refonte orientée conversion, staging WordPress sécurisé, présentation orale client et audits multi-viewports.",
    summary:
      "Clarifier une offre complexe, réduire la friction d'adhésion et tester un parcours de conversion avec un assistant IA cadré.",
    stack: ["WordPress", "Divi", "Playwright", "PHP", "PDF", "LLM workflows"],
    recruiterProof: [
      "Cadrage client et conversion, pas seulement exécution front.",
      "Capacité à travailler avec une stack contrainte et vieillissante.",
      "Présentation honnête: staging, mesures lab, limites et plan d'action."
    ],
    constraints: [
      "Staging, pas prod finale.",
      "Client présent à l'oral MBA.",
      "WordPress/Divi impose et risques de régression visuelle."
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
      "Mesures business réelles à qualifier après déploiement."
    ],
    limits: [
      "Ne pas dire que le staging est une prod utilisée.",
      "Retombées business non disponibles à court terme.",
      "Certaines décisions dépendent de validation client."
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
    tier: 1,
    image: "/assets/cards/iscom.webp",
    repoStatus: "CMS employeur — non publiable",
    liveLabel: "Actu publiée (lien)",
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
      "Production SEO dans Drupal, audits de cannibalisation et garde-fous de publication avant mise en ligne.",
    summary:
      "Produire et corriger du contenu SEO dans un CMS sensible, avec exigences marque, vérification et validation humaine.",
    stack: ["Drupal", "Playwright", "Semrush", "SEO", "LLM-assisted QA"],
    recruiterProof: [
      "Production à volume avec contrôle qualité.",
      "Capacité à transformer un audit SEO en décisions nommées.",
      "Discipline sur actions sensibles: ne pas publier sans validation."
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
      "Ne pas publier accès CMS ni données internes.",
      "Ne pas sur-vendre l'automatisation: validation humaine obligatoire.",
      "Certaines preuves restent confidentielles."
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
    role: "Conception produit, méthode d'audit, site, livraison client",
    status: "En activité - premiers audits livrés",
    tier: 1,
    image: "/assets/cards/preuvia.webp",
    repoStatus: "Privé - produit commercial",
    liveLabel: "Site en ligne (preuvia.vercel.app)",
    evidenceNote:
      "Détail de l'offre et exemple de sortie d'audit sur le site ; la méthode interne n'est pas publiée.",
    architecture: [
      "Site et tunnel de prise de contact en Next.js, déployés et suivis en production.",
      "Protocole d'audit reproductible : un jeu de requêtes testé sur plusieurs assistants (ChatGPT, Claude, Perplexity, Gemini, Mistral).",
      "Comparaison des sources citées (concurrents, comparatifs, forums) pour situer la marque.",
      "Livrable PDF structuré : score de visibilité, écarts, contenus et balisage à publier."
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
      "Offre productisée d'audit GEO : identifier qui les IA citent à la place d'une marque, puis livrer les contenus à publier.",
    summary:
      "Aider une marque à savoir si elle apparaît dans les réponses des assistants IA, qui ressort à sa place, et quoi publier pour augmenter ses chances d'être reprise.",
    stack: ["Next.js", "GEO / AEO", "LLM multi-modèles", "Schema JSON-LD", "PDF"],
    recruiterProof: [
      "Produit pensé de bout en bout : positionnement, offre, site, livraison.",
      "Maîtrise concrète de l'optimisation pour les moteurs de réponse IA - le sujet même de ce portfolio.",
      "Premiers audits clients réels livrés, pas une démo."
    ],
    constraints: [
      "Sujet mouvant : les réponses des IA varient selon le modèle, le prompt et le moment.",
      "Promesse honnête imposée : ne jamais garantir l'apparition dans les IA.",
      "Méthode et template d'audit = actif commercial, non publiés."
    ],
    decisions: [
      {
        decision: "Offre productisée plutôt que SaaS",
        why: "Livrer une valeur claire et facturable tout de suite, sans construire une plateforme avant d'avoir des clients.",
        rejected: "Développer un outil de monitoring self-service d'emblée."
      },
      {
        decision: "Promesse explicitement non garantie",
        why: "Crédibilité : personne ne contrôle ce que les modèles citent.",
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
      "Livrable PDF : score, sources citées, plan d'action.",
      "Premiers mini-audits et audits clients livrés."
    ],
    results: [
      "Premiers audits clients livrés en conditions réelles.",
      "Méthode et livrable stabilisés sur des cas concrets.",
      "Ce portfolio est lui-même optimisé selon cette méthode (llms.txt, profile.json, données structurées)."
    ],
    limits: [
      "Ne garantit pas l'apparition dans les réponses IA.",
      "Résultats dépendants du modèle, du prompt et du moment du test.",
      "Méthode interne volontairement non détaillée ici."
    ],
    links: [
      { label: "Voir le site", href: "https://preuvia.vercel.app", external: true },
      { label: "Version Markdown", href: "/projects/preuvia.md" }
    ]
  },
  {
    slug: "battle-engine",
    title: "Battle Engine - pipeline vidéo automatise",
    shortTitle: "Battle Engine",
    type: "Pipeline vidéo / automation",
    period: "2026",
    role: "Pipeline Python, Godot, rendu, FFmpeg, publication",
    status: "Actif / lab",
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
      "Automatiser une chaîne de production vidéo, utile comme preuve Python/pipeline, pas comme argument principal recruteur.",
    stack: ["Godot", "Python", "FFmpeg", "RIFE", "YouTube API"],
    recruiterProof: [
      "Automatisation de pipeline creatif.",
      "Orchestration fichiers, rendu et publication.",
      "Capacité à industrialiser une idée personnelle."
    ],
    constraints: ["Contenu lab à cadrer pour ne pas brouiller le positionnement CDI."],
    decisions: [
      {
        decision: "Le garder en Tier 2",
        why: "Bonne preuve technique, mais moins directement recruteur marketing IA.",
        rejected: "Le mettre en premiere ligne."
      }
    ],
    delivered: ["Pipeline de rendu", "Vidéos publiées", "Scripts d'automatisation"],
    results: ["Audience YouTube à vérifier avant publication finale."],
    limits: ["Ne pas laisser le côté meme-content dominer le portfolio."],
    links: [{ label: "Version Markdown", href: "/projects/battle-engine.md" }]
  },
  {
    slug: "hoopsphere",
    title: "HoopSphere - prototype produit MBA",
    shortTitle: "HoopSphere",
    type: "Prototype produit",
    period: "2025 - 2026",
    role: "Produit, personas, prototype, OCR",
    status: "Archive / MBA",
    tier: 3,
    image: "/assets/cards/hoopsphere.webp",
    repoStatus: "Publication prévue après anonymisation",
    liveLabel: "Lab / archive",
    noindex: true,
    architecture: [
      "Prototype mobile React Native, backend Firebase, OCR via un service FastAPI."
    ],
    v2: [
      "Aucune suite prévue — gardé comme autopsie produit honnête."
    ],
    notMeasured: [
      "Aucune traction marché ni revenu : projet scolaire."
    ],
    proofLine:
      "Prototype mobile basket amateur, utile pour montrer raisonnement produit et limites.",
    summary:
      "Projet MBA à garder comme autopsie utile : idée, personas, prototype, limites.",
    stack: ["React Native", "Firebase", "FastAPI", "OCR"],
    recruiterProof: [
      "Raisonnement produit.",
      "Capacité à documenter aussi ce qui n'a pas marché.",
      "Lien business/tech."
    ],
    constraints: ["Projet scolaire, pas traction marche."],
    decisions: [
      {
        decision: "Le présenter comme archive honnête",
        why: "La lucidite vaut mieux que le pitch startup vide.",
        rejected: "Le vendre comme SaaS abouti."
      }
    ],
    delivered: ["Prototype", "Personas", "Analyse marche"],
    results: ["Support MBA, pas preuve commerciale."],
    limits: ["Pas de traction payante."],
    links: [{ label: "Version Markdown", href: "/projects/hoopsphere.md" }]
  },
  {
    slug: "rag-starter-kit",
    title: "RAG Starter Kit - API de retrieval augmenté multi-tenant",
    shortTitle: "RAG Starter Kit",
    type: "Projet perso / preuve technique",
    period: "2026",
    role: "Conception et développement (full-stack)",
    status: "Copie publique anonymisée",
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
      "Architecture RAG complète de bout en bout : ingestion multi-format, indexation vectorielle, génération avec citation des sources.",
      "Isolation multi-tenant (un backend, plusieurs clients séparés par client_id) avec couche d'auth.",
      "Module d'évaluation de la qualité des réponses inspiré de Ragas, avec cas de scoring versionnés et suite pytest."
    ],
    constraints: [
      "Données clients, secrets et identités réelles retirés pour publier le code comme projet.",
      "Backend unique servant plusieurs clients : isolation stricte des données par tenant."
    ],
    decisions: [
      {
        decision: "Qdrant comme base vectorielle, orchestration via LangChain.",
        why: "Stack RAG éprouvée, intégration directe avec les embeddings Mistral et les text-splitters.",
        rejected: "Recherche full-text classique sans vecteurs - insuffisante pour de la similarité sémantique."
      },
      {
        decision: "Module d'évaluation type Ragas avec cas de scoring versionnés.",
        why: "Mesurer la qualité du retrieval au lieu de juger les réponses à l'œil.",
        rejected: "Validation manuelle ad hoc - non reproductible, non comparable entre versions."
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
      "Copie anonymisée : données et clients réels remplacés par des placeholders, pas de démo publique hébergée.",
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
    status: "POC initié - copie publique anonymisée",
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
      "Agrégation par un CIO déterministe (pondération explicite, pas un 6e LLM) avec quality gate sur le niveau de confiance.",
      "Architecture orientée souveraineté des données (Mistral, Qdrant self-hosted)."
    ],
    constraints: [
      "Éviter le piège des comités d'agents qui se reformulent entre eux : forcer la divergence par l'isolation des données.",
      "POC à valeur business pour PME françaises : contrainte de souveraineté des données."
    ],
    decisions: [
      {
        decision: "CIO d'agrégation déterministe (règles de pondération), pas un LLM supplémentaire.",
        why: "Rendre la synthèse traçable et reproductible plutôt que de déléguer l'arbitrage à un modèle opaque.",
        rejected: "Un 6e agent LLM de synthèse - moins traçable, risque de re-lissage des divergences."
      },
      {
        decision: "Asymétrie d'information stricte entre les 5 agents.",
        why: "Obtenir de vraies divergences exploitables au lieu d'un consensus artificiel.",
        rejected: "Agents partageant le même contexte - conclusions redondantes."
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
    status: "Copie publique anonymisée",
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
        rejected: "Appel à une API d'embeddings à chaque proposition - latence et coût incompatibles avec le temps réel."
      }
    ],
    delivered: [
      "Application React + serveur Node/Socket.io avec moteur de jeu et scoring sémantique.",
      "Scripts Python de génération/pré-calcul des vecteurs."
    ],
    results: ["Jeu fonctionnel déployable.", "Audience / engagement : pas encore mesurés."],
    limits: [
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
    status: "Copie publique anonymisée (ROM non incluse)",
    tier: 3,
    image: "/assets/cards/pokemon-gen4-toolkit.webp",
    repoStatus: "Publication prévue après anonymisation",
    liveLabel: "Lab",
    noindex: true,
    proofLine:
      "Boîte à outils Python (ndspy) pour explorer des formats de données de jeu (textes, events, scripts, stats) et écrire ses propres outils d'édition — aucune ROM ni asset distribué.",
    summary:
      "Explorer des formats de données de jeu et écrire mes propres outils d'édition Python, sans publier d'assets ni de ROM.",
    stack: ["Python 3", "ndspy", "Format NARC", "Moteur de texte Gen 4 maison", "EmulatorJS (viewer web)"],
    recruiterProof: [
      "Reverse-engineering d'un format binaire propriétaire : décodage/encodage du texte chiffré Gen 4 (charmap + chiffrement seed/XOR) écrit à la main.",
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
        rejected: "Éditeurs ROM grand public - boîtes noires, peu scriptables."
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
      "Sécurité by design : Touch ID sur actions sensibles, secrets via Keychain, rédaction des secrets dans les transcrits, règle 0 PII / 0 chemin perso.",
      "Publication open source propre (MIT) avec crédits explicites des packs tiers exclus."
    ],
    constraints: [
      "Publier une config personnelle sans fuiter de données : 0 PII, 0 secret, 0 chemin absolu personnel.",
      "Rester une couche par-dessus Claude Code, pas une refonte de l'outil."
    ],
    decisions: [
      {
        decision: "Séparer soul.md (identité/ton) de la config technique.",
        why: "Pattern communautaire : isoler l'âme de la config rend les deux plus lisibles et réutilisables.",
        rejected: "Tout mélanger dans un seul fichier - illisible et non réutilisable."
      },
      {
        decision: "Lazy-load des MCP, LaunchAgents et agents lourds (à la demande, pas au startup).",
        why: "Réduire la consommation de tokens et de RAM au démarrage.",
        rejected: "Tout charger au startup - coût tokens/RAM inutile."
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

export const featuredProjects = projects.filter((project) =>
  ["les-petites-griffes", "educool-la-herse", "capselys"].includes(project.slug)
);

export const skills = [
  {
    name: "SEO / contenu",
    proofSlugs: ["iscom", "capselys", "les-petites-griffes"],
    proofExtra: "",
    proof: "ISCOM, Capsélys, Les Petites Griffes",
    note: "Recherche, structure, maillage, Drupal, vérification et publication encadrée."
  },
  {
    name: "Next.js / React",
    proofSlugs: ["les-petites-griffes", "educool-la-herse"],
    proofExtra: "ce portfolio",
    proof: "Les Petites Griffes, Educool, ce portfolio",
    note: "Interfaces utiles, pages publiques, routes, rendu statique et production."
  },
  {
    name: "IA générative",
    proofSlugs: ["capselys", "les-petites-griffes"],
    proofExtra: "RAG / workflows LLM",
    proof: "Capsélys, Les Petites Griffes, RAG / workflows LLM",
    note: "Assistants cadrés, workflows LLM, fact-check et garde-fous métier."
  },
  {
    name: "Automatisation",
    proofSlugs: ["battle-engine"],
    proofExtra: "audits Playwright, scripts Python",
    proof: "Battle Engine, audits Playwright, scripts Python",
    note: "Pipelines Python, Playwright, génération, contrôles et vérification."
  },
  {
    name: "Produit / arbitrage",
    proofSlugs: ["educool-la-herse", "capselys", "hoopsphere"],
    proofExtra: "",
    proof: "Educool, Capsélys, HoopSphere",
    note: "Contraintes terrain, décisions documentées et compromis assumés."
  },
  {
    name: "Sécurité / données",
    proofSlugs: ["educool-la-herse", "les-petites-griffes"],
    proofExtra: "",
    proof: "Educool, Les Petites Griffes",
    note: "Données sensibles, authentification, règles d'accès, anonymisation et prudence de publication."
  },
  {
    name: "Orchestration multi-modèles & QA IA",
    proofSlugs: ["board-ia-pme", "rag-starter-kit", "iscom"],
    proofExtra: "",
    proof: "Board IA PME, RAG Starter Kit, ISCOM",
    note: "Un modèle par tâche, détection d'hallucinations, refus de publier sans vérification — de l'ingénierie LLM, pas un wrapper GPT."
  },
  {
    name: "Design & direction artistique",
    proofSlugs: ["les-petites-griffes", "battle-engine"],
    proofExtra: "ce portfolio",
    proof: "Les Petites Griffes, Battle Engine, ce portfolio",
    note: "3 ans d'animation 2D/3D (Human Académie) + Suite Adobe ; je conçois la DA et produis les visuels moi-même."
  }
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

