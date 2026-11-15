// New portfolio photos
import heroBurgundy from "@/assets/work/hero-burgundy.jpg";
import studioCurls from "@/assets/work/studio-curls.jpg";
import studioFloral from "@/assets/work/studio-floral.jpg";
import lashVolumeGlam from "@/assets/work/lash-volume-glam.jpg";
import lashHybridSmile from "@/assets/work/lash-hybrid-smile.jpg";
import lashWispySpikes from "@/assets/work/lash-wispy-spikes.jpg";
import lashClassicNatural from "@/assets/work/lash-classic-natural.jpg";
import lashBrowsSoft from "@/assets/work/lash-brows-soft.jpg";
import lashMapping from "@/assets/work/lash-mapping-practice.jpg";
import lashApplication from "@/assets/work/lash-application.jpg";
import browsOmbre from "@/assets/work/brows-ombre.jpg";
import browsShading from "@/assets/work/brows-shading.jpg";
import tattooScriptBow from "@/assets/work/tattoo-script-bow.jpg";
import tattooButterfly from "@/assets/work/tattoo-butterfly.jpg";
import lashWispyGlam from "@/assets/work/lash-wispy-glam.jpg";
import stripLashBag from "@/assets/work/strip-lash-bag.jpg";
// Existing portfolio
import lashVolume from "@/assets/lash-volume.jpg";
import lashWispy from "@/assets/lash-wispy.jpg";
import tattooSmall from "@/assets/tattoo-small-1.jpg";
import tattooBodyArt from "@/assets/tattoo-body-art-1.jpg";
import tattooScript from "@/assets/tattoo-script-1.jpg";
import tattooName from "@/assets/tattoo-name-1.jpg";
import tattooTribal from "@/assets/tattoo-tribal-1.jpg";
import tattooThigh from "@/assets/tattoo-thigh-1.jpg";
import tattooNeck from "@/assets/tattoo-neck.jpg";
import tattooBodyNew from "@/assets/tattoo-body.jpg";
import tattooThighNew from "@/assets/tattoo-thigh-new.jpg";

export type GalleryCategory = "Lashes" | "Brows" | "Tattoos";

export interface GalleryItem {
  type: "image" | "video";
  src: string;
  poster?: string;
  title: string;
  category: GalleryCategory;
  /** Intrinsic size — keeps the true aspect ratio and prevents layout shift. */
  width: number;
  height: number;
}

const img = (src: string, title: string, category: GalleryCategory, width: number, height: number): GalleryItem => ({
  type: "image", src, title, category, width, height,
});
const vid = (src: string, title: string, category: GalleryCategory, width = 9, height = 16, poster?: string): GalleryItem => ({
  type: "video", src, title, category, width, height, poster,
});

export const galleryItems: GalleryItem[] = [
  // ——— New work ———
  img(lashWispyGlam, "Wispy Glam Lashes", "Lashes", 960, 1280),
  vid("/videos/lash-brow-glam.mp4", "Lashes & Brows Glam", "Lashes", 576, 1024, "/videos/lash-brow-glam-poster.jpg"),
  img(heroBurgundy, "Mega Volume Glam", "Lashes", 933, 1280),
  img(browsOmbre, "Ombré Brows", "Brows", 960, 1280),
  vid("/videos/lash-glam-reveal.mp4", "Lash Glam Reveal", "Lashes", 576, 1024, "/videos/lash-glam-reveal-poster.jpg"),
  img(tattooScriptBow, "Script & Bow Tattoo", "Tattoos", 720, 1280),
  img(studioCurls, "Volume Set in the Studio", "Lashes", 810, 1080),
  img(lashVolumeGlam, "Full Volume Set", "Lashes", 960, 1280),
  img(browsShading, "Micro Shaded Brows", "Brows", 960, 1280),
  img(lashHybridSmile, "Hybrid Set", "Lashes", 608, 1080),
  img(tattooButterfly, "Butterfly Ankle Tattoo", "Tattoos", 750, 1000),
  vid("/videos/tattoo-aftercare.mp4", "Fresh Script Tattoo", "Tattoos", 576, 1024, "/videos/tattoo-aftercare-poster.jpg"),
  vid("/videos/butterfly-tattoo.mp4", "Butterfly Thigh Tattoo", "Tattoos", 576, 1024, "/videos/butterfly-tattoo-poster.jpg"),
  img(stripLashBag, "Simi Aesthetic Strip Lash", "Lashes", 960, 1280),
  img(lashWispySpikes, "Wispy Spike Lashes", "Lashes", 608, 1080),
  img(studioFloral, "Customized Lash Set", "Lashes", 608, 1080),
  img(lashClassicNatural, "Natural Lash Set", "Lashes", 720, 1280),
  img(lashBrowsSoft, "Soft Lashes & Brows", "Brows", 720, 1280),
  img(lashMapping, "Lash Mapping & Under Eye", "Lashes", 960, 1280),
  img(lashApplication, "In the Chair — Lash Application", "Lashes", 589, 1208),

  // ——— Existing portfolio ———
  img(lashVolume, "Volume Close-Up", "Lashes", 736, 915),
  img(lashWispy, "Wispy Lashes", "Lashes", 820, 1080),
  img(tattooNeck, "'Beautiful Mind' Neck", "Tattoos", 706, 1080),
  img(tattooBodyNew, "Script Side Tattoo", "Tattoos", 812, 1080),
  img(tattooThighNew, "Thigh Script", "Tattoos", 1080, 942),
  img(tattooSmall, "'With Love' Script", "Tattoos", 750, 537),
  img(tattooBodyArt, "'Body of Art' Back Tattoo", "Tattoos", 736, 736),
  img(tattooScript, "Script Lettering Tattoo", "Tattoos", 736, 981),
  img(tattooName, "Custom Name Tattoo", "Tattoos", 1024, 1280),
  img(tattooTribal, "Tribal Back Design", "Tattoos", 960, 1280),
  img(tattooThigh, "'With Love, Always' Thigh", "Tattoos", 960, 1280),

  // Videos hosted on the previous (Lovable) asset store — kept as before
  vid("/__l5e/assets-v1/d4d08593-4acc-4eba-bb94-a57d11e6d77f/lash-video-1.mp4", "Lash Application", "Lashes"),
  vid("/__l5e/assets-v1/cd21c5f5-20dd-468e-95ad-4072e34b5383/lash-video-2.mp4", "Lash Reveal", "Lashes"),
  vid("/__l5e/assets-v1/289fad0f-21c5-4421-a5ce-2d304977640f/lash-video-3.mp4", "Lash Styling", "Lashes"),
  vid("/__l5e/assets-v1/60e3b22e-449c-4a20-a10e-3006a4a772d8/gallery-video-1.mp4", "Tattoo Session", "Tattoos"),
  vid("/__l5e/assets-v1/c560ed5c-efe8-4583-8a01-cc54bd69be2b/gallery-video-2.mp4", "Tattoo Application", "Tattoos"),
  vid("/__l5e/assets-v1/cf615daa-2838-41b3-a56f-73d74ac83d31/gallery-video-3.mp4", "Studio Moments", "Tattoos"),
  vid("/__l5e/assets-v1/ef39da3c-018b-4913-90e7-be3eb8ec2e93/gallery-video-4.mp4", "Tattoo Transformation", "Tattoos"),
  vid("/__l5e/assets-v1/75601d4f-098c-420a-984d-c339d6300e49/gallery-video-5.mp4", "Behind The Scenes", "Tattoos"),
];
