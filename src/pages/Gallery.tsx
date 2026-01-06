import { Layout } from "@/components/Layout";
import { useState, useEffect, useCallback } from "react";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
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

interface GalleryItem {
  image?: string;
  video?: string;
  category: string;
  title: string;
  type: "image" | "video";
}

const galleryItems: GalleryItem[] = [
  // Lash work
  { image: lashVolume, category: "Lashes", title: "Volume Lash Extensions", type: "image" },
  { image: lashMega, category: "Lashes", title: "Mega Volume Set", type: "image" },
  { image: lashClassic, category: "Lashes", title: "Classic Lash Look", type: "image" },
  { image: lashHybrid, category: "Lashes", title: "Hybrid Lash Set", type: "image" },
  // Tattoo work - images
  { image: tattooSmall, category: "Tattoos", title: "'With Love' Script", type: "image" },
  { image: tattooBodyArt, category: "Tattoos", title: "'Body of Art' Back Tattoo", type: "image" },
  { image: tattooScript, category: "Tattoos", title: "Script Lettering Tattoo", type: "image" },
  { image: tattooName, category: "Tattoos", title: "Custom Name Tattoo", type: "image" },
  { image: tattooTribal, category: "Tattoos", title: "Tribal Back Design", type: "image" },
  { image: tattooThigh, category: "Tattoos", title: "'With Love, Always' Thigh", type: "image" },
  // Tattoo work - videos
  { video: "/videos/gallery-video-1.mp4", category: "Tattoos", title: "Tattoo Session", type: "video" },
  { video: "/videos/gallery-video-2.mp4", category: "Tattoos", title: "Tattoo Application", type: "video" },
  { video: "/videos/gallery-video-3.mp4", category: "Tattoos", title: "Studio Moments", type: "video" },
  { video: "/videos/gallery-video-4.mp4", category: "Tattoos", title: "Tattoo Transformation", type: "video" },
  { video: "/videos/gallery-video-5.mp4", category: "Tattoos", title: "Behind The Scenes", type: "video" },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredItems = activeCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  }, [filteredItems.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  }, [filteredItems.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, goToPrevious, goToNext]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [lightboxOpen]);

  const currentItem = filteredItems[currentIndex];

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
              Browse through our portfolio of beautiful lash extensions, tattoo 
              work, and videos. See the artistry and attention to detail in every transformation.
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
                onClick={() => openLightbox(index)}
                className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
              >
                {item.type === "video" ? (
                  <>
                    <video
                      src={item.video}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      muted
                      loop
                      playsInline
                      autoPlay
                    />
                    <div className="absolute top-4 right-4 w-10 h-10 bg-primary/80 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 text-primary-foreground fill-current" />
                    </div>
                  </>
                ) : (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
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

      {/* Lightbox */}
      {lightboxOpen && currentItem && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Content */}
          <div 
            className="max-w-5xl max-h-[85vh] w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {currentItem.type === "video" ? (
              <video
                src={currentItem.video}
                className="w-full h-full max-h-[85vh] object-contain rounded-lg"
                controls
                autoPlay
                loop
              />
            ) : (
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="w-full h-full max-h-[85vh] object-contain rounded-lg"
              />
            )}
            <div className="text-center mt-4">
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                {currentItem.category}
              </span>
              <h3 className="text-white font-heading text-xl font-medium mt-1">
                {currentItem.title}
              </h3>
              <p className="text-white/60 text-sm mt-2">
                {currentIndex + 1} / {filteredItems.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Gallery;