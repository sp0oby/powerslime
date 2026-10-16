"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FULGUR, HOUSES } from "@/data/lore";

export default function Fulgur() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 60%", end: "bottom 60%", scrub: 0.8 },
      });
      // the shards drift in from the twelve houses and close on the center
      const core = root.current!.querySelector<HTMLElement>(".fulgur__core")!;
      const rx = Math.min(260, core.offsetWidth * 0.42), ry = Math.min(240, core.offsetHeight * 0.42);
      tl.fromTo(".fulgur__shard",
        { x: (i) => Math.cos((i / 12) * Math.PI * 2) * rx, y: (i) => Math.sin((i / 12) * Math.PI * 2) * ry, opacity: 0.25 },
        { x: (i) => Math.cos((i / 12) * Math.PI * 2) * 60, y: (i) => Math.sin((i / 12) * Math.PI * 2) * 60, opacity: 1, ease: "none" });
      gsap.fromTo(".fulgur__flash", { opacity: 0 }, {
        opacity: 1, duration: 0.08, repeat: 3, yoyo: true,
        scrollTrigger: { trigger: root.current, start: "top 45%", toggleActions: "play none none none" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="fulgur" ref={root} data-tint="#eaff3a,#05101f">
      <div className="fulgur__flash" aria-hidden />
      <div className="fulgur__core" aria-hidden>
        {HOUSES.map((h, i) => (
          <svg key={h.id} className="fulgur__shard" viewBox="0 0 24 40" style={{ color: h.colors[0], rotate: `${i * 30}deg` }}>
            <path d="M14 0L2 22h9l-3 18L22 14h-9z" />
          </svg>
        ))}
        <svg className="fulgur__bolt" viewBox="0 0 24 40"><path d="M14 0L2 22h9l-3 18L22 14h-9z" /></svg>
      </div>
      <div className="fulgur__copy">
        <p className="eyebrow">The thirteenth · devoured</p>
        <h2 className="glitch" data-text="FULGUR">FULGUR</h2>
        <p className="fulgur__arch">Slimearch <b>Keraunos</b> — {FULGUR.etymology}</p>
        <p>{FULGUR.look}</p>
        <p>{FULGUR.does} {FULGUR.fights}</p>
        <p className="fulgur__secret">{FULGUR.win}</p>
        <p className="fulgur__count"><span>secret</span> <b>{FULGUR.supply}</b> of 1,200</p>
      </div>
    </section>
  );
}
