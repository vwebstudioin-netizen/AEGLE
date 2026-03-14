"use client";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const trials = [
  { title: "CARDIAC-PRIME", pi: "Dr. Michael Brooks", status: "Recruiting", enrolled: 45, target: 100 },
  { title: "ONCO-IMMUNO-22", pi: "Dr. Emily Rodriguez", status: "Recruiting", enrolled: 22, target: 50 },
  { title: "NEURO-STIM", pi: "Dr. James Wilson", status: "Enrolling by invitation", enrolled: 8, target: 20 },
  { title: "PEDI-ECZEMA", pi: "Dr. Lisa Park", status: "Recruiting", enrolled: 30, target: 60 },
  { title: "ORTHO-REGEN", pi: "Dr. David Kim", status: "Active, not recruiting", enrolled: 40, target: 40 },
];

export default function AdminClinicalTrialsPage() {
  return (
    <>
      <PageHero title="Manage Clinical Trials" breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Clinical Trials" }]} />
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold">{trials.length} Trials</h2><Button>+ Add Trial</Button></div>
        <div className="space-y-3">{trials.map((t) => (<Card key={t.title}><CardContent className="p-4 flex items-center justify-between"><div><h3 className="font-semibold">{t.title}</h3><p className="text-sm text-muted-foreground">{t.pi} • {t.enrolled}/{t.target} enrolled</p></div><div className="flex items-center gap-2"><Badge variant={t.status === "Recruiting" ? "default" : "secondary"}>{t.status}</Badge><Button variant="outline" size="sm">Edit</Button></div></CardContent></Card>))}</div>
      </section>
    </>
  );
}
