import { describe, expect, it } from "vitest"
import { isTrustedEmbedSrc } from "../sanitize"

// The DOMPurify pipeline itself needs a real DOM and is exercised against the
// built application (live payload injection on printer and driver pages).
// The security-critical decision, which iframe origins survive, is this pure
// function, so it is tested exhaustively here.

describe("isTrustedEmbedSrc", () => {
  it("accepts the real upstream Snapcraft embed URLs", () => {
    expect(
      isTrustedEmbedSrc(
        "https://snapcraft.io/ghostscript-printer-app/embedded?button=black&summary=true"
      )
    ).toBe(true)
    expect(isTrustedEmbedSrc("https://snapcraft.io/gutenprint-printer-app/embedded")).toBe(true)
    expect(isTrustedEmbedSrc("https://snapcraft.io/ps-printer-app/embedded?button=black")).toBe(
      true
    )
  })

  it("accepts scheme/host case variants of the trusted origin", () => {
    // URL parsing lowercases scheme and host; these are the same origin.
    expect(isTrustedEmbedSrc("HTTPS://SNAPCRAFT.IO/ps-printer-app/embedded")).toBe(true)
  })

  it("rejects http downgrade of the trusted host", () => {
    expect(isTrustedEmbedSrc("http://snapcraft.io/ghostscript-printer-app/embedded")).toBe(false)
  })

  it("rejects untrusted origins", () => {
    expect(isTrustedEmbedSrc("https://evil.example/pwn")).toBe(false)
    expect(isTrustedEmbedSrc("https://example.com/snapcraft.io/embedded")).toBe(false)
  })

  it("rejects lookalike and suffixed hosts", () => {
    expect(isTrustedEmbedSrc("https://snapcraft.io.evil.com/embedded")).toBe(false)
    expect(isTrustedEmbedSrc("https://evilsnapcraft.io/embedded")).toBe(false)
    expect(isTrustedEmbedSrc("https://sub.snapcraft.io/embedded")).toBe(false)
  })

  it("rejects userinfo spoofing", () => {
    // Everything before @ is userinfo; the real host is evil.com.
    expect(isTrustedEmbedSrc("https://snapcraft.io@evil.com/embedded")).toBe(false)
    expect(isTrustedEmbedSrc("https://snapcraft.io:pass@evil.com/embedded")).toBe(false)
  })

  it("rejects dangerous schemes", () => {
    expect(isTrustedEmbedSrc("javascript:alert(1)")).toBe(false)
    expect(isTrustedEmbedSrc("data:text/html,<script>alert(1)</script>")).toBe(false)
    expect(isTrustedEmbedSrc("vbscript:msgbox(1)")).toBe(false)
    expect(isTrustedEmbedSrc("file:///etc/passwd")).toBe(false)
  })

  it("rejects relative and protocol-relative URLs", () => {
    expect(isTrustedEmbedSrc("//snapcraft.io/embedded")).toBe(false)
    expect(isTrustedEmbedSrc("/ghostscript-printer-app/embedded")).toBe(false)
    expect(isTrustedEmbedSrc("embedded")).toBe(false)
  })

  it("rejects malformed and obfuscated inputs", () => {
    expect(isTrustedEmbedSrc("")).toBe(false)
    expect(isTrustedEmbedSrc("https://")).toBe(false)
    // %2E does not decode to a dot in the host, so the real host is the
    // evil.com suffix, not snapcraft.io.
    expect(isTrustedEmbedSrc("https://snapcraft%2Eio.evil.com/x")).toBe(false)
    // Tab injected into the scheme: not a valid https URL.
    expect(isTrustedEmbedSrc("java\tscript:alert(1)")).toBe(false)
    expect(isTrustedEmbedSrc("not a url at all")).toBe(false)
  })

  it("normalizes slash obfuscation to the true host", () => {
    // Browsers and the WHATWG parser treat `/\` as `//` in special schemes,
    // so this really is the snapcraft.io origin and is correctly trusted;
    // the host, not the slash style, is what the check depends on.
    expect(isTrustedEmbedSrc("https:/\\/snapcraft.io/embedded")).toBe(true)
    // But the same normalization makes this evil.com, correctly rejected.
    expect(isTrustedEmbedSrc("https:/\\/evil.com/snapcraft.io")).toBe(false)
  })

  it("rejects backslash host obfuscation", () => {
    // In special schemes the URL parser treats \\ as /, so the host here is
    // evil.com, not snapcraft.io.
    expect(isTrustedEmbedSrc("https:\\\\evil.com\\snapcraft.io")).toBe(false)
  })
})
