import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectJsonLd } from "@/lib/json-ld";
import { getProject, projects } from "@/lib/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Projet introuvable" };
  }

  return {
    title: project.shortTitle,
    description: project.summary,
    alternates: {
      canonical: `/projets/${project.slug}`,
      types: {
        "text/markdown": `/projects/${project.slug}.md`
      }
    }
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const jsonLd = projectJsonLd(project.slug);

  return (
    <div className="page">
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}

      <section className="case-hero">
        <div>
          <p className="eyebrow">Case study / Tier {project.tier}</p>
          <h1>{project.title}</h1>
          <p className="lead">{project.summary}</p>
          <div className="button-row">
            {project.links.map((link) => (
              <a
                className="button"
                href={link.href}
                key={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <img src={project.image} alt={`Aperçu du projet ${project.shortTitle}`} />
      </section>

      <section>
        <table className="summary-table">
          <tbody>
            <tr>
              <th>Type</th>
              <td>{project.type}</td>
            </tr>
            <tr>
              <th>Periode</th>
              <td>{project.period}</td>
            </tr>
            <tr>
              <th>Role</th>
              <td>{project.role}</td>
            </tr>
            <tr>
              <th>Statut</th>
              <td>{project.status}</td>
            </tr>
            <tr>
              <th>Stack</th>
              <td>{project.stack.join(", ")}</td>
            </tr>
            <tr>
              <th>Preuve</th>
              <td>{project.proofLine}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="section content-grid">
        <div className="prose">
          <section>
            <p className="section-kicker">Contraintes</p>
            <h2>Ce qui rend le projet réel.</h2>
            <ul>
              {project.constraints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <p className="section-kicker">Decisions</p>
            <h2>Choix faits, alternatives refusees.</h2>
            <table className="decision-table">
              <thead>
                <tr>
                  <th>Decision</th>
                  <th>Pourquoi</th>
                  <th>Alternative rejetee</th>
                </tr>
              </thead>
              <tbody>
                {project.decisions.map((item) => (
                  <tr key={item.decision}>
                    <td>{item.decision}</td>
                    <td>{item.why}</td>
                    <td>{item.rejected}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section>
            <p className="section-kicker">Livraison</p>
            <h2>Ce qui a ete produit.</h2>
            <ul>
              {project.delivered.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <p className="section-kicker">Resultats</p>
            <h2>Ce qu'on peut affirmer.</h2>
            <ul>
              {project.results.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="panel">
          <h2>Preuve recruteur</h2>
          <ul>
            {project.recruiterProof.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3>Limites</h3>
          <ul>
            {project.limits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </section>
    </div>
  );
}

