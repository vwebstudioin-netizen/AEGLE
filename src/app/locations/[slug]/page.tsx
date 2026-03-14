import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { locations } from "@/data/locations";
import { departments } from "@/data/departments";
import { formatTime } from "@/lib/utils";

export async function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loc = locations.find((l) => l.slug === slug);
  if (!loc) return {};
  return { title: loc.name, description: loc.description };
}

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loc = locations.find((l) => l.slug === slug);
  if (!loc) notFound();

  return (
    <>
      <PageHero
        title={loc.name}
        subtitle={loc.description}
        breadcrumbs={[
          { label: "Locations", href: "/locations" },
          { label: loc.name },
        ]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="rounded-xl overflow-hidden">
                <img src={loc.image} alt={loc.name} className="w-full h-64 object-cover" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Departments & Services</h2>
                <div className="flex flex-wrap gap-2">
                  {loc.departments.map((deptId) => {
                    const dept = departments.find((d) => d.id === deptId);
                    return dept ? (
                      <Link key={dept.id} href={`/departments/${dept.slug}`}>
                        <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-white transition-colors">
                          {dept.icon} {dept.name}
                        </Badge>
                      </Link>
                    ) : null;
                  })}
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {loc.services.map((s) => (
                    <Badge key={s} variant="outline">{s}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {loc.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 text-sm">
                      <span className="text-primary">✓</span> {a}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Accessibility</h2>
                <div className="flex flex-wrap gap-2">
                  {loc.accessibilityFeatures.map((f) => (
                    <Badge key={f} variant="outline">{f}</Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-3 text-sm">
                  <h3 className="font-semibold text-foreground">Contact & Address</h3>
                  <p>📍 {loc.address.street}<br/>{loc.address.city}, {loc.address.state} {loc.address.zip}</p>
                  <p>📞 {loc.phone}</p>
                  <p>✉️ {loc.email}</p>
                  {loc.fax && <p>📠 {loc.fax}</p>}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-sm">
                  <h3 className="font-semibold text-foreground mb-3">Hours</h3>
                  <div className="space-y-1">
                    {loc.hours.map((h) => (
                      <div key={h.day} className="flex justify-between">
                        <span className="text-muted-foreground">{h.day}</span>
                        <span className="font-medium">
                          {h.isClosed ? "Closed" : `${formatTime(h.open)} - ${formatTime(h.close)}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-sm">
                  <h3 className="font-semibold text-foreground mb-2">Parking</h3>
                  <p className="text-muted-foreground">{loc.parkingInfo}</p>
                  {loc.publicTransit && (
                    <>
                      <h3 className="font-semibold text-foreground mt-4 mb-2">Public Transit</h3>
                      <p className="text-muted-foreground">{loc.publicTransit}</p>
                    </>
                  )}
                </CardContent>
              </Card>

              <Link href="/appointment">
                <Button className="w-full">Book Appointment</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
