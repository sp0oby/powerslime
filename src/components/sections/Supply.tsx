"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ALL_HOUSES, HOUSES, TOTAL_SUPPLY, type HouseId } from "@/data/lore";

// 1,200 drops, one per token. Houses fill in order; Fulgur's three are
// hidden among the rest and only show when they spark.
export default function Supply() {
  const root = useRef<HTMLElement>(null);
  const [hover, setHover] = useState<HouseId | null>(null);

  const cells = useMemo(() => {
    const list: HouseId[] = [];
    [...HOUSES].sort((a, b) => b.supply - a.supply).forEach((h) => {
      for (let i = 0; i < h.supply; i++) list.push(h.id);
    });
    // tuck Fulgur's drops in at fixed, scattered positions
    [211, 640, 1013].forEach((at) => list.splice(at, 0, "fulgur"));
    return list.slice(0, TOTAL_SUPPLY);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".supply__cell", {
        scale: 0, transformOrigin: "50% 50%", ease: "back.out(3)", duration: 0.5,
        stagger: { each: 0.0012, from: "start" },
        scrollTrigger: { trigger: ".supply__grid", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const color = Object.fromEntries(ALL_HOUSES.map((h) => [h.id, h.colors[0]]));
  const cols = 50;

  return (
    <section className="supply" ref={root} data-tint="#2ec5ff,#06235e">
      <header>
        <p className="eyebrow">Supply by house · wave one</p>
        <h2 data-reveal>1,200 drops. All twelve ship.</h2>
        <p data-reveal>The split is uneven, and it comes out of the lore rather than out of thin air. Lithos ends up the rarest of the ordinary houses: the boring unpopular tribe that there&apos;s the least of.</p>
      </header>
      <div className="supply__wrap">
        <svg className="supply__grid" viewBox={`0 0 ${cols * 12} ${Math.ceil(TOTAL_SUPPLY / cols) * 12}`} role="img"
          aria-label="Grid of 1,200 drops colored by house">
          {cells.map((id, i) => (
            <circle key={i} className={`supply__cell ${id === "fulgur" ? "is-fulgur" : ""} ${hover && hover !== id ? "dim" : ""}`}
              cx={(i % cols) * 12 + 6} cy={Math.floor(i / cols) * 12 + 6} r={4.6}
              fill={id === "fulgur" ? "#2a2f2a" : color[id]} />
          ))}
        </svg>
        <ul className="supply__legend" onMouseLeave={() => setHover(null)}>
          {[...HOUSES].sort((a, b) => b.supply - a.supply).map((h) => (
            <li key={h.id} onMouseEnter={() => setHover(h.id)} style={{ "--a": h.colors[0] } as CSSProperties}>
              <i /> <span>{h.power}</span> <b>{h.supply}</b>
              {h.supplyWhy && <small>{h.supplyWhy}</small>}
            </li>
          ))}
          <li className="is-fulgur" onMouseEnter={() => setHover("fulgur")} style={{ "--a": "#eaff3a" } as CSSProperties}>
            <i /> <span>Fulgur</span> <b>3</b><small>secret, reassembling</small>
          </li>
        </ul>
      </div>
    </section>
  );
}
