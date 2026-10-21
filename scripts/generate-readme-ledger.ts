// Generates the README ledger visuals (light and dark) in docs/assets/readme/.
// Every count shown here is checked against the runtime by `--check`.
// Run: bun scripts/generate-readme-ledger.ts [--check]
import { coverageSummary } from "../src/catalog.js";

const output = new URL("../docs/assets/readme/", import.meta.url);
const check = process.argv.includes("--check");

type Theme = { name: "light" | "dark"; bg: string; surface: string; panel: string; panelText: string; ink: string; muted: string; rule: string; red: string; green: string; gold: string; forest: string };

const themes: Theme[] = [
  { name: "light", bg: "#f1eddf", surface: "#e8e1ce", panel: "#13251d", panelText: "#f1eddf", ink: "#13251d", muted: "#66736b", rule: "#13251d", red: "#c34032", green: "#087443", gold: "#bf9a55", forest: "#173d2d" },
  { name: "dark", bg: "#0f1d17", surface: "#173d2d", panel: "#0a1611", panelText: "#f1eddf", ink: "#f1eddf", muted: "#a9b5ad", rule: "#f1eddf", red: "#e0604f", green: "#3fae7a", gold: "#d4b06f", forest: "#1d4a37" },
];

const SANS = "Dubai,'Segoe UI','Noto Sans','Noto Sans Arabic',Arial,sans-serif";
const MONO = "'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";

const esc = (v: string) => v.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

const baseStyle = (extra: string, motion: string) => `<style>
text{font-family:${SANS}}.m{font-family:${MONO};letter-spacing:.08em}.ar{direction:rtl;unicode-bidi:embed}
${extra}
@media (prefers-reduced-motion:no-preference){${motion}}
</style>`;

const svg = (w: number, h: number, title: string, desc: string, body: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="t d"><title id="t">${esc(title)}</title><desc id="d">${esc(desc)}</desc>${body}</svg>\n`;

const mark = (t: Theme, x: number, y: number, s: number) => {
  const u = s / 56;
  return `<g transform="translate(${x} ${y}) scale(${u})"><rect width="56" height="56" fill="${t.forest}"/><path d="M13 44V17M21 44V11M29 44V20M37 44V8M45 44V15" stroke="#f1eddf" stroke-width="4"/><path d="M8 49h40" stroke="${t.red}" stroke-width="4"/></g>`;
};

// ---------------------------------------------------------------- hero
const tools = (await Bun.file(new URL("../docs/mcp-tools.json", import.meta.url)).json()) as { tools: unknown[] };
const cov = coverageSummary();
const facts = { portals: cov.officialPortalsIndexed, connectors: cov.liveRecordConnectors, tools: tools.tools.length, sdks: 6, datasets: cov.queryableDatasetsKnownMinimum };

function hero(t: Theme) {
  const W = 1400, H = 460;
  const rows = [
    ["MCP", "/mcp", `${facts.tools} tools · Streamable HTTP + stdio`],
    ["REST", "/api/v1", "OpenAPI 3.1 · cited JSON envelopes"],
    ["TILES", "/tiles/{z}/{x}/{y}.pbf", "TileJSON vector maps"],
    ["SDK", "TS · PY · GO · RS · JAVA · C#", `${facts.sdks} generated clients`],
    ["EVIDENCE", "source · licence · fetched_at", "every record carries citation"],
  ];
  const rowY = (i: number) => 150 + i * 52;
  const ledger = rows.map(([k, v, n], i) => `<g class="row" style="animation-delay:${0.25 + i * 0.18}s"><text x="790" y="${rowY(i)}" class="m" font-size="12" fill="${t.gold}">${String(i + 1).padStart(2, "0")}</text><text x="828" y="${rowY(i)}" class="m" font-size="15" font-weight="600" fill="${t.panelText}">${esc(k)}</text><text x="940" y="${rowY(i)}" class="m" font-size="15" fill="${t.panelText}" opacity=".92">${esc(v)}</text><text x="940" y="${rowY(i) + 19}" font-size="15" fill="${t.panelText}" opacity=".66">${esc(n)}</text><path d="M790 ${rowY(i) + 31}H1300" stroke="${t.panelText}" opacity=".14"/></g>`).join("");
  const style = baseStyle(
    `.row{opacity:1}.scan{opacity:0}`,
    `@keyframes in{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:none}}
