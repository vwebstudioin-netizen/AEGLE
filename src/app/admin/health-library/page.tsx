"use client";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const sections = [
  { name: "Conditions", count: 20, published: 15, draft: 5 },
  { name: "Procedures", count: 18, published: 14, draft: 4 },
  { name: "Videos", count: 12, published: 12, draft: 0 },
  { name: "Drug Information", count: 10, published: 10, draft: 0 },
];

export default function AdminHealthLibraryPage() {
  return (
    <>
      <PageHero title="Manage Health Library" breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Health Library" }]} />
      <section className="container mx-auto px-4 py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{sections.map((s) => (<Card key={s.name}><CardContent className="p-6 text-center"><h3 className="font-bold text-lg">{s.name}</h3><p className="text-3xl font-bold text-primary mt-2">{s.count}</p><p className="text-sm text-muted-foreground">{s.published} published • {s.draft} draft</p><Button variant="outline" size="sm" className="mt-3">Manage</Button></CardContent></Card>))}</div>
      </section>
    </>
  );
}
