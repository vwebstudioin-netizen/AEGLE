"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { departments } from "@/data/departments";
import { doctors } from "@/data/doctors";
import { locations } from "@/data/locations";

type Step = 1 | 2 | 3 | 4;

export default function AppointmentPage() {
  const [step, setStep] = useState<Step>(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState<Record<string, string>>({});

  function update(field: string, value: string) {
    setFormData((p) => ({ ...p, [field]: value }));
  }

  async function handleSubmit() {
    setStatus("loading");
    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const stepLabels = ["Select Service", "Choose Doctor", "Pick Date & Time", "Your Information"];

  return (
    <>
      <PageHero
        title="Book an Appointment"
        subtitle="Schedule your visit in a few easy steps."
        breadcrumbs={[{ label: "Book Appointment" }]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {status === "success" ? (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold mb-2">Appointment Requested!</h2>
                <p className="text-muted-foreground mb-6">
                  We have received your appointment request. Our scheduling team
                  will contact you within 24 hours to confirm.
                </p>
                <div className="flex gap-4 justify-center">
                  <Link href="/">
                    <Button variant="outline">Back to Home</Button>
                  </Link>
                  <Link href="/portal">
                    <Button>Patient Portal</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Stepper */}
              <div className="flex items-center justify-between mb-8">
                {stepLabels.map((label, i) => (
                  <div key={label} className="flex items-center flex-1">
                    <div className="flex flex-col items-center gap-1 flex-1">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                          step > i + 1
                            ? "bg-green-500 text-white"
                            : step === i + 1
                              ? "bg-primary text-white"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {step > i + 1 ? "✓" : i + 1}
                      </div>
                      <span className="text-xs text-muted-foreground hidden sm:block">
                        {label}
                      </span>
                    </div>
                    {i < stepLabels.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 ${
                          step > i + 1 ? "bg-green-500" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Step {step}: {stepLabels[step - 1]}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {step === 1 && (
                    <>
                      <div>
                        <Label htmlFor="department">Department *</Label>
                        <Select
                          id="department"
                          value={formData.department || ""}
                          onChange={(e) => update("department", e.target.value)}
                          options={[
                            { value: "", label: "Select department..." },
                            ...departments.map((d) => ({
                              value: d.id,
                              label: d.name,
                            })),
                          ]}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Preferred Location *</Label>
                        <Select
                          id="location"
                          value={formData.location || ""}
                          onChange={(e) => update("location", e.target.value)}
                          options={[
                            { value: "", label: "Select location..." },
                            ...locations.map((l) => ({
                              value: l.id,
                              label: l.name,
                            })),
                          ]}
                        />
                      </div>
                      <div>
                        <Label htmlFor="visitType">Visit Type *</Label>
                        <Select
                          id="visitType"
                          value={formData.visitType || ""}
                          onChange={(e) => update("visitType", e.target.value)}
                          options={[
                            { value: "", label: "Select type..." },
                            { value: "new", label: "New Patient" },
                            { value: "follow-up", label: "Follow-Up" },
                            { value: "telemedicine", label: "Telemedicine" },
                            { value: "second-opinion", label: "Second Opinion" },
                          ]}
                        />
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <div>
                      <Label htmlFor="doctor">Preferred Doctor (optional)</Label>
                      <Select
                        id="doctor"
                        value={formData.doctor || ""}
                        onChange={(e) => update("doctor", e.target.value)}
                        options={[
                          { value: "", label: "No preference" },
                          ...doctors
                            .filter(
                              (d) =>
                                !formData.department ||
                                d.departments.includes(formData.department)
                            )
                            .map((d) => ({ value: d.id, label: d.name })),
                        ]}
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Can&apos;t find your doctor? You can leave this blank and our
                        scheduling team will match you.
                      </p>
                    </div>
                  )}

                  {step === 3 && (
                    <>
                      <div>
                        <Label htmlFor="date">Preferred Date *</Label>
                        <Input
                          id="date"
                          name="date"
                          type="date"
                          value={formData.date || ""}
                          onChange={(e) => update("date", e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="time">Preferred Time *</Label>
                        <Select
                          id="time"
                          value={formData.time || ""}
                          onChange={(e) => update("time", e.target.value)}
                          options={[
                            { value: "", label: "Select time..." },
                            { value: "morning", label: "Morning (8am - 12pm)" },
                            { value: "afternoon", label: "Afternoon (12pm - 4pm)" },
                            { value: "evening", label: "Evening (4pm - 6pm)" },
                          ]}
                        />
                      </div>
                    </>
                  )}

                  {step === 4 && (
                    <>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="patientName">Full Name *</Label>
                          <Input
                            id="patientName"
                            value={formData.patientName || ""}
                            onChange={(e) => update("patientName", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="dob">Date of Birth *</Label>
                          <Input
                            id="dob"
                            type="date"
                            value={formData.dob || ""}
                            onChange={(e) => update("dob", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="patientEmail">Email *</Label>
                          <Input
                            id="patientEmail"
                            type="email"
                            value={formData.patientEmail || ""}
                            onChange={(e) => update("patientEmail", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="patientPhone">Phone *</Label>
                          <Input
                            id="patientPhone"
                            type="tel"
                            value={formData.patientPhone || ""}
                            onChange={(e) => update("patientPhone", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="insurance">Insurance Provider</Label>
                        <Input
                          id="insurance"
                          value={formData.insurance || ""}
                          onChange={(e) => update("insurance", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="reason">Reason for Visit</Label>
                        <Textarea
                          id="reason"
                          value={formData.reason || ""}
                          onChange={(e) => update("reason", e.target.value)}
                          rows={3}
                        />
                      </div>
                    </>
                  )}

                  {status === "error" && (
                    <p className="text-destructive text-sm">
                      Something went wrong. Please try again or call (800) 555-5678.
                    </p>
                  )}

                  <div className="flex justify-between pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setStep((s) => Math.max(1, s - 1) as Step)}
                      disabled={step === 1}
                    >
                      Back
                    </Button>
                    {step < 4 ? (
                      <Button onClick={() => setStep((s) => Math.min(4, s + 1) as Step)}>
                        Continue
                      </Button>
                    ) : (
                      <Button onClick={handleSubmit} disabled={status === "loading"}>
                        {status === "loading" ? "Submitting..." : "Request Appointment"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </section>
    </>
  );
}