.row{animation:in .6s cubic-bezier(.2,.8,.2,1) both}
@keyframes scan{0%{transform:translateY(0);opacity:0}8%{opacity:.9}92%{opacity:.9}100%{transform:translateY(262px);opacity:0}}
.scan{animation:scan 5.5s cubic-bezier(.45,0,.55,1) 1.4s infinite}
@keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}.cur{animation:blink 1.1s steps(1) infinite}
@keyframes grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}.bar{transform-origin:72px 0;animation:grow 1.2s cubic-bezier(.2,.8,.2,1) .2s both}`,
  );
  const body = `${style}<rect width="${W}" height="${H}" fill="${t.bg}"/>
<path d="M0 32H${W}M0 ${H - 32}H${W}M40 0V${H}M${W - 40} 0V${H}" stroke="${t.rule}" opacity=".14"/>
${mark(t, 72, 64, 44)}<text x="130" y="84" font-size="15" font-weight="700" letter-spacing="3" fill="${t.ink}">OPEN EMIRATES</text><text x="130" y="104" class="m" font-size="12" fill="${t.muted}">NATIONAL DATA LEDGER · OPEN SOURCE</text>
<text x="72" y="204" font-size="58" font-weight="700" fill="${t.ink}">Open Emirates</text><text x="72" y="266" font-size="58" font-weight="700" fill="${t.ink}">Intelligence</text>
<rect class="bar" x="72" y="290" width="236" height="4" fill="${t.red}"/>
<text x="72" y="332" font-size="24" fill="${t.red}" font-weight="600">The Emirates, queryable.</text>
<text x="72" y="366" font-size="16" fill="${t.muted}">Official UAE open data for agents, researchers and builders.</text>
<text x="700" y="84" text-anchor="start" class="ar" font-size="18" fill="${t.muted}">ذكاء الإمارات المفتوح</text>
<rect x="760" y="64" width="580" height="348" fill="${t.panel}"/><rect x="760" y="64" width="580" height="4" fill="${t.green}"/>
<text x="790" y="104" class="m" font-size="13" fill="${t.gold}">PUBLIC SURFACES</text><rect class="cur" x="1300" y="94" width="9" height="13" fill="${t.red}"/>
<path d="M790 118H1310" stroke="${t.panelText}" opacity=".3"/>
${ledger}
<rect class="scan" x="776" y="124" width="548" height="2" fill="${t.red}"/>
<text x="72" y="${H - 48}" class="m" font-size="12" fill="${t.muted}">INDEPENDENT INITIATIVE · NOT AFFILIATED WITH OR ENDORSED BY THE UAE GOVERNMENT</text>`;
  return svg(W, H, "Open Emirates Intelligence", "The Emirates, queryable. Official UAE open data over MCP, REST, vector tiles and six SDKs.", body);
}

// ---------------------------------------------------------------- stats
function stats(t: Theme) {
  const W = 1400, H = 150;
  const cells = [
    [String(facts.portals), "OFFICIAL PORTALS INDEXED"],
    [String(facts.connectors), "LIVE RECORD CONNECTORS"],
    [String(facts.tools), "SOURCE-CITED MCP TOOLS"],
    [String(facts.sdks), "SDKS · TS + 5 GENERATED"],
  ];
  const cw = (W - 80) / cells.length;
  const body = cells.map(([n, l], i) => {
    const x = 40 + i * cw;
    return `<g><text class="n" style="animation-delay:${i * 0.15}s" x="${x + 32}" y="74" font-size="56" font-weight="700" fill="${i === 2 ? t.red : t.ink}">${n}</text><text x="${x + 32}" y="108" class="m" font-size="15" fill="${t.muted}">${l}</text><rect class="u" style="animation-delay:${0.2 + i * 0.15}s;transform-origin:${x + 32}px 0" x="${x + 32}" y="122" width="${cw - 64}" height="3" fill="${i === 2 ? t.red : i === 3 ? t.gold : t.green}"/>${i ? `<path d="M${x} 24V${H - 18}" stroke="${t.rule}" opacity=".2"/>` : ""}</g>`;
  }).join("");
  const style = baseStyle("", `@keyframes up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}.n{animation:up .7s cubic-bezier(.2,.8,.2,1) both}
