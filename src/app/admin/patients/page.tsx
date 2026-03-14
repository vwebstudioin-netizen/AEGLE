"use client";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const patients = [
  { name: "John Doe", mrn: "MRN-001234", lastVisit: "Jan 25, 2025", status: "Active", provider: "Dr. Chen" },
  { name: "Mary Smith", mrn: "MRN-005678", lastVisit: "Jan 20, 2025", status: "Active", provider: "Dr. Brooks" },
  { name: "Robert Johnson", mrn: "MRN-009012", lastVisit: "Dec 15, 2024", status: "Inactive", provider: "Dr. Rodriguez" },
  { name: "Emma Davis", mrn: "MRN-003456", lastVisit: "Jan 22, 2025", status: "Active", provider: "Dr. Wilson" },
];

export default function AdminPatientsPage() {
  return (
    <>
      <PageHero title="Manage Patients" breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Patients" }]} />
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold">Patient Records</h2><Button>+ Register Patient</Button></div>
        <div className="space-y-3">{patients.map((p) => (<Card key={p.mrn}><CardContent className="p-4 flex items-center justify-between"><div><h3 className="font-semibold">{p.name}</h3><p className="text-sm text-muted-foreground">{p.mrn} • {p.provider} • Last visit: {p.lastVisit}</p></div><div className="flex items-center gap-2"><Badge variant={p.status === "Active" ? "default" : "secondary"}>{p.status}</Badge><Button variant="outline" size="sm">View</Button></div></CardContent></Card>))}</div>
      </section>
    </>
  );
}
