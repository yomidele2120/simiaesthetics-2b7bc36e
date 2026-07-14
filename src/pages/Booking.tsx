import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, User, Phone, Mail, MessageSquare, Check } from "lucide-react";

const serviceCategories = {
  lashes: {
    name: "Lash Extensions",
    services: [
      { id: "normal-classic", name: "Normal Set — Classic", price: "₦13,000" },
      { id: "normal-hybrid", name: "Normal Set — Hybrid", price: "₦17,000" },
      { id: "normal-volume", name: "Normal Set — Volume", price: "₦23,000" },
      { id: "normal-mega", name: "Normal Set — Mega Volume", price: "₦30,000" },
      { id: "custom-classic", name: "Customized — Classic", price: "₦15,000" },
      { id: "custom-hybrid", name: "Customized — Hybrid", price: "₦25,000" },
      { id: "custom-volume", name: "Customized — Volume", price: "₦35,000" },
      { id: "cluster-classic", name: "Cluster — Classic", price: "₦8,000" },
      { id: "cluster-hybrid", name: "Cluster — Hybrid", price: "₦12,000" },
      { id: "cluster-volume", name: "Cluster — Volume", price: "₦15,000" },
      { id: "cluster-mega", name: "Cluster — Mega Volume", price: "₦20,000" },
      { id: "extra-refill", name: "Extra — Refill", price: "₦5,000" },
      { id: "extra-under-eyes", name: "Extra — Under Eyes", price: "₦5,000" },
      { id: "extra-wispy", name: "Extra — Wispy", price: "₦5,000" },
      { id: "extra-removal", name: "Extra — Removal", price: "₦5,000" },
    ],
  },
  brows: {
    name: "Brows",
    services: [
      { id: "ombre-brows", name: "Ombré Brows", price: "₦40,000" },
      { id: "brow-tinting-lamination", name: "Brow Tinting & Lamination", price: "₦20,000" },
    ],
  },
  tattoos: {
    name: "Tattoos",
    services: [
      { id: "small-tattoo", name: "Small Tattoo", price: "₦15,000" },
      { id: "big-tattoo", name: "Big Tattoo", price: "₦25,000" },
    ],
  },
};

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

