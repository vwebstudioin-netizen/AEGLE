import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { departments } from "@/data/departments";
import { services } from "@/data/services";
import { doctors } from "@/data/doctors";
import { Button } from "@/components/ui/button";
import { EmojiIcon } from "@/components/shared/EmojiIcon";
import { SITE_NAME, CONTACT_PHONE } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return departments.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const dept = departments.find((d) => d.slug === slug);
  if (!dept) return { title: "Not Found" };
  return {
    title: `${dept.name} — ${SITE_NAME}`,
    description: dept.description,
  };
}

export default async function DepartmentPage({ params }: Props) {
  const { slug } = await params;
  const dept = departments.find((d) => d.slug === slug);
  if (!dept) notFound();

  const deptServices = services.filter((s) => s.department === dept.id);
  const deptDoctors = doctors.filter((d) => dept.doctors?.includes(d.slug));

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative gradient-hero text-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-4 text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/treatments" className="hover:text-white">Treatments</Link>
            <span>/</span>
            <span className="text-white">{dept.name}</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <EmojiIcon emoji={dept.icon} className="w-12 h-12 text-white/90 mb-4" />
              <h1 className="text-3xl lg:text-5xl font-bold mb-4">{dept.name}</h1>
              <p className="text-lg text-white/90 mb-6 leading-relaxed">{dept.longDescription || dept.description}</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/appointment">
                  <Button className="bg-white text-primary hover:bg-white/90 font-semibold px-6">
                    Book Consultation
                  </Button>
                </Link>
                <a href={`tel:${CONTACT_PHONE}`}>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 px-6">
                    Call {CONTACT_PHONE}
                  </Button>
                </a>
              </div>
            </div>
            {dept.image && (
              <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden shadow-2xl">
                <Image src={dept.image} alt={dept.name} fill className="object-cover" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      {dept.stats && dept.stats.length > 0 && (
        <section className="py-8 bg-card border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {dept.stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl lg:text-3xl font-bold text-primary">{s.value}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Treatments List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold mb-2">Treatments We Offer</h2>
          <p className="text-muted-foreground mb-8">Explore our {dept.name.toLowerCase()} services</p>

          {deptServices.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {deptServices.map((svc) => (
                <Link key={svc.id} href={`/services/${svc.slug}`}>
                  <div className="group bg-card rounded-xl border border-border p-5 hover:shadow-lg hover:border-primary/30 transition-all h-full">
                    <div className="flex items-start gap-4">
                      {svc.image && (
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={svc.image} alt={svc.name} fill className="object-cover" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">{svc.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{svc.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {dept.services?.map((name) => (
                <div key={name} className="bg-card rounded-lg border border-border p-4 flex items-center gap-3">
                  <span className="text-primary">✦</span>
                  <span className="text-sm font-medium">{name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      {dept.features && dept.features.length > 0 && (
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold mb-8 text-center">Why Choose AEGLE for {dept.name}?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {dept.features.map((feature) => (
                <div key={feature} className="bg-card rounded-xl p-6 text-center border border-border">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary text-xl">✓</span>
                  </div>
                  <p className="font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Doctors */}
      {deptDoctors.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold mb-8">Our Specialists</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {deptDoctors.map((doc) => (
                <Link key={doc.id} href={`/doctors/${doc.slug}`}>
                  <div className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all">
                    {doc.image && (
                      <div className="relative h-48 overflow-hidden">
                        <Image src={doc.image} alt={doc.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{doc.name}</h3>
                      <p className="text-sm text-muted-foreground">{doc.title}</p>
                      <p className="text-sm text-primary mt-1">{doc.specialties?.join(", ")}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {dept.faqs && dept.faqs.length > 0 && (
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl lg:text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {dept.faqs.map((faq, i) => (
                <details key={i} className="bg-card rounded-xl border border-border p-5 group">
                  <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                    {faq.question}
                    <span className="text-primary group-open:rotate-45 transition-transform text-xl">+</span>
                  </summary>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Ready to Transform Your Skin?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Book a consultation with our expert dermatologists and start your journey to radiant, youthful skin today.
          </p>
          <Link href="/appointment">
            <Button size="lg" className="bg-primary text-white hover:bg-primary-dark px-8">
              Book Your Consultation
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
