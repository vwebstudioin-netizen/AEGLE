"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/FadeIn";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

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
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === "All" ? galleryImages : galleryImages.filter((img) => img.category === active);

  const openLightbox = (idx: number) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);

  const goPrev = useCallback(() => {
    if (lightbox === null) return;
    setLightbox((lightbox - 1 + filtered.length) % filtered.length);
  }, [lightbox, filtered.length]);

  const goNext = useCallback(() => {
    if (lightbox === null) return;
    setLightbox((lightbox + 1) % filtered.length);
  }, [lightbox, filtered.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, goPrev, goNext]);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1600&q=80"
          alt="Spa ambience"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40" />
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">Our Gallery</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Step inside AEGLE — explore our world-class clinic interiors, advanced treatment facilities, and real transformations.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Category filters */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  active === cat
                    ? "bg-primary text-white shadow-md"
                    : "border border-border bg-card hover:bg-primary/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((img, i) => (
              <FadeIn key={`${active}-${i}`} direction="up" delay={i * 60}>
                <div
                  className="relative group overflow-hidden rounded-xl break-inside-avoid cursor-pointer"
                  onClick={() => openLightbox(i)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div className="flex-1">
                      <span className="text-xs bg-primary/80 text-white px-2 py-1 rounded-full">{img.category}</span>
                      <p className="text-white font-semibold mt-1">{img.alt}</p>
                    </div>
                    <ZoomIn className="w-6 h-6 text-white/80" />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No images in this category.</p>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={closeLightbox}>
          <button onClick={closeLightbox} className="absolute top-4 right-4 text-white hover:text-primary transition-colors z-10">
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors z-10"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors z-10"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
          <div className="relative max-w-4xl max-h-[85vh] mx-auto" onClick={(e) => e.stopPropagation()}>
            <Image
              src={filtered[lightbox].src.replace("w=600", "w=1200")}
              alt={filtered[lightbox].alt}
              width={1200}
              height={800}
              className="object-contain max-h-[85vh] w-auto mx-auto rounded-lg"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg text-center">
              <span className="text-xs bg-primary/80 text-white px-2 py-1 rounded-full">{filtered[lightbox].category}</span>
              <p className="text-white font-semibold mt-1">{filtered[lightbox].alt}</p>
              <p className="text-white/60 text-xs mt-1">{lightbox + 1} / {filtered.length}</p>
            </div>
          </div>
        </div>
      )}

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
