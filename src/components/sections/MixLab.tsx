"use client";

import { useState, type CSSProperties } from "react";
import { HOUSES, byId, mix, type HouseId } from "@/data/lore";

const KIND_LABEL = {
  pure: "Pureblood",
  never: "Never mixes",
  forbidden: "Mixes, but forbidden",
  common: "Common",
  unnamed: "Unremarkable",
} as const;

export default function MixLab() {
  const [a, setA] = useState<HouseId>("pyros");
  const [b, setB] = useState<HouseId>("lithos");
  const [k, setK] = useState(0);
  const res = mix(a, b);
  const A = byId(a), B = byId(b);

  const Picker = ({ value, set, side }: { value: HouseId; set: (h: HouseId) => void; side: string }) => (
    <div className="mix__picker" role="radiogroup" aria-label={`${side} house`}>
      {HOUSES.map((h) => (
        <button key={h.id} role="radio" aria-checked={value === h.id}
          className={value === h.id ? "on" : ""}
          style={{ "--a": h.colors[0], "--b": h.colors[1] } as CSSProperties}
          onClick={() => { set(h.id); setK((x) => x + 1); }}>
          {h.power}
        </button>
      ))}
    </div>
  );

  return (
    <section id="mix" className="mix" data-tint={`${res.color},#0b0b0b`}>
      <header>
        <p className="eyebrow">How they mix</p>
        <h2 data-reveal>Mixing lab</h2>
        <p data-reveal>Pick two powers. The record says what comes out. Some never mix at all. Some do, and the noble houses cull the result.</p>
      </header>

      <div className="mix__stage">
        <Picker value={a} set={setA} side="First" />
        <div className="mix__vat" key={k}>
          <svg viewBox="0 0 400 300" aria-hidden>
            <circle className="mix__dish" cx="200" cy="150" r="128" />
            <g filter="url(#goo)">
              <circle className="mix__l" cx="200" cy="150" r="70" fill={A.colors[0]} />
              <circle className="mix__r" cx="200" cy="150" r="70" fill={B.colors[0]} />
              <circle className={`mix__res mix__res--${res.kind}`} cx="200" cy="150" r="84" fill={res.color} />
            </g>
            <g className={`mix__shine mix__res--${res.kind}`}>
              <ellipse cx="172" cy="112" rx="18" ry="10" transform="rotate(-30 172 112)" />
              <circle cx="196" cy="102" r="5" />
            </g>
          </svg>
          <div className={`mix__result mix__result--${res.kind}`}>
            <span className="mix__kind">{KIND_LABEL[res.kind]}</span>
            <strong>{res.name}</strong>
            <p>{res.text}</p>
          </div>
        </div>
        <Picker value={b} set={setB} side="Second" />
      </div>
    </section>
  );
}
