import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-secondary/50 to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-primary font-medium text-sm tracking-wider uppercase mb-3">
              Get In Touch
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-6">
              Contact <span className="text-primary italic">Simi Aesthetic</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Have questions or ready to book? Reach out to us through any of the channels 
              below. We'd love to hear from you!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Cards */}
              <div className="space-y-6">
                <div className="bg-card p-6 rounded-2xl shadow-soft">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Location</h3>
                      <p className="text-muted-foreground">
                        15 Ekoro Road,<br />
                        Abule Egba, Lagos
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-6 rounded-2xl shadow-soft">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Phone</h3>
                      <a href="tel:09152581489" className="text-muted-foreground hover:text-primary transition-colors">
                        09152581489
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-6 rounded-2xl shadow-soft">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Email</h3>
                      <a href="mailto:Orunesajosimisola2020@gmail.com" className="text-muted-foreground hover:text-primary transition-colors break-all">
                        Orunesajosimisola2020@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-6 rounded-2xl shadow-soft">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Hours</h3>
                      <p className="text-muted-foreground">
                        By Appointment Only
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-primary/5 p-8 rounded-2xl flex flex-col justify-center">
                <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">
                  Ready to Book?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Choose the quickest way to reach us. Book directly through our website, 
                  or message us on WhatsApp for instant response.
                </p>
                <div className="space-y-4">
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
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      WhatsApp Us
                    </Button>
                  </a>
                  <a href="tel:09152581489" className="block">
                    <Button variant="outline" size="lg" className="w-full">
                      <Phone className="w-5 h-5" />
                      Call Now
                    </Button>
                  </a>
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4">Follow us on social media</p>
                  <a
                    href="https://tiktok.com/@simi_aesthetic_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                    </svg>
                    <span className="font-medium">@Simi_aesthetic</span>
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
