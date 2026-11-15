/**
 * Central business details for Simi Aesthetic.
 *
 * The WhatsApp number receives every booking request. To change it, either
 * edit DEFAULT_WHATSAPP_NUMBER below or set VITE_WHATSAPP_NUMBER in a .env
 * file / your Vercel project settings (international format, digits only,
 * no "+" — e.g. 2349152581489).
 */
const DEFAULT_WHATSAPP_NUMBER = "2349152581489";

const sanitize = (value: string) => value.replace(/\D/g, "");

export const BUSINESS = {
  name: "Simi Aesthetic",
  tagline: "Beauty is our Art, Perfection is our Promise.",
  whatsappNumber: sanitize(import.meta.env.VITE_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER),
  phoneDisplay: "09152581489",
  phoneHref: "tel:09152581489",
  email: "Orunesajosimisola2020@gmail.com",
  address: "Abule Egba, Off Ekoro Road, Command Bus Stop, Lagos",
  tiktok: "https://tiktok.com/@simi_aesthetic_",
} as const;
