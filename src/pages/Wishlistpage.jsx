import { Heart, ArrowRight } from "lucide-react";
import ProductCard from "../components/ProductCard";

/**
 * Shows every product the user has hearted. Reuses ProductCard so the
 * add-to-cart / quantity stepper / heart-toggle behavior stays identical
 * to the Products and Home grids.
 *
 * @param {object[]} wishlist - saved products
 * @param {object[]} cart - current cart items, used to look up each product's quantity
 * @param {(product: object) => void} onAdd
 * @param {(id: number, delta: number) => void} onQty
 * @param {(product: object) => void} onToggleWishlist
 * @param {() => void} onBrowse - jumps to the products page
 */
export default function WishlistPage({ wishlist, cart, onAdd, onQty, onToggleWishlist, onBrowse }) {
  function qtyFor(id) {
    return cart.find((i) => i.id === id)?.qty || 0;
  }

  if (wishlist.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center ec-pop" style={{ padding: "6rem 1.25rem" }}>
        <Heart size={48} style={{ color: "var(--accent)", margin: "0 auto 1rem" }} />
        <h2 className="ec-display text-2xl" style={{ fontWeight: 700, marginBottom: "0.5rem" }}>
          Your wishlist is empty
        </h2>
        <p style={{ color: "var(--text-soft)", marginBottom: "1.75rem" }}>
          Tap the heart on any product to save it here for later.
        </p>
        <button className="ec-btn ec-btn-primary" onClick={onBrowse}>
          Browse products <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="ec-section">
      <span className="ec-eyebrow">SAVED FOR LATER</span>
      <h1 className="ec-display text-4xl" style={{ fontWeight: 700, marginTop: "0.5rem", marginBottom: "2rem" }}>
        Your wishlist
      </h1>

      <div
        className="grid"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem" }}
      >
        {wishlist.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            qty={qtyFor(p.id)}
            onAdd={onAdd}
            onQty={onQty}
            wishlisted
            onToggleWishlist={onToggleWishlist}
          />
        ))}
      </div>
    </div>
  );
}