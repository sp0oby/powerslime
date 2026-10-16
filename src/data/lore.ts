// All copy here is from the Power Slime lore doc. Supply numbers use the
// 1,200 mint (X, Sep 23) with each house scaled from the doc's 3,333 split.

export type HouseId =
  | "pyros" | "lumen" | "umbra" | "aether" | "lithos" | "pelagos"
  | "anemos" | "lysis" | "chronos" | "miasma" | "ichor" | "onus" | "fulgur";

export type BlocId = "old" | "sky" | "deep" | "outside";

export interface House {
  id: HouseId;
  no: string;
  element: string;
  power: string;
  slimearch: string;
  pronoun: "he" | "she";
  etymology: string;
  bloc: BlocId | null;
  look: string;
  does: string;
  fights: string;
  win: string;
  loss: string;
  hates: string;
  hatesId: HouseId | null;
  quote: string;
  supply: number;
  supplyWhy?: string;
  colors: [string, string]; // [body, deep]
  art?: { img: string; video?: string };
}

export const TOTAL_SUPPLY = 1200;

export const MINT = {
  supply: "1,200",
  price: "$20",
  chain: "Robinhood",
  date: "TBA",
  x: "https://x.com/powerofslime",
};

export const HOUSES: House[] = [
  {
    id: "pyros", no: "01", element: "Fire", power: "Pyros", slimearch: "Ignivar", pronoun: "he",
    etymology: "ignis, fire", bloc: "old",
    look: "Holds no liquid. His edges glow and he leaves a scorch mark behind him. The only one it's uncomfortable to stand next to.",
    does: "Pyros makes mass worthless. Burnt slime is good for nothing: you can't devour it, there's nothing left inside to pull out.",
    fights: "When he retreats, he burns his own ground. Ignivar made himself inedible and it worked.",
    win: "Not one drop of him runs in anybody. He's the only one nothing was ever taken from.",
    loss: "He gave nothing away, but he took nothing either. His lands are the poorest of the twelve, because he burnt them himself. There's no reason to go see him.",
    hates: "Thalassa. She can make him smaller and he can't reach her.", hatesId: "pelagos",
    quote: "I can't be eaten. I don't need anything past that.",
    supply: 97, supplyWhy: "poor lands, nobody to feed",
    colors: ["#ff6a1f", "#4a0c02"],
  },
  {
    id: "lithos", no: "05", element: "Earth", power: "Lithos", slimearch: "Chthonius", pronoun: "he",
    etymology: "chthon, of the underground", bloc: "old",
    look: "Heavy, grainy, holds shape better than the rest of them combined. Doesn't shine.",
    does: "Lithos holds. It's the only power that takes nothing and transforms nothing. It just refuses to let a shape come apart.",
    fights: "He doesn't. He digs in. Tunnels, depth, siege in reverse: he waits for the besieger to run out.",
    win: "A four-hundred-year siege. He didn't break it, he outlasted it.",
    loss: "Never lost an inch, never gained a drop. House Lithos is the smallest of all twelve by mass. The young ones leave, because nothing happens there.",
    hates: "Barython. The only one who knows how to collapse a tunnel.", hatesId: "onus",
    quote: "All twelve will come to me eventually. I'll be in the same place.",
    supply: 63, supplyWhy: "smallest house by mass",
    colors: ["#b0814f", "#2a1a0c"],
  },
  {
    id: "ichor", no: "11", element: "Blood", power: "Ichor", slimearch: "Cruorix", pronoun: "he",
    etymology: "cruor, spilled blood", bloc: "old",
    look: "Dark red, thick, reflects nothing. Hard to look at for long: there's movement under the surface that doesn't match his own.",
    does: "Ichor keeps devouring after the devouring is over. It's the only power that works from inside somebody else's body.",
    fights: "He turned devouring into a craft. He doesn't eat mass, he eats names. He runs the only school that teaches it, and he takes payment in kind.",
    win: "He holds more named mass than anyone alive.",
    loss: "He ate so much he can't hold one face anymore. Cruorix flickers: for a second someone he devoured surfaces in him, then goes. He doesn't get to pick who.",
    hates: "Hermetia. She can undo his life's work with one motion. She's also the one who invented it.", hatesId: "lysis",
    quote: "I remember all of you by taste.",
    supply: 108, supplyWhy: "eats and grows",
    colors: ["#e0122f", "#3a0209"],
    art: { img: "/art/ichor.jpg" },
  },
  {
    id: "lumen", no: "02", element: "Light", power: "Lumen", slimearch: "Aurexis", pronoun: "he",
    etymology: "aurum, aurora", bloc: "sky",
    look: "Painful to look at, the edges cut your eye. You can barely make out a shape, only that something bright is there.",
    does: "Lumen shows composition. Look at a mixed slime and you see every house inside, with percentages. You can't lie under Lumen, and Lumen can't lie either.",
    fights: "In the open. Announces in advance, states his strength, sets no ambushes.",
    win: "The Census. Three wars in a day, not a single blow.",
    loss: "He can't lie, so he's predictable. Nyxaris has been reading him two moves ahead for two hundred years.",
    hates: "Nyxaris. She's the one thing he can't light.", hatesId: "umbra",
    quote: "I'll tell you what you're made of. What you do about it isn't my part.",
    supply: 115,
    colors: ["#fff36b", "#7a5a00"],
  },
  {
    id: "aether", no: "04", element: "Cosmic", power: "Aether", slimearch: "Astraeus", pronoun: "he",
    etymology: "titan of the stars", bloc: "sky",
    look: "Deep, nearly black. There are lights inside him that correspond to nothing outside.",
    does: "Aether doesn't obey distance. House Aether knows what's happening in places nobody has reached.",
    fights: "From far away and from above. He rarely comes down, and if he came down it's already over.",
    win: "He knows where the Source is. The place the thirteen powers separated from. Nobody else knows. He has exactly one card and it's absolute: if there's a fixed amount of mass, the Source is the only point where there could be more of it.",
    loss: "While he was looking up, Zephyrion took his lower territories a drop at a time. Astraeus noticed forty years later.",
    hates: "Nobody. His indifference infuriates people more than any feud.", hatesId: null,
    quote: "I'll come back and tell you whether it was worth it.",
    supply: 108,
    colors: ["#9b5cff", "#0d0630"],
    art: { img: "/art/aether.jpg" },
  },
  {
    id: "anemos", no: "07", element: "Wind", power: "Anemos", slimearch: "Zephyrion", pronoun: "he",
    etymology: "Zephyrus", bloc: "sky",
    look: "Thin, smeared across a huge area, almost no viscosity. Fastest of them all and barely holding shape.",
    does: "Anemos cancels viscosity. No barrier is designed for something that runs that fast.",
    fights: "Raids. Never holds ground. Takes a drop from everyone and leaves before they notice.",
    win: "Took Astraeus's lands while Astraeus was distracted.",
    loss: "He's too thin. He's been losing mass slowly for a century and hiding it. He's spreading out. Every raid is an attempt to top up before the shape goes.",
    hates: "Barython. Under Onus he can't move, and moving is all he has.", hatesId: "onus",
    quote: "I've taken a drop from every one of you. Go check yourselves.",
    supply: 90, supplyWhy: "a century of losing mass",
    colors: ["#7dffe0", "#0b4a45"],
  },
  {
    id: "umbra", no: "03", element: "Dark", power: "Umbra", slimearch: "Nyxaris", pronoun: "she",
    etymology: "Nyx, goddess of night", bloc: "deep",
    look: "Swallows light. You see an outline, never a body. Nobody knows how big she is: she has never shown herself whole.",
    does: "Umbra hides composition. It's the only power that stands up to Lumen: one drop of Umbra inside a body makes the whole body unreadable.",
    fights: "Never in person. Debts, middlemen, third hands. She has agents inside the other houses, mixed slimes carrying a single drop of her. Plenty of them don't know the drop is there.",
    win: "Three of the twelve fought wars in her interest while certain they were fighting their own.",
    loss: "Every plan she runs has one variable she can't account for, and it's Kairos. He sees the ending, she only sees the next move.",
    hates: "Aurexis. He makes her visible, and visible she's worth nothing.", hatesId: "lumen",
    quote: "I've never fought a war. Go count how many I've won.",
    supply: 122, supplyWhy: "nobody knows the real volume, counted at the floor",
    colors: ["#7a2bff", "#08020f"],
  },
  {
    id: "pelagos", no: "06", element: "Water", power: "Pelagos", slimearch: "Thalassa", pronoun: "she",
    etymology: "the open sea", bloc: "deep",
    look: "Transparent. Everything she has ever taken in hangs suspended inside her, in plain view. She can't hide anything.",
    does: "Pelagos devours by dilution. It doesn't bite, it mixes with you until you're a percentage of it.",
    fights: "She floods. A siege that lasts a generation.",
    win: "Venefica's lands. There was no battle, she just stood upstream for forty years.",
    loss: "She can't take pressure. Barython squeezed her once and she was shapeless for six months. Everyone saw it.",
    hates: "Ignivar. He evaporates her, she can't touch him.", hatesId: "pyros",
    quote: "I don't kill anyone. I just become the larger part.",
    supply: 145, supplyWhy: "spreads wider than anyone",
    colors: ["#2ec5ff", "#06235e"],
    art: { img: "/art/pelagos.jpg", video: "/video/pelagos.mp4" },
  },
  {
    id: "miasma", no: "10", element: "Poison", power: "Miasma", slimearch: "Venefica", pronoun: "she",
    etymology: "the poisoner", bloc: "deep",
    look: "The most beautiful of the twelve. Bright, clean colors, iridescent. She looks like something you'd want to pick up.",
    does: "Miasma spoils the prey. Whoever devoured her mass has her inside forever, and every generation after them comes out defective.",
    fights: "Backwards. She doesn't defend herself, she makes herself poisonous to eat.",
    win: "Three Slimearchs carry her drop and can't get rid of it.",
    loss: "Nobody mixes with her willingly. House Miasma is dying of isolation. Not of war. People just don't come near.",
    hates: "Hermetia. The only one who can pull Miasma back out.", hatesId: "lysis",
    quote: "Eat. I'll wait.",
    supply: 76, supplyWhy: "dying of isolation",
    colors: ["#ff3fd2", "#1b0638"],
  },
  {
    id: "lysis", no: "08", element: "Panacea", power: "Lysis", slimearch: "Hermetia", pronoun: "she",
    etymology: "lysis, separation", bloc: "outside",
    look: "Pale, nearly colorless, warm. The only one it feels good to approach.",
    does: "Lysis takes things apart. It pulls a foreign drop out and gives it back its separateness. Everyone needs it, because mixed mass gets sick. It's also the exact technique that devouring was reverse-engineered from.",
    fights: "She doesn't. She travels. She comes to anyone who calls, including the ones who killed her family.",
    win: "Three hundred years and nobody has touched her. Not out of respect. She's simply needed.",
    loss: "Everything that has happened in three hundred years started with her healing technique.",
    hates: "Nobody. That specific fact is what drives Cruorix insane.", hatesId: null,
    quote: "I know how to take things apart. Somebody watched and learned to put them together.",
    supply: 86, supplyWhy: "few of them and they don't fight",
    colors: ["#d9ffd0", "#2f5a35"],
    art: { img: "/art/lysis.jpg", video: "/video/lysis.mp4" },
  },
  {
    id: "chronos", no: "09", element: "Time", power: "Chronos", slimearch: "Kairos", pronoun: "he",
    etymology: "kairos, the deciding moment", bloc: "outside",
    look: "Moves at a different rate from everything around him. Unpleasant to look at, like the picture is lagging.",
    does: "Chronos shows the ending and not the road to it. House Chronos knows how it all finishes and has no idea what happens tomorrow.",
    fights: "He doesn't fight, he arrives. He turns up exactly when a war has already been decided and takes the winner's weakest second.",
    win: "Not one battle whose outcome he didn't already know.",
    loss: "He can't see his own ending. The single blind spot in a world where he sees everything.",
    hates: "Nobody. All twelve hate him, though, and it's the only thing they agree on.", hatesId: null,
    quote: "I'll come later. I always come later.",
    supply: 83,
    colors: ["#f2b632", "#2b1d05"],
    art: { img: "/art/chronos.jpg" },
  },
  {
    id: "onus", no: "12", element: "Gravity", power: "Onus", slimearch: "Barython", pronoun: "he",
    etymology: "barys, heavy", bloc: "outside",
    look: "Looks ordinary. Weighs impossibly. Whatever he's standing on sinks.",
    does: "Onus cancels movement. Anything caught under it stays exactly where it was.",
    fights: "He pins. He holds the passes between territories, so every road runs through him.",
    win: "He decides who reaches whom. Any war between any two of them goes across his ground and with his permission.",
    loss: "He can hold everything and take nothing. He has zero offensive moves. His weight is a toll he collects, it was never strength.",
    hates: "Zephyrion. The only one who slips through.", hatesId: "anemos",
    quote: "Go ahead. Just not through me.",
    supply: 104,
    colors: ["#9aa3c7", "#121426"],
  },
];

