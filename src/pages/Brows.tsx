import { Layout } from "@/components/Layout";
import { ServiceCard } from "@/components/ServiceCard";
import lashClassic from "@/assets/lash-classic-1.jpg";

const browServices = [
  {
    id: "ombre-brows",
    name: "Ombré Brows",
    price: "₦40,000",
    description: "Soft shaded semi-permanent brows that create a beautiful, natural-looking gradient. The perfect solution for fuller, defined brows that last.",
    image: lashClassic,
  },
  {
    id: "brow-tinting-lamination",
    name: "Brow Tinting & Lamination",
    price: "₦20,000",
    description: "Shape, lift, and define your brows. This treatment creates fuller-looking brows by setting hairs in place and adding color depth.",
    image: lashClassic,
  },
];

const Brows = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-secondary/50 to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-primary font-medium text-sm tracking-wider uppercase mb-3">
              Brow Services
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-6">
              Perfect Brows, <span className="text-primary italic">Every Day</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Frame your face with beautifully shaped, defined brows. Our expert brow 
              services give you effortlessly polished brows that enhance your natural beauty.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {browServices.map((service) => (
              <ServiceCard
                key={service.id}
                serviceId={service.id}
                category="brows"
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
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Ombré Brows</h3>
                <p>Semi-permanent makeup technique that creates a soft, powdered effect. Lasts 1-3 years depending on skin type and aftercare. A touch-up session may be needed 6-8 weeks after initial application.</p>
              </div>
              <div className="bg-card p-6 rounded-xl">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Brow Lamination</h3>
                <p>A temporary treatment that restructures brow hairs to keep them in a desired shape. Results last 4-6 weeks. Combined with tinting, it gives the appearance of fuller, more defined brows.</p>
              </div>
              <div className="bg-card p-6 rounded-xl">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Aftercare</h3>
                <p>Keep brows dry for 24-48 hours after treatment. Avoid touching or rubbing the area. Apply recommended aftercare products as directed by your artist.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Brows;
