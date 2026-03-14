"use client";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const records = [
  { title: "Annual Physical Exam", date: "2025-01-15", provider: "Dr. Sarah Chen", type: "Visit Summary" },
  { title: "Complete Blood Count (CBC)", date: "2025-01-15", provider: "Lab Services", type: "Lab Results" },
  { title: "Chest X-Ray", date: "2024-11-20", provider: "Radiology", type: "Imaging" },
  { title: "Cardiology Consultation", date: "2024-10-05", provider: "Dr. Michael Brooks", type: "Visit Summary" },
  { title: "Echocardiogram Report", date: "2024-10-05", provider: "Dr. Michael Brooks", type: "Imaging" },
  { title: "Lipid Panel", date: "2024-09-10", provider: "Lab Services", type: "Lab Results" },
  { title: "Immunization Records", date: "2024-08-01", provider: "Primary Care", type: "Immunizations" },
  { title: "Allergy Test Results", date: "2024-06-15", provider: "Dr. Emily Rodriguez", type: "Lab Results" },
];

function getTypeBadge(type: string) {
  const colors: Record<string, string> = { "Visit Summary": "bg-blue-100 text-blue-800", "Lab Results": "bg-green-100 text-green-800", "Imaging": "bg-pink-100 text-pink-800", "Immunizations": "bg-yellow-100 text-yellow-800" };
  return colors[type] || "";
}

export default function PortalRecordsPage() {
  return (
    <>
      <PageHero title="Medical Records" subtitle="View and download your health records." breadcrumbs={[{ label: "Portal", href: "/portal" }, { label: "Records" }]} />
      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="flex flex-wrap gap-3 mb-6">
          <Button variant="outline" size="sm">All</Button>
          <Button variant="ghost" size="sm">Visit Summaries</Button>
          <Button variant="ghost" size="sm">Lab Results</Button>
          <Button variant="ghost" size="sm">Imaging</Button>
          <Button variant="ghost" size="sm">Immunizations</Button>
        </div>
        <div className="space-y-3">
          {records.map((r, i) => (
            <Card key={i}><CardContent className="p-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2"><h3 className="font-semibold">{r.title}</h3><Badge className={getTypeBadge(r.type)}>{r.type}</Badge></div>
                <p className="text-sm text-muted-foreground mt-1">{r.provider} • {r.date}</p>
              </div>
              <Button variant="outline" size="sm">View</Button>
            </CardContent></Card>
          ))}
        </div>
        <div className="mt-8 text-center"><Button variant="outline">Request Full Medical Records</Button></div>
      </section>
    </>
  );
}
