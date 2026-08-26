import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const width = 1600;
const height = 960;

const palette = {
  paper: "#EEE8D8",
  surface: "#F6F1E2",
  ink: "#15120E",
  soft: "#3A332B",
  muted: "#5F5746",
  line: "#BEB5A0",
  rust: "#9A4D2E",
  blue: "#536E91",
  cyan: "#77B7B8",
  green: "#3D6628",
  red: "#8E1F2F",
  gold: "#B18B45"
};

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function textLines(value, max = 34) {
  const lines = [];
  for (const paragraph of String(value).split("\n")) {
    const words = paragraph.split(/\s+/).filter(Boolean);
    let line = "";
    for (const word of words) {
      const next = line ? `${line} ${word}` : word;
      if (next.length > max && line) {
        lines.push(line);
        line = word;
      } else {
        line = next;
      }
    }
    if (line) lines.push(line);
  }
  return lines;
}

function multiline(value, x, y, options = {}) {
  const {
    max = 34,
    size = 20,
    leading = 28,
    family = "Courier New, monospace",
    weight = 400,
    fill = palette.soft,
    anchor = "start"
  } = options;
  return `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${textLines(value, max)
    .map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : leading}">${escapeXml(line)}</tspan>`)
    .join("")}</text>`;
}

function node(box) {
  const accent = box.accent ?? palette.rust;
  const titleY = box.y + 46;
  const bodyY = box.y + 84;
  const tag = box.tag
    ? `<rect x="${box.x + box.w - 126}" y="${box.y + 20}" width="102" height="28" fill="${accent}" opacity="0.12" stroke="${accent}"/><text x="${box.x + box.w - 75}" y="${box.y + 40}" font-family="Courier New, monospace" font-size="13" font-weight="700" fill="${accent}" text-anchor="middle">${escapeXml(box.tag)}</text>`
    : "";
  return `<g>
    <rect x="${box.x}" y="${box.y}" width="${box.w}" height="${box.h}" fill="${palette.surface}" stroke="${palette.ink}" stroke-width="2"/>
    <rect x="${box.x}" y="${box.y}" width="8" height="${box.h}" fill="${accent}"/>
    <text x="${box.x + 28}" y="${titleY}" font-family="Georgia, serif" font-size="29" font-weight="700" fill="${palette.ink}">${escapeXml(box.title)}</text>
    ${tag}
    ${multiline(box.body, box.x + 28, bodyY, { max: box.max ?? 32, size: box.size ?? 18, leading: box.leading ?? 25 })}
  </g>`;
}

function edge(item, nodesById) {
  const from = nodesById.get(item.from);
  const to = nodesById.get(item.to);
  const vertical = Math.abs((from.x + from.w / 2) - (to.x + to.w / 2)) < 80;
  const x1 = vertical ? from.x + from.w / 2 : from.x < to.x ? from.x + from.w : from.x;
  const y1 = vertical ? (from.y < to.y ? from.y + from.h : from.y) : from.y + from.h / 2;
  const x2 = vertical ? to.x + to.w / 2 : from.x < to.x ? to.x : to.x + to.w;
  const y2 = vertical ? (from.y < to.y ? to.y : to.y + to.h) : to.y + to.h / 2;
  const labelX = (x1 + x2) / 2;
  const labelY = (y1 + y2) / 2 - 12;
  return `<g>
    <path d="M ${x1} ${y1} L ${x2} ${y2}" fill="none" stroke="${item.color ?? palette.muted}" stroke-width="2" stroke-dasharray="${item.dashed ? "8 8" : "none"}" marker-end="url(#arrow)"/>
    ${item.label ? `<rect x="${labelX - 74}" y="${labelY - 17}" width="148" height="26" fill="${palette.paper}"/><text x="${labelX}" y="${labelY + 2}" font-family="Courier New, monospace" font-size="13" fill="${palette.muted}" text-anchor="middle">${escapeXml(item.label)}</text>` : ""}
  </g>`;
}

function render(diagram) {
  const nodesById = new Map(diagram.nodes.map((item) => [item.id, item]));
  const minor = Array.from({ length: 41 }, (_, index) => `<path d="M ${index * 40} 0 V ${height}"/>`).join("");
  const minorH = Array.from({ length: 25 }, (_, index) => `<path d="M 0 ${index * 40} H ${width}"/>`).join("");
  const major = Array.from({ length: 9 }, (_, index) => `<path d="M ${index * 200} 0 V ${height}"/>`).join("");
  const majorH = Array.from({ length: 6 }, (_, index) => `<path d="M 0 ${index * 200} H ${width}"/>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto"><path d="M 0 0 L 10 5 L 0 10 Z" fill="${palette.muted}"/></marker>
    </defs>
    <rect width="100%" height="100%" fill="${palette.paper}"/>
    <g fill="none" stroke="${palette.ink}" stroke-opacity="0.045" stroke-width="1">${minor}${minorH}</g>
    <g fill="none" stroke="${palette.ink}" stroke-opacity="0.08" stroke-width="2">${major}${majorH}</g>
    <rect x="28" y="28" width="1544" height="904" fill="none" stroke="${palette.ink}" stroke-width="2"/>
    <text x="72" y="78" font-family="Courier New, monospace" font-size="16" fill="${palette.rust}">ARCHIVE // ${escapeXml(diagram.code)}</text>
    <text x="72" y="132" font-family="Georgia, serif" font-size="47" font-weight="700" fill="${palette.ink}">${escapeXml(diagram.title)}</text>
    ${multiline(diagram.subtitle, 72, 168, { max: 100, size: 17, leading: 24, fill: palette.muted })}
    ${diagram.edges.map((item) => edge(item, nodesById)).join("")}
    ${diagram.nodes.map(node).join("")}
    <line x1="72" y1="875" x2="1528" y2="875" stroke="${palette.line}"/>
    <text x="72" y="908" font-family="Courier New, monospace" font-size="14" fill="${palette.muted}">${escapeXml(diagram.note)}</text>
    <text x="1528" y="908" font-family="Courier New, monospace" font-size="14" fill="${palette.rust}" text-anchor="end">JONASSUHARD.COM / PREUVE VISUELLE</text>
  </svg>`;
}

const diagrams = [
  {
    file: "educool/cool-bank-v2-v3-worldline.webp",
    code: "COOL-BANK / VERSIONS",
    title: "Deux versions, deux niveaux de preuve",
    subtitle: "La V2 locale et la V3 3D partagent Educool, mais leur état de validation reste séparé.",
    nodes: [
      { id: "educool", x: 570, y: 225, w: 460, h: 150, title: "Educool", body: "Identités fictives\nRègles de classe\nDonnées et fonctions", accent: palette.blue, tag: "SOCLE" },
      { id: "v2", x: 120, y: 500, w: 560, h: 240, title: "V2 - jeu local 2D", body: "Élève, professeure, banquier\nÉconomie et marché\nLOCAL_SINGLE_DEVICE_READY\nONLINE_READY : NO-GO", accent: palette.green, tag: "GO LOCAL" },
      { id: "v3", x: 920, y: 500, w: 560, h: 240, title: "V3 - monde 3D", body: "Monde navigable et contrôles\nServices reliés à Educool\nREADY_FOR_HUMAN_RECIPE\nGO_PILOTE_LOCAL : en attente", accent: palette.gold, tag: "RECETTE" }
    ],
    edges: [
      { from: "educool", to: "v2", label: "données fictives" },
      { from: "educool", to: "v3", label: "services partagés" }
    ],
    note: "Schéma construit depuis les registres V2/V3 vérifiés. Aucun verdict n'est fusionné."
  },
  {
    file: "battle-engine/pipeline-resumable.webp",
    code: "BATTLE-ENGINE / PIPELINE",
    title: "Du combat au fichier publiable",
    subtitle: "Une chaîne automatisée avec reprise après interruption, contrôles qualité et publication séparée.",
    nodes: [
      { id: "godot", x: 78, y: 330, w: 250, h: 190, title: "Godot", body: "Combat\nRendu image\nAudio", accent: palette.blue },
      { id: "ffmpeg", x: 388, y: 330, w: 250, h: 190, title: "FFmpeg", body: "Montage\nEncodage\nNormalisation", accent: palette.rust },
      { id: "rife", x: 698, y: 330, w: 250, h: 190, title: "RIFE", body: "Interpolation\nFluidité\nOptionnelle", accent: palette.cyan },
      { id: "qc", x: 1008, y: 330, w: 250, h: 190, title: "Contrôles", body: "Durée\nAudio et droits\nFichier final", accent: palette.gold },
      { id: "youtube", x: 1318, y: 330, w: 204, h: 190, title: "YouTube", body: "Upload API\nÉtat repris\nJournal", accent: palette.green, max: 18 },
      { id: "state", x: 540, y: 645, w: 520, h: 150, title: "État de reprise", body: "Chaque étape terminée est enregistrée. Une interruption ne relance pas tout le rendu.", accent: palette.red, tag: "REPRISE" }
    ],
    edges: [
      { from: "godot", to: "ffmpeg" }, { from: "ffmpeg", to: "rife" }, { from: "rife", to: "qc" }, { from: "qc", to: "youtube" },
      { from: "state", to: "ffmpeg", dashed: true }, { from: "state", to: "youtube", dashed: true }
    ],
    note: "Architecture issue du pipeline local Godot, Python, FFmpeg, RIFE et YouTube API."
  },
  {
    file: "rag-starter-kit/rag-document-pipeline.webp",
    code: "RAG / DOCUMENTS",
    title: "Répondre avec les passages sources",
    subtitle: "Le prototype ingère des documents, retrouve les extraits utiles et garde la citation dans la réponse.",
    nodes: [
      { id: "docs", x: 80, y: 330, w: 250, h: 180, title: "Documents", body: "PDF, DOCX\nTXT, HTML", accent: palette.blue },
      { id: "ingest", x: 390, y: 330, w: 250, h: 180, title: "Ingestion", body: "Extraction\nDécoupage\nMétadonnées", accent: palette.rust },
      { id: "qdrant", x: 700, y: 330, w: 250, h: 180, title: "Qdrant", body: "Vecteurs\nPassages\nTenant", accent: palette.cyan },
      { id: "retrieve", x: 1010, y: 330, w: 250, h: 180, title: "Recherche", body: "Question\nTop passages\nSources", accent: palette.gold },
      { id: "answer", x: 1320, y: 330, w: 200, h: 180, title: "Réponse", body: "Mistral\nCitations", accent: palette.green, max: 18 }
    ],
    edges: [{ from: "docs", to: "ingest" }, { from: "ingest", to: "qdrant" }, { from: "qdrant", to: "retrieve" }, { from: "retrieve", to: "answer" }],
    note: "Schéma factuel du prototype privé. Aucun score de qualité n'est revendiqué."
  },
  {
    file: "rag-starter-kit/rag-tenant-isolation.webp",
    code: "RAG / ISOLATION",
    title: "Séparer les documents de chaque client",
    subtitle: "L'identité du client borne la recherche, les documents et les journaux d'usage.",
    nodes: [
      { id: "auth", x: 570, y: 220, w: 460, h: 145, title: "Authentification", body: "Clé ou session → tenant_id obligatoire", accent: palette.rust, tag: "ENTRÉE" },
      { id: "a", x: 130, y: 510, w: 550, h: 230, title: "Client A", body: "Collection / filtre A\nDocuments A\nLogs A\nAucun passage de B", accent: palette.blue, tag: "ISOLÉ" },
      { id: "b", x: 920, y: 510, w: 550, h: 230, title: "Client B", body: "Collection / filtre B\nDocuments B\nLogs B\nAucun passage de A", accent: palette.green, tag: "ISOLÉ" }
    ],
    edges: [{ from: "auth", to: "a", label: "tenant A" }, { from: "auth", to: "b", label: "tenant B" }],
    note: "La séparation par tenant est une contrainte d'architecture, pas une certification de sécurité."
  },
  {
    file: "rag-starter-kit/rag-evaluation-loop.webp",
    code: "RAG / ÉVALUATION",
    title: "Tester la recherche au lieu de la juger à l'œil",
    subtitle: "Des cas versionnés permettent de rejouer le retrieval et de comparer une modification.",
    nodes: [
      { id: "cases", x: 110, y: 330, w: 330, h: 200, title: "Cas versionnés", body: "Question\nSources attendues\nRéponse de référence", accent: palette.blue },
      { id: "run", x: 635, y: 330, w: 330, h: 200, title: "Exécution", body: "pytest\nRetrieval\nRéponse générée", accent: palette.rust },
      { id: "report", x: 1160, y: 330, w: 330, h: 200, title: "Rapport", body: "Écarts\nRégressions\nComparaison", accent: palette.green, tag: "HARNAIS" },
      { id: "limit", x: 520, y: 650, w: 560, h: 130, title: "Limite publiée", body: "Le harnais existe ; aucun score RAG public n'est encore annoncé.", accent: palette.red, tag: "PAS DE SCORE" }
    ],
    edges: [{ from: "cases", to: "run" }, { from: "run", to: "report" }, { from: "report", to: "cases", label: "corriger", dashed: true }],
    note: "Boucle de vérification issue des tests et cas de scoring décrits dans le projet."
  },
  {
    file: "board-ia-pme/board-isolated-agents.webp",
    code: "BOARD IA / DIVERGENCE",
    title: "Cinq agents, cinq sources différentes",
    subtitle: "La divergence vient de l'information disponible, pas de cinq reformulations du même contexte.",
    nodes: [
      { id: "q", x: 560, y: 210, w: 480, h: 130, title: "Question PME", body: "Même question, périmètres documentaires séparés", accent: palette.rust },
      { id: "a1", x: 65, y: 490, w: 250, h: 190, title: "Finance", body: "Sources A\nRisques\nCoûts", accent: palette.blue },
      { id: "a2", x: 370, y: 490, w: 250, h: 190, title: "Marketing", body: "Sources B\nMarché\nClients", accent: palette.cyan },
      { id: "a3", x: 675, y: 490, w: 250, h: 190, title: "Opérations", body: "Sources C\nProcess\nCapacité", accent: palette.gold },
      { id: "a4", x: 980, y: 490, w: 250, h: 190, title: "Juridique", body: "Sources D\nContraintes\nExposition", accent: palette.red },
      { id: "a5", x: 1285, y: 490, w: 250, h: 190, title: "Direction", body: "Sources E\nPriorités\nArbitrage", accent: palette.green }
    ],
    edges: ["a1", "a2", "a3", "a4", "a5"].map((to) => ({ from: "q", to })),
    note: "Concept du POC privé. Les rôles illustrent l'asymétrie d'information décrite."
  },
  {
    file: "board-ia-pme/board-orchestration.webp",
    code: "BOARD IA / ORCHESTRATION",
    title: "Orchestrer sans masquer les désaccords",
    subtitle: "Les tâches tournent en parallèle ; un agrégateur à règles fixes conserve les écarts entre agents.",
    nodes: [
      { id: "api", x: 80, y: 330, w: 260, h: 190, title: "FastAPI", body: "Question\nContexte\nIdentité", accent: palette.blue },
      { id: "queue", x: 420, y: 330, w: 260, h: 190, title: "Celery / Redis", body: "File de tâches\nParallélisme\nReprise", accent: palette.rust },
      { id: "agents", x: 760, y: 330, w: 300, h: 190, title: "5 agents", body: "Mistral\nQdrant séparé\nRéponses tracées", accent: palette.cyan },
      { id: "cio", x: 1140, y: 330, w: 380, h: 190, title: "Agrégateur déterministe", body: "Pondérations visibles\nDésaccords signalés\nPas de 6e LLM", accent: palette.green, tag: "RÈGLES" }
    ],
    edges: [{ from: "api", to: "queue" }, { from: "queue", to: "agents" }, { from: "agents", to: "cio" }],
    note: "Architecture déclarée du POC ; dashboard et export PDF ne sont pas présentés comme livrés."
  },
  {
    file: "board-ia-pme/board-status.webp",
    code: "BOARD IA / STATUT",
    title: "Ce qui existe et ce qui reste à construire",
    subtitle: "Le visuel sépare volontairement le socle posé des fonctions encore prévues.",
    nodes: [
      { id: "done", x: 115, y: 280, w: 620, h: 420, title: "Implémenté dans le POC", body: "Backend Python\nCinq agents spécialisés\nRAG Qdrant par agent\nAgrégation à règles fixes\nStructure Celery / Redis", accent: palette.green, tag: "FAIT", max: 46, size: 20, leading: 34 },
      { id: "todo", x: 865, y: 280, w: 620, h: 420, title: "Encore planifié", body: "Dashboard React Flow\nExport PDF\nTests E2E\nValidation client réelle\nMesures d'impact", accent: palette.gold, tag: "À FAIRE", max: 46, size: 20, leading: 34 }
    ],
    edges: [],
    note: "Statut honnête du projet : POC initié, non terminé et non validé sur un cas client."
  },
  {
    file: "pokemon-gen4-toolkit/narc-anatomy.webp",
    code: "GEN-4 TOOLKIT / NARC",
    title: "Lire une archive NARC sans distribuer son contenu",
    subtitle: "L'outil travaille sur la structure binaire fournie par l'utilisateur et produit des données éditables.",
    nodes: [
      { id: "rom", x: 80, y: 330, w: 300, h: 200, title: "Copie légale", body: "Fichier fourni\nJamais versionné\nJamais publié", accent: palette.red, tag: "REQUIS" },
      { id: "narc", x: 515, y: 330, w: 300, h: 200, title: "Archive NARC", body: "Header\nTable fichiers\nBlocs binaires", accent: palette.blue },
      { id: "parse", x: 950, y: 330, w: 300, h: 200, title: "Parseur Python", body: "ndspy\nOffsets\nStructures", accent: palette.rust },
      { id: "data", x: 1385, y: 330, w: 145, h: 200, title: "Données", body: "Texte\nEvents\nStats", accent: palette.green, max: 12, size: 16 }
    ],
    edges: [{ from: "rom", to: "narc" }, { from: "narc", to: "parse" }, { from: "parse", to: "data" }],
    note: "Schéma technique original. Aucune ROM, sauvegarde ou image du jeu n'est intégrée au portfolio."
  },
  {
    file: "pokemon-gen4-toolkit/text-codec.webp",
    code: "GEN-4 TOOLKIT / TEXTE",
    title: "Décoder puis réencoder le texte Gen 4",
    subtitle: "Le moteur de texte maison garde la transformation réversible pour réécrire les archives.",
    nodes: [
      { id: "bytes", x: 80, y: 330, w: 270, h: 190, title: "Octets", body: "Flux chiffré\nSeed\nLongueur", accent: palette.blue },
      { id: "xor", x: 400, y: 330, w: 270, h: 190, title: "Seed / XOR", body: "Déchiffrement\nSéquence\nContrôle", accent: palette.rust },
      { id: "chars", x: 720, y: 330, w: 270, h: 190, title: "Charmap", body: "Codes\nCaractères\nBalises", accent: palette.cyan },
      { id: "edit", x: 1040, y: 330, w: 270, h: 190, title: "Édition", body: "Texte lisible\nValidation\nNouveaux codes", accent: palette.gold },
      { id: "write", x: 1360, y: 330, w: 170, h: 190, title: "Écriture", body: "Réencoder\nRéinsérer", accent: palette.green, max: 14, size: 16 }
    ],
    edges: [{ from: "bytes", to: "xor" }, { from: "xor", to: "chars" }, { from: "chars", to: "edit" }, { from: "edit", to: "write" }, { from: "write", to: "bytes", label: "réversible", dashed: true }],
    note: "Flux simplifié depuis le moteur Python de chiffrement et la charmap du toolkit."
  },
  {
    file: "pokemon-gen4-toolkit/editor-surface.webp",
    code: "GEN-4 TOOLKIT / OUTILS",
    title: "Une boîte à outils, pas une ROM publiée",
    subtitle: "Les scripts opèrent sur plusieurs familles de données et laissent le contenu protégé hors du dépôt.",
    nodes: [
      { id: "events", x: 100, y: 310, w: 410, h: 260, title: "Events", body: "PNJ\nWarps\nTriggers\nCoordonnées", accent: palette.blue },
      { id: "scripts", x: 595, y: 310, w: 410, h: 260, title: "Scripts", body: "Bytecode\nCommandes\nBranchements\nAnalyse", accent: palette.rust },
      { id: "species", x: 1090, y: 310, w: 410, h: 260, title: "Données", body: "Textes\nEspèces / stats\nZones\nCartographie", accent: palette.green },
      { id: "rule", x: 470, y: 690, w: 660, h: 120, title: "Règle de publication", body: "Code et schémas seulement. Aucune ROM ni asset du jeu.", accent: palette.red, tag: "0 ASSET" }
    ],
    edges: [],
    note: "Périmètre public conforme à la fiche : outillage Python et explication technique uniquement."
  },
  {
    file: "claude-code-soul/soul-layers.webp",
    code: "CLAUDE-CODE-SOUL / COUCHES",
    title: "Séparer l'identité de la configuration technique",
    subtitle: "Chaque couche garde une responsabilité lisible et peut évoluer sans tout mélanger.",
    nodes: [
      { id: "identity", x: 110, y: 300, w: 390, h: 300, title: "Identité", body: "soul.md\nTon\nValeurs\nRefus", accent: palette.rust, tag: "QUI" },
      { id: "workflow", x: 605, y: 300, w: 390, h: 300, title: "Workflow", body: "rules/\nDécisions\nMémoire\nContrats", accent: palette.blue, tag: "COMMENT" },
      { id: "tools", x: 1100, y: 300, w: 390, h: 300, title: "Outillage", body: "skills/\nagents/\nhooks/\nsetup.sh", accent: palette.green, tag: "AVEC QUOI" }
    ],
    edges: [{ from: "identity", to: "workflow" }, { from: "workflow", to: "tools" }],
    note: "Architecture documentée dans le dépôt MIT public claude-code-soul."
  },
  {
    file: "claude-code-soul/soul-security-gates.webp",
    code: "CLAUDE-CODE-SOUL / SÉCURITÉ",
    title: "Des garde-fous autour des actions sensibles",
    subtitle: "Le pack combine contrôle humain, détection de secrets et nettoyage des traces locales.",
    nodes: [
      { id: "action", x: 80, y: 340, w: 270, h: 190, title: "Action", body: "Push\nSuppression\nSudo\nComputer use", accent: palette.red },
      { id: "touch", x: 405, y: 340, w: 270, h: 190, title: "Validation", body: "Touch ID\nSession bornée\nLockout", accent: palette.gold },
      { id: "secrets", x: 730, y: 340, w: 270, h: 190, title: "Secrets", body: "Keychain\ngitleaks\n0 PII", accent: palette.blue },
      { id: "logs", x: 1055, y: 340, w: 270, h: 190, title: "Traces", body: "Redaction\nTranscripts\nJournal", accent: palette.cyan },
      { id: "done", x: 1380, y: 340, w: 140, h: 190, title: "Sortie", body: "Autoriser\nou\nbloquer", accent: palette.green, max: 10, size: 16 }
    ],
    edges: [{ from: "action", to: "touch" }, { from: "touch", to: "secrets" }, { from: "secrets", to: "logs" }, { from: "logs", to: "done" }],
    note: "Schéma construit depuis les hooks et règles publiés ; ce n'est pas un audit de sécurité tiers."
  },
  {
    file: "claude-code-soul/soul-install-flow.webp",
    code: "CLAUDE-CODE-SOUL / INSTALL",
    title: "Installer, adapter, puis charger à la demande",
    subtitle: "Le dépôt fournit une base réutilisable ; l'identité et les briques tierces restent à adapter.",
    nodes: [
      { id: "clone", x: 90, y: 330, w: 300, h: 190, title: "Cloner", body: "Repo MIT\nDocs\n.env.example", accent: palette.blue },
      { id: "adapt", x: 465, y: 330, w: 300, h: 190, title: "Adapter", body: "Identité\nTon\nVariables", accent: palette.rust },
      { id: "dry", x: 840, y: 330, w: 300, h: 190, title: "Vérifier", body: "setup --dry-run\ngitleaks\n0 chemin perso", accent: palette.gold },
      { id: "load", x: 1215, y: 330, w: 300, h: 190, title: "Charger", body: "Skills à la demande\nMCP lazy-load\nHooks ciblés", accent: palette.green }
    ],
    edges: [{ from: "clone", to: "adapt" }, { from: "adapt", to: "dry" }, { from: "dry", to: "load" }],
    note: "Le dépôt n'est pas plug-and-play : soul.md et l'environnement doivent être personnalisés."
  }
];

for (const diagram of diagrams) {
  const output = join(root, "public", "assets", "proof", diagram.file);
  await mkdir(dirname(output), { recursive: true });
  await sharp(Buffer.from(render(diagram)))
    .resize(width, height)
    .webp({ quality: 82, effort: 6 })
    .toFile(output);
  console.log(`${diagram.file} (${width}x${height})`);
}

console.log(`Generated ${diagrams.length} proof schematics.`);
