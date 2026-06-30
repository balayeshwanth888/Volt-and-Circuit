/**
 * Live wrapper around the Fake Store API, scoped to electronics —
 * this now fits the real catalog instead of needing a mock dataset.
 */

const BASE_URL = "https://fakestoreapi.com";
const ELECTRONICS_CATEGORY = "electronics";

/**
 * Fetches the electronics product catalog.
 *
 * @returns {Promise<object[]>} array of { id, title, price, description, category, image, rating }
 * @throws {Error} if the request fails or the response is not ok
 */
export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products/category/${ELECTRONICS_CATEGORY}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch products (status ${res.status})`);
  }
  return res.json();
}

/**
 * Fetches a single product by id.
 *
 * @param {number|string} id
 * @returns {Promise<object>}
 * @throws {Error} if the request fails or the response is not ok
 */
export async function getProduct(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch product ${id} (status ${res.status})`);
  }
  return res.json();
}

/**
 * Fetches all product categories available on the Fake Store API.
 *
 * @returns {Promise<string[]>}
 * @throws {Error} if the request fails or the response is not ok
 */
export async function getCategories() {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) {
    throw new Error(`Failed to fetch categories (status ${res.status})`);
  }
  return res.json();
}

/**
 * Fetches products belonging to a single category.
 *
 * @param {string} category
 * @returns {Promise<object[]>}
 * @throws {Error} if the request fails or the response is not ok
 */
export async function getProductsByCategory(category) {
  const res = await fetch(`${BASE_URL}/products/category/${encodeURIComponent(category)}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch category "${category}" (status ${res.status})`);
  }
  return res.json();
}