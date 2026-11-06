// Write one HTML file per module (plus a Start Here file) for upload to Google Docs.
// Run: node build_labbook_html.js <content.js> <outdir> <prefix>
const fs = require("fs"), path = require("path");
const [, , contentPath, outDir, prefix] = process.argv;
const { COURSE, SETUP_LAB, SECTIONS } = require(path.resolve(contentPath));
fs.mkdirSync(outDir, { recursive: true });
const NOUN = COURSE.noun || "section", NOUNC = NOUN[0].toUpperCase() + NOUN.slice(1);
const e = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const table = (rows) => `<table border="1" cellpadding="5">${rows.map((r, i) => `<tr>${r.map((c) => i === 0 ? `<th>${e(c)}</th>` : `<td>${e(c)}</td>`).join("")}</tr>`).join("")}</table>`;
const pre = (code) => `<pre>${e(code)}</pre>`;
const ol = (items) => `<ol>${items.map((t) => `<li>${e(t)}</li>`).join("")}</ol>`;
const ul = (items) => `<ul>${items.map((t) => `<li>${e(t)}</li>`).join("")}</ul>`;

function lab(id, title, meta, what, l, deep, setupBlocks) {
  let h = `<h2>Lab ${e(id)}: ${e(title)}</h2>`;
  h += table([["Item", "Detail"], ["Time", `About ${l.minutes} minutes`], ...(meta.status ? [["Feature status", meta.status]] : []), ["You need", meta.requires]]);
  if (meta.qualify) h += `<p><b>Verify before class:</b> ${e(meta.qualify)}</p>`;
  if (what) h += `<h3>What this feature is</h3><p>${e(what)}</p>`;
  h += `<h3>Objective</h3><p>${e(l.objective)}</p><h3>Steps</h3>${ol(l.steps)}`;
  (setupBlocks || []).forEach(([t, c]) => { h += `<h3>${e(t)}</h3>${pre(c)}`; });
  if (deep && deep.kind === "prompts") { h += `<h3>${e(deep.title)}</h3>`; deep.items.forEach((p) => { h += pre(p); }); }
  if (deep && deep.kind === "code") { h += `<h3>${e(deep.title)}</h3>${pre(deep.code)}`; if (deep.caption) h += `<p><i>${e(deep.caption)}</i></p>`; }
  if (l.extra) { h += `<h3>${e(l.extra.title)}</h3>`; l.extra.items.forEach((p) => { h += pre(p); }); }
  h += `<h3>Check your work</h3><p>${e(l.check)}</p><h3>If this feature is not available</h3><p>${e(l.fallback)}</p>`;
  return h;
}
const wrap = (title, body) => `<html><body><h1>${e(title)}</h1>${body}</body></html>`;

// ---- Start Here
const lb = COURSE.lb;
let s = `<p>${e(COURSE.subtitle)}. One lab for each of the ${SECTIONS.reduce((n, x) => n + x.concepts.length, 0)} features, numbered to match the slides, plus a setup lab. This document holds the introduction, the setup lab and the appendices; each ${NOUN} has its own document in this folder.</p>`;
s += `<p>${e(lb.dataLine)}</p><h2>How to use this lab book</h2>${lb.intro.map((t) => `<p>${e(t)}</p>`).join("")}`;
s += `<h3>What each ${NOUN} needs</h3>${table([["You have", "You can do"], ...COURSE.needs.map((r) => [r[0], r[1]])])}`;
s += `<h3>${e(lb.dataHeading)}</h3>${ul(lb.dataNotes)}`;
const list = [["Lab", "Feature", "Minutes"], ["0", SETUP_LAB.title, String(SETUP_LAB.minutes)]];
SECTIONS.forEach((x) => x.concepts.forEach((c) => list.push([c.id, c.title, String(c.lab.minutes)])));
s += `<h2>Lab list</h2>${table(list)}`;
s += lab("0", SETUP_LAB.title, { requires: SETUP_LAB.requires }, null, SETUP_LAB, null, SETUP_LAB.codeBlocks || [["Date table formula", SETUP_LAB.code[0]], ["The five measures", SETUP_LAB.code[1]]]);
lb.appendices.forEach((a) => { s += `<h2>${e(a.title)}</h2>${(a.intro || []).map((t) => `<p>${e(t)}</p>`).join("")}${a.bullets ? ul(a.bullets) : ""}${a.table ? table(a.table) : ""}`; });
const files = [];
const f0 = path.join(outDir, `${prefix} 00 Start Here.html`);
fs.writeFileSync(f0, wrap(`${COURSE.title} Lab Book: Start Here`, s)); files.push(f0);

SECTIONS.forEach((sec, si) => {
  let h = `<p>${e(sec.blurb)}</p>`;
  sec.concepts.forEach((c) => { h += lab(c.id, c.title, { status: c.status, requires: c.requires, qualify: c.qualify }, c.what, c.lab, c.deep, null); });
  const f = path.join(outDir, `${prefix} ${String(si + 1).padStart(2, "0")} ${sec.title.replace(/[^A-Za-z0-9 ,]/g, "")}.html`);
  fs.writeFileSync(f, wrap(`${COURSE.title} Lab Book, ${NOUNC} ${si + 1}: ${sec.title}`, h)); files.push(f);
});
files.forEach((f) => console.log(fs.statSync(f).size, path.basename(f)));
