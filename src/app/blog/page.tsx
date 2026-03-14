import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FloatingImages } from "@/components/shared/FloatingImages";

export const metadata: Metadata = {
  title: "Blog",
  description: "Health tips, medical news, and expert insights from AEGLE Skin Care Clinic.",
};

const posts = [
  {
    id: "1",
    title: "5 Heart-Healthy Habits for a Longer Life",
    excerpt: "Small changes in your daily routine can significantly reduce your risk of heart disease. Here are evidence-based habits our cardiologists recommend.",
    category: "Heart Health",
    author: "Dr. Sarah Chen",
    date: "2024-12-15",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600",
    slug: "heart-healthy-habits",
  },
  {
    id: "2",
    title: "Understanding Your Child's Vaccination Schedule",
    excerpt: "A comprehensive guide to childhood vaccinations — what they protect against and when your child needs them.",
    category: "Pediatrics",
    author: "Dr. Lisa Park",
    date: "2024-12-10",
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=600",
    slug: "childhood-vaccination-schedule",
  },
  {
    id: "3",
    title: "Managing Chronic Pain: Non-Opioid Approaches",
    excerpt: "Modern pain management goes beyond medication. Learn about physical therapy, mindfulness, and other effective alternatives.",
    category: "Pain Management",
    author: "Dr. James Rodriguez",
    date: "2024-12-05",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600",
    slug: "chronic-pain-management",
  },
  {
    id: "4",
    title: "Nutrition Tips for Cancer Prevention",
    excerpt: "Research shows that diet plays a significant role in cancer risk. Our oncology dietitian shares practical eating guidelines.",
    category: "Nutrition",
    author: "Dr. Emily Watson",
    date: "2024-11-28",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600",
    slug: "nutrition-cancer-prevention",
  },
  {
    id: "5",
    title: "When to See a Neurologist: Warning Signs",
    excerpt: "Persistent headaches, numbness, or memory changes? Learn when neurological symptoms require professional evaluation.",
    category: "Neurology",
    author: "Dr. Michael Kim",
    date: "2024-11-20",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600",
    slug: "when-to-see-neurologist",
  },
  {
    id: "6",
    title: "The Benefits of Telemedicine Visits",
    excerpt: "Virtual visits can be just as effective as in-person appointments for many conditions. Discover when telemedicine is right for you.",
    category: "Technology",
    author: "AEGLE Staff",
    date: "2024-11-15",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600",
    slug: "benefits-of-telemedicine",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Gradient Hero */}
      <section className="gradient-hero text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-10" />
        <div className="hidden lg:block">
          <FloatingImages images={[
            { src: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=250&q=70", alt: "Health article", position: "top-4 right-[10%]", size: 100, animation: "animate-float-slow" },
            { src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=250&q=70", alt: "Telemedicine", position: "bottom-2 right-[25%]", size: 85, animation: "animate-float-medium", delay: "1.2s" },
          ]} />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">Health Blog</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Expert health tips, medical breakthroughs, and wellness insights from our physicians.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {posts[0] && (
        <section className="container mx-auto px-4 -mt-8 relative z-10 mb-12">
          <Link href={`/blog/${posts[0].slug}`}>
            <Card className="overflow-hidden hover:shadow-2xl transition-all group">
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <Image
                    src={posts[0].image}
                    alt={posts[0].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <Badge className="w-fit mb-3">{posts[0].category}</Badge>
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{posts[0].title}</h2>
                  <p className="text-muted-foreground mb-4">{posts[0].excerpt}</p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{posts[0].author}</span>
                    <span>·</span>
                    <span>{new Date(posts[0].date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>
                </CardContent>
              </div>
            </Card>
          </Link>
        </section>
      )}

      {/* Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2 duration-300 group h-full">
                  <div className="h-48 overflow-hidden relative">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-primary/90 text-white text-xs">{post.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-muted-foreground">
                        {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
                    <p className="text-xs font-medium text-primary">By {post.author}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
