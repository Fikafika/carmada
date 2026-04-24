import { Link } from "@tanstack/react-router";
import { Facebook, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-[var(--navy-deep)] text-white/85">
      <div className="container-page py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Logo variant="light" />
            <p className="mt-5 text-sm leading-relaxed text-white/70">
              Carmada SARLU, votre partenaire de location de véhicules à
              Madagascar. Solutions sur mesure pour particuliers et entreprises.
            </p>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold tracking-brand uppercase mb-5">
              Liens rapides
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/flotte" className="hover:text-white transition-colors">Notre flotte</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/a-propos" className="hover:text-white transition-colors">À propos</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact & devis</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold tracking-brand uppercase mb-5">
              Nous contacter
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="size-4 mt-0.5 shrink-0 text-[var(--rouge)]" />
                <span>Bd Ratsimilaho, Tamatave 501<br/>Madagascar</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-[var(--rouge)]" />
                <a href="tel:+261202000000" className="hover:text-white">+261 20 53 000 00</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-[var(--rouge)]" />
                <a href="mailto:contact@carmada.mg" className="hover:text-white">contact@carmada.mg</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold tracking-brand uppercase mb-5">
              Suivez-nous
            </h4>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="size-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[var(--rouge)] hover:border-[var(--rouge)] transition-colors">
                <Facebook className="size-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="size-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[var(--rouge)] hover:border-[var(--rouge)] transition-colors">
                <Linkedin className="size-4" />
              </a>
            </div>
            <p className="mt-6 text-xs text-white/60 leading-relaxed">
              Ouvert du lundi au samedi<br/>
              7h30 — 18h00
            </p>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-[var(--rouge)]" />

      <div className="container-page py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
        <p>© 2026 Carmada SARLU. Tous droits réservés.</p>
        <p>Tamatave, Madagascar</p>
      </div>
    </footer>
  );
}
