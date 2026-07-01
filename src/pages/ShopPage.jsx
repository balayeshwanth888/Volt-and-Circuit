import { AlertCircle } from "lucide-react";
import ProductCard from "../components/ProductCard";

export default function ShopPage({
  products,
  loading,
  error,
  cart,
  onAdd,
  onQty,
  taggedId,
  onRetry,
  isWishlisted,
  onToggleWishlist,
  onViewDetail,         // ← was missing here
}) {
  function qtyFor(id) {
    return cart.find((i) => i.id === id)?.qty || 0;
  }

  return (
    <div className="ec-section">
      <div className="ec-section-heading">
        <div className="max-w-xl">
          <span className="ec-eyebrow">NEW ARRIVALS</span>
          <h1 className="ec-display text-4xl mt-1 mb-2" style={{ fontWeight: 700 }}>
            Tech that keeps up with you.
          </h1>
          <p style={{ color: "var(--text-soft)" }}>
            A live electronics catalog, powered by the Fake Store API.
          </p>
        </div>
      </div>

      {error && (
        <div
          className="flex items-center gap-3 rounded-2xl p-4 mb-6"
          style={{ background: "rgba(255,92,92,0.12)", color: "var(--warn)" }}
        >
          <AlertCircle size={20} />
          <span className="flex-1">{error}</span>
          <button className="ec-btn ec-btn-outline" onClick={onRetry} style={{ padding: "0.4rem 1rem" }}>
            Retry
          </button>
        </div>
      )}

      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <div key={i} className="ec-skeleton" />)
          : products.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                qty={qtyFor(p.id)}
                onAdd={onAdd}
                onQty={onQty}
                tagged={taggedId === p.id}
                wishlisted={isWishlisted(p.id)}
                onToggleWishlist={onToggleWishlist}
                onViewDetail={onViewDetail}   // ← was missing here
                style={{ animationDelay: `${Math.min(i, 10) * 0.05}s` }}
              />
            ))}
      </div>
    </div>
  );
}