"use client";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const notifications = [
  { id: 1, title: "Appointment Reminder", message: "You have an appointment with Dr. Sarah Chen on January 28, 2025 at 10:00 AM.", time: "2 hours ago", read: false, type: "appointment" },
  { id: 2, title: "New Test Results Available", message: "Your Complete Blood Count (CBC) results are now available in your medical records.", time: "1 day ago", read: false, type: "results" },
  { id: 3, title: "Prescription Renewal", message: "Your prescription for Lisinopril has been renewed. You can pick it up at AEGLE Pharmacy.", time: "2 days ago", read: true, type: "medication" },
  { id: 4, title: "Bill Ready", message: "A new billing statement for $125.00 is available. View and pay online.", time: "3 days ago", read: true, type: "billing" },
  { id: 5, title: "Message from Dr. Brooks", message: "Dr. Brooks has sent you a message regarding your recent echocardiogram results.", time: "1 week ago", read: true, type: "message" },
  { id: 6, title: "Health Reminder", message: "It's time for your annual flu shot. Schedule your vaccination today.", time: "2 weeks ago", read: true, type: "health" },
];

function getTypeIcon(type: string) {
  const icons: Record<string, string> = { appointment: "📅", results: "🔬", medication: "💊", billing: "💳", message: "✉️", health: "❤️" };
  return icons[type] || "🔔";
}

export default function PortalNotificationsPage() {
  return (
    <>
      <PageHero title="Notifications" subtitle="Stay updated on your care, results, and appointments." breadcrumbs={[{ label: "Portal", href: "/portal" }, { label: "Notifications" }]} />
      <section className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="flex justify-between items-center mb-6"><p className="text-sm text-muted-foreground">{notifications.filter((n) => !n.read).length} unread</p><Button variant="ghost" size="sm">Mark all as read</Button></div>
        <div className="space-y-3">
          {notifications.map((n) => (
            <Card key={n.id} className={!n.read ? "border-primary/50 bg-primary/5" : ""}><CardContent className="p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{getTypeIcon(n.type)}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2"><h3 className="font-semibold">{n.title}</h3>{!n.read && <Badge className="bg-primary text-white text-xs">New</Badge>}</div>
                  <p className="text-sm text-muted-foreground mt-1">{n.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{n.time}</p>
                </div>
              </div>
            </CardContent></Card>
          ))}
        </div>
      </section>
    </>
  );
}