@keyframes grow{0%{transform:scaleX(0)}100%{transform:scaleX(1)}}.u{animation:grow 1.1s cubic-bezier(.2,.8,.2,1) both}`);
  return svg(W, H, "Coverage at a glance", `${facts.portals} official portals indexed, ${facts.connectors} live record connectors, ${facts.tools} MCP tools, ${facts.sdks} SDKs.`,
    `${style}<rect width="${W}" height="${H}" fill="${t.bg}"/><path d="M40 12H${W - 40}M40 ${H - 8}H${W - 40}" stroke="${t.rule}" opacity=".35"/>${body}`);
}

// ---------------------------------------------------------------- divider
function divider(t: Theme) {
  const W = 1400, H = 24;
  const style = baseStyle("", `@keyframes run{from{transform:translateX(0)}to{transform:translateX(1240px)}}.r{animation:run 9s linear infinite}`);
  return svg(W, H, "Section divider", "Ruled ledger divider", `${style}<path d="M40 9H${W - 40}M40 15H${W - 40}" stroke="${t.rule}" opacity=".25"/><rect x="40" y="6" width="12" height="12" fill="${t.red}"/><rect x="${W - 52}" y="6" width="12" height="12" fill="${t.gold}"/><rect class="r" x="64" y="10" width="72" height="4" fill="${t.green}"/>`);
}

// ---------------------------------------------------------------- architecture
function architecture(t: Theme) {
  const W = 1400, H = 600;
  const cols: { n: string; title: string; items: string[]; accent: string }[] = [
    { n: "01", title: "Official sources", accent: t.gold, items: [`${facts.portals} portals indexed`, "FCSC · MOHAP · MOHRE", "TDRA · GCAA · FGIC", "Emirate open-data portals", `${facts.datasets}+ queryable datasets`] },
    { n: "02", title: "Connectors", accent: t.green, items: ["CKAN · OpenDataSoft", "ArcGIS · Socrata", "JSON · CSV · XLSX · XML", "RSS · GraphQL", "SDMX · SPARQL"] },
    { n: "03", title: "Bun engine", accent: t.red, items: ["Bilingual catalog search", "SSRF guard · PII redaction", "SQLite health + snapshots", "Citations + quality scores", "Geo queries · aggregation"] },
    { n: "04", title: "Surfaces", accent: t.green, items: [`MCP · ${facts.tools} tools`, "REST /api/v1 · OpenAPI 3.1", "Vector tiles · TileJSON", "TypeScript SDK", "Python · Go · Rust · Java · C#"] },
    { n: "05", title: "Delivery", accent: t.gold, items: ["Cloudflare Worker", "uae-open-data.zadstack.com", "Maarad static canvas", "npm · bunx uaemcp", "Container image (GHCR)"] },
  ];
  const cw = 236, gap = 32, x0 = (W - (cols.length * cw + (cols.length - 1) * gap)) / 2, y0 = 120, ch = 380;
  const blocks = cols.map((c, i) => {
    const x = x0 + i * (cw + gap);
    const dark = i === 2;
    const fg = dark ? "#f1eddf" : t.ink;
    const items = c.items.map((it, j) => `<text x="${x + 20}" y="${y0 + 116 + j * 50}" font-size="15" fill="${fg}"${j === 0 ? ' font-weight="700"' : ""}>${esc(it)}</text><path d="M${x + 20} ${y0 + 134 + j * 50}H${x + cw - 20}" stroke="${fg}" opacity=".14"/>`).join("");
    return `<g class="col" style="animation-delay:${i * 0.12}s"><rect x="${x}" y="${y0}" width="${cw}" height="${ch}" fill="${dark ? t.forest : t.surface}" stroke="${t.rule}" stroke-opacity=".18"/><rect x="${x}" y="${y0}" width="${cw}" height="4" fill="${c.accent}"/><text x="${x + 20}" y="${y0 + 42}" class="m" font-size="13" fill="${dark ? t.gold : t.muted}">${c.n}</text><text x="${x + 20}" y="${y0 + 72}" font-size="21" font-weight="700" fill="${fg}">${esc(c.title)}</text>${items}</g>`;
  }).join("");
  const links = cols.slice(0, -1).map((_, i) => {
    const xa = x0 + i * (cw + gap) + cw, xb = xa + gap, y = y0 + ch / 2;
    return `<path d="M${xa} ${y}H${xb}" stroke="${t.red}" stroke-width="2"/><path class="flow" style="animation-delay:${i * 0.3}s" d="M${xa} ${y}H${xb}" stroke="${t.bg}" stroke-width="2" stroke-dasharray="4 6"/><path d="M${xb - 7} ${y - 5}L${xb} ${y}L${xb - 7} ${y + 5}" fill="none" stroke="${t.red}" stroke-width="2"/>`;
  }).join("");
  const style = baseStyle("", `@keyframes in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}.col{animation:in .7s cubic-bezier(.2,.8,.2,1) both}
