import type { Metadata } from "next";
import { site, pageAlternates } from "@/lib/projects";

export const metadata: Metadata = {
  title: "À propos",
  description: "Positionnement et contexte de Jonas Suhard.",
  alternates: pageAlternates("/a-propos")
};

export default function AboutPage() {
  return (
    <div className="page about-fit">
      <section className="case-hero">
        <div>
          <p className="eyebrow">À propos</p>
          <h1>Je relie marketing, IA et exécution.</h1>
          <p className="lead">
            Je viens du marketing digital, puis j'ai appris à construire pour ne plus
            m'arrêter aux recommandations. Mon point fort, c'est de relier trois mondes,
            acquisition, IA appliquée et développement web.
          </p>
          <p>
            Concrètement, je cadre un besoin, je construis une première version, je
            mesure ce qui marche et je documente ce qui reste à creuser. Je cherche un
            CDI où ce profil hybride sert, dans une équipe qui doit produire vite, tester
            proprement et transformer l'IA en outils concrets.
          </p>
          <div className="button-row">
            <a className="button primary" href={`mailto:${site.email}`}>Me contacter</a>
            <a className="button" href="/projets">Voir les projets</a>
          </div>
          <p className="cta-sub">
            CV : <a href={site.cvStyled}>version site</a> · <a href={site.cvClassic}>classique</a>
          </p>
        </div>
        <div className="panel panel-sys">
          <div className="avatar-frame">
            <img src="/brand/jonas-avatar.jpg" alt="Portrait de Jonas Suhard" />
          </div>
          <h2>Position cible</h2>
          <p>
            Growth Engineer / Marketing Technologist IA, dans une équipe qui
            a besoin de construire vite et de transformer l'IA en outils concrets.
          </p>
          <h3>Ce site existe pour quoi ?</h3>
          <p>
            Montrer des projets réutilisables en candidature et en entretien.
            Le but, donner à un recruteur des preuves rapides à vérifier.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="section-kicker">Parcours</p>
            <h2>Formation.</h2>
          </div>
        </div>
        <div className="matrix">
          <div className="matrix-item">
            <strong>MBA Expert Marketing Digital (en cours)</strong>
            <p>2024–2026 · MyDigitalSchool, Paris</p>
            <p className="cert">RNCP41809 — « Manager de la stratégie marketing digital », niveau 7</p>
          </div>
          <div className="matrix-item">
            <strong>Bachelor Chef de projet digital</strong>
            <p>2023–2024 · La Digital School, Angers</p>
            <p className="cert">Titre RNCP niveau 6 — « Chef de projet e-business »</p>
          </div>
          <div className="matrix-item">
            <strong>Animation 2D / 3D</strong>
            <p>2019–2021 · Human Academy, Angoulême</p>
            <p className="cert">Cursus 3 ans — certificat d'école</p>
          </div>
        </div>
      </section>
    </div>
  );
}

