"use client";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const services = [
  { name: "Primary Care", category: "General", locations: 3, status: "Active" },
  { name: "Emergency Medicine", category: "Emergency", locations: 2, status: "Active" },
  { name: "Robotic Surgery", category: "Surgical", locations: 1, status: "Active" },
  { name: "Cardiac Rehabilitation", category: "Rehab", locations: 2, status: "Active" },
  { name: "Telemedicine", category: "Virtual", locations: 0, status: "Active" },
];

export default function AdminServicesPage() {
  return (
    <>
      <PageHero title="Manage Services" breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Services" }]} />
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold">{services.length} Services</h2><Button>+ Add Service</Button></div>
        <div className="space-y-3">{services.map((s) => (<Card key={s.name}><CardContent className="p-4 flex items-center justify-between"><div><h3 className="font-semibold">{s.name}</h3><p className="text-sm text-muted-foreground">{s.category} • {s.locations} locations</p></div><div className="flex items-center gap-2"><Badge>{s.status}</Badge><Button variant="outline" size="sm">Edit</Button></div></CardContent></Card>))}</div>
      </section>
    </>
  );
}
