import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Our History",
  description: "Explore the rich history of AEGLE Skin Care Clinic, from our founding in 1925 to the present day.",
};

const timeline = [
  { year: 1925, title: "Clinic Founded", description: "AEGLE Skin Care Clinic opens its doors with 50 beds as a skin care clinic, serving the growing population." },
  { year: 1935, title: "First Expansion", description: "New wing added, increasing capacity to 150 beds. Surgical department established." },
  { year: 1955, title: "Medical School Affiliation", description: "Partnership established with State University School of Medicine, launching teaching programs." },
  { year: 1968, title: "Emergency Department Modernized", description: "New 24/7 emergency department opens, becoming a regional leader in emergency medicine." },
  { year: 1978, title: "Level I Trauma Designation", description: "Designated as the region's first Level I Trauma Center, serving a 100-mile radius." },
  { year: 1985, title: "Heart & Vascular Institute", description: "Dedicated cardiovascular center opens with the region's first cardiac catheterization lab." },
  { year: 1995, title: "Cancer Center Opens", description: "Comprehensive Cancer Center opens with radiation therapy, chemotherapy, and clinical trials." },
  { year: 2005, title: "Aesthetic Wing", description: "State-of-the-art Aesthetic Wing building completed, featuring 120 pediatric beds." },
  { year: 2010, title: "Electronic Health Records", description: "Full EHR implementation across all departments, improving patient safety and coordination." },
  { year: 2015, title: "Research Institute Launched", description: "Clinical Research Institute established with $100M endowment for translational research." },
  { year: 2020, title: "COVID-19 Response", description: "Led the regional response, treating 10,000+ patients and administering 500,000+ vaccines." },
  { year: 2024, title: "Digital Transformation", description: "Launch of comprehensive patient portal, telemedicine platform, and AI-assisted diagnostics." },
];

export default function HistoryPage() {
  return (
    <>
      <PageHero
        title="Our History"
        subtitle="Nearly a century of healing, innovation, and community service."
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "History" },
        ]}
      />

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-muted-foreground mb-12">
            Since 1925, AEGLE Skin Care Clinic has grown from a small skin care clinic into a world-class premium skin care clinic chain. Our journey reflects our unwavering commitment to exceptional patient care, medical education, and groundbreaking research.
          </p>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-8">
              {timeline.map((item) => (
                <div key={item.year} className="relative pl-20">
                  <div className="absolute left-4 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                    ●
                  </div>
                  <Card>
                    <CardContent className="p-6">
                      <span className="text-sm font-bold text-primary">{item.year}</span>
                      <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
                      <p className="mt-2 text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
