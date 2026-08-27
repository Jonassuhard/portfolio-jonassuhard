import type { Metadata } from "next";
import Link from "next/link";
import { evidenceLevelMeta, projects, site, pageMeta } from "@/lib/projects";
import AnimatedTitle from "../animated-title";
import ProjectCardImage from "../project-card-image";

export const metadata: Metadata = pageMeta({
  path: "/projets",
  title: "Projets",
  description:
    "Projets de Jonas Suhard : projets principaux (livrés), projets techniques et labs personnels."
});

const GROUPS = [
  { title: "Projets principaux", kicker: "Référence", tier: 1 as const },
  { title: "Projets techniques", kicker: "Technique", tier: 2 as const },
  { title: "Labs & archives", kicker: "Exploration", tier: 3 as const }
];

export default function ProjectsPage() {
  return (
    <div className="page page-dense">
      <section>
        <p className="eyebrow">Projets</p>
        <AnimatedTitle>Des projets livrés aux essais.</AnimatedTitle>
        <p className="lead">
          Les projets principaux, les projets techniques et les essais
          personnels. Chaque carte indique ce qui est public, privé ou encore
          en préparation.
        </p>
      </section>

      {GROUPS.map((group, groupIndex) => {
        const list = projects.filter((project) => project.tier === group.tier);
        if (!list.length) return null;
        return (
          <section className="section" key={group.title}>
            <div className="section-head">
              <div>
                <p className="section-kicker">{group.kicker}</p>
                <h2>{group.title}</h2>
              </div>
            </div>
            <div className={group.tier === 1 ? "case-grid" : "case-grid case-grid-compact"}>
              {list.map((project, projectIndex) => (
                <article className="case-card" key={project.slug}>
                  <ProjectCardImage
                    src={project.image}
                    alt={`Aperçu du projet ${project.shortTitle}`}
                    preload={groupIndex === 0 && projectIndex === 0}
                    fullColor={project.fullColorMedia}
                  />
                  <div className="case-body">
                    <span className={`evidence-badge evidence-${project.evidenceLevel}`}>
                      {evidenceLevelMeta[project.evidenceLevel].label}
                    </span>
                    <h3 className="card-title-accessible">{project.shortTitle}</h3>
                    <Link
                      className="case-card-link"
                      href={`/projets/${project.slug}`}
                      aria-label={`Voir le projet ${project.shortTitle}`}
                    />
                    <p>
                      {group.tier === 1
                        ? project.summary
                        : project.cardLine ?? project.proofLine ?? project.summary}
                    </p>
                    <div className="access-links">
                      <a className="lk" href={`/projects/${project.slug}.md`}>Markdown</a>
                      {project.links
                        .filter((link) => link.external)
                        .map((link) => (
                          <a className="lk" key={link.href} href={link.href} target="_blank" rel="noreferrer">
                            {link.label}
                          </a>
                        ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}

      <section className="section">
        <div className="notice">
          <strong>Parlons des projets.</strong>
          <p>
            En entretien, je peux expliquer le besoin, les choix, les preuves
            et les limites de chaque projet.
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
