"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShoppingBag,
  CreditCard,
  Truck,
  ShieldCheck,
  CheckCircle,
  ArrowLeft,
  Loader2,
  Lock,
} from "lucide-react";

export default function CheckoutPage() {
  const { items, itemCount, subtotal, savings, clearCart } = useCart();
  const [step, setStep] = useState<"info" | "processing" | "success">("info");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const shipping = subtotal >= 499 ? 0 : 49;
  const total = subtotal + shipping;

  async function handlePayment() {
    setStep("processing");

    try {
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          currency: "INR",
          receipt: `shop_${Date.now()}`,
          notes: {
            customer: form.name,
            email: form.email,
            phone: form.phone,
            items: items.map((i) => `${i.name} x${i.qty}`).join(", "),
          },
        }),
      });

      const data = await res.json();
      if (!data.orderId) throw new Error("Order creation failed");

      // Check if Razorpay is loaded
      if (typeof window !== "undefined" && window.Razorpay) {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: data.amount,
          currency: "INR",
          name: "AEGLE Skin Care Shop",
          description: `${itemCount} item${itemCount !== 1 ? "s" : ""} — Order`,
          order_id: data.orderId,
          handler: async function (response: Record<string, string>) {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            if (verifyRes.ok) {
              clearCart();
              setStep("success");
            } else {
              setStep("info");
              alert("Payment verification failed. Please try again or contact support.");
            }
          },
          prefill: {
            name: form.name,
            email: form.email,
            contact: form.phone,
          },
          theme: { color: "#BE185D" },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", () => {
          setStep("info");
          alert("Payment failed. Please try again.");
        });
        rzp.open();
      } else {
        // Demo mode — Razorpay not loaded
        setTimeout(() => {
          clearCart();
          setStep("success");
        }, 2000);
      }
    } catch {
      setStep("info");
      alert("Something went wrong. Please try again.");
    }
  }

  const isFormValid = form.name && form.email && form.phone && form.address && form.city && form.state && form.pincode;

  // ── Success State ──
  if (step === "success") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="p-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Order Placed!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for shopping with AEGLE. You&apos;ll receive a confirmation email shortly.
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/shop">
                <Button className="w-full">Continue Shopping</Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full">Back to Home</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  // ── Empty Cart ──
  if (items.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="p-8">
            <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Add some products to checkout.</p>
            <Link href="/shop"><Button>Browse Products</Button></Link>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30">
      {/* Razorpay script */}
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />

      {/* Header */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/shop" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-green-600" />
            <span className="text-sm text-muted-foreground">Secure Checkout</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold font-playfair mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Shipping Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Doe" required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input id="phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="9876543210" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" required />
                </div>
                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Input id="address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="House no, street name" required />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input id="state" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} required />
                  </div>
                  <div>
                    <Label htmlFor="pincode">PIN Code *</Label>
                    <Input id="pincode" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} required />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Truck, label: "Free Shipping on 499+" },
                { icon: ShieldCheck, label: "100% Genuine Products" },
                { icon: Lock, label: "Secured by Razorpay" },
              ].map((t) => (
                <div key={t.label} className="flex flex-col items-center text-center gap-1.5 bg-background rounded-lg border p-3">
                  <t.icon className="w-5 h-5 text-primary" />
                  <span className="text-xs text-muted-foreground">{t.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-muted shrink-0 relative">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.qty}</p>
                        <p className="text-sm font-bold text-primary">
                          ₹{(item.price * item.qty).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <hr />

                {/* Totals */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Savings</span>
                      <span>-₹{savings.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? <Badge variant="secondary" className="text-xs">FREE</Badge> : `₹${shipping}`}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handlePayment}
                  disabled={!isFormValid || step === "processing"}
                >
                  {step === "processing" ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" /> Pay ₹{total.toLocaleString("en-IN")}
                    </>
                  )}
                </Button>

                {!isFormValid && (
                  <p className="text-xs text-muted-foreground text-center">
                    Fill in all shipping details to proceed
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
