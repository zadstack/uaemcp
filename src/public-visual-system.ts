const VISUAL_SYSTEM = `<style data-oei-visual-system>
:root{
  --oei-paper:#f1eddf;
  --oei-paper-raised:#e8e2d2;
  --oei-ink:#10271f;
  --oei-forest:#173d2d;
  --oei-red:#c34032;
  --oei-gold:#c6a45f;
  --oei-muted:#596a62;
  --oei-line:rgba(16,39,31,.28);
  --oei-line-inverse:rgba(241,237,223,.28);
  --oei-type-caption:.75rem;
  --oei-type-label:.8125rem;
  --oei-type-body:1rem;
  --oei-type-body-lg:1.125rem;
  --oei-type-heading-sm:1.5rem;
  --oei-type-heading-md:2rem;
  --oei-type-heading-lg:clamp(2.5rem,4.2vw,4rem);
  --oei-space-01:.25rem;
  --oei-space-02:.5rem;
  --oei-space-03:.75rem;
  --oei-space-04:.875rem;
  --oei-space-05:1rem;
  --oei-space-06:1.5rem;
  --oei-space-07:2rem;
  --oei-space-08:3rem;
  --oei-space-09:4rem;
  --oei-control-sm:2rem;
  --oei-control-md:2.75rem;
  --oei-control-lg:3rem;
  --oei-content-max:100rem;
  --oei-page-pad:clamp(1rem,4vw,4rem);
}
html{color-scheme:only light;text-rendering:optimizeLegibility;-webkit-text-size-adjust:100%;scrollbar-color:var(--oei-ink) transparent;background:var(--oei-paper)}
html body,html[dir=rtl] body{font-family:"Dubai",Arial,sans-serif!important;-webkit-font-smoothing:antialiased;background:var(--oei-paper);color:var(--oei-ink);font-size:var(--oei-type-body);line-height:1.5}
html body *{font-family:"Dubai",Arial,sans-serif!important;box-sizing:border-box}
html body h1{font-size:var(--oei-type-heading-lg)!important;line-height:1!important;letter-spacing:-.035em!important;text-wrap:balance;overflow-wrap:anywhere;margin-block:var(--oei-space-06)!important;max-width:18ch}
html body h2{font-size:clamp(2rem,3.2vw,3rem)!important;line-height:1.08!important;letter-spacing:-.025em!important;text-wrap:balance}
html body h3{font-size:clamp(1.25rem,2vw,1.75rem)!important;line-height:1.15!important;letter-spacing:-.012em!important;text-wrap:balance}
html body p,html body li{font-size:var(--oei-type-body)!important;line-height:1.6!important;text-wrap:pretty}
html body small{font-size:var(--oei-type-caption)!important;line-height:1.45!important}
html body img,html body svg,html body canvas,html body video{max-width:100%}
html body button,html body a,html body input,html body select,html body textarea{touch-action:manipulation}
html body button,html body input,html body select,html body textarea{min-height:var(--oei-control-md);font-size:var(--oei-type-label)!important;line-height:1.25!important}
html body input,html body select,html body textarea{border-radius:0!important;padding-inline:var(--oei-space-04)!important}
html body button{border-radius:0!important;font-weight:700!important;letter-spacing:.015em!important}
html body pre,html body code{overflow-wrap:anywhere;font-size:var(--oei-type-caption)!important;line-height:1.55!important}
html body :is(.eye,.eyebrow,.micro,.label,.kicker,.kind,.status,.meta,.step-no,.phase,.delivery,.badge,.tool-kind,.section-label,.atlas-key,.visual-label,.bar span,.ledger small,.snapshot small,.hashes small,.argument b,.meta span,.dock-head button,.filter,.kind-flag){font-size:var(--oei-type-caption)!important;line-height:1.35!important;letter-spacing:.055em!important}
html body :is(.lede,.scope p,.boundary p){font-size:var(--oei-type-body-lg)!important;line-height:1.55!important;max-width:65ch}
html body :is(.top,header.top){height:4rem!important;min-height:4rem!important;padding-inline:var(--oei-page-pad)!important;border-bottom:1px solid var(--oei-line)!important;background:var(--oei-paper)!important}
html body :is(.top,.nav,header nav,.top nav){align-items:center!important;gap:var(--oei-space-06)!important}
html body :is(.top a,.top button,.nav a,.nav button,header nav a,header nav button){font-size:var(--oei-type-label)!important;white-space:nowrap}
html body :is(.hero,.intro){min-height:0!important;border-bottom:1px solid var(--oei-line)!important}
html body :is(.hero-copy,.copy){padding:var(--oei-space-09) var(--oei-page-pad)!important}
html body :is(.hero-copy,.copy)>p{margin-block:var(--oei-space-05)!important}
html body :is(.section,.workspace,.results,.journey){padding:var(--oei-space-09) var(--oei-page-pad)!important}
html body :is(.section,.workspace,.results,.journey)>h2{margin-top:0!important;margin-bottom:var(--oei-space-07)!important;max-width:22ch}
html body :is(.section-head,.head,.workspace-head,.journey-head){margin-bottom:var(--oei-space-07)!important;gap:var(--oei-space-06)!important}
html body :is(.section-head,.head,.workspace-head,.journey-head) h2{margin-block:0!important}
html body :is(.metrics,.summary){border-color:var(--oei-line)!important}
html body :is(.metric,.summary>div){min-height:7.5rem!important;padding:var(--oei-space-06)!important;display:flex;flex-direction:column;justify-content:space-between}
html body :is(.metric,.summary>div) strong{font-size:clamp(1.75rem,3vw,2.75rem)!important;line-height:1!important;font-weight:700!important}
html body :is(.metric,.summary>div) span{font-size:var(--oei-type-label)!important;line-height:1.35!important;color:var(--oei-muted)}
html body :is(.field,.control){font-size:var(--oei-type-body)!important}
html body :is(.field,.control) label{display:block;font-size:var(--oei-type-label)!important;line-height:1.35!important;margin-bottom:var(--oei-space-02)!important}
html body :is(.field input,.field select,.field textarea,.control input,.control select,.control textarea){min-height:var(--oei-control-lg)!important;font-size:var(--oei-type-body)!important}
html body :is(.button,.go,.build,.action,.filters button,.tools button){min-height:var(--oei-control-lg)!important;padding:0 var(--oei-space-05)!important;font-size:var(--oei-type-label)!important}
html body :is(.row,.item,.park,.route,.task){font-size:var(--oei-type-body)!important}
html body :is(.row,.item,.park,.route,.task) strong{font-size:var(--oei-type-body-lg)!important;line-height:1.3!important}
html body :is(.footer,footer){min-height:4rem!important;padding:var(--oei-space-05) var(--oei-page-pad)!important;font-size:var(--oei-type-label)!important;line-height:1.45!important;align-items:center}
html body :focus-visible{outline:3px solid var(--oei-red)!important;outline-offset:3px!important}
html body ::selection{background:var(--oei-red);color:var(--oei-paper)}
html body header nav{flex-wrap:nowrap}
html body main{max-width:var(--oei-content-max);margin-inline:auto}
@media(min-width:100rem){html body main{border-inline:1px solid var(--oei-line)}}
@media(max-width:900px){
  html body :is(.hero-copy,.copy,.section,.workspace,.results,.journey){padding:var(--oei-space-08) var(--oei-page-pad)!important}
  html body :is(.section-head,.head,.workspace-head,.journey-head){display:block!important}
  html body :is(.section-head,.head,.workspace-head,.journey-head)>*+*{margin-top:var(--oei-space-05)!important}
}
@media(max-width:650px){
  :root{--oei-type-heading-lg:clamp(2.25rem,10vw,3rem);--oei-page-pad:1rem}
  html body h1{line-height:1.02!important;letter-spacing:-.025em!important;margin-block:var(--oei-space-05)!important}
  html body h2{font-size:clamp(1.75rem,8vw,2.25rem)!important}
  html body p,html body li{font-size:.9375rem!important}
  html body :is(.hero-copy,.copy,.section,.workspace,.results,.journey){padding-block:var(--oei-space-07)!important}
  html body :is(.metric,.summary>div){min-height:6.5rem!important;padding:var(--oei-space-05)!important}
  html body :is(.top,header.top){max-width:100vw;gap:var(--oei-space-03)!important}
  html body main,html body section{min-width:0}
}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto!important}html body *,html body *:before,html body *:after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}
/* Ledger layer (2026-10): Plex Mono labels, Arabic composition, one navigation bar,
   focus, ruled states, tables and landing ledger rhythm. Follows DESIGN.md. */
@font-face{font-family:"IBM Plex Mono";src:url("/assets/fonts/ibm-plex-mono-latin-400-normal.woff2") format("woff2");font-weight:400;font-display:swap}
@font-face{font-family:"IBM Plex Mono";src:url("/assets/fonts/ibm-plex-mono-latin-500-normal.woff2") format("woff2");font-weight:500 700;font-display:swap}
:root{
  --l-forest:#173d2d;--l-ivory:#f1eddf;--l-paper:#e8e1ce;--l-ink:#13251d;
  --l-red:#c34032;--l-red-ink:#a3301f;--l-green:#087443;--l-gold:#bf9a55;
  --l-muted:#52615a;            /* muted-ink darkened for AA on ivory (≈5.9:1) */
  --l-rule:rgba(19,37,29,.24);
  --l-mono:"IBM Plex Mono","Dubai",ui-monospace,monospace;
  --l-sans:"Dubai",Arial,sans-serif;
}
::selection{background:var(--l-forest);color:var(--l-ivory)}
html{scroll-padding-top:5rem}
html body{font-variant-numeric:lining-nums}

/* ── Labels & machine identifiers: IBM Plex Mono (Latin), Dubai fallback ── */
html body :is(.eye,.eyebrow,.micro,.label,.kicker,.kind,.mono,.tag,.meta,.step-no,.phase,.delivery,.badge,.tool-kind,.section-label,.atlas-key,.visual-label,.filter,.kind-flag,.status,.product-index,.product-evidence span,.product-main small,.product-evidence small,.product-action,.connector small,.connector strong,.source small,code,pre,kbd,samp,th){font-family:var(--l-mono)!important}
html body :is(.eye,.eyebrow,.micro,.label,.kicker,.section-label,.product-main small,.product-evidence small,.connector small){font-weight:500!important;letter-spacing:.08em!important;text-transform:uppercase}
/* the smallest labels were 8–9px; lift to a readable floor */
html body :is(.tag,.status,.product-evidence span,.product-action,.connector small,.product-main small,.product-evidence small){font-size:max(.6875rem,11px)!important;line-height:1.5!important}
html body :is(strong,b,td,.metric,.summary>div){font-variant-numeric:tabular-nums lining-nums}

/* ── Arabic composition: never letter-space Arabic, give it vertical room ── */
html[dir=rtl] body,html[dir=rtl] body *{letter-spacing:0!important}
html[dir=rtl] body :is(.eye,.eyebrow,.micro,.label,.kicker,.kind,.tag,.meta,.badge,.section-label,.filter,.status,.product-main small,.product-evidence small,.connector small,th){font-family:var(--l-sans)!important;text-transform:none!important;font-size:max(.75rem,12px)!important}
html[dir=rtl] body :is(p,li,.lede){line-height:1.85!important}
html[dir=rtl] body :is(h1,h2,h3){line-height:1.2!important}
html[dir=rtl] body h1{line-height:1.15!important}
html[dir=rtl] body :is(input,select,textarea){text-align:start}
html[dir=rtl] body :is(code,pre,.mono,[class*=json],[id*=json]){direction:ltr;unicode-bidi:isolate}

/* ── Navigation: one sticky ledger bar on every page ── */
html body header.top{position:sticky!important;top:0;z-index:40;gap:1.25rem!important;background:color-mix(in srgb,var(--l-ivory) 94%,transparent)!important;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);border-bottom:1px solid var(--l-ink)!important}
html body header.top>a:first-child,html body header.top .brand{min-width:0;flex:0 1 auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:flex;align-items:center;gap:.625rem;font-weight:700!important;text-decoration:none!important;color:var(--l-ink)}
html body header.top :is(nav,.nav){min-width:0;flex:0 1 auto;overflow-x:auto;overscroll-behavior-x:contain;scrollbar-width:none;gap:1.25rem!important}
html body header.top :is(nav,.nav)::-webkit-scrollbar{display:none}
html body header.top :is(nav,.nav) a{font-family:var(--l-mono)!important;font-size:.75rem!important;font-weight:500!important;letter-spacing:.06em!important;text-transform:uppercase;text-decoration:none!important;color:var(--l-ink)!important;display:inline-flex;align-items:center;min-height:2.5rem;background:linear-gradient(var(--l-red),var(--l-red)) no-repeat 0 100%/0 1px;transition:background-size .2s}
html[dir=rtl] body header.top :is(nav,.nav) a{font-family:var(--l-sans)!important;text-transform:none;font-size:.875rem!important;background-position:100% 100%}
html body header.top :is(nav,.nav) a:hover{background-size:100% 1px}
html body header.top #lang{flex:none;min-height:2.25rem!important;padding:0 .875rem!important;border:1px solid var(--l-ink)!important;background:transparent!important;color:var(--l-ink)!important;cursor:pointer}
html body header.top #lang:hover{background:var(--l-ink)!important;color:var(--l-ivory)!important}
@media (max-width:720px){
  html body header.top{height:auto!important;min-height:3.5rem!important;padding-block:.5rem!important}
  html body header.top :is(nav,.nav){gap:.875rem!important;mask-image:linear-gradient(to var(--l-fade,right),#000 85%,transparent)}
  html[dir=rtl] body header.top :is(nav,.nav){--l-fade:left}
}

/* ── Focus: signal-red outline, no glow; inputs get a strong ink ring ── */
html body :is(a,button,summary,[tabindex]):focus-visible{outline:2px solid var(--l-red)!important;outline-offset:3px!important;box-shadow:none!important}
html body :is(input,select,textarea):focus-visible{outline:2px solid var(--l-ink)!important;outline-offset:0!important;box-shadow:none!important}
html body :is(.dark,.forest,[class*=dark]) :is(a,button):focus-visible{outline-color:var(--l-gold)!important}

/* ── Controls: centred labels, honest disabled state ── */
html body a:is(.button,.action,.go,.btn,.cta){display:inline-flex!important;align-items:center;justify-content:center;gap:.5rem;text-align:center}
html body :is(button,.button,.action,.go,.build){transition:background-color .15s,color .15s,transform .15s}
html body :is(button,.button,.action,.go,.build):not(:disabled):hover{transform:translateY(-1px)}
html body :is(button,input,select,textarea):disabled{opacity:.6;cursor:not-allowed}
html body :is(input,select,textarea)::placeholder{color:#6d7a72;opacity:1}
@media (max-width:720px){html body .actions{display:grid!important;grid-template-columns:1fr 1fr;gap:.5rem!important}html body .actions>*{width:100%;min-width:0}}

/* ── Loading / empty / error states: ruled evidence slips ── */
html body :is(.state,.empty,.loading){font-family:var(--l-mono)!important;font-size:.8125rem!important;line-height:1.6!important;letter-spacing:.02em!important;color:var(--l-muted);text-align:start!important;padding:1.25rem 1.5rem!important;border:1px solid var(--l-rule);background:repeating-linear-gradient(135deg,transparent 0 10px,rgba(19,37,29,.035) 10px 11px);overflow-wrap:anywhere;max-width:100%}
html[dir=rtl] body :is(.state,.empty,.loading){font-family:var(--l-sans)!important;font-size:.9375rem!important}
html body :is(.state,.empty)[role=alert],html body [role=alert]:is(.state,.empty,div,p){color:var(--l-red-ink);border-color:currentColor}

/* ── Tables: ruled, mono headers, tabular figures, scroll on narrow screens ── */
html body table{border-collapse:collapse;width:100%;font-variant-numeric:tabular-nums}
html body th{font-size:.6875rem!important;font-weight:600!important;letter-spacing:.07em!important;text-transform:uppercase;text-align:start;padding:.75rem .875rem;border-bottom:1px solid var(--l-ink);vertical-align:bottom}
html body td{padding:.75rem .875rem;border-bottom:1px solid var(--l-rule);vertical-align:top}
html body tbody tr:hover td{background:rgba(232,225,206,.6)}
@media (max-width:720px){html body table{display:block;overflow-x:auto;-webkit-overflow-scrolling:touch}}

/* ── Landing ledger rows: tighter rhythm, readable limitations ── */
html body .product-row{min-height:0!important}
html body .product-row:first-child{min-height:0!important}
html body :is(.product-index,.product-main,.product-evidence,.product-action){padding:1.25rem 1.5rem!important}
html body .product-main small,html body .product-evidence small{margin-bottom:.875rem!important}
html body .product-evidence p{color:var(--l-muted)!important;max-width:62ch}
html body .product-row:hover .product-evidence p{color:#c9d3cc!important}
html body .product-evidence span{color:var(--l-red-ink)!important;display:block;max-width:70ch}
html body .product-row:hover .product-evidence span{color:#f0b9ae!important}
/* catalogue: the access-format cell inherited the connector card (180px box) */
html body .source{padding-block:.875rem!important;align-items:center!important}
html body .source .tag.connector{min-height:0!important;padding:0!important;border:0!important;background:none!important;color:var(--l-muted)}
html body .source .status{font-weight:600!important}
html body .source .status.metadata_only,html body .source .status.key_required{color:#7a5d22}
html body .source-title{font-size:1rem}

/* motion: content never stays hidden for print or reduced motion */
@media print{.reveal{opacity:1!important;transform:none!important}header.top{position:static!important}}
@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important;scroll-behavior:auto!important}.reveal{opacity:1!important;transform:none!important}}

/* ── Landing: lift micro labels (8–9px) to a readable floor ── */
html body .ticker{font-size:.6875rem!important}
html body :is(.proof-intro span,.stat span){font-size:.6875rem!important}
html body .coordinates{font-size:.625rem!important}
html body .product-evidence span{font-family:var(--l-sans)!important;font-size:.8125rem!important;line-height:1.55!important}
html[dir=rtl] body :is(.ticker,.ticker span,.proof-intro span,.stat span,.coordinates,small,.product-action,.meta span,.hero-data .meta span){font-family:var(--l-sans)!important;font-size:max(.8125rem,13px)!important;text-transform:none!important}
html[dir=rtl] body .product-evidence span{font-size:.875rem!important}

html body header.top .brand>:is(.mark,.brand-mark,img,svg){flex:none}
html body header.top .brand>span:last-child{min-width:0;overflow:hidden;text-overflow:ellipsis}
@media (max-width:720px){html body header.top :is(nav,.nav){max-width:62%}html body header.top .brand>span:last-child{font-size:.75rem}}
</style><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="alternate icon" href="/favicon.ico"><script data-oei-runtime>(function(){
var AR={"OPEN EMIRATES":"الإمارات المفتوحة","OPEN EMIRATES INTELLIGENCE":"ذكاء الإمارات المفتوح","AVIATION":"الطيران","AJMAN BUSINESS":"أعمال عجمان","AJMAN PARKS":"حدائق عجمان","AJMAN URBAN":"عجمان العمرانية","BUSINESS":"الأعمال","BUSINESS SETUP":"تأسيس الأعمال","GOLDEN RESIDENCY":"الإقامة الذهبية","CONNECTIVITY":"الاتصال","EDUCATION":"التعليم","MOHRE LEDGER":"سجل الموارد البشرية","EVIDENCE STUDIO":"استوديو الأدلة","PRODUCT REGISTRY":"سجل المنتجات","FOUNDER PATHWAY":"مسار المؤسس","SETUP":"التأسيس","SUPPORT":"الدعم","RESIDENCY":"الإقامة","HEALTH FACILITIES MAP":"خريطة المنشآت الصحية","AGGREGATE ATLAS":"الأطلس الإجمالي","HEALTH LEDGER":"سجل الصحة","INDUSTRY ATLAS":"أطلس الصناعة","INDUSTRY":"الصناعة","OBSERVATORY":"المرصد","REFRESH DATA":"تحديث البيانات","REFRESH REPORT":"تحديث التقرير","SOURCES":"المصادر","INCIDENTS":"الحوادث","REPORT":"التقرير","PLACE NAMES":"أسماء الأماكن","POLICY EVIDENCE WATCH":"مراقبة أدلة السياسات","STARTUPS":"الشركات الناشئة","FTA ARCHIVE":"أرشيف الهيئة الاتحادية للضرائب","2025 ACTIVITY":"نشاط 2025","TAX SERVICE ACTIVITY":"نشاط الخدمات الضريبية","MCP CONSOLE":"وحدة MCP","HOME":"الرئيسية","OPENAPI":"عقد الواجهة","CONNECT":"اتصل","TOURISM PULSE":"نبض السياحة","TRADE RADAR":"رادار التجارة","OFFICIAL SOURCE":"المصدر الرسمي","REST":"REST","JSON":"JSON","OEI":"OEI","GCAA":"الهيئة العامة للطيران المدني","TDRA":"هيئة تنظيم الاتصالات","FTA":"الهيئة الاتحادية للضرائب"};
function isAr(){return (document.documentElement.lang||"").indexOf("ar")===0}
function tr(text){var t=text.trim();if(!t)return null;var arrow=/\\s*\\u2197$/.test(t),core=t.replace(/\\s*\\u2197$/,"");var parts=core.split(/\\s*\\/\\s*/).map(function(p){if(!p)return "";if(AR[p])return AR[p];var m=/^(.+) SOURCE$/.exec(p);return m&&AR[m[1]]?"مصدر "+AR[m[1]]:null});if(parts.some(function(p){return p===null}))return null;return parts.join(" / ").trim()+(arrow?" \\u2197":"")}
var originals=new WeakMap();
function localizeChrome(){var ar=isAr();document.querySelectorAll("header.top a,header.top button").forEach(function(el){if(el.id==="lang"||el.closest("[data-ar]")||el.querySelector("[data-ar]"))return;if(!el.hasAttribute("data-oei-bilingual"))el.setAttribute("data-oei-bilingual",/[\\u0600-\\u06ff]/.test(el.textContent)?"1":"0");if(el.getAttribute("data-oei-bilingual")==="1")return;var w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),n;while((n=w.nextNode())){if(!originals.has(n))originals.set(n,n.nodeValue);var o=originals.get(n),t=ar?tr(o):null;n.nodeValue=t?o.replace(o.trim(),t):o}})}
new MutationObserver(localizeChrome).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
document.addEventListener("DOMContentLoaded",localizeChrome);
function friendly(message){var host=(/https?:\\/\\/([^\\/\\s:?#]+)/.exec(message)||[])[1];if(!host)return null;var code=(/HTTP (\\d{3})/.exec(message)||[])[1],status=code?" (HTTP "+code+")":"";return isAr()?"المصدر الرسمي "+host+" لا يستجيب الآن"+status+". لا نعرض أرقامًا بديلة أو تقديرية؛ حاول لاحقًا.":"The official source "+host+" is not responding right now"+status+". Nothing is estimated in its place; try again later."}
function soften(response){if(response.ok||response.status<500||!/json/.test(response.headers.get("content-type")||""))return response;return response.clone().json().then(function(body){var m=body&&body.error&&body.error.message,f=typeof m==="string"?friendly(m):null;if(!f)return response;body.error.detail=m;body.error.message=f;return new Response(JSON.stringify(body),{status:response.status,statusText:response.statusText,headers:response.headers})}).catch(function(){return response})}
if(window.fetch){var nativeFetch=window.fetch;window.fetch=function(){return nativeFetch.apply(this,arguments).then(soften)}}
window.__oeiFriendlyUpstreamMessage=friendly;
})();</script>`;

export function applyPublicVisualSystem(html: string): string {
  if (html.includes("data-oei-visual-system")) return html;
  if (!html.includes("</head>") || !/<body(?:\s|>)/.test(html)) {
    throw new Error("Public visual system requires a complete HTML document");
  }
  return html
    .replace("</head>", `${VISUAL_SYSTEM}</head>`)
    .replace("<body", '<body data-oei-visual-system="2026" data-design-system="oei-product-v1"')
    .replaceAll("—", "-")
    .replaceAll("–", "-");
}
