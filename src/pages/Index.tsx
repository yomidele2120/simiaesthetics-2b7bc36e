import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { PriceMenu } from "@/components/PriceMenu";
import { ReviewCard, useReviews } from "@/components/reviews/Reviews";
import { MapPin, Sparkles, Heart, Star, ArrowRight, CalendarHeart, Send, ListChecks } from "lucide-react";
import { BUSINESS } from "@/config/business";
import { startingPrice, formatNaira } from "@/data/services";
import { galleryItems } from "@/data/gallery";
import heroImage from "@/assets/work/studio-room.jpg";
import lashesCover from "@/assets/work/lash-volume-glam.jpg";
import browsCover from "@/assets/work/brows-ombre.jpg";
import tattoosCover from "@/assets/work/tattoo-script-bow.jpg";
import clusterCover from "@/assets/work/studio-floral.jpg";

const categories = [
  {
    title: "Lashes",
    blurb: "Classic, hybrid, volume & mega volume — normal or fully customized.",
    image: lashesCover,
    focus: "50% 30%",
    price: startingPrice("lashes"),
    link: "/lashes",
  },
  {
    title: "Cluster Lashes",
    blurb: "Quick, lightweight cluster sets — classic to mega volume.",
    image: clusterCover,
    focus: "50% 30%",
    price: startingPrice("cluster"),
    link: "/cluster-lashes",
  },
  {
    title: "Brows",
    blurb: "Ombré brows, micro shading & micro blading for effortless definition.",
    image: browsCover,
    focus: "50% 22%",
    price: startingPrice("brows"),
    link: "/brows",
  },
  {
    title: "Tattoos",
    blurb: "Delicate fine-line script and custom designs, small or big.",
    image: tattoosCover,
    focus: "60% 35%",
    price: startingPrice("tattoos"),
    link: "/tattoos",
  },
];

const features = [
  { icon: Sparkles, title: "Premium Quality", description: "Only the finest materials and techniques for your beauty treatments." },
  { icon: Heart, title: "Gentle Care", description: "Your comfort and safety is our top priority in every session." },
  { icon: Star, title: "Expert Artist", description: "Trained professional with years of experience in beauty enhancement." },
];

const steps = [
  { icon: ListChecks, title: "Choose your service", text: "Pick from lashes, clusters, brows or tattoos — prices shown upfront." },
  { icon: CalendarHeart, title: "Pick a date & time", text: "Tell us when suits you and add any notes." },
  { icon: Send, title: "Send on WhatsApp", text: "Your booking opens in WhatsApp, ready to send. We'll confirm it there." },
];

const previewItems = galleryItems.filter((i) => i.type === "image").slice(0, 8);