@keyframes flow{to{stroke-dashoffset:-20}}.flow{animation:flow .9s linear infinite}
@keyframes pulse{0%,100%{opacity:.25}50%{opacity:1}}.p{animation:pulse 2.4s ease-in-out infinite}`);
  return svg(W, H, "Architecture", "Official sources flow through typed connectors into the Bun engine, which exposes MCP, REST, vector tiles and SDKs, delivered by the Cloudflare Worker, the Maarad static canvas, npm and a container image.",
    `${style}<rect width="${W}" height="${H}" fill="${t.bg}"/><path d="M0 28H${W}M0 ${H - 28}H${W}" stroke="${t.rule}" opacity=".14"/>
<text x="${x0}" y="74" class="m" font-size="14" fill="${t.red}">ARCHITECTURE · DATA FLOWS LEFT TO RIGHT</text><text x="${x0}" y="100" font-size="17" fill="${t.muted}">Every response keeps its source, licence, retrieval time and evidence boundary.</text>
<rect class="p" x="${W - x0 - 12}" y="64" width="12" height="12" fill="${t.green}"/>
${blocks}${links}
<text x="${x0}" y="${y0 + ch + 44}" class="m" font-size="13" fill="${t.muted}">CITED · BOUNDED · BILINGUAL — UNKNOWN MEASUREMENTS STAY “UNKNOWN”</text>`);
}

// ---------------------------------------------------------------- terminal
function terminal(t: Theme) {
  const W = 1200, fs = 17, cwch = fs * 0.6, lh = 34, pad = 40;
  type Line = { kind: "cmd" | "out" | "note"; text: string };
  const lines: Line[] = [
    { kind: "note", text: "# run the MCP server locally (stdio, or Streamable HTTP at /mcp)" },
    { kind: "cmd", text: "bunx --bun uaemcp@latest doctor" },
    { kind: "cmd", text: "bunx --bun uaemcp@latest http" },
    { kind: "note", text: "# or query the hosted Worker directly" },
    { kind: "cmd", text: "curl -s https://uae-open-data.zadstack.com/health" },
    { kind: "out", text: '{"ok":true,"status":"alive","runtime":"cloudflare-workers",…}' },
    { kind: "cmd", text: "curl -s 'https://uae-open-data.zadstack.com/api/v1/places?q=Dubai&limit=5'" },
  ];
  const H = 96 + lines.length * lh + 36;
  const cycle = 16; // seconds
  let at = 0.4;
  const kf: string[] = [];
  const rows = lines.map((l, i) => {
    const y = 104 + i * lh;
    const prefix = l.kind === "cmd" ? "$ " : "";
    const full = prefix + l.text;
    const chars = full.length;
    const typeDur = l.kind === "cmd" ? Math.min(2.2, chars * 0.045) : 0.25;
    const s = (at / cycle) * 100, e = ((at + typeDur) / cycle) * 100;
    at += typeDur + (l.kind === "cmd" ? 0.35 : 0.2);
    const width = chars * cwch + 24;
    const steps = l.kind === "cmd" ? chars : 1;
    kf.push(`@keyframes k${i}{0%{transform:translateX(0);animation-timing-function:step-end}${s.toFixed(2)}%{transform:translateX(0);animation-timing-function:steps(${steps},end)}${e.toFixed(2)}%,94%{transform:translateX(${width.toFixed(0)}px);animation-timing-function:step-end}100%{transform:translateX(0)}}.c${i}{animation:k${i} ${cycle}s infinite}`);
    const color = l.kind === "note" ? "#a9b5ad" : l.kind === "out" ? "#3fae7a" : "#f1eddf";
    const txt = l.kind === "cmd" ? `<tspan fill="${t.gold}">$ </tspan>${esc(l.text)}` : esc(l.text);
    return `<text x="${pad}" y="${y}" class="mt" font-size="${fs}" fill="${color}" xml:space="preserve">${txt}</text><rect class="cv c${i}" x="${pad - 4}" y="${y - fs}" width="${width.toFixed(0)}" height="${fs + 10}" fill="${t.panel}"/>`;
  }).join("");
  const motion = kf.join("\n");
  const style = `<style>text{font-family:${SANS}}.mt{font-family:${MONO}}.m{font-family:${MONO};letter-spacing:.08em}.cv{transform:translateX(${W}px)}@keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}
