// AI in Power BI - lab book builder (.docx). Reads content.js. Run: node build_labbook.js
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, ShadingType,
  BorderStyle, AlignmentType, LevelFormat, PageBreak, Footer, PageNumber, TableLayoutType,
} = require("docx");
const { COURSE, SETUP_LAB, SECTIONS } = require(require("path").resolve(process.argv[2] || "./content.js"));
const OUTFILE = process.argv[3] || "AI_in_Power_BI_Lab_Book.docx";
const BRAND = process.env.BRAND || "DataCamp Business AI Literacy";
const ONLY = process.env.ONLY ? new Set(process.env.ONLY.split(",")) : null;
const inc = (k) => !ONLY || ONLY.has(k);
const NOUN = COURSE.noun || "section"; const NOUNC = NOUN[0].toUpperCase() + NOUN.slice(1);
const AMBER = "FFF1CC";

const NAVY = "05192D", GREEN = "16A34A", GRAY = "3D4E5E", LIGHT = "F2F5F8", LINE = "D5DCE4";
const FONT = "Arial", MONO = "Courier New";
const PAGE_W = 12240, MARGIN = 1080, CONTENT_W = PAGE_W - 2 * MARGIN; // 10080 DXA

let numInstance = 0;
const P = (text, o = {}) => new Paragraph({ spacing: { after: 120 }, ...o, children: Array.isArray(text) ? text : [new TextRun({ text, ...(o.run || {}) })] });
const H1 = (t, pageBreak = true) => new Paragraph({ heading: HeadingLevel.HEADING_1, pageBreakBefore: pageBreak, children: [new TextRun(t)] });
const H2 = (t, pageBreak = true) => new Paragraph({ heading: HeadingLevel.HEADING_2, pageBreakBefore: pageBreak, children: [new TextRun(t)] });
const H3 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun(t)] });
const bullet = (t) => new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 60 }, children: [new TextRun(t)] });
const numbered = (items) => { numInstance += 1; const inst = numInstance; return items.map((t) => new Paragraph({ numbering: { reference: "steps", level: 0, instance: inst }, spacing: { after: 80 }, children: [new TextRun(t)] })); };
const codeBlock = (code) => code.split("\n").map((line, i, arr) => new Paragraph({
  shading: { type: ShadingType.CLEAR, color: "auto", fill: LIGHT },
  spacing: { before: i === 0 ? 80 : 0, after: i === arr.length - 1 ? 160 : 0 },
  indent: { left: 200, right: 200 },
  children: [new TextRun({ text: line.length ? line : " ", font: MONO, size: 18 })],
}));
const cellBorder = { style: BorderStyle.SINGLE, size: 4, color: LINE };
const borders = { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder };
function table(rows, widths, header = true) {
  return new Table({
    width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA }, columnWidths: widths, layout: TableLayoutType.FIXED,
    rows: rows.map((r, ri) => new TableRow({
      tableHeader: header && ri === 0, cantSplit: true,
      children: r.map((c, ci) => new TableCell({
        width: { size: widths[ci], type: WidthType.DXA }, borders,
        shading: header && ri === 0 ? { type: ShadingType.CLEAR, color: "auto", fill: NAVY } : (!header && ci === 0 ? { type: ShadingType.CLEAR, color: "auto", fill: LIGHT } : undefined),
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({ children: [new TextRun({ text: String(c), bold: (header && ri === 0) || (!header && ci === 0), color: header && ri === 0 ? "FFFFFF" : undefined, size: 19 })] })],
      })),
    })),
  });
}
const band = (t) => new Paragraph({ spacing: { before: 240, after: 120 }, keepNext: true, border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: GREEN, space: 4 } }, children: [new TextRun({ text: t, bold: true, size: 26, color: NAVY, font: FONT })] });
const labMin = (l) => l.minutes + (l.partB ? l.partB.minutes : 0);
const spacer = () => new Paragraph({ spacing: { after: 120 }, children: [] });

