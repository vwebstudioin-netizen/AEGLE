import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/badge";

const posts: Record<string, { title: string; date: string; category: string; author: string; content: string[] }> = {
  "advances-in-robotic-surgery": { title: "Advances in Robotic Surgery at AEGLE", date: "January 15, 2025", category: "Innovation", author: "Dr. Sarah Chen", content: ["AEGLE Skin Care Clinic has expanded its robotic surgery program with the addition of two new da Vinci Xi surgical systems. This investment allows our surgeons to perform minimally invasive procedures with greater precision, smaller incisions, and faster recovery times.", "The new systems will be utilized across multiple specialties including urology, gynecology, general surgery, and cardiothoracic surgery. Patients can expect shorter clinic visits and reduced post-operative pain.", "\"Robotic-assisted surgery represents the future of surgical care,\" said Dr. Sarah Chen, Chief of Robotic Surgery. \"These systems allow us to operate with sub-millimeter precision while causing minimal trauma to surrounding tissue.\""] },
  "heart-health-awareness-month": { title: "February is Heart Health Awareness Month", date: "February 1, 2025", category: "Community Health", author: "Dr. Michael Brooks", content: ["Heart disease remains the leading cause of death in the United States. This February, AEGLE Skin Care Clinic joins the national effort to raise awareness about cardiovascular health.", "Our cardiology team is offering free blood pressure screenings every Saturday in February at all three of our locations. We encourage everyone over 40 to take advantage of this opportunity.", "Simple lifestyle changes—regular exercise, a heart-healthy diet, stress management, and avoiding tobacco—can significantly reduce your risk of heart disease."] },
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
  const post = posts[slug] || { title: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), date: "2025", category: "General", author: "Staff", content: ["This article is coming soon."] };

  return (
    <>
      <PageHero title={post.title} subtitle={`By ${post.author} • ${post.date}`} breadcrumbs={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />
      <article className="container mx-auto px-4 py-16 max-w-3xl">
        <Badge className="mb-6">{post.category}</Badge>
        <div className="prose dark:prose-invert max-w-none">{post.content.map((p, i) => (<p key={i}>{p}</p>))}</div>
        <div className="mt-10 border-t pt-6"><Link href="/blog" className="text-primary hover:underline">← Back to Blog</Link></div>
      </article>
    </>
  );
}
