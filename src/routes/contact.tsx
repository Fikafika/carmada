import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, MapPin, Phone, MessageCircle, Clock } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { vehicles } from "@/data/vehicles";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & devis — Carmada SARLU" },
      {
        name: "description",
        content:
          "Contactez Carmada SARLU à Tamatave pour un devis ou toute demande d'information. Réponse garantie sous 24h ouvrées.",
      },
      { property: "og:title", content: "Contact — Carmada SARLU" },
      {
        property: "og:description",
        content: "Demandez un devis gratuit pour la location de votre véhicule à Madagascar.",
      },
    ],
  }),
  component: ContactPage,
});

const contactSchema = z.object({
  name: z.string().trim().min(2, "Nom requis").max(100),
  company: z.string().trim().max(100).optional(),
  email: z.string().trim().email("Email invalide").max(255),
  phone: z.string().trim().min(6, "Téléphone requis").max(30),
  type: z.enum(["devis", "info", "partenariat", "autre"]),
  vehicle: z.string().optional(),
  duration: z.string().trim().max(60).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  message: z.string().trim().min(10, "Message trop court (min. 10 caractères)").max(1000),
});

type ContactForm = z.infer<typeof contactSchema>;

function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { type: "devis" },
  });

  const onSubmit = async (data: ContactForm) => {
    await new Promise((r) => setTimeout(r, 700));
    toast.success("Demande envoyée", {
      description: `Merci ${data.name}, notre équipe vous recontacte sous 24h ouvrées.`,
    });
    reset();
  };

  const inputCls =
    "w-full h-11 px-4 border border-border focus:border-[var(--navy)] outline-none rounded-md text-sm bg-white";
  const labelCls = "block text-xs font-medium text-[var(--navy)] mb-1.5 uppercase tracking-wider";

  return (
    <PageLayout>
      <section className="bg-[var(--navy)] text-white py-20">
        <div className="container-page">
          <p className="text-xs uppercase tracking-brand text-[var(--rouge)] font-medium mb-3">
            Contact
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-white">Parlons de votre projet</h1>
          <p className="mt-3 text-white/75 max-w-xl">
            Une question, un devis, un partenariat ? Notre équipe revient vers vous sous 24h.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[var(--beige)]">
        <div className="container-page grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Formulaire */}
          <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-lg">
            <h2 className="section-title text-2xl">Demande de devis</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
              <div>
                <label className={labelCls}>Nom complet *</label>
                <input {...register("name")} className={inputCls} />
                {errors.name && <p className="text-xs text-[var(--rouge)] mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className={labelCls}>Entreprise</label>
                <input {...register("company")} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Email *</label>
                <input type="email" {...register("email")} className={inputCls} />
                {errors.email && <p className="text-xs text-[var(--rouge)] mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className={labelCls}>Téléphone *</label>
                <input {...register("phone")} className={inputCls} />
                {errors.phone && <p className="text-xs text-[var(--rouge)] mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <label className={labelCls}>Type de demande *</label>
                <select {...register("type")} className={inputCls}>
                  <option value="devis">Devis</option>
                  <option value="info">Information</option>
                  <option value="partenariat">Partenariat</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Véhicule souhaité</label>
                <select {...register("vehicle")} className={inputCls}>
                  <option value="">Indifférent</option>
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.slug}>{v.name} ({v.category})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls}>Durée de location</label>
                <input {...register("duration")} placeholder="Ex : 5 jours, 2 semaines..." className={inputCls} />
              </div>
              <div className="md:col-span-1 grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Du</label>
                  <input type="date" {...register("startDate")} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Au</label>
                  <input type="date" {...register("endDate")} className={inputCls} />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className={labelCls}>Message *</label>
                <textarea
                  {...register("message")}
                  rows={5}
                  placeholder="Décrivez votre besoin..."
                  className="w-full px-4 py-3 border border-border focus:border-[var(--navy)] outline-none rounded-md text-sm bg-white resize-none"
                />
                {errors.message && <p className="text-xs text-[var(--rouge)] mt-1">{errors.message.message}</p>}
              </div>
              <div className="md:col-span-2">
                <Button type="submit" variant="rouge" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
                  {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
                </Button>
              </div>
            </form>
          </div>

          {/* Infos contact */}
          <aside className="space-y-5">
            <div className="bg-[var(--navy)] text-white p-7 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-5">Nous joindre</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex gap-3">
                  <MapPin className="size-5 shrink-0 text-[var(--rouge)] mt-0.5" />
                  <div>
                    <p className="font-medium text-white">Adresse</p>
                    <p className="text-white/75">Bd Ratsimilaho<br />Tamatave 501, Madagascar</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Phone className="size-5 shrink-0 text-[var(--rouge)] mt-0.5" />
                  <div>
                    <p className="font-medium text-white">Téléphone</p>
                    <a href="tel:+261202000000" className="text-white/75 hover:text-white block">+261 20 53 000 00</a>
                    <a href="tel:+261340000000" className="text-white/75 hover:text-white block">+261 34 00 000 00</a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <MessageCircle className="size-5 shrink-0 text-[var(--rouge)] mt-0.5" />
                  <div>
                    <p className="font-medium text-white">WhatsApp</p>
                    <a href="https://wa.me/261340000000" className="text-white/75 hover:text-white">+261 34 00 000 00</a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Mail className="size-5 shrink-0 text-[var(--rouge)] mt-0.5" />
                  <div>
                    <p className="font-medium text-white">Email</p>
                    <a href="mailto:contact@carmada.mg" className="text-white/75 hover:text-white">contact@carmada.mg</a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Clock className="size-5 shrink-0 text-[var(--rouge)] mt-0.5" />
                  <div>
                    <p className="font-medium text-white">Horaires</p>
                    <p className="text-white/75">Lundi - Samedi<br />7h30 - 18h00</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="aspect-[4/3] bg-white border border-border rounded-lg overflow-hidden">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=49.39%2C-18.18%2C49.45%2C-18.13&layer=mapnik&marker=-18.155%2C49.42"
                className="w-full h-full border-0"
                loading="lazy"
                title="Carte Tamatave"
              />
            </div>
          </aside>
        </div>
      </section>
    </PageLayout>
  );
}
