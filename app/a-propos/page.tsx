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
            Du marketing au développement.
          </AnimatedTitle>
          <p className="lead">
            J'ai commencé par le marketing digital, le SEO et le contenu.
            J'ai appris à coder pour réaliser moi-même les sites et les outils
            dont j'avais besoin.
          </p>
          <p>
            Je cherche aujourd'hui un CDI junior pour construire avec une
            équipe, recevoir des retours et progresser sur des produits utilisés.
          </p>
          <div className="button-row">
            <a className="button primary" href={`mailto:${site.email}`}>Me contacter</a>
            <a className="button" href="/projets">Voir les projets</a>
          </div>
          <div className="button-row">
            <a className="button primary" href={site.cvClassic} download>CV classique (PDF)</a>
            <a className="lk" href={site.cvStyled} download>CV illustré (PDF)</a>
          </div>
        </div>
        <div className="about-identity panel-sys">
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
          <h2>{site.name}</h2>
          <p>{site.title}</p>
          <p>Paris · web, automatisation et IA appliquée</p>
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
          <p>C'est un rôle qui relie l'acquisition et le développement : comprendre un besoin marketing, construire une réponse et vérifier son effet.</p>
          <p>Mon point fort est de réaliser cette première réponse. Je cherche à progresser en équipe sur la mesure produit et l'expérimentation.</p>
          <p>
            <Link className="lk" href="/knowledge/growth-engineer-ia">
              Le rôle de Growth Engineer, en détail
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
        <div className="matrix matrix-2 experience-matrix">
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
            <Link className="lk experience-proof" href="/projets/les-petites-griffes">Voir le projet Les Petites Griffes</Link>
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
            <strong>MBA Expert Marketing Digital · bac+5</strong>
            <p>2024–2026 · MyDigitalSchool, Paris</p>
            <p className="cert">Titre RNCP de niveau 7 : Manager de la stratégie marketing digital.</p>
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
