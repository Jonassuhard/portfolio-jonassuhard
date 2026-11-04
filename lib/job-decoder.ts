import taxonomyJson from "./job-decoder-contract/job-decoder-taxonomy.json";


export type AxisName = "relation" | "technical" | "position";
export type Confidence = "clear" | "mixed" | "insufficient";
export type Seniority = "true-junior" | "inflated-junior" | "confirmed" | "senior" | "unknown";
export type EvidenceCoverage = "existing" | "partial" | "missing";
export type ApplicationSignal = "coherent" | "investigate" | "large-gap";

type Rule = { id: string; target: string; weight: number; label?: string; patterns: string[]; negative_patterns?: string[] };
type AxisDefinition = { label: string; values: string[]; rules: Rule[] };
type Taxonomy = {
  taxonomy_version: string;
  confidence: { clear_min: number; clear_margin: number; mixed_min: number; max_citations: number; citation_length: number };
  axes: Record<AxisName, AxisDefinition>;
  seniority_rules: Rule[];
  evidence_categories: Record<string, string>;
};

export type AxisResult = {
  value: string;
  confidence: Confidence;
  scores: Record<string, number>;
  citations: string[];
};

export type EvidenceMatch = {
  id: string;
  label: string;
  coverage: EvidenceCoverage;
  project?: { label: string; href: string };
  note: string;
};

export type JobDecoderResult = {
  axes: Record<AxisName, AxisResult>;
  seniority: Seniority;
  expectedEvidence: EvidenceMatch[];
  applicationSignal: ApplicationSignal;
  signalReasons: string[];
  caveats: string[];
  taxonomyVersion: string;
};

const taxonomy = taxonomyJson as Taxonomy;

const PROFILE_EVIDENCE: Record<string, Omit<EvidenceMatch, "id" | "label">> = {
  "deployed-system": { coverage: "existing", project: { label: "Les Petites Griffes", href: "/projets/les-petites-griffes" }, note: "Site et CMS livrés à une cliente." },
  "evaluation-tests": { coverage: "existing", project: { label: "Preuvia", href: "/projets/preuvia" }, note: "Protocole d'évaluation multi-modèles documenté." },
  "rag-agents": { coverage: "partial", project: { label: "RAG Starter Kit", href: "/projets/rag-starter-kit" }, note: "Prototype historique audité, source à restaurer et aucune exécution actuelle revendiquée." },
  "security-governance": { coverage: "partial", project: { label: "Cool Bank / La Herse", href: "/projets/educool-la-herse" }, note: "Garde-fous sur données sensibles, sans fonction de conformité formelle." },
  "infrastructure-cloud": { coverage: "partial", project: { label: "Battle Engine", href: "/projets/battle-engine" }, note: "Pipeline automatisé ; expérience MLOps de production non revendiquée." },
  "domain-knowledge": { coverage: "existing", project: { label: "ISCOM", href: "/projets/iscom" }, note: "Workflow métier et validation humaine en environnement professionnel." },
  "client-change": { coverage: "existing", project: { label: "Capsélys", href: "/projets/capselys" }, note: "Audit, atelier et transmission côté client." },
  "measured-outcomes": { coverage: "partial", project: { label: "Preuvia", href: "/projets/preuvia" }, note: "Mesures structurées ; aucun volume client inventé." },
  "model-training": { coverage: "missing", note: "Aucune preuve publique d'entraînement de modèles fondamentaux." }
};

export const AXIS_LABELS: Record<AxisName, string> = {
  relation: "Relation à l'IA",
  technical: "Nature technique",
  position: "Position dans l'organisation"
};

export const VALUE_LABELS: Record<string, string> = {
  "applied-ai": "IA appliquée",
  "ai-infrastructure": "Infrastructure IA",
  "rebranded-role": "Métier rebaptisé IA",
  "build-model": "Construction de modèles",
  "integrate-model": "Intégration de modèles",
  product: "Produit",
  field: "Terrain / client",
  governance: "Gouvernance",
  mixed: "Mixte",
  unknown: "Indéterminé",
  "true-junior": "Junior réel",
  "inflated-junior": "Junior gonflé",
  confirmed: "Confirmé",
  senior: "Senior"
};

export function normalizeOfferText(value: string): string {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function segments(title: string, description: string): string[] {
  const body = description
    .replace(/<[^>]*>/g, " ")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/([.!?])\s+/g, "$1\n")
    .split(/\r?\n|[•●▪]/);
  return [title, ...body].map(normalizeOfferText).filter(Boolean);
}

function hits(rule: Rule, sentence: string): boolean {
  if ((rule.negative_patterns ?? []).some((pattern) => new RegExp(pattern, "i").test(sentence))) return false;
  return rule.patterns.some((pattern) => new RegExp(pattern, "i").test(sentence));
}

function classifyAxis(definition: AxisDefinition, source: string[]): AxisResult {
  const targets = definition.values.filter((value) => value !== "mixed" && value !== "unknown");
  const scores = Object.fromEntries(targets.map((target) => [target, 0]));
  const citations = Object.fromEntries(targets.map((target) => [target, [] as string[]]));
  for (const rule of definition.rules) {
    const citation = source.find((sentence) => hits(rule, sentence));
    if (!citation) continue;
    scores[rule.target] = (scores[rule.target] ?? 0) + rule.weight;
    const clipped = citation.length <= taxonomy.confidence.citation_length
      ? citation
      : `${citation.slice(0, taxonomy.confidence.citation_length - 3)}...`;
    if (!citations[rule.target].includes(clipped)) citations[rule.target].push(clipped);
  }
  const ordered = Object.entries(scores).sort(([leftName, left], [rightName, right]) => right - left || leftName.localeCompare(rightName));
  if (!ordered.length || ordered[0][1] < taxonomy.confidence.mixed_min) {
    return { value: "unknown", confidence: "insufficient", scores, citations: [] };
  }
  const [topTarget, topScore] = ordered[0];
  const secondScore = ordered[1]?.[1] ?? 0;
  const margin = topScore - secondScore;
  if (secondScore >= taxonomy.confidence.mixed_min && margin < taxonomy.confidence.clear_margin) {
    const combined = [...new Set(ordered.slice(0, 2).flatMap(([target]) => citations[target]))];
    return { value: "mixed", confidence: "mixed", scores, citations: combined.slice(0, taxonomy.confidence.max_citations) };
  }
  const confidence: Confidence = topScore >= taxonomy.confidence.clear_min && margin >= taxonomy.confidence.clear_margin ? "clear" : "mixed";
  return { value: topTarget, confidence, scores, citations: citations[topTarget].slice(0, taxonomy.confidence.max_citations) };
}