const Index = () => {
  const reviews = useReviews();
  return (
    <Layout>
      {/* ——— Hero ——— */}
      <section className="relative overflow-hidden bg-[#f6f6f6]">
        

        <div className="container relative mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-[1.05fr_1fr] items-center gap-10 lg:gap-16 pt-8 pb-16 lg:py-20">
            {/* Copy */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <span className="eyebrow justify-center lg:justify-start animate-fade-in">Lashes · Brows · Tattoos</span>
              <h1 className="mt-5 font-heading text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl font-medium text-foreground animate-slide-up">
                Beauty is our <em className="text-primary">Art</em>,
                <br className="hidden sm:block" /> Perfection is our{" "}
                <em className="text-primary">Promise</em>.
              </h1>
              <p
                className="mt-6 mx-auto lg:mx-0 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed animate-slide-up"
                style={{ animationDelay: "0.1s" }}
              >
                Premium lash extensions, semi-permanent brows and delicate tattoos in a calm,
                hygienic studio in Abule Egba, Lagos — designed to enhance your natural beauty.
              </p>
              <div
                className="mt-9 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start animate-slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                <Button asChild variant="hero" size="xl">
                  <Link to="/booking">Book Appointment</Link>
                </Button>
                <Button asChild variant="hero-outline" size="xl">
                  <a href="#prices">View Price List</a>
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-3 text-sm text-foreground/70">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" /> Abule Egba, Lagos
                </span>
                <span className="inline-flex items-center gap-2">
                  <Star className="w-4 h-4 text-foreground fill-foreground" /> Lashes from {formatNaira(startingPrice("lashes"))}
                </span>
              </div>
            </div>

            {/* Imagery */}
            <div className="order-1 lg:order-2 relative mx-auto w-full max-w-[15.5rem] sm:max-w-sm lg:max-w-[28rem] xl:max-w-[30rem] lg:mr-0">
              <div className="relative">
                {/* gold offset arch */}
                <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-5 sm:translate-y-5 rounded-t-full rounded-b-[2rem] border border-accent/70" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2rem] shadow-elegant bg-secondary">
                  <img
                    src={heroImage}
                    alt="Inside the Simi Aesthetic studio in Abule Egba, Lagos"
                    width={960}
                    height={1280}
                    className="h-full w-full object-cover object-[50%_45%] animate-fade-in"
                  />
                </div>
              </div>

              {/* floating location card */}
              <div className="absolute -bottom-6 -left-6 sm:-left-12 flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur py-3 pl-3 pr-5 shadow-soft border border-border/60 animate-slide-up" style={{ animationDelay: "0.35s" }}>
                <span className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </span>
                <div className="leading-tight">
                  <p className="font-heading text-base text-foreground">Visit our studio</p>
                  <p className="text-xs text-muted-foreground">Command Bus Stop, Abule Egba</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ——— Services ——— */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
            <span className="eyebrow">Our Services</span>
            <h2 className="section-title mt-4">Tailored treatments, beautifully done</h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {categories.map((c, i) => (
              <Reveal key={c.title} delay={i * 100}>
                <Link
                  to={c.link}
                  className="group relative block overflow-hidden rounded-3xl aspect-[4/5] sm:aspect-[3/4] bg-secondary shadow-soft"
                >
                  <img
                    src={c.image}
                    alt={`${c.title} by Simi Aesthetic`}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: c.focus }}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 text-white">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/75">From {formatNaira(c.price)}</p>
                    <h3 className="mt-2 font-heading text-3xl lg:text-[1.7rem] xl:text-3xl">{c.title}</h3>
                    <p className="mt-2 text-sm text-white/80 max-w-xs">{c.blurb}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                      Explore {c.title.toLowerCase()}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Price list ——— */}
      <section id="prices" className="scroll-mt-20 py-20 lg:py-28 bg-secondary/60">
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-10">
            <span className="eyebrow">Price List</span>
            <h2 className="section-title mt-4">Clear prices, no surprises</h2>
            <p className="mt-4 text-muted-foreground">
              Choose a category to see every service. Tap <strong className="text-foreground">Book</strong> on any
              service to send a booking request straight to our WhatsApp.
            </p>
          </Reveal>
          <div className="max-w-3xl mx-auto">
            <PriceMenu />
          </div>
        </div>
      </section>

      {/* ——— Gallery preview ——— */}
      <section id="gallery" className="py-20 lg:py-28">
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <span className="eyebrow">Our Portfolio</span>
              <h2 className="section-title mt-4">Real clients, real results</h2>
            </div>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
            >
              View full gallery <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>

          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-5 [&>*]:mb-3 sm:[&>*]:mb-5">
            {previewItems.map((item, i) => (
              <Reveal key={item.src} delay={(i % 4) * 80} className="break-inside-avoid">
                <Link to="/gallery" className="group relative block overflow-hidden rounded-2xl bg-secondary">
                  <img
                    src={item.src}
                    alt={item.title}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    decoding="async"
                    className="block w-full h-auto transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-white text-sm font-medium">{item.title}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Why Simi ——— */}
      <section className="py-20 lg:py-28 bg-[#0b0b0b] text-white">
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <span className="eyebrow">Why Simi Aesthetic</span>
            <h2 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-medium leading-[1.1]">
              Enhancing beauty, <em className="text-white/60">boosting confidence</em>
            </h2>
          </Reveal>

          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mb-14 py-8 border-y border-white/10">
            {[
              { v: "500+", l: "Happy Clients" },
              { v: "5★", l: "Rated Service" },
              { v: "3+", l: "Years of Artistry" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="font-heading text-3xl md:text-5xl text-white">{s.v}</div>
                <div className="text-xs md:text-sm text-white/60 mt-2 uppercase tracking-wider">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 100}>
                <div className="h-full rounded-3xl bg-white/[0.04] border border-white/10 p-8 text-center hover:bg-white/[0.07] transition-colors">
                  <div className="w-14 h-14 mx-auto mb-5 rounded-full border border-white/30 flex items-center justify-center">
                    <f.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading text-xl mb-2">{f.title}</h3>
                  <p className="text-white/65 text-sm leading-relaxed">{f.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Reviews ——— */}
      <section className="py-20 lg:py-28 bg-[#f6f6f6]">
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <span className="eyebrow">Client Reviews</span>
              <h2 className="section-title mt-4">What our clients say</h2>
            </div>
            <div className="flex gap-3">
              {reviews && reviews.length > 3 && (
                <Button asChild variant="outline">
                  <Link to="/reviews">All reviews</Link>
                </Button>
              )}
              <Button asChild variant="blush">
                <Link to="/reviews#write">Write a review</Link>
              </Button>
            </div>
          </Reveal>
          {reviews && reviews.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {reviews.slice(0, 3).map((r, i) => (
                <Reveal key={`${r.name}-${i}`} delay={i * 100}>
                  <ReviewCard review={r} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              Visited us recently? We'd love to hear about your experience —{" "}
              <Link to="/reviews#write" className="font-semibold text-foreground underline underline-offset-4">leave a review</Link>.
            </p>
          )}
        </div>
      </section>

      {/* ——— How booking works + location ——— */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal>
              <span className="eyebrow">Booking Made Easy</span>
              <h2 className="section-title mt-4">Book in under a minute</h2>
              <ol className="mt-10 space-y-7">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-5">
                    <div className="relative shrink-0 w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                      <s.icon className="w-5 h-5 text-primary" />
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-foreground text-background text-[0.65rem] font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-heading text-xl text-foreground">{s.title}</h3>
                      <p className="mt-1 text-muted-foreground text-sm leading-relaxed">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Button asChild variant="hero" size="xl" className="mt-10 w-full sm:w-auto">
                <Link to="/booking">Start Booking</Link>
              </Button>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-3xl bg-secondary/70 border border-border/60 p-8 sm:p-10">
                <div className="inline-flex items-center gap-2 text-primary">
                  <MapPin className="w-5 h-5" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em]">Visit Us</span>
                </div>
                <h3 className="mt-4 font-heading text-2xl sm:text-3xl text-foreground leading-snug">
                  {BUSINESS.address}
                </h3>
                <p className="mt-4 text-muted-foreground">
                  Come experience premium beauty services in our welcoming studio. Book ahead so we can
                  reserve your time.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Button asChild variant="blush" size="lg">
                    <a href={BUSINESS.phoneHref}>Call {BUSINESS.phoneDisplay}</a>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
