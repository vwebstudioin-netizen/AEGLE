"use client";

import { useState, useEffect } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SITE_NAME } from "@/lib/constants";

interface LocationItem {
  id: string;
  name: string;
  address: { street: string; city: string; state?: string; zip?: string };
}

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [locations, setLocations] = useState<LocationItem[]>([]);

  useEffect(() => {
    fetch("/api/locations")
      .then((r) => r.json())
      .then((d) => setLocations(d.locations || []))
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form)),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We're here to help. Reach out with any questions, comments, or concerns."
        breadcrumbs={[{ label: "Contact Us" }]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Clinic Image Banner */}
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl mb-10">
            <Image
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80"
              alt="AEGLE Skin Care Clinic reception"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-lg font-semibold">Visit Our Clinic</p>
              <p className="text-sm text-white/80">Modern facilities designed for your comfort</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  {status === "success" ? (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">✅</div>
                      <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground">
                        Thank you for reaching out. We'll respond within 24 hours.
                      </p>
                      <Button className="mt-4" onClick={() => setStatus("idle")}>
                        Send Another
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input id="firstName" name="firstName" required />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input id="lastName" name="lastName" required />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input id="email" name="email" type="email" required />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" name="phone" type="tel" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="department">Department</Label>
                        <Select
                          id="department"
                          name="department"
                          options={[
                            { value: "", label: "Select department..." },
                            { value: "general", label: "General Inquiry" },
                            { value: "billing", label: "Billing" },
                            { value: "appointments", label: "Appointments" },
                            { value: "medical-records", label: "Medical Records" },
                            { value: "complaints", label: "Patient Relations" },
                          ]}
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject *</Label>
                        <Input id="subject" name="subject" required />
                      </div>
                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea id="message" name="message" rows={5} required />
                      </div>
                      {status === "error" && (
                        <p className="text-destructive text-sm">
                          Something went wrong. Please try again or call us directly.
                        </p>
                      )}
                      <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
                        {status === "loading" ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
                <CardContent className="p-6 text-center">
                  <p className="text-2xl mb-2">🚑</p>
                  <h3 className="font-bold text-lg text-red-700 dark:text-red-400 mb-1">
                    Emergency?
                  </h3>
                  <p className="text-sm text-red-600 dark:text-red-300 mb-3">
                    If you are having a medical emergency, contact us immediately at 8050507755.
                  </p>
                  <a
                    href="tel:8050507755"
                    className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
                  >
                    Call AEGLE
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-foreground">Main Numbers</h3>
                  <div className="text-sm space-y-2">
                    <p>
                      <span className="text-muted-foreground">Main Line</span>
                      <br />
                      <a href="tel:+18005551234" className="font-medium text-primary">
                        (800) 555-1234
                      </a>
                    </p>
                    <p>
                      <span className="text-muted-foreground">Appointments</span>
                      <br />
                      <a href="tel:+18005555678" className="font-medium text-primary">
                        (800) 555-5678
                      </a>
                    </p>
                    <p>
                      <span className="text-muted-foreground">Billing</span>
                      <br />
                      <a href="tel:+18005559012" className="font-medium text-primary">
                        (800) 555-9012
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">Our Locations</h3>
                  <div className="space-y-3 text-sm">
                    {locations.map((loc) => (
                      <div key={loc.id}>
                        <p className="font-medium">{loc.name}</p>
                        <p className="text-muted-foreground">
                          {loc.address.street}, {loc.address.city}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
