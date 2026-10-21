import { describe, expect, it } from "bun:test";
import { PAGES, rewritePage } from "../scripts/export-static.js";

const LIVE = "https://uae-open-data.zadstack.com";

describe("static export", () => {
  it("covers every public page once", () => {
    expect(new Set(PAGES).size).toBe(PAGES.length);
    expect(PAGES).toContain("/");
    expect(PAGES).toContain("/tax-services/archive");
  });

  it("makes links subpath-safe and points API links at the live instance", () => {
    const html = '<html><head><style>@font-face{src:url("/assets/fonts/Dubai-Regular.woff")}</style></head><body><a href="/">Home</a><a href="/trade-flow">Radar</a><a href="/openapi.json">API</a><a href="/api/v1/trade-flow">JSON</a><a href="https://example.com/x">Out</a></body></html>';
    const out = rewritePage(html, "/tax-services/archive", LIVE);
    expect(out).toContain('<script src="../../_static/shim.js"></script>');
    expect(out).toContain('url("../../assets/fonts/Dubai-Regular.woff")');
    expect(out).toContain('href="../../"');
    expect(out).toContain('href="../../trade-flow/"');
    expect(out).toContain('href="../../openapi.json"');
    expect(out).toContain(`href="${LIVE}/api/v1/trade-flow"`);
    expect(out).toContain('href="https://example.com/x"');
  });
});
