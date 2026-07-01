import { useEffect, useRef, useState } from "react";
import { ArrowRight, Cpu, Truck, ShieldCheck, Headphones } from "lucide-react";
import ProductCard from "../components/ProductCard";

// Small helper: fades an element in once it enters the viewport.
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // only animate once
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

/**
 * Landing page shown after login. Shows a hero, a feature strip, and a
 * "Featured Products" preview pulled from the same catalog as the
 * Products page (first 4 items), with the same add/stepper behavior.
 */
export default function HomePage({
  onShopNow,
  products,
  loading,
  cart,
  onAdd,
  onQty,
  taggedId,
  isWishlisted,
  onToggleWishlist,
}) {
  const features = [
    { Icon: Truck, title: "Fast shipping", text: "Most orders ship within 24 hours." },
    { Icon: ShieldCheck, title: "2-year warranty", text: "Every product is covered, no fine print." },
    { Icon: Headphones, title: "Real support", text: "Talk to a human, not a bot, when something's wrong." },
  ];

  function qtyFor(id) {
    return cart.find((i) => i.id === id)?.qty || 0;
  }

  const featured = products.slice(0, 4);

  const [featuresRef, featuresInView] = useInView();
  const [headingRef, headingInView] = useInView();

  return (
    <div>
      <div className="ec-hero">
        <div className="ec-hero-inner">
          <span className="ec-eyebrow ec-anim-in" style={{ animationDelay: "0s" }}>
            VOLT &amp; CIRCUIT
          </span>
          <h1
            className="ec-display ec-anim-in"
            style={{
              fontWeight: 700,
              lineHeight: 1.1,
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              maxWidth: "42rem",
              marginTop: "0.75rem",
              marginBottom: "1.25rem",
              animationDelay: "0.1s",
            }}
          >
            Tech that keeps up with you.
          </h1>
          <p
            className="ec-anim-in"
            style={{
              color: "var(--text-soft)",
              maxWidth: "36rem",
              marginBottom: "2rem",
              animationDelay: "0.2s",
            }}
          >
            Curated electronics — phones, audio, cameras, and more — picked for quality,
            not hype. Browse the catalog and find your next favorite device.
          </p>
          <button
            className="ec-btn ec-btn-primary ec-anim-in ec-btn-hover"
            style={{ animationDelay: "0.3s" }}
            onClick={onShopNow}
          >
            Shop now <ArrowRight size={17} className="ec-btn-arrow" />
          </button>
        </div>
        <Cpu
  size={320}
  className="ec-float"
  style={{
    position: "absolute",
    right: "40px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "var(--accent)",
    opacity: 0.06,
  }}
  aria-hidden="true"
/>
      </div>

      <div className="ec-section">
        <div ref={featuresRef} className="ec-feature-grid">
          {features.map(({ Icon, title, text }, i) => (
            <div
              key={title}
              className={`ec-feature-card ${featuresInView ? "ec-anim-in" : "ec-anim-pending"}`}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
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
        <div
          ref={headingRef}
          className={`ec-section-heading ${headingInView ? "ec-anim-in" : "ec-anim-pending"}`}
        >
          <h2 className="ec-display text-2xl" style={{ fontWeight: 700 }}>
            Featured products
          </h2>
          <button className="ec-btn-ghost flex items-center gap-1 ec-btn-hover" onClick={onShopNow}>
            View all <ArrowRight size={15} className="ec-btn-arrow" />
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
                  wishlisted={isWishlisted(p.id)}
                  onToggleWishlist={onToggleWishlist}
                  style={{ animationDelay: `${i * 0.06}s` }}
                />
              ))}
        </div>
      </div>
    </div>
  );
}