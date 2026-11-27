// Sponsor and tier handling shared by the build (lib/load-sponsors.ts) and the
// client components. Nothing here touches the file system, so client code can
// import it.

export type SponsorPeriod = "annual" | "monthly" | "one-time";
export type SponsorCurrency = "EUR" | "USD";

export interface Tier {
  key: string;
  name: string;
  group: string;
  annual: number;
  monthly: number;
  weight: number;
  logoHeight: number;
  frontPage: boolean;
  image?: string;
  info?: string;
}

/** A sponsor after validation, with its tier resolved. Plain JSON, safe to pass to client components. */
export interface Sponsor {
  name: string;
  url?: string;
  logo?: string;
  /** Path of a dark-mode logo, if any. */
  logoDark?: string;
  /** Show `logo` inverted in dark mode. */
  invertInDark: boolean;
  /** The logo already shows the name, so don't print it again next to it. */
  logoHasName: boolean;
  tier: string;
  tierName: string;
  /** Index of the tier in tiers.yaml, 0 = highest. */
  tierRank: number;
  amount?: number;
  currency: SponsorCurrency;
  period: SponsorPeriod;
  since?: string;
  /** Last day the sponsor is shown (YYYY-MM-DD), inclusive. */
  expires?: string;
  about?: string;
}

export class SponsorDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SponsorDataError";
  }
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function fail(where: string, message: string): never {
  throw new SponsorDataError(`${where}: ${message}`);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function optString(obj: Record<string, unknown>, field: string, where: string): string | undefined {
  const value = obj[field];
  if (value === undefined || value === null) return undefined;
  if (typeof value !== "string") fail(where, `"${field}" must be a string`);
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}

function reqString(obj: Record<string, unknown>, field: string, where: string): string {
  const value = optString(obj, field, where);
  if (value === undefined) fail(where, `"${field}" is required`);
  return value;
}

function optNumber(obj: Record<string, unknown>, field: string, where: string): number | undefined {
  const value = obj[field];
  if (value === undefined || value === null) return undefined;
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    fail(where, `"${field}" must be a non-negative number`);
  }
  return value;
}

function reqNumber(obj: Record<string, unknown>, field: string, where: string): number {
  const value = optNumber(obj, field, where);
  if (value === undefined) fail(where, `"${field}" is required`);
  return value;
}

/** YAML turns unquoted 2026-01-31 into a Date; accept that and strings. */
function optDate(obj: Record<string, unknown>, field: string, where: string): string | undefined {
  const value = obj[field];
  if (value === undefined || value === null || value === "") return undefined;
  let iso: string;
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) fail(where, `"${field}" is not a valid date`);
    iso = value.toISOString().slice(0, 10);
  } else if (typeof value === "string" && DATE_RE.test(value.trim())) {
    iso = value.trim();
  } else {
    fail(where, `"${field}" must be a date in YYYY-MM-DD form`);
  }
  const parsed = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== iso) {
    fail(where, `"${field}" is not a valid date: ${iso}`);
  }
  return iso;
}

