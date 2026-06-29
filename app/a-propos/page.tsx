import type { Metadata } from "next";
import { site } from "@/lib/projects";

export const metadata: Metadata = {
  title: "A propos",
  description: "Positionnement et contexte de Jonas Suhard."
};

export default function AboutPage() {
  return (
    <div className="page">
      <section className="case-hero">
        <div>
          <p className="eyebrow">A propos</p>
          <h1>Je relie marketing, IA et exécution.</h1>
          <p className="lead">
            Mon avantage n'est pas d'être le meilleur pur dev, ni le meilleur pur
            marketeur. C'est de traduire un problème business en système utilisable,
            puis de documenter ce qui marche, ce qui casse et ce qui manque.
          </p>
          <div className="button-row">
            <a className="button primary" href={`mailto:${site.email}`}>Contact</a>
            <a className="button" href="/cv.pdf">CV PDF</a>
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

