import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Awards & Recognition",
  description: "AEGLE Skin Care Clinic's national and international awards and recognitions.",
};

const awards = [
  { year: "2024", title: "Magnet Recognition for Nursing Excellence", org: "ANCC", category: "Nursing" },
  { year: "2024", title: "Best Skin Care Clinic", org: "US News & World Report", category: "Rankings" },
  { year: "2024", title: "Top 100 Clinics", org: "Healthgrades", category: "Rankings" },
  { year: "2024", title: "Grade A Clinic Safety", org: "Leapfrog Group", category: "Safety" },
  { year: "2023", title: "Excellence in Cardiac Care", org: "American Heart Association", category: "Specialty" },
  { year: "2023", title: "Comprehensive Stroke Center Certification", org: "The Joint Commission", category: "Specialty" },
  { year: "2023", title: "Client-Friendly Clinic Designation", org: "WHO/UNICEF", category: "Specialty" },
  { year: "2023", title: "LEED Gold Certification", org: "US Green Building Council", category: "Facility" },
  { year: "2022", title: "Top Aesthetic Clinic", org: "US News & World Report", category: "Education" },
  { year: "2022", title: "Community Benefit Award", org: "Indian Association of Dermatologists", category: "Community" },
];

export default function AwardsPage() {
  const categories = [...new Set(awards.map((a) => a.category))];

  return (
    <>
      <PageHero
        title="Awards & Recognition"
        subtitle="Nationally recognized for our commitment to quality, safety, and innovation."
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Awards" },
        ]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <Badge key={cat} variant="outline">{cat}</Badge>
            ))}
          </div>

          <div className="space-y-4">
            {awards.map((award) => (
              <Card key={`${award.year}-${award.title}`}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="text-center shrink-0 w-16">
                    <p className="text-2xl">🏆</p>
                    <p className="text-xs font-bold text-primary">{award.year}</p>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{award.title}</h3>
                    <p className="text-sm text-muted-foreground">{award.org}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs shrink-0">{award.category}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
