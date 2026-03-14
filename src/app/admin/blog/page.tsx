"use client";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const posts = [
  { title: "Advances in Robotic Surgery", author: "Dr. Sarah Chen", date: "Jan 15, 2025", status: "Published" },
  { title: "Heart Health Awareness Month", author: "Dr. Michael Brooks", date: "Feb 1, 2025", status: "Published" },
  { title: "New Cancer Treatment Options", author: "Dr. Emily Rodriguez", date: "Feb 10, 2025", status: "Draft" },
];

export default function AdminBlogPage() {
  return (
    <>
      <PageHero title="Manage Blog" breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Blog" }]} />
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold">{posts.length} Posts</h2><Button>+ New Post</Button></div>
        <div className="space-y-3">{posts.map((p) => (<Card key={p.title}><CardContent className="p-4 flex items-center justify-between"><div><h3 className="font-semibold">{p.title}</h3><p className="text-sm text-muted-foreground">{p.author} • {p.date}</p></div><div className="flex items-center gap-2"><Badge variant={p.status === "Published" ? "default" : "secondary"}>{p.status}</Badge><Button variant="outline" size="sm">Edit</Button></div></CardContent></Card>))}</div>
      </section>
    </>
  );
}
