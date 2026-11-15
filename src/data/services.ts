/**
 * Single source of truth for every service and price on the site.
 * Prices come from the official Simi Aesthetic price list.
 * Update a price here and it changes on the home page, the service pages
 * and the WhatsApp booking form at the same time.
 */
import lashClassicNatural from "@/assets/work/lash-classic-natural.jpg";
import lashHybridSmile from "@/assets/work/lash-hybrid-smile.jpg";
import lashVolumeGlam from "@/assets/work/lash-volume-glam.jpg";
import heroBurgundy from "@/assets/work/hero-burgundy.jpg";
import lashBrowsSoft from "@/assets/work/lash-brows-soft.jpg";
import studioFloral from "@/assets/work/studio-floral.jpg";
import studioCurls from "@/assets/work/studio-curls.jpg";
import lashWispySpikes from "@/assets/work/lash-wispy-spikes.jpg";
import lashMapping from "@/assets/work/lash-mapping-practice.jpg";
import lashApplication from "@/assets/work/lash-application.jpg";
import browsOmbre from "@/assets/work/brows-ombre.jpg";
import browsShading from "@/assets/work/brows-shading.jpg";
import tattooButterfly from "@/assets/work/tattoo-butterfly.jpg";
import tattooScriptBow from "@/assets/work/tattoo-script-bow.jpg";
import lashWispyGlam from "@/assets/work/lash-wispy-glam.jpg";
import lashCluster from "@/assets/lash-cluster.jpg";
import lashVolumeClose from "@/assets/lash-volume.jpg";
import lashWispyClose from "@/assets/lash-wispy.jpg";

export type ServiceCategoryId = "lashes" | "cluster" | "brows" | "tattoos";

export interface Service {
  id: string;
  name: string;
  /** Number in naira, used for display formatting. */
  amount: number;
  /** True when the price is a starting price ("From ₦…"). */
  from?: boolean;
  description: string;
  image: string;
  /** CSS object-position so faces / work stay in frame when cropped. */
  focus?: string;
}

export interface ServiceGroup {
  id: string;
  title: string;
  subtitle: string;
  category: ServiceCategoryId;
  note?: string;
  /** Add-ons are extras, so they're excluded from "From ₦…" starting prices. */
  addOn?: boolean;
  services: Service[];
}

