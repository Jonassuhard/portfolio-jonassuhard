import type { Metadata } from "next";
import Link from "next/link";
import { skills, skillGroups, getProject, pageMeta, toAnchorId } from "@/lib/projects";
import AnimatedTitle from "../animated-title";

export const metadata: Metadata = pageMeta({
  path: "/competences",
  title: "Compétences",
  description: "Compétences de Jonas Suhard reliées à des projets livrés et documentés."
});

export default function SkillsPage() {
  return (
    <div className="page">
      <section>
        <p className="eyebrow">Compétences</p>
        <AnimatedTitle>Ce que je peux apporter à une équipe.</AnimatedTitle>
        <p className="lead">
          Chaque domaine est relié à des projets et à ses limites actuelles.
        </p>
      </section>

      <section className="section skills-groups">
        {skillGroups.map((group) => (
          <div className="skills-group" key={group}>
            <h3>{group}</h3>
            <div className="matrix">
              {skills
                .filter((skill) => skill.group === group)
                .map((skill) => (
                  <article
                    className="matrix-item"
                    id={toAnchorId(skill.name)}
                    key={skill.name}
                  >
                    <strong>{skill.name}</strong>
                    <p>{skill.note}</p>
                    <p className="case-meta">
                      {skill.proofSlugs.map((slug, i) => {
                        const project = getProject(slug);
                        if (!project) return null;
                        return (
                          <span key={slug}>
                            {i > 0 ? " · " : ""}
                            <Link className="lk" href={`/projets/${project.slug}`}>
                              {project.shortTitle}
                            </Link>
                          </span>
                        );
                      })}
                      {skill.proofExtra ? ` · ${skill.proofExtra}` : ""}
                    </p>
                    <p className="skill-limit">Limite : {skill.limit}</p>
                  </article>
                ))}
            </div>
          </div>
        ))}
      </section>

      <section className="section">
        <div className="notice">
          <strong>Chaque compétence renvoie à un projet réel.</strong>
          <p>Les fiches détaillent ce qui a été fait, ce qui le prouve et les limites.</p>
          <div className="button-row">
            <Link className="button primary" href="/projets">
              Voir les projets
            </Link>
            <Link className="button" href="/recruteurs">
              Page recruteurs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
