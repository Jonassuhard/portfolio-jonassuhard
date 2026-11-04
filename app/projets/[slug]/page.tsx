import type { Metadata } from "next";
import ProjectImage from "../../project-image";
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
        <tr><th scope="row">Résumé</th><td>{project.summary}</td></tr>
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
  const primaryLink = project.links.find((link) => link.external);
  const cover = project.heroImage ?? project.gallery?.find((shot) => !shot.poster);
  const gallery = project.gallery?.filter((shot) => project.video || shot.src !== cover?.src);

  return (
    <div className="page project-page">
      {jsonLd ? (
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      ) : null}
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section className="case-hero project-hero">
        <div>
          <p className="eyebrow">Projet · {project.period}</p>
          <AnimatedTitle>{project.shortTitle}</AnimatedTitle>
          <p className="lead">{project.cardLine ?? project.summary}</p>
          <p className="project-state">{project.cardStatus ?? project.status}</p>
          <p className="project-role"><strong>Mon rôle</strong> {project.roleSummary ?? project.role}</p>
          {project.codeByOthers ? (
            <p>Le développement et le design sont ceux de l'équipe.</p>
          ) : null}
          <div className="button-row">
            {primaryLink ? (
              <a className="button primary" href={primaryLink.href} target="_blank" rel="noreferrer">
                {primaryLink.label}
              </a>
            ) : null}
            <a className="lk" href={`/projects/${project.slug}.md`}>Version Markdown</a>
          </div>
        </div>
        <div className="project-hero-media">
          {project.video ? (
            <ProjectVideo src={project.video} poster={project.video.replace(".mp4", "-poster.webp")}
              label={`Aperçu vidéo du projet ${project.shortTitle}`}
              width={project.videoWidth} height={project.videoHeight} />
          ) : (
            <figure>
              <ProjectImage src={cover?.src ?? project.image}
                alt={cover?.caption ?? `Aperçu du projet ${project.shortTitle}`}
                width={cover?.width ?? 760} height={cover?.height ?? 460}
                sizes="(max-width: 960px) calc(100vw - 28px), 560px"
                quality={75} loading="eager" fetchPriority="high"
                className={project.fullColorMedia ? "full-color-media" : undefined} />
              {cover ? <figcaption>{cover.caption}</figcaption> : null}
            </figure>
          )}
        </div>
      </section>

      {project.need || project.intention ? (
        <section className="section project-need" id="besoin">
          {project.need ? (
            <div>
              <p className="section-kicker">Le besoin</p>
              <h2>{project.need.title}</h2>
              <p>{project.need.lead}</p>
            </div>
          ) : null}
          {project.intention ? (
            <div>
              <h3>{project.intention.title}</h3>
              <p>{project.intention.lead}</p>
            </div>
          ) : null}
        </section>
      ) : null}

      {project.story ? <ProjectStory project={project} /> : null}

      {!project.story && gallery?.length ? (
        <section className="section" id="galerie">
          <h2>Le projet en images.</h2>
          <div className="proof-gallery proof-gallery-readable">
            {gallery.map((shot) => (
              <figure key={shot.src}>
                {shot.poster ? (
                  <ProjectVideo src={shot.src} poster={shot.poster} label={shot.caption}
                    width={shot.width} height={shot.height} eager={false} />
                ) : (
                  <ProjectImage src={shot.src} alt={shot.caption} width={shot.width} height={shot.height}
                    sizes="(max-width: 640px) calc(100vw - 28px), 552px"
                    quality={78} loading="lazy"
                    className={`full-color-media${shot.height / shot.width > 1.6 ? " proof-portrait" : ""}`} />
                )}
                <figcaption>{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section project-outcomes">
        <div>
          <p className="section-kicker">Mon travail</p>
          <h2>Ce que j'ai réalisé.</h2>
          <ul>{project.delivered.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div>
          <h3>Ce que ce projet montre</h3>
          <ul>{project.recruiterProof.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>

      {!project.story && project.versions?.length ? (
        <section className="section">
          <h2>{project.versionsTitle ?? "Deux versions, deux périmètres."}</h2>
          <div className="version-story-grid">
            {project.versions.map((version) => (
              <article className="version-story" key={version.label}>
                <p className="case-meta">{version.publicStatus ?? version.status}</p>
                <h3>{version.label} · {version.name}</h3>
                <p>{version.summary}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section project-limits">
        <h2>Où en est le projet ?</h2>
        <p>{project.status}</p>
        <ul>{project.limits.map((item) => <li key={item}>{item}</li>)}</ul>
        {project.notMeasured?.length ? (
          <details className="reading-details">
            <summary>Ce qui n'est pas encore mesuré</summary>
            <ul>{project.notMeasured.map((item) => <li key={item}>{item}</li>)}</ul>
          </details>
        ) : null}
      </section>

      <section className="section project-technical">
        <h2>Choix, résultats et preuves.</h2>
        <details className="technical-details">
          <summary>Ouvrir le dossier technique</summary>
          <div className="technical-content">
            <div>
              <span className={`evidence-badge evidence-${project.evidenceLevel}`}>
                {evidenceLevelMeta[project.evidenceLevel].label}
              </span>
              <ProjectSummaryTable project={project} />
            </div>

            {project.need || project.intention ? (
              <div className="project-need">
                {project.need ? (
                  <div>
                    <h3>Les besoins détaillés</h3>
                    <ul>{project.need.items.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                ) : null}
                {project.intention ? (
                  <div>
                    <h3>Les règles du produit</h3>
                    <ul>{project.intention.items.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                ) : null}
              </div>
            ) : null}

            <section>
              <h3>Les contraintes de départ</h3>
              <ul>{project.constraints.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>

            <section>
              <h3>Les décisions</h3>
              <div className="table-scroll" tabIndex={0} role="region" aria-label="Décisions du projet">
                <table className="decision-table">
                  <thead>
                    <tr><th scope="col">Décision</th><th scope="col">Pourquoi</th><th scope="col">Écarté</th></tr>
                  </thead>
                  <tbody>
                    {project.decisions.map((item) => (
                      <tr key={item.decision}><td>{item.decision}</td><td>{item.why}</td><td>{item.rejected}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {project.delivered.length > 3 ? (
              <section>
                <h3>Autres éléments livrés</h3>
                <ul>{project.delivered.slice(3).map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
            ) : null}
            <section>
              <h3>Les résultats documentés</h3>
              <ul>{project.results.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>

            {project.versions?.length ? (
              <section className="technical-versions">
                <h3>La validation de chaque version</h3>
                {project.story ? <p>Ces contrôles techniques ne remplacent pas une validation humaine en classe.</p> : null}
                {project.versions.map((version) => (
                  <details className="reading-details" key={version.label}>
                    <summary>{version.label} · preuves et limites techniques</summary>
                    <p className="case-meta">{version.status}</p>
                    <h4>Preuves</h4>
                    <ul>{version.evidence.map((item) => <li key={item}>{item}</li>)}</ul>
                    <h4>Limites</h4>
                    <ul>{version.limits.map((item) => <li key={item}>{item}</li>)}</ul>
                  </details>
                ))}
              </section>
            ) : null}

            {project.v2 ? (
              <section>
                <h3>La suite envisagée</h3>
                <ul>{project.v2.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
            ) : null}

            {project.architecture || project.architectureImage ? (
              <section className="project-architecture">
                <h3>{project.architectureTitle ?? "Architecture et outils"}</h3>
                {project.architectureLead ? <p>{project.architectureLead}</p> : null}
                {project.architectureImage ? (
                  <figure>
                    <ProjectImage src={project.architectureImage.src} alt={project.architectureImage.caption}
                      width={project.architectureImage.width} height={project.architectureImage.height}
                      sizes="(max-width: 640px) calc(100vw - 28px), 1120px"
                      quality={75} className="full-color-media" />
                    <figcaption>{project.architectureImage.caption}</figcaption>
                  </figure>
                ) : null}
                <ul>{project.architecture?.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
            ) : null}

            <div>
              <h3>Tous les liens</h3>
              <ul className="project-source-links">
                {project.links.map((link) => (
                  <li key={link.href}>
                    <a className="lk" href={link.href} target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noreferrer" : undefined}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </details>
      </section>
    </div>
  );
}
