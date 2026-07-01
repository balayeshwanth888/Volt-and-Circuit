import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ConfirmDialog from "./components/ConfirmDialog";
import AuthScreen from "./pages/AuthScreen";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import useAuth from "./hooks/useAuth";
import useCart from "./hooks/useCart";
import useProducts from "./hooks/useProducts";
import useWishlist from "./hooks/useWishlist";

/**
 * Top-level app component. Owns only the "route" state (which screen is
 * showing) and stitches together the three hooks for auth, cart, and
 * products. All actual logic lives in the hooks; this component just
 * wires handlers to pages.
 *
 * route: "login" | "signup" | "home" | "products" | "about" | "contact" | "cart"
 */
export default function App() {
  const [route, setRoute] = useState("login");
  const [justSignedUp, setJustSignedUp] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    user,
    authLoading,
    authError,
    signupSuccess,
    login,
    signup,
    logout,
    clearAuthError,
    clearSignupSuccess,
  } = useAuth();
  const {
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
  } = useCart(user?.email ?? null);
  const { products, loadingProducts, productError, fetchProducts } = useProducts();
  const { wishlist, wishlistCount, isWishlisted, toggleWishlist, removeFromWishlist } = useWishlist(
    user?.email ?? null
  );

  // Load the catalog the first time the user reaches home or products.
  useEffect(() => {
    if ((route === "home" || route === "products") && products.length === 0 && !loadingProducts) {
      fetchProducts();
    }
  }, [route, products.length, loadingProducts, fetchProducts]);

  // Move to the home page once login actually succeeds.
  useEffect(() => {
    if (user && route === "login") {
      setRoute("home");
    }
  }, [user, route]);

  // After a successful signup, redirect to the login screen so the
  // user enters their credentials fresh rather than being auto-logged in.
  useEffect(() => {
    if (signupSuccess && route === "signup") {
      setRoute("login");
      setJustSignedUp(true);
      clearSignupSuccess();
    }
  }, [signupSuccess, route, clearSignupSuccess]);

  function handleLogoutClick() {
    setShowLogoutConfirm(true);
  }

  function confirmLogout() {
    setShowLogoutConfirm(false);
    logout();
    setRoute("login");
  }

  function cancelLogout() {
    setShowLogoutConfirm(false);
  }

  function handleSwitchMode(mode) {
    clearAuthError();
    setJustSignedUp(false);
    setRoute(mode);
  }

  function handleContinueShopping() {
    resetCart();
    setRoute("products");
  }

  function handleViewDetail(product) {
    setSelectedProduct(product);
  }

  function handleBackFromDetail() {
    setSelectedProduct(null);
  }

  if (route === "login" || route === "signup") {
    return (
      <div className="ec-shell">
        <AuthScreen
          mode={route}
          onSwitchMode={handleSwitchMode}
          onLogin={(creds) => {
            setJustSignedUp(false);
            login(creds);
          }}
          onSignup={signup}
          loading={authLoading}
          error={authError}
          info={route === "login" && justSignedUp ? "Account created — sign in to continue." : ""}
        />
      </div>
    );
  }

  return (
    <div className="ec-shell">
      <Navbar
        route={route}
        setRoute={setRoute}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        cartBounce={cartBounce}
        onLogout={handleLogoutClick}
        userName={user?.name}
      />
      {/* Spacer to offset the fixed navbar's height so content doesn't render underneath it */}
      <div aria-hidden="true" style={{ height: "var(--nav-height, 4.5rem)" }} />
      <ConfirmDialog
        open={showLogoutConfirm}
        title="Log out?"
        message="You'll need to sign in again to get back to your cart and account."
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
      <div key={route} className="ec-page-enter">
        {route === "home" && (
          <HomePage
            onShopNow={() => setRoute("products")}
            products={products}
            loading={loadingProducts}
            cart={cart}
            onAdd={addToCart}
            onQty={updateQty}
            taggedId={taggedId}
            isWishlisted={isWishlisted}
            onToggleWishlist={toggleWishlist}
            onViewDetail={handleViewDetail}
          />
        )}
        {route === "products" && (
          <ShopPage
            products={products}
            loading={loadingProducts}
            error={productError}
            cart={cart}
            onAdd={addToCart}
            onQty={updateQty}
            taggedId={taggedId}
            onRetry={fetchProducts}
            isWishlisted={isWishlisted}
            onToggleWishlist={toggleWishlist}
            onViewDetail={handleViewDetail}
          />
        )}
        {route === "about" && <AboutPage />}
        {route === "contact" && <ContactPage />}
        {route === "wishlist" && (
          <WishlistPage
            wishlist={wishlist}
            cart={cart}
            onAdd={addToCart}
            onQty={updateQty}
            onToggleWishlist={toggleWishlist}
            onViewDetail={handleViewDetail}
            onBrowse={() => setRoute("products")}
          />
        )}
        {route === "cart" && (
          <CartPage
            cart={cart}
            onQty={updateQty}
            onRemove={removeFromCart}
            total={cartTotal}
            onPlaceOrder={placeOrder}
            placed={orderPlaced}
            onContinue={handleContinueShopping}
          />
        )}
      </div>

      {/* Product detail overlay — rendered on top of whichever page is active */}
      {selectedProduct && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            background: "var(--bg)",
            overflowY: "auto",
          }}
        >
          <ProductDetailPage
            product={selectedProduct}
            qty={cart.find((i) => i.id === selectedProduct?.id)?.qty || 0}
            wishlisted={isWishlisted(selectedProduct?.id)}
            onAdd={addToCart}
            onQty={updateQty}
            onToggleWishlist={toggleWishlist}
            onBack={handleBackFromDetail}
          />
        </div>
      )}
      <Footer />
    </div>
  );
}