"use client";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const events = [
  { title: "Heart Health Fair 2025", date: "Feb 22, 2025", registrations: 45, status: "Upcoming" },
  { title: "Cancer Survivors Gala", date: "Jun 14, 2025", registrations: 120, status: "Upcoming" },
  { title: "Community Blood Drive", date: "Mar 8, 2025", registrations: 30, status: "Upcoming" },
  { title: "Diabetes Awareness Walk", date: "Nov 14, 2024", registrations: 200, status: "Completed" },
];

export default function AdminEventsPage() {
  return (
    <>
      <PageHero title="Manage Events" breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Events" }]} />
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold">{events.length} Events</h2><Button>+ Create Event</Button></div>
        <div className="space-y-3">{events.map((e) => (<Card key={e.title}><CardContent className="p-4 flex items-center justify-between"><div><h3 className="font-semibold">{e.title}</h3><p className="text-sm text-muted-foreground">{e.date} • {e.registrations} registrations</p></div><div className="flex items-center gap-2"><Badge variant={e.status === "Upcoming" ? "default" : "secondary"}>{e.status}</Badge><Button variant="outline" size="sm">Edit</Button></div></CardContent></Card>))}</div>
      </section>
    </>
  );
}
