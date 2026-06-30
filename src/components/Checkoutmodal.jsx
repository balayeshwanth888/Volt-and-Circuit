import { useState } from "react";
import { X, MapPin, User, Phone, CreditCard, Smartphone, Banknote, Check } from "lucide-react";

const PAYMENT_METHODS = [
  { id: "card", label: "Card", Icon: CreditCard },
  { id: "upi", label: "UPI", Icon: Smartphone },
  { id: "cod", label: "Cash on Delivery", Icon: Banknote },
];

/**
 * Checkout modal collecting shipping + payment details before placing
 * the order. Pure UI/demo — no real payment processing happens here.
 *
 * @param {boolean} open
 * @param {number} total - subtotal to display in the summary
 * @param {() => void} onClose - closes the modal without placing the order
 * @param {(details: object) => void} onConfirm - called with the form values once submitted
 */
export default function CheckoutModal({ open, total, onClose, onConfirm }) {
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    zip: "",
    phone: "",
    cardNumber: "",
    upiId: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");

  if (!open) return null;

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onConfirm({ ...form, paymentMethod });
  }

  return (
    <div className="ec-modal-backdrop" onClick={onClose}>
      <div
        className="ec-modal ec-pop"
        role="dialog"
        aria-modal="true"
        style={{ maxWidth: "30rem", textAlign: "left", alignItems: "stretch" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between" style={{ marginBottom: "1.25rem" }}>
          <h2 className="ec-display text-xl" style={{ fontWeight: 700 }}>Checkout</h2>
          <button className="ec-btn-ghost" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: "0.9rem" }}>
          <div className="ec-field">
            <User size={17} className="ec-field-icon" />
            <input className="ec-input" placeholder="Full name" value={form.fullName} onChange={update("fullName")} required />
          </div>
          <div className="ec-field">
            <MapPin size={17} className="ec-field-icon" />
            <input className="ec-input" placeholder="Street address" value={form.address} onChange={update("address")} required />
          </div>
          <div className="flex" style={{ gap: "0.9rem" }}>
            <input className="ec-input" style={{ paddingLeft: "1rem", flex: 1 }} placeholder="City" value={form.city} onChange={update("city")} required />
            <input className="ec-input" style={{ paddingLeft: "1rem", width: "8rem" }} placeholder="ZIP code" value={form.zip} onChange={update("zip")} required />
          </div>
          <div className="ec-field">
            <Phone size={17} className="ec-field-icon" />
            <input className="ec-input" placeholder="Phone number" value={form.phone} onChange={update("phone")} required />
          </div>

          {/* payment method selector */}
          <div>
            <span
              className="ec-mono"
              style={{ fontSize: "0.7rem", letterSpacing: "0.05em", color: "var(--text-soft)" }}
            >
              PAYMENT METHOD
            </span>
            <div className="flex" style={{ gap: "0.6rem", marginTop: "0.5rem" }}>
              {PAYMENT_METHODS.map(({ id, label, Icon }) => (
                <button
                  type="button"
                  key={id}
                  onClick={() => setPaymentMethod(id)}
                  className="flex flex-col items-center justify-center"
                  style={{
                    flex: 1,
                    gap: "0.35rem",
                    padding: "0.65rem 0.4rem",
                    borderRadius: "0.65rem",
                    border: `1.5px solid ${paymentMethod === id ? "var(--accent)" : "var(--panel-line)"}`,
                    background: paymentMethod === id ? "rgba(61,224,200,0.1)" : "transparent",
                    color: paymentMethod === id ? "var(--accent)" : "var(--text-soft)",
                    cursor: "pointer",
                    transition: "border-color 0.15s ease, color 0.15s ease, background 0.15s ease",
                  }}
                >
                  <Icon size={18} />
                  <span style={{ fontSize: "0.72rem", fontWeight: 600, textAlign: "center" }}>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {paymentMethod === "card" && (
            <div className="ec-field">
              <CreditCard size={17} className="ec-field-icon" />
              <input
                className="ec-input"
                placeholder="Card number"
                value={form.cardNumber}
                onChange={update("cardNumber")}
                maxLength={19}
                required
              />
            </div>
          )}

          {paymentMethod === "upi" && (
            <div className="ec-field">
              <Smartphone size={17} className="ec-field-icon" />
              <input
                className="ec-input"
                placeholder="UPI ID (e.g. name@bank)"
                value={form.upiId}
                onChange={update("upiId")}
                required
              />
            </div>
          )}

          {paymentMethod === "cod" && (
            <p className="text-sm" style={{ color: "var(--text-soft)" }}>
              Pay in cash when your order arrives.
            </p>
          )}

          <div
            className="flex items-center justify-between"
            style={{ borderTop: "1.5px solid var(--panel-line)", paddingTop: "0.9rem", marginTop: "0.3rem" }}
          >
            <span style={{ color: "var(--text-soft)" }}>Total due</span>
            <span className="ec-mono text-lg" style={{ color: "var(--accent)" }}>${total.toFixed(2)}</span>
          </div>

          <button type="submit" className="ec-btn ec-btn-primary w-full" style={{ marginTop: "0.3rem" }}>
            <Check size={16} /> Checkout
          </button>
        </form>
      </div>
    </div>
  );
}