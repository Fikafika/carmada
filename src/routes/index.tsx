import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Briefcase,
  Clock,
  MapPin,
  Wrench,
  Calendar,
  Bus,
  Car,
  UserCog,
  Building2,
} from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { VehicleCard } from "@/components/VehicleCard";
import { MadagascarMap } from "@/components/MadagascarMap";
import { Button } from "@/components/ui/button";
import { vehicles, formatPrice } from "@/data/vehicles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import heroImg from "@/assets/hero-suv.jpg";
import partnerMadaLogistics from "@/assets/partners/mada-logistics.png";
import partnerVanex from "@/assets/partners/vanille-export.png";
import partnerIndigoBtp from "@/assets/partners/indigo-btp.png";
import partnerOceanHotels from "@/assets/partners/ocean-hotels.png";

const partners = [
  { name: "Mada Logistics", logo: partnerMadaLogistics },
  { name: "Vanex", logo: partnerVanex },
  { name: "Indigo BTP", logo: partnerIndigoBtp },
  { name: "Océan Hôtels", logo: partnerOceanHotels },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Carmada SARLU — Votre flotte d'entreprise à Madagascar" },
      {
        name: "description",
        content:
          "Location de véhicules courte, moyenne et longue durée à Tamatave et dans toute Madagascar. Flotte entretenue, expertise corporate, couverture nationale.",
      },
      { property: "og:title", content: "Carmada SARLU — Location de véhicules à Madagascar" },
      {
        property: "og:description",
        content: "Votre flotte d'entreprise, partout à Madagascar.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: HomePage,
});

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" },
} as const;

const quoteSchema = z.object({
  name: z.string().trim().min(2, "Nom requis").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  phone: z.string().trim().min(6, "Téléphone requis").max(30),
  message: z.string().trim().max(500).optional(),
});

