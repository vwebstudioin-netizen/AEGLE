"use client";

import { useState } from "react";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { generalFaqs, billingFaqs } from "@/data/faq";
import { ChevronDown, Search } from "lucide-react";
import { FadeIn } from "@/components/shared/FadeIn";

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Card className="overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-5 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
      >
        <h3 className="font-semibold text-foreground pr-4">{question}</h3>
        <ChevronDown className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{answer}</p>
        </div>
      </div>
    </Card>
  );
}

export default function FaqPage() {
  const [search, setSearch] = useState("");

  const allFaqs = [
    ...generalFaqs.map((f) => ({ ...f, group: "General" })),
    ...billingFaqs.map((f) => ({ ...f, group: "Billing & Insurance" })),
  ];

  const filtered = search
    ? allFaqs.filter(
        (f) =>
          f.question.toLowerCase().includes(search.toLowerCase()) ||
          f.answer.toLowerCase().includes(search.toLowerCase())
      )
    : null;

  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Find quick answers to common questions about our clinic and services."
        breadcrumbs={[{ label: "FAQ" }]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl space-y-10">
          {/* Decorative Banner */}
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80"
              alt="AEGLE skin care products and treatments"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-lg font-semibold">Got Questions? We&rsquo;ve Got Answers</p>
              <p className="text-sm text-white/80">Everything you need to know about AEGLE</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Search Results */}
          {filtered ? (
            <div>
              <h2 className="text-lg font-bold text-foreground mb-4">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{search}&rdquo;
              </h2>
              <div className="space-y-3">
                {filtered.map((faq) => (
                  <AccordionItem key={faq.question} question={faq.question} answer={faq.answer} />
                ))}
              </div>
              {filtered.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No matching questions found. Try a different search.</p>
              )}
            </div>
          ) : (
            <>
              {/* General */}
              <FadeIn direction="up">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">General Questions</h2>
                  <div className="space-y-3">
                    {generalFaqs.map((faq) => (
                      <AccordionItem key={faq.question} question={faq.question} answer={faq.answer} />
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Billing */}
              <FadeIn direction="up" delay={200}>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Billing & Insurance</h2>
                  <div className="space-y-3">
                    {billingFaqs.map((faq) => (
                      <AccordionItem key={faq.question} question={faq.question} answer={faq.answer} />
                    ))}
                  </div>
                </div>
              </FadeIn>
            </>
          )}

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-foreground mb-2">Still have questions?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our team is happy to help with any additional questions or concerns.
              </p>
              <div className="flex gap-4 justify-center text-sm">
                <a href="/contact" className="text-primary font-medium hover:underline">
                  Contact Us
                </a>
                <span className="text-muted-foreground">|</span>
                <a href="tel:8050507755" className="text-primary font-medium hover:underline">
                  Call 8050507755
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
