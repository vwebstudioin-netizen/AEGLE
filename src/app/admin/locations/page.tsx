"use client";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { locations } from "@/data/locations";

export default function AdminLocationsPage() {
  return (
    <>
      <PageHero title="Manage Locations" breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Locations" }]} />
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold">{locations.length} Locations</h2><Button>+ Add Location</Button></div>
        <div className="space-y-3">{locations.map((loc) => (<Card key={loc.slug}><CardContent className="p-4 flex items-center justify-between"><div><h3 className="font-semibold">{loc.name}</h3><p className="text-sm text-muted-foreground">{loc.address.street}, {loc.address.city}, {loc.address.state} {loc.address.zip}</p></div><div className="flex items-center gap-2"><Badge>{loc.erAvailable ? "ER Available" : "No ER"}</Badge><Button variant="outline" size="sm">Edit</Button></div></CardContent></Card>))}</div>
      </section>
    </>
  );
}
