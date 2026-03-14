"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const results = [
  { id: "1", name: "Complete Blood Count (CBC)", date: "Dec 20, 2024", orderedBy: "Dr. Sarah Chen", status: "normal", items: [
    { test: "WBC", value: "6.8", unit: "10^3/µL", range: "4.5-11.0", flag: "normal" },
    { test: "RBC", value: "4.9", unit: "10^6/µL", range: "4.5-5.5", flag: "normal" },
    { test: "Hemoglobin", value: "14.2", unit: "g/dL", range: "13.5-17.5", flag: "normal" },
    { test: "Platelets", value: "250", unit: "10^3/µL", range: "150-400", flag: "normal" },
  ]},
  { id: "2", name: "Lipid Panel", date: "Dec 20, 2024", orderedBy: "Dr. Sarah Chen", status: "review", items: [
    { test: "Total Cholesterol", value: "215", unit: "mg/dL", range: "<200", flag: "high" },
    { test: "LDL", value: "138", unit: "mg/dL", range: "<100", flag: "high" },
    { test: "HDL", value: "52", unit: "mg/dL", range: ">40", flag: "normal" },
    { test: "Triglycerides", value: "125", unit: "mg/dL", range: "<150", flag: "normal" },
  ]},
  { id: "3", name: "HbA1c", date: "Dec 15, 2024", orderedBy: "Dr. Sarah Chen", status: "normal", items: [
    { test: "HbA1c", value: "5.4", unit: "%", range: "<5.7", flag: "normal" },
  ]},
];

export default function TestResultsPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-primary text-white py-4">
        <div className="container mx-auto px-4 flex items-center gap-4">
          <Link href="/portal/dashboard" className="text-white/80 hover:text-white text-sm">← Dashboard</Link>
          <h1 className="text-lg font-bold">Test Results</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
        {results.map((result) => (
          <Card key={result.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{result.name}</CardTitle>
                <Badge variant={result.status === "normal" ? "success" : "warning"} className="capitalize">
                  {result.status === "normal" ? "All Normal" : "Needs Review"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {result.date} • Ordered by {result.orderedBy}
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-2 font-medium">Test</th>
                      <th className="pb-2 font-medium">Result</th>
                      <th className="pb-2 font-medium">Reference Range</th>
                      <th className="pb-2 font-medium">Flag</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.items.map((item) => (
                      <tr key={item.test} className="border-b last:border-0">
                        <td className="py-2">{item.test}</td>
                        <td className={`py-2 font-medium ${item.flag === "high" ? "text-red-600" : item.flag === "low" ? "text-yellow-600" : ""}`}>
                          {item.value} {item.unit}
                        </td>
                        <td className="py-2 text-muted-foreground">{item.range}</td>
                        <td className="py-2">
                          {item.flag !== "normal" ? (
                            <Badge variant={item.flag === "high" ? "destructive" : "warning"} className="text-xs capitalize">{item.flag}</Badge>
                          ) : (
                            <span className="text-green-600 text-xs">✓</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
}
