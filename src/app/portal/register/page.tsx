"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, CheckCircle } from "lucide-react";

export default function PortalRegisterPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-lg">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-bold mb-2">Registration Complete!</h2>
          <p className="text-muted-foreground mb-4">
            A verification email has been sent. Please verify your email to activate your account.
          </p>
          <Link href="/portal/login">
            <Button className="w-full">Go to Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left — background image */}
      <div className="relative hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80"
          alt="Skin Treatment"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/70 to-primary/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-10 text-center">
          <h2 className="text-3xl font-bold mb-3">Join AEGLE</h2>
          <p className="text-white/85 max-w-sm">
            Create your patient account to book appointments, view treatment plans, and access exclusive offers.
          </p>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center bg-background px-4 py-12">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
              <UserPlus className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="text-muted-foreground mt-1">Step {step} of 2</p>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2">
            <div className={`h-2 rounded-full transition-all ${step >= 1 ? "w-8 bg-primary" : "w-2 bg-muted"}`} />
            <div className={`h-2 rounded-full transition-all ${step >= 2 ? "w-8 bg-primary" : "w-2 bg-muted"}`} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (step === 1) setStep(2);
              else setSubmitted(true);
            }}
            className="rounded-2xl border bg-card p-6 space-y-4 shadow-lg"
          >
            {step === 1 ? (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><Label>First Name</Label><Input required className="mt-1" /></div>
                  <div><Label>Last Name</Label><Input required className="mt-1" /></div>
                </div>
                <div><Label>Date of Birth</Label><Input type="date" required className="mt-1" /></div>
                <div><Label>Medical Record Number (optional)</Label><Input placeholder="Found on your discharge papers" className="mt-1" /></div>
              </>
            ) : (
              <>
                <div><Label>Email</Label><Input type="email" required className="mt-1" /></div>
                <div><Label>Phone</Label><Input type="tel" required className="mt-1" /></div>
                <div><Label>Password</Label><Input type="password" required minLength={8} placeholder="Minimum 8 characters" className="mt-1" /></div>
                <div><Label>Confirm Password</Label><Input type="password" required className="mt-1" /></div>
              </>
            )}
            <div className="flex gap-3">
              {step === 2 && (
                <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>
                  Back
                </Button>
              )}
              <Button type="submit" className="flex-1">
                {step === 1 ? "Next" : "Create Account"}
              </Button>
            </div>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/portal/login" className="text-primary hover:underline font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
