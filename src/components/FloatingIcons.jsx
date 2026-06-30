import { Cpu, Headphones, Smartphone, Camera, Watch } from "lucide-react";

/**
 * Decorative, slowly-drifting tech icons used as background atmosphere
 * on the login/signup screens. Purely visual — no props, no state.
 * Respects prefers-reduced-motion via the .ec-float rule in theme.css.
 */
export default function FloatingIcons() {
  const icons = [
    { Icon: Cpu, top: "8%", left: "6%", size: 42, delay: "0s" },
    { Icon: Headphones, top: "70%", left: "10%", size: 36, delay: "1.2s" },
    { Icon: Smartphone, top: "18%", left: "88%", size: 30, delay: "0.6s" },
    { Icon: Camera, top: "75%", left: "85%", size: 38, delay: "1.8s" },
    { Icon: Watch, top: "45%", left: "92%", size: 26, delay: "2.4s" },
  ];

  return (
    <>
      {icons.map(({ Icon, top, left, size, delay }, i) => (
        <div
          key={i}
          className="ec-float"
          style={{ top, left, animationDelay: delay }}
          aria-hidden="true"
        >
          <Icon size={size} />
        </div>
      ))}
    </>
  );
}