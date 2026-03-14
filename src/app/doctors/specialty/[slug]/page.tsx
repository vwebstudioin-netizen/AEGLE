import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { doctors } from "@/data/doctors";
import { departments } from "@/data/departments";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const specialtySlugs = ["cardiology", "neurology", "orthopedics", "oncology", "pediatrics", "general-medicine"];

export async function generateStaticParams() {
  return specialtySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const name = slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  return { title: `${name} Doctors`, description: `Find ${name} specialists at AEGLE Skin Care Clinic.` };
}

export default async function DoctorsBySpecialtyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const name = slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  const filtered = doctors.filter((d) => d.specialties.some((s) => s.toLowerCase().includes(slug.replace(/-/g, " "))));

  return (
    <>
      <PageHero
        title={`${name} Specialists`}
        subtitle={`Meet our ${name} doctors and providers.`}
        breadcrumbs={[
          { label: "Find a Doctor", href: "/doctors" },
          { label: name },
        ]}
      />

      <section className="container mx-auto px-4 py-16">
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No doctors found for this specialty. <Link href="/doctors" className="text-primary hover:underline">Browse all doctors</Link>.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((doc) => (
              <Link key={doc.slug} href={`/doctors/${doc.slug}`}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl mb-4">👨‍⚕️</div>
                    <h3 className="font-semibold">{doc.name}</h3>
                    <p className="text-sm text-muted-foreground">{doc.title}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {doc.specialties.slice(0, 3).map((s) => (
                        <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
