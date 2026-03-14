import Link from "next/link";
import Image from "next/image";
import { SITE_NAME, CONTACT_PHONE } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: `Reviews — ${SITE_NAME}`,
  description: "Read real client reviews and testimonials about their experience at AEGLE Skin Care Clinic. See why we are Bangalore's most trusted skin care destination.",
};

const reviews = [
  { name: "Priya R.", rating: 5, treatment: "Skin Lightening", text: "Absolutely amazing results! My skin looks so much brighter and healthier after just 3 sessions. Dr. Surekha is incredibly skilled and makes you feel so comfortable.", date: "2 weeks ago", avatar: "PR" },
  { name: "Meera S.", rating: 5, treatment: "Botox & Fillers", text: "Best experience I've had at any clinic. The staff is professional, the facility is world-class, and the results speak for themselves. Highly recommend AEGLE!", date: "1 month ago", avatar: "MS" },
  { name: "Anjali K.", rating: 5, treatment: "Laser Hair Removal", text: "I've been wanting to get laser hair removal for years and finally did it at AEGLE. Painless, quick, and effective. Already seeing 80% reduction after 4 sessions!", date: "3 weeks ago", avatar: "AK" },
  { name: "Lakshmi V.", rating: 4, treatment: "Facial & Cleanup", text: "The Korean Glass Skin treatment was divine! My skin has never felt this smooth and dewy. The ambience of the clinic is so luxurious too.", date: "1 month ago", avatar: "LV" },
  { name: "Sneha T.", rating: 5, treatment: "Acne Treatment", text: "After struggling with acne for 5 years, AEGLE finally helped me get clear skin. Dr. Nithya's treatment plan was perfect. I wish I had come here sooner!", date: "2 months ago", avatar: "ST" },
  { name: "Divya M.", rating: 5, treatment: "Bridal Package", text: "Got the bridal package 2 months before my wedding. My skin was GLOWING on my big day! Every relative asked about my secret. Thank you AEGLE team!", date: "3 weeks ago", avatar: "DM" },
  { name: "Kavitha N.", rating: 5, treatment: "Hair PRP", text: "Was worried about hair thinning and AEGLE's PRP treatment has been life-changing. Seeing significant new growth after 4 sessions. Truly grateful!", date: "1 month ago", avatar: "KN" },
  { name: "Rashmi P.", rating: 4, treatment: "Chemical Peel", text: "Great results with the chemical peel for my pigmentation. The team explained everything in detail and the aftercare guidance was excellent.", date: "2 months ago", avatar: "RP" },
  { name: "Sunita G.", rating: 5, treatment: "Anti-Aging", text: "I look 10 years younger! The combination of Ultherapy and Morpheus 8 has done wonders for my skin. AEGLE is worth every rupee.", date: "1 month ago", avatar: "SG" },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? "text-yellow-400" : "text-gray-300"}>★</span>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="gradient-hero text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">Client Reviews</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Real stories from real people — discover why AEGLE is Bangalore&apos;s most loved skin care clinic.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <span className="text-5xl font-bold">{avgRating}</span>
            <div>
              <Stars count={Math.round(Number(avgRating))} />
              <p className="text-sm text-white/70 mt-1">Based on {reviews.length}+ reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image Banner */}
      <section className="container mx-auto px-4 py-10">
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl">
          <Image
            src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=80"
            alt="Happy client after AEGLE skin care treatment"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <p className="text-lg font-semibold">Real Results, Real People</p>
            <p className="text-sm text-white/80">See what our clients say about their skin transformation</p>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {r.avatar}
                  </div>
                  <div>
                    <p className="font-semibold">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.date}</p>
                  </div>
                </div>
                <Stars count={r.rating} />
                <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                  {r.treatment}
                </span>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Join Our Happy Clients</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Experience the AEGLE difference — book your consultation today and start your skin transformation journey.
          </p>
          <Link href="/appointment">
            <Button size="lg" className="bg-primary text-white hover:bg-primary-dark px-8">
              Book Consultation
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
