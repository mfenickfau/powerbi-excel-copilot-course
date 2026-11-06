// AI in Power BI - deck builder. Reads content.js. Run: NODE_PATH=$PWD/node_modules node build_ai_deck.js
const pptxgen = require("pptxgenjs");
const { applyTheme } = require("/root/.claude/skills/synced/a98595f1-c90c-440f-9928-ecd96c58fff9_a04e3ec2-6740-4f6c-8a2a-437b6ce63474/pptx/scripts/apply_theme.js");
const { icon } = require("./icons.js");
const CONTENT_PATH = process.argv[2] || "./content.js";
const { COURSE, SETUP_LAB, SECTIONS } = require(require("path").resolve(CONTENT_PATH));

const THEME = {
  name: (process.env.BRAND || "DataCamp Business AI Literacy"), headFontFace: "Calibri", bodyFontFace: "Calibri",
  colors: { dk1: "05192D", lt1: "FFFFFF", dk2: "3D4E5E", lt2: "F2F5F8", accent1: "03EF62", accent2: "0B5FFF", accent3: "FFB000", accent4: "7B61FF", accent5: "16A34A", accent6: "E5E9EF", hlink: "0B5FFF", folHlink: "7B61FF" },
};
const H = THEME.colors;
const OUT = process.argv[3] || "AI_in_Power_BI.pptx";
const ONLY = process.env.ONLY ? new Set(process.env.ONLY.split(",")) : null;
const inc = (k) => !ONLY || ONLY.has(k);
const NOUN = COURSE.noun || "section";
const NOUNC = NOUN[0].toUpperCase() + NOUN.slice(1);

function statusStyle(status) {
  const s = status.toLowerCase();
  if (s.startsWith("retiring")) return { fill: "FDE2E1", text: "B42318" };
  if (s.startsWith("legacy") || s.startsWith("older") || s.startsWith("reference")) return { fill: "E5E9EF", text: "3D4E5E" };
  if (s.startsWith("preview") || s.startsWith("check") || s.startsWith("insider") || s.startsWith("frontier") || s.startsWith("conflict") || s.startsWith("unconfirmed") || s.startsWith("experimental") || s.startsWith("reported")) return { fill: "FFF1CC", text: "8A5A00" };
  if (s.startsWith("practice") || s.startsWith("applies") || s.startsWith("always") || s.startsWith("concept")) return { fill: "E6EEFF", text: "0B3FB3" };
  return { fill: "D9FBE6", text: "0E7A35" };
}

