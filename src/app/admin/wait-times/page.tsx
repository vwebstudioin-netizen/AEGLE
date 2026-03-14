"use client";
import { useState, useEffect } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const locations = [
  { name: "Main Campus ER", current: 0, avgDaily: 150 },
  { name: "North Campus ER", current: 0, avgDaily: 80 },
  { name: "South Campus ER", current: 0, avgDaily: 60 },
];

export default function AdminWaitTimesPage() {
  const [data, setData] = useState(locations.map((l) => ({ ...l, current: Math.floor(Math.random() * 60) + 5 })));

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => prev.map((l) => ({ ...l, current: Math.max(5, l.current + Math.floor(Math.random() * 21) - 10) })));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <PageHero title="Manage Wait Times" breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Wait Times" }]} />
      <section className="container mx-auto px-4 py-8">
        <div className="grid gap-4 sm:grid-cols-3">{data.map((l) => (<Card key={l.name}><CardContent className="p-6"><h3 className="font-semibold">{l.name}</h3><div className="flex items-center gap-2 mt-3"><span className="text-3xl font-bold">{l.current} min</span><Badge className={l.current < 15 ? "bg-green-500" : l.current < 30 ? "bg-yellow-500" : "bg-red-500"}>{l.current < 15 ? "Low" : l.current < 30 ? "Moderate" : "High"}</Badge></div><p className="text-sm text-muted-foreground mt-2">Avg daily visits: {l.avgDaily}</p><Button variant="outline" size="sm" className="mt-3">Override</Button></CardContent></Card>))}</div>
      </section>
    </>
  );
}
