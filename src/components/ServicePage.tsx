import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Info } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ServiceCard } from "@/components/ServiceCard";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { groupsFor, formatPrice, type ServiceCategoryId } from "@/data/services";

interface ServicePageProps {
  category: ServiceCategoryId;
  eyebrow: string;
  title: ReactNode;
  intro: string;
  heroImage: string;
  heroFocus?: string;
  expectations: { title: string; text: string }[];
}

/** Shared layout for the Lashes, Brows and Tattoos pages. */
export const ServicePage = ({ category, eyebrow, title, intro, heroImage, heroFocus, expectations }: ServicePageProps) => {
  const groups = groupsFor(category);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#f6f6f6]">
        <div className="container mx-auto px-5 lg:px-8">
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 items-center py-12 lg:py-20">
            <div className="text-center md:text-left">
              <span className="eyebrow animate-fade-in">{eyebrow}</span>
              <h1 className="mt-4 font-heading text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.05] text-foreground animate-slide-up">
                {title}
              </h1>
              <p className="mt-5 text-muted-foreground text-base sm:text-lg max-w-xl mx-auto md:mx-0 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                {intro}
              </p>
              {groups.length > 1 && (
                <div className="mt-8 flex flex-wrap gap-2 justify-center md:justify-start">
                  {groups.map((g) => (
                    <a
                      key={g.id}
                      href={`#${g.id}`}
                      className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-foreground/75 hover:border-primary/40 hover:text-primary transition-colors"
                    >
                      {g.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div className="hidden md:block">
              <div className="relative mx-auto max-w-sm">
                <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-full rounded-b-3xl border border-accent/70" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-3xl shadow-elegant">
                  <img src={heroImage} alt="" className="h-full w-full object-cover" style={{ objectPosition: heroFocus ?? "50% 30%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-5 lg:px-8 space-y-20">
          {groups.map((group) => (
            <div key={group.id} id={group.id} className="scroll-mt-24">
              <Reveal className="mb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 text-center lg:text-left">
                <div>
                  <h2 className="section-title">{group.title}</h2>
                  <p className="text-muted-foreground mt-3">{group.subtitle}</p>
                </div>
                {/* compact price summary */}
                <ul className="flex flex-wrap justify-center lg:justify-end gap-2">
                  {group.services.map((s) => (
                    <li key={s.id} className="rounded-full bg-secondary px-3.5 py-1.5 text-xs font-medium text-secondary-foreground">
                      {s.name} · <span className="text-primary font-semibold">{formatPrice(s)}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <div
                className={`grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 ${
                  group.services.length >= 4 ? "lg:grid-cols-4" : group.services.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2 lg:max-w-4xl lg:mx-auto"
                }`}
              >
                {group.services.map((s, i) => (
                  <Reveal key={s.id} delay={i * 80}>
                    <ServiceCard
                      serviceId={s.id}
                      name={s.name}
                      price={formatPrice(s)}
                      description={s.description}
                      image={s.image}
                      focus={s.focus}
                    />
                  </Reveal>
                ))}
              </div>

              {group.note && (
                <p className="mt-8 mx-auto max-w-2xl flex items-start justify-center gap-2 rounded-2xl bg-secondary px-5 py-4 text-sm text-secondary-foreground">
                  <Info className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                  {group.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* What to expect */}
      <section className="py-16 lg:py-24 bg-secondary/60">
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal className="text-center mb-10">
            <span className="eyebrow">Good to Know</span>
            <h2 className="section-title mt-4">What to expect</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {expectations.map((e, i) => (
              <Reveal key={e.title} delay={i * 100}>
                <div className="h-full bg-white rounded-3xl p-7 border border-border/60">
                  <span className="font-heading text-4xl text-accent">0{i + 1}</span>
                  <h3 className="mt-3 font-heading text-xl text-foreground">{e.title}</h3>
                  <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{e.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="hero" size="xl">
              <Link to="/booking">Book an Appointment</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};
