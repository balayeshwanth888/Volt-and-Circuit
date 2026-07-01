import { ShoppingBag, Minus, Plus, Heart } from "lucide-react";

/**
 * A single product in the shop/home grid.
 * Clicking anywhere on the card (except the heart, Add button, or stepper)
 * opens the product detail page via onViewDetail.
 */
export default function ProductCard({
  product,
  qty = 0,
  onAdd,
  onQty,
  tagged,
  wishlisted = false,
  onToggleWishlist,
  onViewDetail,
  style,
}) {
  return (
    <div
      className="ec-card ec-pop"
      style={{ ...style, cursor: onViewDetail ? "pointer" : "default" }}
      onClick={() => onViewDetail && onViewDetail(product)}
    >
      {/* Image area */}
      <div className="ec-card-img-wrap">
        <img src={product.image} alt={product.title} className="ec-card-img" loading="lazy" />
        {tagged && <div className="ec-tag">ADDED</div>}

        {onToggleWishlist && (
          <button
            onClick={(e) => { e.stopPropagation(); onToggleWishlist(product); }}
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
              background: "rgba(11,15,20,0.7)",
              color: wishlisted ? "var(--warn)" : "#fff",
              zIndex: 2,
            }}
          >
            <Heart size={15} fill={wishlisted ? "var(--warn)" : "none"} />
          </button>
        )}
      </div>

      {/* Info area */}
      <div className="flex flex-col flex-1" style={{ padding: "1rem", gap: "0.5rem" }}>
        <p
          style={{
            fontSize: "0.875rem",
            lineHeight: 1.4,
            minHeight: "2.6em",
            fontWeight: 600,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.title}
        </p>

        <div
          className="flex items-center justify-between"
          style={{ paddingTop: "0.5rem", gap: "0.5rem", marginTop: "auto" }}
        >
          <span className="ec-mono" style={{ fontSize: "1.1rem", color: "var(--accent)" }}>
            ${product.price.toFixed(2)}
          </span>

          {qty > 0 ? (
            <div className="ec-stepper" style={{ width: 104 }} onClick={(e) => e.stopPropagation()}>
              <button className="ec-stepper-btn" onClick={() => onQty(product.id, -1)} aria-label="Decrease">
                <Minus size={14} />
              </button>
              <span className="ec-stepper-count">{qty}</span>
              <button className="ec-stepper-btn" onClick={() => onQty(product.id, 1)} aria-label="Increase">
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <button
              className="ec-btn ec-btn-primary"
              style={{ padding: "0.5rem 1rem" }}
              onClick={(e) => { e.stopPropagation(); onAdd(product); }}
            >
              <ShoppingBag size={15} /> Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}