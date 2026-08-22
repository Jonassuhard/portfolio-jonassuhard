export const contentReviewDate = "2026-08-15";
export const contentReviewDateLabel = "15 août 2026";

export type ClaimStatus =
  | "publicly-verified"
  | "private-evidence"
  | "self-declared"
  | "removed-pending-proof";

export type VerificationItem = {
  id: string;
  claim: string;
  scope: string;
  status: ClaimStatus;
  checkedAt: string;
  sourceLabel?: string;
  sourceHref?: string;
  note: string;
};

export const claimStatusMeta: Record<
  ClaimStatus,
  { label: string; description: string }
> = {
  "publicly-verified": {
    label: "Vérifié publiquement",
    description: "Une source publique directe permet de contrôler l'affirmation."
  },
  "private-evidence": {
    label: "Preuve privée",
    description: "La preuve est annoncée comme montrable en entretien, mais n'est pas publiée."
  },
  "self-declared": {
    label: "Déclaratif",
    description: "Il s'agit d'une intention ou d'une information personnelle, pas d'un fait tiers."
  },
  "removed-pending-proof": {
    label: "Retiré en attente de preuve",
    description: "La formulation chiffrée ou publique n'est plus utilisée tant que sa source manque."
  }
};

export const verificationItems: VerificationItem[] = [
  {
    id: "target-role",
    claim: "Recherche d'un CDI junior à Paris ou en hybride à partir du 1er septembre 2026.",
    scope: "Positionnement",
    status: "self-declared",
    checkedAt: contentReviewDate,
    note: "Intention professionnelle déclarée par Jonas Suhard."
  },
  {
    id: "rncp-41809",
    claim: "Le titre RNCP41809 « Manager de la stratégie marketing digital » est un niveau 7 actif.",
    scope: "Formation",
    status: "publicly-verified",
    checkedAt: contentReviewDate,
    sourceLabel: "France Compétences — RNCP41809",
    sourceHref: "https://www.francecompetences.fr/recherche/rncp/41809/",
    note: "Le portfolio indique que Jonas prépare le titre ; il ne prétend pas l'avoir déjà obtenu."
  },
  {
    id: "rncp-34340",
    claim: "Le titre RNCP34340 « Chef de projet e-business » correspond à un niveau 6 historique.",
    scope: "Formation",
    status: "private-evidence",
    checkedAt: contentReviewDate,
    sourceLabel: "France Compétences — RNCP34340",
    sourceHref: "https://www.francecompetences.fr/recherche/RNCP/34340/",
    note: "La fiche publique vérifie le titre ; l'obtention personnelle doit être confirmée par le diplôme."
  },
  {
    id: "iscom-article",
    claim: "L'article associé à l'étude de cas ISCOM est accessible publiquement sur iscom.fr.",
    scope: "Expérience",
    status: "publicly-verified",
    checkedAt: contentReviewDate,
    sourceLabel: "Article ISCOM",
    sourceHref: "https://www.iscom.fr/actualites/lia-change-de-role-les-communicants-aussi",
    note: "Le lien public prouve la publication, pas l'ensemble des tâches internes décrites."
  },
  {
    id: "preuvia-live",
    claim: "L'offre Preuvia et sa méthode d'audit GEO sont présentées sur un site public.",
    scope: "Projet",
    status: "publicly-verified",
    checkedAt: contentReviewDate,
    sourceLabel: "Preuvia",
    sourceHref: "https://preuvia.vercel.app/",
    note: "Aucun volume de clients ni résultat commercial n'est revendiqué dans le portfolio."
  },
  {
    id: "cortex-bridge-repo",
    claim: "Le code de Cortex Bridge est public sur GitHub sous licence MIT.",
    scope: "Projet",
    status: "publicly-verified",
    checkedAt: "2026-08-22",
    sourceLabel: "Repo GitHub Cortex Bridge",
    sourceHref: "https://github.com/Jonassuhard/cortex-bridge",
    note: "Le dépôt public, sa branche principale et sa licence ont été contrôlés le 22/08/2026."
  },
  {
    id: "cortex-bridge-release-0-5-2",
    claim: "La preuve de release Cortex Bridge v0.5.2 rapporte 434 tests backend, 127 frontend, 56 extension, 12 E2E et 4 accessibilité sans échec ; un test E2E est ignoré.",
    scope: "Projet",
    status: "publicly-verified",
    checkedAt: "2026-08-22",
    sourceLabel: "Preuve de release Cortex Bridge v0.5.2",
    sourceHref: "https://github.com/Jonassuhard/cortex-bridge/blob/64af9ce1e88dea8404acb11893eb96d75dd1baaa/docs/verification/v0.5.2.json",
    note: "Résultats automatisés datés et publiés dans le dépôt. Le document signale un environnement de simulation ; il ne prouve pas une compatibilité continue avec ChatGPT."
  },
  {
    id: "lpg-live-audit-2026-08-01",
    claim: "L'audit live du 2026-08-01 couvre 18 pages publiques contrôlées à 390 px et 1440 px, 36 captures pleine page, 30 images uniques chargées sur le live et cinq scores de performance Lighthouse mobile : Accueil 91, Galerie 87, Compose 97, Méthode 97, Le studio 66.",
    scope: "Projet",
    status: "private-evidence",
    checkedAt: contentReviewDate,
    note: "Projet familial non facturé ; aucune vente à un client externe n'est prouvée ; mesures datées du 2026-08-01, non continues."
  },
  {
    id: "cool-bank-la-herse-versions",
    claim: "Cool Bank / La Herse distingue une V2 au statut LOCAL_SINGLE_DEVICE_READY et une V3 au statut READY_FOR_HUMAN_RECIPE.",
    scope: "Projet",
    status: "private-evidence",
    checkedAt: "2026-08-22",
    note: "États vérifiés dans les sources locales V2 du 22/08/2026 et V3 du 06/08/2026. Les démonstrations utilisent des données fictives ; aucune donnée de mineur n'est publiée."
  },
  {
    id: "non-public-projects",
    claim: "Le code de RAG Starter Kit, Board IA PME, Edusemantix et Pokémon Gen-4 Toolkit n'est pas public à ce jour.",
    scope: "Projets",
    status: "removed-pending-proof",
    checkedAt: contentReviewDate,
    note: "Aucun dépôt GitHub précis n'est revendiqué tant qu'un lien public vérifiable n'est pas disponible."
  },
  {
    id: "hoopsphere-metrics",
    claim: "Les métriques Instagram, emailing, bêta-testeurs et la publication Google Play de HoopSphere ne sont plus citées.",
    scope: "Projet",
    status: "removed-pending-proof",
    checkedAt: contentReviewDate,
    note: "Ces chiffres ont été retirés des contenus citables jusqu'à fourniture d'exports et d'un lien public."
  },
  {
    id: "anthropic-training",
    claim: "Parcours de formation Anthropic Academy autour de Claude et du développement d'applications.",
    scope: "Formation",
    status: "self-declared",
    checkedAt: contentReviewDate,
    sourceLabel: "Anthropic Academy",
    sourceHref: "https://www.anthropic.com/learn/build-with-claude",
    note: "Le portfolio parle de formation en cours, pas de certification obtenue."
  }
];
