"use client";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const items = [
  { name: "Colonoscopy", category: "Gastroenterology", status: "Published" },
  { name: "Knee Replacement", category: "Orthopedics", status: "Published" },
  { name: "MRI", category: "Radiology", status: "Published" },
  { name: "Cardiac Catheterization", category: "Cardiology", status: "Draft" },
];

export default function AdminProceduresPage() {
  return (
    <>
      <PageHero title="Manage Procedures" breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Procedures" }]} />
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold">{items.length} Procedures</h2><Button>+ Add Procedure</Button></div>
        <div className="space-y-3">{items.map((item) => (<Card key={item.name}><CardContent className="p-4 flex items-center justify-between"><div><h3 className="font-semibold">{item.name}</h3><p className="text-sm text-muted-foreground">{item.category}</p></div><div className="flex items-center gap-2"><Badge variant={item.status === "Published" ? "default" : "secondary"}>{item.status}</Badge><Button variant="outline" size="sm">Edit</Button></div></CardContent></Card>))}</div>
      </section>
    </>
  );
}
