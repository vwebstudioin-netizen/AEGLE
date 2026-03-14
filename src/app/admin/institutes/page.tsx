"use client";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const institutes = [
  { name: "Heart Institute", departments: 4, doctors: 18, status: "Active" },
  { name: "Cancer Center", departments: 6, doctors: 24, status: "Active" },
  { name: "Neuroscience Institute", departments: 3, doctors: 12, status: "Active" },
  { name: "Women & Children's Institute", departments: 5, doctors: 20, status: "Active" },
  { name: "Orthopedic & Sports Medicine Institute", departments: 3, doctors: 15, status: "Active" },
];

export default function AdminInstitutesPage() {
  return (
    <>
      <PageHero title="Manage Institutes" breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Institutes" }]} />
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold">{institutes.length} Institutes</h2><Button>+ Add Institute</Button></div>
        <div className="space-y-3">{institutes.map((inst) => (<Card key={inst.name}><CardContent className="p-4 flex items-center justify-between"><div><h3 className="font-semibold">{inst.name}</h3><p className="text-sm text-muted-foreground">{inst.departments} departments • {inst.doctors} doctors</p></div><div className="flex items-center gap-2"><Badge>{inst.status}</Badge><Button variant="outline" size="sm">Edit</Button></div></CardContent></Card>))}</div>
      </section>
    </>
  );
}