(async () => {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  pres.author = (process.env.BRAND || "DataCamp Business AI Literacy");
  pres.title = `${COURSE.title}: ${COURSE.subtitle}`;
  const C = pres.SchemeColor;

  // icons
  const need = new Set(["FiInfo", "FiList", "FiStar", "FiCheckCircle", "FiClock", "FiMonitor", "FiDatabase", "FiZap", "FiShield", "FiLayers", "FiAlertTriangle", "FiPlayCircle", "FiFlag", "FiBookOpen", "FiTarget"]);
  SECTIONS.forEach((s) => { need.add(s.icon); s.concepts.forEach((c) => need.add(c.icon)); });
  (COURSE.needs || []).forEach((r) => need.add(r[2])); (COURSE.dataItems || []).forEach((r) => need.add(r[0])); (COURSE.rollout || []).forEach((r) => need.add(r[0])); (COURSE.rules || []).forEach((r) => need.add(r[0]));
  ["FiSettings", "FiClipboard", "FiActivity", "FiUsers", "FiFileText", "FiEye", "FiAlertCircle"].forEach((n) => need.add(n));
  const ic = {};
  for (const n of need) ic[n] = await icon(n, H.accent1, 128);
  const icWarn = await icon("FiAlertTriangle", "8A5A00", 128);

  // layouts
  const footer = (dark) => [
    { text: { text: (process.env.WORDMARK || "DataCamp"), options: { x: 0.5, y: 5.2, w: 1.4, h: 0.3, fontSize: 12, bold: true, color: dark ? C.accent1 : C.text1, margin: 0, isTextBox: true } } },
    { text: { text: `${COURSE.label}  |  ${COURSE.footer || "Power BI for Business"}`, options: { x: 1.9, y: 5.2, w: 6.2, h: 0.3, fontSize: 9, color: dark ? "A8B5C2" : "6B7A89", margin: 0, isTextBox: true } } },
  ];
  const num = (dark) => ({ x: 9.0, y: 5.2, w: 0.6, h: 0.3, fontSize: 9, color: dark ? "A8B5C2" : "6B7A89", align: "right" });
  pres.defineSlideMaster({ title: "TITLE", background: { color: H.dk1 }, slideNumber: num(true), objects: [...footer(true),
    { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 1.5, w: 8.8, h: 1.4, fontSize: 40, bold: true, color: C.background1, margin: 0, valign: "bottom" }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", x: 0.6, y: 3.0, w: 8.8, h: 1.3, fontSize: 18, color: "A8B5C2", margin: 0, valign: "top" }, text: "" } }] });
  pres.defineSlideMaster({ title: "DIVIDER", background: { color: H.dk1 }, slideNumber: num(true), objects: [...footer(true),
    { placeholder: { options: { name: "kicker", type: "body", x: 0.6, y: 1.6, w: 5.8, h: 0.4, fontSize: 14, bold: true, color: C.accent1, margin: 0, charSpacing: 2 }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 2.0, w: 5.8, h: 1.3, fontSize: 34, bold: true, color: C.background1, margin: 0, valign: "top" }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", x: 0.6, y: 3.4, w: 5.8, h: 1.2, fontSize: 15, color: "A8B5C2", margin: 0, valign: "top" }, text: "" } }] });
  pres.defineSlideMaster({ title: "CONTENT", background: { color: H.lt1 }, slideNumber: num(false), objects: [...footer(false),
    { placeholder: { options: { name: "title", type: "title", x: 0.5, y: 0.45, w: 9.0, h: 0.65, fontSize: 26, bold: true, color: C.text1, margin: 0, valign: "middle" }, text: "" } }] });

  // helpers
  let section = "Welcome";
  const slide = (m) => pres.addSlide({ masterName: m, sectionTitle: section });
  const T = (s, t) => s.addText(t, { placeholder: "title" });
  const circleIcon = (s, data, x, y, d = 0.5) => {
    s.addShape(pres.ShapeType.ellipse, { x, y, w: d, h: d, fill: { color: C.text1 }, line: { color: C.text1, width: 0 } });
    s.addImage({ data, x: x + d * 0.22, y: y + d * 0.22, w: d * 0.56, h: d * 0.56 });
  };
  const panel = (s, x, y, w, h, fill = C.background2) => s.addShape(pres.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.1, fill: { color: fill }, line: { color: H.accent6, width: 0.75 } });
  const pill = (s, x, y, w, text, fill, color) => {
    s.addShape(pres.ShapeType.roundRect, { x, y, w, h: 0.28, rectRadius: 0.14, fill: { color: fill }, line: { color: fill, width: 0 } });
    s.addText(text, { x, y, w, h: 0.28, fontSize: 9.5, bold: true, color, align: "center", valign: "middle", margin: 0, isTextBox: true });
  };
  const pillW = (t) => Math.min(6.2, 0.35 + t.length * 0.068);
  const notes = (s, t) => s.addNotes(t);
  const body = (s, text, o) => s.addText(text, Object.assign({ fontSize: 12, color: C.text2, margin: 0, isTextBox: true, valign: "top" }, o));
  const bulletList = (s, arr, o, numbered) => s.addText(arr.map((t, i) => ({ text: t, options: { bullet: numbered ? { type: "number" } : true, breakLine: i < arr.length - 1 } })), Object.assign({ fontSize: 11.5, color: C.text2, margin: 0, isTextBox: true, valign: "top", paraSpaceAfter: 4 }, o));
  const codeBox = (s, code, x, y, w, h, fs = 10) => {
    s.addShape(pres.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.1, fill: { color: C.text1 }, line: { color: C.text1, width: 0 } });
    s.addText(code, { x: x + 0.18, y: y + 0.12, w: w - 0.36, h: h - 0.24, fontFace: "Courier New", fontSize: fs, color: C.accent1, margin: 0, isTextBox: true, valign: "top" });
  };

  if (!inc("intro") && process.env.DAY_TITLE) {
    pres.addSection({ title: section });
    const s = slide("TITLE");
    T(s, COURSE.title);
    s.addText([{ text: process.env.DAY_TITLE, options: { breakLine: true } }, { text: COURSE.subtitle, options: {} }], { placeholder: "body" });
    s.addShape(pres.ShapeType.rect, { x: 0.6, y: 1.25, w: 0.9, h: 0.08, fill: { color: C.accent1 }, line: { color: C.accent1, width: 0 } });
    notes(s, process.env.DAY_NOTES || COURSE.welcomeNotes);
  }
  if (inc("intro")) {
  // ======================= WELCOME =======================
  pres.addSection({ title: section });
  {
    const s = slide("TITLE");
    T(s, COURSE.title);
    s.addText([{ text: COURSE.subtitle, options: { breakLine: true } }, { text: COURSE.tagline, options: {} }], { placeholder: "body" });
    s.addShape(pres.ShapeType.rect, { x: 0.6, y: 1.25, w: 0.9, h: 0.08, fill: { color: C.accent1 }, line: { color: C.accent1, width: 0 } });
    if (!process.env.BRAND) s.addText("Swap the text wordmark in the footer for the official DataCamp logo before client delivery.", { x: 0.6, y: 4.55, w: 8.8, h: 0.3, fontSize: 9, italic: true, color: "6B7A89", margin: 0, isTextBox: true });
    notes(s, COURSE.welcomeNotes);
  }
  {
    const s = slide("CONTENT");
    T(s, "How every feature is taught");
    const steps = [["FiInfo", "Explain", "One slide: what it is, how it works, why it exists. Some features get a detail slide with prompts, code or a comparison."], ["FiPlayCircle", "Demo", "The instructor shows it live on the Brightline data. The demo script is in the speaker notes."], ["FiBookOpen", "Lab", "Learners do it themselves. Every lab has the same number as its slide, for example Lab 1.5."], ["FiCheckCircle", "Verify", "Every lab ends with a check: is the AI's answer right? You own the number, not the AI."]];
    steps.forEach((st, i) => {
      const x = 0.5 + i * 2.3;
      panel(s, x, 1.35, 2.1, 3.4);
      circleIcon(s, ic[st[0]], x + 0.2, 1.55, 0.55);
      s.addText(st[1], { x: x + 0.2, y: 2.25, w: 1.75, h: 0.4, fontSize: 16, bold: true, color: C.text1, margin: 0, isTextBox: true });
      body(s, st[2], { x: x + 0.2, y: 2.7, w: 1.75, h: 1.95, fontSize: 11.5 });
    });
    notes(s, "Explain the rhythm once so learners know what to expect: explain, demo, lab, verify. Labs range from 10 to 25 minutes. Not every client will have every feature; each lab has an 'If this is not available' fallback.");
  }
  {
    const s = slide("CONTENT");
    T(s, COURSE.sectionsTitle);
    const many = SECTIONS.length > 6;
    SECTIONS.forEach((sec, i) => {
      const col = many ? Math.floor(i / 6) : 0, row = many ? i % 6 : i;
      const w = many ? 4.4 : 9.0, x = 0.5 + col * 4.6, rh = many ? 0.6 : 0.75, y = 1.25 + row * rh;
      panel(s, x, y, w, rh - 0.1);
      circleIcon(s, ic[sec.icon], x + 0.1, y + 0.06, rh - 0.24);
      s.addText(`${i + 1}. ${sec.title}`, { x: x + 0.65, y: y + 0.03, w: many ? 2.9 : 4.0, h: rh - 0.16, fontSize: many ? 11.5 : 14, bold: true, color: C.text1, margin: 0, isTextBox: true, valign: "middle" });
      if (!many) body(s, sec.blurb, { x: 5.2, y: y + 0.06, w: 3.3, h: 0.5, fontSize: 10.5, valign: "middle" });
      s.addText(`${sec.concepts.length} labs`, { x: x + w - 1.0, y: y + 0.03, w: 0.9, h: rh - 0.16, fontSize: 10.5, bold: true, color: C.accent5, align: "right", margin: 0, isTextBox: true, valign: "middle" });
    });
    notes(s, COURSE.sectionsNotes);
  }
  {
    const s = slide("CONTENT");
    T(s, `What each ${NOUN} needs`);
    const rows = COURSE.needs, rh = Math.min(0.75, 3.85 / rows.length);
    rows.forEach((r, i) => {
      const y = 1.25 + i * rh;
      panel(s, 0.5, y, 9.0, rh - 0.1);
      circleIcon(s, ic[r[2]], 0.6, y + 0.05, rh - 0.2);
      s.addText(r[0], { x: 1.25, y: y + 0.02, w: 3.8, h: rh - 0.14, fontSize: 12, bold: true, color: C.text1, margin: 0, isTextBox: true, valign: "middle" });
      body(s, r[1], { x: 5.1, y: y + 0.02, w: 4.25, h: rh - 0.14, fontSize: 10.5, valign: "middle" });
    });
    notes(s, COURSE.needsNotes);
  }
  {
    const s = slide("CONTENT");
    T(s, COURSE.dataTitle);
    const items = COURSE.dataItems, rh = Math.min(0.75, 3.85 / items.length);
    items.forEach((it, i) => {
      const y = 1.25 + i * rh;
      circleIcon(s, ic[it[0]] || ic.FiFlag, 0.5, y + 0.05, Math.min(0.5, rh - 0.12));
      s.addText(it[1], { x: 1.2, y, w: 2.2, h: rh - 0.1, fontSize: 13, bold: true, color: C.text1, margin: 0, isTextBox: true, valign: "middle" });
      body(s, it[2], { x: 3.4, y, w: 6.1, h: rh - 0.1, fontSize: 11.5, valign: "middle" });
    });
    notes(s, COURSE.dataNotes);
  }
  {
    const s = slide("CONTENT");
    T(s, `Lab 0: ${SETUP_LAB.title}`);
    bulletList(s, SETUP_LAB.steps, { x: 0.5, y: 1.25, w: 5.2, h: 3.75, fontSize: 11 }, true);
    codeBox(s, SETUP_LAB.slideCode, 5.95, 1.25, 3.55, 1.7, 9);
    panel(s, 5.95, 3.15, 3.55, 1.85);
    circleIcon(s, ic.FiClock, 6.1, 3.3, 0.45);
    s.addText(`${SETUP_LAB.minutes} minutes`, { x: 6.7, y: 3.3, w: 2.6, h: 0.45, fontSize: 14, bold: true, color: C.text1, margin: 0, isTextBox: true, valign: "middle" });
    body(s, SETUP_LAB.slideNote, { x: 6.1, y: 3.85, w: 3.25, h: 1.05, fontSize: 10.5 });
    notes(s, SETUP_LAB.notes);
  }
  {
    const s = slide("CONTENT");
    T(s, "The rule for the whole course: AI proposes, you verify");
    const r = COURSE.rules || [["FiCheckCircle", "Compare", "Build the same number by hand, or with a query, and check they match."], ["FiEye", "Look at the rows", "Use Show as a table to see exactly which rows made the number."], ["FiBookOpen", "Read the logic", "Ask the AI to explain its formula. If you cannot follow it, do not ship it."], ["FiShield", "Own it", "The person who presents the number is accountable for it, whoever wrote it."]];
    r.forEach((it, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = 0.5 + col * 4.6, y = 1.3 + row * 1.85;
      panel(s, x, y, 4.4, 1.65);
      circleIcon(s, ic[it[0]], x + 0.2, y + 0.2, 0.5);
      s.addText(it[1], { x: x + 0.85, y: y + 0.2, w: 3.3, h: 0.5, fontSize: 15, bold: true, color: C.text1, margin: 0, isTextBox: true, valign: "middle" });
      body(s, it[2], { x: x + 0.85, y: y + 0.75, w: 3.35, h: 0.8, fontSize: 12 });
    });
    notes(s, "Return to this slide whenever a lab produces a surprising answer. The business AI literacy outcome of the course is this habit, not any single feature.");
  }

  }
  const challengeSlide = (sec, si) => {
    const ch = sec.challenge; if (!ch) return;
    const s = slide("CONTENT");
    const lab = `${NOUNC} ${si + 1} challenge`;
    pill(s, 0.5, 0.12, pillW(lab), lab, H.lt2, H.dk2);
    pill(s, 8.5, 0.12, 1.0, `${ch.minutes} min`, H.dk1, H.accent1);
    T(s, ch.title);
    panel(s, 0.5, 1.25, 4.1, 3.75);
    circleIcon(s, ic.FiTarget, 0.7, 1.42, 0.45);
    s.addText("The scenario", { x: 1.25, y: 1.42, w: 3.2, h: 0.45, fontSize: 14, bold: true, color: C.text1, margin: 0, isTextBox: true, valign: "middle" });
    body(s, ch.scenario, { x: 0.72, y: 2.0, w: 3.7, h: 1.75, fontSize: ch.scenario.length > 260 ? 10.5 : 11.5 });
    s.addText([{ text: "Deliverable: ", options: { bold: true, color: C.text1 } }, { text: ch.deliverable, options: {} }], { x: 0.72, y: 3.8, w: 3.7, h: 1.1, fontSize: 10.5, color: C.text2, margin: 0, isTextBox: true, valign: "top" });
    panel(s, 4.8, 1.25, 4.7, 3.75);
    circleIcon(s, ic.FiList, 5.0, 1.42, 0.45);
    s.addText("Steps", { x: 5.55, y: 1.42, w: 3.8, h: 0.45, fontSize: 14, bold: true, color: C.text1, margin: 0, isTextBox: true, valign: "middle" });
    const len = ch.steps.join(" ").length;
    bulletList(s, ch.steps, { x: 5.0, y: 1.98, w: 4.35, h: 2.95, fontSize: len > 900 ? 8.5 : len > 650 ? 9.5 : 10.5, paraSpaceAfter: 3 }, true);
    notes(s, [`CHALLENGE LAB: ${ch.title}, about ${ch.minutes} minutes.`, ``, `Scenario: ${ch.scenario}`, ``, ...ch.steps.map((t, i) => `${i + 1}. ${t}`), ``, `Deliverable: ${ch.deliverable}`, `Check: ${ch.check}`, ``, `Full steps are in the lab book at the end of this section. Run it as a pair or small-group exercise, then ask two groups to show their result.`].join("\n"));
  };
  // ======================= SECTIONS =======================
  for (let si = 0; si < SECTIONS.length; si++) {
    const sec = SECTIONS[si];
    if (!inc(String(si + 1))) continue;
    section = `${si + 1}. ${sec.title}`;
    pres.addSection({ title: section });
    {
      const s = slide("DIVIDER");
      s.addText(`${NOUN.toUpperCase()} ${si + 1} OF ${SECTIONS.length}`, { placeholder: "kicker" });
      T(s, sec.title);
      s.addText(sec.blurb, { placeholder: "body" });
      // feature list on the right
      const list = sec.concepts.map((c) => `${c.id}  ${c.title}`);
      s.addText(list.map((t, i) => ({ text: t, options: { breakLine: i < list.length - 1 } })), { x: 6.75, y: 0.6, w: 2.85, h: 4.4, fontSize: list.length > 10 ? 8.5 : 10.5, color: "A8B5C2", margin: 0, isTextBox: true, valign: "middle", paraSpaceAfter: 3 });
      notes(s, `${NOUNC} ${si + 1}: ${sec.title}. ${sec.blurb} This ${NOUN} has ${sec.concepts.length} features, each with a lab of the same number.${sec.notes ? " " + sec.notes : ""}`);
    }
    for (const c of sec.concepts) {
      const st = statusStyle(c.status);
      // ---- explanation slide
      const s = slide("CONTENT");
      pill(s, 0.5, 0.12, pillW(c.status), c.status, st.fill, st.text);
      pill(s, 8.5, 0.12, 1.0, `Lab ${c.id}`, H.dk1, H.accent1);
      T(s, `${c.id}  ${c.title}`);
      const cols = [{ x: 0.5, w: 2.7, h: "What it is", ic: c.icon, kind: "text", v: c.what }, { x: 3.45, w: 3.5, h: "How it works", ic: "FiList", kind: "list", v: c.how }, { x: 7.2, w: 2.3, h: "Why it exists", ic: "FiStar", kind: "text", v: c.why }];
      const ch = c.qualify ? 2.95 : 3.25;
      for (const col of cols) {
        panel(s, col.x, 1.25, col.w, ch);
        circleIcon(s, ic[col.ic], col.x + 0.18, 1.42, 0.45);
        s.addText(col.h, { x: col.x + 0.75, y: 1.42, w: col.w - 0.9, h: 0.45, fontSize: 13.5, bold: true, color: C.text1, margin: 0, isTextBox: true, valign: "middle" });
        if (col.kind === "text") body(s, col.v, { x: col.x + 0.18, y: 2.02, w: col.w - 0.36, h: ch - 0.87, fontSize: col.v.length > 230 ? 10.5 : (c.qualify && col.v.length > 180 ? 11 : 12) });
        else bulletList(s, col.v, { x: col.x + 0.18, y: 2.02, w: col.w - 0.36, h: ch - 0.87, fontSize: col.v.length > 4 || c.qualify ? 10.5 : 11.5 }, true);
      }
      if (c.qualify) {
        s.addShape(pres.ShapeType.roundRect, { x: 0.5, y: 4.27, w: 9.0, h: 0.38, rectRadius: 0.08, fill: { color: "FFF1CC" }, line: { color: "F2D27A", width: 0.75 } });
        s.addImage({ data: icWarn, x: 0.6, y: 4.32, w: 0.28, h: 0.28 });
        s.addText([{ text: "Verify before class: ", options: { bold: true, color: "8A5A00" } }, { text: c.qualify, options: { color: "5C3D00" } }], { x: 0.98, y: 4.27, w: 8.45, h: 0.38, fontSize: 9.5, margin: 0, isTextBox: true, valign: "middle" });
      }
      s.addText([{ text: "Requires: ", options: { bold: true, color: C.text1 } }, { text: c.requires, options: {} }], { x: 0.5, y: c.qualify ? 4.7 : 4.62, w: 9.0, h: c.qualify ? 0.4 : 0.45, fontSize: 10, color: C.text2, margin: 0, isTextBox: true, valign: "middle" });
      notes(s, [
        `WHAT TO SAY`, c.talk, ``,
        `DEMO: ${c.id} ${c.title}`, ...c.demo.map((d, i) => `${i + 1}. ${d}`), ``,
        `LAB: Lab ${c.id} in the lab book, about ${c.lab.minutes + (c.lab.partB ? c.lab.partB.minutes : 0)} minutes.`, `Part A objective: ${c.lab.objective}`, ...(c.lab.partB ? [`Part B (${c.lab.partB.minutes} min), ${c.lab.partB.title}: ${c.lab.partB.objective}`] : []), `If the feature is unavailable: ${c.lab.fallback}`, ``,
        `Status: ${c.status}. Requires: ${c.requires}`, ...(c.qualify ? [``, `VERIFY BEFORE CLASS: ${c.qualify}`] : []),
      ].join("\n"));

      // ---- optional detail slide
      if (!c.deep) continue;
      const d = c.deep;
      const s2 = slide("CONTENT");
      pill(s2, 0.5, 0.12, pillW(`${c.id} ${c.title}`), `${c.id}  ${c.title}`, H.lt2, H.dk2);
      pill(s2, 8.5, 0.12, 1.0, `Lab ${c.id}`, H.dk1, H.accent1);
      T(s2, d.title);
      if (d.kind === "prompts") {
        const n = d.items.length, gap = 0.15, hh = Math.min(0.8, (3.75 - gap * (n - 1)) / n);
        d.items.forEach((p, i) => {
          const y = 1.25 + i * (hh + gap);
          s2.addShape(pres.ShapeType.roundRect, { x: 0.5, y, w: 9.0, h: hh, rectRadius: 0.08, fill: { color: C.background2 }, line: { color: H.accent6, width: 0.75 } });
          s2.addShape(pres.ShapeType.rect, { x: 0.5, y, w: 0.12, h: hh, fill: { color: C.background2 }, line: { color: C.background2, width: 0 } });
          s2.addText(String(i + 1), { x: 0.6, y, w: 0.4, h: hh, fontSize: 14, bold: true, color: C.accent5, align: "center", valign: "middle", margin: 0, isTextBox: true });
          s2.addText(p, { x: 1.1, y, w: 8.25, h: hh, fontFace: "Courier New", fontSize: p.length > 110 ? 10.5 : 11.5, color: C.text1, valign: "middle", margin: 0, isTextBox: true });
        });
      } else if (d.kind === "code") {
        const lines = d.code.split("\n").length;
        codeBox(s2, d.code, 0.5, 1.25, 6.0, 3.75, lines > 11 ? 9.5 : 10.5);
        panel(s2, 6.75, 1.25, 2.75, 3.75);
        circleIcon(s2, ic.FiInfo, 6.95, 1.45, 0.45);
        s2.addText("How to use it", { x: 7.5, y: 1.45, w: 1.9, h: 0.45, fontSize: 13, bold: true, color: C.text1, margin: 0, isTextBox: true, valign: "middle" });
        body(s2, d.caption, { x: 6.95, y: 2.05, w: 2.4, h: 2.8, fontSize: 11.5 });
      } else if (d.kind === "compare") {
        [d.left, d.right].forEach((side, i) => {
          const x = 0.5 + i * 4.6;
          panel(s2, x, 1.25, 4.4, 3.75);
          circleIcon(s2, ic[i === 0 ? "FiAlertTriangle" : "FiCheckCircle"], x + 0.2, 1.42, 0.45);
          s2.addText(side.h, { x: x + 0.8, y: 1.42, w: 3.4, h: 0.45, fontSize: 15, bold: true, color: C.text1, margin: 0, isTextBox: true, valign: "middle" });
          bulletList(s2, side.items, { x: x + 0.25, y: 2.05, w: 3.95, h: 2.85, fontSize: 12.5, paraSpaceAfter: 7 });
        });
      } else if (d.kind === "flow") {
        const n = d.items.length, gap = 0.22, w = (9.0 - gap * (n - 1)) / n;
        d.items.forEach((it, i) => {
          const x = 0.5 + i * (w + gap);
          panel(s2, x, 1.5, w, 2.9);
          s2.addShape(pres.ShapeType.ellipse, { x: x + 0.15, y: 1.68, w: 0.5, h: 0.5, fill: { color: C.accent1 }, line: { color: C.accent1, width: 0 } });
          s2.addText(String(i + 1), { x: x + 0.15, y: 1.68, w: 0.5, h: 0.5, fontSize: 16, bold: true, color: C.text1, align: "center", valign: "middle", margin: 0, isTextBox: true });
          s2.addText(it[0], { x: x + 0.15, y: 2.32, w: w - 0.3, h: 0.4, fontSize: 14, bold: true, color: C.text1, margin: 0, isTextBox: true });
          body(s2, it[1], { x: x + 0.15, y: 2.75, w: w - 0.3, h: 1.55, fontSize: 11 });
        });
      }
      notes(s2, `Detail slide for ${c.id} ${c.title}. ${d.kind === "prompts" ? "Learners copy these prompts in the lab; they are also printed in the lab book." : d.kind === "code" ? "This code is printed in the lab book so learners can copy it." : "Use this slide to discuss before the demo on the previous slide."} The demo script is in the notes of the previous slide.`);
    }
    challengeSlide(sec, si);
  }

  if (inc("wrap")) {
  // ======================= WRAP =======================
  section = "Wrap-up";
  pres.addSection({ title: section });
  {
    const s = slide("CONTENT");
    T(s, "What you can now do");
    const many = SECTIONS.length > 6;
    SECTIONS.forEach((sec, i) => {
      const col = many ? Math.floor(i / 6) : 0, row = many ? i % 6 : i;
      const w = many ? 4.4 : 9.0, x = 0.5 + col * 4.6, rh = many ? 0.6 : 0.75, y = 1.25 + row * rh;
      panel(s, x, y, w, rh - 0.1);
      circleIcon(s, ic[sec.icon], x + 0.1, y + 0.06, rh - 0.24);
      if (many) body(s, [{ text: sec.title + ": ", options: { bold: true, color: C.text1 } }, { text: sec.done, options: {} }], { x: x + 0.65, y: y + 0.03, w: w - 0.75, h: rh - 0.16, fontSize: 9.5, valign: "middle" });
      else { s.addText(sec.title, { x: 1.25, y: y + 0.06, w: 3.6, h: 0.5, fontSize: 13.5, bold: true, color: C.text1, margin: 0, isTextBox: true, valign: "middle" }); body(s, sec.done, { x: 4.9, y: y + 0.06, w: 4.5, h: 0.5, fontSize: 11.5, valign: "middle" }); }
    });
    notes(s, "Go round the room: which one feature will each person use next week? Note the answers for the client sponsor.");
  }
  {
    const s = slide("CONTENT");
    T(s, COURSE.rolloutTitle || "Before you roll this out in your team");
    COURSE.rollout.forEach((it, i) => {
      const x = 0.5 + i * 2.3;
      panel(s, x, 1.35, 2.1, 3.4);
      circleIcon(s, ic[it[0]] || ic.FiFlag, x + 0.2, 1.55, 0.55);
      s.addText(it[1], { x: x + 0.2, y: 2.25, w: 1.75, h: 0.65, fontSize: 14, bold: true, color: C.text1, margin: 0, isTextBox: true, valign: "top" });
      body(s, it[2], { x: x + 0.2, y: 2.95, w: 1.75, h: 1.7, fontSize: 11.5 });
    });
    notes(s, COURSE.rolloutNotes || "These four steps are the practical takeaway for a sponsor.");
  }
  {
    const s = slide("TITLE");
    T(s, "Thank you");
    s.addText([{ text: COURSE.thanks || "Lab book, datasets and readiness guide: see the course folder.", options: { breakLine: true } }, { text: (process.env.BRAND || "DataCamp Business AI Literacy"), options: {} }], { placeholder: "body" });
    s.addShape(pres.ShapeType.rect, { x: 0.6, y: 1.25, w: 0.9, h: 0.08, fill: { color: C.accent1 }, line: { color: C.accent1, width: 0 } });
  }

  }
  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("wrote", OUT);
})().catch((e) => { console.error(e); process.exit(1); });