function HomePage() {
  return (
    <PageLayout solidHeader={false}>
      {/* HERO */}
      <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden -mt-20 pt-20">
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[var(--navy-deep)]/65" />

        <div className="container-page relative z-10 text-center text-white">
          <motion.p
            {...fadeUp}
            className="text-xs uppercase tracking-brand mb-5 text-[var(--rouge)] font-medium"
          >
            Carmada SARLU
          </motion.p>
          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white max-w-5xl mx-auto leading-[1.1]"
          >
            Votre flotte d'entreprise,<br />
            <span className="text-white/90">partout à Madagascar</span>
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-lg md:text-xl text-white/75 max-w-2xl mx-auto"
          >
            Location de véhicules pour particuliers et entreprises. Courte,
            moyenne ou longue durée, partout dans le pays.
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild variant="rouge" size="xl">
              <Link to="/contact">Demander un devis</Link>
            </Button>
            <Button asChild variant="heroOutline" size="xl">
              <Link to="/flotte">Découvrir notre flotte</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60"
        >
          <ChevronDown className="size-6" />
        </motion.div>
      </section>

      {/* POURQUOI CARMADA */}
      <section className="py-24 bg-white">
        <div className="container-page">
          <motion.div {...fadeUp} className="text-center">
            <p className="text-xs uppercase tracking-brand text-[var(--rouge)] font-medium mb-3">
              Pourquoi nous choisir
            </p>
            <h2 className="section-title-center text-3xl md:text-4xl">
              Une expertise au service de votre mobilité
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              {
                icon: Briefcase,
                title: "Expertise Corporate",
                desc: "Solutions pensées pour les entreprises et leurs équipes.",
              },
              {
                icon: Clock,
                title: "Flexibilité totale",
                desc: "Courte, moyenne ou longue durée selon vos besoins.",
              },
              {
                icon: MapPin,
                title: "Couverture nationale",
                desc: "Présents à Tamatave et partout à Madagascar.",
              },
              {
                icon: Wrench,
                title: "Flotte entretenue",
                desc: "Véhicules récents, contrôlés et assurés tous risques.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-7 border border-border bg-white hover:border-[var(--navy)] transition-colors"
              >
                <div className="size-12 flex items-center justify-center bg-[var(--beige)] rounded-md mb-5">
                  <item.icon className="size-6 text-[var(--navy)]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--grey-text)]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-[var(--beige)]">
        <div className="container-page">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-brand text-[var(--rouge)] font-medium mb-3">
              Nos services
            </p>
            <h2 className="section-title-center text-3xl md:text-4xl">
              Des solutions pour chaque besoin
            </h2>
            <p className="text-[var(--grey-text)]">
              Du véhicule pour un weekend à la gestion complète de votre flotte
              d'entreprise.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[
              {
                icon: Calendar,
                title: "Location courte durée",
                desc: "De 1 à 7 jours pour vos besoins ponctuels.",
              },
              {
                icon: Clock,
                title: "Location moyenne durée",
                desc: "1 semaine à 1 mois, tarifs dégressifs.",
              },
              {
                icon: Building2,
                title: "Location longue durée",
                desc: "1 mois et plus, conditions sur mesure.",
              },
              {
                icon: Bus,
                title: "Transport collaborateurs",
                desc: "Minibus avec ou sans chauffeur pour vos équipes.",
              },
              {
                icon: Car,
                title: "Gestion de flotte",
                desc: "Externalisez la gestion complète de votre parc.",
              },
              {
                icon: UserCog,
                title: "Véhicules avec chauffeur",
                desc: "Chauffeurs expérimentés et professionnels.",
              },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="bg-white p-7 border border-transparent hover:border-[var(--rouge)] transition-colors"
              >
                <s.icon className="size-7 text-[var(--navy)] mb-4" />
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-[var(--grey-text)] mb-4">{s.desc}</p>
                <Link
                  to="/services"
                  className="text-sm font-medium text-[var(--rouge)] inline-flex items-center gap-1 hover:gap-2 transition-all"
                >
                  En savoir plus <ArrowRight className="size-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* APERÇU FLOTTE */}
      <section className="py-24 bg-white">
        <div className="container-page">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-brand text-[var(--rouge)] font-medium mb-3">
              Notre flotte
            </p>
            <h2 className="section-title-center text-3xl md:text-4xl">
              Une flotte adaptée à chaque besoin
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {vehicles.slice(0, 4).map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="navyOutline" size="lg">
              <Link to="/flotte">Voir toute la flotte</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* COUVERTURE NATIONALE */}
      <section className="py-24 bg-white">
        <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp} className="flex justify-center">
            <MadagascarMap className="w-full max-w-sm h-auto" />
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }}>
            <p className="text-xs uppercase tracking-brand text-[var(--rouge)] font-medium mb-3">
              Couverture
            </p>
            <h2 className="section-title text-3xl md:text-4xl">
              Présents partout à Madagascar
            </h2>
            <p className="text-[var(--grey-text)] leading-relaxed">
              Depuis notre base de Tamatave, nous livrons et assurons le suivi
              de vos véhicules dans toutes les grandes villes du pays.
              Antananarivo, Toliara, Fianarantsoa, Antsiranana — où que vous
              soyez, Carmada vous accompagne.
            </p>

            <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-border">
              {[
                { value: "12+", label: "Villes desservies" },
                { value: "50+", label: "Véhicules" },
                { value: "8", label: "Années d'expérience" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl md:text-4xl font-semibold text-[var(--rouge)]">
                    {stat.value}
                  </p>
                  <p className="text-xs text-[var(--grey-text)] mt-1 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* À PROPOS */}
      <section className="py-24 bg-[var(--navy)] text-white">
        <div className="container-page text-center max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <p className="text-xs uppercase tracking-brand text-[var(--rouge)] font-medium mb-3">
              À propos
            </p>
            <h2 className="text-3xl md:text-4xl text-white mb-6 relative inline-block pb-3">
              Une entreprise malgache au service des entreprises
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-[var(--rouge)]" />
            </h2>
            <p className="text-white/80 leading-relaxed mt-6">
              Fondée à Tamatave, Carmada SARLU est née de la volonté
              d'apporter aux entreprises malgaches et internationales un
              service de location de véhicules réactif, professionnel et
              adapté aux réalités du terrain.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-14">
            {[
              { value: "500+", label: "Clients satisfaits" },
              { value: "98%", label: "Taux de disponibilité" },
              { value: "24/7", label: "Assistance routière" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-4xl md:text-5xl font-semibold text-[var(--rouge)]">
                  {s.value}
                </p>
                <p className="text-sm text-white/70 mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTENAIRES */}
      <section className="py-20 bg-[var(--beige)] border-y border-black/5">
        <div className="container-page">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-brand text-[var(--rouge)] font-medium mb-3">
              Partenaires
            </p>
            <h2 className="section-title-center text-3xl md:text-4xl">
              Nos partenaires de confiance
            </h2>
            <p className="text-sm text-[var(--grey-text)] mt-4 leading-relaxed">
              Des entreprises malgaches et internationales qui nous confient leur mobilité au quotidien.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 items-center"
          >
            {partners.map((p) => (
              <div
                key={p.name}
                className="group flex items-center justify-center h-24 px-4 bg-white rounded-md border border-black/5 hover:border-[var(--rouge)]/30 transition-colors"
                title={p.name}
              >
                <img
                  src={p.logo}
                  alt={`Logo ${p.name}`}
                  loading="lazy"
                  width={512}
                  height={512}
                  className="max-h-16 w-auto object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className="py-24 bg-white">
        <div className="container-page">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-brand text-[var(--rouge)] font-medium mb-3">
              Témoignages
            </p>
            <h2 className="section-title-center text-3xl md:text-4xl">
              Ils nous font confiance
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                quote:
                  "Service irréprochable, véhicules toujours impeccables et livrés à l'heure. Notre partenaire mobilité depuis 3 ans.",
                author: "Mialy R.",
                role: "Directrice Logistique, Société d'import-export",
              },
              {
                quote:
                  "La flexibilité de Carmada nous a permis d'absorber un pic d'activité sans investir dans une flotte propre.",
                author: "Jean-Luc P.",
                role: "Responsable opérations, ONG internationale",
              },
              {
                quote:
                  "Des 4x4 fiables pour nos missions en brousse. L'équipe est réactive même les week-ends.",
                author: "Hery A.",
                role: "Chef de projet, BTP",
              },
            ].map((t) => (
              <div key={t.author} className="p-7 border-l-2 border-[var(--rouge)] bg-[var(--beige)]">
                <p className="text-sm leading-relaxed text-[var(--navy)] italic">
                  "{t.quote}"
                </p>
                <p className="mt-5 text-sm font-semibold">{t.author}</p>
                <p className="text-xs text-[var(--grey-text)]">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <CTAQuoteForm />
    </PageLayout>
  );
}

type QuoteForm = z.infer<typeof quoteSchema>;

function CTAQuoteForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteForm>({ resolver: zodResolver(quoteSchema) });

  const onSubmit = async (data: QuoteForm) => {
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Demande envoyée", {
      description: `Merci ${data.name}, nous vous recontactons sous 24h.`,
    });
    reset();
  };

  return (
    <section className="py-24 bg-[var(--navy)]">
      <div className="container-page max-w-3xl">
        <div className="bg-white p-8 md:p-12 rounded-lg">
          <p className="text-xs uppercase tracking-brand text-[var(--rouge)] font-medium mb-3">
            Devis express
          </p>
          <h2 className="section-title text-2xl md:text-3xl">
            Obtenez votre devis en moins de 24h
          </h2>
          <p className="text-[var(--grey-text)] mb-8">
            Renseignez vos coordonnées, notre équipe revient vers vous
            rapidement avec une proposition adaptée.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                {...register("name")}
                placeholder="Nom complet"
                className="w-full h-12 px-4 border border-border focus:border-[var(--navy)] outline-none rounded-md text-sm"
              />
              {errors.name && <p className="text-xs text-[var(--rouge)] mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <input
                {...register("phone")}
                placeholder="Téléphone"
                className="w-full h-12 px-4 border border-border focus:border-[var(--navy)] outline-none rounded-md text-sm"
              />
              {errors.phone && <p className="text-xs text-[var(--rouge)] mt-1">{errors.phone.message}</p>}
            </div>
            <div className="md:col-span-2">
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                className="w-full h-12 px-4 border border-border focus:border-[var(--navy)] outline-none rounded-md text-sm"
              />
              {errors.email && <p className="text-xs text-[var(--rouge)] mt-1">{errors.email.message}</p>}
            </div>
            <div className="md:col-span-2">
              <textarea
                {...register("message")}
                placeholder="Votre besoin (type de véhicule, durée, dates...)"
                rows={4}
                className="w-full px-4 py-3 border border-border focus:border-[var(--navy)] outline-none rounded-md text-sm resize-none"
              />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" variant="rouge" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
              </Button>
              <p className="text-xs text-[var(--grey-text)] mt-3 text-center">
                Réponse garantie sous 24h ouvrées · À partir de {formatPrice(150000)}/jour
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