export const FULGUR: House = {
  id: "fulgur", no: "—", element: "Lightning", power: "Fulgur", slimearch: "Keraunos", pronoun: "he",
  etymology: "the bolt of Zeus", bloc: null,
  look: "First to hold shape. Faster than any of them. The only one who could walk through any territory, because borders didn't hold him.",
  does: "That's why they ate him. If it works on him, it works on anyone.",
  fights: "They split him between several, by an arrangement all of them later denied. The twelve have been sparking ever since and pretending not to notice.",
  win: "He's putting himself back together. Slowly, a drop at a time, out of the ones carrying him.",
  loss: "Devoured.",
  hates: "", hatesId: null,
  quote: "",
  supply: 3, supplyWhy: "secret, reassembling",
  colors: ["#eaff3a", "#05101f"],
};

export const ALL_HOUSES = [...HOUSES, FULGUR];
export const byId = (id: HouseId) => ALL_HOUSES.find((h) => h.id === id)!;

export const BLOCS: { id: BlocId; name: string; tag: string; holds: string; crack: string }[] = [
  { id: "old", name: "Old Blood", tag: "They consider themselves first. Among themselves they argue about who's firster.", holds: "claim of being first", crack: "Ichor eats its own" },
  { id: "sky", name: "Sky", tag: "Expansion. They look down and they don't hide it.", holds: "contempt for the ground", crack: "Anemos robbed Aether" },
  { id: "deep", name: "The Deep", tag: "They don't fight in the open. Not because they can't.", holds: "nobody strikes first", crack: "Pelagos took Miasma's lands" },
  { id: "outside", name: "Outside", tag: "Not an alliance. Just three who don't belong to any bloc.", holds: "nothing", crack: "they're nothing to each other" },
];

