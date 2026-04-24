import { Link } from "@tanstack/react-router";
import { Users, Settings2, Fuel, Snowflake } from "lucide-react";
import { Vehicle, formatPrice } from "@/data/vehicles";
import { Button } from "./ui/button";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <article className="group bg-white border border-border rounded-lg overflow-hidden flex flex-col transition-all duration-300 hover:border-[var(--rouge)] hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--beige)]">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 right-3 bg-[var(--rouge)] text-white text-xs font-medium px-3 py-1 rounded-full">
          {vehicle.category}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-[var(--navy)]">{vehicle.name}</h3>
        <p className="text-xs text-[var(--grey-text)] mt-0.5">
          {vehicle.year} · {vehicle.fuel}
        </p>

        <div className="grid grid-cols-4 gap-2 mt-4 text-[var(--grey-text)]">
          <div className="flex flex-col items-center gap-1 text-[10px]">
            <Users className="size-4" />
            <span>{vehicle.seats} pl.</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-[10px]">
            <Settings2 className="size-4" />
            <span>{vehicle.transmission === "Automatique" ? "Auto" : "Manu"}</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-[10px]">
            <Fuel className="size-4" />
            <span>{vehicle.fuel}</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-[10px]">
            <Snowflake className="size-4" />
            <span>{vehicle.hasAC ? "Clim" : "—"}</span>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-border">
          <p className="text-xs text-[var(--grey-text)]">À partir de</p>
          <p className="text-xl font-semibold text-[var(--rouge)]">
            {formatPrice(vehicle.pricePerDay)}
            <span className="text-xs font-normal text-[var(--grey-text)]">/jour</span>
          </p>
        </div>

        <div className="mt-4 flex gap-2">
          <Button asChild variant="navyOutline" size="sm" className="flex-1">
            <Link to="/flotte/$slug" params={{ slug: vehicle.slug }}>Détails</Link>
          </Button>
          <Button asChild variant="rouge" size="sm" className="flex-1">
            <Link to="/contact">Réserver</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
