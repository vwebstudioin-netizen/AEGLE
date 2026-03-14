"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const appointments = [
  { id: "1", doctor: "Dr. Sarah Chen", specialty: "Cardiology", date: "Jan 15, 2025", time: "10:00 AM", location: "Main Campus", status: "confirmed", type: "Follow-Up" },
  { id: "2", doctor: "Dr. Michael Kim", specialty: "Neurology", date: "Jan 28, 2025", time: "2:30 PM", location: "Main Campus", status: "pending", type: "New Consultation" },
  { id: "3", doctor: "Dr. Lisa Park", specialty: "Pediatrics", date: "Dec 5, 2024", time: "9:00 AM", location: "Westside Clinic", status: "completed", type: "Well Visit" },
  { id: "4", doctor: "Dr. James Rodriguez", specialty: "Orthopedics", date: "Nov 20, 2024", time: "11:30 AM", location: "Main Campus", status: "completed", type: "Follow-Up" },
];

const statusVariant = { confirmed: "success" as const, pending: "warning" as const, completed: "secondary" as const, cancelled: "destructive" as const };

export default function PortalAppointmentsPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-primary text-white py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/portal/dashboard" className="text-white/80 hover:text-white text-sm">← Dashboard</Link>
            <h1 className="text-lg font-bold">My Appointments</h1>
          </div>
          <Link href="/appointment">
            <Button size="sm" className="bg-white text-primary hover:bg-white/90">Book New</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl space-y-4">
        {appointments.map((apt) => (
          <Card key={apt.id}>
            <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{apt.doctor}</h3>
                  <Badge variant={statusVariant[apt.status as keyof typeof statusVariant]} className="text-xs capitalize">
                    {apt.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{apt.specialty} — {apt.type}</p>
                <p className="text-sm text-muted-foreground">📅 {apt.date} at {apt.time} | 📍 {apt.location}</p>
              </div>
              {apt.status !== "completed" && (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Reschedule</Button>
                  <Button size="sm" variant="outline" className="text-destructive">Cancel</Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
}
