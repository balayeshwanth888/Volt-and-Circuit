import { useState, useRef } from "react";

const USERS_STORAGE_KEY = "vc_users";

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    // Stored as an array of [email, {name, password}] pairs (Map isn't JSON-serializable directly)
    return raw ? new Map(JSON.parse(raw)) : new Map();
  } catch {
    return new Map();
  }
}

function saveUsers(usersMap) {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(Array.from(usersMap.entries())));
  } catch {
    // localStorage unavailable (private browsing, quota, etc.) — fail silently
  }
}

/**
 * Owns auth state: current user, loading flag, and error/info messages.
 * Login/signup are faked with a short timeout instead of a real backend
 * call, but registered accounts are now persisted to localStorage (not
 * just kept in memory), so signing up survives a page reload and login
 * actually works afterwards. Swap the setTimeout bodies for real API
 * calls when you have a backend.
 *
 * NOTE: storing plaintext passwords in localStorage is only OK because
 * this is a frontend-only demo with no real backend. Never do this in
 * a real app — passwords must be hashed server-side, and accounts must
 * live in a real database, not the browser.
 */
export default function useAuth() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);

  // In-memory cache of the persisted users map, kept in sync with localStorage.
  const usersRef = useRef(loadUsers());

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
      saveUsers(usersRef.current);
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