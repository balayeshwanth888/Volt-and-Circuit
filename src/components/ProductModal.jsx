import { useEffect } from "react";
import { X, ShoppingCart, Star, Tag } from "lucide-react";

export default function ProductModal({
  product,
  onClose,
  onAdd,
}) {
  // Don't render anything if no product is selected
  if (!product) return null;

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Prevent page scrolling while modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const rating = product.rating?.rate ?? 0;
  const reviews = product.rating?.count ?? 0;

  return (
    <div
      className="product-modal-overlay"
      onClick={onClose}
    >
      <div
        className="product-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="product-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Left Side */}
        <div className="product-modal-image">
          <img
            src={product.image}
            alt={product.title}
          />
        </div>

        {/* Right Side */}
        <div className="product-modal-content">

          <div className="product-category">
            <Tag size={14} />
            <span>{product.category}</span>
          </div>

          <h2>{product.title}</h2>

          <div className="product-rating">
            <Star
              size={18}
              fill="#FFD54A"
              color="#FFD54A"
            />

            <span>
              {rating} ({reviews} Reviews)
            </span>
          </div>

          <div className="product-price">
            ${product.price.toFixed(2)}
          </div>

          <p className="product-description">
            {product.description}
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "20px",
            }}
          >
            <button
              className="ec-btn ec-btn-primary"
              style={{ flex: 1 }}
              onClick={() => {
                onAdd(product);
                onClose();
              }}
            >
              <ShoppingCart size={18} />
              Add To Cart
            </button>

            <button
              className="ec-btn ec-btn-outline"
              onClick={onClose}
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}