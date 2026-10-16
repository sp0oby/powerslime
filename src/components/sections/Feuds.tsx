"use client";

import { useState, type CSSProperties } from "react";
import { HOUSES, byId, type HouseId } from "@/data/lore";

const R = 230, C = 300;
const pos = HOUSES.map((h, i) => {
  const a = (i / HOUSES.length) * Math.PI * 2 - Math.PI / 2;
  const r2 = (n: number) => Math.round(n * 100) / 100; // stable across server/client
  return { h, x: r2(C + Math.cos(a) * R), y: r2(C + Math.sin(a) * R) };
});
const at = (id: HouseId) => pos.find((p) => p.h.id === id)!;

export default function Feuds() {
  const [focus, setFocus] = useState<HouseId | null>(null);
  const f = focus ? byId(focus) : null;

  return (
    <section className="feuds" data-tint="#ff3fd2,#1b0638">
      <div className="feuds__copy">
        <p className="eyebrow">Who hates whom</p>
        <h2 data-reveal>A web of grudges</h2>
        <p data-reveal>Every arrow is a grudge from the record. Hover a house. Astraeus and Hermetia hate nobody. Kairos hates nobody either, but all twelve hate him, and it&apos;s the only thing they agree on.</p>
        <div className="feuds__readout" aria-live="polite">
          {f ? (
            <>
              <b style={{ color: f.colors[0] }}>{f.slimearch}</b> of {f.power} hates <span>{f.hates}</span>
            </>
          ) : (
            <span className="muted">— hover a house —</span>
          )}
        </div>
      </div>

      <svg viewBox="0 0 600 600" className="feuds__svg" onMouseLeave={() => setFocus(null)}>
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" fill="currentColor" />
          </marker>
        </defs>
        {/* all twelve hate Kairos */}
        {pos.filter((p) => p.h.id !== "chronos").map((p) => {
          const k = at("chronos");
          return <line key={`k-${p.h.id}`} x1={p.x} y1={p.y} x2={k.x} y2={k.y}
            className={`feud feud--all ${focus === "chronos" ? "on" : ""}`} />;
        })}
        {pos.filter((p) => p.h.hatesId).map((p) => {
          const t = at(p.h.hatesId!);
          const mx = (p.x + t.x) / 2, my = (p.y + t.y) / 2;
          const cx = Math.round(mx + (C - mx) * 0.55), cy = Math.round(my + (C - my) * 0.55);
          const on = focus === p.h.id || focus === p.h.hatesId;
          return (
            <path key={p.h.id} d={`M${p.x} ${p.y} Q${cx} ${cy} ${t.x} ${t.y}`}
              className={`feud ${on ? "on" : ""} ${focus && !on ? "dim" : ""}`}
              style={{ color: p.h.colors[0] } as CSSProperties} markerEnd="url(#arr)" />
          );
        })}
        {pos.map((p) => (
          <g key={p.h.id} className={`node ${focus === p.h.id ? "on" : ""}`} transform={`translate(${p.x} ${p.y})`}
            onMouseEnter={() => setFocus(p.h.id)} onFocus={() => setFocus(p.h.id)} tabIndex={0}
            style={{ "--a": p.h.colors[0], "--b": p.h.colors[1] } as CSSProperties}>
            <circle r={30} className="node__body" />
            <circle r={7} cx={-10} cy={-12} fill="#fff" opacity=".85" />
            <text y={52} textAnchor="middle">{p.h.slimearch}</text>
          </g>
        ))}
      </svg>
    </section>
  );
}
