import Link from "next/link";
import Image from "next/image";
import { SITE_NAME, CONTACT_PHONE } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: `Shop — ${SITE_NAME}`,
  description: "Shop premium, dermatologist-recommended skin care products at AEGLE. Serums, moisturisers, sunscreens, and curated kits for every skin type.",
};

const demoProducts = [
  { id: "1", name: "Vitamin C Brightening Serum", slug: "vitamin-c-serum", price: 1499, comparePrice: 1999, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400", category: "Serums", badge: "Bestseller" },
  { id: "2", name: "Hyaluronic Acid Moisturiser", slug: "hyaluronic-moisturiser", price: 999, comparePrice: 1499, image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400", category: "Moisturisers", badge: null },
  { id: "3", name: "SPF 50+ Sunscreen", slug: "spf50-sunscreen", price: 799, comparePrice: 1099, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400", category: "Sunscreens", badge: "New" },
  { id: "4", name: "Retinol Night Cream", slug: "retinol-night-cream", price: 1799, comparePrice: 2499, image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400", category: "Creams", badge: null },
  { id: "5", name: "Niacinamide Toner", slug: "niacinamide-toner", price: 699, comparePrice: 999, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400", category: "Toners", badge: "Popular" },
  { id: "6", name: "Anti-Aging Kit", slug: "anti-aging-kit", price: 3999, comparePrice: 5499, image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400", category: "Kits & Combos", badge: "Value Pack" },
  { id: "7", name: "Gentle Foaming Cleanser", slug: "foaming-cleanser", price: 599, comparePrice: 899, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400", category: "Cleansers", badge: null },
  { id: "8", name: "Under Eye Repair Cream", slug: "under-eye-cream", price: 1299, comparePrice: 1799, image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400", category: "Eye Care", badge: null },
];

const shopCategories = ["All", "Serums", "Moisturisers", "Sunscreens", "Creams", "Toners", "Cleansers", "Kits & Combos", "Eye Care"];

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="gradient-hero text-white py-14">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">AEGLE Shop</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Premium, dermatologist-formulated products for radiant skin — curated by our experts, loved by thousands.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-6 border-b border-border sticky top-16 lg:top-20 bg-background/95 backdrop-blur-md z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {shopCategories.map((cat) => (
              <span key={cat} className="px-4 py-1.5 rounded-full border border-border text-sm font-medium hover:bg-primary hover:text-white cursor-pointer transition-colors">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {demoProducts.map((p) => (
              <div key={p.id} className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  {p.badge && (
                    <span className="absolute top-2 left-2 text-xs font-bold bg-primary text-white px-2 py-1 rounded-full">
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <span className="text-xs text-muted-foreground">{p.category}</span>
                  <h3 className="font-semibold text-sm mt-1 line-clamp-2 group-hover:text-primary transition-colors">{p.name}</h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-bold text-primary">₹{p.price.toLocaleString()}</span>
                    {p.comparePrice && (
                      <span className="text-xs text-muted-foreground line-through">₹{p.comparePrice.toLocaleString()}</span>
                    )}
                  </div>
                  <Button className="w-full mt-3 bg-primary text-white hover:bg-primary-dark text-sm h-9">
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 text-muted-foreground">
            <p>More products coming soon! Our dermatologists are curating the best skin care range for you.</p>
          </div>
        </div>
      </section>

      {/* Why AEGLE Products */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-8">Why AEGLE Products?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🔬", title: "Clinically Tested", desc: "Every product is tested and approved by our dermatologists" },
              { icon: "🌿", title: "Clean Ingredients", desc: "No parabens, sulfates, or harmful chemicals" },
              { icon: "💎", title: "Premium Quality", desc: "Medical-grade formulations for visible results" },
              { icon: "🛡️", title: "Safe & Effective", desc: "Suitable for all skin types including sensitive skin" },
            ].map((f) => (
              <div key={f.title} className="bg-card rounded-xl p-6 border border-border">
                <span className="text-3xl block mb-3">{f.icon}</span>
                <h3 className="font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