function addOneYear(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCFullYear(d.getUTCFullYear() + 1);
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

export function parseTiers(raw: unknown): Tier[] {
  if (!Array.isArray(raw) || raw.length === 0) {
    throw new SponsorDataError("tiers.yaml: expected a non-empty list of tiers");
  }
  const seen = new Set<string>();
  return raw.map((entry, i) => {
    const where = `tiers.yaml entry ${i + 1}`;
    if (!isRecord(entry)) fail(where, "expected a mapping");
    const key = reqString(entry, "key", where);
    if (seen.has(key)) fail(where, `duplicate tier key "${key}"`);
    seen.add(key);
    const frontPage = entry.front_page;
    if (frontPage !== undefined && typeof frontPage !== "boolean") {
      fail(where, `"front_page" must be true or false`);
    }
    return {
      key,
      name: reqString(entry, "name", where),
      group: optString(entry, "group", where) ?? "Sponsors",
      annual: reqNumber(entry, "annual", where),
      monthly: reqNumber(entry, "monthly", where),
      weight: optNumber(entry, "weight", where) ?? 1,
      logoHeight: optNumber(entry, "logo_height", where) ?? 48,
      frontPage: frontPage ?? true,
      image: optString(entry, "image", where),
      info: optString(entry, "info", where),
    };
  });
}

function meetsTier(tier: Tier, amount: number, period: SponsorPeriod): boolean {
  return period === "monthly" ? amount >= tier.monthly : amount >= tier.annual;
}

export interface ParseResult {
  sponsors: Sponsor[];
  warnings: string[];
}

export function parseSponsors(raw: unknown, tiers: Tier[]): ParseResult {
  if (raw === null || raw === undefined) return { sponsors: [], warnings: [] };
  if (!Array.isArray(raw)) {
    throw new SponsorDataError("sponsors.yaml: expected a list of sponsors");
  }
  const warnings: string[] = [];
  const sponsors = raw.map((entry, i): Sponsor => {
    let where = `sponsors.yaml entry ${i + 1}`;
    if (!isRecord(entry)) fail(where, "expected a mapping");
    const name = reqString(entry, "name", where);
    where = `sponsors.yaml "${name}"`;

    const currency = (optString(entry, "currency", where) ?? "EUR").toUpperCase();
    if (currency !== "EUR" && currency !== "USD") fail(where, `"currency" must be EUR or USD`);

    const period = optString(entry, "period", where) ?? "annual";
    if (period !== "annual" && period !== "monthly" && period !== "one-time") {
      fail(where, `"period" must be annual, monthly or one-time`);
    }

    const amount = optNumber(entry, "amount", where);
    const since = optDate(entry, "since", where);
    let expires = optDate(entry, "expires", where);
    if (period === "one-time" && !expires) {
      if (!since) fail(where, `a one-time donation needs "since" (or an explicit "expires")`);
      expires = addOneYear(since);
    }

    const tierKey = optString(entry, "tier", where);
    let tierRank: number;
    if (tierKey !== undefined) {
      tierRank = tiers.findIndex((t) => t.key === tierKey);
      if (tierRank === -1) {
        fail(where, `unknown tier "${tierKey}" (known: ${tiers.map((t) => t.key).join(", ")})`);
      }
      if (amount !== undefined && !meetsTier(tiers[tierRank], amount, period)) {
        warnings.push(`${where}: amount ${amount} (${period}) is below the ${tiers[tierRank].name} minimum`);
      }
    } else {
      if (amount === undefined) fail(where, `needs a "tier" or an "amount" to derive it from`);
      tierRank = tiers.findIndex((t) => meetsTier(t, amount, period));
      if (tierRank === -1) {
        fail(where, `amount ${amount} (${period}) is below the lowest tier; set "tier" explicitly`);
      }
    }
    const tier = tiers[tierRank];

    const logoDarkRaw = optString(entry, "logo_dark", where);
    const invertInDark = logoDarkRaw === "invert";
    const logoHasName = entry.logo_has_name;
    if (logoHasName !== undefined && typeof logoHasName !== "boolean") {
      fail(where, `"logo_has_name" must be true or false`);
    }

    return {
      name,
      url: optString(entry, "url", where),
      logo: optString(entry, "logo", where),
      logoDark: invertInDark ? undefined : logoDarkRaw,
      invertInDark,
      logoHasName: logoHasName === true && optString(entry, "logo", where) !== undefined,
      tier: tier.key,
      tierName: tier.name,
      tierRank,
      amount,
      currency,
      period,
      since,
      expires,
      about: optString(entry, "about", where),
    };
  });
  return { sponsors, warnings };
}

/** Today's date as YYYY-MM-DD in UTC. */
export function todayIso(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}

export function isActive(sponsor: Pick<Sponsor, "expires">, today: string = todayIso()): boolean {
  return !sponsor.expires || sponsor.expires >= today;
}

export function annualizedAmount(sponsor: Pick<Sponsor, "amount" | "period">): number {
  if (sponsor.amount === undefined) return 0;
  return sponsor.period === "monthly" ? sponsor.amount * 12 : sponsor.amount;
}

/** Highest tier first, then highest annualized amount, then name. */
export function compareSponsors(a: Sponsor, b: Sponsor): number {
  return (
    a.tierRank - b.tierRank ||
    annualizedAmount(b) - annualizedAmount(a) ||
    a.name.localeCompare(b.name)
  );
}

export function rankSponsors(sponsors: Sponsor[]): Sponsor[] {
  return [...sponsors].sort(compareSponsors);
}

/**
 * Picks one sponsor at random; each sponsor's chance is proportional to its
 * tier's weight. `random` returns a number in [0, 1).
 */
export function pickWeighted(
  sponsors: Sponsor[],
  tiers: Pick<Tier, "key" | "weight">[],
  random: () => number = Math.random,
): Sponsor | undefined {
  const weightOf = new Map(tiers.map((t) => [t.key, t.weight]));
  const weighted = sponsors
    .map((s) => ({ s, w: weightOf.get(s.tier) ?? 0 }))
    .filter((x) => x.w > 0);
  const total = weighted.reduce((sum, x) => sum + x.w, 0);
  if (total <= 0) return undefined;
  let r = random() * total;
  for (const x of weighted) {
    r -= x.w;
    if (r < 0) return x.s;
  }
  return weighted[weighted.length - 1].s;
}
