"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { TOTAL_SUPPLY } from "@/data/lore";

const LAW = "There is a fixed amount of mass.";
const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

export default function Law() {
  const root = useRef<HTMLElement>(null);
  const [split, setSplit] = useState(0.5); // share of mass held by the left body

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".law__word", {
        opacity: 0.08, stagger: 0.12, ease: "none",
        scrollTrigger: { trigger: ".law__title", start: "top 80%", end: "top 30%", scrub: true },
      });
      const st = { v: 0.5 };
      gsap.to(st, {
        v: 0.12, ease: "none",
        onUpdate: () => setSplit(st.v),
        scrollTrigger: { trigger: ".law__duel", start: "top 75%", end: "bottom 35%", scrub: 0.6 },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const left = TOTAL_SUPPLY * split;
  const right = TOTAL_SUPPLY - left;
  const r = (m: number) => 40 + Math.sqrt(m / TOTAL_SUPPLY) * 150;
  // a bridge of droplets travels from the shrinking body to the growing one
  const flow = split < 0.49;

  return (
    <section id="law" className="law" ref={root} data-tint="#6cff2e,#0f4a12">
      <p className="eyebrow">The one law everything rests on</p>
      <h2 className="law__title">
        {LAW.split(" ").map((w, i) => (
          <span key={i} className="law__word">{w} </span>
        ))}
      </h2>
      <div className="law__cols">
        <p data-reveal>New slime never appears. Not once, not ever. Every drop that exists today has always existed. It only ever changed shape and owner.</p>
        <p data-reveal>Which means you can only grow at someone else&apos;s expense. <em>You get bigger by making someone smaller.</em></p>
      </div>

      <div className="law__duel" aria-label="Two slimes exchanging mass; the total never changes">
        <svg viewBox="0 0 900 420" className="law__svg">
          {/* ink layer under the slime gives the cartoon outline */}
          <g filter="url(#goo)">
            <circle cx={250} cy={220} r={r(left) + 6} fill="var(--ink)" />
            <circle cx={650} cy={220} r={r(right) + 6} fill="var(--ink)" />
            {flow && [0, 1, 2, 3, 4].map((i) => (
              <circle key={i} className="law__flow" cx={0} cy={220} r={20} fill="var(--ink)"
                style={{ animationDelay: `${i * 0.36}s` }} />
            ))}
          </g>
          <g filter="url(#goo)">
            <circle cx={250} cy={220} r={r(left)} fill="var(--slime)" />
            <circle cx={650} cy={220} r={r(right)} fill="var(--slime)" />
            {flow && [0, 1, 2, 3, 4].map((i) => (
              <circle key={i} className="law__flow" cx={0} cy={220} r={14} fill="var(--slime)"
                style={{ animationDelay: `${i * 0.36}s` }} />
            ))}
          </g>
          <circle cx={250 - r(left) * 0.35} cy={220 - r(left) * 0.45} r={r(left) * 0.12} fill="#fff" opacity=".8" />
          <circle cx={650 - r(right) * 0.35} cy={220 - r(right) * 0.45} r={r(right) * 0.12} fill="#fff" opacity=".8" />
        </svg>
        <div className="law__ledger">
          <div><span>smaller</span><b>{fmt(left)}</b></div>
          <div className="law__sum"><span>total mass</span><b>{fmt(TOTAL_SUPPLY)}</b><small>never more. never less.</small></div>
          <div><span>bigger</span><b>{fmt(right)}</b></div>
        </div>
      </div>

      <p className="law__coda" data-reveal>
        Nobody here produces anything. They only take. Every war comes down to an argument about whose body one particular drop ends up in.
        <br /><strong>Everything else follows from that.</strong>
      </p>
    </section>
  );
}
