"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const statements = [
  { id: "INV-2024-001234", date: "Dec 15, 2024", amount: 2500, paid: 2500, status: "paid", description: "Cardiology Follow-up" },
  { id: "INV-2024-001189", date: "Nov 20, 2024", amount: 8500, paid: 5000, status: "partial", description: "Orthopedic Consultation + X-Ray" },
  { id: "INV-2024-001050", date: "Oct 10, 2024", amount: 15000, paid: 15000, status: "paid", description: "Lab Work Panel" },
];

export default function PortalBillingPage() {
  const totalOwed = statements.reduce((sum, s) => sum + (s.amount - s.paid), 0);

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-primary text-white py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/portal/dashboard" className="text-white/80 hover:text-white text-sm">← Dashboard</Link>
            <h1 className="text-lg font-bold">Billing & Payments</h1>
          </div>
          <Link href="/billing">
            <Button size="sm" className="bg-white text-primary hover:bg-white/90">Pay a Bill</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {totalOwed > 0 && (
          <Card className="mb-6 border-yellow-300 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-800">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">Outstanding Balance</p>
                <p className="text-2xl font-bold text-primary">₹{totalOwed.toLocaleString()}</p>
              </div>
              <Link href="/billing">
                <Button>Pay Now</Button>
              </Link>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {statements.map((stmt) => (
            <Card key={stmt.id}>
              <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{stmt.description}</h3>
                    <Badge
                      variant={stmt.status === "paid" ? "success" : stmt.status === "partial" ? "warning" : "destructive"}
                      className="text-xs capitalize"
                    >
                      {stmt.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Invoice: {stmt.id} • {stmt.date}
                  </p>
                  <p className="text-sm">
                    Total: ₹{stmt.amount.toLocaleString()} • Paid: ₹{stmt.paid.toLocaleString()}
                    {stmt.amount - stmt.paid > 0 && (
                      <span className="text-destructive font-medium"> • Due: ₹{(stmt.amount - stmt.paid).toLocaleString()}</span>
                    )}
                  </p>
                </div>
                <Button size="sm" variant="outline">Download PDF</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
