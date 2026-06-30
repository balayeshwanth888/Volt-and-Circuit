import { Minus, Plus, Trash2 } from "lucide-react";

/**
 * A single line item in the cart.
 *
 * @param {object} item - { id, title, price, image, qty }
 * @param {(id: number, delta: number) => void} onQty - increments/decrements quantity (qty floors at 1)
 * @param {(id: number) => void} onRemove - removes the item from the cart entirely
 */
export default function CartRow({ item, onQty, onRemove }) {
  return (
    <div className="flex items-center gap-4 py-4" style={{ borderBottom: "1.5px solid var(--panel-line)" }}>
      <div
        className="flex items-center justify-center rounded-xl bg-white flex-shrink-0"
        style={{ width: 64, height: 64, border: "1.5px solid var(--panel-line)" }}
      >
        <img src={item.image} alt={item.title} style={{ maxHeight: "85%", maxWidth: "85%" }} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold line-clamp-1">{item.title}</p>
        <p className="ec-mono text-sm mt-1" style={{ color: "var(--accent)" }}>
          ${item.price.toFixed(2)}
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-full px-2 py-1" style={{ border: "1.5px solid var(--panel-line)" }}>
        <button
          className="ec-btn-ghost"
          style={{ padding: "0.2rem" }}
          onClick={() => onQty(item.id, -1)}
          aria-label="Decrease quantity"
        >
          <Minus size={14} />
        </button>
        <span className="ec-mono text-sm w-5 text-center">{item.qty}</span>
        <button
          className="ec-btn-ghost"
          style={{ padding: "0.2rem" }}
          onClick={() => onQty(item.id, 1)}
          aria-label="Increase quantity"
        >
          <Plus size={14} />
        </button>
      </div>

      <button className="ec-btn-ghost" onClick={() => onRemove(item.id)} aria-label="Remove item">
        <Trash2 size={17} />
      </button>
    </div>
  );
}