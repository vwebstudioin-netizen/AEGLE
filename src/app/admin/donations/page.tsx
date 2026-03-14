"use client";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Total Donations (YTD)", value: "$2.8M" },
  { label: "Active Campaigns", value: 4 },
  { label: "Donors", value: 1250 },
  { label: "Planned Gifts", value: 18 },
];

const recentDonations = [
  { donor: "John Smith", amount: "$5,000", campaign: "Cancer Research Fund", date: "Jan 20, 2025" },
  { donor: "Anonymous", amount: "$10,000", campaign: "Children's Wing", date: "Jan 18, 2025" },
  { donor: "Mary Johnson", amount: "$250", campaign: "Where Needed Most", date: "Jan 15, 2025" },
  { donor: "Corporate Match — ABC Corp", amount: "$25,000", campaign: "Children's Wing", date: "Jan 12, 2025" },
];

export default function AdminDonationsPage() {
  return (
    <>
      <PageHero title="Manage Donations" breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Donations" }]} />
      <section className="container mx-auto px-4 py-8 space-y-8">
        <div className="grid gap-4 sm:grid-cols-4">{stats.map((s) => (<Card key={s.label}><CardContent className="p-6 text-center"><p className="text-3xl font-bold text-primary">{s.value}</p><p className="text-sm text-muted-foreground">{s.label}</p></CardContent></Card>))}</div>
        <div><h2 className="text-xl font-bold mb-4">Recent Donations</h2><div className="space-y-3">{recentDonations.map((d, i) => (<Card key={i}><CardContent className="p-4 flex items-center justify-between"><div><h3 className="font-semibold">{d.donor}</h3><p className="text-sm text-muted-foreground">{d.campaign} • {d.date}</p></div><span className="font-bold text-primary">{d.amount}</span></CardContent></Card>))}</div></div>
        <Button>Manage Campaigns</Button>
      </section>
    </>
  );
}
