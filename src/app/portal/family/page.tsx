"use client";
import { useState } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const familyMembers = [
  { name: "Emma Johnson", relationship: "Daughter", age: 12, status: "Active" },
  { name: "Robert Johnson", relationship: "Father", age: 72, status: "Active" },
];

export default function PortalFamilyPage() {
  const [showForm, setShowForm] = useState(false);
  const [members, setMembers] = useState(familyMembers);

  return (
    <>
      <PageHero title="Family Access" subtitle="Manage proxy access to family members' health records." breadcrumbs={[{ label: "Portal", href: "/portal" }, { label: "Family Access" }]} />
      <section className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="rounded-2xl border bg-blue-50 p-4 mb-6 dark:bg-blue-950/30"><p className="text-sm">Family access allows you to view health information for dependents (children under 18) and individuals who have granted you proxy access.</p></div>
        <div className="space-y-3 mb-6">
          {members.map((m) => (
            <Card key={m.name}><CardContent className="p-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2"><h3 className="font-semibold">{m.name}</h3><Badge variant="secondary">{m.relationship}</Badge><Badge>{m.status}</Badge></div>
                <p className="text-sm text-muted-foreground">Age {m.age}</p>
              </div>
              <Button variant="outline" size="sm">View Records</Button>
            </CardContent></Card>
          ))}
        </div>
        {showForm ? (
          <form onSubmit={(e) => { e.preventDefault(); setMembers([...members, { name: "New Member", relationship: "Other", age: 0, status: "Pending" }]); setShowForm(false); }} className="rounded-2xl border p-6 space-y-4">
            <h3 className="text-lg font-bold">Request Family Access</h3>
            <div className="grid gap-4 sm:grid-cols-2"><div><Label>Member Name</Label><Input required /></div><div><Label>Relationship</Label><Input required placeholder="e.g. Spouse, Child, Parent" /></div><div><Label>Date of Birth</Label><Input type="date" required /></div><div><Label>Medical Record Number</Label><Input placeholder="Optional" /></div></div>
            <p className="text-xs text-muted-foreground">For adults, the member must authorize access. For children under 18, a legal guardian relationship is required.</p>
            <div className="flex gap-3"><Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button><Button type="submit">Submit Request</Button></div>
          </form>
        ) : (
          <Button onClick={() => setShowForm(true)}>+ Add Family Member</Button>
        )}
      </section>
    </>
  );
}
