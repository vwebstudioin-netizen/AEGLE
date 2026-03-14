"use client";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const patients = [
  { name: "Ahmed Al-Hassan", country: "UAE", status: "Active", department: "Cardiology", arrival: "Feb 1, 2025" },
  { name: "Maria Garcia", country: "Mexico", status: "Scheduled", department: "Oncology", arrival: "Feb 15, 2025" },
  { name: "Yuki Tanaka", country: "Japan", status: "Completed", department: "Orthopedics", arrival: "Jan 5, 2025" },
];

export default function AdminInternationalPage() {
  return (
    <>
      <PageHero title="Manage International Patients" breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "International" }]} />
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold">{patients.length} International Patients</h2><Button>+ Add Patient</Button></div>
        <div className="space-y-3">{patients.map((p) => (<Card key={p.name}><CardContent className="p-4 flex items-center justify-between"><div><h3 className="font-semibold">{p.name}</h3><p className="text-sm text-muted-foreground">{p.country} • {p.department} • Arrival: {p.arrival}</p></div><div className="flex items-center gap-2"><Badge variant={p.status === "Active" ? "default" : p.status === "Scheduled" ? "secondary" : "outline"}>{p.status}</Badge><Button variant="outline" size="sm">View</Button></div></CardContent></Card>))}</div>
      </section>
    </>
  );
}
