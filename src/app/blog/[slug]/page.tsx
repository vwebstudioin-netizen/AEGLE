import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, ArrowLeft, User } from "lucide-react";

const posts: Record<string, { title: string; date: string; category: string; author: string; image: string; content: string[] }> = {
  "advances-in-robotic-surgery": { title: "Advances in Robotic Surgery at AEGLE", date: "January 15, 2025", category: "Innovation", author: "Dr. Sarah Chen", image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200", content: ["AEGLE Skin Care Clinic has expanded its robotic surgery program with the addition of two new da Vinci Xi surgical systems. This investment allows our surgeons to perform minimally invasive procedures with greater precision, smaller incisions, and faster recovery times.", "The new systems will be utilized across multiple specialties including urology, gynecology, general surgery, and cardiothoracic surgery. Patients can expect shorter clinic visits and reduced post-operative pain.", "\"Robotic-assisted surgery represents the future of surgical care,\" said Dr. Sarah Chen, Chief of Robotic Surgery. \"These systems allow us to operate with sub-millimeter precision while causing minimal trauma to surrounding tissue.\""] },
  "heart-health-awareness-month": { title: "February is Heart Health Awareness Month", date: "February 1, 2025", category: "Community Health", author: "Dr. Michael Brooks", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200", content: ["Heart disease remains the leading cause of death in the United States. This February, AEGLE Skin Care Clinic joins the national effort to raise awareness about cardiovascular health.", "Our cardiology team is offering free blood pressure screenings every Saturday in February at all three of our locations. We encourage everyone over 40 to take advantage of this opportunity.", "Simple lifestyle changes—regular exercise, a heart-healthy diet, stress management, and avoiding tobacco—can significantly reduce your risk of heart disease."] },
};

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const post = posts[slug];
  return { title: post?.title || "Blog Post", description: post?.content[0] || "" };
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const defaultImage = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200";
  const post = posts[slug] || { title: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), date: "2025", category: "General", author: "Staff", image: defaultImage, content: ["This article is coming soon."] };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Image */}
      <section className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <Image
          src={post.image || defaultImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container mx-auto max-w-3xl">
            <Badge className="mb-3 bg-primary/90 text-white">{post.category}</Badge>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">{post.title}</h1>
            <div className="flex items-center gap-4 text-white/80 text-sm">
              <span className="flex items-center gap-1"><User className="w-4 h-4" /> {post.author}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.date}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article */}
      <article className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed">
          {post.content.map((p, i) => (
            <p key={i} className="mb-6">{p}</p>
          ))}
        </div>

        {/* Author Card */}
        <Card className="mt-12 bg-primary/5 border-primary/20">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
              {post.author.split(" ").map(w => w[0]).join("").slice(0, 2)}
            </div>
            <div>
              <p className="font-semibold">{post.author}</p>
              <p className="text-sm text-muted-foreground">AEGLE Skin Care Clinic</p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 border-t pt-6">
          <Link href="/blog" className="text-primary hover:underline flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </article>
    </main>
  );
}
