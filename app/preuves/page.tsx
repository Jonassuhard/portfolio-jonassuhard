import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/projects";
import {
  claimStatusMeta,
  contentReviewDate,
  contentReviewDateLabel,
  verificationItems
} from "@/lib/verification";
import AnimatedTitle from "../animated-title";

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
        <AnimatedTitle>Ce qui est vérifié, privé ou encore à documenter.</AnimatedTitle>
        <p className="lead">
          Une affirmation publique n'a pas le même poids qu'une démonstration
          confidentielle. Ce registre distingue les deux et retire les métriques
          qui ne disposent pas encore d'une source contrôlable.
        </p>
      </section>

      <section className="section">
        <div className="verification-legend" aria-label="Légende des niveaux de preuve">
          {Object.entries(claimStatusMeta).map(([status, meta]) => (
            <div className="verification-legend-item" key={status}>
              <span className={`evidence-badge evidence-${status}`}>{meta.label}</span>
              <p>{meta.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section verification-list">
        {verificationItems.map((item) => {
          const meta = claimStatusMeta[item.status];
          return (
            <article className="verification-item" key={item.id}>
              <div className="verification-item-head">
                <p className="case-meta">{item.scope}</p>
                <span className={`evidence-badge evidence-${item.status}`}>{meta.label}</span>
              </div>
              <h2>{item.claim}</h2>
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
            </article>
          );
        })}
      </section>

      <section className="section">
        <div className="notice">
          <strong>Une preuve manque ?</strong>
          <p>
            Les chiffres supprimés ne reviendront qu'avec un export, un rapport
            daté ou un lien public. Les études de cas détaillent aussi leurs limites.
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
