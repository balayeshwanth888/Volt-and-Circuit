import { LogOut } from "lucide-react";

/**
 * A small modal that asks for confirmation before a destructive/irreversible
 * action (currently used for logout). Renders nothing when `open` is false.
 *
 * @param {boolean} open
 * @param {string} title
 * @param {string} message
 * @param {() => void} onConfirm
 * @param {() => void} onCancel
 */
export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="ec-modal-backdrop" onClick={onCancel}>
      <div
        className="ec-modal ec-pop"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-center rounded-full mb-4"
          style={{ width: 52, height: 52, background: "rgba(255,92,92,0.12)", color: "var(--warn)" }}
        >
          <LogOut size={24} />
        </div>
        <h2 id="confirm-dialog-title" className="ec-display text-xl mb-2" style={{ fontWeight: 700 }}>
          {title}
        </h2>
        <p className="text-sm mb-6" style={{ color: "var(--text-soft)" }}>
          {message}
        </p>
        <div className="flex gap-3" style={{ width: "100%" }}>
          <button className="ec-btn ec-btn-outline" style={{ flex: 1 }} onClick={onCancel}>
            No
          </button>
          <button className="ec-btn ec-btn-primary" style={{ flex: 1 }} onClick={onConfirm}>
            Yes, log out
          </button>
        </div>
      </div>
    </div>
  );
}