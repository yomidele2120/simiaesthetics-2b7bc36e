import { ServicePage } from "@/components/ServicePage";
import heroImage from "@/assets/work/tattoo-script-bow.jpg";

const Tattoos = () => (
  <ServicePage
    category="tattoos"
    eyebrow="Tattoo Services"
    title={<>Art that tells <em className="text-primary">your story</em></>}
    intro="Feminine, fine-line tattoos — from delicate minimalist pieces to larger custom script and artwork that celebrates your individuality."
    heroImage={heroImage}
    heroFocus="60% 35%"
    expectations={[
      { title: "Consultation", text: "We'll discuss your design idea, placement and size. Custom designs may need a quick consultation to finalise the artwork and price." },
      { title: "Before your session", text: "Get a good night's sleep and eat a proper meal before your appointment. Avoid alcohol and blood thinners 24 hours prior. Stay hydrated." },
      { title: "Aftercare", text: "Keep the tattoo clean and moisturised. Avoid sun exposure and swimming for 2–3 weeks and follow the aftercare instructions for best healing." },
    ]}
  />
);

export default Tattoos;
