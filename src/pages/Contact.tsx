import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-14 pb-8 lg:pt-20 lg:pb-10 bg-gradient-to-b from-secondary/50 to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-primary font-medium text-sm tracking-wider uppercase mb-3">
              Get In Touch
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-4">
              Contact <span className="text-primary italic">Simi Aesthetic</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              Have questions or ready to book? Reach out through any of the channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="pb-16 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* 2x2 Grid of compact contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mb-10">
              <div className="bg-card p-5 rounded-2xl shadow-soft flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading text-base font-semibold text-foreground mb-1">Location</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Abule Egba, Off Ekoro Road, Command Bus Stop, Lagos, Nigeria
                  </p>
                </div>
              </div>

              <div className="bg-card p-5 rounded-2xl shadow-soft flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading text-base font-semibold text-foreground mb-1">Phone</h3>
                  <a href="tel:09152581489" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                    09152581489
                  </a>
                </div>
              </div>

              <div className="bg-card p-5 rounded-2xl shadow-soft flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading text-base font-semibold text-foreground mb-1">Email</h3>
                  <a href="mailto:Orunesajosimisola2020@gmail.com" className="text-muted-foreground text-sm hover:text-primary transition-colors break-all">
                    Orunesajosimisola2020@gmail.com
                  </a>
                </div>
              </div>

              <div className="bg-card p-5 rounded-2xl shadow-soft flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading text-base font-semibold text-foreground mb-1">Hours</h3>
                  <p className="text-muted-foreground text-sm">By Appointment Only</p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-primary/5 p-6 md:p-10 rounded-2xl">
              <div className="max-w-2xl mx-auto text-center">
                <h3 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-3">
                  Ready to Book?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Book directly through our website, or message us on WhatsApp for an instant response.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
                  <Link to="/booking" className="block">
                    <Button variant="blush" size="lg" className="w-full">
                      Book Appointment
                    </Button>
                  </Link>
                  <a
                    href="https://wa.me/2349152581489"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="whatsapp" size="lg" className="w-full">
                      WhatsApp
                    </Button>
                  </a>
                  <a href="tel:09152581489" className="block">
                    <Button variant="outline" size="lg" className="w-full">
                      <Phone className="w-4 h-4" />
                      Call
                    </Button>
                  </a>
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-3">Follow us on social media</p>
                  <a
                    href="https://tiktok.com/@simi_aesthetic_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                    </svg>
                    <span className="font-medium">@simi_aesthetic_</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
