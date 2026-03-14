import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Leadership",
  description: "Meet the leadership team guiding AEGLE Skin Care Clinic's mission of exceptional care.",
};

const leaders = [
  { name: "Dr. Robert Anderson", title: "President & CEO", bio: "Dr. Anderson brings 30 years of healthcare leadership. Under his tenure, AEGLE has expanded to 3 campuses and earned national recognition.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300" },
  { name: "Dr. Patricia Williams", title: "Chief Medical Officer", bio: "A distinguished surgeon and administrator, Dr. Williams oversees medical quality, patient safety, and physician engagement across all facilities.", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300" },
  { name: "Jennifer Martinez, RN, MSN", title: "Chief Nursing Officer", bio: "With 25 years in nursing, Jennifer champions Magnet-recognized nursing excellence and evidence-based practice.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300" },
  { name: "David Chen, MBA", title: "Chief Financial Officer", bio: "David ensures fiscal responsibility while investing in cutting-edge technology and community health programs.", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300" },
  { name: "Dr. Amara Johnson", title: "Chief Research Officer", bio: "Dr. Johnson leads our research enterprise with over $50M in active grants and 200+ ongoing clinical trials.", image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=300" },
  { name: "Michael Brown, JD", title: "General Counsel", bio: "Michael oversees legal compliance, risk management, and regulatory affairs across the health system.", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300" },
];

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        title="Our Leadership"
        subtitle="Dedicated leaders committed to excellence in patient care, education, and research."
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Leadership" },
        ]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leaders.map((leader) => (
              <Card key={leader.name} className="overflow-hidden">
                <div className="h-56 overflow-hidden">
                  <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-foreground">{leader.name}</h3>
                  <p className="text-sm text-primary mb-2">{leader.title}</p>
                  <p className="text-sm text-muted-foreground">{leader.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
