import type { Metadata } from "next";
import Link from "next/link";
import { featuredProjects, skills, site, pageAlternates } from "@/lib/projects";

export const metadata: Metadata = {
  alternates: pageAlternates("/")
};

export default function HomePage() {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-copy">
          <div>
            <p className="eyebrow">CDI · Paris ou hybride · disponible le 1er septembre 2026</p>
            <h1>Growth Engineer · IA appliquée &amp; Automatisation</h1>
            <p className="lead">
              Je viens du marketing et j'ai appris à coder pour livrer moi-même :
              sites, workflows IA, automatisations, contenus SEO. Je documente
              pour que l'équipe reprenne derrière.
            </p>
          </div>
          <div className="button-row">
            <a className="button primary" href={`mailto:${site.email}`}>
              Me contacter
            </a>
            <Link className="button" href="/projets">
              Voir les projets
            </Link>
          </div>
          <p className="cta-sub">
            CV : <a href={site.cvStyled}>version site</a> · <a href={site.cvClassic}>classique</a>
          </p>
        </div>

        <aside className="ledger" aria-label="Journal de projets">
          <div>
            <p className="ledger-title">Journal de build</p>
            <h2>Trois builds récents.</h2>
          </div>
          <div className="ledger-list">
            <div className="ledger-item">
              <time>2026-06</time>
              <strong>Site live + CMS + assistant IA</strong>
              <span>Les Petites Griffes, prod live et contenus éditables.</span>
            </div>
            <div className="ledger-item">
              <time>2026-06</time>
              <strong>App classe + données sensibles</strong>
              <span>Educool, Firebase, PDF, sécurité et retours terrain.</span>
            </div>
            <div className="ledger-item">
              <time>2026-06</time>
              <strong>Production SEO + validation humaine</strong>
              <span>ISCOM, articles publiés dans Drupal, fact-check avant mise en ligne.</span>
            </div>
          </div>
        </aside>

        <a className="hero-scroll" href="#preuves">
          <span>Preuves</span>
          <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="section" id="preuves">
        <div className="section-head">
          <div>
            <p className="section-kicker">Projets phares</p>
            <h2>Mes trois projets les plus solides.</h2>
          </div>
          <p>
            Trois terrains différents : un site client en production, une app
            métier avec données sensibles, une production SEO en entreprise avec
            preuve en ligne.
          </p>
        </div>

        <div className="proof-grid">
          {featuredProjects.map((project) => (
            <article className="proof-card" key={project.slug}>
              <img src={project.image} alt={`Aperçu du projet ${project.shortTitle}`} width={760} height={460} loading="lazy" decoding="async" />
              <div className="proof-body">
                <p className="case-meta">{project.type}</p>
                <h3>{project.shortTitle}</h3>
                <p>{project.cardLine ?? project.proofLine}</p>
                <div className="tag-row">
                  {project.stack.slice(0, 4).map((item) => (
                    <span className="tag" key={item}>{item}</span>
                  ))}
                </div>
                <Link
                  className="button"
                  href={`/projets/${project.slug}`}
                  aria-label={`Voir le projet ${project.shortTitle}`}
                >
                  Voir le projet
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="section-kicker">Compétences reliées</p>
            <h2>Ce que je sais faire, projets à l'appui.</h2>
          </div>
          <p>Chaque compétence s'appuie sur des projets livrés et documentés.</p>
        </div>

        <div className="matrix">
          {skills.map((skill) => (
            <div className="matrix-item" key={skill.name}>
              <strong>{skill.name}</strong>
              <p>{skill.note}</p>
              <p className="case-meta">{skill.proof}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="section-kicker">Méthode</p>
            <h2>Cadrer, construire, vérifier, transmettre.</h2>
          </div>
          <p>
            Quatre temps sur chaque projet. Le dernier compte autant que les
            autres : un travail qui ne se transmet pas s'arrête avec celui qui
            l'a fait. <Link href="/methode">Voir la méthode en détail.</Link>
          </p>
        </div>
        <div className="matrix">
          <div className="matrix-item">
            <strong>Cadrer</strong>
            <p>Comprendre le besoin, poser les contraintes et les hypothèses avant d'écrire une ligne.</p>
          </div>
          <div className="matrix-item">
            <strong>Construire</strong>
            <p>Livrer un premier outil qui marche, en production, pas une maquette.</p>
          </div>
          <div className="matrix-item">
            <strong>Vérifier</strong>
            <p>Tester, mesurer, fact-checker : jamais « c'est fait » sans preuve.</p>
          </div>
          <div className="matrix-item">
            <strong>Transmettre</strong>
            <p>Documenter pour qu'une équipe reprenne le travail sans moi.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="notice">
          <strong>Ce que je cherche.</strong>
          <p>
            Un CDI à Paris ou hybride, dans une équipe qui relie acquisition,
            IA appliquée et exécution produit.
          </p>
          <div className="button-row">
            <Link className="button primary" href="/recruteurs">
              Page recruteurs
            </Link>
            <a className="button" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
