import type { Metadata } from "next";
import Link from "next/link";
import { site, pageMeta } from "@/lib/projects";
import AnimatedTitle from "../animated-title";

export const metadata: Metadata = pageMeta({
  path: "/methode",
  title: "Méthode",
  description:
    "Comment Jonas Suhard travaille : cadrage, standards de code, vérification, sécurité des données et usage raisonné de l'IA."
});

const SECTIONS = [
  {
    kicker: "01 · Comprendre",
    title: "Partir du besoin.",
    items: [
      "Je clarifie qui utilisera l'outil, ce qui bloque et le résultat attendu.",
      "Je propose une première version simple, avec un périmètre et des limites."
    ],
    example: "Les Petites Griffes : présenter les créations du studio et permettre à ma sœur de gérer ses contenus.",
    href: "/projets/les-petites-griffes",
    link: "Voir Les Petites Griffes"
  },
  {
    kicker: "02 · Construire",
    title: "Avancer par petites étapes.",
    items: [
      "Je choisis les outils selon le besoin et le système déjà en place.",
      "L'IA m'aide à préparer et à coder. Je relis ses propositions avant de les garder."
    ],
    example: "Cortex Bridge : séparer ce que ChatGPT propose de ce que l'utilisateur autorise sur son ordinateur.",
    href: "/projets/cortex-bridge",
    link: "Voir Cortex Bridge"
  },
  {
    kicker: "03 · Vérifier",
    title: "Tester ce qui compte.",
    items: [
      "Je teste les parcours, les erreurs et le rendu sur plusieurs tailles d'écran.",
      "Je garde les clés d'accès hors du code et utilise des données fictives pour les démonstrations.",
      "Je distingue un test réussi d'un résultat réellement observé chez l'utilisateur."
    ],
    example: "Job Radar Community : les tests publics portent sur un jeu d'offres fictives, pas sur les résultats d'une recherche d'emploi.",
    href: "/projets/job-radar",
    link: "Voir Job Radar"
  },
  {
    kicker: "04 · Transmettre",
    title: "Livrer un projet reprenable.",
    items: [
      "Je versionne le code et j'explique comment lancer, vérifier et maintenir le projet.",
      "Je note ce qui reste à tester et je fais valider les actions sensibles avant publication."
    ],
    example: "Les sources, les dates et les limites des projets restent consultables dans le portfolio.",
    href: "/preuves",
    link: "Consulter les preuves"
  }
];

export default function MethodePage() {
  return (
    <div className="page">
      <section>
        <p className="eyebrow">Méthode</p>
        <AnimatedTitle>Comment je travaille.</AnimatedTitle>
        <p className="lead">
          Comprendre le problème, construire une première version,
          la tester et laisser un projet qu'une équipe peut reprendre.
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
            {s.example ? <p className="method-example">{s.example}</p> : null}
            <Link className="lk" href={s.href}>{s.link}</Link>
          </div>
        </section>
      ))}

      <section className="section">
        <div className="notice">
          <strong>En pratique.</strong>
          <p>
            Vous avez un outil à construire ou à améliorer ? Parlons du besoin.
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
