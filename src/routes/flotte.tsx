import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, RotateCcw } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { VehicleCard } from "@/components/VehicleCard";
import { Button } from "@/components/ui/button";
import {
  vehicles,
  categories,
  type VehicleCategory,
} from "@/data/vehicles";
import fleetBanner from "@/assets/fleet-banner.jpg";

export const Route = createFileRoute("/flotte")({
  head: () => ({
    meta: [
      { title: "Notre flotte — Carmada SARLU" },
      {
        name: "description",
        content:
          "Découvrez notre flotte de véhicules à louer à Madagascar : berlines, SUV, 4x4, utilitaires et minibus, tous entretenus et assurés.",
      },
      { property: "og:title", content: "Notre flotte de véhicules — Carmada" },
      {
        property: "og:description",
        content: "Berlines, SUV, 4x4, utilitaires, minibus à louer partout à Madagascar.",
      },
      { property: "og:image", content: fleetBanner },
      { name: "twitter:image", content: fleetBanner },
    ],
  }),
  component: FleetPage,
});

type Sort = "default" | "price-asc" | "price-desc" | "capacity";

function FleetPage() {
  const [category, setCategory] = useState<VehicleCategory | "Toutes">("Toutes");
  const [transmission, setTransmission] = useState<"Toutes" | "Manuelle" | "Automatique">("Toutes");
  const [minSeats, setMinSeats] = useState(2);
  const [sort, setSort] = useState<Sort>("default");

  const filtered = useMemo(() => {
    let list = vehicles.filter((v) => {
      if (category !== "Toutes" && v.category !== category) return false;
      if (transmission !== "Toutes" && v.transmission !== transmission) return false;
      if (v.seats < minSeats) return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.pricePerDay - b.pricePerDay);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.pricePerDay - a.pricePerDay);
        break;
      case "capacity":
        list = [...list].sort((a, b) => b.seats - a.seats);
        break;
    }
    return list;
  }, [category, transmission, minSeats, sort]);

  const reset = () => {
    setCategory("Toutes");
    setTransmission("Toutes");
    setMinSeats(2);
    setSort("default");
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[280px] flex items-center -mt-20 pt-20 overflow-hidden">
        <img src={fleetBanner} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--navy-deep)]/70" />
        <div className="container-page relative z-10 text-white">
          <nav className="text-xs text-white/70 mb-4 flex items-center gap-1">
            <Link to="/" className="hover:text-white">Accueil</Link>
            <ChevronRight className="size-3" />
            <span className="text-white">Flotte</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-semibold text-white">Notre flotte</h1>
          <p className="mt-3 text-white/80 max-w-xl">
            Des véhicules rigoureusement entretenus, adaptés à tous vos besoins.
          </p>
        </div>
      </section>

      {/* Filtres */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur border-b border-border">
        <div className="container-page py-4 flex flex-wrap items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {(["Toutes", ...categories] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 h-9 text-xs font-medium rounded-full border transition-colors ${
                  category === c
                    ? "bg-[var(--navy)] text-white border-[var(--navy)]"
                    : "bg-white text-[var(--navy)] border-border hover:border-[var(--navy)]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 ml-auto flex-wrap">
            <select
              value={transmission}
              onChange={(e) => setTransmission(e.target.value as typeof transmission)}
              className="h-9 px-3 text-xs border border-border rounded-md bg-white"
            >
              <option value="Toutes">Toutes transmissions</option>
              <option value="Manuelle">Manuelle</option>
              <option value="Automatique">Automatique</option>
            </select>

            <div className="flex items-center gap-2 text-xs">
              <label className="text-[var(--grey-text)]">Min. {minSeats} places</label>
              <input
                type="range"
                min={2}
                max={20}
                value={minSeats}
                onChange={(e) => setMinSeats(Number(e.target.value))}
                className="w-24 accent-[var(--rouge)]"
              />
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="h-9 px-3 text-xs border border-border rounded-md bg-white"
            >
              <option value="default">Pertinence</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="capacity">Capacité</option>
            </select>

            <button
              onClick={reset}
              className="text-xs text-[var(--rouge)] font-medium flex items-center gap-1 hover:underline"
            >
              <RotateCcw className="size-3" />
              Réinitialiser
            </button>
          </div>
        </div>
      </div>

      {/* Grille */}
      <section className="py-16 bg-white">
        <div className="container-page">
          <p className="text-sm text-[var(--grey-text)] mb-8">
            {filtered.length} véhicule{filtered.length > 1 ? "s" : ""} disponible{filtered.length > 1 ? "s" : ""}
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[var(--grey-text)]">Aucun véhicule ne correspond à ces critères.</p>
              <Button onClick={reset} variant="navyOutline" className="mt-4">Réinitialiser</Button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact rapide */}
      <section className="py-16 bg-white">
        <div className="container-page">
          <div className="bg-[var(--rouge)] text-white p-10 md:p-14 rounded-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-semibold text-white">
                Vous ne trouvez pas le véhicule idéal ?
              </h3>
              <p className="text-white/85 mt-2 max-w-xl">
                Contactez-nous directement, nous avons d'autres options
                disponibles selon vos besoins spécifiques.
              </p>
            </div>
            <Button asChild variant="heroOutline" size="lg" className="shrink-0">
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
