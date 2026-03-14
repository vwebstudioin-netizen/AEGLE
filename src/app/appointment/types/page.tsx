import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  UserPlus, RefreshCw, Search, Video, Zap, Stethoscope,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Appointment Types",
  description: "Types of appointments available at AEGLE Skin Care Clinic — new patient, follow-up, second opinion, and virtual visits.",
};

const types: { title: string; duration: string; icon: LucideIcon; description: string; preparation: string }[] = [
  { title: "New Patient Visit", duration: "45-60 min", icon: UserPlus, description: "Comprehensive first-time visit including health history review, physical exam, and care plan development.", preparation: "Bring ID, insurance card, medications list, and any prior medical records." },
  { title: "Follow-Up Visit", duration: "15-30 min", icon: RefreshCw, description: "Return visit to review test results, adjust treatments, or monitor ongoing conditions.", preparation: "Note any new symptoms or changes since your last visit." },
  { title: "Second Opinion", duration: "60 min", icon: Search, description: "Expert review of a diagnosis or treatment plan by one of our specialists.", preparation: "Bring all relevant medical records, imaging, pathology reports, and current treatment plan." },
  { title: "Virtual / Video Visit", duration: "15-30 min", icon: Video, description: "See your provider from home via secure video conference for eligible conditions.", preparation: "Ensure stable internet, working camera/mic, and a quiet, private space." },
  { title: "Urgent Visit", duration: "Varies", icon: Zap, description: "Same-day or next-day appointments for acute but non-emergency conditions.", preparation: "Call ahead so we can prepare for your visit." },
  { title: "Preventive / Wellness", duration: "30-45 min", icon: Stethoscope, description: "Annual physical, health screenings, and preventive care consultations.", preparation: "Fast 8-12 hours if bloodwork is expected." },
];

export default function AppointmentTypesPage() {
  return (
    <>
      <PageHero
        title="Appointment Types"
        subtitle="Choose the right type of visit for your healthcare needs."
        breadcrumbs={[
          { label: "Appointments", href: "/appointment" },
          { label: "Types" },
        ]}
      />

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {types.map((t) => (
              <Card key={t.title} className="h-full">
                <CardContent className="p-6">
                  <t.icon className="w-8 h-8 mb-3 text-primary" />
                  <h3 className="font-semibold text-lg mb-1">{t.title}</h3>
                  <p className="text-sm text-primary mb-3">{t.duration}</p>
                  <p className="text-sm text-muted-foreground mb-3">{t.description}</p>
                  <p className="text-xs text-muted-foreground"><strong>Prepare:</strong> {t.preparation}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/appointment"><Button size="lg">Book an Appointment</Button></Link>
          </div>
        </div>
      </section>
    </>
  );
}
