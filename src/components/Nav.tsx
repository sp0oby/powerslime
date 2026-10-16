"use client";

import { MINT } from "@/data/lore";

const LINKS = [
  ["#law", "The Law"],
  ["#ages", "Ages"],
  ["#houses", "Houses"],
  ["#census", "Census"],
  ["#mix", "Mix"],
  ["#mint", "Mint"],
];

export default function Nav() {
  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: string) => void } }).__lenis;
    if (lenis) {
      e.preventDefault();
      lenis.scrollTo(href);
    }
  };
  return (
    <header className="nav">
      <a href="#top" className="nav__mark" onClick={(e) => go(e, "#top")} aria-label="Power Slime home">
        <span className="nav__dot" /> POWER SLIME
      </a>
      <nav className="nav__links">
        {LINKS.map(([h, l]) => (
          <a key={h} href={h} onClick={(e) => go(e, h)}>{l}</a>
        ))}
      </nav>
      <a className="nav__x" href={MINT.x} target="_blank" rel="noreferrer">
        Follow on 𝕏
      </a>
    </header>
  );
}
