import { Cpu, Target, Users, Sparkles } from "lucide-react";

/**
 * Static "About Us" page. No props, no state — pure content.
 */
export default function AboutPage() {
  const values = [
    {
      Icon: Target,
      title: "Curated, not crammed",
      text: "We list fewer products on purpose — every item is picked, not just stocked.",
    },
    {
      Icon: Users,
      title: "Built for real people",
      text: "Clear specs, honest pricing, and support that actually answers your questions.",
    },
    {
      Icon: Sparkles,
      title: "Always current",
      text: "We refresh the catalog regularly so you're never looking at last year's tech.",
    },
  ];

  return (
    <div className="ec-section" style={{ maxWidth: "56rem" }}>
      <div className="flex items-center gap-2 mb-4">
        <Cpu size={22} style={{ color: "var(--accent)" }} />
        <span className="ec-eyebrow">ABOUT US</span>
      </div>
      <h1 className="ec-display text-4xl mb-5" style={{ fontWeight: 700 }}>
        We're Volt &amp; Circuit.
      </h1>
      <p className="mb-6 max-w-2xl" style={{ color: "var(--text-soft)", lineHeight: 1.7 }}>
        Volt &amp; Circuit started as a small electronics counter with one rule: only sell
        what we'd actually buy ourselves. That rule hasn't changed. Today we're an online
        storefront, but the goal is the same — a tight, honest selection of phones, audio
        gear, cameras, and accessories, without the noise of a thousand near-identical
        listings.
      </p>
      <p className="mb-4 max-w-2xl" style={{ color: "var(--text-soft)", lineHeight: 1.7 }}>
        This particular site is a demo storefront built to show off a full React shopping
        flow — login, browsing, cart, checkout — powered by the Fake Store API. No real
        orders ship from here, but the experience is the real thing.
      </p>

      <div className="ec-value-grid">
        {values.map(({ Icon, title, text }) => (
          <div key={title} className="ec-value-card">
            <Icon size={24} style={{ color: "var(--accent)" }} className="mb-4" />
            <h3 className="ec-display text-base mb-1" style={{ fontWeight: 700 }}>
              {title}
            </h3>
            <p className="text-sm" style={{ color: "var(--text-soft)" }}>
              {text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}