// Static-edition runtime, injected first into every exported page.
// - Serves retained JSON snapshots for the GET requests a page makes on load.
// - Sends every other /api and /mcp call to the live instance (CORS required).
// - Rewrites root-absolute links so the site works under a subpath (/c/uae-mcp/).
(function(){
var LIVE=__LIVE__;var M=__MANIFEST__;
var nativeFetch=window.fetch.bind(window);
var script=document.currentScript;var BASE=script?script.src.replace(/_static\/shim\.js.*$/,''):location.origin+'/';var BASE_PATH=new URL(BASE).pathname;
for(var key in M){M[key]=BASE+M[key]}
function keyOf(u){return (u.pathname.replace(/\/$/,'')||'/')+u.search}
function isApi(p){return /^\/(api|mcp)(\/|$)/.test(p)}
function isAr(){return (document.documentElement.lang||'').indexOf('ar')===0}
function fix(h){if(!h||h[0]!=='/'||h[1]==='/'||h.indexOf(BASE_PATH)===0)return h;if(isApi(h))return LIVE+h;var p=h.slice(1),q='',i=p.search(/[?#]/);if(i>=0){q=p.slice(i);p=p.slice(0,i)}if(p&&!/\/$/.test(p)&&!/\.[a-z0-9]+$/i.test(p.split('/').pop()))p+='/';return BASE+p+q}
function unreachable(){var host=LIVE.replace(/^https?:\/\//,'');return new Response(JSON.stringify({ok:false,data:null,error:{code:'STATIC_SNAPSHOT',message:isAr()?'تعذّر الوصول إلى الواجهة الحية '+host+' من هذه النسخة الثابتة. تحقّق من الاتصال وحاول مجددًا.':'This static edition could not reach the live API at '+host+'. Check your connection and try again.'}}),{status:503,headers:{'content-type':'application/json'}})}
window.__UAEMCP_STATIC__={live:LIVE,base:BASE,snapshots:Object.keys(M).length};
window.fetch=function(input,init){
 var raw=typeof input==='string'?input:(input instanceof URL?input.href:input.url);var u;
 try{u=new URL(raw,location.href)}catch(e){return nativeFetch(input,init)}
 if(u.origin!==location.origin||!isApi(u.pathname))return nativeFetch(input,init);
 var isRequest=typeof input==='object'&&!(input instanceof URL);
 var method=((init&&init.method)||(isRequest&&input.method)||'GET').toUpperCase();var key=keyOf(u);
 if(method==='GET'&&M[key])return nativeFetch(M[key]);
 var liveInit=init;if(isRequest&&!init){liveInit={method:input.method,headers:input.headers}}
 return nativeFetch(LIVE+u.pathname+u.search,liveInit).catch(function(){var bare=u.pathname.replace(/\/$/,'');if(method==='GET'&&M[bare])return nativeFetch(M[bare]);return unreachable()})};
function sweep(root){(root&&root.querySelectorAll?root:document).querySelectorAll('a[href^="/"]').forEach(function(a){var h=a.getAttribute('href'),n=fix(h);if(n!==h)a.setAttribute('href',n)})}
document.addEventListener('click',function(ev){var a=ev.target&&ev.target.closest&&ev.target.closest('a[href]');if(a){var h=a.getAttribute('href'),n=fix(h);if(n!==h)a.setAttribute('href',n)}},true);
document.addEventListener('DOMContentLoaded',function(){sweep(document);new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType===1)sweep(n.parentNode||n)})})}).observe(document.body,{childList:true,subtree:true})});
})();
