import fs from "fs"
import path from "path"
import yaml from "js-yaml"
import { describe, expect, it } from "vitest"

import {
  SponsorDataError,
  isActive,
  parseSponsors,
  parseTiers,
  pickWeighted,
  rankSponsors,
} from "@/lib/sponsors"

const tiers = parseTiers(
  yaml.load(`
- { key: diamond, name: Diamond, annual: 100000, monthly: 10000, weight: 16 }
- { key: gold, name: Gold, annual: 10000, monthly: 1000, weight: 4 }
- { key: supporter, name: Supporter, group: Personal, annual: 100, monthly: 10, weight: 1, front_page: false }
`),
)

function parse(src: string) {
  return parseSponsors(yaml.load(src), tiers)
}

describe("parseTiers", () => {
  it("applies defaults", () => {
    expect(tiers[0]).toMatchObject({ group: "Sponsors", logoHeight: 48, frontPage: true })
    expect(tiers[2].frontPage).toBe(false)
  })

  it("rejects duplicate keys and missing prices", () => {
    expect(() => parseTiers([{ key: "a", name: "A", annual: 1, monthly: 1 }, { key: "a", name: "B", annual: 1, monthly: 1 }])).toThrow(/duplicate/)
    expect(() => parseTiers([{ key: "a", name: "A", monthly: 1 }])).toThrow(/annual/)
  })
})

describe("parseSponsors", () => {
  it("accepts an explicit tier and YAML dates", () => {
    const { sponsors, warnings } = parse(`
- name: Acme
  tier: gold
  expires: 2027-03-31
`)
    expect(warnings).toEqual([])
    expect(sponsors[0]).toMatchObject({ tier: "gold", tierName: "Gold", tierRank: 1, expires: "2027-03-31", currency: "EUR", period: "annual" })
  })

  it("derives the tier from the amount", () => {
    const { sponsors } = parse(`
- { name: A, amount: 12000 }
- { name: B, amount: 1500, period: monthly }
- { name: C, amount: 150000, currency: usd }
`)
    expect(sponsors.map((s) => s.tier)).toEqual(["gold", "gold", "diamond"])
    expect(sponsors[2].currency).toBe("USD")
  })

  it("shows one-time donations for a year", () => {
    const { sponsors } = parse(`- { name: A, amount: 200, period: one-time, since: 2026-03-01 }`)
    expect(sponsors[0]).toMatchObject({ tier: "supporter", expires: "2027-02-28" })
  })

  it("warns when the amount is below the explicit tier", () => {
    const { warnings } = parse(`- { name: A, tier: diamond, amount: 5000 }`)
    expect(warnings).toHaveLength(1)
  })

  it("rejects bad data", () => {
    expect(() => parse(`- { name: A, tier: bronze }`)).toThrow(/unknown tier "bronze"/)
    expect(() => parse(`- { name: A }`)).toThrow(/needs a "tier" or an "amount"/)
    expect(() => parse(`- { name: A, amount: 50 }`)).toThrow(/below the lowest tier/)
    expect(() => parse(`- { name: A, tier: gold, expires: "2026-02-30" }`)).toThrow(SponsorDataError)
    expect(() => parse(`- { name: A, tier: gold, expires: "next year" }`)).toThrow(/YYYY-MM-DD/)
    expect(() => parse(`- { name: A, amount: 200, period: one-time }`)).toThrow(/since/)
    expect(() => parse(`- { tier: gold }`)).toThrow(/"name" is required/)
  })

  it("treats an empty file as no sponsors", () => {
    expect(parse("").sponsors).toEqual([])
  })
})

describe("isActive", () => {
  it("includes the expiry day itself", () => {
    expect(isActive({ expires: "2026-11-27" }, "2026-11-27")).toBe(true)
    expect(isActive({ expires: "2026-11-26" }, "2026-11-27")).toBe(false)
    expect(isActive({}, "2099-01-01")).toBe(true)
  })
})

describe("rankSponsors", () => {
  it("orders by tier, then annualized amount, then name", () => {
    const { sponsors } = parse(`
- { name: Zed, tier: gold }
- { name: Small, amount: 11000 }
- { name: Monthly, amount: 1200, period: monthly }
- { name: Alpha, tier: gold }
- { name: Big, tier: diamond }
`)
    expect(rankSponsors(sponsors).map((s) => s.name)).toEqual(["Big", "Monthly", "Small", "Alpha", "Zed"])
  })
})

describe("pickWeighted", () => {
  const { sponsors } = parse(`
- { name: D, tier: diamond }
- { name: G, tier: gold }
- { name: S, tier: supporter }
`)

  it("maps the random number onto the cumulative weights", () => {
    // weights 16, 4, 1 -> total 21
    expect(pickWeighted(sponsors, tiers, () => 0)?.name).toBe("D")
    expect(pickWeighted(sponsors, tiers, () => 15.9 / 21)?.name).toBe("D")
    expect(pickWeighted(sponsors, tiers, () => 16.1 / 21)?.name).toBe("G")
    expect(pickWeighted(sponsors, tiers, () => 0.9999)?.name).toBe("S")
  })

  it("skips zero-weight tiers and handles no candidates", () => {
    expect(pickWeighted(sponsors, [{ key: "gold", weight: 1 }], () => 0)?.name).toBe("G")
    expect(pickWeighted([], tiers)).toBeUndefined()
  })
})

describe("data/sponsors/*.yaml", () => {
  it("parses the checked-in files", () => {
    const dir = path.join(process.cwd(), "data", "sponsors")
    const realTiers = parseTiers(yaml.load(fs.readFileSync(path.join(dir, "tiers.yaml"), "utf8")))
    const { sponsors } = parseSponsors(yaml.load(fs.readFileSync(path.join(dir, "sponsors.yaml"), "utf8")), realTiers)
    for (const s of sponsors) {
      if (s.logo && !/^(https?:)?\/\//.test(s.logo)) {
        expect(fs.existsSync(path.join(process.cwd(), "public", s.logo)), s.logo).toBe(true)
      }
    }
  })
})
