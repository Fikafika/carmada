import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Building2,
  Bus,
  Car,
  UserCog,
  Check,
} from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services de location — Carmada SARLU" },
      {
        name: "description",
        content:
          "Location courte, moyenne et longue durée, transport de collaborateurs, gestion de flotte et véhicules avec chauffeur à Madagascar.",
      },
      { property: "og:title", content: "Services de location de véhicules — Carmada" },
      {
        property: "og:description",
        content: "Solutions de mobilité sur mesure pour particuliers et entreprises.",
      },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: Calendar,
    title: "Location courte durée",
    desc: "De 1 à 7 jours pour vos besoins ponctuels, déplacements professionnels ou loisirs.",
    benefits: [
      "Réservation flexible 24h à l'avance",
      "Tarifs dégressifs dès 4 jours",
      "Livraison possible à votre adresse",
    ],
    useCase:
      "Idéal pour les missions courtes, séminaires d'entreprise ou week-ends prolongés.",
  },
  {
    icon: Clock,
    title: "Location moyenne durée",
    desc: "De 1 semaine à 1 mois, parfait pour les missions et projets temporaires.",
    benefits: [
      "Remise jusqu'à -20% sur le tarif journalier",
      "Entretien et assistance inclus",
      "Possibilité de changement de véhicule",
    ],
    useCase:
      "Parfait pour les expatriés en mission, projets ONG, événements ou tournages.",
  },
  {
    icon: Building2,
    title: "Location longue durée",
    desc: "1 mois et plus avec contrat sur mesure, adapté à votre activité.",
    benefits: [
      "Tarifs préférentiels jusqu'à -30%",
      "Véhicule de remplacement garanti",
      "Facturation mensuelle simplifiée",
    ],
    useCase:
      "Pour les entreprises souhaitant externaliser leur parc sans investissement.",
  },
  {
    icon: Bus,
    title: "Transport de collaborateurs",
    desc: "Minibus 15 à 19 places pour transporter vos équipes en toute sécurité.",
    benefits: [
      "Chauffeurs professionnels expérimentés",
      "Trajets quotidiens ou ponctuels",
      "Véhicules climatisés et confortables",
    ],
    useCase:
      "Navettes domicile-travail, transferts aéroport, déplacements d'équipes.",
  },
  {
    icon: Car,
    title: "Gestion de flotte d'entreprise",
    desc: "Externalisez la gestion complète de votre parc automobile.",
    benefits: [
      "Maintenance préventive et curative",
      "Suivi administratif et assurances",
      "Reporting mensuel détaillé",
    ],
    useCase:
      "Entreprises souhaitant se concentrer sur leur cœur de métier.",
  },
  {
    icon: UserCog,
    title: "Véhicules avec chauffeur",
    desc: "Chauffeurs expérimentés, ponctuels et discrets pour vos déplacements.",
    benefits: [
      "Chauffeurs formés et habilités",
      "Connaissance approfondie du territoire",
      "Disponibilité 7j/7 sur demande",
    ],
    useCase:
      "Déplacements VIP, missions diplomatiques, visites clients longue distance.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
} as const;

function ServicesPage() {
  return (
    <PageLayout>
      <section className="bg-[var(--navy)] text-white py-20 md:py-28">
        <div className="container-page">
          <p className="text-xs uppercase tracking-brand text-[var(--rouge)] font-medium mb-3">
            Nos services
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-white max-w-3xl">
            Des solutions de mobilité adaptées à chaque activité
          </h1>
          <p className="mt-5 text-white/75 max-w-2xl">
            Du véhicule pour un weekend à la gestion complète d'une flotte
            d'entreprise, Carmada propose un éventail de services pensés pour
            simplifier votre mobilité.
          </p>
        </div>
      </section>

      <div className="bg-white">
        {services.map((s, i) => (
          <motion.section
            key={s.title}
            {...fadeUp}
            className={`py-20 ${i % 2 === 1 ? "bg-[var(--beige)]" : "bg-white"}`}
          >
            <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="size-14 flex items-center justify-center bg-[var(--navy)] rounded-md mb-6">
                  <s.icon className="size-7 text-white" />
                </div>
                <h2 className="section-title text-3xl md:text-4xl">{s.title}</h2>
                <p className="text-[var(--grey-text)] leading-relaxed mb-6">{s.desc}</p>
                <p className="text-sm text-[var(--navy)] mb-6">
                  <strong>Cas d'usage : </strong>
                  <span className="text-[var(--grey-text)]">{s.useCase}</span>
                </p>
                <Button asChild variant="rouge">
                  <Link to="/contact">Demander un devis</Link>
                </Button>
              </div>

              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <div className="bg-white border border-border p-8 rounded-lg">
                  <h3 className="text-sm uppercase tracking-brand text-[var(--rouge)] font-medium mb-5">
                    Avantages
                  </h3>
                  <ul className="space-y-4">
                    {s.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <Check className="size-5 text-green-600 shrink-0 mt-0.5" />
                        <span className="text-sm text-[var(--navy)]">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>
        ))}
      </div>

      <section className="py-20 bg-[var(--rouge)] text-white text-center">
        <div className="container-page">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Un projet de mobilité ?
          </h2>
          <p className="text-white/85 max-w-xl mx-auto mb-8">
            Discutons ensemble de la solution la plus adaptée à votre besoin.
          </p>
          <Button asChild variant="heroOutline" size="lg">
            <Link to="/contact">Nous contacter</Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
