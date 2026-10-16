"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FULGUR, HOUSES } from "@/data/lore";

export default function Fulgur() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 75%", end: "center 55%", scrub: 0.8 },
      });
      // the shards drift in from the twelve houses and close on him
      const core = root.current!.querySelector<HTMLElement>(".fulgur__core")!;
      const portrait = core.querySelector<HTMLElement>(".fulgur__portrait")!;
      const rx = Math.min(300, core.offsetWidth * 0.48), ry = Math.min(290, core.offsetHeight * 0.48);
      const ring = portrait.offsetWidth * 0.62;
      tl.fromTo(".fulgur__shard",
        { x: (i) => Math.cos((i / 12) * Math.PI * 2) * rx, y: (i) => Math.sin((i / 12) * Math.PI * 2) * ry, opacity: 0.25 },
        { x: (i) => Math.cos((i / 12) * Math.PI * 2) * ring, y: (i) => Math.sin((i / 12) * Math.PI * 2) * ring, opacity: 1, ease: "none" })
        // and as they arrive, he comes back together
        .fromTo(portrait,
          { filter: "grayscale(1) brightness(.35) blur(3px)", scale: 0.88, opacity: 0.45 },
          { filter: "grayscale(0) brightness(1) blur(0px)", scale: 1, opacity: 1, ease: "power1.in" }, 0);
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
      <div className="fulgur__core">
        <svg className="fulgur__bolt" viewBox="0 0 24 40" aria-hidden><path d="M14 0L2 22h9l-3 18L22 14h-9z" /></svg>
        <div className="fulgur__portrait">
          <img src={FULGUR.art!.img} alt="Keraunos, Slimearch of Fulgur, holding a bolt of lightning" />
        </div>
        {HOUSES.map((h, i) => (
          <svg key={h.id} className="fulgur__shard" viewBox="0 0 24 40" aria-hidden style={{ color: h.colors[0], rotate: `${i * 30}deg` }}>
            <path d="M14 0L2 22h9l-3 18L22 14h-9z" />
          </svg>
        ))}
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
