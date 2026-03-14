"use client";
import { useState } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const procedures = [
  { name: "Office Visit — New Patient", range: "$200 – $350" },
  { name: "Office Visit — Established Patient", range: "$100 – $250" },
  { name: "MRI (Brain, without contrast)", range: "$800 – $2,500" },
  { name: "CT Scan (Abdomen)", range: "$600 – $2,000" },
  { name: "X-Ray (Chest)", range: "$100 – $400" },
  { name: "Complete Blood Count (CBC)", range: "$30 – $100" },
  { name: "Colonoscopy", range: "$1,500 – $4,500" },
  { name: "Knee Replacement", range: "$25,000 – $55,000" },
  { name: "Cesarean Delivery", range: "$15,000 – $35,000" },
  { name: "Echocardiogram", range: "$500 – $1,500" },
];

export default function CostEstimatorPage() {
  const [search, setSearch] = useState("");
  const filtered = procedures.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <>
      <PageHero title="Cost Estimator" subtitle="Get an estimated cost range for common procedures and services." breadcrumbs={[{ label: "Billing", href: "/billing" }, { label: "Cost Estimator" }]} />
      <section className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="rounded-2xl border bg-amber-50 p-4 mb-8 dark:bg-amber-950/30"><p className="text-sm">These are <strong>estimated</strong> cost ranges. Actual costs depend on your insurance, facility, and clinical specifics. Contact our <a href="/patients-visitors/financial-counseling" className="text-primary hover:underline">Financial Counseling team</a> for a personalized estimate.</p></div>
        <Label>Search Procedure</Label>
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="e.g. MRI, X-Ray, Blood Count..." className="mb-6" />
        <div className="space-y-3">
          {filtered.map((p) => (
            <div key={p.name} className="flex items-center justify-between rounded-xl border bg-card p-4">
              <span className="font-medium">{p.name}</span>
              <span className="font-semibold text-primary whitespace-nowrap">{p.range}</span>
            </div>
          ))}
          {filtered.length === 0 && <p className="text-center text-muted-foreground py-8">No procedures match your search.</p>}
        </div>
        <div className="mt-8 text-center"><a href="/billing/financial-assistance"><Button variant="outline">Financial Assistance Options →</Button></a></div>
      </section>
    </>
  );
}
