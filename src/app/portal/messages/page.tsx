"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

const messages = [
  { id: "1", from: "Dr. Sarah Chen", subject: "Follow-up results review", date: "Dec 21, 2024", body: "Hi John, I've reviewed your latest lipid panel results. Your LDL is slightly elevated. Let's discuss this at your next appointment.", unread: true },
  { id: "2", from: "Pharmacy", subject: "Prescription renewal reminder", date: "Dec 18, 2024", body: "Your Metformin 500mg prescription has 2 refills remaining. Please contact us when ready to refill.", unread: false },
  { id: "3", from: "Billing Dept", subject: "Statement available", date: "Dec 15, 2024", body: "Your December billing statement is now available in the Billing section of your portal.", unread: false },
];

export default function MessagesPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [composing, setComposing] = useState(false);

  const selectedMsg = messages.find((m) => m.id === selected);

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-primary text-white py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/portal/dashboard" className="text-white/80 hover:text-white text-sm">← Dashboard</Link>
            <h1 className="text-lg font-bold">Messages</h1>
          </div>
          <Button size="sm" className="bg-white text-primary hover:bg-white/90" onClick={() => { setComposing(true); setSelected(null); }}>
            New Message
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-2">
            {messages.map((msg) => (
              <Card
                key={msg.id}
                className={`cursor-pointer transition-colors ${selected === msg.id ? "border-primary" : ""}`}
                onClick={() => { setSelected(msg.id); setComposing(false); }}
              >
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-medium ${msg.unread ? "text-primary" : ""}`}>
                      {msg.unread && "● "}{msg.from}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{msg.subject}</p>
                  <p className="text-xs text-muted-foreground">{msg.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="md:col-span-2">
            {composing ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">New Message</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select options={[
                    { value: "", label: "Select recipient..." },
                    { value: "dr-chen", label: "Dr. Sarah Chen - Cardiology" },
                    { value: "dr-kim", label: "Dr. Michael Kim - Neurology" },
                    { value: "pharmacy", label: "Pharmacy" },
                    { value: "billing", label: "Billing Department" },
                  ]} />
                  <Textarea placeholder="Type your message..." rows={6} />
                  <div className="flex gap-2">
                    <Button>Send</Button>
                    <Button variant="outline" onClick={() => setComposing(false)}>Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            ) : selectedMsg ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{selectedMsg.subject}</CardTitle>
                  <p className="text-sm text-muted-foreground">From: {selectedMsg.from} • {selectedMsg.date}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedMsg.body}</p>
                  <div className="mt-6">
                    <Textarea placeholder="Reply..." rows={3} />
                    <Button className="mt-2" size="sm">Send Reply</Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  Select a message to read, or compose a new message.
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
