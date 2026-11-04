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
    kicker: "Avant — cadrer",
    title: "Cadrer avant de coder.",
    items: [
      "Je cherche le vrai problème derrière la demande.",
      "Je commence par la réponse directe. Le plan en dix étapes seulement s'il le faut vraiment.",
      "Je remonte à la cause plutôt que de poser une rustine sur le symptôme."
    ]
  },
  {
    kicker: "Pendant — déléguer avec contexte",
    title: "Déléguer à l'IA, avec le contexte.",
    items: [
      "J'utilise les agents IA comme un système de production que je contrôle : je cadre, je donne le contexte, je délègue la partie répétitive.",
      "Un modèle adapté à chaque tâche ; l'IA ne décide pas et ne signe pas.",
      "Je vérifie le code et l'architecture à la main avant de les garder."
    ],
    example:
      "Sur la refonte Capsélys, j'ai automatisé les contrôles avec Playwright pour repérer les régressions, doublés d'un audit visuel à l'œil sur les écrans clés. Les décisions de refonte, elles, sont sorties d'un atelier avec l'équipe, pas d'une recommandation d'outil. L'automatisation fait le travail répétitif, le cadrage reste une décision partagée."
  },
  {
    kicker: "Après — vérifier",
    title: "Vérifier avant d'affirmer.",
    items: [
      "Jamais « c'est fait » sans une preuve : un test, une capture ou une sortie de commande.",
      "Pas de chiffre inventé. Une donnée sans source, je la marque « non mesuré » au lieu de la combler.",
      "Sur un sujet à enjeu, je confronte plusieurs sources avant de trancher."
    ],
    example:
      "Sur ISCOM, j'ai produit des articles et une FAQ dans Drupal avec de l'IA pour accélérer la recherche et la première rédaction. Rien n'est publié tel quel : chaque affirmation passe un fact-check, et un humain valide avant mise en ligne. L'IA écrit une version de départ, je garde la responsabilité de ce qui sort au nom de l'école."
  },
  {
    kicker: "Livraison — documenter et transmettre",
    title: "Documenter pour qu'un autre reprenne.",
    items: [
      "Git propre, commits atomiques, revue avant de merger (chaque changement isolé et relu avant d'atteindre le produit).",
      "Des tests sur les parties sensibles, un passage par le staging avant la prod.",
      "Je documente les décisions et leurs compromis, pour qu'une équipe reprenne le projet sans moi."
    ],
    example:
      "claude-code-soul est le cadre que j'ai construit pour piloter des agents IA de façon reproductible : un fichier d'identité, des règles, des skills et des hooks, documentés pour être repris. C'est ma méthode rendue transmissible : au lieu de garder mes réglages dans la tête, je les écris pour qu'ils tiennent d'un projet à l'autre. Ce qui n'est pas documenté ne se transmet pas."
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
    kicker: "Ce qui compte",
    title: "Ce qui reste quand l'IA a produit.",
    items: [
      "L'IA produit vite. Elle ne décide pas ce qui est bon. Le jugement reste le travail.",
      "Ma lecture : l'IA ne dévore pas d'abord ce qui est facile, elle dévore ce qui est vérifiable. Donc la valeur se déplace vers celui qui sait définir le test.",
      "Je sépare la production du contrôle. Un modèle écrit, un humain signe.",
      "Le coût par tâche compte plus que le prix du token. Un modèle moins cher qui rate trois fois coûte plus cher qu'un modèle qui rate une fois.",
      "Ce qui n'est pas documenté ne se transmet pas. Ce qui ne se transmet pas s'arrête avec la personne qui l'a fait."
    ]
  },
  {
    kicker: "Ce que je ne délègue pas",
    title: "Les trois choses qui restent de mon côté.",
    items: [
      "La décision de ce qui part en production, et la responsabilité de le signer.",
      "La définition de ce qui est bon : la grille, le test, le seuil. Un modèle ne choisit pas son propre critère de réussite.",
      "La relation avec les personnes qui utilisent l'outil. Les retours terrain ne se déduisent pas d'un prompt."
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
          Voici comment je cadre, code, sécurise et livre. L'IA accélère mon
          travail, mais les décisions, la vérification et la responsabilité du
          résultat restent les miennes.
        </p>
      </section>

      <section className="section">
        <div className="notice">
          <strong>Le dernier kilomètre.</strong>
          <p>
            Un projet ne bloque presque jamais sur la partie spectaculaire. Il
            bloque sur les données, les accès, les validations et la mesure.
            C'est là que je travaille. Une démo qui ne passe pas en production
            n'est pas un livrable ; c'est une promesse avec une interface.
          </p>
        </div>
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
            C'est la méthode appliquée sur Les Petites Griffes, Educool, Capsélys
            et ISCOM, sur des stacks différentes. De quoi m'intégrer dans une
            équipe qui doit produire sans casser.
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
