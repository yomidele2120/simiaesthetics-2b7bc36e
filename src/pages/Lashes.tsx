import { Layout } from "@/components/Layout";
import { ServiceCard } from "@/components/ServiceCard";
import lashClassic from "@/assets/lash-classic.jpg";
import lashHybrid from "@/assets/lash-hybrid.jpg";
import lashVolume from "@/assets/lash-volume.jpg";
import lashMega from "@/assets/lash-mega.jpg";
import lashWispy from "@/assets/lash-wispy.jpg";
import lashCustomized from "@/assets/lash-customized.jpg";
import lashCluster from "@/assets/lash-cluster.jpg";
import lashRefill from "@/assets/lash-refill.jpg";

type Service = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
};

const normalSet: Service[] = [
  { id: "normal-classic", name: "Classic", price: "₦13,000", description: "Natural, soft everyday lashes with one extension per natural lash.", image: lashClassic },
  { id: "normal-hybrid", name: "Hybrid", price: "₦17,000", description: "A blend of classic and volume for a fuller yet natural finish.", image: lashHybrid },
  { id: "normal-volume", name: "Volume", price: "₦23,000", description: "Full, fluffy lashes for a beautifully dense look.", image: lashVolume },
  { id: "normal-mega", name: "Mega Volume", price: "₦30,000", description: "Ultra dramatic, high-density lashes for maximum impact.", image: lashMega },
];

const customizedSet: Service[] = [
  { id: "custom-classic", name: "Classic", price: "₦15,000", description: "Custom-mapped classic set tailored to your eye shape.", image: lashClassic },
  { id: "custom-hybrid", name: "Hybrid", price: "₦25,000", description: "Customized hybrid styling for a signature soft-glam look.", image: lashCustomized },
  { id: "custom-volume", name: "Volume", price: "₦35,000", description: "Premium hand-crafted volume fans tailored to you.", image: lashVolume },
];

const clusterSet: Service[] = [
  { id: "cluster-classic", name: "Classic", price: "₦8,000", description: "Affordable cluster lashes for a quick classic look.", image: lashCluster },
  { id: "cluster-hybrid", name: "Hybrid", price: "₦12,000", description: "Cluster hybrid — fuller than classic, budget-friendly.", image: lashCluster },
  { id: "cluster-volume", name: "Volume", price: "₦15,000", description: "Voluminous cluster set for a bold statement.", image: lashVolume },
  { id: "cluster-mega", name: "Mega Volume", price: "₦20,000", description: "The most dramatic cluster lash option.", image: lashMega },
];

const extras: Service[] = [
  { id: "extra-refill", name: "Refill", price: "₦5,000", description: "Top-up service to maintain your existing lash set.", image: lashRefill },
  { id: "extra-under-eyes", name: "Under Eyes", price: "₦5,000", description: "Under-eye lash placement for a doll-eye effect.", image: lashWispy },
  { id: "extra-wispy", name: "Wispy", price: "₦5,000", description: "Wispy spikes add texture and a fluttery finish.", image: lashWispy },
  { id: "extra-removal", name: "Removal", price: "₦5,000", description: "Safe professional removal of your lash extensions.", image: lashRefill },
];

const Section = ({ title, subtitle, services }: { title: string; subtitle: string; services: Service[] }) => (
  <div className="mb-16 last:mb-0">
    <div className="mb-8 text-center">
      <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground">
        {title}
      </h2>
      <p className="text-muted-foreground mt-2">{subtitle}</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {services.map((service) => (
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
);

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
              Choose from our full range of lash services — from natural classic sets
              to bold mega volume, cluster options, and customized styling.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <Section title="Normal Set" subtitle="Our signature full sets — professionally applied, lash-by-lash." services={normalSet} />
          <Section title="Customized Set" subtitle="Tailored designs mapped to your eyes and style." services={customizedSet} />
          <Section title="Cluster Lash" subtitle="Beautiful, budget-friendly cluster application." services={clusterSet} />
          <Section title="Extras" subtitle="Add-ons and maintenance — all at ₦5,000." services={extras} />
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