function labBlock(id, title, meta, what, lab, deep, isSetup) {
  const out = [];
  out.push(H2(`Lab ${id}: ${title}`));
  out.push(table([["Time", lab.partB ? `About ${labMin(lab)} minutes (Part A ${lab.minutes}, Part B ${lab.partB.minutes})` : `About ${lab.minutes} minutes`], ...(meta.status ? [["Feature status", meta.status]] : []), ["You need", meta.requires]], [2200, CONTENT_W - 2200], false));
  out.push(spacer());
  if (meta.qualify) out.push(new Paragraph({ shading: { type: ShadingType.CLEAR, color: "auto", fill: AMBER }, border: { left: { style: BorderStyle.SINGLE, size: 18, color: "F2B705", space: 8 } }, spacing: { after: 160 }, indent: { left: 160, right: 160 }, children: [new TextRun({ text: "Verify before class: ", bold: true, color: "8A5A00" }), new TextRun({ text: meta.qualify, color: "5C3D00" })] }));
  if (what) { out.push(H3("What this feature is")); out.push(P(what)); }
  if (lab.partB) out.push(band(`Part A: Core lab (about ${lab.minutes} minutes)`));
  out.push(H3("Objective")); out.push(P(lab.objective));
  out.push(H3("Steps")); out.push(...numbered(lab.steps));
  if (isSetup) (SETUP_LAB.codeBlocks || [["Date table formula", SETUP_LAB.code[0]], ["The five measures", SETUP_LAB.code[1]]]).forEach(([t, c]) => { out.push(H3(t)); out.push(...codeBlock(c)); });
  if (deep && deep.kind === "prompts") { out.push(H3(deep.title)); deep.items.forEach((p) => out.push(...codeBlock(p))); }
  if (deep && deep.kind === "code") { out.push(H3(deep.title)); out.push(...codeBlock(deep.code)); if (deep.caption) out.push(P(deep.caption, { run: { italics: true, color: GRAY } })); }
  if (lab.extra) { out.push(H3(lab.extra.title)); lab.extra.items.forEach((p) => out.push(...codeBlock(p))); }
  out.push(H3("Check your work")); out.push(P(lab.check));
  if (lab.partB) {
    const b = lab.partB;
    out.push(band(`Part B: ${b.title} (about ${b.minutes} minutes)`));
    out.push(H3("Objective")); out.push(P(b.objective));
    out.push(H3("Steps")); out.push(...numbered(b.steps));
    out.push(H3("Check your work")); out.push(P(b.check));
  }
  out.push(H3("If this feature is not available")); out.push(P(lab.fallback));
  return out;
}

