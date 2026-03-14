import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { EmojiIcon } from "@/components/shared/EmojiIcon";
import { doctors } from "@/data/doctors";
import { departments } from "@/data/departments";
import { Trophy } from "lucide-react";

export async function generateStaticParams() {
  return doctors.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = doctors.find((d) => d.slug === slug);
  if (!doc) return {};
  return {
    title: doc.name,
    description: `${doc.name} — ${doc.title} at AEGLE Skin Care Clinic. Specializing in ${doc.specialties.join(", ")}.`,
  };
}

export default async function DoctorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = doctors.find((d) => d.slug === slug);
  if (!doc) notFound();

  const docDepts = departments.filter((dept) =>
    doc.departments.includes(dept.id)
  );

  return (
    <>
      <PageHero
        title={doc.name}
        subtitle={doc.title}
        breadcrumbs={[
          { label: "Find a Doctor", href: "/doctors" },
          { label: doc.name },
        ]}
        size="sm"
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <Tabs
                tabs={[
                  {
                    id: "about",
                    label: "About",
                    content: (
                      <div className="space-y-6">
                        <div className="flex items-start gap-6">
                          <img
                            src={doc.image}
                            alt={doc.name}
                            className="w-32 h-32 rounded-xl object-cover shrink-0"
                          />
                          <div>
                            <h2 className="text-2xl font-bold text-foreground">
                              {doc.name}
                            </h2>
                            <p className="text-primary font-medium">{doc.title}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-yellow-500">★</span>
                              <span className="font-medium">{doc.rating}</span>
                              <span className="text-muted-foreground text-sm">
                                ({doc.reviewCount} reviews)
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-3">
                              {doc.specialties.map((s) => (
                                <Badge key={s} variant="secondary">
                                  {s}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Biography</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {doc.bio}
                          </p>
                        </div>
                        {doc.awards && doc.awards.length > 0 && (
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              Awards & Recognition
                            </h3>
                            <ul className="space-y-1">
                              {doc.awards.map((a) => (
                                <li
                                  key={a}
                                  className="flex items-center gap-2 text-sm text-muted-foreground"
                                >
                                  <span className="text-primary"><Trophy className="w-4 h-4 inline" /></span> {a}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ),
                  },
                  {
                    id: "education",
                    label: "Education & Training",
                    content: (
                      <div className="space-y-4">
                        {doc.education.map((edu) => (
                          <div key={edu.institution} className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-sm font-bold text-primary">
                              {edu.year}
                            </div>
                            <div>
                              <p className="font-medium">{edu.degree}</p>
                              <p className="text-sm text-muted-foreground">
                                {edu.institution}
                              </p>
                            </div>
                          </div>
                        ))}
                        <div className="mt-6">
                          <h3 className="font-semibold mb-2">
                            Board Certifications
                          </h3>
                          {doc.boardCertifications.map((cert) => (
                            <Badge
                              key={cert}
                              variant="outline"
                              className="mr-2 mb-2"
                            >
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ),
                  },
                  {
                    id: "locations",
                    label: "Locations",
                    content: (
                      <div className="space-y-3">
                        {doc.locations.map((loc) => (
                          <Card key={loc}>
                            <CardContent className="p-4">
                              <Link
                                href={`/locations/${loc}`}
                                className="font-medium text-primary hover:underline capitalize"
                              >
                                {loc.replace(/-/g, " ")}
                              </Link>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ),
                  },
                ]}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="bg-primary text-white">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-2">Book an Appointment</h3>
                  <p className="text-white/80 text-sm mb-4">
                    Schedule a visit with {doc.name.split(",")[0]}.
                  </p>
                  <Link href="/appointment">
                    <Button className="bg-white text-primary hover:bg-white/90 w-full">
                      Book Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-3 text-sm">
                  <h3 className="font-semibold text-foreground">Quick Info</h3>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Experience</span>
                    <span className="font-medium">{doc.experience} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Languages</span>
                    <span className="font-medium">
                      {doc.languages.join(", ")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">New Patients</span>
                    <span
                      className={
                        doc.acceptingNewPatients
                          ? "text-green-600 font-medium"
                          : "text-red-600 font-medium"
                      }
                    >
                      {doc.acceptingNewPatients ? "Accepting" : "Not Accepting"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Telemedicine</span>
                    <span className="font-medium">
                      {doc.telemedicineAvailable ? "Available" : "Not Available"}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">
                    Departments
                  </h3>
                  <div className="space-y-2">
                    {docDepts.map((dept) => (
                      <Link
                        key={dept.id}
                        href={`/departments/${dept.slug}`}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <EmojiIcon emoji={dept.icon} className="w-4 h-4" /> {dept.name}
                      </Link>
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
