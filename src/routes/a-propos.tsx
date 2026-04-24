import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, Shield, HeartHandshake, Sparkles } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { MadagascarMap } from "@/components/MadagascarMap";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — Carmada SARLU" },
      {
        name: "description",
        content:
          "Carmada SARLU, entreprise malgache fondée à Tamatave, vous accompagne dans tous vos besoins de mobilité avec professionnalisme et engagement.",
      },
      { property: "og:title", content: "À propos de Carmada SARLU" },
      {
        property: "og:description",
        content: "Notre histoire, notre engagement, nos valeurs.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Award, title: "Qualité", desc: "Véhicules récents et entretenus selon les standards constructeurs." },
  { icon: Shield, title: "Sécurité", desc: "Contrôles techniques rigoureux et assurance tous risques." },
  { icon: HeartHandshake, title: "Engagement", desc: "Disponibilité 7j/7 et réactivité face à vos demandes." },
  { icon: Sparkles, title: "Proximité", desc: "Une équipe à l'écoute, qui connaît le terrain malgache." },
];

const team = [
  { name: "Rivo R.", role: "Directeur Général", initial: "RR" },
  { name: "Hanitra A.", role: "Responsable commerciale", initial: "HA" },
  { name: "Tahina J.", role: "Responsable flotte", initial: "TJ" },
  { name: "Lova M.", role: "Responsable maintenance", initial: "LM" },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
} as const;

function AboutPage() {
  return (
    <PageLayout>
      <section className="bg-[var(--navy)] text-white py-20 md:py-28">
        <div className="container-page">
          <p className="text-xs uppercase tracking-brand text-[var(--rouge)] font-medium mb-3">
            À propos
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-white max-w-3xl">
            Une entreprise malgache au service de votre mobilité
          </h1>
        </div>
      </section>

      {/* Histoire */}
      <section className="py-20 bg-white">
        <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div {...fadeUp}>
            <h2 className="section-title text-3xl md:text-4xl">Notre histoire</h2>
            <p className="text-[var(--grey-text)] leading-relaxed">
              Fondée à Tamatave, Carmada SARLU est née de la volonté d'apporter
              aux entreprises malgaches et internationales un service de
              location de véhicules réactif, professionnel et adapté aux
              réalités du terrain.
            </p>
            <p className="text-[var(--grey-text)] leading-relaxed mt-4">
              Depuis nos débuts, nous avons construit une flotte solide et
              diversifiée, capable de répondre aussi bien aux missions urbaines
              qu'aux expéditions en brousse. Notre mission : faciliter la
              mobilité de nos clients, partout sur la Grande Île.
            </p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }}>
            <h2 className="section-title text-3xl md:text-4xl">Notre engagement</h2>
            <p className="text-[var(--grey-text)] leading-relaxed">
              Qualité de service, sécurité et professionnalisme sont au cœur de
              notre approche. Chaque véhicule est contrôlé avant et après
              chaque location, et notre équipe est joignable 7j/7 pour vous
              accompagner.
            </p>
            <p className="text-[var(--grey-text)] leading-relaxed mt-4">
              Nous croyons que la confiance se construit dans la durée — c'est
              pourquoi tant d'entreprises nous renouvellent leur confiance
              année après année.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-20 bg-[var(--beige)]">
        <div className="container-page">
          <motion.div {...fadeUp} className="text-center">
            <h2 className="section-title-center text-3xl md:text-4xl">Nos valeurs</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white p-7 text-center"
              >
                <div className="size-14 rounded-full bg-[var(--rouge)]/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="size-6 text-[var(--rouge)]" />
                </div>
                <h3 className="font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-[var(--grey-text)]">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="py-20 bg-white">
        <div className="container-page">
          <motion.div {...fadeUp} className="text-center">
            <h2 className="section-title-center text-3xl md:text-4xl">L'équipe</h2>
            <p className="text-[var(--grey-text)] max-w-xl mx-auto">
              Des professionnels passionnés à votre écoute.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {team.map((m, i) => (
              <motion.div
                key={m.name}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-center"
              >
                <div className="aspect-square rounded-full bg-[var(--navy)] text-white flex items-center justify-center text-3xl font-semibold mb-4 max-w-[180px] mx-auto">
                  {m.initial}
                </div>
                <h3 className="font-semibold">{m.name}</h3>
                <p className="text-xs text-[var(--grey-text)] uppercase tracking-wider mt-1">{m.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Couverture */}
      <section className="py-20 bg-[var(--navy)] text-white">
        <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp} className="flex justify-center">
            <MadagascarMap className="w-full max-w-sm h-auto" />
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }}>
            <h2 className="text-3xl md:text-4xl text-white relative inline-block pb-3 mb-6">
              Zones de couverture
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[var(--rouge)]" />
            </h2>
            <p className="text-white/80 leading-relaxed">
              Depuis notre base de Tamatave, nous couvrons l'ensemble du
              territoire malgache : Antananarivo, Antsiranana, Toliara,
              Fianarantsoa, Fort-Dauphin, Mahajanga et toutes les villes
              intermédiaires.
            </p>
            <p className="text-white/80 leading-relaxed mt-4">
              Livraison de véhicules possible dans toutes ces zones, avec
              récupération sur site selon vos contraintes.
            </p>
            <Button asChild variant="rouge" className="mt-8">
              <Link to="/contact">Discuter de votre projet</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
