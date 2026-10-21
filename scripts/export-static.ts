#!/usr/bin/env bun
// Export the public web surfaces as a static site (e.g. for a Maarad canvas).
//
//   bun scripts/export-static.ts --base http://127.0.0.1:8080 --out dist/static --zip dist/site.zip
//
// Pages and assets are rendered by a running local server (--base). The JSON
// that pages request on load is retained as snapshots, fetched from the live
// instance (--live, default https://uae-open-data.zadstack.com) and falling back
// to the local server. Links are made relative so the site works under any
// subpath, and remaining API calls go to the live instance at runtime.
import { mkdirSync, rmSync, writeFileSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { createHash } from "node:crypto";
import { zipSync } from "fflate";

function arg(name: string, fallback: string): string {
  const index = process.argv.indexOf(`--${name}`);
  return index > -1 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}

const BASE = arg("base", "http://127.0.0.1:8080").replace(/\/$/, "");
const LIVE = arg("live", process.env.UAEMCP_LIVE_ORIGIN || "https://uae-open-data.zadstack.com").replace(/\/$/, "");
const OUT = arg("out", "dist/static");
const ZIP = arg("zip", "");
const SNAPSHOTS = arg("snapshots", "live"); // live | local | none
const LIVE_INTERVAL_MS = Number(arg("live-interval-ms", "650")); // stays under the 120/min public rate limit

export const PAGES = [
  "/", "/aeronautical-publications", "/ajman-business", "/ajman-parks", "/ajman-urban", "/business-setup",
  "/connectivity", "/education", "/employment-gender", "/evidence-studio", "/founder-pathway", "/golden-residency",
  "/health-facilities", "/health-facilities-map", "/health-indicators", "/industry-atlas", "/national-brief",
  "/observatory", "/places", "/playground", "/policy-watch", "/startup-support", "/tax-services",
  "/tax-services/archive", "/tools", "/tourism-pulse", "/trade-flow",
];

// GET requests the pages issue on first load (recorded in headless Chrome), plus
// a few landing-page and catalogue reads.
const INITIAL_REQUESTS = [
  "/api/v1/products", "/api/v1/sources", "/api/v1/coverage", "/api/v1/tools", "/api/v1/catalog",
  "/api/v1/aeronautical-publications", "/api/v1/ajman-business?limit=500", "/api/v1/ajman-parks", "/api/v1/ajman-urban",
  "/api/v1/connectivity", "/api/v1/education", "/api/v1/golden-residency", "/api/v1/health-facilities?year=2024",
  "/api/v1/health-facilities-map?limit=100", "/api/v1/health-indicators?limit=200", "/api/v1/industry-atlas/change",
  "/api/v1/industry-atlas?limit=500", "/api/v1/national-brief", "/api/v1/observatory", "/api/v1/observatory/incidents?limit=100",
  "/api/v1/places?q=%D8%AF%D8%A8%D9%8A&limit=20", "/api/v1/policy-watch", "/api/v1/tax-services", "/api/v1/tax-services/archive",
  "/api/v1/tourism-pulse", "/api/v1/trade-flow", "/api/v1/intelligence/indicators", "/api/v1/intelligence/recipes",
  "/api/v1/intelligence/indicators/open_data_coverage", "/api/v1/intelligence/recipes/source_coverage",
  "/api/v1/intelligence/dashboard-summary", "/api/v1/observatory/incidents",
  `/api/v1/search?q=${encodeURIComponent("عقارات")}`,
];

const STATIC_ASSETS = [
  "/openapi.json", "/favicon.svg", "/favicon.ico",
  "/assets/fonts/Dubai-Regular.woff", "/assets/fonts/Dubai-Bold.woff",
  "/assets/fonts/ibm-plex-mono-latin-400-normal.woff2", "/assets/fonts/ibm-plex-mono-latin-500-normal.woff2",
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const write = (path: string, data: string | Uint8Array) => {
  const file = join(OUT, path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, data);
};

async function get(url: string): Promise<Response | null> {
  try { return await fetch(url, { signal: AbortSignal.timeout(60_000) }); } catch { return null; }
}

async function ids(path: string, list: string, field: string): Promise<string[]> {
  const body = await (await get(BASE + path))?.json().catch(() => null) as { data?: unknown } | null;
  const data = body?.data as Record<string, unknown> | unknown[] | undefined;
  const rows = (Array.isArray(data) ? data : (data as Record<string, unknown> | undefined)?.[list]) as Array<Record<string, string>> | undefined;
  return (rows ?? []).map((row) => row[field] ?? row.sourceId).filter(Boolean);
}

/** Rewrites a server-rendered page so it works as a file at `route` under any subpath. */
export function rewritePage(html: string, route: string, live: string): string {
  const depth = route === "/" ? 0 : route.slice(1).split("/").length;
  const rel = depth ? "../".repeat(depth) : "./";
  let out = html.replace(/<head([^>]*)>/i, `<head$1><script src="${rel}_static/shim.js"></script>`);
  out = out.replace(/href="\/(api|mcp)([^"]*)"/g, (_m, a: string, b: string) => `href="${live}/${a}${b}"`);
  out = out.replace(/url\((['"]?)\/assets\//g, (_m, quote: string) => `url(${quote}${rel}assets/`);
  out = out.replace(/href="\/([^"/][^"]*)?"/g, (_m, target: string | undefined) => {
    let path = target ?? "";
    let suffix = "";
    const cut = path.search(/[?#]/);
    if (cut >= 0) { suffix = path.slice(cut); path = path.slice(0, cut); }
    if (path && !/\.[a-z0-9]+$/i.test(path)) path += "/";
    return `href="${rel}${path}${suffix}"`;
  });
  // Tool deep links use ?tool= because /tools/<name> has no file on a static host.
  out = out.split("history.pushState({},'', '/tools/'+encodeURIComponent(name))").join("history.pushState({},'', '?tool='+encodeURIComponent(name))");
  out = out.split("decodeURIComponent(location.pathname.replace(/^\\/tools\\/?/,''))").join("(new URLSearchParams(location.search).get('tool')||'')");
  out = out.split("https://uaemcp.zad.tools/mcp").join(`${live}/mcp`);
  return out;
}

async function main() {
  rmSync(OUT, { recursive: true, force: true });
  mkdirSync(OUT, { recursive: true });

  const requests = new Set(INITIAL_REQUESTS);
  for (const id of await ids("/api/v1/sources", "sources", "id")) {
    requests.add(`/api/v1/observatory/sources/${encodeURIComponent(id)}`);
    requests.add(`/api/v1/sources/${encodeURIComponent(id)}`);
  }
  for (const name of await ids("/api/v1/tools", "tools", "name")) requests.add(`/api/v1/tools/${encodeURIComponent(name)}`);

  const manifest: Record<string, string> = {};
  const failed: string[] = [];
  let fromLive = 0;
  if (SNAPSHOTS !== "none") {
    for (const key of requests) {
      let response: Response | null = null;
      if (SNAPSHOTS === "live") {
        await sleep(LIVE_INTERVAL_MS);
        response = await get(LIVE + key);
        if (response?.status === 200) fromLive++;
      }
      if (response?.status !== 200) {
        const local = await get(BASE + key);
        if (local?.status === 200) response = local;
      }
      if (response?.status !== 200) { failed.push(`${response?.status ?? "ERR"} ${key}`); continue; }
      const ext = (response.headers.get("content-type") || "").includes("json") ? "json" : "txt";
      const file = `_snapshot/${createHash("sha1").update(key).digest("hex").slice(0, 16)}.${ext}`;
      write(file, new Uint8Array(await response.arrayBuffer()));
      manifest[key] = file;
    }
  }

  const shim = readFileSync(join(import.meta.dir, "static/shim.js"), "utf8")
    .replace("__LIVE__", JSON.stringify(LIVE))
    .replace("__MANIFEST__", JSON.stringify(manifest));
  write("_static/shim.js", shim);

  for (const route of PAGES) {
    const response = await get(BASE + route);
    if (response?.status !== 200) throw new Error(`page ${route} returned ${response?.status ?? "no response"}`);
    write(route === "/" ? "index.html" : `${route.slice(1)}/index.html`, rewritePage(await response.text(), route, LIVE));
  }
  for (const asset of STATIC_ASSETS) {
    const response = await get(BASE + asset);
    if (response?.status !== 200) throw new Error(`asset ${asset} returned ${response?.status ?? "no response"}`);
    write(asset.slice(1), new Uint8Array(await response.arrayBuffer()));
  }

  const files: Record<string, Uint8Array> = {};
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) walk(path);
      else files[relative(OUT, path).split("\\").join("/")] = new Uint8Array(readFileSync(path));
    }
  };
  walk(OUT);
  if (ZIP) {
    mkdirSync(dirname(ZIP), { recursive: true });
    writeFileSync(ZIP, zipSync(files, { level: 9 }));
  }
  console.log(JSON.stringify({
    pages: PAGES.length, files: Object.keys(files).length, snapshots: Object.keys(manifest).length,
    snapshotsFromLive: fromLive, failedSnapshots: failed, live: LIVE, zip: ZIP || null,
  }, null, 2));
}

if (import.meta.main) await main();
