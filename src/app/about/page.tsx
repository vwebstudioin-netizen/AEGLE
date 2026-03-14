import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/SectionHeader";
import {
  Heart, Star, HandHeart, Microscope, Leaf, Users,
  Scroll, Target, ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about AEGLE Skin Care Clinic — our history, mission, leadership, awards, and commitment to world-class healthcare.",
};

const values: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: Heart, title: "Compassion", description: "We treat every patient with dignity, empathy, and respect." },
  { icon: Star, title: "Excellence", description: "We pursue the highest standards in clinical care, research, and education." },
  { icon: HandHeart, title: "Integrity", description: "We operate with transparency, honesty, and ethical responsibility." },
  { icon: Microscope, title: "Innovation", description: "We embrace new technologies and methods to improve patient outcomes." },
  { icon: Leaf, title: "Diversity", description: "We celebrate diversity and provide equitable care for all communities." },
  { icon: Users, title: "Teamwork", description: "We collaborate across disciplines to deliver the best possible care." },
];

const milestones = [
  { year: 1925, title: "Clinic Founded", description: "AEGLE Skin Care Clinic opens with 50 beds as a skin care clinic." },
  { year: 1955, title: "Medical School Affiliation", description: "Partnership established with State University School of Medicine." },
  { year: 1978, title: "Level I Trauma Designation", description: "Designated as the region's first Level I Trauma Center." },
  { year: 1995, title: "Cancer Center Opens", description: "Dedicated Cancer Center opens with comprehensive treatment facilities." },
  { year: 2005, title: "Aesthetic Wing", description: "State-of-the-art Aesthetic Wing building completed." },
  { year: 2015, title: "Research Institute", description: "Clinical Research Institute launched with $100M endowment." },
  { year: 2024, title: "Digital Transformation", description: "Launch of comprehensive patient portal and telemedicine platform." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About AEGLE Skin Care Clinic"
        subtitle="For nearly a century, we've been dedicated to providing exceptional healthcare to our community."
        breadcrumbs={[{ label: "About" }]}
      />

      {/* Mission */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                To advance health and hope by providing the highest quality care,
                educating the next generation of healthcare leaders, and pioneering
                research that transforms medicine.
              </p>
              <p className="text-muted-foreground mb-4">
                AEGLE Skin Care Clinic is an 800-bed premium skin care clinic chain and
                the region&apos;s only Level I Trauma Center. With over 500 physicians
                representing 30+ medical specialties, we provide comprehensive
                care for patients from across the nation.
              </p>
              <p className="text-muted-foreground">
                Our commitment to clinical excellence, innovative research, and
                medical education has earned us recognition as one of the top
                clinics in the country.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6 text-center">
                {[
                  { value: "98", label: "Years of Service" },
                  { value: "500+", label: "Physicians" },
                  { value: "#1", label: "Regional Ranking" },
                  { value: "50+", label: "Clinical Trials" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl font-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Our Core Values"
            subtitle="The principles that guide everything we do."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <Card key={value.title}>
                <CardContent className="p-6 text-center">
                  <value.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Our History"
            subtitle="Nearly a century of medical excellence."
          />
          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, i) => (
              <div key={milestone.year} className="flex gap-6 mb-8">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shrink-0">
                    {milestone.year}
                  </div>
                  {i < milestones.length - 1 && (
                    <div className="w-0.5 flex-1 bg-border mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="font-semibold text-foreground">
                    {milestone.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About sub-pages links */}
      <section className="py-12 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: "Leadership", href: "/about/leadership", icon: Users },
              { label: "History", href: "/about/history", icon: Scroll },
              { label: "Awards", href: "/about/awards", icon: Star },
              { label: "Mission & Values", href: "/about/mission", icon: Target },
              { label: "Quality & Safety", href: "/about/quality", icon: ShieldCheck },
              { label: "Community", href: "/about/community", icon: Leaf },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <Card className="text-center p-4 hover:shadow-md transition-shadow h-full">
                  <CardContent className="p-0">
                    <item.icon className="w-6 h-6 mx-auto mb-1 text-primary" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
