import { useState } from "react";
import { Check, ShoppingCart, ArrowRight, Sparkles } from "lucide-react";
import CartRow from "../components/CartRow";
import CheckoutModal from "../components/CheckoutModal";

/**
 * The cart page. Renders one of three states: order-placed confirmation,
 * empty-cart prompt, or the basket itself. "Place order" opens a
 * checkout modal collecting shipping/payment details before the order
 * is actually marked as placed.
 *
 * @param {object[]} cart - cart items, each { id, title, price, image, qty }
 * @param {(id: number, delta: number) => void} onQty
 * @param {(id: number) => void} onRemove
 * @param {number} total - cart subtotal
 * @param {() => void} onPlaceOrder - marks the (fake) order as placed
 * @param {boolean} placed - true once checkout has been confirmed
 * @param {() => void} onContinue - returns to the shop (and resets `placed`/cart upstream)
 */
export default function CartPage({ cart, onQty, onRemove, total, onPlaceOrder, placed, onContinue }) {
  const [showCheckout, setShowCheckout] = useState(false);

  function handleConfirmCheckout(details) {
    // Demo only — details aren't sent anywhere, just logged for now.
    console.log("Checkout details:", details);
    setShowCheckout(false);
    onPlaceOrder();
  }

  if (placed) {
    return (
      <div className="max-w-md mx-auto text-center ec-pop" style={{ padding: "6rem 1.25rem" }}>
        <div
          className="mx-auto flex items-center justify-center rounded-full"
          style={{ width: 72, height: 72, background: "var(--accent)", color: "#06140F", marginBottom: "1.25rem" }}
        >
          <Check size={32} />
        </div>
        <h2 className="ec-display text-3xl" style={{ fontWeight: 700, marginBottom: "0.5rem" }}>
          Order placed
        </h2>
        <p style={{ color: "var(--text-soft)", marginBottom: "1.75rem" }}>
          We've started packing it up. This is a demo — nothing was actually charged.
        </p>
        <button className="ec-btn ec-btn-primary" onClick={onContinue}>
          Continue shopping <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center ec-pop" style={{ padding: "6rem 1.25rem" }}>
        <ShoppingCart size={48} style={{ color: "var(--accent)", margin: "0 auto 1rem" }} />
        <h2 className="ec-display text-2xl" style={{ fontWeight: 700, marginBottom: "0.5rem" }}>
          Your cart is empty
        </h2>
        <p style={{ color: "var(--text-soft)", marginBottom: "1.75rem" }}>
          Nothing in here yet — the catalog is fully stocked and waiting.
        </p>
        <button className="ec-btn ec-btn-primary" onClick={onContinue}>
          Browse products <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto" style={{ padding: "2.5rem 1.25rem" }}>
      <h1 className="ec-display text-3xl" style={{ fontWeight: 700, marginBottom: "1.5rem" }}>
        Your cart
      </h1>
      <div
        className="rounded-2xl"
        style={{ background: "var(--panel)", border: "1.5px solid var(--panel-line)", padding: "1.5rem" }}
      >
        {cart.map((item) => (
          <CartRow key={item.id} item={item} onQty={onQty} onRemove={onRemove} />
        ))}
        <div className="flex items-center justify-between" style={{ paddingTop: "1.5rem" }}>
          <span style={{ color: "var(--text-soft)" }}>Subtotal</span>
          <span className="ec-mono text-xl" style={{ color: "var(--accent)" }}>
            ${total.toFixed(2)}
          </span>
        </div>
        <button
          className="ec-btn ec-btn-primary w-full"
          style={{ marginTop: "1.25rem" }}
          onClick={() => setShowCheckout(true)}
        >
          <Sparkles size={16} /> Place order
        </button>
      </div>

      <CheckoutModal
        open={showCheckout}
        total={total}
        onClose={() => setShowCheckout(false)}
        onConfirm={handleConfirmCheckout}
      />
    </div>
  );
}