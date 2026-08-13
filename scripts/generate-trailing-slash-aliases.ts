// Post-export step for #207: makes `/foo/` resolve while `/foo` stays canonical.
//
// The export writes `foo.html`, which Pages serves for `/foo`. Nothing answers
// `/foo/`, and that 404 broke old inbound links and RSS URLs, so for each
// `foo.html` this writes a `foo/index.html` stub redirecting to `/foo`.
//
// `/foo` keeps being served directly, without a redirect hop, only because
// Pages prefers `foo.html` over redirecting to the `foo/` directory. That
// precedence is verified against live GitHub Pages but undocumented by GitHub,
// so both forms are worth re-checking after a deploy.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, "..");

const OUT_DIR = path.join(ROOT_DIR, "out");
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// `404.html` is Pages' error document; `index.html` is already a directory index.
const SKIP_FILES = new Set(["404.html", "index.html"]);

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeJs(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function redirectHtml(target: string): string {
  const htmlTarget = escapeHtml(target);
  const jsTarget = escapeJs(target);

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="refresh" content="0; url=${htmlTarget}" />
    <link rel="canonical" href="${htmlTarget}" />
    <meta name="robots" content="noindex, follow" />
    <title>Redirecting…</title>
    <script>window.location.replace("${jsTarget}" + window.location.search + window.location.hash);</script>
  </head>
  <body>
    <p>This page lives at <a href="${htmlTarget}">${htmlTarget}</a>.</p>
  </body>
</html>
`;
}

function routeUrl(relativeHtmlPath: string): string {
  const withoutExtension = relativeHtmlPath.slice(0, -".html".length);
  const segments = withoutExtension.split(path.sep);
  return `${BASE_PATH}/${segments.join("/")}`;
}

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Nothing under `_next/` is a routable page.
      if (path.relative(OUT_DIR, full) === "_next") continue;
      walk(full, files);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
}

function main() {
  if (!fs.existsSync(OUT_DIR)) {
    console.warn(
      `Export directory ${OUT_DIR} not found; skipping trailing-slash aliases.`,
    );
    return;
  }

  let written = 0;
  let skipped = 0;

  for (const file of walk(OUT_DIR)) {
    if (SKIP_FILES.has(path.basename(file))) continue;

    const relative = path.relative(OUT_DIR, file);
    const aliasDir = path.join(OUT_DIR, relative.slice(0, -".html".length));
    const aliasFile = path.join(aliasDir, "index.html");

    // Never overwrite a directory index owned by a real page or by the
    // Foomatic legacy stubs, which run before this script.
    if (fs.existsSync(aliasFile)) {
      skipped += 1;
      continue;
    }

    fs.mkdirSync(aliasDir, { recursive: true });
    fs.writeFileSync(aliasFile, redirectHtml(routeUrl(relative)), "utf8");
    written += 1;
  }

  console.log(
    `Wrote ${written} trailing-slash alias stubs ` +
      `(/<route>/ -> /<route>); ${skipped} routes already had a directory index.`,
  );
}

main();
