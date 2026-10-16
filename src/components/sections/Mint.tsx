import { MINT } from "@/data/lore";

const GALLERY = [
  { src: "/art/pyros.webp", cap: "Ignivar · Pyros" },
  { src: "/art/pelagos.jpg", cap: "House of Pelagos" },
  { src: "/art/umbra.webp", cap: "Nyxaris · Umbra" },
  { src: "/art/fulgur.jpg", cap: "Keraunos · Fulgur" },
  { src: "/art/lumen.webp", cap: "Aurexis · Lumen" },
  { src: "/art/miasma.webp", cap: "Venefica · Miasma" },
  { src: "/art/ichor.jpg", cap: "House of Ichor" },
  { src: "/art/aether.webp", cap: "Astraeus · Aether" },
  { src: "/art/lithos.webp", cap: "Chthonius · Lithos" },
  { src: "/art/anemos.webp", cap: "Zephyrion · Anemos" },
  { src: "/art/onus.webp", cap: "Barython · Onus" },
  { src: "/art/chronos.webp", cap: "Kairos · Chronos" },
  { src: "/art/lysis.jpg", cap: "House of Lysis" },
  { src: "/art/aether-member.jpg", cap: "House of Aether" },
  { src: "/art/wip-3.jpg", cap: "From the desk" },
  { src: "/art/wip-1.jpg", cap: "From the desk" },
];

export default function Mint() {
  return (
    <section id="mint" className="mint" data-tint="#6cff2e,#0f4a12">
      <div className="mint__marquee" aria-label="Art from the collection">
        <div className="mint__row">
          {[...GALLERY, ...GALLERY].map((g, i) => (
            <figure key={i} aria-hidden={i >= GALLERY.length}>
              <img src={g.src} alt={i < GALLERY.length ? g.cap : ""} loading="lazy" />
              <figcaption>{g.cap}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mint__card">
        <p className="eyebrow">Mint details</p>
        <h2>Pick a house.<br />Or let one pick you.</h2>
        <dl className="mint__stats">
          <div><dt>Supply</dt><dd>{MINT.supply}</dd></div>
          <div><dt>Price</dt><dd>{MINT.price}</dd></div>
          <div><dt>Chain</dt><dd>{MINT.chain}</dd></div>
          <div><dt>Date</dt><dd className="tba">{MINT.date}</dd></div>
        </dl>
        <a className="btn" href={MINT.x} target="_blank" rel="noreferrer">Follow @powerofslime</a>
        <p className="mint__fine">Now it&apos;s the time after the Census. Everyone knows what they&apos;re made of, and nobody has forgiven it.</p>
      </div>

      <footer className="foot">
        <span>POWER SLIME</span>
        <span>No new slime. Ever.</span>
        <a href={MINT.x} target="_blank" rel="noreferrer">𝕏 @powerofslime</a>
      </footer>
    </section>
  );
}
