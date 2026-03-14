// ── AEGLE — Goddess of Radiant Health & Beauty ──

export const SITE_NAME = "AEGLE";
export const SITE_TAGLINE = "Goddess of Radiant Health & Beauty";
export const SITE_DESCRIPTION =
  "AEGLE is a premium multi-chain skin care clinic offering advanced dermatological treatments, cosmetic procedures, and beauty care products for radiant, youthful skin. Daily skin care routines crafted by expert dermatologists.";

export const CONTACT_EMAIL = "info@aegleclinic.com";
export const CONTACT_PHONE = "8050507755";
export const WHATSAPP_NUMBER = "918050507755";
export const CLINIC_ADDRESS =
  "AEGLE Skin Care Clinic, Bangalore, Karnataka, India";

// ── Promo Configuration ──
export const PROMO_CONFIG = {
  enabled: true,
  bannerText: "Flat 10% OFF on all treatments — Book your consultation today!",
  discountPercent: 10,
  badgeText: "FLAT 10% OFF",
  ctaText: "Book Now",
  ctaHref: "/appointment",
};

interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string; icon?: string }[];
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About AEGLE", href: "/about" },
      { label: "Our Doctors", href: "/doctors" },
      { label: "Our Story", href: "/about" },
    ],
  },
  {
    label: "Treatments",
    href: "/treatments",
    children: [
      { label: "Skin Treatments", href: "/treatments/skin", icon: "skin" },
      { label: "Face Treatments", href: "/treatments/face", icon: "face" },
      { label: "Facials", href: "/treatments/facials", icon: "facials" },
      { label: "Hair Treatments", href: "/treatments/hair", icon: "hair" },
      { label: "Body Treatments", href: "/treatments/body", icon: "body" },
      { label: "Laser Treatments", href: "/treatments/lasers", icon: "lasers" },
      { label: "Plastic Surgery", href: "/treatments/plastic-surgery", icon: "surgery" },
      { label: "Cosmetic Dermatology", href: "/treatments/cosmetic-dermatology", icon: "dermatology" },
      { label: "Aesthetic & Therapeutic", href: "/treatments/aesthetic-therapeutic", icon: "aesthetic" },
    ],
  },
  {
    label: "Doctors",
    href: "/doctors",
  },
  {
    label: "Gallery",
    href: "/gallery",
  },
  {
    label: "Shop",
    href: "/shop",
  },
  {
    label: "Locations",
    href: "/locations",
  },
  {
    label: "More",
    href: "#",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "FAQs", href: "/faq" },
      { label: "Reviews", href: "/reviews" },
      { label: "Loyalty Program", href: "/loyalty" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const FOOTER_LINKS = {
  quickLinks: [
    { label: "About Us", href: "/about" },
    { label: "Our Doctors", href: "/doctors" },
    { label: "All Treatments", href: "/treatments" },
    { label: "Book Consultation", href: "/appointment" },
    { label: "Locations", href: "/locations" },
    { label: "Contact", href: "/contact" },
  ],
  treatments: [
    { label: "Skin Treatments", href: "/treatments/skin" },
    { label: "Face Treatments", href: "/treatments/face" },
    { label: "Facials", href: "/treatments/facials" },
    { label: "Hair Treatments", href: "/treatments/hair" },
    { label: "Body Treatments", href: "/treatments/body" },
    { label: "Laser Treatments", href: "/treatments/lasers" },
    { label: "Plastic Surgery", href: "/treatments/plastic-surgery" },
    { label: "Cosmetic Dermatology", href: "/treatments/cosmetic-dermatology" },
  ],
  moreLinks: [
    { label: "Shop Products", href: "/shop" },
    { label: "Gallery", href: "/gallery" },
    { label: "Reviews", href: "/reviews" },
    { label: "Loyalty Program", href: "/loyalty" },
    { label: "Blog", href: "/blog" },
    { label: "FAQs", href: "/faq" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund-policy" },
  ],
};

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/aegleclinic",
  instagram: "https://instagram.com/aegleclinic",
  twitter: "https://twitter.com/aegleclinic",
  youtube: "https://youtube.com/@aegleclinic",
  linkedin: "https://linkedin.com/company/aegle-clinic",
};

export const APPOINTMENT_STATUSES = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  confirmed: { label: "Confirmed", color: "bg-pink-100 text-pink-800" },
  completed: { label: "Completed", color: "bg-green-100 text-green-800" },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800" },
  "no-show": { label: "No Show", color: "bg-gray-100 text-gray-800" },
} as const;

export const BLOG_CATEGORIES = [
  "Skin Care Tips",
  "Anti-Aging",
  "Acne Treatment",
  "Hair Care",
  "Product Reviews",
  "Healthy Skin",
  "Beauty Trends",
  "Expert Advice",
  "Before & After",
  "Laser Treatments",
  "Bridal Beauty",
  "Wellness",
] as const;
