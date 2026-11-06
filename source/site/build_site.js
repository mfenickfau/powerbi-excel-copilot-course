// Builds index.html (GitHub Pages landing page) from the course content files.
// Run from the repo root: node source/site/build_site.js
const fs = require("fs"), path = require("path");
const ROOT = path.resolve(__dirname, "../..");
const C = (f) => require(path.join(ROOT, "source/content", f));
const REPO = "https://github.com/mfenickfau/powerbi-excel-copilot-course";
const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const enc = (p) => p.split("/").map(encodeURIComponent).join("/");

const courses = [
  { key: "power-bi", file: "content.js", name: "AI in Power BI", short: "Power BI", length: "2 to 3 days", deck: "AI in Power BI Full Deck.pptx", book: "AI in Power BI Lab Book.docx",
    pitch: "Every AI feature in and around Power BI, from Copilot and data agents to the machine-learning visuals that need no licence at all.",
    outcome: "Report builders and analysts who can make Copilot accurate on their own models, and who know which AI tool fits which question." },
  { key: "excel", file: "excel_content.js", name: "AI in Excel", short: "Excel", length: "2 to 3 days", deck: "AI in Excel Full Deck.pptx", book: "AI in Excel Lab Book.docx",
    pitch: "An exhaustive tour of AI in Excel: Copilot modes and skills, agents, Python in Excel, AI functions, data preparation and outside assistants.",
    outcome: "Spreadsheet users who use AI for real analysis, check every change it makes, and keep data safe." },
  { key: "copilot", file: "copilot_content.js", name: "AI with Microsoft Copilot", short: "Copilot", length: "3 days", deck: "AI with Copilot Full Deck.pptx", book: "AI with Copilot Lab Book.docx",
    pitch: "Day 1 prompting. Day 2 Copilot across Outlook, Teams, Word, PowerPoint, Excel and SharePoint. Day 3 agents and rolling Copilot out in a business.",
    outcome: "People who prompt well, use Copilot across their working day, build and test their own agents, and can plan a rollout." },
].map((c) => { const m = C(c.file); const mins = m.SECTIONS.reduce((a, s) => a + s.concepts.reduce((x, k) => x + k.lab.minutes + (k.lab.partB ? k.lab.partB.minutes : 0), 0) + (s.challenge ? s.challenge.minutes : 0), 0); return { ...c, sections: m.SECTIONS, count: m.SECTIONS.reduce((a, s) => a + s.concepts.length, 0), hours: Math.round(mins / 60) }; });
const hours = courses.reduce((a, c) => a + c.hours, 0);
const total = courses.reduce((a, c) => a + c.count, 0);