const Booking = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    category: "",
    service: "",
    date: "",
    time: "",
    fullName: "",
    phone: "",
    email: "",
    notes: "",
  });

  // Pre-fill from URL params
  useEffect(() => {
    const category = searchParams.get("category");
    const service = searchParams.get("service");
    if (category) {
      setFormData(prev => ({ ...prev, category }));
      if (service) {
        setFormData(prev => ({ ...prev, service }));
        setStep(2);
      }
    }
  }, [searchParams]);

  const selectedCategory = formData.category ? serviceCategories[formData.category as keyof typeof serviceCategories] : null;
  const selectedService = selectedCategory?.services.find(s => s.id === formData.service);

  const handleCategorySelect = (category: string) => {
    setFormData(prev => ({ ...prev, category, service: "" }));
  };

  const handleServiceSelect = (serviceId: string) => {
    setFormData(prev => ({ ...prev, service: serviceId }));
    setStep(2);
  };

  const handleDateTimeNext = () => {
    if (formData.date && formData.time) {
      setStep(3);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create mailto link with booking details
    const subject = encodeURIComponent(`Booking Request - ${selectedService?.name}`);
    const body = encodeURIComponent(`
BOOKING REQUEST - SIMI AESTHETIC

Service Category: ${selectedCategory?.name}
Service: ${selectedService?.name} (${selectedService?.price})

Preferred Date: ${formData.date}
Preferred Time: ${formData.time}

CLIENT DETAILS:
Name: ${formData.fullName}
Phone: ${formData.phone}
Email: ${formData.email}

Additional Notes:
${formData.notes || "None"}

---
This booking request was submitted through the Simi Aesthetic website.
    `);

    // Open email client
    window.location.href = `mailto:Orunesajosimisola2020@gmail.com?subject=${subject}&body=${body}`;

    // Show success after a brief delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Booking Request Sent!",
        description: "Please complete payment via WhatsApp after confirmation.",
      });
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-xl mx-auto text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-10 h-10 text-primary" />
              </div>
              <h1 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Booking Request Sent!
              </h1>
              <p className="text-muted-foreground mb-8">
                Thank you for your booking request. We'll confirm your appointment shortly 
                via WhatsApp or phone. Payment will be completed through WhatsApp after confirmation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://wa.me/2349152581489" target="_blank" rel="noopener noreferrer">
                  <Button variant="whatsapp" size="lg">
                    Message on WhatsApp
                  </Button>
                </a>
                <Button variant="outline" size="lg" onClick={() => {
                  setIsSubmitted(false);
                  setStep(1);
                  setFormData({
                    category: "",
                    service: "",
                    date: "",
                    time: "",
                    fullName: "",
                    phone: "",
                    email: "",
                    notes: "",
                  });
                }}>
                  Book Another Service
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 lg:py-16 bg-gradient-to-b from-secondary/50 to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Book Your <span className="text-primary italic">Appointment</span>
            </h1>
            <p className="text-muted-foreground">
              Select your desired service and preferred time. All booking payments will be 
              completed through WhatsApp after confirmation.
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            {[
              { num: 1, label: "Select Service" },
              { num: 2, label: "Date & Time" },
              { num: 3, label: "Your Details" },
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center gap-2 md:gap-4">
                <div className={`flex items-center gap-2 ${step >= s.num ? "text-primary" : "text-muted-foreground"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= s.num ? "bg-primary text-primary-foreground" : "bg-secondary"
                  }`}>
                    {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                  </div>
                  <span className="hidden md:block text-sm font-medium">{s.label}</span>
                </div>
                {idx < 2 && <div className={`w-8 md:w-16 h-0.5 ${step > s.num ? "bg-primary" : "bg-border"}`} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            
            {/* Step 1: Select Service */}
            {step === 1 && (
              <div className="animate-fade-in">
                <h2 className="font-heading text-2xl font-semibold text-foreground mb-6 text-center">
                  Choose Your Service
                </h2>

                {/* Category Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {Object.entries(serviceCategories).map(([key, cat]) => (
                    <button
                      key={key}
                      onClick={() => handleCategorySelect(key)}
                      className={`p-6 rounded-xl text-center transition-all duration-300 ${
                        formData.category === key
                          ? "bg-primary text-primary-foreground shadow-elegant"
                          : "bg-secondary hover:bg-secondary/80 text-foreground"
                      }`}
                    >
                      <span className="font-heading text-lg font-semibold">{cat.name}</span>
                    </button>
                  ))}
                </div>

                {/* Service Selection */}
                {selectedCategory && (
                  <div className="space-y-3">
                    <p className="text-muted-foreground text-sm mb-4">Select a specific service:</p>
                    {selectedCategory.services.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => handleServiceSelect(service.id)}
                        className={`w-full p-4 rounded-xl text-left flex items-center justify-between transition-all duration-300 ${
                          formData.service === service.id
                            ? "bg-primary/10 border-2 border-primary"
                            : "bg-card border border-border hover:border-primary/50"
                        }`}
                      >
                        <span className="font-medium text-foreground">{service.name}</span>
                        <span className="text-primary font-semibold">{service.price}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-2xl font-semibold text-foreground">
                    Select Date & Time
                  </h2>
                  <button onClick={() => setStep(1)} className="text-primary text-sm hover:underline">
                    Change Service
                  </button>
                </div>

                {/* Selected Service Summary */}
                <div className="bg-secondary/50 p-4 rounded-xl mb-8">
                  <p className="text-sm text-muted-foreground">Selected Service:</p>
                  <p className="font-heading text-lg font-semibold text-foreground">
                    {selectedService?.name} <span className="text-primary">({selectedService?.price})</span>
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Date Input */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      Preferred Date
                    </label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                      min={new Date().toISOString().split('T')[0]}
                      className="bg-card"
                    />
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                      <Clock className="w-4 h-4 text-primary" />
                      Preferred Time
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setFormData(prev => ({ ...prev, time }))}
                          className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                            formData.time === time
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-foreground hover:bg-secondary/80"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button 
                    variant="blush" 
                    size="lg" 
                    className="w-full mt-6"
                    onClick={handleDateTimeNext}
                    disabled={!formData.date || !formData.time}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Contact Details */}
            {step === 3 && (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-2xl font-semibold text-foreground">
                    Your Details
                  </h2>
                  <button onClick={() => setStep(2)} className="text-primary text-sm hover:underline">
                    Change Time
                  </button>
                </div>

                {/* Booking Summary */}
                <div className="bg-secondary/50 p-4 rounded-xl mb-8">
                  <p className="text-sm text-muted-foreground mb-2">Booking Summary:</p>
                  <p className="font-heading font-semibold text-foreground">
                    {selectedService?.name} <span className="text-primary">({selectedService?.price})</span>
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">
                    {formData.date} at {formData.time}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                      <User className="w-4 h-4 text-primary" />
                      Full Name
                    </label>
                    <Input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="Enter your full name"
                      required
                      className="bg-card"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                      <Phone className="w-4 h-4 text-primary" />
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter your phone number"
                      required
                      className="bg-card"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                      <Mail className="w-4 h-4 text-primary" />
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter your email address"
                      required
                      className="bg-card"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      Additional Notes (Optional)
                    </label>
                    <Textarea
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Any special requests or notes..."
                      rows={3}
                      className="bg-card"
                    />
                  </div>

                  {/* Payment Notice */}
                  <div className="bg-accent/10 border border-accent/20 p-4 rounded-xl">
                    <p className="text-sm text-foreground">
                      <strong>Payment Notice:</strong> All booking payments will be completed 
                      through WhatsApp after your appointment is confirmed. No card payment required.
                    </p>
                  </div>

                  <Button 
                    type="submit"
                    variant="booking" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Booking Request"}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Booking;
