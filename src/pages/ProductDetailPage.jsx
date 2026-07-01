import { ArrowLeft, ShoppingBag, Heart, Minus, Plus, Star } from "lucide-react";

/**
 * Full product detail page.
 *
 * @param {object} product - the selected product from the catalog
 * @param {number} qty - current cart quantity for this product (0 = not in cart)
 * @param {boolean} wishlisted - whether it's saved to the wishlist
 * @param {(product) => void} onAdd
 * @param {(id, delta) => void} onQty
 * @param {(product) => void} onToggleWishlist
 * @param {() => void} onBack - returns to previous page
 */
export default function ProductDetailPage({
  product,
  qty = 0,
  wishlisted = false,
  onAdd,
  onQty,
  onToggleWishlist,
  onBack,
}) {
  if (!product) return null;

  const { title, price, description, category, image, rating } = product;
  const fullStars = Math.round(rating?.rate ?? 0);

  return (
    <div className="max-w-6xl mx-auto ec-pop" style={{ padding: "2.5rem 1.25rem" }}>
      {/* Back button */}
      <button
        className="flex items-center ec-btn-ghost"
        style={{ gap: "0.4rem", marginBottom: "2rem", paddingLeft: 0 }}
        onClick={onBack}
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2.5rem",
          alignItems: "start",
        }}
      >
        {/* Image panel */}
        <div
          className="flex items-center justify-center rounded-2xl"
          style={{
            background: "#fff",
            border: "1.5px solid var(--panel-line)",
            padding: "2rem",
            minHeight: "320px",
          }}
        >
          <img
            src={image}
            alt={title}
            style={{ maxHeight: "300px", maxWidth: "100%", objectFit: "contain" }}
          />
        </div>

        {/* Info panel */}
        <div className="flex flex-col" style={{ gap: "1.25rem" }}>
          {/* category badge */}
          <span
            className="ec-mono"
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              color: "var(--accent)",
              background: "rgba(61,224,200,0.1)",
              border: "1px solid rgba(61,224,200,0.25)",
              borderRadius: "0.4rem",
              padding: "0.25rem 0.6rem",
              display: "inline-block",
              width: "fit-content",
            }}
          >
            {category}
          </span>

          {/* title */}
          <h1 className="ec-display" style={{ fontWeight: 700, fontSize: "1.6rem", lineHeight: 1.25 }}>
            {title}
          </h1>

          {/* rating */}
          {rating && (
            <div className="flex items-center" style={{ gap: "0.5rem" }}>
              <div className="flex items-center" style={{ gap: "0.15rem" }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < fullStars ? "var(--gold, #D9A441)" : "none"}
                    style={{ color: i < fullStars ? "#D9A441" : "var(--text-soft)" }}
                  />
                ))}
              </div>
              <span className="ec-mono" style={{ fontSize: "0.8rem", color: "var(--accent)" }}>
                {rating.rate}
              </span>
              <span className="text-sm" style={{ color: "var(--text-soft)" }}>
                ({rating.count} reviews)
              </span>
            </div>
          )}

          {/* price */}
          <div className="ec-mono" style={{ fontSize: "2rem", color: "var(--accent)", fontWeight: 700 }}>
            ${price.toFixed(2)}
          </div>

          {/* description */}
          <p style={{ color: "var(--text-soft)", lineHeight: 1.75, fontSize: "0.95rem" }}>
            {description}
          </p>

          <div
            style={{
              borderTop: "1.5px solid var(--panel-line)",
              paddingTop: "1.25rem",
              display: "flex",
              gap: "0.9rem",
              flexWrap: "wrap",
            }}
          >
            {qty > 0 ? (
              <div className="flex items-center" style={{ gap: "0" }}>
                <div className="ec-stepper" style={{ width: 130 }}>
                  <button
                    className="ec-stepper-btn"
                    onClick={() => onQty(product.id, -1)}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="ec-stepper-count" style={{ fontSize: "1rem" }}>{qty}</span>
                  <button
                    className="ec-stepper-btn"
                    onClick={() => onQty(product.id, 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="ec-btn ec-btn-primary"
                style={{ padding: "0.75rem 1.75rem", fontSize: "1rem" }}
                onClick={() => onAdd(product)}
              >
                <ShoppingBag size={18} /> Add to cart
              </button>
            )}

            <button
              className="ec-btn ec-btn-outline flex items-center"
              style={{ gap: "0.4rem", padding: "0.75rem 1.25rem" }}
              onClick={() => onToggleWishlist(product)}
            >
              <Heart
                size={18}
                fill={wishlisted ? "var(--warn)" : "none"}
                style={{ color: wishlisted ? "var(--warn)" : "currentColor" }}
              />
              {wishlisted ? "Wishlisted" : "Wishlist"}
            </button>
          </div>

          {/* extra details strip */}
          <div
            className="grid"
            style={{
              gridTemplateColumns: "1fr 1fr",
              gap: "0.75rem",
              marginTop: "0.5rem",
            }}
          >
            {[
              { label: "Availability", value: "In stock" },
              { label: "Category", value: category },
              { label: "Rating", value: `${rating?.rate ?? "—"} / 5` },
              { label: "Reviews", value: `${rating?.count ?? 0} verified` },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl"
                style={{
                  background: "var(--panel)",
                  border: "1.5px solid var(--panel-line)",
                  padding: "0.75rem 1rem",
                }}
              >
                <p className="ec-mono" style={{ fontSize: "0.65rem", color: "var(--text-soft)", marginBottom: "0.2rem", letterSpacing: "0.05em" }}>
                  {label.toUpperCase()}
                </p>
                <p style={{ fontWeight: 600, fontSize: "0.875rem" }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}