"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  Minus,
  Plus,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  ChevronRight,
  Loader2,
  Microscope,
  Leaf,
} from "lucide-react";

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
  longDescription?: string;
  ingredients?: string;
  howToUse?: string;
  suitableFor?: string;
  brand?: string;
  weight?: string;
  volume?: string;
  rating?: number;
  reviewCount?: number;
  stock?: number;
}

/* ── Demo fallback ── */
const demoProducts: Product[] = [
  { id: "1", name: "Vitamin C Brightening Serum", slug: "vitamin-c-serum", price: 1499, comparePrice: 1999, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600", category: "Serums", badge: "Bestseller", rating: 4.8, reviewCount: 124, stock: 50, description: "A potent 15% Vitamin C serum that brightens skin, reduces dark spots, and boosts collagen production.", longDescription: "Our hero product — a clinically-tested Vitamin C serum formulated with L-Ascorbic Acid (15%), Hyaluronic Acid, and Vitamin E for a powerful antioxidant trifecta. Absorbs quickly, doesn't feel sticky, and works on all skin types.", ingredients: "Water, L-Ascorbic Acid (15%), Hyaluronic Acid, Vitamin E, Ferulic Acid, Niacinamide, Aloe Vera Extract", howToUse: "Apply 3-4 drops on cleansed face every morning before moisturiser and sunscreen. Avoid direct sun exposure.", suitableFor: "All skin types — especially dull, uneven, or hyperpigmented skin", brand: "AEGLE Derma", volume: "30ml" },
  { id: "2", name: "Hyaluronic Acid Moisturiser", slug: "hyaluronic-moisturiser", price: 999, comparePrice: 1499, image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600", category: "Moisturisers", rating: 4.6, reviewCount: 89, stock: 80, description: "Lightweight gel-cream moisturiser with triple-weight Hyaluronic Acid for deep, long-lasting hydration.", ingredients: "Water, Hyaluronic Acid (3 molecular weights), Ceramides, Squalane, Aloe Vera, Green Tea Extract", howToUse: "Apply generous amount on face and neck after serum, morning and evening.", suitableFor: "All skin types, ideal for dehydrated or oily skin", brand: "AEGLE Derma", volume: "50ml" },
  { id: "3", name: "SPF 50+ Sunscreen Gel", slug: "spf50-sunscreen", price: 799, comparePrice: 1099, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600", category: "Sunscreens", badge: "New", rating: 4.7, reviewCount: 56, stock: 120, description: "Ultra-light gel sunscreen with SPF 50+ PA++++. No white cast, non-greasy, perfect under makeup." },
  { id: "4", name: "Retinol Night Cream", slug: "retinol-night-cream", price: 1799, comparePrice: 2499, image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600", category: "Creams", rating: 4.5, reviewCount: 72, stock: 35, description: "Encapsulated Retinol (0.3%) night cream that fights wrinkles, improves texture, and boosts cell renewal while you sleep." },
  { id: "5", name: "Niacinamide Pore Minimiser Toner", slug: "niacinamide-toner", price: 699, comparePrice: 999, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600", category: "Toners", badge: "Popular", rating: 4.4, reviewCount: 103, stock: 200, description: "10% Niacinamide toner that controls oil, minimises pores, and evens out skin tone." },
  { id: "6", name: "Complete Anti-Aging Kit", slug: "anti-aging-kit", price: 3999, comparePrice: 5499, image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600", category: "Kits & Combos", badge: "Value Pack", rating: 4.9, reviewCount: 41, stock: 15, description: "Complete 5-step anti-aging routine with Retinol Cream, Vitamin C Serum, Eye Cream, Moisturiser, and SPF." },
  { id: "7", name: "Gentle Foaming Cleanser", slug: "foaming-cleanser", price: 599, comparePrice: 899, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600", category: "Cleansers", rating: 4.3, reviewCount: 67, stock: 150, description: "pH-balanced foam cleanser that gently removes impurities without stripping the skin barrier." },
  { id: "8", name: "Under Eye Repair Cream", slug: "under-eye-cream", price: 1299, comparePrice: 1799, image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600", category: "Eye Care", rating: 4.6, reviewCount: 38, stock: 60, description: "Peptide-rich eye cream that reduces dark circles, puffiness, and fine lines around the eyes." },
];

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/products?active=true");
        if (res.ok) {
          const data: Product[] = await res.json();
          const found = (data.length > 0 ? data : demoProducts).find((p) => p.slug === slug);
          setProduct(found || null);
        } else {
          setProduct(demoProducts.find((p) => p.slug === slug) || null);
        }
      } catch {
        setProduct(demoProducts.find((p) => p.slug === slug) || null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  function handleAdd() {
    if (!product) return;
    addItem(
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        comparePrice: product.comparePrice,
        image: product.image,
        category: product.category,
      },
      qty
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
        <p className="text-muted-foreground mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/shop"><Button>Back to Shop</Button></Link>
      </div>
    );
  }

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center text-sm text-muted-foreground gap-1">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/shop" className="hover:text-primary">Shop</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted border">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-primary text-white shadow-md text-sm">
                  {product.badge}
                </Badge>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <p className="text-sm text-primary font-medium uppercase tracking-wider mb-1">
                {product.brand || "AEGLE Derma"} · {product.category}
              </p>
              <h1 className="text-2xl md:text-3xl font-bold font-playfair mb-3">
                {product.name}
              </h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating!)
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{product.rating}</span>
                  {product.reviewCount && (
                    <span className="text-sm text-muted-foreground">
                      ({product.reviewCount} reviews)
                    </span>
                  )}
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-bold text-primary">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {product.comparePrice && product.comparePrice > product.price && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      ₹{product.comparePrice.toLocaleString("en-IN")}
                    </span>
                    <Badge variant="destructive" className="text-sm">
                      {discount}% OFF
                    </Badge>
                  </>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                {product.description || "Premium skin care product by AEGLE Derma."}
              </p>

              {product.volume && (
                <p className="text-sm text-muted-foreground mb-1">
                  <strong>Size:</strong> {product.volume}
                </p>
              )}
              {product.weight && (
                <p className="text-sm text-muted-foreground mb-4">
                  <strong>Weight:</strong> {product.weight}
                </p>
              )}

              {/* Stock status */}
              {product.stock !== undefined && (
                <p className={`text-sm font-medium mb-4 ${product.stock > 10 ? "text-green-600" : product.stock > 0 ? "text-amber-600" : "text-destructive"}`}>
                  {product.stock > 10
                    ? "In Stock"
                    : product.stock > 0
                    ? `Only ${product.stock} left`
                    : "Out of Stock"}
                </p>
              )}

              {/* Qty + Add To Cart */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="p-2 hover:bg-muted rounded-l-lg transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-5 font-medium min-w-[3rem] text-center">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="p-2 hover:bg-muted rounded-r-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAdd}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {added ? "Added!" : "Add to Cart"}
                </Button>
              </div>

              {/* Trust strip */}
              <div className="grid grid-cols-3 gap-3 border-t pt-5">
                {[
                  { icon: Truck, label: "Free Shipping 499+" },
                  { icon: ShieldCheck, label: "Genuine Products" },
                  { icon: RotateCcw, label: "7-Day Returns" },
                ].map((t) => (
                  <div key={t.label} className="flex flex-col items-center text-center gap-1.5">
                    <t.icon className="w-5 h-5 text-primary" />
                    <span className="text-xs text-muted-foreground">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs / Details */}
          {(product.longDescription || product.ingredients || product.howToUse || product.suitableFor) && (
            <div className="mt-12 grid md:grid-cols-2 gap-8">
              {product.longDescription && (
                <div>
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <Microscope className="w-5 h-5 text-primary" /> About This Product
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{product.longDescription}</p>
                </div>
              )}
              {product.ingredients && (
                <div>
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-primary" /> Ingredients
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{product.ingredients}</p>
                </div>
              )}
              {product.howToUse && (
                <div>
                  <h3 className="font-bold text-lg mb-3">How to Use</h3>
                  <p className="text-muted-foreground leading-relaxed">{product.howToUse}</p>
                </div>
              )}
              {product.suitableFor && (
                <div>
                  <h3 className="font-bold text-lg mb-3">Suitable For</h3>
                  <p className="text-muted-foreground leading-relaxed">{product.suitableFor}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
