"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmojiIcon } from "@/components/shared/EmojiIcon";
import { FadeIn } from "@/components/shared/FadeIn";
import { departments } from "@/data/departments";
import { Search } from "lucide-react";

export default function DepartmentsPage() {
  const sorted = [...departments].sort((a, b) => a.order - b.order);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const categories = ["all", ...sorted.map((d) => d.name)];

  const filtered = sorted.filter((dept) => {
    const matchSearch = dept.name.toLowerCase().includes(search.toLowerCase()) ||
      dept.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = filter === "all" || dept.name === filter;
    return matchSearch && matchCategory;
  });

  return (
    <main className="min-h-screen bg-background">
      {/* Gradient Hero */}
      <section className="gradient-hero text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-15" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">Medical Departments</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Our 30+ departments and centers of excellence provide comprehensive care across every specialty.
          </p>
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
            <input
              type="text"
              placeholder="Search departments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white/95 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-6 border-b sticky top-0 bg-background/95 backdrop-blur z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat
                    ? "bg-primary text-white shadow-md"
                    : "bg-muted hover:bg-primary/10 text-muted-foreground"
                }`}
              >
                {cat === "all" ? "All Departments" : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Department Grid */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <p className="text-sm text-muted-foreground mb-6">{filtered.length} departments found</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((dept, i) => (
              <FadeIn key={dept.id} delay={i * 80} direction="up">
                <Link href={`/treatments/${dept.slug}`}>
                  <Card className="h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden">
                    {dept.image && (
                      <div className="h-48 overflow-hidden relative">
                        <Image
                          src={dept.image}
                          alt={dept.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <EmojiIcon emoji={dept.icon} className="w-5 h-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">{dept.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {dept.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {dept.stats.slice(0, 2).map((stat) => (
                          <Badge key={stat.label} variant="secondary">
                            {stat.value}
                          </Badge>
                        ))}
                        <Badge variant="outline">
                          {dept.doctors.length} Doctors
                        </Badge>
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
              <p className="text-lg font-semibold">No departments found</p>
              <p className="text-muted-foreground">Try adjusting your search or filter</p>
              <Button variant="outline" onClick={() => { setSearch(""); setFilter("all"); }} className="mt-4">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
