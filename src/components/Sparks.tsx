"use client";

import { useEffect, useState } from "react";

// "Every one of the twelve houses has a piece of Fulgur in it now.
//  That's why they spark sometimes. Nobody talks about it."
type Spark = { id: number; x: number; y: number; r: number; s: number };

const bolt = (seed: number) => {
  let x = 20, y = 0, d = `M${x} ${y}`;
  for (let i = 1; i <= 6; i++) {
    x = 20 + Math.sin(seed * 13.7 + i * 2.3) * 12;
    y = i * 10;
    d += ` L${x.toFixed(1)} ${y}`;
  }
  return d;
};

export default function Sparks() {
  const [sparks, setSparks] = useState<Spark[]>([]);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id = 0, timer: ReturnType<typeof setTimeout>;
    const fire = () => {
      const s: Spark = { id: id++, x: 5 + Math.random() * 90, y: 10 + Math.random() * 80, r: Math.random() * 60 - 30, s: Math.random() };
      setSparks((p) => [...p.slice(-3), s]);
      timer = setTimeout(fire, 5000 + Math.random() * 9000);
    };
    timer = setTimeout(fire, 4000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="sparks" aria-hidden>
      {sparks.map((s) => (
        <svg key={s.id} className="spark" viewBox="0 0 40 60"
          style={{ left: `${s.x}vw`, top: `${s.y}vh`, transform: `rotate(${s.r}deg)` }}>
          <path d={bolt(s.s)} />
        </svg>
      ))}
    </div>
  );
}
