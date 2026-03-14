import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: `Loyalty Program — ${SITE_NAME}`,
  description: "Join the AEGLE Glow Rewards program. Earn points on every treatment, get exclusive discounts, birthday perks, and priority access to new treatments.",
};

const tiers = [
  { name: "Silver", minSpend: "₹0", icon: "🥈", perks: ["5% cashback on treatments", "Birthday discount 10%", "Free skin analysis session", "Early access to offers"], color: "bg-gray-100 border-gray-300" },
  { name: "Gold", minSpend: "₹25,000", icon: "🥇", perks: ["10% cashback on treatments", "Birthday discount 20%", "Free monthly facial", "Priority appointments", "Exclusive product samples"], color: "bg-yellow-50 border-yellow-300" },
  { name: "Platinum", minSpend: "₹75,000", icon: "💎", perks: ["15% cashback on treatments", "Birthday discount 30%", "Free monthly premium treatment", "Dedicated skin consultant", "VIP event invitations", "Complimentary products every quarter"], color: "bg-primary/5 border-primary/30" },
];

const howItWorks = [
  { step: "1", title: "Sign Up", desc: "Create your AEGLE account — it's free and takes 30 seconds" },
  { step: "2", title: "Earn Points", desc: "Get 1 point for every ₹100 spent on treatments and products" },
  { step: "3", title: "Level Up", desc: "Your tier automatically upgrades based on annual spending" },
  { step: "4", title: "Enjoy Rewards", desc: "Redeem points for treatments, products, and exclusive perks" },
];

export default function LoyaltyPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="gradient-hero text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <span className="text-5xl block mb-4">✨</span>
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">AEGLE Glow Rewards</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Your skin care journey deserves rewards. Earn points on every treatment, unlock exclusive perks, and enjoy VIP benefits.
          </p>
          <Link href="/portal/register" className="inline-block mt-6">
            <Button className="bg-white text-primary hover:bg-white/90 font-semibold px-8">
              Join Now — It&apos;s Free
            </Button>
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-10">How It Works</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-10">Membership Tiers</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div key={tier.name} className={`rounded-xl border-2 ${tier.color} p-7 bg-card`}>
                <div className="text-center mb-6">
                  <span className="text-4xl block mb-2">{tier.icon}</span>
                  <h3 className="text-2xl font-bold">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Min. annual spend: {tier.minSpend}</p>
                </div>
                <ul className="space-y-3">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-0.5">✓</span>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Start Earning Rewards Today</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Every treatment you take brings you closer to exclusive perks. Sign up now and get bonus 100 points!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/portal/register">
              <Button size="lg" className="bg-primary text-white hover:bg-primary-dark px-8">
                Join Glow Rewards
              </Button>
            </Link>
            <Link href="/appointment">
              <Button size="lg" variant="outline" className="px-8">
                Book Treatment
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
