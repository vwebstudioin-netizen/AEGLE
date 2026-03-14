"use client";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const jobs = [
  { title: "Registered Nurse — ICU", department: "Nursing", applicants: 23, status: "Active" },
  { title: "Cardiologist", department: "Cardiology", applicants: 8, status: "Active" },
  { title: "Medical Assistant", department: "Primary Care", applicants: 45, status: "Active" },
  { title: "Pharmacy Technician", department: "Pharmacy", applicants: 15, status: "Closed" },
];

export default function AdminCareersPage() {
  return (
    <>
      <PageHero title="Manage Careers" breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Careers" }]} />
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold">{jobs.length} Job Postings</h2><Button>+ Post Job</Button></div>
        <div className="space-y-3">{jobs.map((j) => (<Card key={j.title}><CardContent className="p-4 flex items-center justify-between"><div><h3 className="font-semibold">{j.title}</h3><p className="text-sm text-muted-foreground">{j.department} • {j.applicants} applicants</p></div><div className="flex items-center gap-2"><Badge variant={j.status === "Active" ? "default" : "secondary"}>{j.status}</Badge><Button variant="outline" size="sm">Edit</Button></div></CardContent></Card>))}</div>
      </section>
    </>
  );
}
