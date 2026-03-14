"use client";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const reviews = [
  { patient: "Sarah M.", doctor: "Dr. Chen", rating: 5, comment: "Exceptional care and attention. Truly compassionate.", date: "Jan 20, 2025", status: "Approved" },
  { patient: "John D.", doctor: "Dr. Brooks", rating: 4, comment: "Very thorough and professional. Short wait time.", date: "Jan 18, 2025", status: "Approved" },
  { patient: "Emily R.", doctor: "Dr. Rodriguez", rating: 5, comment: "Best oncologist I've ever seen. Clear explanations.", date: "Jan 15, 2025", status: "Pending" },
  { patient: "Mike T.", doctor: "Dr. Wilson", rating: 3, comment: "Good care but long wait in the lobby.", date: "Jan 12, 2025", status: "Pending" },
];

export default function AdminReviewsPage() {
  return (
    <>
      <PageHero title="Manage Reviews" breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Reviews" }]} />
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold">{reviews.filter((r) => r.status === "Pending").length} Pending Reviews</h2></div>
        <div className="space-y-3">{reviews.map((r, i) => (<Card key={i}><CardContent className="p-4"><div className="flex items-center justify-between mb-2"><div className="flex items-center gap-2"><span className="font-semibold">{r.patient}</span><span className="text-yellow-500">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span><Badge variant={r.status === "Approved" ? "default" : "secondary"}>{r.status}</Badge></div><div className="flex gap-2">{r.status === "Pending" && <><Button size="sm">Approve</Button><Button variant="outline" size="sm">Reject</Button></>}</div></div><p className="text-sm text-muted-foreground">{r.comment}</p><p className="text-xs text-muted-foreground mt-1">For {r.doctor} • {r.date}</p></CardContent></Card>))}</div>
      </section>
    </>
  );
}
