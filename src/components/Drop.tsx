import type { CSSProperties } from "react";

// A house drop in the collection's look: ink outline, gloss, sleepy eyes.
// Used as the placeholder portrait until real art lands for a house.
export default function Drop({
  a, b, size = 120, mood = "sleepy", className = "",
}: { a: string; b: string; size?: number; mood?: "sleepy" | "wide" | "shut"; className?: string }) {
  return (
    <div
      className={`drop drop--${mood} ${className}`}
      style={{ "--a": a, "--b": b, "--s": `${size}px` } as CSSProperties}
      aria-hidden
    >
      <div className="drop__body">
        <span className="drop__gloss" />
        <span className="drop__eye drop__eye--l" />
        <span className="drop__eye drop__eye--r" />
      </div>
    </div>
  );
}
