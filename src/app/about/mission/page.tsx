import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart, Star, HandHeart, Microscope, Leaf, Users, BookOpen, Sprout,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Mission, Vision & Values",
  description: "The mission, vision, and core values that guide AEGLE Skin Care Clinic in delivering world-class healthcare.",
};

const values: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: Heart, title: "Compassion", description: "We treat every patient with dignity, empathy, and respect, recognizing the whole person behind every condition." },
  { icon: Star, title: "Excellence", description: "We pursue the highest standards in clinical care, research, and education — striving for outcomes that set the benchmark." },
  { icon: HandHeart, title: "Integrity", description: "We operate with transparency, honesty, and ethical responsibility in every interaction." },
  { icon: Microscope, title: "Innovation", description: "We embrace cutting-edge technologies and novel approaches to continuously improve patient outcomes." },
  { icon: Leaf, title: "Equity", description: "We are committed to health equity, eliminating disparities, and ensuring access for all communities." },
  { icon: Users, title: "Collaboration", description: "We work as one team — across disciplines, departments, and campuses — to deliver coordinated care." },
  { icon: BookOpen, title: "Education", description: "We train the next generation of healthcare leaders through rigorous academic programs and mentorship." },
  { icon: Sprout, title: "Stewardship", description: "We responsibly manage our resources to sustain our mission for future generations." },
];

export default function MissionPage() {
  return (
    <>
      <PageHero
        title="Mission, Vision & Values"
        subtitle="The principles that guide everything we do."
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Mission & Values" },
        ]}
      />

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Image */}
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-muted">
            <Image
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200"
              alt="AEGLE skin care clinic"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>

          {/* Mission */}
          <div className="rounded-2xl border bg-card p-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To advance the health of the communities we serve through excellence in patient care, education, research, and community outreach — delivering compassionate, evidence-based medicine that honors the dignity of every individual.
            </p>
          </div>

          {/* Vision */}
          <div className="rounded-2xl border bg-primary/5 p-8">
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To be the leading premium skin care clinic chain in the region — recognized globally for clinical excellence, transformative research, and an unwavering commitment to the health and well-being of every patient and community member.
            </p>
          </div>

          {/* Values */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Our Core Values</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v) => (
                <Card key={v.title}>
                  <CardContent className="p-6 text-center">
                    <v.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold mb-2">{v.title}</h3>
                    <p className="text-sm text-muted-foreground">{v.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
