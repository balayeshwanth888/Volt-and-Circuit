import { useState, useCallback } from "react";
import { getProducts } from "../api/fakeStore";

/**
 * Fetches the electronics catalog on demand. Call `fetchProducts()`
 * yourself (e.g. in a useEffect keyed on route) rather than having the
 * hook fetch automatically, so the catalog only loads once the user
 * actually reaches the shop page.
 */
export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productError, setProductError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoadingProducts(true);
    setProductError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setProductError("Couldn't load the catalog. The connection may be offline.");
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  return { products, loadingProducts, productError, fetchProducts };
}