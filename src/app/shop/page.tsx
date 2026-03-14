"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  Sparkles,
  Microscope,
  Leaf,
  Gem,
  Shield,
  Search,
  SlidersHorizontal,
  Star,
  ArrowRight,
  Loader2,
} from "lucide-react";

/* ── Types ── */
interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  image: string;
  category: string;
  badge?: string | null;
  description?: string;
  rating?: number;
  reviewCount?: number;
  stock?: number;
  active?: boolean;
}

/* ── Demo fallback ── */
const demoProducts: Product[] = [
  { id: "1", name: "Vitamin C Brightening Serum", slug: "vitamin-c-serum", price: 1499, comparePrice: 1999, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400", category: "Serums", badge: "Bestseller", rating: 4.8, reviewCount: 124 },
  { id: "2", name: "Hyaluronic Acid Moisturiser", slug: "hyaluronic-moisturiser", price: 999, comparePrice: 1499, image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400", category: "Moisturisers", rating: 4.6, reviewCount: 89 },
  { id: "3", name: "SPF 50+ Sunscreen Gel", slug: "spf50-sunscreen", price: 799, comparePrice: 1099, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400", category: "Sunscreens", badge: "New", rating: 4.7, reviewCount: 56 },
  { id: "4", name: "Retinol Night Cream", slug: "retinol-night-cream", price: 1799, comparePrice: 2499, image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400", category: "Creams", rating: 4.5, reviewCount: 72 },
  { id: "5", name: "Niacinamide Pore Minimiser Toner", slug: "niacinamide-toner", price: 699, comparePrice: 999, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400", category: "Toners", badge: "Popular", rating: 4.4, reviewCount: 103 },
  { id: "6", name: "Complete Anti-Aging Kit", slug: "anti-aging-kit", price: 3999, comparePrice: 5499, image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400", category: "Kits & Combos", badge: "Value Pack", rating: 4.9, reviewCount: 41 },
  { id: "7", name: "Gentle Foaming Cleanser", slug: "foaming-cleanser", price: 599, comparePrice: 899, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400", category: "Cleansers", rating: 4.3, reviewCount: 67 },
  { id: "8", name: "Under Eye Repair Cream", slug: "under-eye-cream", price: 1299, comparePrice: 1799, image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400", category: "Eye Care", rating: 4.6, reviewCount: 38 },
];

const shopCategories = ["All", "Serums", "Moisturisers", "Sunscreens", "Creams", "Toners", "Cleansers", "Kits & Combos", "Eye Care"];

const trustBadges = [
  { icon: Microscope, label: "Dermatologist Formulated" },
  { icon: Leaf, label: "Paraben & Sulphate Free" },
  { icon: Gem, label: "Premium Ingredients" },
  { icon: Shield, label: "Clinically Tested" },
];

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

export default function ShopPage() {
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/products?active=true");
        if (res.ok) {
          const data = await res.json();
          setProducts(Array.isArray(data) && data.length > 0 ? data : demoProducts);
        } else {
          setProducts(demoProducts);
        }
      } catch {
        setProducts(demoProducts);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = products
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .filter((p) => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });

  function handleAddToCart(p: Product) {
    addItem({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: p.price,
      comparePrice: p.comparePrice,
      image: p.image,
      category: p.category,
    });
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="gradient-hero text-white py-14">
        <div className="container mx-auto px-4 text-center">
          <Sparkles className="w-8 h-8 mx-auto mb-3 text-gold" />
          <h1 className="text-3xl md:text-4xl font-bold font-playfair mb-3">AEGLE Skin Care Shop</h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Premium, dermatologist-recommended products for every skin type. Clinical-grade ingredients, luxurious textures.
          </p>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {trustBadges.map((b) => (
              <div key={b.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <b.icon className="w-4 h-4 text-primary" />
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <section className="sticky top-16 z-30 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative flex-1 w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border rounded-lg px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto mt-3 pb-1">
            {shopCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-primary/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <span className="ml-3 text-muted-foreground">Loading products...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-1">No products found</h3>
              <p className="text-sm text-muted-foreground">Try a different search or category.</p>
              <Button variant="outline" className="mt-4" onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Showing {filtered.length} product{filtered.length !== 1 && "s"}
                {activeCategory !== "All" && ` in ${activeCategory}`}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filtered.map((product) => (
                  <div key={product.id} className="group bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
                    <Link href={`/shop/${product.slug}`}>
                      <div className="relative aspect-square bg-muted overflow-hidden">
                        <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:768px) 50vw,(max-width:1200px) 33vw,25vw" />
                        {product.badge && (
                          <Badge className="absolute top-2 left-2 bg-primary text-white text-xs shadow-sm">{product.badge}</Badge>
                        )}
                        {product.comparePrice && product.comparePrice > product.price && (
                          <Badge variant="destructive" className="absolute top-2 right-2 text-xs">
                            -{Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}%
                          </Badge>
                        )}
                      </div>
                    </Link>
                    <div className="p-3 md:p-4">
                      <p className="text-xs text-primary font-medium uppercase tracking-wider mb-1">{product.category}</p>
                      <Link href={`/shop/${product.slug}`}>
                        <h3 className="font-semibold text-sm md:text-base leading-tight line-clamp-2 hover:text-primary transition-colors">{product.name}</h3>
                      </Link>
                      {product.rating && (
                        <div className="flex items-center gap-1 mt-1.5">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-xs font-medium">{product.rating}</span>
                          {product.reviewCount && <span className="text-xs text-muted-foreground">({product.reviewCount})</span>}
                        </div>
                      )}
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-lg font-bold text-primary">₹{product.price.toLocaleString("en-IN")}</span>
                        {product.comparePrice && product.comparePrice > product.price && (
                          <span className="text-sm text-muted-foreground line-through">₹{product.comparePrice.toLocaleString("en-IN")}</span>
                        )}
                      </div>
                      <Button size="sm" className="w-full mt-3" onClick={() => handleAddToCart(product)}>
                        <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary/5 border-t py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold font-playfair mb-3">Need personalised recommendations?</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-6">
            Book a consultation with our dermatologists to find the perfect routine for your skin type and concerns.
          </p>
          <Link href="/appointment">
            <Button size="lg">Book Consultation <ArrowRight className="w-4 h-4 ml-2" /></Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
