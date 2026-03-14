"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pill } from "lucide-react";

const medications = [
  { name: "Lisinopril 10mg", dosage: "1 tablet daily", prescriber: "Dr. Sarah Chen", refills: 3, nextRefill: "Jan 10, 2025", status: "active" },
  { name: "Atorvastatin 20mg", dosage: "1 tablet at bedtime", prescriber: "Dr. Sarah Chen", refills: 5, nextRefill: "Feb 1, 2025", status: "active" },
  { name: "Metformin 500mg", dosage: "1 tablet twice daily", prescriber: "Dr. Sarah Chen", refills: 2, nextRefill: "Jan 5, 2025", status: "active" },
  { name: "Aspirin 81mg", dosage: "1 tablet daily", prescriber: "Dr. Sarah Chen", refills: 11, nextRefill: "Mar 1, 2025", status: "active" },
  { name: "Amoxicillin 500mg", dosage: "1 capsule three times daily", prescriber: "Dr. Lisa Park", refills: 0, nextRefill: "—", status: "completed" },
];

export default function MedicationsPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-primary text-white py-4">
        <div className="container mx-auto px-4 flex items-center gap-4">
          <Link href="/portal/dashboard" className="text-white/80 hover:text-white text-sm">← Dashboard</Link>
          <h1 className="text-lg font-bold">My Medications</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl space-y-4">
        {medications.map((med) => (
          <Card key={med.name}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Pill className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{med.name}</h3>
                  <Badge variant={med.status === "active" ? "success" : "secondary"} className="text-xs capitalize">{med.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{med.dosage}</p>
                <p className="text-xs text-muted-foreground">
                  Prescribed by {med.prescriber} • {med.refills} refills remaining • Next refill: {med.nextRefill}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="bg-muted/50">
          <CardContent className="p-4 text-center text-sm text-muted-foreground">
            <p>To request a medication refill, contact your doctor or pharmacy at{" "}
              <a href="tel:+15551005085" className="text-primary font-medium">8050507755</a>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
