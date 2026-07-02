import type { Metadata } from "next";
import Link from "next/link";
import { site, pageAlternates } from "@/lib/projects";

export const metadata: Metadata = {
  title: "À propos",
  description: "Positionnement et contexte de Jonas Suhard.",
  alternates: pageAlternates("/a-propos")
};

export default function AboutPage() {
  return (
    <div className="page">
      <section className="case-hero">
        <div>
          <p className="eyebrow">À propos</p>
          <h1>Je viens du marketing, j'ai appris à construire ce que je recommande.</h1>
          <p className="lead">
            J'ai commencé par le marketing digital : acquisition, SEO, contenu.
            Vite, j'ai voulu produire les outils que je recommandais plutôt que
            les décrire. Aujourd'hui je fais les deux dans le même geste, cadrer
            un besoin d'équipe et livrer ce qui y répond.
          </p>
          <p>
            Concrètement, je cadre un besoin, je construis une première version,
            je mesure ce qui marche et je documente les décisions et ce qu'il
            reste à construire. Je cherche un CDI où ce profil hybride sert, dans
            une équipe qui produit vite, teste proprement et met l'IA au service
            d'un travail utile.
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
            a besoin de construire vite et de mettre l'IA au service du produit.
          </p>
          <h3>Ce que je cherche à construire</h3>
          <p>
            Des outils marketing et IA simples à vérifier, utiles à une équipe,
            et documentés pour être repris.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="section-kicker">Parcours</p>
            <h2>Expérience.</h2>
          </div>
        </div>
        <div className="matrix">
          <div className="matrix-item">
            <strong>Alternance — production éditoriale SEO</strong>
            <p>Depuis septembre 2024 · Eduservices (marque ISCOM)</p>
            <p className="cert">Production SEO dans Drupal, audits de cannibalisation (Semrush), automatisations Playwright, fact-check et validation humaine avant publication.</p>
          </div>
          <div className="matrix-item">
            <strong>Indépendant — sites, SEO et IA appliquée</strong>
            <p>Depuis 2021 · Paris / hybride</p>
            <p className="cert">Sites web (Next.js, WordPress), SEO local, assistants IA cadrés. Exemple livré en production : Les Petites Griffes.</p>
          </div>
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

      <section className="section">
        <div className="notice">
          <strong>Ce que je vise.</strong>
          <p>
            Rejoindre une équipe où ce profil hybride sert : relier le marketing,
            l'IA appliquée et le développement pour livrer des outils utiles, et
            transmettre ce que je construis.
          </p>
          <div className="button-row">
            <Link className="button primary" href="/recruteurs">Page recruteurs</Link>
            <a className="button" href={`mailto:${site.email}`}>Me contacter</a>
          </div>
        </div>
      </section>
    </div>
  );
}

