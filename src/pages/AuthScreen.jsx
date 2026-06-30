import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import Brand from "../components/Brand";
import FloatingIcons from "../components/FloatingIcons";

/**
 * Renders either the login or signup form, depending on `mode`.
 *
 * @param {"login"|"signup"} mode
 * @param {(mode: "login"|"signup") => void} onSwitchMode - toggles between login/signup
 * @param {(creds: {email, password}) => void} onLogin
 * @param {(creds: {name, email, password}) => void} onSignup
 * @param {boolean} loading - true while the fake auth request is "in flight"
 * @param {string} error - validation/auth error message, if any
 */
export default function AuthScreen({ mode, onSwitchMode, onLogin, onSignup, loading, error, info }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (mode === "signup") onSignup({ name, email, password });
    else onLogin({ email, password });
  }

  return (
    <div className="ec-shell flex items-center justify-center min-h-screen px-4 py-10 relative">
      <div className="ec-grid" />
      <FloatingIcons />
      <div
        className="ec-pop relative z-10 w-full max-w-md rounded-3xl shadow-xl"
        style={{
          background: "var(--panel)",
          border: "1.5px solid var(--panel-line)",
          padding: "2.25rem",
        }}
      >
        <div className="flex justify-center" style={{ marginBottom: "1.5rem" }}>
          <Brand />
        </div>
        <h1
          className="ec-display text-center"
          style={{ fontWeight: 700, fontSize: "1.875rem", marginBottom: "0.4rem" }}
        >
          {mode === "signup" ? "Create your account" : "Welcome back"}
        </h1>
        <p
          className="text-center"
          style={{ color: "var(--text-soft)", marginBottom: "1.85rem" }}
        >
          {mode === "signup"
            ? "Sign up to start browsing the catalog."
            : "Sign in to pick up where you left off."}
        </p>

        <form onSubmit={submit} className="flex flex-col" style={{ gap: "1.1rem" }}>
          {info && (
            <div
              className="flex items-center gap-2 text-sm rounded-xl"
              style={{ background: "rgba(61,224,200,0.12)", color: "var(--accent)", padding: "0.6rem 0.9rem" }}
            >
              {info}
            </div>
          )}
          {mode === "signup" && (
            <div className="ec-field">
              <User size={17} className="ec-field-icon" />
              <input
                className="ec-input"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="ec-field">
            <Mail size={17} className="ec-field-icon" />
            <input
              type="email"
              className="ec-input"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="ec-field">
            <Lock size={17} className="ec-field-icon" />
            <input
              type={showPw ? "text" : "password"}
              className="ec-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={4}
              required
            />
            <button
              type="button"
              className="ec-field-icon-right"
              onClick={() => setShowPw((s) => !s)}
              aria-label={showPw ? "Hide password" : "Show password"}
            >
              {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>

          {error && (
            <div
              className="flex items-center gap-2 text-sm rounded-xl"
              style={{ background: "rgba(255,92,92,0.12)", color: "var(--warn)", padding: "0.6rem 0.9rem" }}
            >
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <button
            type="submit"
            className="ec-btn ec-btn-primary"
            style={{ marginTop: "0.4rem" }}
            disabled={loading}
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                {mode === "signup" ? "Create account" : "Sign in"}
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>

        <div className="ec-divider-word" style={{ margin: "1.6rem 0" }}>or</div>

        <p className="text-center text-sm" style={{ color: "var(--text-soft)" }}>
          {mode === "signup" ? "Already have an account?" : "New here?"}{" "}
          <button
            className="font-bold"
            style={{ color: "var(--accent)", background: "none", border: "none", cursor: "pointer" }}
            onClick={() => onSwitchMode(mode === "signup" ? "login" : "signup")}
          >
            {mode === "signup" ? "Sign in" : "Create an account"}
          </button>
        </p>
      </div>
    </div>
  );
}