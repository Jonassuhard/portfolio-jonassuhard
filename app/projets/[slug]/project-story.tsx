import Image from "next/image";
import type { Project } from "@/lib/projects";

type ProjectStoryProps = {
  project: Project;
};

export default function ProjectStory({ project }: ProjectStoryProps) {
  const story = project.story;
  if (!story) return null;

  return (
    <>
      <section className="section project-story">
        <div className="section-head">
          <div>
            <p className="section-kicker">Intention</p>
            <h2>{story.purposeTitle}</h2>
          </div>
          <p>{story.purposeLead}</p>
        </div>
        <div className="story-lines">
          {story.purpose.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="section-kicker">Expérience</p>
            <h2>Trois façons de vivre le même projet.</h2>
          </div>
          <p>Les responsabilités changent selon le rôle ; les droits aussi.</p>
        </div>
        <div className="role-grid">
          {story.roles.map((role) => (
            <article className="role-item" key={role.title}>
              <h3>{role.title}</h3>
              <p>{role.text}</p>
            </article>
          ))}
        </div>
      </section>

      {project.versions?.length ? (
        <section className="section">
          <div className="section-head">
            <div>
              <p className="section-kicker">Deux versions</p>
              <h2>Deux niveaux de validation.</h2>
            </div>
            <p>
              La V2 et la V3 sont toutes les deux en 3D. Elles restent séparées
              parce qu'elles n'ont ni le même périmètre ni le même niveau de preuve.
            </p>
          </div>
          <div className="version-story-grid">
            {project.versions.map((version) => (
              <article className="version-story" key={version.label}>
                <p className="case-meta">{version.publicStatus ?? version.status}</p>
                <h3>{version.label} — {version.name}</h3>
                <p>{version.summary}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {story.galleryGroups.map((group) => (
        <section className="section" key={group.title}>
          <div className="section-head">
            <div>
              <p className="section-kicker">{group.kicker}</p>
              <h2>{group.title}</h2>
            </div>
            <p>{group.description}</p>
          </div>
          <div className={`proof-gallery${group.featuredFirst ? " proof-gallery-featured" : ""}`}>
            {group.images.map((shot) => (
              <figure key={shot.src}>
                <Image
                  src={shot.src}
                  alt={shot.caption}
                  width={shot.width}
                  height={shot.height}
                  sizes="(max-width: 640px) calc(100vw - 28px), 520px"
                  quality={78}
                  loading="lazy"
                />
                <figcaption>{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
