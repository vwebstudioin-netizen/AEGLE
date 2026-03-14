"use client";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stories = [
  { title: "Sarah's Heart Journey", patient: "Sarah M.", condition: "Heart Failure", status: "Published" },
  { title: "Mark's Cancer Battle", patient: "Mark T.", condition: "Colorectal Cancer", status: "Published" },
  { title: "Lisa's Joint Replacement", patient: "Lisa R.", condition: "Osteoarthritis", status: "Draft" },
];

export default function AdminStoriesPage() {
  return (
    <>
      <PageHero title="Manage Patient Stories" breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Stories" }]} />
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold">{stories.length} Stories</h2><Button>+ Add Story</Button></div>
        <div className="space-y-3">{stories.map((s) => (<Card key={s.title}><CardContent className="p-4 flex items-center justify-between"><div><h3 className="font-semibold">{s.title}</h3><p className="text-sm text-muted-foreground">{s.patient} — {s.condition}</p></div><div className="flex items-center gap-2"><Badge variant={s.status === "Published" ? "default" : "secondary"}>{s.status}</Badge><Button variant="outline" size="sm">Edit</Button></div></CardContent></Card>))}</div>
      </section>
    </>
  );
}
