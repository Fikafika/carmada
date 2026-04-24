import { Link } from "@tanstack/react-router";

interface LogoProps {
  variant?: "default" | "light";
  compact?: boolean;
}

export function Logo({ variant = "default", compact = false }: LogoProps) {
  const navyColor = variant === "light" ? "#FFFFFF" : "#1B2A4A";
  const greyColor = variant === "light" ? "rgba(255,255,255,0.7)" : "#888780";

  return (
    <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="Carmada accueil">
      {/* Logo mark */}
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="22" cy="22" r="22" fill={navyColor} />
        {/* Madagascar silhouette stylized */}
        <path
          d="M19 8 C 16 10, 14 14, 14 18 C 14 22, 15 26, 17 30 C 18 33, 20 35, 22 36 C 24 35, 26 33, 27 30 C 28 26, 29 22, 28 18 C 27 13, 24 9, 22 8 Z"
          fill="#B22234"
        />
        {/* Three city dots */}
        <circle cx="20" cy="14" r="1.4" fill="#FFFFFF" />
        <circle cx="22" cy="22" r="1.4" fill="#FFFFFF" />
        <circle cx="24" cy="30" r="1.4" fill="#FFFFFF" />
        {/* Dotted route */}
        <path
          d="M20 14 L 22 22 L 24 30"
          stroke="#FFFFFF"
          strokeWidth="0.8"
          strokeDasharray="1.5 1.5"
          fill="none"
        />
      </svg>

      {!compact && (
        <div className="flex flex-col leading-none">
          <span
            className="font-semibold text-lg tracking-brand"
            style={{ color: navyColor }}
          >
            CARMADA
          </span>
          <span
            className="block h-px w-full my-1"
            style={{ backgroundColor: "#B22234" }}
            aria-hidden="true"
          />
          <span
            className="text-[9px] uppercase tracking-[0.18em]"
            style={{ color: greyColor }}
          >
            Location de véhicules
          </span>
        </div>
      )}
    </Link>
  );
}
