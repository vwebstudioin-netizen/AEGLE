"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/FadeIn";
import { doctors } from "@/data/doctors";
import { departments } from "@/data/departments";
import { Search, Star, Video, UserCheck } from "lucide-react";

export default function DoctorsPage() {
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("all");

  const allDepts = [...new Set(doctors.flatMap((d) => d.departments))];

  const filtered = doctors.filter((doc) => {
    const matchSearch =
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialties.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchDept = filterDept === "all" || doc.departments.includes(filterDept);
    return matchSearch && matchDept;
  });

  return (
    <main className="min-h-screen bg-background">
      {/* Gradient Hero with BG image */}
      <section className="gradient-hero text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-15" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">Our Experts</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Meet our board-certified dermatologists and specialists — committed to your skin health and beauty.
          </p>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
            <input
              type="text"
              placeholder="Search by name or specialty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white/95 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="py-4 border-b sticky top-0 bg-background/95 backdrop-blur z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setFilterDept("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filterDept === "all"
                  ? "bg-primary text-white shadow-md"
                  : "bg-muted hover:bg-primary/10 text-muted-foreground"
              }`}
            >
              All
            </button>
            {allDepts.map((deptId) => {
              const dept = departments.find((d) => d.id === deptId);
              return (
                <button
                  key={deptId}
                  onClick={() => setFilterDept(deptId)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filterDept === deptId
                      ? "bg-primary text-white shadow-md"
                      : "bg-muted hover:bg-primary/10 text-muted-foreground"
                  }`}
                >
                  {dept?.name || deptId}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Doctor grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <p className="text-sm text-muted-foreground mb-6">{filtered.length} doctor{filtered.length !== 1 ? "s" : ""} found</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((doc, i) => (
              <FadeIn key={doc.id} delay={i * 100} direction="up">
                <Link href={`/doctors/${doc.slug}`}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group overflow-hidden">
                    {/* Top gradient accent */}
                    <div className="h-2 gradient-hero" />
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 ring-2 ring-primary/20 group-hover:ring-primary transition-all">
                          <Image
                            src={doc.image}
                            alt={doc.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                            {doc.name}
                          </h3>
                          <p className="text-sm text-primary">{doc.title}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{doc.rating}</span>
                            <span className="text-xs text-muted-foreground">({doc.reviewCount})</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-1">
                        {doc.specialties.slice(0, 3).map((s) => (
                          <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                        ))}
                      </div>
                      <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                        {doc.acceptingNewPatients && (
                          <span className="text-green-600 font-medium flex items-center gap-1">
                            <UserCheck className="w-3.5 h-3.5" /> Accepting patients
                          </span>
                        )}
                        {doc.telemedicineAvailable && (
                          <span className="flex items-center gap-1"><Video className="w-3.5 h-3.5" /> Telemedicine</span>
                        )}
                      </div>
                      <div className="mt-4">
                        <Button size="sm" variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                          View Profile
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl mb-2">🔍</p>
              <p className="text-lg font-semibold">No doctors found</p>
              <p className="text-muted-foreground">Try adjusting your search or filter</p>
              <Button variant="outline" onClick={() => { setSearch(""); setFilterDept("all"); }} className="mt-4">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
