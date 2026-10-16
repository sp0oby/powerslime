// Canonical site URL. Set NEXT_PUBLIC_SITE_URL once the domain is live;
// on Vercel it falls back to the production deployment URL.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3210")
).replace(/\/$/, "");

export const SITE_NAME = "POWER SLIME";
export const SITE_DESCRIPTION =
  "POWER SLIME is an NFT collection of 1,200 slimes on Robinhood chain. Twelve houses, one devoured power, and one law: there is a fixed amount of mass. Read the lore, run the Census, and mix the houses.";
