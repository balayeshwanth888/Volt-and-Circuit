import { useState } from "react";

/**
 * Owns the shopping cart state and all mutations, plus two short-lived
 * animation flags (cartBounce, taggedId) that components can read to
 * trigger the nav-icon bounce and the "ADDED" card tag.
 */
export default function useCart() {
  const [cart, setCart] = useState([]);
  const [cartBounce, setCartBounce] = useState(false);
  const [taggedId, setTaggedId] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

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
  }

  function resetCart() {
    setOrderPlaced(false);
    setCart([]);
  }

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
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