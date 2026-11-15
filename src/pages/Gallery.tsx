import { Layout } from "@/components/Layout";
import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { galleryItems, type GalleryItem } from "@/data/gallery";

const filters = ["All", "Lashes", "Brows", "Tattoos", "Videos"] as const;
type Filter = (typeof filters)[number];

const matches = (item: GalleryItem, f: Filter) =>
  f === "All" ? true : f === "Videos" ? item.type === "video" : item.category === f;

/** Video tile that only plays while on screen (saves data on mobile). */
const VideoTile = ({ item, onError }: { item: GalleryItem; onError: () => void }) => {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => undefined);
        else v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      src={item.src}
      poster={item.poster}
      muted
      loop
      playsInline
      preload="metadata"
      onError={onError}
      width={item.width}
      height={item.height}
      style={{ aspectRatio: `${item.width} / ${item.height}` }}
      className="block w-full h-auto object-cover bg-secondary transition-transform duration-700 group-hover:scale-[1.04]"
    />
  );
};

const Gallery = () => {
  const [active, setActive] = useState<Filter>("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Hide any video that fails to load (e.g. files only hosted on the old platform)
  const [broken, setBroken] = useState<Set<string>>(new Set());
  const markBroken = (src: string) => setBroken((prev) => new Set(prev).add(src));

  const filteredItems = galleryItems.filter((i) => !broken.has(i.src) && matches(i, active));

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);

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

  // Swipe navigation for phones
  const touchX = useRef<number | null>(null);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  const currentItem = filteredItems[currentIndex];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-14 lg:py-20 bg-[#f6f6f6]">
        <div className="container mx-auto px-5 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="eyebrow">Our Portfolio</span>
            <h1 className="mt-4 font-heading text-4xl sm:text-5xl lg:text-6xl font-medium text-foreground">
              Real beauty, <em className="text-primary">real results</em>
            </h1>
            <p className="mt-5 text-muted-foreground text-base sm:text-lg">
              Lash extensions, brows and tattoos from our studio in Abule Egba — tap any photo to view it full size.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 lg:top-20 z-30 bg-background/90 backdrop-blur-md border-b border-border/60">
        <div className="container mx-auto px-5 lg:px-8">
          <div className="scrollbar-hide -mx-5 px-5 flex gap-2 overflow-x-auto py-4 sm:justify-center">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                aria-pressed={active === f}
                className={`shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  active === f
                    ? "bg-foreground text-background"
                    : "bg-white border border-border text-foreground/70 hover:text-primary hover:border-primary/40"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry grid — keeps every photo's true aspect ratio */}
      <section className="py-10 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div key={active} className="columns-2 md:columns-3 xl:columns-4 gap-3 md:gap-5 animate-fade-in">
            {filteredItems.map((item, index) => (
              <button
                key={item.src}
                type="button"
                onClick={() => openLightbox(index)}
                className="group relative mb-3 md:mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-secondary text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={`Open ${item.title}`}
              >
                {item.type === "video" ? (
                  <>
                    <VideoTile item={item} onError={() => markBroken(item.src)} />
                    <span className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-soft">
                      <Play className="w-4 h-4 text-primary fill-current ml-0.5" />
                    </span>
                  </>
                ) : (
                  <img
                    src={item.src}
                    alt={item.title}
                    width={item.width}
                    height={item.height}
                    loading={index < 4 ? "eager" : "lazy"}
                    decoding="async"
                    className="block w-full h-auto transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                )}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 md:p-4 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/75">{item.category}</span>
                  <p className="text-white font-heading text-base md:text-lg leading-tight">{item.title}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-14 text-center">
            <p className="font-heading text-2xl sm:text-3xl text-foreground">Love what you see?</p>
            <Button asChild variant="hero" size="xl" className="mt-6">
              <Link to="/booking">Book Your Appointment</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && currentItem && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center animate-fade-in"
          onClick={closeLightbox}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) (dx > 0 ? goToPrevious : goToNext)();
            touchX.current = null;
          }}
          role="dialog"
          aria-modal="true"
          aria-label={currentItem.title}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          <figure className="flex flex-col items-center max-w-5xl w-full px-14" onClick={(e) => e.stopPropagation()}>
            {currentItem.type === "video" ? (
              <video
                key={currentItem.src}
                src={currentItem.src}
                poster={currentItem.poster}
                className="max-h-[78vh] w-auto max-w-full object-contain rounded-xl"
                controls
                autoPlay
                loop
                playsInline
              />
            ) : (
              <img
                key={currentItem.src}
                src={currentItem.src}
                alt={currentItem.title}
                className="max-h-[78vh] w-auto max-w-full object-contain rounded-xl animate-fade-in"
              />
            )}
            <figcaption className="text-center mt-4">
              <span className="text-white/60 text-xs font-semibold uppercase tracking-[0.2em]">
                {currentItem.category}
              </span>
              <p className="text-white font-heading text-xl mt-1">{currentItem.title}</p>
              <p className="text-white/50 text-sm mt-1">
                {currentIndex + 1} / {filteredItems.length}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </Layout>
  );
};

export default Gallery;
