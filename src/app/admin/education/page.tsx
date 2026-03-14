"use client";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const programs = [
  { name: "Residency Programs", count: 6, applicants: 450 },
  { name: "Fellowship Programs", count: 6, applicants: 120 },
  { name: "CME Courses", count: 12, registrations: 340 },
  { name: "Student Programs", count: 6, applicants: 200 },
];

export default function AdminEducationPage() {
  return (
    <>
      <PageHero title="Manage Education" breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Education" }]} />
      <section className="container mx-auto px-4 py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{programs.map((p) => (<Card key={p.name}><CardContent className="p-6 text-center"><h3 className="font-bold">{p.name}</h3><p className="text-3xl font-bold text-primary mt-2">{p.count}</p><p className="text-sm text-muted-foreground">{p.applicants} applicants</p><Button variant="outline" size="sm" className="mt-3">Manage</Button></CardContent></Card>))}</div>
      </section>
    </>
  );
}
