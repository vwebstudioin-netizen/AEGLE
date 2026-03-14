import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Quality & Safety",
  description: "AEGLE Skin Care Clinic's commitment to patient safety, quality metrics, and accreditations.",
};

const accreditations = [
  { org: "Joint Commission", status: "Gold Seal of Approval", year: "2024" },
  { org: "Magnet Recognition", status: "Nursing Excellence", year: "2023" },
  { org: "NABH", status: "Full Accreditation", year: "2024" },
  { org: "College of American Pathologists", status: "Accredited Lab", year: "2024" },
  { org: "DNV GL", status: "ISO 9001 Certified", year: "2023" },
];

const qualityMetrics = [
  { metric: "Patient Satisfaction", value: "96%", benchmark: "National avg: 72%" },
  { metric: "Clinic-Acquired Infection Rate", value: "0.3%", benchmark: "Below national avg" },
  { metric: "30-Day Readmission Rate", value: "8.2%", benchmark: "National avg: 15.2%" },
  { metric: "Surgical Safety Checklist Compliance", value: "99.8%", benchmark: "Target: 100%" },
  { metric: "Hand Hygiene Compliance", value: "98.5%", benchmark: "Target: 95%" },
  { metric: "Falls Prevention Rate", value: "99.2%", benchmark: "Top decile nationally" },
];

const safetyInitiatives = [
  { title: "Patient Safety Committee", description: "A multidisciplinary committee that reviews incidents, near-misses, and implements improvements." },
  { title: "Electronic Safety Reporting", description: "Staff can report safety concerns anonymously through our digital reporting system." },
  { title: "Medication Safety Program", description: "Bar-coded medication administration and smart pump technology to prevent medication errors." },
  { title: "Infection Prevention", description: "Dedicated infection preventionists monitor and reduce healthcare-associated infections." },
  { title: "Rapid Response Team", description: "24/7 critical care team that responds within minutes to deteriorating patients." },
  { title: "Patient & Family Advisory Council", description: "Patients and families advise on policies, procedures, and facility design." },
];

export default function QualityPage() {
  return (
    <>
      <PageHero
        title="Quality & Patient Safety"
        subtitle="Our commitment to providing the safest, highest-quality care, measured and transparent."
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Quality & Safety" },
        ]}
      />

      {/* Metrics */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8">Quality Metrics</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {qualityMetrics.map((m) => (
            <Card key={m.metric}>
              <CardContent className="p-6">
                <p className="text-3xl font-bold text-primary">{m.value}</p>
                <h3 className="mt-2 font-semibold">{m.metric}</h3>
                <p className="text-sm text-muted-foreground">{m.benchmark}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Accreditations */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Accreditations & Certifications</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {accreditations.map((a) => (
              <div key={a.org} className="flex items-center gap-4 rounded-xl border bg-card p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-xl">🏅</div>
                <div>
                  <h3 className="font-semibold">{a.org}</h3>
                  <p className="text-sm text-muted-foreground">{a.status}</p>
                  <Badge variant="secondary" className="mt-1">{a.year}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Initiatives */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8">Safety Initiatives</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {safetyInitiatives.map((s) => (
            <Card key={s.title}>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
