import type { Metadata } from "next";
import Link from "next/link";
import { site, pageAlternates } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Méthode",
  description:
    "Comment Jonas Suhard travaille : cadrage, standards de code, vérification, sécurité des données et usage raisonné de l'IA.",
  alternates: pageAlternates("/methode")
};

const SECTIONS = [
  {
    kicker: "Cadrage",
    title: "Cadrer avant de coder.",
    items: [
      "Je cherche le vrai problème derrière la demande.",
      "Je commence par la réponse directe. Le plan en dix étapes seulement s'il le faut vraiment.",
      "Je remonte à la cause plutôt que de poser une rustine sur le symptôme."
    ]
  },
  {
    kicker: "Code",
    title: "Des standards d'équipe.",
    items: [
      "Git propre, commits atomiques, revue avant de merger.",
      "Des tests sur les parties sensibles, et un passage par le staging avant la prod.",
      "Je documente les décisions et leurs compromis, pour qu'un autre reprenne le projet sans moi."
    ]
  },
  {
    kicker: "Vérification",
    title: "Vérifier avant d'affirmer.",
    items: [
      "Jamais « c'est fait » sans une preuve à l'appui, un test, une capture ou une sortie de commande.",
      "Pas de chiffre inventé. Une donnée sans source, je la marque « non mesuré » au lieu de la combler.",
      "Sur un sujet à enjeu, je confronte plusieurs sources avant de trancher."
    ]
  },
  {
    kicker: "Sécurité",
    title: "Sécuriser les données et les accès.",
    items: [
      "Les secrets restent hors du code (trousseau système), avec une détection de fuite avant chaque commit.",
      "Données clients et mineurs anonymisées, rien de réel n'est publié (RGPD).",
      "Les actions sensibles comme un push ou une suppression sont verrouillées par une confirmation forte."
    ]
  },
  {
    kicker: "IA dans le workflow",
    title: "L'IA accélère, je décide.",
    items: [
      "Je m'appuie sur l'IA pour la recherche, la génération et la relecture croisée.",
      "Un modèle adapté à chaque tâche, mais je vérifie le code et l'architecture à la main.",
      "J'avance plus vite sans déléguer le jugement. La responsabilité du résultat reste la mienne."
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