export const formatNaira = (amount: number) => `₦${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
export const formatPrice = (s: Service) => `${s.from ? "From " : ""}${formatNaira(s.amount)}`;

export const serviceGroups: ServiceGroup[] = [
  {
    id: "normal-lash-sets",
    title: "Normal Lash Sets",
    subtitle: "Our signature full sets, applied lash by lash.",
    category: "lashes",
    services: [
      { id: "normal-classic", name: "Classic Set", amount: 13000, description: "Soft, natural everyday lashes — one extension per natural lash.", image: lashClassicNatural, focus: "50% 40%" },
      { id: "normal-hybrid", name: "Hybrid Set", amount: 17000, description: "A blend of classic and volume for a fuller yet natural finish.", image: lashHybridSmile, focus: "50% 40%" },
      { id: "normal-volume", name: "Volume Set", amount: 20000, description: "Full, fluffy lashes for a beautifully dense look.", image: lashVolumeGlam, focus: "50% 35%" },
      { id: "normal-mega", name: "Mega Volume", amount: 30000, description: "Ultra-dramatic, high-density lashes for maximum impact.", image: heroBurgundy, focus: "50% 30%" },
    ],
  },
  {
    id: "customized-lash-sets",
    title: "Customized Lash Sets",
    subtitle: "Custom-mapped to your eye shape and personal style.",
    category: "lashes",
    services: [
      { id: "custom-classic", name: "Classic Set", amount: 15000, description: "A tailored classic set mapped to flatter your eye shape.", image: lashBrowsSoft, focus: "50% 35%" },
      { id: "custom-hybrid", name: "Hybrid Set", amount: 25000, description: "Customized hybrid styling for a signature soft-glam look.", image: studioFloral, focus: "50% 35%" },
      { id: "custom-volume", name: "Volume Set", amount: 30000, description: "Hand-crafted volume fans designed around you.", image: studioCurls, focus: "50% 30%" },
      { id: "custom-mega", name: "Mega Volume", amount: 40000, description: "Our boldest custom set — maximum density, fully personalised.", image: lashWispySpikes, focus: "50% 35%" },
    ],
  },
  {
    id: "lash-add-ons",
    title: "Lash Add-ons",
    subtitle: "Finishing touches and aftercare for your set.",
    category: "lashes",
    addOn: true,
    services: [
      { id: "addon-under-eye", name: "Under Eye", amount: 5000, description: "Bottom-lash placement for a doll-eye finish.", image: lashMapping, focus: "50% 45%" },
      { id: "addon-wispy", name: "Wispy Effect", amount: 5000, description: "Textured spikes for a fluttery, editorial finish.", image: lashWispySpikes, focus: "50% 35%" },
      { id: "addon-removal", name: "Lash Removal", amount: 5000, description: "Safe, gentle professional removal of extensions.", image: lashApplication, focus: "50% 30%" },
    ],
  },
  {
    id: "cluster-lashes",
    title: "Cluster Lashes",
    subtitle: "Quick, lightweight cluster application — a beautiful look at a lighter price.",
    category: "cluster",
    services: [
      { id: "cluster-classic", name: "Classic Set", amount: 5000, description: "Soft, natural clusters for an easy everyday lift.", image: lashCluster, focus: "50% 40%" },
      { id: "cluster-hybrid", name: "Hybrid", amount: 9000, description: "A fuller, textured cluster look that still feels light.", image: lashWispyGlam, focus: "50% 35%" },
      { id: "cluster-volume", name: "Volume", amount: 13000, description: "Dense, fluffy clusters for a bold, glam finish.", image: lashVolumeClose, focus: "50% 40%" },
      { id: "cluster-mega", name: "Mega Volume", amount: 16000, description: "Our most dramatic cluster set for maximum impact.", image: lashWispyClose, focus: "50% 50%" },
    ],
  },
  {
    id: "brows",
    title: "Brows",
    subtitle: "Semi-permanent brows that frame your face beautifully.",
    category: "brows",
    services: [
      { id: "ombre-brows", name: "Ombré Brows", amount: 35000, description: "Soft, powdered gradient brows for a polished, defined look.", image: browsOmbre, focus: "50% 25%" },
      { id: "micro-shading", name: "Micro Shading", amount: 50000, description: "Fine stippled shading for fuller brows with a soft-makeup effect.", image: browsShading, focus: "50% 25%" },
      { id: "micro-blading", name: "Micro Blading", amount: 60000, description: "Hair-like strokes that recreate natural, fuller brows.", image: lashBrowsSoft, focus: "50% 25%" },
    ],
  },
  {
    id: "tattoo",
    title: "Tattoo",
    subtitle: "Delicate, feminine designs — from fine script to custom pieces.",
    category: "tattoos",
    note: "Tattoo prices vary depending on the size and design.",
    services: [
      { id: "small-tattoo", name: "Small Design", amount: 25000, from: true, description: "Minimal, fine-line pieces — perfect for wrists, ankles and first tattoos.", image: tattooButterfly, focus: "50% 55%" },
      { id: "big-tattoo", name: "Big Design", amount: 50000, from: true, description: "Larger custom artwork and script for arms, back, thighs and more.", image: tattooScriptBow, focus: "60% 40%" },
    ],
  },
];

export const allServices = serviceGroups.flatMap((g) =>
  g.services.map((s) => ({ ...s, group: g.title, category: g.category })),
);

export const findService = (id: string | null | undefined) =>
  id ? allServices.find((s) => s.id === id) : undefined;

export const groupsFor = (category: ServiceCategoryId) =>
  serviceGroups.filter((g) => g.category === category);

/** Lowest main-service price in a category (add-ons excluded). */
export const startingPrice = (category: ServiceCategoryId) =>
  Math.min(...groupsFor(category).filter((g) => !g.addOn).flatMap((g) => g.services.map((s) => s.amount)));

/** Display label used in the booking form and WhatsApp message. */
export const serviceLabel = (s: { name: string; group: string }) =>
  s.group === "Brows" ? s.name : `${s.name} (${s.group})`;
