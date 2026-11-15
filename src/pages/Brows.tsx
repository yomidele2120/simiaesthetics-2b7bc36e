import { ServicePage } from "@/components/ServicePage";
import heroImage from "@/assets/work/brows-shading.jpg";

const Brows = () => (
  <ServicePage
    category="brows"
    eyebrow="Brow Services"
    title={<>Perfect brows, <em className="text-primary">every day</em></>}
    intro="Frame your face with beautifully shaped, defined brows. Choose soft ombré, fine micro shading or hair-like micro blading."
    heroImage={heroImage}
    heroFocus="50% 22%"
    expectations={[
      { title: "Ombré Brows", text: "A semi-permanent technique that creates a soft, powdered effect. Lasts 1–3 years depending on skin type and aftercare. A touch-up may be needed 6–8 weeks after the first session." },
      { title: "Micro Shading & Blading", text: "Both are semi-permanent. Shading gives a soft-makeup finish; blading creates hair-like strokes. We'll help you choose what suits your skin and style." },
      { title: "Aftercare", text: "Keep brows dry for 24–48 hours after treatment. Avoid touching or rubbing the area and apply aftercare products as directed by your artist." },
    ]}
  />
);

export default Brows;
