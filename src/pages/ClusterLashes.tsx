import { ServicePage } from "@/components/ServicePage";
import heroImage from "@/assets/work/studio-floral.jpg";

const ClusterLashes = () => (
  <ServicePage
    category="cluster"
    eyebrow="Cluster Lashes"
    title={<>Effortless glam, <em className="text-primary">in clusters</em></>}
    intro="A quicker, lighter alternative to lash extensions — choose from classic, hybrid, volume or mega volume clusters."
    heroImage={heroImage}
    heroFocus="50% 30%"
    expectations={[
      { title: "Before your appointment", text: "Arrive with clean, makeup-free eyes so the clusters bond properly." },
      { title: "During the session", text: "Cluster application is quicker than a full extension set — relax while your artist styles your look." },
      { title: "Aftercare", text: "Keep lashes dry for the first 24 hours, avoid oil-based products and brush gently with a clean spoolie." },
    ]}
  />
);

export default ClusterLashes;
