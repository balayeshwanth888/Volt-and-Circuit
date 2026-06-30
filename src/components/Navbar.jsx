import { ShoppingCart, LogOut } from "lucide-react";
import Brand from "./Brand";

/**
 * Top navigation bar shown on every authenticated page.
 *
 * @param {string} route - current route, used to highlight the active link
 *   one of: "home" | "products" | "about" | "contact" | "cart"
 * @param {(route: string) => void} setRoute - switches route (replace with react-router navigate() in a real app)
 * @param {number} cartCount - total items in cart, shown as a badge
 * @param {boolean} cartBounce - briefly true right after an add-to-cart, triggers the bounce animation
 * @param {() => void} onLogout - logs the user out
 * @param {string} userName - signed-in user's name, shown in the greeting
 */
const NAV_LINKS = [
  { route: "home", label: "Home" },
  { route: "products", label: "Products" },
  { route: "about", label: "About Us" },
  { route: "contact", label: "Contact Us" },
];

export default function Navbar({ route, setRoute, cartCount, cartBounce, onLogout, userName }) {
  return (
    <nav className="ec-nav">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
        <Brand size="text-xl" />
        <div className="flex items-center gap-6 flex-wrap">
          {NAV_LINKS.map((link) => (
            <button
              key={link.route}
              className={`ec-nav-link ${route === link.route ? "active" : ""}`}
              onClick={() => setRoute(link.route)}
            >
              {link.label}
            </button>
          ))}
          <button
            className={`ec-nav-link flex items-center gap-1.5 ${route === "cart" ? "active" : ""}`}
            onClick={() => setRoute("cart")}
          >
            <span className={cartBounce ? "ec-cart-bounce" : ""} style={{ display: "inline-flex" }}>
              <ShoppingCart size={18} />
            </span>
            Cart
            {cartCount > 0 && <span className="ec-badge">{cartCount}</span>}
          </button>
          <div
            className="hidden sm:flex items-center gap-2 pl-4"
            style={{ borderLeft: "1.5px solid var(--panel-line)" }}
          >
            <span className="text-sm" style={{ color: "var(--text-soft)" }}>
              Hi, {userName?.split(" ")[0] || "friend"}
            </span>
            <button className="ec-btn-ghost" onClick={onLogout} aria-label="Log out">
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}