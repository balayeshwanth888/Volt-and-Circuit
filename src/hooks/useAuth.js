import { useState, useRef } from "react";

/**
 * Owns auth state: current user, loading flag, and error/info messages.
 * Login/signup are faked with a short timeout instead of a real
 * backend call, but track "registered" users in memory (via a ref, so
 * it survives re-renders but resets on page reload) and validate login
 * against that list. Swap the setTimeout bodies for real API calls
 * when you have a backend.
 *
 * Signup does NOT log the user in — it registers the account and sets
 * `signupSuccess: true` so the caller (App.jsx) can redirect to the
 * login screen instead.
 */
export default function useAuth() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);

  // In-memory "database" of signed-up accounts: email -> { name, password }
  // NOTE: storing plaintext passwords like this is only OK because this
  // is a frontend-only demo with no real backend. Never do this in a
  // real app — passwords must be hashed server-side.
  const usersRef = useRef(new Map());

  function login({ email, password }) {
    setAuthError("");
    if (!email || !password) {
      setAuthError("Enter your email and password.");
      return;
    }

    setAuthLoading(true);
    setTimeout(() => {
      setAuthLoading(false);

      const normalizedEmail = email.trim().toLowerCase();
      const record = usersRef.current.get(normalizedEmail);

      if (!record || record.password !== password) {
        setAuthError("Invalid username or password.");
        return;
      }

      setUser({ name: record.name, email: normalizedEmail });
    }, 600);
  }

  function signup({ name, email, password }) {
    setAuthError("");
    setSignupSuccess(false);

    if (!name || !email || password.length < 4) {
      setAuthError("Fill every field — password needs at least 4 characters.");
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (usersRef.current.has(normalizedEmail)) {
      setAuthError("An account with that email already exists.");
      return;
    }

    setAuthLoading(true);
    setTimeout(() => {
      setAuthLoading(false);
      usersRef.current.set(normalizedEmail, { name, password });
      // Don't log in automatically — signal success so App.jsx can
      // redirect to the login screen instead.
      setSignupSuccess(true);
    }, 600);
  }

  function logout() {
    setUser(null);
    setAuthError("");
  }

  function clearAuthError() {
    setAuthError("");
  }

  function clearSignupSuccess() {
    setSignupSuccess(false);
  }

  return {
    user,
    authLoading,
    authError,
    signupSuccess,
    login,
    signup,
    logout,
    clearAuthError,
    clearSignupSuccess,
  };
}