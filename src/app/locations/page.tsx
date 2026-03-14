import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { locations } from "@/data/locations";
import { formatTime } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Locations",
  description: "Find AEGLE Skin Care Clinic locations near you — main campus, outpatient centers, and urgent care facilities.",
};

export default function LocationsPage() {
  return (
    <>
      <PageHero
        title="Our Locations"
        subtitle="Find a AEGLE Skin Care Clinic facility near you."
        breadcrumbs={[{ label: "Locations" }]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {locations.map((loc) => (
              <Link key={loc.id} href={`/locations/${loc.slug}`}>
                <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="grid sm:grid-cols-2">
                    <div className="h-48 sm:h-full overflow-hidden rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none">
                      <img
                        src={loc.image}
                        alt={loc.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground">
                          {loc.name}
                        </h3>
                        <Badge variant="secondary" className="text-xs capitalize">
                          {loc.type.replace(/-/g, " ")}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {loc.description}
                      </p>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>📍 {loc.address.street}, {loc.address.city}</p>
                        <p>📞 {loc.phone}</p>
                        {loc.erAvailable && (
                          <Badge variant="destructive" className="mt-2">
                            🚑 ER Available
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
