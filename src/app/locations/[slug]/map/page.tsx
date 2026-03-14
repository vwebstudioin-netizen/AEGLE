import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { locations } from "@/data/locations";

export async function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const loc = locations.find((l) => l.slug === slug);
  if (!loc) return { title: "Map Not Found" };
  return { title: `${loc.name} — Campus Map`, description: `Interactive campus map for ${loc.name}.` };
}

export default async function CampusMapPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loc = locations.find((l) => l.slug === slug);
  if (!loc) notFound();

  const buildings = [
    { name: "Main Entrance", floor: "Ground", description: "Reception, information desk, gift shop" },
    { name: "Emergency Department", floor: "Ground", description: "24/7 emergency and trauma services" },
    { name: "Outpatient Clinics", floor: "Floors 1-3", description: "Specialist clinics and consultation rooms" },
    { name: "Imaging Center", floor: "Ground", description: "CT, MRI, X-ray, and ultrasound" },
    { name: "Laboratory", floor: "Floor 1", description: "Blood draw, pathology, and testing" },
    { name: "Pharmacy", floor: "Ground", description: "Outpatient and inpatient pharmacy services" },
    { name: "Cafeteria", floor: "Ground", description: "Patient, visitor, and staff dining" },
    { name: "Parking Garage", floor: "Multi-level", description: "800+ spaces, valet available" },
  ];

  return (
    <>
      <PageHero
        title={`${loc.name} — Campus Map`}
        subtitle="Find your way around our campus with our interactive map and directory."
        breadcrumbs={[
          { label: "Locations", href: "/locations" },
          { label: loc.name, href: `/locations/${slug}` },
          { label: "Campus Map" },
        ]}
      />

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Placeholder map */}
          <div className="rounded-2xl border bg-muted/30 h-80 flex items-center justify-center mb-12">
            <div className="text-center text-muted-foreground">
              <p className="text-4xl mb-2">🗺️</p>
              <p className="font-medium">Interactive Campus Map</p>
              <p className="text-sm">In production, an interactive map (Google Maps / Mapbox) would appear here.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6">Building Directory</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {buildings.map((b) => (
              <div key={b.name} className="rounded-xl border bg-card p-5">
                <h3 className="font-semibold">{b.name}</h3>
                <p className="text-sm text-primary">{b.floor}</p>
                <p className="text-sm text-muted-foreground mt-1">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
