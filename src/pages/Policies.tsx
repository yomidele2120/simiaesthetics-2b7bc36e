import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const Policies = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-secondary/50 to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-6">
              Our <span className="text-primary italic">Policies</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Please review our policies before booking your appointment.
            </p>
          </div>
        </div>
      </section>

      {/* Policies Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-8">
            
            {/* Booking Terms */}
            <div className="bg-card p-8 rounded-2xl shadow-soft">
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                Booking Terms
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  All appointments must be booked in advance through our website or WhatsApp. 
                  Walk-ins are not guaranteed and depend on availability.
                </p>
                <p>
                  Payment is made by bank transfer when you book on our website — the account
                  details are shown on the booking page. Send your payment receipt with your booking
                  on WhatsApp, and we'll confirm your appointment there.
                </p>
                <p>
                  Please arrive on time for your appointment. Late arrivals may result in 
                  shortened service time or rescheduling.
                </p>
              </div>
            </div>

            {/* Rescheduling */}
            <div className="bg-card p-8 rounded-2xl shadow-soft">
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                Rescheduling Policy
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  If you need to reschedule, please contact us at least <strong>24 hours</strong> before 
                  your appointment time.
                </p>
                <p>
                  Rescheduling requests can be made via WhatsApp at 09152581489 or by email.
                </p>
                <p>
                  Last-minute cancellations or no-shows may result in a cancellation fee 
                  for future bookings.
                </p>
              </div>
            </div>

            {/* Refund Policy */}
            <div className="bg-card p-8 rounded-2xl shadow-soft">
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                Refund Policy
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>No refunds</strong> are available on completed services. We take pride 
                  in our work and ensure quality results.
                </p>
                <p>
                  If you experience any issues with your service, please contact us within 
                  48 hours. We will assess the situation and may offer a complimentary touch-up 
                  if necessary.
                </p>
                <p>
                  Deposits paid for appointments are non-refundable if cancelled within 24 hours 
                  of the scheduled appointment.
                </p>
              </div>
            </div>

            {/* Hygiene & Safety */}
            <div className="bg-card p-8 rounded-2xl shadow-soft">
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                Hygiene & Safety Commitment
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Your safety is our top priority. We maintain the highest standards of 
                  hygiene and cleanliness in our studio.
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>All tools are sanitized or single-use</li>
                  <li>Fresh, high-quality materials for every client</li>
                  <li>Clean and hygienic working environment</li>
                  <li>Proper disposal of single-use items</li>
                  <li>Regular cleaning and sanitization protocols</li>
                </ul>
                <p>
                  If you have any allergies or sensitivities, please inform us before your 
                  appointment so we can take appropriate precautions.
                </p>
              </div>
            </div>

            {/* Contact for Questions */}
            <div className="text-center pt-8">
              <p className="text-muted-foreground mb-6">
                Have questions about our policies? We're happy to help!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button variant="blush" size="lg">
                    Contact Us
                  </Button>
                </Link>
                <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg">
                    WhatsApp Us
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Policies;