export const AGES = [
  {
    n: "I", title: "Before shape",
    body: [
      "In the beginning the mass was one thing and had no shape.",
      "Holding shape is hard work. Most of the slime in the world doesn't hold it and never did. It's just mass: it sits in the low ground, it runs along the cracks, it wants nothing.",
      "Thirteen powers managed to hold. That's their one real achievement. Not strength, not magic. They simply didn't run back into the puddle.",
    ],
  },
  {
    n: "II", title: "The age of devouring",
    body: [
      "It started with Lysis. Hermetia learned to take things apart. She could pull a foreign drop out of a mixed body and give it back its separateness. She saved thousands that way.",
      "Someone watched her work and understood something simple. If the process runs one way, it runs the other way too. You don't have to pull a drop out. You can put one in.",
      "Devouring already existed, but it got you nothing. Now it turned out you could eat a name. And when you do, its power becomes yours.",
      "They tested it on Fulgur. Several of them ate, by an arrangement all of them later denied. Every one of the twelve houses has a piece of Fulgur in it now. That's why they spark sometimes. Nobody talks about it.",
    ],
  },
  {
    n: "III", title: "After the Census",
    body: [
      "Three hundred years of war mixed everything. There are almost no purebloods left. Everyone else lives in percentages: some Pyros, some Pelagos, one drop of something their ancestors would rather not discuss.",
      "Everyone lived with that just fine until Aurexis ran the Census. He read out the composition. Publicly, by name, drop by drop. Whose grandfather got eaten and by whom. Whose blood doesn't match the crest on the gate.",
      "Aurexis has never lied once. He just said the truth out loud. Three wars started in one day. He never touched anybody.",
      "Now it's the time after the Census. Everyone knows what they're made of, and nobody has forgiven it.",
    ],
  },
];

