import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Info } from "lucide-react";
import { serviceGroups, formatPrice } from "@/data/services";

/** Elegant tabbed price list, mirroring the official Simi Aesthetic price list. */
export const PriceMenu = () => {
  const [activeId, setActiveId] = useState(serviceGroups[0].id);
  const group = serviceGroups.find((g) => g.id === activeId) ?? serviceGroups[0];

  return (
    <div>
      {/* Tabs — scroll sideways on small screens */}
      <div
        role="tablist"
        aria-label="Service categories"
        className="scrollbar-hide -mx-5 px-5 flex gap-2 overflow-x-auto pb-1 sm:justify-center sm:flex-wrap"
      >
        {serviceGroups.map((g) => {
          const active = g.id === activeId;
          return (
            <button
              key={g.id}
              role="tab"
              aria-selected={active}
              aria-controls={`panel-${g.id}`}
              onClick={() => setActiveId(g.id)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                active
                  ? "bg-foreground text-background shadow-soft"
                  : "bg-white text-foreground/70 border border-border hover:border-primary/40 hover:text-primary"
              }`}
            >
              {g.title}
            </button>
          );
        })}
      </div>

      <div
        id={`panel-${group.id}`}
        role="tabpanel"
        key={group.id}
        className="mt-8 animate-fade-in rounded-3xl bg-white border border-border/70 shadow-soft overflow-hidden"
      >
        <div className="h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0" />
        <div className="p-6 sm:p-10">
          <div className="text-center mb-8">
            <h3 className="font-heading text-2xl sm:text-3xl text-foreground">{group.title}</h3>
            <p className="text-muted-foreground text-sm mt-2">{group.subtitle}</p>
          </div>

          <ul className="divide-y divide-border/60">
            {group.services.map((s) => (
              <li key={s.id} className="group py-5 first:pt-0 last:pb-0">
                <div className="flex items-baseline">
                  <span className="font-heading text-lg sm:text-xl text-foreground">{s.name}</span>
                  <span className="price-leader" aria-hidden />
                  <span className="font-semibold text-primary whitespace-nowrap">{formatPrice(s)}</span>
                </div>
                <div className="mt-1.5 flex items-start justify-between gap-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                  <Link
                    to={`/booking?service=${s.id}`}
                    className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-foreground/60 hover:text-primary transition-colors"
                    aria-label={`Book ${s.name} — ${group.title}`}
                  >
                    Book <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          {group.note && (
            <p className="mt-8 flex items-start gap-2 rounded-xl bg-secondary px-4 py-3 text-sm text-secondary-foreground">
              <Info className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
              {group.note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
