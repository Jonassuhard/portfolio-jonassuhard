import type { Metadata } from "next";
import Link from "next/link";
import { evidenceLevelMeta, recruiterFeatured, site, pageMeta } from "@/lib/projects";
import { faqItems } from "@/lib/faq";
import { faqPageJsonLd } from "@/lib/json-ld";
import AnimatedTitle from "../animated-title";
import ProjectCardImage from "../project-card-image";

export const metadata: Metadata = pageMeta({
  path: "/recruteurs",
  title: "Recruteurs",
  description:
    "Résumé recruteur de Jonas Suhard : rôle cible, projets, stack, limites et contact."
});

export default function RecruitersPage() {
  return (
    <div className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd()) }}
      />
      <section className="case-hero">
        <div>
          <p className="eyebrow">Candidature</p>
          <AnimatedTitle>
            Chef de projet IA appliquée &amp; automatisation junior.
          </AnimatedTitle>
          <p className="role-aliases">Growth Engineer junior · Product Builder IA</p>
          <p className="title-definition">
            <Link href="/a-propos#growth-engineer">Correspondance avec le rôle Growth Engineer →</Link>
          </p>
          <p className="lead">
            Je prends le dernier kilomètre : les données, les validations, la
            mesure. Je ne livre pas une démo de plus ; je livre un outil qui
            tourne, avec ce qu'il faut pour le reprendre. Et je dis aussi ce
            qu'il ne règle pas.
          </p>
          <div className="button-row">
            <a className="button primary" href={`mailto:${site.email}`}>Me contacter</a>
            <a className="button" href={site.github}>GitHub</a>
            <Link className="button" href="/outils/decodeur-offre-ia">Décoder une offre IA</Link>
          </div>
          <p className="cta-sub">
            CV : <a href={site.cvStyled}>version site</a> · <a href={site.cvClassic}>classique</a>
          </p>
        </div>
        <div className="panel">
          <h2>L'essentiel</h2>
          <table className="summary-table">
            <tbody>
              <tr>
                <th scope="row">Contrat</th>
                <td>CDI junior</td>
              </tr>
              <tr>
                <th scope="row">Disponibilité</th>
                <td><strong>Immédiate</strong></td>
              </tr>
              <tr>
                <th scope="row">Zone</th>
                <td>Paris ou hybride</td>
              </tr>
              <tr>
                <th scope="row">Rôles</th>
                <td>Chef de projet digital &amp; marketing IA, Chef de projet IA appliquée &amp; automatisation junior, Growth Engineer junior, Product Builder IA</td>
              </tr>
              <tr>
                <th scope="row">Stack</th>
                <td>Next.js, React, Firebase, Supabase, Python, Playwright, SEO, workflows LLM</td>
              </tr>
              <tr>
                <th scope="row">Environnements</th>
                <td>Mac et Windows (deux postes de travail)</td>
              </tr>
              <tr>
                <th scope="row">Code</th>
                <td>Visible sur GitHub : ce portfolio et claude-code-soul. Le code client reste privé.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="section-kicker">Ce que je peux prendre en charge</p>
            <h2>Ce que je livre, et sous quelle condition.</h2>
          </div>
          <p>
            Un besoin marketing devient un livrable concret : page de conversion,
            workflow IA, automatisation, audit SEO ou prototype web. Le livrable
            n'est fini que si quelqu'un peut le reprendre sans moi.
          </p>
        </div>
        <div className="matrix matrix-2">
          <div className="matrix-item">
            <strong>Acquisition</strong>
            <p>SEO, pages de conversion, contenus, audits, tracking et priorisation.</p>
          </div>
          <div className="matrix-item">
            <strong>IA générative</strong>
            <p>Workflows LLM, RAG simple, assistants cadrés, fact-check et QA.</p>
          </div>
          <div className="matrix-item">
            <strong>Produit web</strong>
            <p>Next.js, React, Firebase, Supabase, CMS léger, déploiement et maintenance.</p>
          </div>
          <div className="matrix-item">
            <strong>Opérations</strong>
            <p>Scripts Python, Playwright, rapports, automatisation de tâches répétitives.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="section-kicker">Avant de construire</p>
            <h2>Six questions que je pose avant de livrer.</h2>
          </div>
          <p>
            Elles ne sont pas décoratives. Chacune change le périmètre, le budget
            ou la date. Si la réponse manque, on construit un prototype, pas une
            plateforme.
          </p>
        </div>
        <div className="matrix matrix-2">
          <div className="matrix-item">
            <strong>Qui utilise l'outil, et à quelle fréquence ?</strong>
            <p>Si la réponse est « personne encore », on teste une hypothèse avant d'industrialiser.</p>
          </div>
          <div className="matrix-item">
            <strong>Qu'est-ce qui est vérifié aujourd'hui, et par qui ?</strong>
            <p>Le contrôle est le vrai coût. On le nomme avant d'écrire la première ligne.</p>
          </div>
          <div className="matrix-item">
            <strong>Quelle décision l'outil doit-il rendre possible ?</strong>
            <p>Un tableau de bord qui ne change aucune décision est de la décoration.</p>
          </div>
          <div className="matrix-item">
            <strong>Qu'est-ce qu'on ne veut surtout pas automatiser ?</strong>
            <p>Les actions irréversibles restent humaines. On le dit dès le cadrage.</p>
          </div>
          <div className="matrix-item">
            <strong>Comment saura-t-on, dans 90 jours, que ça a marché ?</strong>
            <p>Une mesure datée, pas une impression de fin de réunion.</p>
          </div>
          <div className="matrix-item">
            <strong>Qu'est-ce qu'on arrête de faire ?</strong>
            <p>Un nouvel outil qui s'ajoute aux anciens ne remplace rien. Il ajoute de la maintenance.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="section-kicker">En équipe</p>
            <h2>Où je suis utile dans une équipe.</h2>
          </div>
          <p>
            Je ne travaille pas en vase clos. Je pose mes questions tôt, je livre
            par petits lots relisables, et je documente pour que le travail se
            reprenne sans moi.
          </p>
        </div>
        <div className="matrix matrix-2">
          <div className="matrix-item">
            <strong>Cadrage partagé</strong>
            <p>Les hypothèses posées avant de coder, les décisions écrites, pas gardées dans ma tête.</p>
          </div>
          <div className="matrix-item">
            <strong>Revue et intégration</strong>
            <p>Des changements courts, relisables et documentés plutôt qu'un gros lot en fin de sprint.</p>
          </div>
          <div className="matrix-item">
            <strong>Transmission</strong>
            <p>Un livrable qu'un autre fait tourner sans moi : sur Les Petites Griffes, la gérante édite son site seule.</p>
          </div>
          <div className="matrix-item">
            <strong>Synthèse visuelle</strong>
            <p>Une formation en animation et design qui aide à rendre une interface, un rapport ou une décision compréhensible.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="section-kicker">Marché français</p>
            <h2>Le bon niveau, sans survendre.</h2>
          </div>
          <p>
            Je suis opérationnel sur le build web, le SEO et les workflows IA.
            Je viens consolider en équipe la data produit, l'expérimentation et
            les pratiques d'une équipe logiciel. Je ne prétends pas les avoir
            déjà faites à cette échelle.
          </p>
        </div>
        <div className="matrix matrix-2">
          <div className="matrix-item">
            <strong>Apport immédiat</strong>
            <p>Pages et outils Next.js, SEO, CMS, automatisations, assistants cadrés, documentation et QA.</p>
          </div>
          <div className="matrix-item">
            <strong>À consolider</strong>
            <p>SQL avancé, plan de tracking produit, A/B tests à volume significatif et pratiques d'une équipe logiciel multi-développeurs.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="section-kicker">Preuves principales</p>
            <h2>Trois projets qui montrent comment je travaille.</h2>
          </div>
          <p>
            Un pipeline complet construit de bout en bout, une refonte SEO en
            contexte employeur avec preuve en ligne, et un site client en
            production. Trois niveaux de preuve, pas trois copies du même projet.
          </p>
        </div>
        <div className="proof-grid">
          {recruiterFeatured.map((project) => (
            <article className="proof-card" key={project.slug}>
              <ProjectCardImage
                src={project.image}
                alt={`Aperçu ${project.shortTitle}`}
              />
              <div className="proof-body">
                <span className={`evidence-badge evidence-${project.evidenceLevel}`}>
                  {evidenceLevelMeta[project.evidenceLevel].label}
                </span>
                <p className="case-meta">{project.status}</p>
                <h3>{project.shortTitle}</h3>
                <p>{project.recruiterProof[0]}</p>
                <Link className="button" href={`/projets/${project.slug}`}>Ouvrir</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="section-kicker">Prise en charge</p>
            <h2>Mes 30 premiers jours : un livrable, une mesure.</h2>
          </div>
        </div>
        <div className="matrix matrix-2">
          <div className="matrix-item">
            <strong>Acquisition</strong>
            <p>Audit et correctifs d'un tunnel, plus une landing ou une section de conversion livrée.</p>
          </div>
          <div className="matrix-item">
            <strong>IA appliquée</strong>
            <p>Une automatisation ou un assistant LLM cadré, avec garde-fous et QA.</p>
          </div>
          <div className="matrix-item">
            <strong>SEO / contenu</strong>
            <p>Un lot de contenus SEO structurés et un audit (cannibalisation, maillage).</p>
          </div>
          <div className="matrix-item">
            <strong>Produit web</strong>
            <p>Un prototype ou une page Next.js déployée, propre et documentée.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="section-kicker">FAQ</p>
            <h2>Questions fréquentes.</h2>
          </div>
          <p>Les réponses factuelles, pour un recruteur comme pour un agent qui lit cette page.</p>
        </div>
        <div className="faq">
          {faqItems.map((item) => (
            <details className="faq-item" key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="notice">
          <strong>Mon périmètre, et ce que je ne promets pas.</strong>
          <p>
            Mon cœur, c'est de relier acquisition, IA appliquée et exécution
            produit. Pour du ML research pur ou du backend lourd, je m'appuie sur
            l'équipe. Je ne promets ni un modèle infaillible, ni une adoption
            sans formation, ni une transformation en trente jours.
          </p>
          <div className="button-row">
            <a className="button primary" href={`mailto:${site.email}`}>Me contacter</a>
            <Link className="button" href="/methode">Ma méthode de travail</Link>
            <Link className="button" href="/preuves">Vérifier les affirmations</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
