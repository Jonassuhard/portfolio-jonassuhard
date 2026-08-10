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
        <AnimatedTitle>Ce poste IA est-il vraiment celui qu’il prétend être&nbsp;?</AnimatedTitle>
        <p className="lead">
          Colle une offre : le moteur lit les missions, la technique et la place dans l’organisation,
          puis les confronte à des preuves concrètes. Pas de score magique — le costume trois-pièces
          des algorithmes qui n’ont rien à dire.
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
            Il ne décide pas à ta place, ne mesure pas la qualité d’une entreprise et ne remplace pas
            une discussion avec l’équipe. Il rend simplement les indices de l’annonce moins brumeux.
          </p>
        </div>
      </section>
    </div>
  );
}

