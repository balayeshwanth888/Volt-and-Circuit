import { useState } from "react";
import { Mail, MapPin, Phone, Send, Check, User, MessageSquare } from "lucide-react";

/**
 * Contact page with a fake submit form (no backend — just a local
 * "sent" confirmation state). Swap handleSubmit for a real API call
 * or mailto/service integration when you have one.
 */
export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <div className="ec-section">
      <span className="ec-eyebrow">GET IN TOUCH</span>
      <h1 className="ec-display text-4xl mt-2 mb-4" style={{ fontWeight: 700 }}>
        Contact us
      </h1>
      <p className="mb-2 max-w-xl" style={{ color: "var(--text-soft)" }}>
        Questions about an order, a product, or anything else — send us a note and we'll
        get back to you.
      </p>

      <div className="ec-contact-grid">
        <div className="ec-contact-card" style={{ display: "block" }}>
          {sent ? (
            <div className="flex flex-col items-center text-center py-8 ec-pop">
              <div
                className="flex items-center justify-center rounded-full mb-4"
                style={{ width: 56, height: 56, background: "var(--accent)", color: "#06140F" }}
              >
                <Check size={26} />
              </div>
              <h2 className="ec-display text-xl mb-1" style={{ fontWeight: 700 }}>
                Message sent
              </h2>
              <p className="text-sm" style={{ color: "var(--text-soft)" }}>
                Thanks for reaching out — we'll reply soon. (This is a demo form; nothing was actually sent.)
              </p>
              <button className="ec-btn ec-btn-outline mt-6" onClick={() => setSent(false)}>
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="ec-field">
                <User size={17} className="ec-field-icon" />
                <input
                  className="ec-input"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="ec-field">
                <Mail size={17} className="ec-field-icon" />
                <input
                  type="email"
                  className="ec-input"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="ec-field">
                <MessageSquare size={17} className="ec-field-icon" style={{ top: "1.4rem", transform: "none" }} />
                <textarea
                  className="ec-input"
                  placeholder="How can we help?"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ resize: "vertical", paddingTop: "0.85rem" }}
                  required
                />
              </div>
              <button type="submit" className="ec-btn ec-btn-primary mt-2">
                Send message <Send size={16} />
              </button>
            </form>
          )}
        </div>

        <div className="ec-contact-info">
          <div className="ec-contact-card">
            <Mail size={20} style={{ color: "var(--accent)" }} />
            <div>
              <p className="font-bold text-sm mb-0.5">Email</p>
              <p className="text-sm" style={{ color: "var(--text-soft)" }}>support@voltcircuit.example</p>
            </div>
          </div>
          <div className="ec-contact-card">
            <Phone size={20} style={{ color: "var(--accent)" }} />
            <div>
              <p className="font-bold text-sm mb-0.5">Phone</p>
              <p className="text-sm" style={{ color: "var(--text-soft)" }}>+91 78934 26888</p>
            </div>
          </div>
          <div className="ec-contact-card">
            <MapPin size={20} style={{ color: "var(--accent)" }} />
            <div>
              <p className="font-bold text-sm mb-0.5">Address</p>
              <p className="text-sm" style={{ color: "var(--text-soft)" }}>
                221B Circuit Lane, Suite 4, Springfield
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}