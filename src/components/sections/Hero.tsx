"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero__banner", { scale: 1.08, opacity: 0, duration: 1.6, ease: "expo.out" });
      gsap.from(".hero__line > span", { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.08, delay: 0.5 });
      // banner sinks into the swamp as you leave
      gsap.to(".hero__banner", {
        yPercent: 18, scale: 0.94, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);

    // a little parallax tilt on the banner
    const el = root.current!.querySelector<HTMLElement>(".hero__frame")!;
    const move = (e: PointerEvent) => {
      const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
      el.style.transform = `perspective(1200px) rotateY(${x * 5}deg) rotateX(${-y * 4}deg)`;
    };
    addEventListener("pointermove", move);
    return () => { ctx.revert(); removeEventListener("pointermove", move); };
  }, []);

  return (
    <section id="top" className="hero" ref={root} data-tint="#6cff2e,#0f4a12">
      <div className="hero__sky" />
      <h1 className="sr-only">POWER SLIME — an NFT collection of 1,200 slimes across twelve houses</h1>
      <div className="hero__frame">
        <video
          className="hero__banner"
          src="/video/hero.mp4"
          poster="/art/banner.jpg"
          autoPlay muted loop playsInline
          aria-label="POWER SLIME logo dripping"
        />
      </div>
      <div className="hero__copy">
        <p className="hero__line"><span>Twelve houses.</span> <span>One devoured.</span></p>
        <p className="hero__line hero__line--big"><span>Nobody here produces anything.</span> <span>They only take.</span></p>
      </div>
      <a href="#law" className="hero__cue" aria-label="Scroll to the lore">
        <span>sink in</span>
        <i />
      </a>
      <svg className="hero__drip" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden>
        <path d="M0 0H1440V40C1400 40 1395 98 1372 98C1349 98 1352 50 1310 46C1268 42 1262 128 1236 128C1210 128 1214 56 1170 52C1110 46 1118 82 1060 80C1010 78 1012 44 960 44C912 44 914 112 886 112C858 112 864 50 820 48C760 45 766 70 704 70C650 70 652 40 600 40C556 40 560 134 530 134C500 134 506 52 462 50C404 47 410 88 350 86C300 84 304 46 254 46C214 46 216 104 190 104C164 104 168 52 128 48C80 44 80 72 40 72C14 72 8 40 0 40Z" />
      </svg>
    </section>
  );
}
