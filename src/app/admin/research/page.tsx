"use client";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Active Trials", value: 5 },
  { label: "Publications (2024)", value: 6 },
  { label: "Research Faculty", value: 35 },
  { label: "Grant Funding", value: "$12.5M" },
];

export default function AdminResearchPage() {
  return (
    <>
      <PageHero title="Manage Research" breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Research" }]} />
      <section className="container mx-auto px-4 py-8 space-y-8">
        <div className="grid gap-4 sm:grid-cols-4">{stats.map((s) => (<Card key={s.label}><CardContent className="p-6 text-center"><p className="text-3xl font-bold text-primary">{s.value}</p><p className="text-sm text-muted-foreground">{s.label}</p></CardContent></Card>))}</div>
        <div className="flex gap-4"><Button>Manage Clinical Trials</Button><Button variant="outline">Manage Publications</Button><Button variant="outline">Manage Innovation</Button></div>
      </section>
    </>
  );
}
