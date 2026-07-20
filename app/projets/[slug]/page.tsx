import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projectJsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { evidenceLevelMeta, getProject, projects, ogImage } from "@/lib/projects";
import AnimatedTitle from "../../animated-title";
import ProjectVideo from "../../project-video";

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

  const description = project.metaDescription ?? clampDescription(project.summary);
  const ogTitle = `${project.shortTitle} | Jonas Suhard`;

  return {
    title: project.shortTitle,
    description,
    robots: project.noindex ? { index: false, follow: true } : undefined,
    alternates: {
      canonical: `/projets/${project.slug}`,
      types: {
        "application/json": "/profile.json",
        "text/markdown": `/projects/${project.slug}.md`
      }
    },
    openGraph: {
      title: ogTitle,
      description,
      url: `/projets/${project.slug}`,
      type: "article",
      locale: "fr_FR",
      images: [ogImage]
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImage]
    }
  };
}

// Fallback quand aucune metaDescription n'est fournie : coupe le résumé sur un mot
// pour rester sous ~155 caractères (limite d'affichage SERP).
function clampDescription(text: string) {
  if (text.length <= 155) return text;
  const cut = text.slice(0, 152);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const jsonLd = projectJsonLd(project.slug);
  const breadcrumb = breadcrumbJsonLd([
    { name: "Accueil", path: "/" },
    { name: "Projets", path: "/projets" },
    { name: project.shortTitle, path: `/projets/${project.slug}` }
  ]);

  return (
    <div className="page">
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <section className="case-hero">
        <div>
          <p className="eyebrow">Case study</p>
          <span className={`evidence-badge evidence-${project.evidenceLevel}`}>
            {evidenceLevelMeta[project.evidenceLevel].label}
          </span>
          <AnimatedTitle>{project.title}</AnimatedTitle>
          <p className="lead">{project.summary}</p>
          {project.noindex ? (
            <p className="case-meta">Lab / archive — non mis en avant pour la candidature.</p>
          ) : null}
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
        {project.video ? (
          <ProjectVideo
            src={project.video}
            poster={project.video.replace(".mp4", "-poster.webp")}
            label={`Aperçu animé (filtre ASCII) du projet ${project.shortTitle}`}
          />
        ) : (
          <Image
            src={project.image}
            alt={`Aperçu du projet ${project.shortTitle}`}
            width={760}
            height={460}
            sizes="(max-width: 960px) calc(100vw - 28px), 520px"
            quality={75}
            loading="eager"
            fetchPriority="high"
          />
        )}
      </section>

      <section>
        <table className="summary-table">
          <tbody>
            <tr>
              <th scope="row">Type</th>
              <td>{project.type}</td>
            </tr>
            <tr>
              <th scope="row">Période</th>
              <td>{project.period}</td>
            </tr>
            <tr>
              <th scope="row">Rôle</th>
              <td>{project.role}</td>
            </tr>
            <tr>
              <th scope="row">Statut</th>
              <td>{project.status}</td>
            </tr>
            <tr>
              <th scope="row">Niveau de preuve</th>
              <td>{evidenceLevelMeta[project.evidenceLevel].description}</td>
            </tr>
            <tr>
              <th scope="row">Stack</th>
              <td>{project.stack.join(", ")}</td>
            </tr>
            <tr>
              <th scope="row">En bref</th>
              <td>{project.proofLine}</td>
            </tr>
            {project.evidenceNote ? (
              <tr>
                <th scope="row">Preuves</th>
                <td>{project.evidenceNote}</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </section>

      {project.gallery ? (
        <section className="section">
          <p className="section-kicker">Aperçu</p>
          <h2>Preuves visuelles.</h2>
          <div className="proof-gallery">
            {project.gallery.map((shot) => (
              <figure key={shot.src}>
                <Image
                  src={shot.src}
                  alt={shot.caption}
                  width={shot.width}
                  height={shot.height}
                  sizes="(max-width: 640px) calc(100vw - 28px), 520px"
                  quality={75}
                  loading="lazy"
                />
                <figcaption>{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section content-grid">
        <div className="prose">
          <section>
            <p className="section-kicker">Contraintes</p>
            <h2>Contexte et contraintes.</h2>
            <ul>
              {project.constraints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {project.architecture ? (
            <section>
              <p className="section-kicker">Architecture / workflow</p>
              <h2>Architecture.</h2>
              <ul>
                {project.architecture.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}

          <section>
            <p className="section-kicker">Décisions</p>
            <h2>Les choix et leurs compromis.</h2>
            <div className="table-scroll">
              <table className="decision-table">
                <thead>
                  <tr>
                    <th scope="col">Décision</th>
                    <th scope="col">Pourquoi</th>
                    <th scope="col">Écarté</th>
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
            </div>
          </section>

          <section>
            <p className="section-kicker">Livraison</p>
            <h2>Livrables.</h2>
            <ul>
              {project.delivered.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <p className="section-kicker">Résultats</p>
            <h2>Résultats.</h2>
            <ul>
              {project.results.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {project.notMeasured ? (
            <section>
              <p className="section-kicker">Pas encore mesuré</p>
              <h2>Ce qui reste à creuser.</h2>
              <ul>
                {project.notMeasured.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {project.v2 ? (
            <section>
              <p className="section-kicker">V2 / suite</p>
              <h2>Prochaine itération.</h2>
              <ul>
                {project.v2.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <aside className="panel">
          <h2>Signal pour une équipe</h2>
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
          <h3>Liens</h3>
          <ul>
            {project.links.map((link) => (
              <li key={link.href}>
                <a
                  className="lk"
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </div>
  );
}

