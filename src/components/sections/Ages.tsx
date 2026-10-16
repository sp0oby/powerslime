"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AGES } from "@/data/lore";
import { tint } from "../SlimeCanvas";

const TINTS = ["#6cff2e,#0f4a12", "#e0122f,#3a0209", "#fff36b,#7a5a00"];

export default function Ages() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const track = root.current!.querySelector<HTMLElement>(".ages__track")!;
      const panels = gsap.utils.toArray<HTMLElement>(".age", track);
      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          pin: true,
          scrub: 0.8,
          end: () => `+=${track.scrollWidth - innerWidth}`,
          invalidateOnRefresh: true,
        },
      });
      panels.forEach((p) => {
        gsap.from(p.querySelectorAll(".age__body p"), {
          y: 50, opacity: 0, stagger: 0.1, ease: "expo.out",
          scrollTrigger: { trigger: p, containerAnimation: tween, start: "left 70%" },
        });
        const [a, b] = p.dataset.ageTint!.split(",");
        ScrollTrigger.create({
          trigger: p, containerAnimation: tween, start: "left 55%", end: "right 45%",
          onEnter: () => tint(a, b), onEnterBack: () => tint(a, b),
        });
      });
    });
    mm.add("(max-width: 899px), (prefers-reduced-motion: reduce)", () => {
      gsap.utils.toArray<HTMLElement>(".age", root.current).forEach((p) => {
        const [a, b] = p.dataset.ageTint!.split(",");
        ScrollTrigger.create({
          trigger: p, start: "top 55%", end: "bottom 45%",
          onEnter: () => tint(a, b), onEnterBack: () => tint(a, b),
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="ages" className="ages" ref={root}>
      <div className="ages__track">
        <div className="ages__intro">
          <p className="eyebrow">Chronicle</p>
          <h2>Three<br />ages</h2>
          <p className="ages__hint">drag the scroll →</p>
        </div>
        {AGES.map((a, i) => (
          <article key={a.n} className={`age age--${i + 1}`} data-age-tint={TINTS[i]}>
            <span className="age__n" aria-hidden>{a.n}</span>
            <div className="age__inner">
              <p className="eyebrow">Age {a.n}</p>
              <h3>{a.title}</h3>
              <div className="age__body">
                {a.body.map((t, j) => <p key={j}>{t}</p>)}
              </div>
            </div>
            {i === 0 && (
              <video className="age__art" src="/video/crowd.mp4" poster="/art/crowd.jpg" autoPlay muted loop playsInline aria-label="A crowd of shapeless slime" />
            )}
            {i === 1 && <div className="age__split" aria-hidden>{Array.from({ length: 12 }, (_, k) => <i key={k} style={{ ["--k" as string]: k }} />)}</div>}
            {i === 2 && <div className="age__census" aria-hidden>{["Pyros 41%", "Pelagos 33%", "Umbra 17%", "???  9%"].map((t) => <span key={t}>{t}</span>)}</div>}
          </article>
        ))}
      </div>
    </section>
  );
}
