"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { SITE_NAME, CONTACT_PHONE } from "@/lib/constants";

/* ── Types ── */
interface Message {
  id: string;
  from: "bot" | "user";
  text: string;
  time: string;
}

interface ChatApiMessage {
  role: "user" | "assistant";
  content: string;
}

/* ── Treatment quick-pick options ── */
const TREATMENT_OPTIONS = [
  "Skin Treatment",
  "Face Treatment",
  "Facials",
  "Hair Treatment",
  "Body Treatment",
  "Laser Treatment",
  "Plastic Surgery",
  "Cosmetic Dermatology",
  "General Consultation",
];

/* ── Helpers ── */
const now = () =>
  new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

const uid = () => Math.random().toString(36).slice(2, 8);

/* ── Phone & name extraction helpers ── */
const extractPhone = (text: string): string | null => {
  const cleaned = text.replace(/[\s\-+()]/g, "").replace(/^91/, "");
  const match = cleaned.match(/[6-9]\d{9}/);
  return match ? match[0] : null;
};

const isConfirmation = (text: string): boolean => {
  const lower = text.toLowerCase().trim();
  return ["yes", "y", "submit", "confirm", "sure", "ok", "okay", "yep", "yeah", "ha", "haan"].includes(lower);
};

export default function AIChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatApiMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  // Collected lead info (extracted from conversation)
  const [collectedName, setCollectedName] = useState("");
  const [collectedPhone, setCollectedPhone] = useState("");
  const [collectedInterest, setCollectedInterest] = useState("");
  const [awaitingConfirm, setAwaitingConfirm] = useState(false);
  const [showQuickPicks, setShowQuickPicks] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* auto-scroll */
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  /* delayed entry + tooltip pulse */
  useEffect(() => {
    const t1 = setTimeout(() => setShowBtn(true), 1800);
    const t2 = setTimeout(() => setShowTooltip(true), 4000);
    const t3 = setTimeout(() => setShowTooltip(false), 10000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  /* push bot message into UI */
  const botSay = useCallback((text: string) => {
    setMessages((prev) => [...prev, { id: uid(), from: "bot", text, time: now() }]);
  }, []);

  /* call OpenAI via /api/chat */
  const getAIResponse = async (history: ChatApiMessage[]): Promise<string> => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json();
      return data.reply || "Could you say that again?";
    } catch {
      return `I'm having a brief issue. Please call us at ${CONTACT_PHONE}! 💜`;
    }
  };

  /* submit enquiry to /api/enquiry */
  const submitEnquiry = async (n: string, p: string, i: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: n, phone: p, interest: i }),
      });
      return res.ok;
    } catch {
      return false;
    }
  };

  /* open chat & send initial greeting via AI */
  const handleOpen = async () => {
    setOpen(true);
    if (chatHistory.length === 0 && messages.length === 0) {
      setLoading(true);
      // First message: Aura greets the user (AI-generated)
      const greetMsg: ChatApiMessage = { role: "user", content: "[System: A new visitor has opened the chat widget. Greet them warmly and ask for their name.]" };
      const reply = await getAIResponse([greetMsg]);
      const assistantMsg: ChatApiMessage = { role: "assistant", content: reply };
      setChatHistory([assistantMsg]);
      botSay(reply);
      setLoading(false);
    }
  };

  /* detect what info the AI is asking for (to show quick-picks) */
  const detectContext = (aiReply: string) => {
    const lower = aiReply.toLowerCase();
    // Show treatment quick-picks when AI asks about interest/treatment
    if (
      (lower.includes("treatment") || lower.includes("interested") || lower.includes("consultation") || lower.includes("looking for")) &&
      !collectedInterest &&
      collectedName &&
      collectedPhone
    ) {
      setShowQuickPicks(true);
    } else {
      setShowQuickPicks(false);
    }

    // Detect if AI is asking for confirmation (has the 📋 format)
    if (lower.includes("shall i submit") || lower.includes("confirm")) {
      setAwaitingConfirm(true);
    }
  };

  /* extract collected info from conversation */
  const processUserMessage = (text: string) => {
    // Try to extract phone number
    const phone = extractPhone(text);
    if (phone && !collectedPhone) {
      setCollectedPhone(phone);
    }

    // If we have no name yet and text looks like a name (2+ chars, no digits, not a treatment)
    if (!collectedName && text.length >= 2 && !/\d/.test(text) && !TREATMENT_OPTIONS.some(t => t.toLowerCase() === text.toLowerCase())) {
      // Heuristic: if it's early in conversation (< 3 messages from user), treat as name
      const userMsgCount = messages.filter(m => m.from === "user").length;
      if (userMsgCount <= 1) {
        setCollectedName(text.trim());
      }
    }

    // If we have name and phone but no interest, and text matches a treatment
    if (collectedName && collectedPhone && !collectedInterest) {
      const match = TREATMENT_OPTIONS.find(t => t.toLowerCase() === text.toLowerCase());
      if (match) {
        setCollectedInterest(match);
      } else if (text.length > 3 && !extractPhone(text)) {
        // Treat as custom interest if it's not a phone number
        setCollectedInterest(text.trim());
      }
    }
  };

  /* main send handler */
  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading || enquirySubmitted) return;

    // Add user message to UI
    setMessages((prev) => [...prev, { id: uid(), from: "user", text, time: now() }]);
    setInput("");
    setShowQuickPicks(false);

    // Process for lead extraction
    processUserMessage(text);

    // Check if this is a confirmation to submit enquiry
    if (awaitingConfirm && isConfirmation(text)) {
      setLoading(true);
      const ok = await submitEnquiry(
        collectedName || "Visitor",
        collectedPhone,
        collectedInterest || "General Consultation"
      );

      // Tell AI the result and get closing response
      const updatedHistory: ChatApiMessage[] = [
        ...chatHistory,
        { role: "user", content: text },
      ];

      if (ok) {
        const confirmMsg: ChatApiMessage = {
          role: "user",
          content: `[System: The enquiry has been successfully submitted to the team. Respond with a warm thank-you and let them know the team will call within 24 hours. Name: ${collectedName}, Phone: ${collectedPhone}]`,
        };
        const reply = await getAIResponse([...updatedHistory, confirmMsg]);
        const asst: ChatApiMessage = { role: "assistant", content: reply };
        setChatHistory([...updatedHistory, asst]);
        botSay(reply);
        setEnquirySubmitted(true);
      } else {
        botSay(`Oops, something went wrong. Please try again or call us directly at ${CONTACT_PHONE}. 💜`);
      }
      setAwaitingConfirm(false);
      setLoading(false);
      return;
    }

    // Normal conversation: send to OpenAI
    setLoading(true);
    const userMsg: ChatApiMessage = { role: "user", content: text };
    const updatedHistory = [...chatHistory, userMsg];

    const reply = await getAIResponse(updatedHistory);

    const assistantMsg: ChatApiMessage = { role: "assistant", content: reply };
    setChatHistory([...updatedHistory, assistantMsg]);
    botSay(reply);
    detectContext(reply);
    setLoading(false);
  };

  /* quick interest selection */
  const handleQuickPick = (option: string) => {
    setInput(option);
    setTimeout(() => {
      setInput("");
      setCollectedInterest(option);
      setMessages((prev) => [...prev, { id: uid(), from: "user", text: option, time: now() }]);
      setShowQuickPicks(false);

      // Send to AI
      (async () => {
        setLoading(true);
        const userMsg: ChatApiMessage = { role: "user", content: option };
        const updatedHistory = [...chatHistory, userMsg];
        const reply = await getAIResponse(updatedHistory);
        const assistantMsg: ChatApiMessage = { role: "assistant", content: reply };
        setChatHistory([...updatedHistory, assistantMsg]);
        botSay(reply);
        detectContext(reply);
        setLoading(false);
      })();
    }, 150);
  };

  if (!showBtn) return null;

  return (
    <>
      {/* ── Floating Button ── */}
      {!open && (
        <div className="fixed bottom-6 right-6 z-50">
          {showTooltip && (
            <div className="absolute -top-12 right-0 bg-primary text-white text-xs px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap animate-fade-in">
              Need skin care help? Chat with Aura!
              <div className="absolute bottom-0 right-5 translate-y-1/2 rotate-45 w-2 h-2 bg-primary" />
            </div>
          )}
          <button
            onClick={handleOpen}
            className="w-14 h-14 rounded-full bg-primary shadow-xl flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Open chat"
          >
            <span className="absolute w-14 h-14 rounded-full bg-primary animate-ping opacity-20" />
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </button>
        </div>
      )}

      {/* ── Chat Window ── */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[370px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-primary px-5 py-3.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/></svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">Aura — AI Assistant</p>
                <p className="text-white/60 text-[11px]">{SITE_NAME} Skin Care · Powered by AI</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white text-xl leading-none cursor-pointer" aria-label="Close chat">✕</button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-950">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  m.from === "user"
                    ? "bg-primary text-white rounded-br-md"
                    : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-bl-md shadow-sm border border-gray-100 dark:border-gray-700"
                }`}>
                  {m.text.split("**").map((segment, i) =>
                    i % 2 === 1
                      ? <strong key={i}>{segment}</strong>
                      : <span key={i}>{segment}</span>
                  )}
                  <span className={`block text-[10px] mt-1 ${m.from === "user" ? "text-white/50" : "text-gray-400"}`}>{m.time}</span>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1">
                  <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
          </div>

          {/* Quick-pick treatment buttons */}
          {showQuickPicks && (
            <div className="px-4 py-2 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-1.5 max-h-28 overflow-y-auto">
              {TREATMENT_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleQuickPick(opt)}
                  className="text-xs px-2.5 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer font-medium"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shrink-0">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex gap-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={enquirySubmitted ? "Enquiry submitted" : "Type a message…"}
                disabled={loading || enquirySubmitted}
                className="flex-1 h-10 px-4 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm outline-none focus:border-primary transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading || enquirySubmitted}
                className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 disabled:opacity-40 transition-all cursor-pointer"
                aria-label="Send"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
            <p className="text-[10px] text-gray-400 text-center mt-1.5">Powered by {SITE_NAME} AI • Your data is secure</p>
          </div>
        </div>
      )}

      {/* ── Animations ── */}
      <style jsx>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.25s ease-out; }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>
    </>
  );
}
