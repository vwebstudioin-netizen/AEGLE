import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/shared/SectionHeader";

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
    <>
      <PageHero
        title="Health Blog"
        subtitle="Expert health tips, medical breakthroughs, and wellness insights from our physicians."
        breadcrumbs={[{ label: "Blog" }]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="h-48 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
                  <p className="text-xs text-muted-foreground">By {post.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
