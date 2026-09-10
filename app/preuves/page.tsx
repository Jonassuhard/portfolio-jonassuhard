import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/projects";
import {
  claimStatusMeta,
  contentReviewDateLabel,
  verificationItems
} from "@/lib/verification";
import AnimatedTitle from "../animated-title";

const titles: Record<string, string> = {
  "target-role": "Poste recherché et disponibilité",
  "rncp-41809": "Référence du titre de niveau 7",
  "rncp-34340": "Bachelor et titre de niveau 6",
  "iscom-article": "ISCOM : un article publié",
  "preuvia-live": "Preuvia : le site de l'offre",
  "job-radar-community-repo": "Job Radar : le code public",
  "job-radar-community-beta-1": "Job Radar : les tests de la bêta",
  "job-radar-personal-deployed-2026-08-25": "Job Radar : ma version personnelle",
  "cortex-bridge-repo": "Cortex Bridge : le code public",
  "cortex-bridge-release-0-6-1": "Cortex Bridge : les tests de la version 0.6.1",
  "lpg-live-audit-2026-08-01": "Les Petites Griffes : l'audit du site",
  "cool-bank-la-herse-versions": "Cool Bank : ce qui est validé en V2 et V3",
  "rag-board-historical-prototypes": "RAG et Board IA : les prototypes archivés",
  "hoopsphere-metrics": "HoopSphere : les chiffres retirés",
  "anthropic-training": "Anthropic Academy : la formation suivie"
};

export const metadata: Metadata = pageMeta({
  path: "/preuves",
  title: "Preuves et vérification",
  description:
    "Registre de vérification du portfolio de Jonas Suhard : sources publiques, preuves privées, éléments déclaratifs et affirmations retirées."
});

export default function EvidencePage() {
  return (
    <div className="page">
      <section>
        <p className="eyebrow">Transparence · revue du {contentReviewDateLabel}</p>
        <AnimatedTitle>Les sources de mon travail.</AnimatedTitle>
        <p className="lead">
          Code, sites, tests et documents : voici ce qui permet de vérifier
          mes projets, avec la date et les limites de chaque preuve.
        </p>
      </section>

      <section className="section">
        <details className="faq-item">
        <summary>Comprendre les quatre niveaux de preuve</summary>
        <div className="verification-legend" aria-label="Légende des niveaux de preuve">
          {Object.entries(claimStatusMeta).map(([status, meta]) => (
            <div className="verification-legend-item" key={status}>
              <span className={`evidence-badge evidence-${status}`}>{meta.label}</span>
              <p>{meta.description}</p>
            </div>
          ))}
        </div>
        </details>
      </section>

      <section className="section verification-list">
        <h2>Sources par affirmation.</h2>
        {verificationItems.map((item) => {
          const meta = claimStatusMeta[item.status];
          return (
            <details className="verification-item" key={item.id} id={item.id}>
              <summary>
                <span>{titles[item.id] ?? item.scope}</span>
                <span className={`evidence-badge evidence-${item.status}`}>{meta.label}</span>
              </summary>
              <p><strong>{item.claim}</strong></p>
              <p>{item.note}</p>
              <p className="verification-source">
                Contrôle : <time dateTime={item.checkedAt}>{item.checkedAt}</time>
                {item.sourceHref ? (
                  <>
                    {" · "}
                    <a href={item.sourceHref} target="_blank" rel="noreferrer">
                      {item.sourceLabel ?? "Source"}
                    </a>
                  </>
                ) : null}
              </p>
            </details>
          );
        })}
      </section>

      <section className="section">
        <div className="notice">
          <strong>Une preuve manque ?</strong>
          <p>
            Un résultat sans source reste non mesuré. Les fiches projet précisent
            ce qui fonctionne et ce qui reste à valider.
          </p>
          <div className="button-row">
            <Link className="button primary" href="/projets">Voir les projets</Link>
            <Link className="button" href="/methode">Voir la méthode</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
