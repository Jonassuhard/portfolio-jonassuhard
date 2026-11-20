import ProjectImage from "../../project-image";
import ProjectVideo from "../../project-video";
import type { DevlogMedia, ProjectDevlog as Devlog } from "@/lib/project-devlog";

function Media({ items, wide = false }: { items: DevlogMedia[]; wide?: boolean }) {
  if (!items.length) return null;
  const strips = items.every((item) => item.width / item.height > 3);
  return (
    <div className={`proof-gallery devlog-media${wide || strips || items.length === 1 ? " devlog-media-single" : ""}`}>
      {items.map((item) => (
        <figure key={item.src}>
          {item.kind === "video" ? (
            <ProjectVideo src={item.src} poster={item.poster ?? ""} label={item.caption}
              width={item.width} height={item.height} eager={false} />
          ) : (
            <ProjectImage src={item.src} alt={item.caption} width={item.width} height={item.height}
              sizes="(max-width: 640px) calc(100vw - 28px), 1040px"
              quality={75} loading="lazy"
              className={`full-color-media${item.height > item.width ? " proof-portrait" : ""}`} />
          )}
          <figcaption>{item.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function ProjectDevlog({ devlog }: { devlog: Devlog }) {
  return (
    <>
      <section className="section devlog-sheet" id="fiche">
        <p className="section-kicker">Fiche du jeu</p>
        <h2>{devlog.pitch}</h2>
        <dl className="devlog-facts">
          {devlog.sheet.map((row) => (
            <div key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section" id="piliers">
        <p className="section-kicker">Piliers</p>
        <h2>{devlog.pillarsTitle}</h2>
        <div className="role-grid devlog-pillars">
          {devlog.pillars.map((pillar) => (
            <article className="role-item" key={pillar.title}>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="versions">
        <p className="section-kicker">Histoire du projet</p>
        <h2>{devlog.versionsTitle}</h2>
        <p className="devlog-lead">{devlog.versionsLead}</p>
        <ol className="devlog-versions">
          {devlog.versions.map((version) => (
            <li key={version.label}>
              <div className="devlog-version-head">
                <span className="devlog-tag">{version.label}</span>
                <p className="case-meta">{version.period}</p>
                <h3>{version.name}</h3>
              </div>
              <div className="devlog-version-body">
                {version.text.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <p className="devlog-kept"><strong>Ce que j&apos;en garde</strong> {version.kept}</p>
                <Media items={version.media} />
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section" id="etapes">
        <p className="section-kicker">Journal de développement</p>
        <h2>{devlog.stepsTitle}</h2>
        <p className="devlog-lead">{devlog.stepsLead}</p>
        <ol className="devlog-steps">
          {devlog.steps.map((step, index) => (
            <li key={step.title}>
              <div className="devlog-step-head">
                <span className="flow-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p className="case-meta">{step.when}</p>
              </div>
              <div className="devlog-step-body">
                <p><strong>Le problème</strong> {step.problem}</p>
                <p><strong>Ce que j&apos;ai fait</strong> {step.solution}</p>
                {step.result ? <p className="devlog-result">{step.result}</p> : null}
                <Media items={step.media} />
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section" id="mesure">
        <p className="section-kicker">Mesure</p>
        <h2>{devlog.measureTitle}</h2>
        <p className="devlog-lead">{devlog.measureLead}</p>
        <div className="table-scroll" tabIndex={0} role="region" aria-label="Images par seconde sur un ordinateur de l'école">
          <table className="decision-table devlog-measure">
            <thead>
              <tr>
                <th scope="col">Endroit du jeu</th>
                <th scope="col">Images par seconde</th>
                <th scope="col">Dans les moments les plus lents</th>
              </tr>
            </thead>
            <tbody>
              {devlog.measureRows.map((row) => (
                <tr key={row.where}><td>{row.where}</td><td>{row.fps}</td><td>{row.slow}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="devlog-lead">{devlog.measureNote}</p>
      </section>

      <section className="section" id="methode">
        <p className="section-kicker">Méthode</p>
        <h2>{devlog.methodTitle}</h2>
        <div className="role-grid devlog-pillars">
          {devlog.method.map((item) => (
            <article className="role-item" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="chiffres">
        <p className="section-kicker">Chiffres</p>
        <h2>{devlog.numbersTitle}</h2>
        <dl className="devlog-numbers">
          {devlog.numbers.map((item) => (
            <div key={item.label}>
              <dt>{item.value}</dt>
              <dd>{item.label}<span>Source : {item.source}</span></dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section" id="lecons">
        <p className="section-kicker">Retour d&apos;expérience</p>
        <h2>{devlog.learnedTitle}</h2>
        <div className="role-grid devlog-pillars">
          {devlog.learned.map((item) => (
            <article className="role-item" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="suite">
        <p className="section-kicker">Suite</p>
        <h2>{devlog.nextTitle}</h2>
        <ol className="devlog-next">
          {devlog.next.map((item) => <li key={item}>{item}</li>)}
        </ol>
      </section>
    </>
  );
}
