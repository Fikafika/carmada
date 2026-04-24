import madagascarMap from "@/assets/madagascar-map.png";

/**
 * Stylized map of Madagascar — uses the brand red silhouette
 * with dotted routes connecting key served cities.
 */
export function MadagascarMap({ className = "" }: { className?: string }) {
  return (
    <img
      src={madagascarMap}
      alt="Carte stylisée de Madagascar avec les villes desservies par Carmada"
      loading="lazy"
      width={1024}
      height={1024}
      className={className}
    />
  );
}
