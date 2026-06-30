import { Check, ShoppingCart, ArrowRight, Sparkles } from "lucide-react";
import CartRow from "../components/CartRow";

/**
 * The cart page. Renders one of three states: order-placed confirmation,
 * empty-cart prompt, or the basket itself.
 *
 * @param {object[]} cart - cart items, each { id, title, price, image, qty }
 * @param {(id: number, delta: number) => void} onQty
 * @param {(id: number) => void} onRemove
 * @param {number} total - cart subtotal
 * @param {() => void} onPlaceOrder - marks the (fake) order as placed
 * @param {boolean} placed - true once "Place order" has been clicked
 * @param {() => void} onContinue - returns to the shop (and resets `placed`/cart upstream)
 */
export default function CartPage({ cart, onQty, onRemove, total, onPlaceOrder, placed, onContinue }) {
  if (placed) {
    return (
      <div className="max-w-md mx-auto px-5 py-24 text-center ec-pop">
        <div
          className="mx-auto mb-5 flex items-center justify-center rounded-full"
          style={{ width: 72, height: 72, background: "var(--accent)", color: "#06140F" }}
        >
          <Check size={32} />
        </div>
        <h2 className="ec-display text-3xl mb-2" style={{ fontWeight: 700 }}>Order placed</h2>
        <p style={{ color: "var(--text-soft)" }} className="mb-7">
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
      <div className="max-w-md mx-auto px-5 py-24 text-center ec-pop">
        <ShoppingCart size={48} style={{ color: "var(--accent)", margin: "0 auto 1rem" }} />
        <h2 className="ec-display text-2xl mb-2" style={{ fontWeight: 700 }}>Your cart is empty</h2>
        <p style={{ color: "var(--text-soft)" }} className="mb-7">
          Nothing in here yet — the catalog is fully stocked and waiting.
        </p>
        <button className="ec-btn ec-btn-primary" onClick={onContinue}>
          Browse products <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10">
      <h1 className="ec-display text-3xl mb-6" style={{ fontWeight: 700 }}>Your cart</h1>
      <div className="rounded-2xl p-5 sm:p-6" style={{ background: "var(--panel)", border: "1.5px solid var(--panel-line)" }}>
        {cart.map((item) => (
          <CartRow key={item.id} item={item} onQty={onQty} onRemove={onRemove} />
        ))}
        <div className="flex items-center justify-between pt-5">
          <span style={{ color: "var(--text-soft)" }}>Subtotal</span>
          <span className="ec-mono text-xl" style={{ color: "var(--accent)" }}>${total.toFixed(2)}</span>
        </div>
        <button className="ec-btn ec-btn-primary w-full mt-5" onClick={onPlaceOrder}>
          <Sparkles size={16} /> Place order
        </button>
      </div>
    </div>
  );
}