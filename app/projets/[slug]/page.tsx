import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projectJsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { evidenceLevelMeta, getProject, projects, ogImage, type Project } from "@/lib/projects";
import AnimatedTitle from "../../animated-title";
import ProjectVideo from "../../project-video";
import ProjectStory from "./project-story";

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

function ProjectSummaryTable({ project }: { project: Project }) {
  return (
    <table className="summary-table">
      <tbody>
        <tr><th scope="row">Type</th><td>{project.type}</td></tr>
        <tr><th scope="row">Période</th><td>{project.period}</td></tr>
        <tr><th scope="row">Rôle</th><td>{project.role}</td></tr>
        <tr><th scope="row">Statut</th><td>{project.status}</td></tr>
        <tr><th scope="row">Niveau de preuve</th><td>{evidenceLevelMeta[project.evidenceLevel].description}</td></tr>
        <tr><th scope="row">Stack</th><td>{project.stack.join(", ")}</td></tr>
        <tr><th scope="row">Ce que ça prouve</th><td>{project.proofLine}</td></tr>
        {project.evidenceNote ? (
          <tr><th scope="row">Preuves</th><td>{project.evidenceNote}</td></tr>
        ) : null}
      </tbody>
    </table>
  );
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
          <p className="eyebrow">Projet</p>
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
            label={`Aperçu vidéo du projet ${project.shortTitle}`}
          />
        ) : (
          <Image
            src={project.heroImage?.src ?? project.image}
            alt={project.heroImage?.caption ?? `Aperçu du projet ${project.shortTitle}`}
            width={project.heroImage?.width ?? 760}
            height={project.heroImage?.height ?? 460}
            sizes="(max-width: 960px) calc(100vw - 28px), 520px"
            quality={75}
            loading="eager"
            fetchPriority="high"
            className={project.fullColorMedia ? "full-color-media" : undefined}
          />
        )}
      </section>

      {project.story ? <ProjectStory project={project} /> : (
        <section><ProjectSummaryTable project={project} /></section>
      )}

      {project.need || project.intention ? (
        <section className="section project-narrative-band">
          {project.need ? (
            <article className="project-narrative" aria-labelledby={`${project.slug}-need`}>
              <div>
                <p className="section-kicker">Besoin</p>
                <h2 id={`${project.slug}-need`}>{project.need.title}</h2>
                <p className="lead">{project.need.lead}</p>
              </div>
              <ul>
                {project.need.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ) : null}
          {project.intention ? (
            <article className="project-narrative" aria-labelledby={`${project.slug}-intention`}>
              <div>
                <p className="section-kicker">Intention</p>
                <h2 id={`${project.slug}-intention`}>{project.intention.title}</h2>
                <p className="lead">{project.intention.lead}</p>
              </div>
              <ul>
                {project.intention.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ) : null}
        </section>
      ) : null}

      {project.architectureImage ? (
        <section className="section project-architecture">
          <div className="section-head">
            <div>
              <p className="section-kicker">Architecture</p>
              <h2>Des entrées locales au score expliqué.</h2>
            </div>
            <p>
              Chaque étape conserve sa provenance. Le navigateur présente les
              résultats ; le noyau local reste la seule source du calcul.
            </p>
          </div>
          <figure>
            <Image
              src={project.architectureImage.src}
              alt={project.architectureImage.caption}
              width={project.architectureImage.width}
              height={project.architectureImage.height}
              sizes="(max-width: 640px) calc(100vw - 28px), 1120px"
              quality={75}
              loading="lazy"
              className={project.fullColorMedia ? "full-color-media" : undefined}
            />
            <figcaption>{project.architectureImage.caption}</figcaption>
          </figure>
          {project.architecture ? (
            <ol className="architecture-steps">
              {project.architecture.map((item) => <li key={item}>{item}</li>)}
            </ol>
          ) : null}
        </section>
      ) : null}

      {!project.story && project.versions?.length ? (
        <section className="section">
          <p className="section-kicker">Versions</p>
          <h2>V2 et V3 n'ont pas le même statut.</h2>
          <div className="matrix matrix-2">
            {project.versions.map((version) => (
              <article className="matrix-item" key={version.label}>
                <p className="case-meta">{version.status}</p>
                <h3>{version.label} — {version.name}</h3>
                <p>{version.summary}</p>
                <strong>Preuves</strong>
                <ul>
                  {version.evidence.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <strong>Limites</strong>
                <ul>
                  {version.limits.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {!project.story && project.gallery ? (
        <section className="section">
          <p className="section-kicker">Aperçu</p>
          <h2>Ce qui est visible.</h2>
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
                  className={project.fullColorMedia ? "full-color-media" : undefined}
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
            <h2>Ce qu'il fallait respecter.</h2>
            <ul>
              {project.constraints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {!project.story && project.architecture && !project.architectureImage ? (
            <section>
              <p className="section-kicker">Fonctionnement</p>
              <h2>Comment ça fonctionne.</h2>
              <ul>
                {project.architecture.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}

          <section>
            <p className="section-kicker">Décisions</p>
            <h2>Pourquoi ces choix.</h2>
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
            <h2>Ce que j'ai livré.</h2>
            <ul>
              {project.delivered.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <p className="section-kicker">Résultats</p>
            <h2>Ce qui fonctionne aujourd'hui.</h2>
            <ul>
              {project.results.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {project.notMeasured ? (
            <section>
              <p className="section-kicker">Pas encore mesuré</p>
              <h2>Ce qui n'est pas encore mesuré.</h2>
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
              <h2>La prochaine étape.</h2>
              <ul>
                {project.v2.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <aside className="panel">
          <h2>Ce que ce projet montre</h2>
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

      {project.story ? (
        <section className="section project-technical">
          <div className="section-head">
            <div>
              <p className="section-kicker">Preuves techniques</p>
              <h2>Le dossier de validation, à sa juste place.</h2>
            </div>
            <p>
              Ces éléments servent à contrôler le projet. Ils ne remplacent ni
              un test en classe ni l'observation des enfants et de l'enseignante.
            </p>
          </div>
          <ProjectSummaryTable project={project} />
          {project.architecture ? (
            <div className="technical-architecture">
              <h3>Architecture</h3>
              <ul>
                {project.architecture.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ) : null}
          {project.versions?.length ? (
            <div className="technical-details-grid">
              {project.versions.map((version) => (
                <details key={version.label}>
                  <summary>{version.label} — preuves et limites techniques</summary>
                  <p className="case-meta">{version.status}</p>
                  <strong>Preuves</strong>
                  <ul>
                    {version.evidence.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <strong>Limites</strong>
                  <ul>
                    {version.limits.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </details>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
