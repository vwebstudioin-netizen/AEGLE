"use client";

import {
  Droplets, Gem, HandHeart, Scissors, Sparkles, Microscope,
  Stethoscope, Leaf, Syringe, Heart, Target, Zap, Dna,
  Star, Pencil, Flame, FlaskConical, Radar, Ruler, Thermometer,
  Fish, TestTubes, RefreshCw, Snowflake, IceCreamCone, Palette,
  Bandage, Eye, ScanEye, Pill, Search, Lightbulb, Shield,
  Camera, Wind, Sun, Dumbbell, CircleDot, Scale, Ear,
  Sparkle, Activity, Flower2, Brain, Baby, PersonStanding,
  type LucideIcon,
} from "lucide-react";

// Maps emoji strings in data files → Lucide icon components
const ICON_MAP: Record<string, LucideIcon> = {
  // Department icons
  "🧴": Droplets,
  "💎": Gem,
  "💆": HandHeart,
  "💇": Scissors,
  "✨": Sparkles,
  "🔬": Microscope,
  "🩺": Stethoscope,
  "🌿": Leaf,

  // Service icons
  "💉": Syringe,
  "👰": Heart,
  "🎯": Target,
  "💧": Droplets,
  "⚡": Zap,
  "🧬": Dna,
  "🌟": Star,
  "✏️": Pencil,
  "🔥": Flame,
  "📡": Radar,
  "📐": Ruler,
  "🌡️": Thermometer,
  "🐟": Fish,
  "🧪": TestTubes,
  "🔄": RefreshCw,
  "❄️": Snowflake,
  "🧊": IceCreamCone,
  "🎨": Palette,
  "🩹": Bandage,
  "👁️": Eye,
  "👀": ScanEye,
  "✂️": Scissors,
  "⬆️": Sparkle,
  "⏳": Activity,
  "🩸": Droplets,
  "💋": Heart,
  "😊": Sparkles,
  "💄": Palette,
  "💊": Pill,
  "🔍": Search,
  "💡": Lightbulb,
  "🛡️": Shield,
  "📸": Camera,
  "💨": Wind,
  "☀️": Sun,
  "💪": Dumbbell,
  "👃": CircleDot,
  "🍑": Sparkle,
  "⚖️": Scale,
  "👂": Ear,
  "💅": Sparkles,
  "🧘": Flower2,

  // About / community
  "❤️": Heart,
  "🏆": Star,
  "🤝": HandHeart,
  "🌍": Leaf,
  "👥": PersonStanding,
  "📚": FlaskConical,
  "🌱": Leaf,
  "🏫": FlaskConical,
  "🧠": Brain,
  "👶": Baby,
  "🧓": PersonStanding,
  "🚐": Activity,

  // Appointment / Portal
  "🆕": Sparkles,
  "💻": Activity,
  "📅": Activity,
  "✉️": Activity,
  "💳": Activity,

  // Misc
  "📞": Activity,
  "🔒": Shield,
  "📜": Activity,
  "🎉": Zap,
  "✅": Shield,
};

interface EmojiIconProps {
  emoji: string;
  className?: string;
  fallbackEmoji?: boolean;
}

/**
 * Renders a Lucide icon for a given emoji string.
 * Falls back to the emoji character if no mapping exists.
 */
export function EmojiIcon({ emoji, className = "w-6 h-6", fallbackEmoji = true }: EmojiIconProps) {
  const IconComponent = ICON_MAP[emoji];
  if (IconComponent) {
    return <IconComponent className={className} />;
  }
  if (fallbackEmoji) {
    return <span className="inline-block text-center" style={{ fontSize: "1.2em" }}>{emoji}</span>;
  }
  return <Sparkles className={className} />;
}

/** Get icon component for an emoji string */
export function getIconForEmoji(emoji: string): LucideIcon {
  return ICON_MAP[emoji] || Sparkles;
}

export { ICON_MAP };
