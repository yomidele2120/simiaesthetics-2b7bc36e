import { ServicePage } from "@/components/ServicePage";
import heroImage from "@/assets/work/studio-curls.jpg";

const Lashes = () => (
  <ServicePage
    category="lashes"
    eyebrow="Lash Extensions"
    title={<>Beautiful lashes, <em className="text-primary">effortlessly</em></>}
    intro="From soft classic sets to bold mega volume — choose a normal set or a fully customized set mapped to your eye shape, then finish with an add-on."
    heroImage={heroImage}
    heroFocus="50% 30%"
    expectations={[
      { title: "Before your appointment", text: "Arrive with clean, makeup-free eyes. Avoid oil-based products around the eye area 24 hours before your appointment." },
      { title: "During the session", text: "Relax while your lash artist carefully applies each extension. Full sets take approximately 2 hours." },
      { title: "Aftercare", text: "Avoid getting lashes wet for 24 hours. Brush daily with a clean spoolie to keep your set looking fresh." },
    ]}
  />
);

export default Lashes;
