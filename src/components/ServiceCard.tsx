import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  image: string;
  name: string;
  price: string;
  description: string;
  serviceId: string;
  /** Kept for backwards compatibility with older booking links. */
  category?: string;
  focus?: string;
}

/**
 * Phones: compact horizontal row (small photo + details).
 * Tablet/desktop: tall card with a large photo.
 */
export const ServiceCard = ({ image, name, price, description, serviceId, focus }: ServiceCardProps) => {
  const bookingUrl = `/booking?service=${encodeURIComponent(serviceId)}`;

  return (
    <article className="group flex sm:flex-col h-full bg-card rounded-2xl sm:rounded-3xl overflow-hidden border border-border/60 shadow-soft hover:shadow-elegant sm:hover:-translate-y-1 transition-all duration-500">
      <Link
        to={bookingUrl}
        className="relative shrink-0 w-28 sm:w-auto self-stretch sm:self-auto overflow-hidden sm:aspect-[4/5] bg-secondary"
        aria-label={`Book ${name}`}
      >
        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: focus ?? "50% 35%" }}
          className="absolute inset-0 sm:static w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        />
        <span className="hidden sm:inline-block absolute top-4 right-4 rounded-full bg-white/95 backdrop-blur px-4 py-1.5 text-sm font-semibold text-primary shadow-soft">
          {price}
        </span>
      </Link>

      <div className="flex flex-col flex-1 min-w-0 p-4 sm:p-6">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-heading text-lg sm:text-2xl text-foreground leading-tight">{name}</h3>
          <span className="sm:hidden shrink-0 text-sm font-semibold text-foreground">{price}</span>
        </div>
        <p className="mt-1 sm:mt-2 text-muted-foreground text-[0.8rem] sm:text-sm leading-relaxed flex-1">{description}</p>
        <Button asChild variant="blush" size="sm" className="mt-3 sm:mt-6 self-start sm:self-stretch sm:h-10">
          <Link to={bookingUrl}>
            Book Now <ArrowUpRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
};
