// Guards the URL conventions from #207: internal links and advertised URLs
// carry no trailing slash, and every exported route answers in both forms.
//
// The source scan always runs; the checks against `out/` are skipped with a
// notice when the site has not been exported yet.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { siteConfig } from "../config/site.config.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT_DIR, "out");

// `/cups/` is the separate CUPS Pages site on the same domain, not part of
// this export, and it requires its trailing slash.
const ALLOWED_TRAILING_SLASH_PATHS = ["/cups/"];

const SOURCE_DIRS = ["app", "components", "lib", "config", "contents", "data"];
const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".md", ".mdx"]);

// Matches href="/foo/" and getSiteUrl("/foo/") in code, ](/foo/) in Markdown.
const CODE_LINK = /(?:href=|getSiteUrl\(|push\(|redirect\()\s*[{("`]+(\/[^"'`)\s]*\/)["'`)]/g;
const MARKDOWN_LINK = /]\((\/[^)\s]*\/)\)/g;

interface Failure {
  file: string;
  detail: string;
}

const failures: Failure[] = [];
const notices: string[] = [];

function fail(file: string, detail: string) {
  failures.push({ file, detail });
}

function isAllowed(link: string): boolean {
  return ALLOWED_TRAILING_SLASH_PATHS.some((allowed) => link === allowed);
}

function walk(dir: string, filter: (file: string) => boolean): string[] {
  const found: string[] = [];
  if (!fs.existsSync(dir)) return found;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...walk(full, filter));
    } else if (entry.isFile() && filter(full)) {
      found.push(full);
    }
  }
  return found;
}

function checkSourceLinks() {
  for (const dir of SOURCE_DIRS) {
    const files = walk(path.join(ROOT_DIR, dir), (file) =>
      SOURCE_EXTENSIONS.has(path.extname(file)),
    );

    for (const file of files) {
      const contents = fs.readFileSync(file, "utf8");
      const relative = path.relative(ROOT_DIR, file);

      for (const pattern of [CODE_LINK, MARKDOWN_LINK]) {
        pattern.lastIndex = 0;
        let match: RegExpExecArray | null;
        while ((match = pattern.exec(contents)) !== null) {
          const link = match[1];
          if (link === "/" || isAllowed(link)) continue;
          fail(relative, `internal link ends with a slash: ${link}`);
        }
      }
    }
  }
}

function checkGeneratedUrls(file: string, label: string) {
  const full = path.join(OUT_DIR, file);
  if (!fs.existsSync(full)) {
    notices.push(`${label} not found at ${path.relative(ROOT_DIR, full)}`);
    return;
  }

  const origin = siteConfig.urls.canonicalOrigin;
  const contents = fs.readFileSync(full, "utf8");
  // Ignore XML namespace URLs and outbound links.
  const urls = (contents.match(/https?:\/\/[^<\s"]+/g) ?? []).filter((url) =>
    url.startsWith(`${origin}/`),
  );

  for (const url of urls) {
    if (!url.endsWith("/")) continue;
    // The bare origin (".../") is the site root and stays as it is.
    if (url === `${origin}/`) continue;
    if (isAllowed(url.slice(origin.length))) continue;
    fail(file, `${label} advertises a trailing-slash URL: ${url}`);
  }

  if (urls.length === 0) {
    fail(file, `${label} contains no ${origin} URLs`);
  }
}

function checkBothUrlFormsResolve() {
  const pages = walk(
    OUT_DIR,
    (file) =>
      file.endsWith(".html") &&
      path.basename(file) !== "index.html" &&
      path.basename(file) !== "404.html" &&
      !path.relative(OUT_DIR, file).startsWith(`_next${path.sep}`),
  );

  let missing = 0;
  for (const page of pages) {
    const alias = path.join(page.slice(0, -".html".length), "index.html");
    if (!fs.existsSync(alias)) {
      missing += 1;
      if (missing <= 10) {
        fail(
          path.relative(OUT_DIR, page),
          "no trailing-slash alias (expected " +
            `${path.relative(OUT_DIR, alias)})`,
        );
      }
    }
  }

  if (missing > 10) {
    fail("out/", `${missing - 10} further routes without a trailing-slash alias`);
  }

  console.log(
    `Checked ${pages.length} exported routes for both URL forms ` +
      `(${pages.length - missing} complete).`,
  );
}

function resolves(pathname: string): { page: boolean; alias: boolean } {
  const decoded = decodeURIComponent(pathname.replace(/^\//, "").replace(/\/$/, ""));
  return {
    page: fs.existsSync(path.join(OUT_DIR, `${decoded}.html`)),
    alias: fs.existsSync(path.join(OUT_DIR, decoded, "index.html")),
  };
}

// <link> must be canonical and slashless -- that is what aggregators publish.
// <guid> is the item's identity and keeps its historical trailing-slash form,
// so it is exempt from the slash rule but must still resolve.
function checkFeed() {
  const feed = path.join(OUT_DIR, "feed.xml");
  if (!fs.existsSync(feed)) {
    notices.push("RSS feed not found at out/feed.xml");
    return;
  }

  const origin = siteConfig.urls.canonicalOrigin;
  const contents = fs.readFileSync(feed, "utf8");
  const links = [...contents.matchAll(/<link>([^<]+)<\/link>/g)].map((m) => m[1]);
  const guids = [...contents.matchAll(/<guid[^>]*>([^<]+)<\/guid>/g)].map(
    (m) => m[1],
  );

  const channelLink = links[0];
  if (channelLink !== `${origin}/`) {
    fail("feed.xml", `channel <link> should be ${origin}/ but is ${channelLink}`);
  }

  for (const link of links.slice(1)) {
    if (link.endsWith("/")) {
      fail("feed.xml", `item <link> ends with a slash: ${link}`);
    }
    const { page } = resolves(new URL(link).pathname);
    if (!page) fail("feed.xml", `no exported page for item <link> ${link}`);
  }

  for (const guid of guids) {
    const { page, alias } = resolves(new URL(guid).pathname);
    if (!page || !alias) {
      fail("feed.xml", `<guid> ${guid} does not resolve in the export`);
    }
  }

  if (links.length < 2 || guids.length === 0) {
    fail("feed.xml", "feed contains no items");
  }

  console.log(
    `Checked ${links.length - 1} RSS item links and ${guids.length} guids ` +
      `against the export.`,
  );
}

function main() {
  checkSourceLinks();

  if (fs.existsSync(OUT_DIR)) {
    checkGeneratedUrls("sitemap.xml", "Sitemap");
    checkBothUrlFormsResolve();
    checkFeed();
  } else {
    notices.push(
      "out/ not found: run `yarn build` first to verify the exported routes.",
    );
  }

  for (const notice of notices) {
    console.warn(`notice: ${notice}`);
  }

  if (failures.length > 0) {
    console.error(`\n${failures.length} URL convention problem(s):`);
    for (const failure of failures) {
      console.error(`  ${failure.file}: ${failure.detail}`);
    }
    process.exit(1);
  }

  console.log("URL conventions OK: no trailing-slash internal links.");
}

main();
