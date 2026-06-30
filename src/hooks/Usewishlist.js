import { useState, useEffect, useRef } from "react";

const STORAGE_PREFIX = "vc_wishlist:";

function loadWishlist(userKey) {
  if (!userKey) return [];
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + userKey);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveWishlist(userKey, items) {
  if (!userKey) return;
  try {
    localStorage.setItem(STORAGE_PREFIX + userKey, JSON.stringify(items));
  } catch {
    // localStorage unavailable — fail silently
  }
}

/**
 * Owns the wishlist: a simple list of saved products (no quantity).
 * Persisted to localStorage per account, same pattern as useCart.
 *
 * @param {string|null} userKey - the current user's email, or null when signed out
 */
export default function useWishlist(userKey) {
  const [wishlist, setWishlist] = useState(() => loadWishlist(userKey));
  const previousUserKey = useRef(userKey);

  useEffect(() => {
    if (previousUserKey.current !== userKey) {
      setWishlist(loadWishlist(userKey));
      previousUserKey.current = userKey;
    }
  }, [userKey]);

  useEffect(() => {
    saveWishlist(userKey, wishlist);
  }, [wishlist, userKey]);

  function isWishlisted(id) {
    return wishlist.some((p) => p.id === id);
  }

  function toggleWishlist(product) {
    setWishlist((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  }

  function removeFromWishlist(id) {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  }

  return {
    wishlist,
    wishlistCount: wishlist.length,
    isWishlisted,
    toggleWishlist,
    removeFromWishlist,
  };
}