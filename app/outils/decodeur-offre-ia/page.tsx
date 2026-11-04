import type { Metadata } from "next";
import { pageMeta } from "@/lib/projects";
import AnimatedTitle from "../../animated-title";
import JobDecoderClient from "./job-decoder-client";


export const metadata: Metadata = pageMeta({
  path: "/outils/decodeur-offre-ia",
  title: "Décodeur d'offres IA",
  description: "Analyse locale et explicable du métier réellement décrit par une offre d'emploi IA."
});

export default function JobDecoderPage() {
  return (
    <div className="page decoder-page">
      <section className="decoder-hero">
        <p className="eyebrow">Outil public · version 1</p>
        <AnimatedTitle>Que décrit vraiment cette offre IA&nbsp;?</AnimatedTitle>
        <p className="lead">
          Colle une offre. L'outil repère les missions, la technique et la place
          dans l'organisation, puis les compare à des critères visibles. Il ne
          donne pas un score global qui cache le détail.
        </p>
        <ul className="decoder-principles" aria-label="Principes du décodeur">
          <li>Analyse intégralement dans le navigateur</li>
          <li>Aucun texte envoyé ou conservé</li>
          <li>Règles FR / EN versionnées et testées</li>
        </ul>
      </section>
      <JobDecoderClient />
      <section className="section">
        <div className="notice">
          <strong>Ce que l’outil ne fait pas.</strong>
          <p>
            Il ne décide pas à ta place, ne mesure pas la qualité d'une entreprise
            et ne remplace pas une discussion avec l'équipe. Il aide à lire les
            indices de l'annonce.
          </p>
        </div>
      </section>
    </div>
  );
}
