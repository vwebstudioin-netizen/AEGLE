import Link from "next/link";
import Image from "next/image";
import { SITE_NAME, CONTACT_PHONE } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: `Gallery — ${SITE_NAME}`,
  description: "View our clinic interiors, treatment results, before & after transformations, and happy client moments at AEGLE Skin Care Clinic.",
};

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600", alt: "Clinic Reception", category: "Clinic" },
  { src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600", alt: "Treatment Room", category: "Clinic" },
  { src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600", alt: "Skin Treatment Session", category: "Treatments" },
  { src: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600", alt: "Facial Treatment", category: "Treatments" },
  { src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600", alt: "Happy Client", category: "Results" },
  { src: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=600", alt: "Laser Procedure", category: "Treatments" },
  { src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600", alt: "Consultation", category: "Clinic" },
  { src: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600", alt: "Product Display", category: "Products" },
  { src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600", alt: "Skin Analysis", category: "Treatments" },
  { src: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600", alt: "Spa Ambience", category: "Clinic" },
  { src: "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=600", alt: "Before & After", category: "Results" },
  { src: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600", alt: "Premium Products", category: "Products" },
];

const categories = ["All", "Clinic", "Treatments", "Results", "Products"];

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="gradient-hero text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">Our Gallery</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Step inside AEGLE — explore our world-class clinic interiors, advanced treatment facilities, and real transformations.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {categories.map((cat) => (
              <span key={cat} className="px-4 py-2 rounded-full border border-border bg-card text-sm font-medium hover:bg-primary hover:text-white cursor-pointer transition-colors">
                {cat}
              </span>
            ))}
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryImages.map((img, i) => (
              <div key={i} className="relative group overflow-hidden rounded-xl break-inside-avoid">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div>
                    <span className="text-xs bg-primary/80 text-white px-2 py-1 rounded-full">{img.category}</span>
                    <p className="text-white font-semibold mt-1">{img.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Want to Experience AEGLE?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Book a visit to our clinic and see for yourself why thousands trust AEGLE for their skin care needs.
          </p>
          <Link href="/appointment">
            <Button size="lg" className="bg-primary text-white hover:bg-primary-dark px-8">
              Book a Visit
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
