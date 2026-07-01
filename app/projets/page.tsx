import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projets",
  description:
    "Projets de Jonas Suhard : projets principaux (livrés), projets techniques et labs personnels."
};

const GROUPS = [
  { title: "Projets principaux", kicker: "Référence", tier: 1 as const },
  { title: "Projets techniques", kicker: "Technique", tier: 2 as const },
  { title: "Labs & archives", kicker: "Exploration", tier: 3 as const }
];

export default function ProjectsPage() {
  return (
    <div className="page">
      <section>
        <p className="eyebrow">Projets</p>
        <h1>Du projet principal au lab.</h1>
        <p className="lead">
          Trois niveaux, les projets livrés que je mets en avant, les projets
          techniques, puis les labs personnels. Chaque carte indique ce qui est
          public, privé ou en cours de publication.
        </p>
      </section>

      {GROUPS.map((group) => {
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
            <div className="case-grid">
              {list.map((project) => (
                <article className="case-card" key={project.slug}>
                  <img src={project.image} alt={`Aperçu du projet ${project.shortTitle}`} loading="lazy" decoding="async" />
                  <div className="case-body">
                    <h3>
                      <Link className="case-card-title" href={`/projets/${project.slug}`}>
                        {project.shortTitle}
                      </Link>
                    </h3>
                    <p>{project.summary}</p>
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
    </div>
  );
}
