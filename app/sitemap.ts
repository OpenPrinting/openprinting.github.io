import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getAllPostRecords } from "@/lib/posts";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

const CONTENTS = path.join(process.cwd(), "contents");

function readDirSlugs(dir: string): string[] {
  const full = path.join(CONTENTS, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".md"))
    .filter((f) => {
      const { data } = matter(fs.readFileSync(path.join(full, f), "utf8"));
      return typeof data.redirect !== "string";
    })
    .map((f) => f.replace(/\.md$/, ""));
}

const STATIC_ROUTES = [
  "/",
  "/about-us/",
  "/news/",
  "/projects/",
  "/downloads/",
  "/documentation/",
  "/upcoming-technologies/",
  "/driverless/",
  "/drivers/",
  "/printers/",
  "/foomatic/",
  "/contact/",
  "/donations/",
  "/contribute/",
  "/contribute-website/",
  "/codeofconduct/",
  "/achievements/",
  "/history/",
  "/current/",
  "/databaseintro/",
  "/gsoc/",
  "/gsod/",
  "/gsod2020/",
  "/lfmp/",
  "/lfmp2020/",
  "/wsl-printer-app/",
  "/wsl-printer-app-compile/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of STATIC_ROUTES) {
    entries.push({ url: getSiteUrl(route) });
  }

  for (const post of getAllPostRecords()) {
    entries.push({
      url: getSiteUrl(`/${post.slug}/`),
      lastModified: post.date || undefined,
    });
  }

  for (const slug of readDirSlugs("projects")) {
    entries.push({ url: getSiteUrl(`/projects/${slug}/`) });
  }
  for (const slug of readDirSlugs("documentation")) {
    entries.push({ url: getSiteUrl(`/documentation/${slug}/`) });
  }
  for (const slug of readDirSlugs("upcoming-technologies")) {
    entries.push({ url: getSiteUrl(`/upcoming-technologies/${slug}/`) });
  }

  for (const route of foomaticRoutes()) {
    entries.push({ url: getSiteUrl(route) });
  }

  return entries;
}

function foomaticRoutes(): string[] {
  const routes: string[] = ["/foomatic/driver/"];
  const fdb = path.join(process.cwd(), "public", "foomatic-db");

  const printersMap = path.join(fdb, "printersMap.json");
  if (fs.existsSync(printersMap)) {
    const data = JSON.parse(fs.readFileSync(printersMap, "utf8")) as {
      printers: { id: string }[];
    };
    for (const printer of data.printers) {
      routes.push(`/foomatic/printer/${printer.id.replace(/^printer\//, "")}/`);
    }
  }

  const driversMap = path.join(fdb, "driversMap.json");
  if (fs.existsSync(driversMap)) {
    const data = JSON.parse(fs.readFileSync(driversMap, "utf8")) as {
      drivers: { id: string }[];
    };
    for (const driver of data.drivers) {
      routes.push(`/foomatic/driver/${driver.id}/`);
    }
  }

  return routes;
}
