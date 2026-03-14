"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PortalRegisterPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
        <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-lg"><p className="text-4xl mb-3">✅</p><h2 className="text-xl font-bold mb-2">Registration Complete!</h2><p className="text-muted-foreground mb-4">A verification email has been sent. Please verify your email to activate your account.</p><Link href="/portal/login"><Button className="w-full">Go to Login</Button></Link></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center"><h1 className="text-3xl font-bold">Create Account</h1><p className="text-muted-foreground mt-1">Step {step} of 2</p></div>
        <form onSubmit={(e) => { e.preventDefault(); if (step === 1) setStep(2); else setSubmitted(true); }} className="rounded-2xl border bg-card p-6 space-y-4 shadow-lg">
          {step === 1 ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2"><div><Label>First Name</Label><Input required /></div><div><Label>Last Name</Label><Input required /></div></div>
              <div><Label>Date of Birth</Label><Input type="date" required /></div>
              <div><Label>Medical Record Number (optional)</Label><Input placeholder="Found on your discharge papers" /></div>
            </>
          ) : (
            <>
              <div><Label>Email</Label><Input type="email" required /></div>
              <div><Label>Phone</Label><Input type="tel" required /></div>
              <div><Label>Password</Label><Input type="password" required minLength={8} placeholder="Minimum 8 characters" /></div>
              <div><Label>Confirm Password</Label><Input type="password" required /></div>
            </>
          )}
          <div className="flex gap-3">
            {step === 2 && <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>}
            <Button type="submit" className="flex-1">{step === 1 ? "Next" : "Create Account"}</Button>
          </div>
        </form>
        <p className="text-center text-sm text-muted-foreground">Already have an account? <Link href="/portal/login" className="text-primary hover:underline font-medium">Sign in</Link></p>
      </div>
    </div>
  );
}
