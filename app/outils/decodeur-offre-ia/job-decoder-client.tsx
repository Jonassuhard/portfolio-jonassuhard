"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import {
  AXIS_LABELS,
  VALUE_LABELS,
  decodeJobOffer,
  type AxisName,
  type JobDecoderResult
} from "@/lib/job-decoder";


const CONFIDENCE_LABELS = { clear: "Indice clair", mixed: "Lecture mixte", insufficient: "Matière insuffisante" } as const;
const SIGNAL_LABELS = { coherent: "Candidature cohérente", investigate: "À approfondir", "large-gap": "Écart important" } as const;
const COVERAGE_LABELS = { existing: "Preuve existante", partial: "Preuve partielle", missing: "Preuve absente" } as const;

export default function JobDecoderClient() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<JobDecoderResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  function analyze(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const length = description.trim().length;
    if (length < 250) {
      setError(`Ajoute encore ${250 - length} caractères pour obtenir une lecture sérieuse.`);
      setResult(null);
      return;
    }
    if (length > 30_000) {
      setError("L’offre dépasse la limite de 30 000 caractères.");
      setResult(null);
      return;
    }
    setError("");
    setResult(decodeJobOffer(title, description));
    requestAnimationFrame(() => resultRef.current?.focus());
  }

  return (
    <>
      <section className="section decoder-input-panel" data-clarity-mask="true">
        <div className="section-head">
          <div><p className="section-kicker">Dossier entrant</p><h2>Texte de l’offre</h2></div>
          <p>L’entreprise et l’intitulé aident la lecture, mais seul le texte de l’offre est obligatoire.</p>
        </div>
        <form className="decoder-form" onSubmit={analyze} noValidate>
          <div className="decoder-fields-row">
            <label>Intitulé du poste<input value={title} onChange={(event) => setTitle(event.target.value)} maxLength={180} /></label>
            <label>Entreprise<input value={company} onChange={(event) => setCompany(event.target.value)} maxLength={180} /></label>
          </div>
          <label>
            Texte de l’offre
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              minLength={250}
              maxLength={30_000}
              aria-describedby="offer-help offer-error"
              aria-invalid={Boolean(error)}
              required
            />
          </label>
          <div className="decoder-form-foot">
            <p id="offer-help">{description.length.toLocaleString("fr-FR")} / 30 000 caractères · L’analyse reste dans ton navigateur.</p>
            {error ? <p className="decoder-error" id="offer-error" role="alert">{error}</p> : <span id="offer-error" />}
            <button className="button primary" type="submit">Analyser l’offre</button>
          </div>
        </form>
      </section>

      {result ? (
        <div className="decoder-results" data-clarity-mask="true" aria-live="polite" ref={resultRef} tabIndex={-1}>
          <section className="section decoder-summary">
            <div><p className="section-kicker">Synthèse</p><h2>{title || "Offre sans intitulé"}{company ? ` · ${company}` : ""}</h2></div>
            <p>
              {VALUE_LABELS[result.axes.relation.value]} · {VALUE_LABELS[result.axes.technical.value]} · {VALUE_LABELS[result.axes.position.value]}.
              Séniorité lue : {VALUE_LABELS[result.seniority]}.
            </p>
          </section>

          <section className="section">
            <div className="section-head"><div><p className="section-kicker">Classification</p><h2>Le métier réellement décrit</h2></div><p>Chaque verdict reste relié aux phrases qui ont déclenché les règles.</p></div>
            <div className="decoder-axis-grid">
              {(Object.keys(result.axes) as AxisName[]).map((axis) => {
                const item = result.axes[axis];
                return <article className="decoder-axis" key={axis}>
                  <p className="case-meta">{AXIS_LABELS[axis]}</p>
                  <h3>{VALUE_LABELS[item.value]}</h3>
                  <span className={`decoder-state state-${item.confidence}`}>{CONFIDENCE_LABELS[item.confidence]}</span>
                  {item.citations.length ? <ul>{item.citations.map((citation) => <li key={citation}><q>{citation}</q></li>)}</ul> : <p>Aucun indice assez précis.</p>}
                </article>;
              })}
            </div>
          </section>

          <section className="section decoder-seniority">
            <div><p className="section-kicker">Séniorité réelle</p><h2>{VALUE_LABELS[result.seniority]}</h2></div>
            <p>{result.seniority === "inflated-junior" ? "Le titre junior cohabite avec au moins trois ans d’expérience ou des responsabilités de niveau senior." : "Lecture issue du titre, des années demandées et du niveau de responsabilité explicite."}</p>
          </section>

          <section className="section">
            <div className="section-head"><div><p className="section-kicker">Preuves attendues</p><h2>Ce que l’entretien devrait vérifier</h2></div><p>La liste dépend du cœur du rôle, pas d’une accumulation de mots-clés décoratifs.</p></div>
            {result.expectedEvidence.length ? <ol className="decoder-evidence-list">{result.expectedEvidence.map((evidence) => <li key={evidence.id}>{evidence.label}</li>)}</ol> : <p className="panel">L’annonce ne permet pas d’identifier une preuve métier centrale.</p>}
          </section>

          <section className="section">
            <div className="section-head"><div><p className="section-kicker">Correspondance Jonas</p><h2>Preuves déjà disponibles</h2></div><p>Une proximité n’est jamais transformée en compétence acquise. Cela paraît élémentaire ; le marché avait besoin qu’on l’écrive.</p></div>
            <div className="decoder-proof-grid">{result.expectedEvidence.map((evidence) => <article key={evidence.id}>
              <span className={`decoder-coverage coverage-${evidence.coverage}`}>{COVERAGE_LABELS[evidence.coverage]}</span>
              <h3>{evidence.label}</h3><p>{evidence.note}</p>
              {evidence.project ? <Link className="lk" href={evidence.project.href}>Voir {evidence.project.label} →</Link> : null}
            </article>)}</div>
          </section>

          <section className={`section decoder-signal signal-${result.applicationSignal}`}>
            <div><p className="section-kicker">Signal de candidature</p><h2>{SIGNAL_LABELS[result.applicationSignal]}</h2></div>
            <div><ul>{result.signalReasons.map((reason) => <li key={reason}>{reason}</li>)}</ul><p>Ce signal organise les indices de l’offre ; il ne décide pas à ta place.</p></div>
          </section>

          <section className="section decoder-limits">
            <div className="section-head"><div><p className="section-kicker">Limites</p><h2>À vérifier humainement</h2></div><p>Le contexte de l’équipe, le salaire, le management et la réalité du quotidien ne tiennent pas dans cette taxonomie.</p></div>
            <ul>{result.caveats.length ? result.caveats.map((caveat) => <li key={caveat}>{caveat}</li>) : <li>Demander des exemples de missions menées au cours des trois derniers mois.</li>}<li>Vérifier qui décide, qui construit et qui assume le système en production.</li></ul>
            <button className="button" type="button" onClick={() => { setResult(null); document.querySelector<HTMLTextAreaElement>(".decoder-form textarea")?.focus(); }}>Modifier l’offre</button>
            <p className="case-meta">Taxonomie {result.taxonomyVersion}</p>
          </section>
        </div>
      ) : null}
    </>
  );
}

