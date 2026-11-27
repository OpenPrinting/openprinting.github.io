// Build-time loader for data/sponsors/*.yaml. Server components only.
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import {
  SponsorDataError,
  isActive,
  parseSponsors,
  parseTiers,
  rankSponsors,
  type Sponsor,
  type Tier,
} from "@/lib/sponsors";

const DATA_DIR = path.join(process.cwd(), "data", "sponsors");
const PUBLIC_DIR = path.join(process.cwd(), "public");

export interface SponsorData {
  tiers: Tier[];
  /** Sponsors not yet expired at build time, highest ranked first. */
  sponsors: Sponsor[];
}

function readYaml(file: string): unknown {
  return yaml.load(fs.readFileSync(path.join(DATA_DIR, file), "utf8"));
}

function checkAsset(src: string | undefined, where: string) {
  if (!src || /^(https?:)?\/\//.test(src)) return;
  if (!fs.existsSync(path.join(PUBLIC_DIR, src))) {
    throw new SponsorDataError(`${where}: image "${src}" not found under public/`);
  }
}

let cache: SponsorData | undefined;

export function getSponsorData(): SponsorData {
  if (cache) return cache;

  const tiers = parseTiers(readYaml("tiers.yaml"));
  const { sponsors, warnings } = parseSponsors(readYaml("sponsors.yaml"), tiers);
  for (const warning of warnings) console.warn(`[sponsors] ${warning}`);

  for (const tier of tiers) checkAsset(tier.image, `tiers.yaml "${tier.key}"`);
  for (const sponsor of sponsors) {
    checkAsset(sponsor.logo, `sponsors.yaml "${sponsor.name}"`);
    checkAsset(sponsor.logoDark, `sponsors.yaml "${sponsor.name}"`);
  }

  const data = { tiers, sponsors: rankSponsors(sponsors.filter((s) => isActive(s))) };
  // Re-read on every request in `yarn dev` so edits to the YAML show up.
  if (process.env.NODE_ENV === "production") cache = data;
  return data;
}
