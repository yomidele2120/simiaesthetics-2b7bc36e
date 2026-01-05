import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { MapPin, Sparkles, Heart, Star } from "lucide-react";
import heroImage from "@/assets/hero-beauty.jpg";
import lashVolume from "@/assets/lash-volume-1.jpg";
import lashClassic from "@/assets/lash-classic-1.jpg";
import tattooSmall from "@/assets/tattoo-small-1.jpg";

const services = [
  {
    title: "Lash Extensions",
    description: "From classic to mega volume, enhance your natural beauty with our premium lash services.",
    image: lashVolume,
    price: "From ₦13,000",
    link: "/lashes",
  },
  {
    title: "Brows",
    description: "Ombré brows, tinting & lamination for perfectly shaped, defined brows.",
    image: lashClassic,
    price: "From ₦20,000",
    link: "/brows",
  },
  {
    title: "Tattoos",
    description: "Delicate, feminine tattoo designs from small minimalist pieces to larger custom art.",
    image: tattooSmall,
    price: "From ₦15,000",
    link: "/tattoos",
  },
];

const features = [
  {
    icon: Sparkles,
    title: "Premium Quality",
    description: "Only the finest materials and techniques for your beauty treatments.",
  },
  {
    icon: Heart,
    title: "Gentle Care",
    description: "Your comfort and safety is our top priority in every session.",
  },
  {
    icon: Star,
    title: "Expert Artist",
    description: "Trained professional with years of experience in beauty enhancement.",
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Simi Aesthetic Beauty"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block text-primary font-medium text-sm tracking-wider uppercase mb-4 animate-fade-in">
              Welcome to Simi Aesthetic
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-6 animate-slide-up">
              Enhancing Your Beauty With A{" "}
              <span className="text-primary italic">Soft & Timeless</span> Touch
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Premium lash extensions, brows, and tattoo services in Lagos. 
              Experience luxury beauty care designed to enhance your natural elegance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Link to="/booking">
                <Button variant="hero" size="xl">
                  Book Appointment
                </Button>
              </Link>
              <a href="https://wa.me/2349152581489" target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="xl">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 lg:py-28 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block text-primary font-medium text-sm tracking-wider uppercase mb-3">
              Our Services
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Beauty Services Tailored For You
            </h2>
            <p className="text-muted-foreground">
              From lashes to brows to tattoos, discover our range of premium beauty treatments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link
                key={service.title}
                to={service.link}
                className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <span className="text-primary font-medium text-sm">{service.price}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/gallery">
              <Button variant="outline" size="lg">
                View Our Work
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block text-primary font-medium text-sm tracking-wider uppercase mb-3">
              Why Simi Aesthetic
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Experience The Difference
            </h2>
            <p className="text-muted-foreground">
              We're dedicated to providing you with the best beauty experience in a relaxing, hygienic environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="text-center p-8 rounded-2xl bg-secondary/30 hover:bg-secondary/50 transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location CTA */}
      <section className="py-20 lg:py-28 bg-primary/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-primary mb-6">
              <MapPin className="w-5 h-5" />
              <span className="font-medium">Visit Us</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
              15 Ekoro Road, Abule Egba
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Come experience premium beauty services in our welcoming studio. 
              Book your appointment today and let us enhance your natural beauty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking">
                <Button variant="blush" size="lg">
                  Book Appointment
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
