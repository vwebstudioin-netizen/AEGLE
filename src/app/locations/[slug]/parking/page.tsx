import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { getLocationBySlug } from "@/lib/get-locations";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const { locations } = await import("@/data/locations");
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const loc = await getLocationBySlug(slug);
  if (!loc) return { title: "Parking Not Found" };
  return { title: `${loc.name} — Parking & Transportation`, description: `Parking, shuttle, and transit info for ${loc.name}.` };
}

export default async function ParkingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loc = await getLocationBySlug(slug);
  if (!loc) notFound();

  const parkingLots = [
    { name: "Main Garage", spaces: "800+", rate: "First 2 hours free, then ₹50/hour", notes: "Covered parking, EV charging stations available" },
    { name: "Patient Lot A", spaces: "200", rate: "Free for patients with validation", notes: "Closest to main entrance, handicap spaces available" },
    { name: "Visitor Lot B", spaces: "300", rate: "₹100 flat rate", notes: "Open-air parking, 5-minute walk to entrance" },
    { name: "Employee Lot C", spaces: "500", rate: "Staff badge required", notes: "Shuttle service to main building" },
  ];

  const transport = [
    { mode: "Valet Service", detail: "Available at main entrance, Mon-Fri 7AM-7PM. ₹200 per vehicle." },
    { mode: "Clinic Shuttle", detail: "Free shuttle between campuses every 15 minutes, 6AM-10PM." },
    { mode: "Public Transit", detail: "Bus routes 12, 45, and 78 stop at clinic entrance. Metro station 500m away." },
    { mode: "Ride Share", detail: "Designated Uber/Ola pickup point at the main entrance circle." },
    { mode: "Bicycle Parking", detail: "Secure bike racks and repair station near the outpatient entrance." },
  ];

  return (
    <>
      <PageHero
        title={`${loc.name} — Parking & Transportation`}
        subtitle="Everything you need to know about getting to and parking at our campus."
        breadcrumbs={[
          { label: "Locations", href: "/locations" },
          { label: loc.name, href: `/locations/${slug}` },
          { label: "Parking" },
        ]}
      />

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto space-y-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Parking Options</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {parkingLots.map((lot) => (
                <Card key={lot.name}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg">{lot.name}</h3>
                    <p className="text-sm text-primary">{lot.spaces} spaces</p>
                    <p className="text-sm text-muted-foreground mt-2"><strong>Rate:</strong> {lot.rate}</p>
                    <p className="text-sm text-muted-foreground">{lot.notes}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Transportation Options</h2>
            <div className="space-y-3">
              {transport.map((t) => (
                <div key={t.mode} className="rounded-xl border bg-card p-5">
                  <h3 className="font-semibold">{t.mode}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
