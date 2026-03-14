"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const quickLinks = [
  { label: "My Appointments", href: "/portal/appointments", icon: "📅", count: 2 },
  { label: "Test Results", href: "/portal/test-results", icon: "🔬", count: 3 },
  { label: "Medications", href: "/portal/medications", icon: "💊", count: 5 },
  { label: "Messages", href: "/portal/messages", icon: "✉️", count: 1 },
  { label: "Billing", href: "/portal/billing", icon: "💳", count: 0 },
  { label: "My Profile", href: "/portal/profile", icon: "👤", count: 0 },
];

export default function PortalDashboardPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-primary text-white py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">Patient Portal</h1>
            <p className="text-sm text-white/80">Welcome back, John</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-white/80 hover:text-white">
              ← Back to site
            </Link>
            <Link href="/portal">
              <Button size="sm" variant="outline" className="text-white border-white/30 hover:bg-white/10">
                Sign Out
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Upcoming Appointment Alert */}
        <Card className="mb-6 border-primary/30 bg-primary/5">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground">Upcoming Appointment</p>
              <p className="text-sm text-muted-foreground">
                Dr. Sarah Chen — Cardiology Follow-up — Jan 15, 2025 at 10:00 AM
              </p>
            </div>
            <Button size="sm" variant="outline">View Details</Button>
          </CardContent>
        </Card>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Card className="hover:shadow-md transition-all hover:-translate-y-1 h-full">
                <CardContent className="p-4 text-center relative">
                  <span className="text-3xl">{link.icon}</span>
                  <p className="text-sm font-medium mt-2">{link.label}</p>
                  {link.count > 0 && (
                    <Badge variant="destructive" className="absolute -top-1 -right-1 text-xs">
                      {link.count}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Test Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { test: "Complete Blood Count (CBC)", date: "Dec 20, 2024", status: "Normal" },
                { test: "Lipid Panel", date: "Dec 20, 2024", status: "Review" },
                { test: "HbA1c", date: "Dec 15, 2024", status: "Normal" },
              ].map((result) => (
                <div key={result.test} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium">{result.test}</p>
                    <p className="text-xs text-muted-foreground">{result.date}</p>
                  </div>
                  <Badge variant={result.status === "Normal" ? "success" : "warning"}>
                    {result.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Messages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { from: "Dr. Sarah Chen", subject: "Follow-up results review", date: "Dec 21, 2024", unread: true },
                { from: "Pharmacy", subject: "Prescription renewal reminder", date: "Dec 18, 2024", unread: false },
                { from: "Billing Dept", subject: "Statement available", date: "Dec 15, 2024", unread: false },
              ].map((msg) => (
                <div key={msg.subject} className="flex items-center justify-between text-sm">
                  <div>
                    <p className={`font-medium ${msg.unread ? "text-primary" : ""}`}>
                      {msg.unread && "● "}{msg.from}
                    </p>
                    <p className="text-xs text-muted-foreground">{msg.subject}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{msg.date}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
