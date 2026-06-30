import { Cpu } from "lucide-react";

/**
 * Logo + wordmark for Volt & Circuit.
 * Reused in the navbar and on the auth card.
 *
 * @param {string} size - Tailwind text-size class for the wordmark (default "text-2xl")
 */
export default function Brand({ size = "text-2xl" }) {
  return (
    <div className="flex items-center gap-2">
      <Cpu size={22} style={{ color: "var(--accent)" }} />
      <span className={`ec-display ${size}`} style={{ fontWeight: 700 }}>
        Volt &amp; Circuit
      </span>
    </div>
  );
}