"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const { items, itemCount, subtotal, savings, isOpen, closeCart, updateQty, removeItem, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-background border-l shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="font-bold text-lg">Your Cart</h2>
            <span className="text-sm text-muted-foreground">({itemCount} items)</span>
          </div>
          <button onClick={closeCart} className="p-1 rounded-md hover:bg-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <h3 className="font-semibold text-lg mb-1">Cart is empty</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Browse our skin care products and add your favourites.
            </p>
            <Link href="/shop" onClick={closeCart}>
              <Button>
                Start Shopping <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 rounded-xl border bg-card hover:shadow-sm transition-shadow"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0 relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/shop/${item.slug}`}
                      onClick={closeCart}
                      className="text-sm font-semibold hover:text-primary transition-colors line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-muted-foreground capitalize">{item.category}</p>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-bold text-primary">
                        ₹{item.price.toLocaleString("en-IN")}
                      </span>
                      {item.comparePrice && item.comparePrice > item.price && (
                        <span className="text-xs text-muted-foreground line-through">
                          ₹{item.comparePrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>

                    {/* Qty Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 border rounded-lg">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="p-1 hover:bg-muted rounded-l-lg transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-sm font-medium min-w-[2rem] text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="p-1 hover:bg-muted rounded-r-lg transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t p-4 space-y-3 bg-muted/30">
              {savings > 0 && (
                <div className="flex items-center justify-between text-sm text-green-600 bg-green-50 dark:bg-green-900/20 rounded-lg px-3 py-2">
                  <span>You save</span>
                  <span className="font-bold">₹{savings.toLocaleString("en-IN")}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-xl font-bold">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <p className="text-xs text-muted-foreground">Shipping, taxes calculated at checkout</p>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={clearCart} className="shrink-0">
                  Clear
                </Button>
                <Link href="/checkout" onClick={closeCart} className="flex-1">
                  <Button className="w-full">
                    Checkout <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
