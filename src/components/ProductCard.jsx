import { ShoppingBag, Minus, Plus, Heart } from "lucide-react";

/**
 * A single product in the shop/home grid. Shows an "Add" button when
 * the product isn't in the cart yet; once it is, swaps to a +/- stepper
 * so quantity can be adjusted right from the grid. A heart button in the
 * top-left toggles the product in/out of the wishlist.
 *
 * @param {object} product - { id, title, price, image }
 * @param {number} qty - current quantity of this product in the cart (0 if not added)
 * @param {(product: object) => void} onAdd - adds the product (qty 0 -> 1)
 * @param {(id: number, delta: number) => void} onQty - increments/decrements quantity
 * @param {boolean} tagged - true for ~900ms right after this product was added, shows the "ADDED" tag
 * @param {boolean} wishlisted - whether this product is currently in the wishlist
 * @param {(product: object) => void} onToggleWishlist - adds/removes the product from the wishlist
 */
export default function ProductCard({
  product,
  qty = 0,
  onAdd,
  onQty,
  tagged,
  wishlisted = false,
  onToggleWishlist,
  style,
}) {
  return (
    <div className="ec-card ec-pop" style={style}>
      <div className="ec-card-img-wrap">
        <img src={product.image} alt={product.title} className="ec-card-img" loading="lazy" />
        {tagged && <div className="ec-tag">ADDED</div>}
        {onToggleWishlist && (
          <button
            onClick={() => onToggleWishlist(product)}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            style={{
              position: "absolute",
              top: "0.6rem",
              left: "0.6rem",
              width: "2rem",
              height: "2rem",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              cursor: "pointer",
              background: "rgba(11,15,20,0.55)",
              color: wishlisted ? "var(--warn)" : "#fff",
            }}
          >
            <Heart size={15} fill={wishlisted ? "var(--warn)" : "none"} />
          </button>
        )}
      </div>
      <div className="flex flex-col flex-1" style={{ padding: "1rem", gap: "0.5rem" }}>
        <p
          className="line-clamp-2"
          style={{ fontSize: "0.875rem", lineHeight: 1.4, minHeight: "2.6em", fontWeight: 600 }}
        >
          {product.title}
        </p>
        <div
          className="flex items-center justify-between mt-auto"
          style={{ paddingTop: "0.5rem", gap: "0.5rem" }}
        >
          <span className="ec-mono text-lg" style={{ color: "var(--accent)" }}>
            ${product.price.toFixed(2)}
          </span>

          {qty > 0 ? (
            <div className="ec-stepper" style={{ width: 104 }}>
              <button className="ec-stepper-btn" onClick={() => onQty(product.id, -1)} aria-label="Decrease quantity">
                <Minus size={14} />
              </button>
              <span className="ec-stepper-count">{qty}</span>
              <button className="ec-stepper-btn" onClick={() => onQty(product.id, 1)} aria-label="Increase quantity">
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <button
              className="ec-btn ec-btn-primary"
              style={{ padding: "0.5rem 1rem" }}
              onClick={() => onAdd(product)}
            >
              <ShoppingBag size={15} /> Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}