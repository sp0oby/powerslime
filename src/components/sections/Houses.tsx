"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { BLOCS, HOUSES, byId, type House } from "@/data/lore";
import Drop from "../Drop";
import { tint } from "../SlimeCanvas";

function Portrait({ h, big = false }: { h: House; big?: boolean }) {
  const label = h.art?.slimearch ? `${h.slimearch}, Slimearch of ${h.power}` : `From the house of ${h.power}`;
  if (h.art?.video && big) {
    return <video className="portrait" src={h.art.video} poster={h.art.img} autoPlay muted loop playsInline aria-label={label} />;
  }
  if (h.art) return <img className="portrait" src={h.art.img} alt={label} loading="lazy" />;
  return (
    <div className="portrait portrait--sealed">
      <Drop a={h.colors[0]} b={h.colors[1]} size={big ? 240 : 170} mood={h.id === "umbra" ? "shut" : "sleepy"} />
      {big && <span className="portrait__tag">portrait sealed · art incoming</span>}
    </div>
  );
}

function Dossier({ h, onClose }: { h: House; onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    addEventListener("keydown", k);
    document.documentElement.classList.add("lock");
    return () => { removeEventListener("keydown", k); document.documentElement.classList.remove("lock"); };
  }, [onClose]);

  const rival = h.hatesId ? byId(h.hatesId) : null;
  const rows: [string, string][] = [
    ["What the power does", h.does],
    [h.pronoun === "she" ? "How she fights" : "How he fights", h.fights],
    ["Win", h.win],
    ["Loss", h.loss],
  ];

  return (
    <div className="dossier" role="dialog" aria-modal aria-label={`House of ${h.power}`} onClick={onClose}
      style={{ "--a": h.colors[0], "--b": h.colors[1] } as CSSProperties}>
      <div className="dossier__card" onClick={(e) => e.stopPropagation()} data-lenis-prevent>
        <button className="dossier__x" onClick={onClose} aria-label="Close">✕</button>
        <div className="dossier__art"><Portrait h={h} big /></div>
        <div className="dossier__text">
          <p className="eyebrow">№ {h.no} · {h.element} · house of</p>
          <h3 className="dossier__power">{h.power}</h3>
          <p className="dossier__arch">Slimearch <b>{h.slimearch}</b> <span>— {h.etymology}</span></p>
          <p className="dossier__look">{h.look}</p>
          <dl>
            {rows.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
            <div><dt>Hates</dt><dd>{h.hates}{rival && <span className="chip" style={{ "--a": rival.colors[0] } as CSSProperties}>{rival.power}</span>}</dd></div>
          </dl>
          <blockquote>“{h.quote}”</blockquote>
          <p className="dossier__supply"><b>{h.supply}</b> drops in wave one{h.supplyWhy ? ` — ${h.supplyWhy}` : ""}</p>
        </div>
      </div>
    </div>
  );
}

export default function Houses() {
  const [open, setOpen] = useState<House | null>(null);

  return (
    <section id="houses" className="houses" data-tint="#6cff2e,#0f4a12">
      <header className="houses__head">
        <p className="eyebrow">Every power has its own name</p>
        <h2 data-reveal>The twelve houses</h2>
        <p data-reveal className="houses__lede">
          The name is older than any Slimearch and older than the houses themselves. A house is named after the power, not after whoever runs it.
          People say &ldquo;house of Pyros.&rdquo; Ignivar is just the one holding it right now. <em>Slimearchs come and go. Pyros was there first.</em>
        </p>
      </header>

      {BLOCS.map((b) => (
        <div key={b.id} className={`bloc bloc--${b.id}`}>
          <div className="bloc__head" data-reveal>
            <h3>{b.name}</h3>
            <p>{b.tag}</p>
            <div className="bloc__meta">
              <span><i>held by</i> {b.holds}</span>
              <span className="bloc__crack"><i>the crack</i> {b.crack}</span>
            </div>
          </div>
          <div className="bloc__grid">
            {HOUSES.filter((h) => h.bloc === b.id).map((h) => (
              <button
                key={h.id}
                className="house"
                style={{ "--a": h.colors[0], "--b": h.colors[1] } as CSSProperties}
                onMouseEnter={() => tint(h.colors[0], h.colors[1])}
                onFocus={() => tint(h.colors[0], h.colors[1])}
                onClick={() => setOpen(h)}
                data-reveal
              >
                <span className="house__no">№ {h.no}</span>
                <span className="house__el">{h.element}</span>
                <div className="house__art"><Portrait h={h} /></div>
                <span className="house__power">{h.power}</span>
                <span className="house__arch">{h.slimearch}</span>
                <span className="house__quote">“{h.quote}”</span>
                <span className="house__open">open dossier ↗</span>
              </button>
            ))}
          </div>
        </div>
      ))}
      <p className="houses__note" data-reveal>Between blocs it&apos;s war. Inside a bloc it&apos;s an alliance with a crack in it. The three outside don&apos;t get touched, because everyone needs them.</p>

      {open && <Dossier h={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
