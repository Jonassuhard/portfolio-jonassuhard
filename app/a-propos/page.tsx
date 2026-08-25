import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site, pageMeta } from "@/lib/projects";
import AnimatedTitle from "../animated-title";

export const metadata: Metadata = pageMeta({
  path: "/a-propos",
  title: "À propos",
  description:
    "Parcours et positionnement de Jonas Suhard : du marketing au développement, profil hybride orienté delivery."
});

export default function AboutPage() {
  return (
    <div className="page">
      <section className="case-hero">
        <div>
          <p className="eyebrow">À propos</p>
          <AnimatedTitle>
            Je viens du marketing, j'ai appris à construire ce que je recommande.
          </AnimatedTitle>
          <p className="lead">
            J'ai commencé par le marketing digital : acquisition, SEO, contenu.
            J'ai ensuite appris à construire les outils que je recommandais.
            Aujourd'hui, je relie les deux : comprendre un besoin et livrer une
            première réponse.
          </p>
          <p>
            Je cadre un besoin, je construis une première version, je définis ce
            qui doit être mesuré et je documente les décisions. Je cherche un
            CDI dans une équipe qui produit, teste et utilise l'IA pour un
            travail concret.
          </p>
          <div className="button-row">
            <a className="button primary" href={`mailto:${site.email}`}>Me contacter</a>
            <a className="button" href="/projets">Voir les projets</a>
          </div>
          <div className="cv-block">
            <span className="cv-label">CV — téléchargement direct</span>
            <div className="button-row">
              <a className="button primary" href={site.cvClassic} download>CV classique (PDF)</a>
              <a className="button" href={site.cvStyled} download>CV version site (PDF)</a>
            </div>
          </div>
        </div>
        <div className="panel panel-sys">
          <div className="avatar-frame">
            <Image
              src="/brand/jonas-avatar.jpg"
              alt="Portrait de Jonas Suhard"
              width={640}
              height={640}
              sizes="(max-width: 430px) 126px, 152px"
              quality={70}
            />
          </div>
          <h2>Rôle actuel</h2>
          <p>
            {site.headline}, avec les rôles voisins {site.roleAliases.join(" et ")},
            dans une équipe qui relie besoins métier, acquisition et exécution produit.
          </p>
          <h3>Objectif d'évolution</h3>
          <p>
            {site.careerGoal}
          </p>
          <p>
            Il s'agit de partir d'un besoin terrain, de construire avec l'équipe
            ou le client, puis de livrer et vérifier l'usage.
          </p>
        </div>
      </section>

      <section className="section" id="growth-engineer">
        <div className="section-head">
          <div>
            <p className="section-kicker">Définition</p>
            <h2>C'est quoi un Growth Engineer ?</h2>
          </div>
        </div>
        <div className="prose">
          <p>
            C'est un rôle qui relie l'acquisition et le développement.
          </p>
          <p>
            Je conçois une réponse, je la livre et je prépare sa mesure. Je peux
            donc passer du besoin marketing au produit sans séparer chaque étape.
          </p>
          <p>
            Je viens du marketing. J'ai appris à coder pour tester plus vite. En
            IA appliquée, je construis des assistants avec des règles et une
            vérification humaine.
          </p>
          <p>
            La sécurité et la dette technique comptent autant que le résultat.
            C'est un rôle à la croisée du marketing, du développement et de
            l'IA. Je travaille sur Mac comme sur Windows.
          </p>
          <p>
            <Link className="lk" href="/knowledge/growth-engineer-ia">
              La version longue, avec les preuves.
            </Link>
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
        <div className="matrix matrix-2">
          <div className="matrix-item">
            <strong>Alternant communication digitale, SEO & IA appliquée</strong>
            <p>Octobre 2025 – août 2026 · Eduservices (marque ISCOM)</p>
            <p className="cert">Production SEO dans Drupal, audits de cannibalisation (Semrush), automatisations Playwright, fact-check et validation humaine avant publication.</p>
          </div>
          <div className="matrix-item">
            <strong>Alternant communication digitale & SEO</strong>
            <p>Novembre 2024 – août 2025 · Attineos (Angers)</p>
            <p className="cert">Refonte et optimisation du site WordPress, contenus LinkedIn, articles, SEO on-page, suivi GA4 et supports de communication.</p>
          </div>
          <div className="matrix-item">
            <strong>Projets web, SEO et IA appliquée</strong>
            <p>Projets depuis 2021 · entreprise individuelle enregistrée en 2026 · Paris / hybride</p>
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
        <div className="matrix matrix-2">
          <div className="matrix-item">
            <strong>Parcours Anthropic Academy (en cours)</strong>
            <p>2026 · formation à distance</p>
            <p className="cert">Ressources de formation sur Claude, les API, les outils et les évaluations. Aucune certification obtenue n'est revendiquée.</p>
          </div>
          <div className="matrix-item">
            <strong>MBA Expert Marketing Digital (en cours)</strong>
            <p>2024–2026 · MyDigitalSchool, Paris</p>
            <p className="cert">Prépare le titre RNCP41809 — « Manager de la stratégie marketing digital », niveau 7</p>
          </div>
          <div className="matrix-item">
            <strong>Bachelor Chef de projet digital</strong>
            <p>2023–2024 · La Digital School, Angers</p>
            <p className="cert">Titre RNCP34340, niveau 6 — « Chef de projet e-business » · preuve privée</p>
          </div>
          <div className="matrix-item">
            <strong>Animation 2D / 3D</strong>
            <p>2019–2021 · Human Academy, Angoulême</p>
            <p className="cert">Formation suivie de 2019 à 2021 — certificat d'école, non inscrit au RNCP</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="notice">
          <strong>Ce que je vise.</strong>
          <p>
            {site.careerGoal}
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
