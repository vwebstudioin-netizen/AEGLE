"use client";
import { useState } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { doctors } from "@/data/doctors";

export default function PortalBookPage() {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <>
        <PageHero title="Book Appointment" breadcrumbs={[{ label: "Portal", href: "/portal" }, { label: "Book Appointment" }]} />
        <section className="container mx-auto px-4 py-16 max-w-2xl">
          <div className="rounded-2xl border bg-green-50 p-8 text-center dark:bg-green-950/30"><p className="text-4xl mb-3">✅</p><h2 className="text-xl font-bold mb-2">Appointment Booked!</h2><p className="text-muted-foreground">You will receive a confirmation email shortly. You can view and manage your appointments in the <a href="/portal/appointments" className="text-primary hover:underline">Appointments</a> section.</p></div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero title="Book Appointment" subtitle={`Step ${step} of 3`} breadcrumbs={[{ label: "Portal", href: "/portal" }, { label: "Book Appointment" }]} />
      <section className="container mx-auto px-4 py-16 max-w-3xl">
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Select a Provider</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {doctors.slice(0, 6).map((doc) => (
                <Card key={doc.slug} className={`cursor-pointer transition-all ${selectedDoctor === doc.slug ? "ring-2 ring-primary" : "hover:shadow-md"}`} onClick={() => setSelectedDoctor(doc.slug)}>
                  <CardContent className="p-4"><h3 className="font-semibold">{doc.name}</h3><p className="text-sm text-muted-foreground">{doc.specialties[0]}</p></CardContent>
                </Card>
              ))}
            </div>
            <Button className="mt-6 w-full" onClick={() => setStep(2)} disabled={!selectedDoctor}>Continue</Button>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Select Date & Time</h2>
            <div className="grid gap-4 sm:grid-cols-2"><div><Label>Preferred Date</Label><Input type="date" required /></div><div><Label>Preferred Time</Label><select className="w-full rounded-md border bg-background px-3 py-2 text-sm"><option>9:00 AM</option><option>10:00 AM</option><option>11:00 AM</option><option>1:00 PM</option><option>2:00 PM</option><option>3:00 PM</option><option>4:00 PM</option></select></div></div>
            <div className="mt-4"><Label>Visit Type</Label><select className="w-full rounded-md border bg-background px-3 py-2 text-sm"><option>In-Person</option><option>Video Visit</option></select></div>
            <div className="mt-4"><Label>Reason for Visit</Label><Input placeholder="Brief description" /></div>
            <div className="flex gap-3 mt-6"><Button variant="outline" onClick={() => setStep(1)}>Back</Button><Button className="flex-1" onClick={() => setStep(3)}>Continue</Button></div>
          </div>
        )}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Confirm Appointment</h2>
            <div className="rounded-xl border p-6 space-y-2 mb-6"><p><strong>Provider:</strong> {doctors.find((d) => d.slug === selectedDoctor)?.name}</p><p><strong>Type:</strong> In-Person</p><p className="text-sm text-muted-foreground">Please arrive 15 minutes early with your insurance card and photo ID.</p></div>
            <div className="flex gap-3"><Button variant="outline" onClick={() => setStep(2)}>Back</Button><Button className="flex-1" onClick={() => setSubmitted(true)}>Confirm Booking</Button></div>
          </div>
        )}
      </section>
    </>
  );
}
