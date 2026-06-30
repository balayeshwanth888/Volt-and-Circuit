import { ShoppingCart, Heart, LogOut } from "lucide-react";
import Brand from "./Brand";

/**
 * Top navigation bar shown on every authenticated page.
 *
 * @param {string} route - current route, used to highlight the active link
 *   one of: "home" | "products" | "about" | "contact" | "wishlist" | "cart"
 * @param {(route: string) => void} setRoute - switches route (replace with react-router navigate() in a real app)
 * @param {number} cartCount - distinct products in cart, shown as a badge
 * @param {number} wishlistCount - saved products, shown as a badge
 * @param {boolean} cartBounce - briefly true right after an add-to-cart, triggers the bounce animation
 * @param {() => void} onLogout - opens the logout confirmation
 * @param {string} userName - signed-in user's name, shown in the greeting
 */
const NAV_LINKS = [
  { route: "home", label: "Home" },
  { route: "products", label: "Products" },
  { route: "about", label: "About Us" },
  { route: "contact", label: "Contact Us" },
];

export default function Navbar({ route, setRoute, cartCount, wishlistCount, cartBounce, onLogout, userName }) {
  return (
    <nav className="ec-nav">
      <div
        className="max-w-6xl mx-auto flex items-center justify-between"
        style={{ padding: "1rem 1.25rem", gap: "1rem", flexWrap: "wrap" }}
      >
        <Brand size="text-xl" />
        <div className="flex items-center" style={{ gap: "1.5rem", flexWrap: "wrap" }}>
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
            className={`ec-nav-link flex items-center ${route === "wishlist" ? "active" : ""}`}
            style={{ gap: "0.4rem" }}
            onClick={() => setRoute("wishlist")}
          >
            <Heart size={18} />
            Wishlist
            {wishlistCount > 0 && <span className="ec-badge">{wishlistCount}</span>}
          </button>
          <button
            className={`ec-nav-link flex items-center ${route === "cart" ? "active" : ""}`}
            style={{ gap: "0.4rem" }}
            onClick={() => setRoute("cart")}
          >
            <span className={cartBounce ? "ec-cart-bounce" : ""} style={{ display: "inline-flex" }}>
              <ShoppingCart size={18} />
            </span>
            Cart
            {cartCount > 0 && <span className="ec-badge">{cartCount}</span>}
          </button>
          <div
            className="hidden sm:flex items-center"
            style={{ gap: "0.6rem", paddingLeft: "1.25rem", borderLeft: "1.5px solid var(--panel-line)" }}
          >
            <span className="text-sm" style={{ color: "var(--text-soft)" }}>
              Hi, {userName?.split(" ")[0] || "friend"}
            </span>
            <button
              className="ec-btn ec-btn-outline flex items-center"
              style={{ gap: "0.4rem", padding: "0.4rem 0.85rem" }}
              onClick={onLogout}
            >
              <LogOut size={15} /> Log out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}