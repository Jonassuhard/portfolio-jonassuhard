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
        <AnimatedTitle>Du projet principal au lab.</AnimatedTitle>
        <p className="lead">
          Trois niveaux. Les projets que je mets en avant, les preuves
          techniques, puis les labs. Chaque carte dit ce qui est public, privé
          ou en cours. Une preuve privée se montre en entretien ; elle ne se cite
          pas comme un lien public.
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
                  />
                  <div className="case-body">
                    <span className={`evidence-badge evidence-${project.evidenceLevel}`}>
                      {evidenceLevelMeta[project.evidenceLevel].label}
                    </span>
                    <h3>
                      <Link className="case-card-title" href={`/projets/${project.slug}`}>
                        {project.shortTitle}
                      </Link>
                    </h3>
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
          <strong>Un projet ne vaut pas par sa stack.</strong>
          <p>
            Il vaut par ce qu'il prouve, ce qu'il coûte et ce qu'il ne règle
            pas. Je reprends n'importe lequel de ces projets en entretien :
            architecture, décisions et limites, sans filtre.
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
