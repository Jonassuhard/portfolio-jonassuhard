import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Méthode",
  description:
    "Comment Jonas Suhard travaille : orchestration multi-agents IA, veille et recherche fact-checkée, sécurité par projet, écoute client et méthode de livraison."
};

const SECTIONS = [
  {
    kicker: "Orchestration",
    title: "Une équipe d'IA, pas un chatbot.",
    items: [
      "Un modèle par tâche : Claude pour l'architecture et le raisonnement long, Codex (GPT-5.5) pour le fix ciblé et la vérification croisée, Gemini pour la recherche et le visuel.",
      "Construire / vérifier en duo : un agent produit, un autre relit en lecture seule. Règle dure — un seul agent écrit un fichier à la fois, jamais de collision.",
      "Conseil contradictoire : sur une décision à fort enjeu, je fais débattre plusieurs IA avec des angles opposés, puis je tranche. Pas de validation par confort.",
      "Agents et outils chargés à la demande, avec un inventaire vivant : je ne raisonne pas sur des capacités périmées."
    ]
  },
  {
    kicker: "Veille & recherche",
    title: "Vérifier avant d'affirmer.",
    items: [
      "Recherche multi-axes en parallèle, puis synthèse — plusieurs angles plutôt qu'une seule requête.",
      "Fact-check systématique sur sources primaires. Zéro chiffre inventé : une donnée sans source est marquée « non mesuré », pas comblée.",
      "Un agent sceptique dont le seul rôle est de réfuter, pour casser les fausses bonnes idées avant qu'elles coûtent du temps."
    ]
  },
  {
    kicker: "Sécurité",
    title: "Comment je sécurise chaque projet.",
    items: [
      "Actions sensibles protégées (validation biométrique sur commits, push et suppressions).",
      "Secrets jamais en clair : trousseau système, jamais dans le code ; détection de fuite automatique avant chaque commit.",
      "Données clients et mineurs anonymisées (RGPD) : aucune donnée réelle publiée, scrub complet avant toute mise en open source.",
      "Publication prudente : accès CMS et données internes restent privés, rien ne part sans relecture."
    ]
  },
  {
    kicker: "Relation client",
    title: "Comment j'écoute mes clients.",
    items: [
      "Je cadre le vrai problème avant de coder, pas la demande littérale.",
      "Validation humaine avant publication : je ne publie jamais à la place du client.",
      "Des garde-fous plutôt que des promesses : un assistant IA cadré (prix, disponibilités, périmètre), pas une « magie » qui invente.",
      "Staging avant production, puis itération sur les retours terrain réels."
    ]
  },
  {
    kicker: "Méthode",
    title: "Comment je fonctionne.",
    items: [
      "Action minimale d'abord : la réponse directe avant le plan en dix étapes.",
      "Cause racine, pas rustine : je corrige le problème, pas le symptôme.",
      "Vérification = priorité n°1 : jamais « c'est fait » sans preuve (test, capture, sortie).",
      "Je documente ce qui marche, ce qui casse et ce qui reste à mesurer."
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
          Je construis avec une équipe d'outils IA orchestrés, pas avec un seul
          chatbot. Voici comment je cadre, sécurise et livre — et comment
          j'utilise l'IA sans la transformer en théâtre.
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
            Cette méthode est ce qui me permet de livrer vite et proprement, seul,
            sur des stacks variées. C'est aussi ce que je veux apporter à une équipe.
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
