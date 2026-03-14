"use client";
import { useState } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const programs = [
  { title: "Charity Care", desc: "Free or reduced-cost care for patients who qualify based on income." },
  { title: "Payment Plans", desc: "Interest-free monthly payment plans for qualifying balances." },
  { title: "Medicaid Assistance", desc: "We can help you apply for Medicaid or state health insurance." },
  { title: "Prescription Assistance", desc: "Pharmaceutical assistance programs for expensive medications." },
];

export default function FinancialAssistancePage() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
      <PageHero title="Financial Assistance" subtitle="We believe finances should never be a barrier to quality healthcare." breadcrumbs={[{ label: "Billing", href: "/billing" }, { label: "Financial Assistance" }]} />
      <section className="container mx-auto px-4 py-16 max-w-5xl space-y-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">Assistance Programs</h2>
          <div className="grid gap-4 sm:grid-cols-2">{programs.map((p) => (<Card key={p.title}><CardContent className="p-6"><h3 className="font-semibold mb-2">{p.title}</h3><p className="text-sm text-muted-foreground">{p.desc}</p></CardContent></Card>))}</div>
        </div>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Apply for Financial Assistance</h2>
          {submitted ? (
            <div className="rounded-2xl border bg-green-50 p-8 text-center"><p className="text-4xl mb-3">✅</p><h3 className="text-xl font-bold mb-2">Application Received</h3><p className="text-muted-foreground">Our financial counselors will review your application and contact you within 5 business days.</p></div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4 rounded-2xl border p-6">
              <div className="grid gap-4 sm:grid-cols-2"><div><Label>Full Name</Label><Input required /></div><div><Label>Date of Birth</Label><Input type="date" required /></div><div><Label>Phone</Label><Input type="tel" required /></div><div><Label>Email</Label><Input type="email" required /></div><div><Label>Household Size</Label><Input type="number" min="1" required /></div><div><Label>Annual Household Income</Label><Input type="number" required placeholder="$" /></div></div>
              <div><Label>Account Number (if available)</Label><Input placeholder="Optional" /></div>
              <Button type="submit" className="w-full">Submit Application</Button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
