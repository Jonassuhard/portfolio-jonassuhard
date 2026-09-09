import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta, site } from "@/lib/projects";
import AnimatedTitle from "../animated-title";

export const metadata: Metadata = pageMeta({
  path: "/contact",
  title: "Contact",
  description:
    "Contacter Jonas Suhard pour un CDI junior à Paris, une mission web, une automatisation ou un projet d'IA appliquée."
});

export default function ContactPage() {
  return (
    <div className="page">
      <section className="case-hero">
        <div>
          <p className="eyebrow">Contact</p>
          <AnimatedTitle>Parlons d'un poste ou d'un projet.</AnimatedTitle>
          <p className="lead">
            Je cherche un CDI junior à Paris ou en hybride. Je prends aussi des
            projets web et d'automatisation quand le périmètre est clair.
          </p>
          <div className="button-row">
            <a className="button primary" href={`mailto:${site.email}`}>M'écrire</a>
            <a className="button" href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>

        <div className="contact-details">
          <h2>Pour me joindre</h2>
          <dl className="contact-facts">
            <div><dt>Email</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd></div>
            <div><dt>Disponibilité</dt><dd>Disponible maintenant</dd></div>
            <div><dt>Localisation</dt><dd>Paris ou hybride</dd></div>
            <div><dt>CV</dt><dd><a href={site.cvClassic}>Voir mon CV (PDF)</a></dd></div>
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <h2>Quel est votre besoin ?</h2>
          </div>
          <p>Un message court avec le contexte et l'objectif suffit pour commencer.</p>
        </div>

        <div className="matrix matrix-2">
          <article className="matrix-item">
            <strong>Recrutement CDI</strong>
            <p>
              Vous cherchez un profil junior qui relie marketing, développement
              web et IA appliquée.
            </p>
            <div className="button-row">
              <a className="button primary" href={`mailto:${site.email}`}>Parler d'un poste</a>
              <Link className="button" href="/recruteurs">Voir mon profil</Link>
              <a className="button" href={site.cvClassic} download>Télécharger le CV</a>
            </div>
          </article>

          <article className="matrix-item">
            <strong>Projet ponctuel</strong>
            <p>
              Vous avez besoin d'un site, d'une automatisation, d'un workflow
              IA cadré ou d'un audit SEO avec un livrable vérifiable.
            </p>
            <div className="button-row">
              <a className="button primary" href={`mailto:${site.email}`}>Décrire le projet</a>
              {site.malt ? (
                <a className="button" href={site.malt} target="_blank" rel="noreferrer">Voir Malt</a>
              ) : null}
              <Link className="button" href="/projets">Voir les projets</Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
