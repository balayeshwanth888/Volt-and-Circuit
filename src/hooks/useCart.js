import { useState, useEffect, useRef } from "react";

const STORAGE_PREFIX = "vc_cart:";

function loadCart(userKey) {
  if (!userKey) return [];
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + userKey);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(userKey, cart) {
  if (!userKey) return;
  try {
    localStorage.setItem(STORAGE_PREFIX + userKey, JSON.stringify(cart));
  } catch {
    // localStorage unavailable (private browsing, quota, etc.) — fail silently
  }
}

/**
 * Owns the shopping cart state and all mutations, plus two short-lived
 * animation flags (cartBounce, taggedId) that components can read to
 * trigger the nav-icon bounce and the "ADDED" card tag.
 *
 * Cart contents are persisted to localStorage per account, keyed by
 * `userKey` (pass the signed-in user's email). When `userKey` changes
 * (login/logout/switch account), the hook automatically loads that
 * account's saved cart instead of starting empty.
 *
 * @param {string|null} userKey - the current user's email, or null when signed out
 */
export default function useCart(userKey) {
  const [cart, setCart] = useState(() => loadCart(userKey));
  const [cartBounce, setCartBounce] = useState(false);
  const [taggedId, setTaggedId] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const previousUserKey = useRef(userKey);

  // When the signed-in user changes, swap to that user's saved cart
  // instead of carrying over whatever was in memory.
  useEffect(() => {
    if (previousUserKey.current !== userKey) {
      setCart(loadCart(userKey));
      setOrderPlaced(false);
      previousUserKey.current = userKey;
    }
  }, [userKey]);

  // Persist every cart change for the current user.
  useEffect(() => {
    saveCart(userKey, cart);
  }, [cart, userKey]);

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...product, qty: 1 }];
    });

    setTaggedId(product.id);
    setCartBounce(true);
    setTimeout(() => setTaggedId(null), 900);
    setTimeout(() => setCartBounce(false), 500);
  }

  function updateQty(id, delta) {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }

  function placeOrder() {
    setOrderPlaced(true);
    setCart([]);
  }

  function resetCart() {
    setOrderPlaced(false);
  }

  const cartCount = cart.length;
  const cartTotal = cart.reduce((sum, i) => sum + i.qty * i.price, 0);

  return {
    cart,
    cartCount,
    cartTotal,
    cartBounce,
    taggedId,
    orderPlaced,
    addToCart,
    updateQty,
    removeFromCart,
    placeOrder,
    resetCart,
  };
}