import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Méthode",
  description:
    "Comment Jonas Suhard travaille : cadrage, standards de code, vérification, sécurité des données et usage raisonné de l'IA."
};

const SECTIONS = [
  {
    kicker: "Cadrage",
    title: "Cadrer avant de coder.",
    items: [
      "Je pars du vrai problème, pas de la demande littérale.",
      "Action minimale d'abord : la réponse directe avant le plan en dix étapes.",
      "Cause racine, pas rustine : je corrige le problème, pas le symptôme."
    ]
  },
  {
    kicker: "Code",
    title: "Des standards d'équipe.",
    items: [
      "Git propre : branches, commits atomiques, revue avant de merger.",
      "Tests sur les parties sensibles, et un déploiement sur staging avant la prod.",
      "Je documente les décisions et leurs compromis, pour qu'un autre puisse reprendre le projet."
    ]
  },
  {
    kicker: "Vérification",
    title: "Vérifier avant d'affirmer.",
    items: [
      "Jamais « c'est fait » sans preuve : test, capture ou sortie de commande à l'appui.",
      "Pas de chiffre inventé : une donnée sans source est marquée « non mesuré », pas comblée.",
      "Sur un sujet à enjeu, je confronte plusieurs sources avant de trancher."
    ]
  },
  {
    kicker: "Sécurité",
    title: "Sécuriser les données et les accès.",
    items: [
      "Secrets hors du code (trousseau système) et détection de fuite avant chaque commit.",
      "Données clients et mineurs anonymisées (RGPD) : aucune donnée réelle publiée.",
      "Actions sensibles (push, suppressions) verrouillées par une confirmation forte."
    ]
  },
  {
    kicker: "IA dans le workflow",
    title: "L'IA comme outil, pas comme béquille.",
    items: [
      "Je m'appuie sur l'IA pour accélérer la recherche, la génération et la relecture croisée.",
      "Un modèle adapté à chaque tâche, mais le code et les choix d'architecture restent vérifiés à la main.",
      "Aller plus vite sans déléguer le jugement : la responsabilité du résultat reste la mienne."
    ]
  }
];

export default function MethodePage() {
  return (
    <div className="page">
      <section>
        <p className="eyebrow">Méthode</p>
        <h1>Comment je travaille.</h1>
        <p className="lead">
          Voici comment je cadre, code, sécurise et livre. L'IA accélère mon
          travail, mais les décisions, la vérification et la responsabilité du
          résultat restent les miennes.
        </p>
      </section>

      {SECTIONS.map((s) => (
        <section className="section" key={s.kicker}>
          <div className="section-head">
            <div>
              <p className="section-kicker">{s.kicker}</p>
              <h2>{s.title}</h2>
            </div>
          </div>
          <div className="prose">
            <ul>
              {s.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="section">
        <div className="notice">
          <strong>En pratique.</strong>
          <p>
            Cette méthode me permet de livrer vite et proprement sur des stacks
            variées, et de m'intégrer dans une équipe qui doit produire sans casser.
          </p>
          <div className="button-row">
            <Link className="button primary" href="/recruteurs">Page recruteurs</Link>
            <a className="button" href={`mailto:${site.email}`}>Me contacter</a>
          </div>
        </div>
      </section>
    </div>
  );
}
