"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { billingFaqs } from "@/data/faq";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function BillingPage() {
  const [step, setStep] = useState<"lookup" | "pay">("lookup");
  const [accountId, setAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handlePayment() {
    setStatus("loading");
    try {
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(amount),
          currency: "INR",
          receipt: `bill_${accountId}`,
          notes: { accountId, type: "clinic-bill" },
        }),
      });
      const data = await res.json();
      if (!data.orderId) throw new Error("Order creation failed");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "AEGLE Skin Care Clinic",
        description: `Bill Payment - Account #${accountId}`,
        order_id: data.orderId,
        handler: async function (response: any) {
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
            setStatus("success");
          } else {
            setStatus("error");
          }
        },
        prefill: { name: "", email: "", contact: "" },
        theme: { color: "#1d4ed8" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => setStatus("error"));
      rzp.open();
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <PageHero
        title="Pay Your Bill"
        subtitle="Secure, easy online bill payment powered by Razorpay."
        breadcrumbs={[{ label: "Billing" }]}
      />

      {/* Razorpay script */}
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {status === "success" ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="text-5xl mb-4">✅</div>
                    <h2 className="text-2xl font-bold mb-2 text-green-600">Payment Successful!</h2>
                    <p className="text-muted-foreground mb-6">
                      Your payment has been processed successfully. A receipt has been sent to your email.
                    </p>
                    <div className="flex gap-3 justify-center">
                      <Button variant="outline" onClick={() => { setStatus("idle"); setStep("lookup"); }}>
                        Pay Another Bill
                      </Button>
                      <Link href="/portal">
                        <Button>View in Portal</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {step === "lookup" ? "Find Your Bill" : "Make a Payment"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {step === "lookup" ? (
                      <>
                        <p className="text-sm text-muted-foreground">
                          Enter your account number or invoice ID to look up your bill.
                          You can find this on your billing statement.
                        </p>
                        <div>
                          <Label htmlFor="accountId">Account / Invoice Number</Label>
                          <Input
                            id="accountId"
                            value={accountId}
                            onChange={(e) => setAccountId(e.target.value)}
                            placeholder="e.g., INV-2024-001234"
                          />
                        </div>
                        <Button
                          onClick={() => accountId && setStep("pay")}
                          disabled={!accountId}
                        >
                          Look Up Bill
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="p-4 rounded-lg bg-muted/50">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Account</span>
                            <span className="font-medium">{accountId}</span>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="amount">Payment Amount (₹)</Label>
                          <Input
                            id="amount"
                            type="number"
                            min="1"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                          />
                        </div>
                        {status === "error" && (
                          <p className="text-destructive text-sm">
                            Payment failed. Please try again or contact billing support.
                          </p>
                        )}
                        <div className="flex gap-3">
                          <Button variant="outline" onClick={() => setStep("lookup")}>
                            Back
                          </Button>
                          <Button
                            onClick={handlePayment}
                            disabled={!amount || parseFloat(amount) <= 0 || status === "loading"}
                          >
                            {status === "loading" ? "Processing..." : `Pay ₹${amount || "0"}`}
                          </Button>
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                          <Badge variant="outline" className="text-xs">🔒 Secured by Razorpay</Badge>
                          <Badge variant="outline" className="text-xs">PCI DSS Compliant</Badge>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-3 text-sm">
                  <h3 className="font-semibold text-foreground">Payment Methods</h3>
                  <p className="text-muted-foreground">We accept:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>💳 Credit & Debit Cards</li>
                    <li>🏦 Net Banking</li>
                    <li>📱 UPI (Google Pay, PhonePe, etc.)</li>
                    <li>👛 Wallets (Paytm, etc.)</li>
                    <li>🏧 EMI Options</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-sm space-y-2">
                  <h3 className="font-semibold text-foreground">Need Help?</h3>
                  <p className="text-muted-foreground">
                    Contact our billing department for questions about your bill.
                  </p>
                  <p>
                    📞{" "}
                    <a href="tel:+18005559012" className="text-primary font-medium">
                      (800) 555-9012
                    </a>
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Mon-Fri: 8am - 6pm
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-sm">
                  <h3 className="font-semibold text-foreground mb-3">Billing FAQs</h3>
                  <div className="space-y-3">
                    {billingFaqs.map((faq) => (
                      <div key={faq.question}>
                        <p className="font-medium text-foreground">{faq.question}</p>
                        <p className="text-muted-foreground text-xs mt-1">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