@media (prefers-reduced-motion:no-preference){.cv{transform:none}${motion}.cur{animation:blink 1s steps(1) infinite}}</style>`;
  const lastY = 104 + lines.length * lh;
  return svg(W, H, "Quick start", "Run uaemcp with bunx, or call the hosted Worker's /health and /api/v1/places endpoints with curl.",
    `${style}<rect width="${W}" height="${H}" fill="${t.panel}"/><rect width="${W}" height="44" fill="${t.forest}"/><rect x="20" y="16" width="12" height="12" fill="${t.red}"/><rect x="40" y="16" width="12" height="12" fill="${t.gold}"/><rect x="60" y="16" width="12" height="12" fill="${t.green}"/><text x="${W / 2}" y="27" text-anchor="middle" class="m" font-size="13" fill="#f1eddf" opacity=".8">QUICK START · BASH</text><path d="M0 44H${W}" stroke="#f1eddf" opacity=".15"/>
${rows}<text x="${pad}" y="${lastY}" class="mt" font-size="${fs}" fill="${t.gold}">$</text><rect class="cur" x="${pad + 20}" y="${lastY - fs + 2}" width="10" height="${fs}" fill="${t.red}"/>${t.name === "light" ? `<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" fill="none" stroke="#13251d" opacity=".4"/>` : ""}`);
}

const files: [string, string][] = [];
for (const t of themes) {
  files.push([`hero-${t.name}.svg`, hero(t)], [`stats-${t.name}.svg`, stats(t)], [`divider-${t.name}.svg`, divider(t)], [`architecture-${t.name}.svg`, architecture(t)], [`quickstart-${t.name}.svg`, terminal(t)]);
}

let stale = 0;
for (const [name, content] of files) {
  const url = new URL(name, output);
  if (check) {
    const current = await Bun.file(url).exists() ? await Bun.file(url).text() : "";
    if (current !== content) { console.error(`stale: docs/assets/readme/${name}`); stale++; }
  } else await Bun.write(url, content);
}
if (check && stale) process.exit(1);
console.log(`${check ? "Checked" : "Generated"} ${files.length} README ledger visuals (${JSON.stringify(facts)}).`);
