import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronRight,
  Users,
  Settings2,
  Fuel,
  Snowflake,
  Mountain,
  Briefcase,
  Phone,
  Check,
} from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { VehicleCard } from "@/components/VehicleCard";
import { Button } from "@/components/ui/button";
import {
  getVehicleBySlug,
  getSimilarVehicles,
  formatPrice,
} from "@/data/vehicles";

export const Route = createFileRoute("/flotte/$slug")({
  loader: ({ params }) => {
    const vehicle = getVehicleBySlug(params.slug);
    if (!vehicle) throw notFound();
    return { vehicle };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.vehicle.name} — Location à Madagascar | Carmada` },
          {
            name: "description",
            content: loaderData.vehicle.description.slice(0, 155),
          },
          { property: "og:title", content: `${loaderData.vehicle.name} — Carmada` },
          { property: "og:description", content: loaderData.vehicle.description.slice(0, 155) },
          { property: "og:image", content: loaderData.vehicle.image },
          { name: "twitter:image", content: loaderData.vehicle.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <PageLayout>
      <div className="container-page py-32 text-center">
        <h1 className="text-3xl font-semibold mb-4">Véhicule introuvable</h1>
        <Button asChild variant="rouge"><Link to="/flotte">Retour à la flotte</Link></Button>
      </div>
    </PageLayout>
  ),
  component: VehicleDetailPage,
});

type Tab = "description" | "equipement" | "tarifs" | "conditions";

function VehicleDetailPage() {
  const { vehicle } = Route.useLoaderData();
  const [tab, setTab] = useState<Tab>("description");
  const similar = getSimilarVehicles(vehicle, 3);

  return (
    <PageLayout>
      <div className="container-page py-8">
        <nav className="text-xs text-[var(--grey-text)] flex items-center gap-1 flex-wrap">
          <Link to="/" className="hover:text-[var(--navy)]">Accueil</Link>
          <ChevronRight className="size-3" />
          <Link to="/flotte" className="hover:text-[var(--navy)]">Flotte</Link>
          <ChevronRight className="size-3" />
          <span>{vehicle.category}</span>
          <ChevronRight className="size-3" />
          <span className="text-[var(--navy)]">{vehicle.name}</span>
        </nav>
      </div>

      <section className="container-page pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Galerie */}
          <div>
            <div className="aspect-[4/3] bg-[var(--beige)] rounded-lg overflow-hidden border border-border">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-3 mt-4">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-[var(--beige)] rounded border border-border overflow-hidden opacity-70"
                >
                  <img src={vehicle.image} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Infos */}
          <div>
            <span className="inline-block bg-[var(--rouge)] text-white text-xs font-medium px-3 py-1 rounded-full">
              {vehicle.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-semibold mt-4">{vehicle.name}</h1>
            <p className="text-[var(--grey-text)] mt-1">
              {vehicle.year} · {vehicle.fuel}
            </p>

            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { icon: Users, label: "Places", value: vehicle.seats },
                { icon: Settings2, label: "Boîte", value: vehicle.transmission },
                { icon: Fuel, label: "Carburant", value: vehicle.fuel },
                { icon: Snowflake, label: "Climatisation", value: vehicle.hasAC ? "Oui" : "Non" },
                { icon: Mountain, label: "Type", value: vehicle.is4x4 ? "4x4" : "2 RM" },
                { icon: Briefcase, label: "Coffre", value: `${vehicle.trunkVolume} L` },
              ].map((item) => (
                <div key={item.label} className="p-3 border border-border rounded-md">
                  <item.icon className="size-4 text-[var(--rouge)]" />
                  <p className="text-[10px] uppercase text-[var(--grey-text)] mt-2">{item.label}</p>
                  <p className="text-sm font-medium text-[var(--navy)]">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-[var(--beige)] rounded-lg">
              <p className="text-xs text-[var(--grey-text)] uppercase tracking-wider">À partir de</p>
              <p className="text-4xl font-semibold text-[var(--rouge)] mt-1">
                {formatPrice(vehicle.pricePerDay)}
                <span className="text-base text-[var(--grey-text)] font-normal">/jour</span>
              </p>
              <p className="text-xs text-[var(--grey-text)] mt-2">
                Hors carburant · Kilométrage illimité · Assurance incluse
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button asChild variant="rouge" size="lg">
                <Link to="/contact">Demander un devis</Link>
              </Button>
              <Button asChild variant="navyOutline" size="lg">
                <a href="tel:+261202000000"><Phone className="size-4" />Appeler</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="container-page pb-16">
        <div className="border-b border-border flex flex-wrap gap-2">
          {([
            { id: "description", label: "Description" },
            { id: "equipement", label: "Équipements" },
            { id: "tarifs", label: "Tarifs" },
            { id: "conditions", label: "Conditions" },
          ] as const).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
                tab === t.id
                  ? "border-[var(--rouge)] text-[var(--navy)]"
                  : "border-transparent text-[var(--grey-text)] hover:text-[var(--navy)]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="py-8">
          {tab === "description" && (
            <p className="text-[var(--grey-text)] leading-relaxed max-w-3xl">
              {vehicle.description}
            </p>
          )}
          {tab === "equipement" && (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
              {vehicle.equipment.map((e: string) => (
                <li key={e} className="flex items-center gap-3 text-sm">
                  <Check className="size-4 text-green-600" />
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          )}
          {tab === "tarifs" && (
            <div className="overflow-x-auto max-w-2xl">
              <table className="w-full text-sm border border-border">
                <thead className="bg-[var(--beige)]">
                  <tr>
                    <th className="text-left p-3 font-semibold">Durée</th>
                    <th className="text-left p-3 font-semibold">Tarif journalier</th>
                    <th className="text-left p-3 font-semibold">Économie</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicle.pricingTiers.map((t: { duration: string; pricePerDay: number; discount: string }) => (
                    <tr key={t.duration} className="border-t border-border">
                      <td className="p-3">{t.duration}</td>
                      <td className="p-3 font-medium text-[var(--rouge)]">{formatPrice(t.pricePerDay)}</td>
                      <td className="p-3 text-[var(--grey-text)]">{t.discount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {tab === "conditions" && (
            <ul className="space-y-3 text-sm text-[var(--grey-text)] max-w-2xl">
              <li><strong className="text-[var(--navy)]">Âge minimum :</strong> {vehicle.conditions.minAge} ans</li>
              <li><strong className="text-[var(--navy)]">Permis :</strong> {vehicle.conditions.license}</li>
              <li><strong className="text-[var(--navy)]">Caution :</strong> {vehicle.conditions.deposit}</li>
              <li><strong className="text-[var(--navy)]">Kilométrage :</strong> {vehicle.conditions.mileage}</li>
              <li><strong className="text-[var(--navy)]">Assurance :</strong> {vehicle.conditions.insurance}</li>
            </ul>
          )}
        </div>
      </section>

      {/* Similaires */}
      {similar.length > 0 && (
        <section className="py-16 bg-[var(--beige)]">
          <div className="container-page">
            <h2 className="section-title text-2xl md:text-3xl">Véhicules similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {similar.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-[var(--rouge)] text-white text-center">
        <div className="container-page">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
            Prêt à réserver ce véhicule ?
          </h2>
          <Button asChild variant="heroOutline" size="lg">
            <Link to="/contact">Demander un devis</Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