const YEAR_WORDS: Record<string, number> = { un: 1, une: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6, sept: 7, huit: 8, neuf: 9, dix: 10 };

function years(text: string): number | undefined {
  const numeric = text.match(/\b(\d{1,2})\s*(?:\+\s*)?(?:ans?|years?)\b/i);
  if (numeric) return Number(numeric[1]);
  const written = text.match(new RegExp(`\\b(${Object.keys(YEAR_WORDS).join("|")})\\s+(?:ans?|years?)\\b`, "i"));
  return written ? YEAR_WORDS[written[1].toLowerCase()] : undefined;
}

function classifySeniority(source: string[]): Seniority {
  const scores: Record<string, number> = { junior: 0, intern: 0, confirmed: 0, senior: 0 };
  for (const rule of taxonomy.seniority_rules) {
    const candidates = rule.id.endsWith("-title") ? source.slice(0, 1) : source;
    if (candidates.some((sentence) => hits(rule, sentence))) scores[rule.target] = (scores[rule.target] ?? 0) + rule.weight;
  }
  const requiredYears = years(source.join("\n"));
  const juniorSignal = scores.junior >= 3 || scores.intern >= 4;
  const seniorSignal = scores.senior >= 3 || (requiredYears !== undefined && requiredYears >= 5);
  if (juniorSignal && (seniorSignal || (requiredYears !== undefined && requiredYears >= 3))) return "inflated-junior";
  if (juniorSignal) return "true-junior";
  if (scores.senior >= 4 || (requiredYears !== undefined && requiredYears >= 5)) return "senior";
  if (scores.confirmed >= 3 || (requiredYears !== undefined && requiredYears >= 3)) return "confirmed";
  return "unknown";
}

function evidenceIds(axes: Record<AxisName, AxisResult>): string[] {
  const mapping: Record<string, string[]> = {
    "relation:applied-ai": ["deployed-system", "evaluation-tests"],
    "relation:ai-infrastructure": ["infrastructure-cloud"],
    "technical:integrate-model": ["rag-agents", "evaluation-tests"],
    "technical:build-model": ["model-training", "evaluation-tests"],
    "position:field": ["client-change", "measured-outcomes"],
    "position:governance": ["security-governance", "evaluation-tests"],
    "position:product": ["deployed-system", "measured-outcomes"]
  };
  return [...new Set((Object.entries(axes) as [AxisName, AxisResult][]).flatMap(([axis, result]) => mapping[`${axis}:${result.value}`] ?? []))];
}

function applicationSignal(axes: Record<AxisName, AxisResult>, seniority: Seniority, evidence: EvidenceMatch[]): { signal: ApplicationSignal; reasons: string[] } {
  if (axes.technical.value === "build-model") return { signal: "large-gap", reasons: ["Le cœur du poste porte sur l'entraînement ou la recherche de modèles, preuve absente du portfolio."] };
  if (seniority === "senior" && axes.relation.value === "ai-infrastructure") return { signal: "large-gap", reasons: ["Le poste cumule séniorité forte et infrastructure IA."] };
  if (seniority === "inflated-junior") return { signal: "investigate", reasons: ["Le titre junior contredit les responsabilités ou l'expérience demandées."] };
  if (Object.values(axes).some((axis) => axis.value === "mixed" || axis.value === "unknown")) return { signal: "investigate", reasons: ["Une partie du rôle reste ambiguë dans le texte fourni."] };
  if (evidence.some((item) => item.coverage === "existing")) return { signal: "coherent", reasons: ["Au moins une preuve publique correspond au cœur du rôle."] };
  return { signal: "investigate", reasons: ["Le rôle paraît proche, mais les preuves directes restent à consolider."] };
}

export function decodeJobOffer(title: string, description: string): JobDecoderResult {
  const source = segments(title, description);
  const axes = {
    relation: classifyAxis(taxonomy.axes.relation, source),
    technical: classifyAxis(taxonomy.axes.technical, source),
    position: classifyAxis(taxonomy.axes.position, source)
  };
  const seniority = classifySeniority(source);
  const expectedEvidence = evidenceIds(axes).map((id) => ({
    id,
    label: taxonomy.evidence_categories[id],
    ...(PROFILE_EVIDENCE[id] ?? { coverage: "missing" as const, note: "Aucune preuve reliée." })
  }));
  const signal = applicationSignal(axes, seniority, expectedEvidence);
  const caveats = (Object.entries(axes) as [AxisName, AxisResult][])
    .filter(([, result]) => result.value === "unknown")
    .map(([axis]) => `${taxonomy.axes[axis].label} : aucun indice assez précis.`);
  return {
    axes,
    seniority,
    expectedEvidence,
    applicationSignal: signal.signal,
    signalReasons: signal.reasons,
    caveats,
    taxonomyVersion: taxonomy.taxonomy_version
  };
}
