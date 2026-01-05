import { Layout } from "@/components/Layout";
import { ServiceCard } from "@/components/ServiceCard";
import tattooSmall from "@/assets/tattoo-small-1.jpg";
import tattooBig from "@/assets/tattoo-tribal-1.jpg";

const tattooServices = [
  {
    id: "small-tattoo",
    name: "Small Tattoo",
    price: "₦15,000",
    description: "Minimalist small pieces perfect for first-timers or those who love delicate, subtle designs. Ideal for fingers, wrists, ankles, or behind the ear.",
    image: tattooSmall,
  },
  {
    id: "big-tattoo",
    name: "Big Tattoo",
    price: "₦25,000",
    description: "Larger custom designs for a bold statement. Perfect for arms, shoulders, back, or thighs. Price may vary based on complexity and size.",
    image: tattooBig,
  },
];

const Tattoos = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-secondary/50 to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-primary font-medium text-sm tracking-wider uppercase mb-3">
              Tattoo Services
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-6">
              Art That Tells <span className="text-primary italic">Your Story</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Express yourself with beautiful, feminine tattoo designs. From delicate minimalist 
              pieces to larger custom artwork, we create tattoos that celebrate your individuality.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {tattooServices.map((service) => (
              <ServiceCard
                key={service.id}
                serviceId={service.id}
                category="tattoos"
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
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Consultation</h3>
                <p>We'll discuss your design ideas, placement, and size. Custom designs may require a consultation before the appointment to finalize artwork.</p>
              </div>
              <div className="bg-card p-6 rounded-xl">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Before Your Session</h3>
                <p>Get a good night's sleep and eat a proper meal before your appointment. Avoid alcohol and blood thinners 24 hours prior. Stay hydrated.</p>
              </div>
              <div className="bg-card p-6 rounded-xl">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Aftercare</h3>
                <p>Keep the tattoo clean and moisturized. Avoid sun exposure and swimming for 2-3 weeks. Follow the provided aftercare instructions carefully for best healing results.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Tattoos;
