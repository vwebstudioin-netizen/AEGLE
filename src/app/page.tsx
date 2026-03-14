import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { departments } from "@/data/departments";
import { doctors } from "@/data/doctors";
import { services } from "@/data/services";
import { SITE_NAME, SITE_TAGLINE, PROMO_CONFIG } from "@/lib/constants";
import { EmojiIcon } from "@/components/shared/EmojiIcon";
import {
  CalendarCheck, Sparkles, MapPin, ShoppingBag,
  Star, Phone, ArrowRight, Heart, Shield, Zap, Users,
  Eye, Scissors, Syringe, Flame, Droplets, ScanFace,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: `${SITE_NAME} | ${SITE_TAGLINE}`,
  description:
    "AEGLE — Premium multi-chain skin care clinic offering 97+ advanced treatments across skin, face, hair, body, and laser categories. Daily skin care routine for beautiful & youthful skin.",
};

export default function HomePage() {
  const treatmentCategories = departments.filter((d) => d.featured);
  const featuredDocs = doctors.filter((d) => d.featured);
  const featuredServices = services.filter((s) => s.featured).slice(0, 6);

  return (
    <>
      {/* ── Promo Banner ── */}
      {PROMO_CONFIG.enabled && (
        <div className="gradient-gold text-center py-2.5 px-4">
          <div className="container mx-auto flex items-center justify-center gap-3 text-sm font-semibold text-pink-900">
            <span>{PROMO_CONFIG.bannerText}</span>
            <Link href={PROMO_CONFIG.ctaHref}>
              <Button size="sm" className="bg-primary text-white hover:bg-primary-dark h-7 text-xs">
                {PROMO_CONFIG.ctaText}
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* ── Hero Section ── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1920&q=80"
          alt="Premium skin care treatment"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-white/15 text-white border-white/25 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Premium Skin Care Clinic
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
              Goddess of{" "}
              <span className="text-pink-300">Radiant Health</span>{" "}
              <span className="text-secondary">&</span>{" "}
              <span className="text-pink-300">Beauty</span>
            </h1>
            <p className="mt-6 text-lg text-white/85 max-w-xl leading-relaxed">
              Daily skin care routine for beautiful & youthful skin. AEGLE is your
              premium destination for advanced dermatological treatments, cosmetic
              procedures, and luxury skin care — crafted by expert dermatologists.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/appointment">
                <Button size="lg" className="bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30">
                  <CalendarCheck className="w-4 h-4 mr-2" /> Book Consultation
                </Button>
              </Link>
              <Link href="/treatments">
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 backdrop-blur-sm">
                  Explore Treatments <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/shop">
                <Button size="lg" variant="ghost" className="text-secondary hover:bg-secondary/10">
                  <ShoppingBag className="w-4 h-4 mr-2" /> Shop Products
                </Button>
              </Link>
            </div>
            {PROMO_CONFIG.enabled && (
              <div className="mt-5 inline-flex items-center gap-2 bg-secondary/20 border border-secondary/30 rounded-full px-4 py-1.5 text-sm font-semibold text-secondary backdrop-blur-sm">
                <Zap className="w-3.5 h-3.5" /> {PROMO_CONFIG.badgeText} on all treatments
              </div>
            )}
          </div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-8 right-8 hidden lg:flex flex-col gap-3">
          {[
            { value: "97+", label: "Treatments", icon: Sparkles },
            { value: "10K+", label: "Happy Clients", icon: Heart },
            { value: "15+", label: "Years", icon: Shield },
          ].map((s) => (
            <div key={s.label} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-5 py-3 text-white text-center min-w-[120px]">
              <s.icon className="w-4 h-4 mx-auto mb-1 text-secondary" />
              <div className="text-xl font-bold">{s.value}</div>
              <div className="text-xs text-white/70">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Quick Action Cards ── */}
      <section className="py-8 -mt-10 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: CalendarCheck, label: "Book Consultation", href: "/appointment", color: "text-primary" },
              { icon: Sparkles, label: "Find Treatment", href: "/treatments", color: "text-pink-500" },
              { icon: MapPin, label: "Our Locations", href: "/locations", color: "text-secondary" },
              { icon: ShoppingBag, label: "Shop Products", href: "/shop", color: "text-rose-500" },
            ].map((action) => (
              <Link key={action.label} href={action.href}>
                <Card className="text-center p-4 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer border-primary/10 hover:border-primary/30 bg-card/95 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <action.icon className={`w-7 h-7 mx-auto mb-2 ${action.color}`} />
                    <span className="text-sm font-medium text-foreground">
                      {action.label}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Treatment Categories (9 categories) ── */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Our Treatment Categories"
            subtitle="97+ advanced treatments across 9 specialized categories — each customized to your unique skin, hair, and body needs."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatmentCategories.map((dept) => (
              <Link key={dept.id} href={`/treatments/${dept.slug}`}>
                <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all group relative overflow-hidden">
                  {PROMO_CONFIG.enabled && (
                    <div className="promo-ribbon">{PROMO_CONFIG.badgeText}</div>
                  )}
                  <CardContent className="p-6">
                    <EmojiIcon emoji={dept.icon} className="w-8 h-8 text-primary mb-3" />
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {dept.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {dept.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {dept.stats.slice(0, 2).map((stat) => (
                        <Badge key={stat.label} variant="secondary" className="bg-primary/5 text-primary border-primary/10">
                          {stat.value} {stat.label}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/treatments">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5">
                View All Treatments →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Clinic Stats ── */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "97+", label: "Treatments", icon: Sparkles },
              { value: "10,000+", label: "Happy Clients", icon: Heart },
              { value: "3", label: "Clinic Locations", icon: MapPin },
              { value: "15+", label: "Years Experience", icon: Shield },
            ].map((stat) => (
              <div key={stat.label}>
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-white/60" />
                <div className="text-4xl lg:text-5xl font-bold mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                  {stat.value}
                </div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Doctors ── */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Meet Our Expert Dermatologists"
            subtitle="Board-certified specialists dedicated to your skin health and beauty."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {featuredDocs.map((doc) => (
              <Link key={doc.id} href={`/doctors/${doc.slug}`}>
                <Card className="text-center hover:shadow-xl hover:-translate-y-2 transition-all">
                  <CardContent className="p-8">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover mb-4 ring-4 ring-primary/20"
                    />
                    <h3 className="text-xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-playfair)' }}>
                      {doc.name}
                    </h3>
                    <p className="text-sm text-primary font-medium mt-1">{doc.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {doc.credentials.join(", ")}
                    </p>
                    <div className="flex items-center justify-center gap-1 mt-3">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{doc.rating}</span>
                      <span className="text-xs text-muted-foreground">
                        ({doc.reviewCount} reviews)
                      </span>
                    </div>
                    <p className="text-xs text-secondary mt-2 font-medium flex items-center justify-center gap-1">
                      <Phone className="w-3 h-3" /> {doc.phone}
                    </p>
                    <div className="flex flex-wrap gap-1 justify-center mt-3">
                      {doc.specialties.slice(0, 3).map((spec) => (
                        <Badge key={spec} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/doctors">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5">
                View All Doctors →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Treatments ── */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Popular Treatments"
            subtitle="Our most sought-after treatments for radiant, youthful skin."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <Link key={service.id} href={`/services/${service.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow group relative overflow-hidden">
                  {service.promoTag && (
                    <div className="promo-ribbon">{service.promoTag}</div>
                  )}
                  <CardContent className="p-6">
                    <EmojiIcon emoji={service.icon} className="w-7 h-7 text-primary mb-3" />
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {service.description}
                    </p>
                    <p className="text-xs text-secondary font-medium">
                      {service.priceRange || "Consultation Required"}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/services">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5">
                All Treatments →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Before & After / Gallery CTA ── */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-8 lg:p-12 text-white text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              See Real Results
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-6">
              Browse our gallery of before & after transformations. See the
              incredible results our clients have achieved with AEGLE treatments.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/gallery">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  View Gallery
                </Button>
              </Link>
              <Link href="/reviews">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Read Reviews
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Client Portal CTA ── */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              Your AEGLE Client Portal
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Track your treatments, view your skin journey, manage appointments,
              and access personalized skin care recommendations — all in one place.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/portal/login">
                <Button size="lg" className="bg-primary hover:bg-primary-dark">
                  Sign In to Portal
                </Button>
              </Link>
              <Link href="/portal/login">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-12 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <Mail className="w-8 h-8 mx-auto mb-3 text-primary" />
          <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
            Skin Care Tips & Updates
          </h2>
          <p className="text-muted-foreground mb-6">
            Subscribe to our newsletter for expert skin care tips, treatment updates,
            and exclusive offers from AEGLE.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-10 px-4 rounded-lg border border-border bg-background text-sm"
              required
            />
            <Button type="submit" className="bg-primary hover:bg-primary-dark">Subscribe</Button>
          </form>
        </div>
      </section>
    </>
  );
}
