import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Stethoscope, Truck, GraduationCap, Brain, Baby, PersonStanding,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Community Outreach",
  description: "AEGLE Skin Care Clinic's community health programs, free screenings, outreach events, and partnerships.",
};

const programs: { title: string; description: string; icon: LucideIcon }[] = [
  { title: "Free Health Screenings", description: "Monthly community health fairs offering blood pressure, glucose, cholesterol, and BMI screenings at no cost.", icon: Stethoscope },
  { title: "Mobile Health Clinic", description: "Our mobile unit brings primary care, vaccinations, and health education to underserved neighborhoods.", icon: Truck },
  { title: "School Health Initiative", description: "Partnering with local schools for health education, dental screenings, and vision tests for students.", icon: GraduationCap },
  { title: "Mental Health Awareness", description: "Community workshops on stress management, depression screening, and substance abuse prevention.", icon: Brain },
  { title: "Maternal & Child Health", description: "Prenatal education classes, breastfeeding support, and pediatric wellness programs for families.", icon: Baby },
  { title: "Senior Wellness Program", description: "Fall prevention, medication management, and social programs for our elderly community members.", icon: PersonStanding },
];

const partnerships = [
  "City Department of Public Health",
  "United Way of Greater Metro",
  "American Heart Association — Local Chapter",
  "National Alliance on Mental Illness (NAMI)",
  "Local School District Board of Education",
  "Community Food Bank Coalition",
  "Habitat for Humanity — Health Housing Initiative",
  "State University School of Public Health",
];

const impactStats = [
  { value: "50,000+", label: "Community members served annually" },
  { value: "200+", label: "Free health screening events per year" },
  { value: "30+", label: "Community partner organizations" },
  { value: "$5M+", label: "Annual community benefit investment" },
];

export default function CommunityPage() {
  return (
    <>
      <PageHero
        title="Community Outreach"
        subtitle="Improving the health of our entire community through programs, partnerships, and service."
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Community" },
        ]}
      />

      {/* Hero Image */}
      <section className="container mx-auto px-4 pt-10">
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl">
          <Image
            src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1600&q=80"
            alt="AEGLE community outreach program"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <p className="text-lg font-semibold">Making a Difference Together</p>
            <p className="text-sm text-white/80">Our team in the community</p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-primary/5 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
            {impactStats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold text-primary">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8">Our Programs</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <Card key={p.title}>
              <CardContent className="p-6">
                <p.icon className="w-8 h-8 mb-3 text-primary" />
                <h3 className="font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Partnerships */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Community Partners</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {partnerships.map((p) => (
              <div key={p} className="rounded-xl border bg-card p-4 text-sm font-medium">{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Get Involved</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Whether you want to volunteer, partner with us, or attend a community event, we welcome your participation in building a healthier community.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/contact"><Button>Get in Touch</Button></Link>
          <Link href="/contact"><Button variant="outline">Support AEGLE</Button></Link>
          <Link href="/contact"><Button variant="outline">Contact Us</Button></Link>
        </div>
      </section>
    </>
  );
}