const courseHtml = (c) => {
  const mods = c.sections.map((s, i) => {
    const nn = String(i + 1).padStart(2, "0"), dir = `${c.key}/${nn}-${slug(s.title)}`;
    const verify = s.concepts.filter((x) => x.qualify).length;
    return `<details class="mod">
  <summary><span class="num">${nn}</span><span class="mt">${esc(s.title)}</span><span class="cnt">${s.concepts.length} labs${s.challenge ? " + challenge" : ""}</span></summary>
  <div class="mbody">
    <p class="mblurb">${esc(s.blurb)}</p>
    <p class="outcome"><strong>You will be able to</strong> ${esc(s.done)}.</p>
    <ol class="topics">${s.concepts.map((x) => `<li><span class="tid">${esc(x.id)}</span><span class="tt">${esc(x.title)}${x.lab.partB ? ` <span class="pb">then ${esc(x.lab.partB.title.charAt(0).toLowerCase() + x.lab.partB.title.slice(1))}</span>` : ""}${x.qualify ? ' <span class="vb" title="Feature is new, renamed or rolling out; check before teaching">verify</span>' : ""}</span></li>`).join("")}</ol>
    ${s.challenge ? `<div class="chal"><p class="chk">Module challenge · ${s.challenge.minutes} min</p><p class="cht">${esc(s.challenge.title)}</p><p class="chs">${esc(s.challenge.scenario)}</p></div>` : ""}
    <p class="mlinks"><a href="${REPO}/tree/main/${enc(dir)}">Module files on GitHub</a>${verify ? ` · ${verify} topic${verify > 1 ? "s" : ""} marked verify before class` : ""}</p>
  </div>
</details>`;
  }).join("\n");
  return `<section class="course" id="${c.key}">
  <div class="chead">
    <div>
      <p class="kicker">${esc(c.length)} · ${c.sections.length} modules · ${c.count} topics · about ${c.hours} hours of lab material</p>
      <h2>${esc(c.name)}</h2>
      <p class="pitch">${esc(c.pitch)}</p>
      <p class="who"><strong>The outcome:</strong> ${esc(c.outcome)}</p>
    </div>
    <div class="dl">
      <a class="btn" href="${REPO}/raw/main/${enc(c.key + "/full-course/" + c.deck)}">Download deck (.pptx)</a>
      <a class="btn ghost" href="${REPO}/raw/main/${enc(c.key + "/full-course/" + c.book)}">Download lab book (.docx)</a>
      <a class="lnk" href="${REPO}/tree/main/${c.key}">Browse all files</a>
    </div>
  </div>
  <div class="mods">${mods}</div>
</section>`;
};

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AI for Business Training</title>
<meta name="description" content="My own version of three AI-focused courses for business users: AI in Power BI, AI in Excel and AI with Microsoft Copilot. ${total} topics and about ${hours} hours of hands-on labs.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{--bg:#f7f8fa;--surface:#fff;--ink:#0f1b2a;--muted:#55657a;--line:#e1e6ec;--accent:#0f7b4a;--accent-soft:#e3f4ea;--hero:#0b1a2b;--hero-ink:#eaf1f7;--hero-muted:#9fb1c3;--warn:#8a5a00;--warn-soft:#fff3d1}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#0d141c;--surface:#141e29;--ink:#e6edf3;--muted:#9aaabb;--line:#243241;--accent:#3ccf85;--accent-soft:#16301f;--hero:#07101a;--warn:#f2c35b;--warn-soft:#3a2c0b}}
:root[data-theme="dark"]{--bg:#0d141c;--surface:#141e29;--ink:#e6edf3;--muted:#9aaabb;--line:#243241;--accent:#3ccf85;--accent-soft:#16301f;--hero:#07101a;--warn:#f2c35b;--warn-soft:#3a2c0b}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.6 Inter,system-ui,-apple-system,"Segoe UI",sans-serif}
a{color:var(--accent)}
.wrap{max-width:1080px;margin:0 auto;padding:0 16px}
header.hero{background:var(--hero);color:var(--hero-ink);padding:72px 0 64px}
.hero .tag{display:inline-block;font-size:13px;font-weight:600;letter-spacing:.04em;color:var(--hero-ink);background:rgba(60,207,133,.16);border:1px solid rgba(60,207,133,.4);border-radius:999px;padding:4px 12px;margin:0 0 20px}
.hero .by{margin:0 0 10px;font-size:15px;font-weight:600;color:var(--hero-muted)}
.hero h1{font-size:clamp(32px,5vw,52px);line-height:1.1;margin:0 0 18px;letter-spacing:-.02em;max-width:16ch}
.hero p.lead{font-size:clamp(17px,2vw,20px);color:var(--hero-muted);max-width:60ch;margin:0 0 28px}
.hero nav{display:flex;flex-wrap:wrap;gap:10px}
.hero nav a{color:var(--hero-ink);text-decoration:none;border:1px solid #2c4258;border-radius:10px;padding:10px 16px;font-weight:500}
.hero nav a:hover{border-color:#3ccf85}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:40px;max-width:720px}
.stat b{display:block;font-size:30px;color:#3ccf85;line-height:1.1}.stat span{font-size:14px;color:var(--hero-muted)}
.note{background:var(--surface);border:1px solid var(--line);border-left:4px solid var(--accent);border-radius:12px;padding:20px 22px;margin:-28px auto 0;position:relative;max-width:1080px}
.note p{margin:0;color:var(--muted)}.note strong{color:var(--ink)}
section{padding:56px 0 0}
h2{font-size:clamp(26px,3.4vw,34px);margin:0 0 10px;letter-spacing:-.01em}
.sub{color:var(--muted);max-width:65ch;margin:0 0 28px}
.method{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.card{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:20px}
.card .n{display:inline-grid;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--accent-soft);color:var(--accent);font-weight:700;font-size:14px;margin-bottom:10px}
.card h3{margin:0 0 6px;font-size:17px}.card p{margin:0;color:var(--muted);font-size:15px}
.overview{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.overview a.card{text-decoration:none;color:inherit;transition:border-color .15s}.overview a.card:hover{border-color:var(--accent)}
.overview .meta{font-size:13px;font-weight:600;color:var(--accent);margin:0 0 6px}
.course{padding-top:64px}
.chead{display:grid;grid-template-columns:1fr auto;gap:24px;align-items:start;margin-bottom:22px}
.kicker{font-size:13px;font-weight:600;color:var(--accent);margin:0 0 6px;letter-spacing:.02em}
.pitch{margin:0 0 10px;max-width:62ch}.who{margin:0;color:var(--muted);max-width:62ch;font-size:15px}
.dl{display:flex;flex-direction:column;gap:8px;min-width:230px}
.btn{display:block;text-align:center;background:var(--accent);color:#fff;text-decoration:none;font-weight:600;font-size:15px;border-radius:10px;padding:10px 14px}
:root[data-theme="dark"] .btn{color:#06210f}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .btn{color:#06210f}}
.btn.ghost{background:transparent;color:var(--accent)!important;border:1px solid var(--accent)}
.lnk{text-align:center;font-size:14px}
.mods{display:grid;gap:8px}
details.mod{background:var(--surface);border:1px solid var(--line);border-radius:12px}
details.mod[open]{border-color:var(--accent)}
summary{list-style:none;cursor:pointer;display:flex;align-items:center;gap:14px;padding:14px 18px}
summary::-webkit-details-marker{display:none}
summary::after{content:"+";margin-left:auto;color:var(--muted);font-size:20px;line-height:1}
details[open] summary::after{content:"–"}
.num{font-variant-numeric:tabular-nums;font-weight:700;color:var(--accent);font-size:14px;min-width:22px}
.mt{font-weight:600}.cnt{font-size:13px;color:var(--muted);white-space:nowrap}
.mbody{padding:0 18px 18px 54px}
.mblurb{margin:0 0 8px;color:var(--muted)}
.outcome{margin:0 0 12px;background:var(--accent-soft);border-radius:8px;padding:10px 12px;font-size:15px}
.topics{margin:0;padding:0;list-style:none;columns:2;column-gap:28px}
.topics li{break-inside:avoid;padding:3px 0;font-size:15px;display:flex;gap:4px;align-items:baseline}.topics li .tt{flex:1}
.tid{display:inline-block;min-width:38px;font-variant-numeric:tabular-nums;color:var(--muted);font-size:13px;font-weight:600}
.vb{font-size:11px;font-weight:600;color:var(--warn);background:var(--warn-soft);border-radius:999px;padding:1px 7px;vertical-align:1px}
.pb{display:block;font-size:13px;color:var(--muted)}
.chal{margin:14px 0 0;border:1px dashed var(--accent);border-radius:10px;padding:12px 14px}
.chk{margin:0;font-size:12px;font-weight:700;color:var(--accent);letter-spacing:.03em;text-transform:uppercase}
.cht{margin:2px 0 4px;font-weight:600}
.chs{margin:0;font-size:14px;color:var(--muted)}
.mlinks{margin:12px 0 0;font-size:14px;color:var(--muted)}
.data{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
footer{margin-top:72px;border-top:1px solid var(--line);padding:28px 0 48px;color:var(--muted);font-size:14px}
footer p{margin:0 0 8px;max-width:80ch}
.theme{position:absolute;top:16px;right:16px;background:transparent;color:var(--hero-muted);border:1px solid #2c4258;border-radius:8px;padding:6px 10px;font:inherit;font-size:13px;cursor:pointer}
header{position:relative}
@media (max-width:820px){.method,.overview,.data{grid-template-columns:1fr 1fr}.chead{grid-template-columns:1fr}.dl{min-width:0}.topics{columns:1}.stats{grid-template-columns:1fr 1fr}}
@media (max-width:520px){.method,.overview,.data{grid-template-columns:1fr}.mbody{padding-left:18px}.hero{padding:56px 0 52px}}
</style>
</head>
<body>
<header class="hero">
  <button class="theme" id="theme" type="button" aria-label="Toggle colour theme">Theme</button>
  <div class="wrap">
    <p class="tag">My version · AI for business users</p>
    <p class="by">Built by M. Fenick</p>
    <h1>AI in Power BI, Excel and Microsoft Copilot</h1>
    <p class="lead">Three hands-on courses that teach business people to use the AI already inside the Microsoft tools they work in every day. Every feature gets an explanation, a live demo and a two-part lab, and every module ends with a scenario challenge.</p>
    <nav><a href="#power-bi">AI in Power BI</a><a href="#excel">AI in Excel</a><a href="#copilot">AI with Copilot</a><a href="${REPO}">All materials on GitHub</a></nav>
    <div class="stats">
      <div class="stat"><b>3</b><span>courses</span></div>
      <div class="stat"><b>${courses.reduce((a, c) => a + c.sections.length, 0)}</b><span>modules</span></div>
      <div class="stat"><b>${total}</b><span>topics, each with a two-part lab</span></div>
      <div class="stat"><b>${hours}+</b><span>hours of lab material</span></div>
    </div>
  </div>
</header>

<div class="wrap"><div class="note"><p><strong>This is just my version.</strong> These are my own takes on three sets of learning outcomes for AI-focused training: Power BI, Excel and Copilot. I designed the course structure, wrote the slides, demos and labs, and built the practice data. It is independent work, not official material from Microsoft or any training provider.</p></div></div>

<main class="wrap">
<section>
  <h2>How every topic is taught</h2>
  <p class="sub">The same pattern runs through all ${total} topics, so learners always know what comes next and instructors can drop any topic in or out. Most of the time is spent doing, not watching. There is more lab material than any one delivery needs: instructors run Part A in class and choose Part B labs and challenges to fit the time and licences, and the rest is follow-up practice.</p>
  <div class="method">
    <div class="card"><span class="n">1</span><h3>Explain</h3><p>One slide: what the feature is, how it works and why it exists.</p></div>
    <div class="card"><span class="n">2</span><h3>Demo</h3><p>A step-by-step demo script in the speaker notes, run live on the practice data.</p></div>
    <div class="card"><span class="n">3</span><h3>Lab, Part A and B</h3><p>Part A is the core lab. Part B takes the same skill further on a harder, more realistic task.</p></div>
    <div class="card"><span class="n">4</span><h3>Challenge</h3><p>Each module ends with a business scenario that combines its topics. Every lab ends with a check: AI drafts, people verify.</p></div>
  </div>
</section>

<section>
  <h2>The three courses</h2>
  <p class="sub">Each course stands alone. Together they cover where business users meet AI in Microsoft 365.</p>
  <div class="overview">
${courses.map((c) => `    <a class="card" href="#${c.key}"><p class="meta">${esc(c.length)} · ${c.count} labs</p><h3>${esc(c.name)}</h3><p>${esc(c.pitch)}</p></a>`).join("\n")}
  </div>
</section>

${courses.map(courseHtml).join("\n")}

<section>
  <h2>Practice data with answers planted in it</h2>
  <p class="sub">All labs use Brightline Outdoor Co., a fictional outdoor-gear retailer. The data is synthetic and built so the AI has something real to find, and learners can check whether it did.</p>
  <div class="data">
    <div class="card"><h3>Sales and returns</h3><p>Apparel, footwear, online orders and deep discounts drive returns. A store closes for a month; an outage and Black Friday show up as anomalies.</p></div>
    <div class="card"><h3>Documents and email</h3><p>A flawed report with three planted errors, a meeting transcript, email threads with a buried ask, and two contract versions that differ in six places.</p></div>
    <div class="card"><h3>Safety traps</h3><p>An untrusted workbook and an email with hidden instructions aimed at AI, for practising prompt-injection awareness.</p></div>
  </div>
</section>
</main>

<footer><div class="wrap">
  <p>Feature status was researched in November 2026. Topics marked <span class="vb">verify</span> describe features that were new, renamed, in preview or rolling out, and should be checked before teaching.</p>
  <p>Microsoft, Power BI, Excel, Copilot and related names are trademarks of Microsoft. Brightline Outdoor Co., its people and its data are fictional.</p>
  <p><a href="${REPO}">Source and materials on GitHub</a></p>
</div></footer>
<script>
(function(){var r=document.documentElement,b=document.getElementById("theme");
try{var s=localStorage.getItem("theme");if(s)r.setAttribute("data-theme",s)}catch(e){}
b.addEventListener("click",function(){var d=r.getAttribute("data-theme")||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");var n=d==="dark"?"light":"dark";r.setAttribute("data-theme",n);try{localStorage.setItem("theme",n)}catch(e){}});
if(location.hash){var t=document.querySelector(location.hash);if(t&&t.tagName==="DETAILS")t.open=true}})();
</script>
</body>
</html>
`;
fs.writeFileSync(path.join(ROOT, "index.html"), html);
console.log("wrote index.html", html.length, "bytes");
