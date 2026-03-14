"use client";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const messages = [
  { from: "John Doe", subject: "Billing question", date: "Jan 25, 2025", status: "Unread", department: "Billing" },
  { from: "Mary Smith", subject: "Appointment request", date: "Jan 24, 2025", status: "Replied", department: "Scheduling" },
  { from: "Dr. Brooks", subject: "Staff meeting update", date: "Jan 23, 2025", status: "Read", department: "Internal" },
  { from: "Jane Wilson", subject: "Insurance coverage inquiry", date: "Jan 22, 2025", status: "Unread", department: "Billing" },
];

export default function AdminMessagesPage() {
  return (
    <>
      <PageHero title="Messages" breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Messages" }]} />
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold">{messages.filter((m) => m.status === "Unread").length} Unread Messages</h2><Button>Compose</Button></div>
        <div className="space-y-3">{messages.map((m, i) => (<Card key={i} className={m.status === "Unread" ? "border-primary/50" : ""}><CardContent className="p-4 flex items-center justify-between"><div><h3 className={`font-semibold ${m.status === "Unread" ? "text-primary" : ""}`}>{m.subject}</h3><p className="text-sm text-muted-foreground">{m.from} • {m.department} • {m.date}</p></div><div className="flex items-center gap-2"><Badge variant={m.status === "Unread" ? "default" : "secondary"}>{m.status}</Badge><Button variant="outline" size="sm">View</Button></div></CardContent></Card>))}</div>
      </section>
    </>
  );
}
