import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { departments } from "@/data/departments";
import { doctors } from "@/data/doctors";

export async function generateStaticParams() {
  return departments.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dept = departments.find((d) => d.slug === slug);
  if (!dept) return {};
  return {
    title: dept.name,
    description: dept.description,
  };
}

export default async function DepartmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dept = departments.find((d) => d.slug === slug);
  if (!dept) notFound();

  const deptDoctors = doctors.filter((d) =>
    d.departments.includes(dept.id)
  );

  return (
    <>
      <PageHero
        title={dept.name}
        subtitle={dept.description}
        breadcrumbs={[
          { label: "Departments", href: "/departments" },
          { label: dept.name },
        ]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Overview
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {dept.longDescription}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {dept.stats.map((stat) => (
                  <Card key={stat.label}>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Services */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Services
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dept.services.map((service) => (
                    <div
                      key={service}
                      className="flex items-center gap-2 p-3 rounded-lg bg-muted/50"
                    >
                      <span className="text-primary">✓</span>
                      <span className="text-sm">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Why Choose Us
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dept.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 p-3 rounded-lg border border-border"
                    >
                      <span className="text-primary">★</span>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Doctors */}
              {deptDoctors.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Our Physicians
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {deptDoctors.map((doc) => (
                      <Link key={doc.id} href={`/doctors/${doc.slug}`}>
                        <Card className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4 flex items-center gap-4">
                            <img
                              src={doc.image}
                              alt={doc.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                              <h3 className="font-semibold text-foreground">
                                {doc.name}
                              </h3>
                              <p className="text-sm text-primary">{doc.title}</p>
                              <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                                <span className="text-yellow-500">★</span>
                                {doc.rating} ({doc.reviewCount} reviews)
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs */}
              {dept.faqs.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {dept.faqs.map((faq) => (
                      <Card key={faq.question}>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-foreground mb-2">
                            {faq.question}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {faq.answer}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Department Head:</span>
                      <p className="font-medium">{dept.head}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Phone:</span>
                      <p className="font-medium">{dept.phone}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Email:</span>
                      <p className="font-medium">{dept.email}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Location:</span>
                      <p className="font-medium">{dept.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary text-white">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-2">Book an Appointment</h3>
                  <p className="text-white/80 text-sm mb-4">
                    Schedule a visit with one of our {dept.name} specialists.
                  </p>
                  <Link href="/appointment">
                    <Button className="bg-white text-primary hover:bg-white/90 w-full">
                      Book Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {dept.conditions.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-3">
                      Conditions We Treat
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {dept.conditions.map((c) => (
                        <Badge key={c} variant="outline">
                          {c.replace(/-/g, " ")}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
