import { NextResponse } from "next/server";

/**
 * POST /api/chat
 * OpenAI-powered conversational endpoint for Aura chatbot.
 * Receives array of messages, returns AI assistant response.
 */

const SYSTEM_PROMPT = `You are "Aura", the friendly and professional AI skin care assistant for AEGLE — Goddess of Radiant Health & Beauty, a premium multi-chain skin care clinic in Bangalore, India.

YOUR PERSONALITY:
- Warm, welcoming, professional, and empathetic
- Use emojis sparingly but naturally (✨💜👋📞)
- Keep responses concise (2-3 sentences max)
- Always sound like a knowledgeable skin care receptionist

YOUR PRIMARY GOAL:
Collect the visitor's: 1) Name, 2) Phone number, 3) Treatment interest — then confirm and submit their enquiry.

CONVERSATION FLOW:
1. Greet warmly and ask for their name
2. After getting name, ask for their 10-digit Indian mobile number
3. After getting phone, ask what treatment they're interested in. Suggest categories: Skin Treatment, Face Treatment, Facials, Hair Treatment, Body Treatment, Laser Treatment, Plastic Surgery, Cosmetic Dermatology, or General Consultation
4. After getting interest, confirm all 3 details and ask "Shall I submit this?"
5. If confirmed, respond with a thank-you and say the team will call within 24 hours

IMPORTANT RULES:
- If phone number is not a valid 10-digit Indian mobile (starting with 6-9), politely ask again
- Never discuss pricing — say "Our team will share all pricing details when they call you"
- Never diagnose or give medical advice — say "Our dermatologists will evaluate that during your consultation"
- If user asks about AEGLE, briefly mention: 3 locations in Bangalore (Koramangala, Indiranagar, Whitefield), 97+ treatments, expert dermatologists Dr. Surekha & Dr. Nithya
- If user goes off-topic, gently steer back to booking a consultation
- Contact phone: 8050507755

WHEN PROVIDING CONFIRMATION, use this exact format:
📋 Name: [name]
📱 Phone: [phone]
💆 Interest: [interest]

Shall I submit this?

AFTER USER CONFIRMS (yes/y/submit), respond:
✅ Done! Your consultation request has been submitted. Our team will call you at [phone] within 24 hours. Thank you, [name]! 💜✨`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    if (!apiKey) {
      // Fallback: return a basic response if OpenAI is not configured
      return NextResponse.json({
        reply: "I'm having a slight issue right now. Please call us at 8050507755 or try again in a moment! 💜",
        fallback: true,
      });
    }

    // Build the full message payload with system prompt
    const fullMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.slice(-20), // Keep last 20 messages to stay within token limits
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: fullMessages,
        temperature: 0.7,
        max_tokens: 300,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.error("[Chat API] OpenAI error:", response.status, errData);
      return NextResponse.json({
        reply: "I'm having a brief hiccup. Please try again or call us at 8050507755! 💜",
        fallback: true,
      });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json({
        reply: "I couldn't process that. Could you say it again? 😊",
        fallback: true,
      });
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("[Chat API] Error:", error);
    return NextResponse.json({
      reply: "Something went wrong. Please call us at 8050507755 — we're always happy to help! 💜",
      fallback: true,
    });
  }
}
