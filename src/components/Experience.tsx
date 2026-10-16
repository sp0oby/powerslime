"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SlimeCanvas, { tint } from "./SlimeCanvas";
import Sparks from "./Sparks";
import Nav from "./Nav";
import Hero from "./sections/Hero";
import Law from "./sections/Law";
import Ages from "./sections/Ages";
import Houses from "./sections/Houses";
import Feuds from "./sections/Feuds";
import MixLab from "./sections/MixLab";
import Census from "./sections/Census";
import Fulgur from "./sections/Fulgur";
import Supply from "./sections/Supply";
import Mint from "./sections/Mint";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = reduce ? null : new Lenis({ lerp: 0.09 });
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
      (window as unknown as { __lenis: Lenis }).__lenis = lenis;
    }

    // Each section can recolor the slime pool via data-tint="#body,#deep"
    const triggers = gsap.utils.toArray<HTMLElement>("[data-tint]").map((el) => {
      const [a, b] = el.dataset.tint!.split(",");
      return ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 45%",
        onEnter: () => tint(a, b),
        onEnterBack: () => tint(a, b),
      });
    });

    // generic reveal
    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
      gsap.from(el, {
        y: 40, opacity: 0, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    // interactive bits (census slip, mix lab, dossiers) change page height;
    // keep trigger positions honest when that happens
    let lastH = 0, rt: ReturnType<typeof setTimeout>;
    const ro = new ResizeObserver(() => {
      const h = document.querySelector("main")!.scrollHeight;
      if (Math.abs(h - lastH) < 4) return;
      lastH = h;
      clearTimeout(rt);
      rt = setTimeout(refresh, 250);
    });
    ro.observe(document.querySelector("main")!);

    return () => {
      ro.disconnect();
      clearTimeout(rt);
      removeEventListener("load", refresh);
      triggers.forEach((t) => t.kill());
      ScrollTrigger.getAll().forEach((t) => t.kill());
      lenis?.destroy();
    };
  }, []);

  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="b" />
            <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" result="g" />
            <feComposite in="SourceGraphic" in2="g" operator="atop" />
          </filter>
        </defs>
      </svg>
      <SlimeCanvas />
      <Sparks />
      <Nav />
      <main>
        <Hero />
        <Law />
        <Ages />
        <Houses />
        <Feuds />
        <Census />
        <MixLab />
        <Fulgur />
        <Supply />
        <Mint />
      </main>
    </>
  );
}