const children = [];
// ---- title page
children.push(new Paragraph({ spacing: { before: 2400, after: 200 }, children: [new TextRun({ text: BRAND, bold: true, color: GREEN, size: 24, font: FONT })] }));
children.push(new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun(`${COURSE.title}: Lab Book`)] }));
children.push(P(COURSE.subtitle, { run: { size: 26, color: GRAY } }));
children.push(P(`One lab for each of the ${SECTIONS.reduce((n, s) => n + s.concepts.length, 0)} features in the course, numbered to match the slides, plus a setup lab.`, { run: { color: GRAY } }));
children.push(P(COURSE.lb.dataLine, { run: { color: GRAY } }));
const onlyMods = ONLY && !inc("intro") ? SECTIONS.map((x, i) => i).filter((i) => inc(String(i + 1))) : null;
if (onlyMods) children.push(P(onlyMods.map((i) => `${NOUNC} ${i + 1}: ${SECTIONS[i].title}`).join("; "), { run: { size: 26, bold: true, color: NAVY } }));
if (inc("intro")) {
// ---- how to use
children.push(H1("How to use this lab book"));
COURSE.lb.intro.forEach((t) => children.push(P(t)));
if (SECTIONS.some((s) => s.concepts.some((c) => c.lab.partB))) children.push(P("Every lab has two parts. Part A is the core lab that matches the demo. Part B takes the same skill further on a harder or more realistic task, for about the same time again. Each " + NOUN + " ends with a longer challenge lab that combines its topics in one business scenario. If time is short, instructors run Part A for every lab and choose Part B labs and challenges to suit the group."));
children.push(H3(`What each ${NOUN} needs`));
children.push(table([["You have", "You can do"], ...COURSE.needs.map((r) => [r[0], r[1]])], [4300, CONTENT_W - 4300]));
children.push(H3(COURSE.lb.dataHeading));
COURSE.lb.dataNotes.forEach((t) => children.push(bullet(t)));
// ---- lab list
children.push(H1("Lab list"));
const listRows = [["Lab", "Feature", "Minutes"], ["0", SETUP_LAB.title, String(SETUP_LAB.minutes)]];
SECTIONS.forEach((s, si) => { s.concepts.forEach((c) => listRows.push([c.id, c.title, String(labMin(c.lab))])); if (s.challenge) listRows.push([`${si + 1} challenge`, s.challenge.title, String(s.challenge.minutes)]); });
children.push(table(listRows, [1100, CONTENT_W - 2400, 1300]));
const total = SECTIONS.reduce((n, s) => n + s.concepts.reduce((m, c) => m + labMin(c.lab), 0) + (s.challenge ? s.challenge.minutes : 0), SETUP_LAB.minutes);
children.push(P(`Total lab time is about ${Math.round(total / 60 * 10) / 10} hours, not counting explanations and demos. Instructors choose which labs to run based on the client licences and goals. Labs marked Verify before class depend on preview features, staged rollouts or facts from secondary sources, so check them in the training tenant first.`, { spacing: { before: 160 } }));

// ---- lab 0
children.push(H1("Before you start"));
children.push(...labBlock("0", SETUP_LAB.title, { requires: SETUP_LAB.requires }, null, SETUP_LAB, null, true).map((x, i) => (i === 0 ? H2(`Lab 0: ${SETUP_LAB.title}`, false) : x)));

}
// ---- sections
SECTIONS.forEach((sec, si) => {
  if (!inc(String(si + 1))) return;
  children.push(H1(`${NOUNC} ${si + 1}: ${sec.title}`));
  children.push(P(sec.blurb));
  sec.concepts.forEach((c, ci) => {
    const block = labBlock(c.id, c.title, { status: c.status, requires: c.requires, qualify: c.qualify }, c.what, c.lab, c.deep, false);
    if (ci === 0) block[0] = H2(`Lab ${c.id}: ${c.title}`, false);
    children.push(...block);
  });
  if (sec.challenge) {
    const ch = sec.challenge;
    children.push(H2(`${NOUNC} ${si + 1} challenge: ${ch.title}`));
    children.push(table([["Time", `About ${ch.minutes} minutes`], ["Deliverable", ch.deliverable]], [2200, CONTENT_W - 2200], false));
    children.push(spacer());
    children.push(H3("The scenario")); children.push(P(ch.scenario));
    children.push(H3("Steps")); children.push(...numbered(ch.steps));
    children.push(H3("Check your work")); children.push(P(ch.check));
  }
});

// ---- appendices
if (inc("wrap")) COURSE.lb.appendices.forEach((a) => {
  children.push(H1(a.title));
  (a.intro || []).forEach((t) => children.push(P(t)));
  (a.bullets || []).forEach((t) => children.push(bullet(t)));
  if (a.table) children.push(table(a.table, a.widths || [2400, CONTENT_W - 2400]));
});

const doc = new Document({
  creator: BRAND, title: `${COURSE.title}: Lab Book`,
  styles: {
    default: { document: { run: { font: FONT, size: 21, color: "1F2A36" }, paragraph: { spacing: { line: 276 } } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal", run: { font: FONT, size: 56, bold: true, color: NAVY }, paragraph: { spacing: { before: 0, after: 240 }, keepNext: true } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: FONT, size: 36, bold: true, color: NAVY }, paragraph: { spacing: { before: 0, after: 200 }, keepNext: true, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: FONT, size: 30, bold: true, color: NAVY }, paragraph: { spacing: { before: 240, after: 160 }, keepNext: true, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: FONT, size: 23, bold: true, color: GREEN }, paragraph: { spacing: { before: 200, after: 80 }, keepNext: true, outlineLevel: 2 } },
    ],
  },
  numbering: {
    config: [
      { reference: "steps", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 440, hanging: 360 } } } }] },
      { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 440, hanging: 360 } } } }] },
    ],
  },
  sections: [{
    properties: { page: { size: { width: PAGE_W, height: 15840 }, margin: { top: 1080, bottom: 1080, left: MARGIN, right: MARGIN } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: `${COURSE.title} Lab Book   |   Page `, size: 16, color: GRAY }), new TextRun({ children: [PageNumber.CURRENT], size: 16, color: GRAY })] })] }) },
    children,
  }],
});

Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(OUTFILE, buf); console.log("wrote " + OUTFILE); });
