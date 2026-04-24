import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./ui/button";

const navLinks = [
  { to: "/" as const, label: "Accueil" },
  { to: "/flotte" as const, label: "Flotte" },
  { to: "/services" as const, label: "Services" },
  { to: "/a-propos" as const, label: "À propos" },
  { to: "/contact" as const, label: "Contact" },
];

export function Header({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isSolid = solid || scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSolid
          ? "bg-white/85 backdrop-blur-md border-b border-border"
          : "bg-white/0"
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between">
        <Logo variant={isSolid ? "default" : "light"} />

        <nav className="hidden lg:flex items-center gap-8" aria-label="Navigation principale">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              className={`text-sm font-medium transition-colors ${
                isSolid
                  ? "text-[var(--navy)] hover:text-[var(--rouge)] data-[status=active]:text-[var(--rouge)]"
                  : "text-white hover:text-white/80 data-[status=active]:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild variant="rouge" size="default">
            <Link to="/contact">Demander un devis</Link>
          </Button>
        </div>

        <button
          onClick={() => setOpen(true)}
          className={`lg:hidden p-2 transition-colors ${
            isSolid ? "text-[var(--navy)]" : "text-white"
          }`}
          aria-label="Ouvrir le menu"
        >
          <Menu className="size-6" />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <Logo compact />
              <button
                onClick={() => setOpen(false)}
                className="p-2 text-[var(--navy)]"
                aria-label="Fermer le menu"
              >
                <X className="size-6" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col p-5 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: link.to === "/" }}
                  className="py-3 px-2 text-base font-medium text-[var(--navy)] border-b border-border data-[status=active]:text-[var(--rouge)]"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-6">
                <Button asChild variant="rouge" size="lg" className="w-full">
                  <Link to="/contact" onClick={() => setOpen(false)}>
                    Demander un devis
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
