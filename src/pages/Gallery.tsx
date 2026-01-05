import { Layout } from "@/components/Layout";
import { useState } from "react";
// Lash images
import lashClassic from "@/assets/lash-classic-1.jpg";
import lashHybrid from "@/assets/lash-hybrid-1.jpg";
import lashVolume from "@/assets/lash-volume-1.jpg";
import lashMega from "@/assets/lash-mega-1.jpg";
// Tattoo images
import tattooSmall from "@/assets/tattoo-small-1.jpg";
import tattooBodyArt from "@/assets/tattoo-body-art-1.jpg";
import tattooScript from "@/assets/tattoo-script-1.jpg";
import tattooName from "@/assets/tattoo-name-1.jpg";
import tattooTribal from "@/assets/tattoo-tribal-1.jpg";
import tattooThigh from "@/assets/tattoo-thigh-1.jpg";

const categories = ["All", "Lashes", "Tattoos"];

const galleryItems = [
  // Lash work
  { image: lashVolume, category: "Lashes", title: "Volume Lash Extensions" },
  { image: lashMega, category: "Lashes", title: "Mega Volume Set" },
  { image: lashClassic, category: "Lashes", title: "Classic Lash Look" },
  { image: lashHybrid, category: "Lashes", title: "Hybrid Lash Set" },
  // Tattoo work
  { image: tattooSmall, category: "Tattoos", title: "'With Love' Script" },
  { image: tattooBodyArt, category: "Tattoos", title: "'Body of Art' Back Tattoo" },
  { image: tattooScript, category: "Tattoos", title: "Script Lettering Tattoo" },
  { image: tattooName, category: "Tattoos", title: "Custom Name Tattoo" },
  { image: tattooTribal, category: "Tattoos", title: "Tribal Back Design" },
  { image: tattooThigh, category: "Tattoos", title: "'With Love, Always' Thigh" },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-secondary/50 to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-primary font-medium text-sm tracking-wider uppercase mb-3">
              Our Portfolio
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-6">
              Our Work — <span className="text-primary italic">Real Beauty Transformations</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Browse through our portfolio of beautiful lash extensions and tattoo 
              work. See the artistry and attention to detail in every transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground shadow-elegant"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={index}
                className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-primary text-xs font-medium uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-white font-heading text-lg font-medium mt-1">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
