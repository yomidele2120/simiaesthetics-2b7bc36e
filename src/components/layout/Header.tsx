import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/config/business";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Lashes", path: "/lashes" },
  { name: "Cluster Lashes", path: "/cluster-lashes" },
  { name: "Brows", path: "/brows" },
  { name: "Tattoos", path: "/tattoos" },
  { name: "Gallery", path: "/gallery" },
  { name: "Reviews", path: "/reviews" },
  { name: "Contact", path: "/contact" },
];

export const Logo = ({ className = "" }: { className?: string }) => (
  <span className={`flex flex-col leading-none ${className}`}>
    <span className="font-heading text-[1.7rem] lg:text-[1.95rem] font-medium text-primary tracking-tight">Simi</span>
    <span className="text-[0.55rem] lg:text-[0.6rem] font-semibold tracking-[0.42em] text-accent -mt-0.5 pl-0.5">AESTHETIC</span>
  </span>
);

export const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes
  useEffect(() => setIsMenuOpen(false), [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isMenuOpen
          ? "bg-background/90 backdrop-blur-xl shadow-[0_1px_0_hsl(var(--border))]"
          : "bg-background/70 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" aria-label="Simi Aesthetic — home">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-[0.72rem] xl:text-[0.78rem] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 hover:text-primary ${
                    active ? "text-primary" : "text-foreground/70"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-2 left-1/2 h-px -translate-x-1/2 bg-accent transition-all duration-300 ${
                      active ? "w-5 !bg-foreground" : "w-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href={BUSINESS.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary transition-colors"
              aria-label="Simi Aesthetic on TikTok"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
              </svg>
            </a>
            <Button asChild variant="blush" size="default" className="px-6">
              <Link to="/booking">Book Now</Link>
            </Button>
          </div>

          {/* Mobile: Book + menu */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button asChild variant="blush" size="sm">
              <Link to="/booking">Book</Link>
            </Button>
            <button
              className="p-2 -mr-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-6 pt-2 border-t border-border/60 animate-fade-in">
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-heading text-2xl py-3 border-b border-border/40 transition-colors ${
                    location.pathname === link.path ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Button asChild variant="blush" size="lg" className="w-full mt-6">
                <Link to="/booking">Book an Appointment</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
