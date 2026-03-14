"use client";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const items = [
  { name: "Diabetes — Type 2", articles: 3, status: "Published" },
  { name: "Hypertension", articles: 2, status: "Published" },
  { name: "Heart Failure", articles: 4, status: "Published" },
  { name: "Asthma", articles: 2, status: "Draft" },
  { name: "Chronic Kidney Disease", articles: 1, status: "Draft" },
];

export default function AdminConditionsPage() {
  return (
    <>
      <PageHero title="Manage Conditions" breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Conditions" }]} />
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold">{items.length} Conditions</h2><Button>+ Add Condition</Button></div>
        <div className="space-y-3">{items.map((item) => (<Card key={item.name}><CardContent className="p-4 flex items-center justify-between"><div><h3 className="font-semibold">{item.name}</h3><p className="text-sm text-muted-foreground">{item.articles} articles</p></div><div className="flex items-center gap-2"><Badge variant={item.status === "Published" ? "default" : "secondary"}>{item.status}</Badge><Button variant="outline" size="sm">Edit</Button></div></CardContent></Card>))}</div>
      </section>
    </>
  );
}
