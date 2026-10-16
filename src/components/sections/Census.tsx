"use client";

import { useState, type CSSProperties } from "react";
import { HOUSES, TOTAL_SUPPLY, type House } from "@/data/lore";

type Reading = { id: number; parts: { h: House; pct: number }[]; fulgur: number; veiled: boolean };

function weightedPick(pool: House[]) {
  const total = pool.reduce((s, h) => s + h.supply, 0);
  let r = Math.random() * total;
  for (const h of pool) if ((r -= h.supply) <= 0) return h;
  return pool[0];
}

function read(): Reading {
  const n = 2 + Math.floor(Math.random() * 4);
  const pool = HOUSES.filter((h) => h.id !== "umbra");
  const picked: House[] = [];
  while (picked.length < n) {
    const h = weightedPick(pool.filter((p) => !picked.includes(p)));
    picked.push(h);
  }
  // one drop of Umbra makes the whole body unreadable
  const veiled = Math.random() < 0.16;
  const fulgur = +(0.1 + Math.random() * 0.8).toFixed(1);
  const w = picked.map(() => Math.pow(Math.random(), 1.6) + 0.05);
  const sum = w.reduce((a, b) => a + b, 0);
  let left = 100 - fulgur;
  const parts = picked.map((h, i) => {
    const pct = i === picked.length - 1 ? left : +((w[i] / sum) * (100 - fulgur)).toFixed(1);
    left = +(left - pct).toFixed(1);
    return { h, pct: +pct.toFixed(1) };
  }).sort((a, b) => b.pct - a.pct);
  return { id: 1 + Math.floor(Math.random() * TOTAL_SUPPLY), parts, fulgur, veiled };
}

export default function Census() {
  const [r, setR] = useState<Reading | null>(null);
  const [n, setN] = useState(0);

  return (
    <section id="census" className="census" data-tint="#fff36b,#7a5a00">
      <div className="census__copy">
        <p className="eyebrow">Lumen shows composition</p>
        <h2 data-reveal>Run the Census</h2>
        <p data-reveal>
          Aurexis stood up and read out the composition. Publicly, by name, drop by drop. Who is made of what. Whose blood doesn&apos;t match the crest on the gate.
          He can&apos;t lie. It&apos;s a property of Lumen.
        </p>
        <button className="btn btn--light" onClick={() => { setR(read()); setN((x) => x + 1); }}>
          {r ? "Read another" : "Read a slime"}
        </button>
        <p className="census__quote">“I&apos;ll tell you what you&apos;re made of. What you do about it isn&apos;t my part.” <span>— Aurexis</span></p>
      </div>

      <div className={`census__slip ${r?.veiled ? "is-veiled" : ""}`} key={n} aria-live="polite">
        {!r && (
          <div className="census__empty">
            <span className="census__eye" />
            <p>Nobody has been read yet.</p>
          </div>
        )}
        {r && (
          <>
            <header>
              <span>CENSUS · subject №{String(r.id).padStart(4, "0")}</span>
              <span>{r.veiled ? "status: unreadable" : `${r.parts.length} houses detected`}</span>
            </header>
            {r.veiled ? (
              <div className="census__veil">
                <p className="census__veil-big">UNREADABLE</p>
                <p>One drop of Umbra inside a body makes the whole body unreadable. Plenty of them don&apos;t know the drop is there.</p>
              </div>
            ) : (
              <ul>
                {r.parts.map((p, i) => (
                  <li key={p.h.id} style={{ "--a": p.h.colors[0], "--d": `${i * 0.18}s`, "--w": `${p.pct}%` } as CSSProperties}>
                    <span className="census__name">{p.h.power}</span>
                    <span className="census__bar"><i /></span>
                    <span className="census__pct">{p.pct.toFixed(1)}%</span>
                  </li>
                ))}
                <li className="census__fulgur" style={{ "--a": "#eaff3a", "--d": `${r.parts.length * 0.18}s`, "--w": `${Math.max(r.fulgur, 1.2)}%` } as CSSProperties}>
                  <span className="census__name">Fulgur</span>
                  <span className="census__bar"><i /></span>
                  <span className="census__pct">{r.fulgur}%</span>
                </li>
              </ul>
            )}
            <footer>{r.veiled ? "Nyxaris sends her regards." : "trace Fulgur present. nobody talks about it."}</footer>
          </>
        )}
      </div>
    </section>
  );
}
