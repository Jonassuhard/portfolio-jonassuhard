import type { Metadata } from "next";
import { site } from "@/lib/projects";

export const metadata: Metadata = {
  title: "À propos",
  description: "Positionnement et contexte de Jonas Suhard."
};

export default function AboutPage() {
  return (
    <div className="page">
      <section className="case-hero">
        <div>
          <p className="eyebrow">À propos</p>
          <h1>Je relie marketing, IA et exécution.</h1>
          <p className="lead">
            Mon avantage : traduire un problème business en système utilisable,
            puis documenter ce qui marche, ce qui casse et ce qui manque.
          </p>
          <p>
            Je viens du marketing digital. J'ai appris à construire pour ne plus
            rester au niveau des recommandations : aujourd'hui je code, je déploie
            et je documente les systèmes que je propose. Je cherche un rôle où relier
            acquisition, IA appliquée et produit web.
          </p>
          <div className="button-row">
            <a className="button primary" href={`mailto:${site.email}`}>Contact</a>
            <a className="button" href={site.cvStyled}>CV — version site</a>
            <a className="button" href={site.cvClassic}>CV — classique</a>
          </div>
        </div>
        <div className="panel">
          <div className="avatar-frame">
            <img src="/brand/jonas-avatar.jpg" alt="Portrait de Jonas Suhard" />
          </div>
          <h2>Position cible</h2>
          <p>
            Growth Engineer / Marketing Technologist IA, dans une équipe qui
            a besoin de construire vite sans transformer l'IA en théâtre de slides.
          </p>
          <h3>Ce site existe pour quoi ?</h3>
          <p>
            Montrer des preuves de travail réutilisables en candidature et en entretien.
            Le style reste volontairement secondaire.
          </p>
        </div>
      </section>
    </div>
  );
}

