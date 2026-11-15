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

export const ServiceCard = ({ image, name, price, description, serviceId, focus }: ServiceCardProps) => {
  const bookingUrl = `/booking?service=${encodeURIComponent(serviceId)}`;

  return (
    <article className="group flex flex-col h-full bg-card rounded-3xl overflow-hidden border border-border/60 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all duration-500">
      <Link to={bookingUrl} className="block relative overflow-hidden aspect-[4/5] bg-secondary" aria-label={`Book ${name}`}>
        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: focus ?? "50% 35%" }}
          className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        />
        <span className="absolute top-4 right-4 rounded-full bg-white/95 backdrop-blur px-4 py-1.5 text-sm font-semibold text-primary shadow-soft">
          {price}
        </span>
      </Link>

      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-heading text-2xl text-foreground">{name}</h3>
        <p className="mt-2 text-muted-foreground text-sm leading-relaxed flex-1">{description}</p>
        <Button asChild variant="blush" className="w-full mt-6">
          <Link to={bookingUrl}>
            Book Now <ArrowUpRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
};
