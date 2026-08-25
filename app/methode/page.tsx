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
    kicker: "Avant de construire",
    title: "Cadrer avant de coder.",
    items: [
      "Je clarifie le besoin, les contraintes et le résultat attendu.",
      "Je commence par une réponse simple et j'ajoute du détail seulement si nécessaire.",
      "Je cherche la cause du problème avant de modifier le produit."
    ]
  },
  {
    kicker: "Pendant la construction",
    title: "Utiliser l'IA avec contrôle.",
    items: [
      "Je donne à l'IA le contexte et des règles claires pour les tâches répétitives.",
      "Je choisis l'outil selon la tâche ; l'IA ne prend pas les décisions à ma place.",
      "Je relis le code et la structure avant de les garder."
    ],
    example:
      "Sur Capsélys, j'ai utilisé Playwright pour repérer les régressions sur plusieurs écrans, puis j'ai vérifié le rendu à l'œil. Les choix de refonte ont été faits avec l'équipe. L'automatisation contrôle le répétitif ; le cadrage reste humain."
  },
  {
    kicker: "Avant d'affirmer",
    title: "Vérifier avant d'affirmer.",
    items: [
      "Je ne dis pas « c'est fait » sans preuve : test, capture ou résultat de commande.",
      "Je n'invente pas de chiffre. Une donnée sans source reste « non mesuré ».",
      "Sur un sujet à enjeu, je confronte plusieurs sources avant de trancher."
    ],
    example:
      "Sur ISCOM, l'IA accélère la recherche et le premier brouillon d'articles et de FAQ dans Drupal. Chaque information est vérifiée et un humain valide avant publication."
  },
  {
    kicker: "À la livraison",
    title: "Documenter pour qu'un autre reprenne.",
    items: [
      "Chaque changement est isolé, relu et ajouté à Git avant d'arriver au produit.",
      "Je teste les parties sensibles et je passe par le staging avant la production.",
      "Je documente les décisions et leurs compromis pour qu'une équipe puisse reprendre le projet."
    ],
    example:
      "claude-code-soul rassemble des règles, des outils et des contrôles pour faire travailler des agents IA de façon répétable. Je les ai écrits pour qu'ils puissent être relus et adaptés d'un projet à l'autre."
  },
  {
    kicker: "Sécurité",
    title: "Sécuriser les données et les accès.",
    items: [
      "Les secrets (mots de passe, clés d'accès) restent hors du code, dans le trousseau système ; un contrôle automatique le vérifie avant chaque envoi.",
      "Données clients et mineurs anonymisées, rien de réel n'est publié (RGPD).",
      "Les actions sensibles comme un push ou une suppression sont verrouillées par une confirmation forte."
    ]
  },
  {
    kicker: "Avec l'IA",
    title: "Garder la responsabilité humaine.",
    items: [
      "L'IA accélère une partie du travail, mais elle peut se tromper.",
      "Il faut savoir expliquer le besoin à un modèle comme à une équipe.",
      "Je choisis le modèle selon la tâche : préparation, exécution ou contrôle.",
      "Je regarde aussi le coût : un outil utile doit rester soutenable.",
      "Un humain reste responsable de ce qui part en production."
    ]
  }
];

export default function MethodePage() {
  return (
    <div className="page">
      <section>
        <p className="eyebrow">Méthode</p>
        <AnimatedTitle>Comment je travaille.</AnimatedTitle>
        <p className="lead">
          Je clarifie le besoin, je construis, je sécurise et je vérifie. L'IA
          accélère le travail ; les décisions et la responsabilité restent
          humaines.
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
          </div>
        </section>
      ))}

      <section className="section">
        <div className="notice">
          <strong>En pratique.</strong>
          <p>
            Cette méthode sert sur Les Petites Griffes, Cool Bank / La Herse,
            Capsélys et ISCOM. Elle aide à livrer sans casser ce qui existe.
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