export type MixKind = "pure" | "never" | "forbidden" | "common" | "unnamed";
export interface MixResult { kind: MixKind; name: string; text: string; color: string }

const COMMON: Record<string, { name: string; text: string; color: string }> = {
  "lithos+pyros": { name: "Obsidian", text: "A glass crust. Best shape retention of any mix.", color: "#1b1424" },
  "anemos+pelagos": { name: "Fog & Storm", text: "The fastest mix there is.", color: "#6fb8d6" },
  "aether+umbra": { name: "Void", text: "The quietest.", color: "#05030c" },
  "lithos+pelagos": { name: "Silt", text: "There are more of them than anyone, and their status is as low as it gets.", color: "#7a6a4c" },
};

export function mix(a: HouseId, b: HouseId): MixResult {
  const key = [a, b].sort().join("+");
  const has = (id: HouseId) => a === id || b === id;
  if (a === b) {
    return { kind: "pure", name: "Pureblood", text: "There are almost no purebloods left. You can count them, and they're mostly the Slimearchs themselves.", color: byId(a).colors[0] };
  }
  if (key === "lumen+umbra") return { kind: "never", name: "Inert", text: "Lumen and Umbra cancel each other. The mass goes inert and stops holding shape.", color: "#5b5b5b" };
  if (key === "chronos+onus") return { kind: "never", name: "Still", text: "One slows, the other stops. The result doesn't move.", color: "#6b6248" };
  if (has("lysis")) return { kind: "forbidden", name: "Reversible", text: "That slime can be taken apart again. A line carrying a drop of Lysis is reversible, which makes it unreliable. Noble houses cull that offspring.", color: "#d9ffd0" };
  if (has("ichor")) return { kind: "forbidden", name: "Consumed", text: "Blood keeps devouring from inside. One generation later the carrier isn't the carrier anymore.", color: "#8a0a1e" };
  if (has("miasma")) return { kind: "forbidden", name: "Ruined line", text: "Miasma doesn't come out. It ruins the whole line.", color: "#b13cff" };
  if (has("fulgur")) return { kind: "forbidden", name: "Spark", text: "Every house already carries a piece of him. Nobody talks about it.", color: "#eaff3a" };
  const c = COMMON[key];
  if (c) return { kind: "common", ...c };
  return { kind: "unnamed", name: "A percentage", text: "No name for it. Just another mixed slime, living in percentages like almost everyone else.", color: "#6cff2e" };
}
