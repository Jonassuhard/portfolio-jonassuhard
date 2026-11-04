import type { Metadata } from "next";
import Link from "next/link";
import { evidenceLevelMeta, featuredProjects, skills, site, pageAlternates } from "@/lib/projects";
import AnimatedTitle from "./animated-title";
import ProjectCardImage from "./project-card-image";

export const metadata: Metadata = {
  alternates: pageAlternates("/")
};

export default function HomePage() {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-copy">
          <div>
            <p className="eyebrow">CDI · Paris ou hybride · disponible immédiatement</p>
            <AnimatedTitle glitch>
              Chef de projet IA appliquée &amp; automatisation junior
            </AnimatedTitle>
            <p className="role-aliases">Growth Engineer junior · Product Builder IA</p>
            <p className="title-definition">
              <Link href="/a-propos#growth-engineer" prefetch={false}>Pourquoi je garde aussi le rôle Growth Engineer →</Link>
            </p>
            <p className="lead">
              Je prends le dernier kilomètre des projets IA et web : les données,
              les validations, la mesure. Je livre un outil qui tourne, puis je
              documente ce qu'il faut pour qu'une équipe le reprenne. Je ne
              promets pas une transformation : une version qui tourne, une
              mesure et une trace écrite.
            </p>
          </div>
          <div className="button-row">
            <a className="button primary" href={`mailto:${site.email}`}>
              Me contacter
            </a>
            <Link className="button" href="/projets" prefetch={false}>
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
              <time>2026-10</time>
              <strong>Radar d'offres + scoring</strong>
              <span>Job Radar, connecteurs ATS, fusion des offres et dashboard local.</span>
            </div>
            <div className="ledger-item">
              <time>2026-06</time>
              <strong>Site live + CMS + assistant IA</strong>
              <span>Les Petites Griffes, prod live et contenus éditables.</span>
            </div>
            <div className="ledger-item">
              <time>2026</time>
              <strong>Refonte SEO à l'échelle</strong>
              <span>ISCOM, 359 pages Drupal, audit de cannibalisation et validation humaine.</span>
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
            <h2>Trois projets, trois terrains.</h2>
          </div>
          <p>
            Un outil d'automatisation construit de bout en bout, un site client
            en production et une refonte SEO à l'échelle d'un site employeur.
            Trois preuves différentes, pas trois variations du même récit.
          </p>
        </div>

        <div className="proof-grid">
          {featuredProjects.map((project) => (
            <article className="proof-card" key={project.slug}>
              <ProjectCardImage
                src={project.image}
                alt={`Aperçu du projet ${project.shortTitle}`}
              />
              <div className="proof-body">
                <span className={`evidence-badge evidence-${project.evidenceLevel}`}>
                  {evidenceLevelMeta[project.evidenceLevel].label}
                </span>
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
            <h2>Ce que je sais faire, avec le projet qui le prouve.</h2>
          </div>
          <p>
            Une compétence sans projet est une déclaration. Chaque ligne indique
            où elle a servi et ce qui reste à consolider.
          </p>
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
            Quatre temps sur chaque projet. Les trois premiers font avancer ;
            le dernier décide si le travail survit à celui qui l'a fait.
            <Link href="/methode"> Voir la méthode en détail.</Link>
          </p>
        </div>
        <div className="matrix matrix-2">
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
          <strong>La question que je pose avant de coder.</strong>
          <p>
            Qu'est-ce qui, dans votre métier, coûte cher uniquement parce que
            c'est long à vérifier ? C'est là que je commence. Pas par l'outil.
            Par le test qui manque.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="notice">
          <strong>Ce que je cherche.</strong>
          <p>
            Un CDI à Paris ou hybride, dans une équipe qui a des utilisateurs,
            un interlocuteur technique et des priorités explicites. Le reste,
            je l'apprends en travaillant.
          </p>
          <div className="button-row">
            <Link className="button primary" href="/recruteurs">
              Page recruteurs
            </Link>
            <Link className="button" href="/preuves">
              Registre des preuves
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
