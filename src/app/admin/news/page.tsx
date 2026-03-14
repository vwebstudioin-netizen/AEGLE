"use client";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const articles = [
  { title: "New Cardiac Wing Opens", date: "Mar 1, 2025", category: "Expansion", status: "Published" },
  { title: "AEGLE Earns Top Safety Grade", date: "Feb 15, 2025", category: "Recognition", status: "Published" },
  { title: "Spring Volunteer Drive", date: "Mar 15, 2025", category: "Community", status: "Draft" },
];

export default function AdminNewsPage() {
  return (
    <>
      <PageHero title="Manage News" breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "News" }]} />
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold">{articles.length} Articles</h2><Button>+ New Article</Button></div>
        <div className="space-y-3">{articles.map((a) => (<Card key={a.title}><CardContent className="p-4 flex items-center justify-between"><div><h3 className="font-semibold">{a.title}</h3><p className="text-sm text-muted-foreground">{a.category} • {a.date}</p></div><div className="flex items-center gap-2"><Badge variant={a.status === "Published" ? "default" : "secondary"}>{a.status}</Badge><Button variant="outline" size="sm">Edit</Button></div></CardContent></Card>))}</div>
      </section>
    </>
  );
}
