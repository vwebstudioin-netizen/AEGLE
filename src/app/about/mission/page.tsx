import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Mission, Vision & Values",
  description: "The mission, vision, and core values that guide AEGLE Skin Care Clinic in delivering world-class healthcare.",
};

const values = [
  { icon: "❤️", title: "Compassion", description: "We treat every patient with dignity, empathy, and respect, recognizing the whole person behind every condition." },
  { icon: "🏆", title: "Excellence", description: "We pursue the highest standards in clinical care, research, and education — striving for outcomes that set the benchmark." },
  { icon: "🤝", title: "Integrity", description: "We operate with transparency, honesty, and ethical responsibility in every interaction." },
  { icon: "🔬", title: "Innovation", description: "We embrace cutting-edge technologies and novel approaches to continuously improve patient outcomes." },
  { icon: "🌍", title: "Equity", description: "We are committed to health equity, eliminating disparities, and ensuring access for all communities." },
  { icon: "👥", title: "Collaboration", description: "We work as one team — across disciplines, departments, and campuses — to deliver coordinated care." },
  { icon: "📚", title: "Education", description: "We train the next generation of healthcare leaders through rigorous academic programs and mentorship." },
  { icon: "🌱", title: "Stewardship", description: "We responsibly manage our resources to sustain our mission for future generations." },
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
                    <div className="text-4xl mb-3">{v.icon}</div>
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
