import { ArrowRight, Cpu, Truck, ShieldCheck, Headphones } from "lucide-react";
import ProductCard from "../components/ProductCard";

/**
 * Landing page shown after login. Shows a hero, a feature strip, and a
 * "Featured Products" preview pulled from the same catalog as the
 * Products page (first 4 items), with the same add/stepper behavior.
 *
 * @param {() => void} onShopNow - jumps to the full products page
 * @param {object[]} products - catalog (may be empty before the products page has loaded it once)
 * @param {boolean} loading - true while products are being fetched
 * @param {object[]} cart - current cart items, used to look up each product's quantity
 * @param {(product: object) => void} onAdd
 * @param {(id: number, delta: number) => void} onQty
 * @param {number|null} taggedId
 */
export default function HomePage({ onShopNow, products, loading, cart, onAdd, onQty, taggedId }) {
  const features = [
    { Icon: Truck, title: "Fast shipping", text: "Most orders ship within 24 hours." },
    { Icon: ShieldCheck, title: "2-year warranty", text: "Every product is covered, no fine print." },
    { Icon: Headphones, title: "Real support", text: "Talk to a human, not a bot, when something's wrong." },
  ];

  function qtyFor(id) {
    return cart.find((i) => i.id === id)?.qty || 0;
  }

  const featured = products.slice(0, 4);

  return (
    <div>
      <div className="ec-hero">
        <div className="ec-hero-inner">
          <span className="ec-eyebrow">VOLT &amp; CIRCUIT</span>
          <h1
            className="ec-display"
            style={{
              fontWeight: 700,
              lineHeight: 1.1,
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              maxWidth: "42rem",
              marginTop: "0.75rem",
              marginBottom: "1.25rem",
            }}
          >
            Tech that keeps up with you.
          </h1>
          <p style={{ color: "var(--text-soft)", maxWidth: "36rem", marginBottom: "2rem" }}>
            Curated electronics — phones, audio, cameras, and more — picked for quality,
            not hype. Browse the catalog and find your next favorite device.
          </p>
          <button className="ec-btn ec-btn-primary" onClick={onShopNow}>
            Shop now <ArrowRight size={17} />
          </button>
        </div>
        <Cpu
          size={320}
          style={{ position: "absolute", right: "-60px", top: "-40px", color: "var(--accent)", opacity: 0.06 }}
          aria-hidden="true"
        />
      </div>

      <div className="ec-section">
        <div className="ec-feature-grid">
          {features.map(({ Icon, title, text }) => (
            <div key={title} className="ec-feature-card">
              <Icon size={26} style={{ color: "var(--accent)" }} className="mb-4" />
              <h3 className="ec-display text-lg mb-1" style={{ fontWeight: 700 }}>
                {title}
              </h3>
              <p className="text-sm" style={{ color: "var(--text-soft)" }}>
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="ec-section" style={{ paddingTop: 0 }}>
        <div className="ec-section-heading">
          <h2 className="ec-display text-2xl" style={{ fontWeight: 700 }}>
            Featured products
          </h2>
          <button className="ec-btn-ghost flex items-center gap-1" onClick={onShopNow}>
            View all <ArrowRight size={15} />
          </button>
        </div>

        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <div key={i} className="ec-skeleton" />)
            : featured.map((p, i) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  qty={qtyFor(p.id)}
                  onAdd={onAdd}
                  onQty={onQty}
                  tagged={taggedId === p.id}
                  style={{ animationDelay: `${i * 0.06}s` }}
                />
              ))}
        </div>
      </div>
    </div>
  );
}