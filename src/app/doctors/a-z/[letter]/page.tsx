import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { doctors } from "@/data/doctors";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export async function generateStaticParams() {
  return alphabet.map((letter) => ({ letter: letter.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Promise<{ letter: string }> }): Promise<Metadata> {
  const { letter } = await params;
  return { title: `Doctors — ${letter.toUpperCase()}`, description: `Browse doctors whose last name starts with ${letter.toUpperCase()}.` };
}

export default async function DoctorsAZPage({ params }: { params: Promise<{ letter: string }> }) {
  const { letter } = await params;
  const upper = letter.toUpperCase();
  const filtered = doctors.filter((d) => d.name.split(" ").pop()?.startsWith(upper));

  return (
    <>
      <PageHero
        title={`Doctors — ${upper}`}
        subtitle={`Providers whose last name starts with "${upper}".`}
        breadcrumbs={[
          { label: "Find a Doctor", href: "/doctors" },
          { label: `A-Z: ${upper}` },
        ]}
      />

      <section className="container mx-auto px-4 py-16">
        {/* Letter navigation */}
        <div className="flex flex-wrap gap-1 mb-8">
          {alphabet.map((l) => (
            <Link
              key={l}
              href={`/doctors/a-z/${l.toLowerCase()}`}
              className={`flex h-8 w-8 items-center justify-center rounded text-sm font-medium ${
                l === upper ? "bg-primary text-white" : "bg-primary/10 text-primary hover:bg-primary/20"
              }`}
            >
              {l}
            </Link>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No doctors found for letter &ldquo;{upper}&rdquo;.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((doc) => (
              <Link key={doc.slug} href={`/doctors/${doc.slug}`} className="rounded-xl border bg-card p-5 hover:shadow transition-shadow">
                <h3 className="font-semibold">{doc.name}</h3>
                <p className="text-sm text-muted-foreground">{doc.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{doc.specialties.join(", ")}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
