import { Layout } from "@/components/Layout";
import { ServiceCard } from "@/components/ServiceCard";
import lashClassic from "@/assets/lash-classic-1.jpg";
import lashHybrid from "@/assets/lash-hybrid-1.jpg";
import lashVolume from "@/assets/lash-volume-1.jpg";
import lashMega from "@/assets/lash-mega-1.jpg";

const lashServices = [
  {
    id: "classic-set",
    name: "Classic Set",
    price: "₦13,000",
    description: "Natural soft everyday lashes. Perfect for a subtle, elegant enhancement that adds length and definition to your natural lashes.",
    image: lashClassic,
  },
  {
    id: "hybrid-set",
    name: "Hybrid Set",
    price: "₦17,000",
    description: "The perfect blend of classic and volume lashes. Ideal for those wanting more fullness while maintaining a natural look.",
    image: lashHybrid,
  },
  {
    id: "volume-set",
    name: "Volume",
    price: "₦22,000",
    description: "Full, thick lash look that creates stunning, dramatic eyes. Multiple lightweight lashes applied to each natural lash.",
    image: lashVolume,
  },
  {
    id: "mega-volume",
    name: "Mega Volume",
    price: "₦30,000",
    description: "Ultra glamorous dramatic volume for the most intense, bold look. Maximum fullness and dimension for special occasions.",
    image: lashMega,
  },
  {
    id: "lash-refill",
    name: "Lash Refill",
    price: "₦5,000+",
    description: "Refill and maintenance service to keep your lashes looking fresh. Price varies depending on lash type and condition.",
    image: lashVolume,
  },
];

const Lashes = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-secondary/50 to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-primary font-medium text-sm tracking-wider uppercase mb-3">
              Lash Extensions
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-6">
              Beautiful Lashes, <span className="text-primary italic">Effortlessly</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Wake up every day with perfectly curled, voluminous lashes. Our expert lash artist 
              creates customized looks to enhance your natural beauty.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lashServices.map((service) => (
              <ServiceCard
                key={service.id}
                serviceId={service.id}
                category="lashes"
                name={service.name}
                price={service.price}
                description={service.description}
                image={service.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-6 text-center">
              What to Expect
            </h2>
            <div className="space-y-6 text-muted-foreground">
              <div className="bg-card p-6 rounded-xl">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Before Your Appointment</h3>
                <p>Arrive with clean, makeup-free eyes. Avoid oil-based products around the eye area 24 hours before your appointment.</p>
              </div>
              <div className="bg-card p-6 rounded-xl">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">During the Session</h3>
                <p>Relax while your lash artist carefully applies each extension. Full sets take approximately 2 hours, refills around 1 hour.</p>
              </div>
              <div className="bg-card p-6 rounded-xl">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Aftercare</h3>
                <p>Avoid getting lashes wet for 24 hours. Brush daily with a clean spoolie. Schedule refills every 2-3 weeks for best results.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Lashes;
