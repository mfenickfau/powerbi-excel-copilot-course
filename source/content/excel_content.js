// AI in Excel - course framing. Combines ex_a, ex_b, ex_c.
const SECTIONS = [...require("./ex_a.js"), ...require("./ex_b.js"), ...require("./ex_c.js")];
const n = SECTIONS.reduce((a, s) => a + s.concepts.length, 0);

const COURSE = {
  title: "AI in Excel",
  subtitle: "Excel for Business: every AI feature, explained, demonstrated and practised",
  label: "AI in Excel",
  footer: "Excel for Business",
  noun: "module",
  tagline: `Eleven modules, ${n} features, one lab for each`,
  welcomeNotes: `Welcome. This course covers every AI feature in and around Excel as of November 2026, in eleven modules. Each feature has an explanation slide, a live demo in these notes, and a lab with the same number in the lab book.\n\nSlides with an amber Verify before class strip describe features that are in preview, mid-rollout, or confirmed only by secondary sources. Test each one in the training tenant the week before delivery. The research could not open Microsoft's pages directly; dates come from search summaries of those pages.\n\nAsk the room: who has a Copilot licence? Who has used Copilot in Excel? Who uses ChatGPT or Claude with spreadsheets? Calibrate from that.`,
  rules: [["FiEye", "See what changed", "Use Show Changes, citations and links to find every AI edit."], ["FiBookOpen", "Read the logic", "Read every formula, step or query it wrote. If you cannot follow it, do not ship it."], ["FiCheckCircle", "Test one result", "Check one number by hand or with a second method."], ["FiShield", "Keep a copy", "Work on a copy so you can compare and undo. You own the numbers you send."]],
  sectionsTitle: "Eleven modules",
  sectionsNotes: "Run module 1 first. Modules 1, 6, 7 and 10 work without a Copilot licence. Modules 2 to 5 need Copilot. Some labs in modules 3, 5 and 9 depend on preview or Insider features and are marked Verify before class.",
  needs: [
    ["Excel for Microsoft 365, no Copilot", "Modules 1, 6, 7 (except 7.3) and 11. Module 10 with approved outside tools.", "FiMonitor"],
    ["Microsoft 365 Copilot licence (or Personal, Family, Premium)", "Modules 2 to 5 and lab 7.3. Labs 3.9, 4.1 and 4.3 need the full business licence.", "FiZap"],
    ["Insider or Frontier enrolment", "Labs 3.10, 3.12, 3.13, 5.1 and 7.5, and the @python-in-excel skill.", "FiAlertTriangle"],
    ["Microsoft 365 Business or Enterprise", "Python in Excel, full Power Query on the web, Office Scripts.", "FiLayers"],
    ["Power Automate with Copilot Credits", "Labs 8.3 to 8.5. AI Builder credits were replaced on 1 Nov 2026.", "FiRepeat"],
    ["Power BI or Fabric access", "Module 9 and lab 4.3.", "FiDatabase"],
    ["Approved outside AI accounts", "Labs 10.1, 10.3 and 10.4 (Claude, ChatGPT, Gemini).", "FiShield"],
  ],
  needsNotes: "This slide summarizes the Excel readiness call. If learners have no Copilot licence, run modules 1, 6, 7 and 10 hands-on and demo the rest.",
  dataTitle: "The lab files have answers planted for the AI to find",
  dataItems: [
    ["FiTarget", "Returns", "Apparel, footwear, Online and 30% discounts drive returns. Copilot, Analyst and Python should find them."],
    ["FiAlertTriangle", "A planted error", "LegacyModel's last store ignores its bonus. Can Copilot or Claude spot it?"],
    ["FiBook", "Reconciliation", "Ledger and BankStatement have seven planted differences for the accounting labs."],
    ["FiActivity", "Seasonality", "MonthlySales has a clear 12-month pattern for Forecast Sheet."],
    ["FiFileText", "Free text", "About 500 reviews, some in Spanish and French, for TRANSLATE and AI prompts."],
    ["FiImage", "Picture and trap", "A price-list photo for Data from Picture, and an untrusted vendor file with a hidden instruction."],
  ],
  dataNotes: "Files: Brightline_Excel_AI_Lab.xlsx, Supplier_Price_List.png and Vendor_Quote_UNTRUSTED.xlsx in the course Lab Files folder. The README sheet lists every planted pattern. The answer key is in the lab book appendix.",
  rolloutTitle: "Before you roll this out in your team",
  rollout: [
    ["FiKey", "Check licences", "Who has Copilot, who does not, and which features are still rolling out (module 11)."],
    ["FiShield", "Agree the rules", "Approved tools, labels and what can be shared (module 1)."],
    ["FiZap", "Build one skill", "Capture one recurring task with the skill builder (lab 3.11)."],
    ["FiCheckCircle", "Keep checking", "See, read, test, keep: the routine from lab 1.2 on every AI edit."],
  ],
  rolloutNotes: "These four steps are the practical takeaway for a sponsor. Offer the Day 0 Excel readiness guide as the starting point.",
  thanks: "Lab book, lab files and readiness guide: see the course folder.",
  lb: {
    dataLine: "Lab files: Brightline_Excel_AI_Lab.xlsx, Supplier_Price_List.png and Vendor_Quote_UNTRUSTED.xlsx. All data is synthetic.",
    intro: [
      "Every feature in the course has three parts. The slide explains what it is, how it works and why it exists. The instructor demonstrates it live. Then you do this lab. Lab numbers match slide numbers, so Lab 2.4 goes with slide 2.4.",
      "Each lab lists the time it takes and what it needs. Many AI features depend on licences, rollout timing and settings your organization controls, so every lab ends with what to do if the feature is not available to you.",
      "Labs with an amber Verify before class box describe features that were in preview, mid-rollout, or confirmed only by secondary sources when this book was written in November 2026. Your instructor checks them in the training tenant first; some will run as demos.",
      "Do Lab 0 first. One rule runs through the whole book: AI drafts, you verify. Each lab ends with a check. Do not skip it.",
    ],
    dataHeading: "What is planted in the lab files",
    dataNotes: [
      "Sales: Apparel, footwear, the Online store and 30% discounts drive returns. New York SoHo has no sales in October 2025. Pro / Guide customers buy more often and in larger quantities.",
      "MonthlySales: a clear 12-month seasonal pattern with summer and holiday peaks.",
      "LegacyModel: the last store's Commission $ formula leaves out its bonus.",
      "Ledger and BankStatement (October 2025): three items not yet cleared by the bank, one amount mismatch, one bank fee, one duplicate bank line and one ledger-only interest entry.",
      "Reviews: about 500 reviews with ratings; some in Spanish and French; sizing complaints cluster on Apparel and footwear.",
      "MessyExport: title rows, repeated headers, mixed date formats, text numbers, inconsistent keys, duplicates and a TOTAL row.",
      "Vendor_Quote_UNTRUSTED.xlsx: a hidden white-text instruction in cell A11 aimed at AI assistants. It is a training file.",
    ],
    appendices: [
      {
        title: "Appendix A: Instructor answer key",
        intro: ["Expected findings on the lab files. Copilot answers vary from run to run, so treat these as what a correct answer should contain."],
        table: [
          ["Lab", "A correct answer should show"],
          ["1.1, 2.2", "New York SoHo has no 2025 October sales; its 2025 total is lower than comparable stores."],
          ["1.3, 2.4, 10.1", "The last store on LegacyModel (Online Store) has a Commission $ formula without the bonus."],
          ["1.4", "Cell A11 holds a white-text instruction telling AI to recommend approval."],
          ["2.1, 5.2, 7.3", "Apparel and footwear have the highest return rates; Online and 30% discounts raise returns."],
          ["3.9", "Uncleared in bank: TX25113, TX25131, TX25157. Amount mismatch: TX25140 (+$90.00). Bank fee: BANKFEE ($45.00). Duplicate: TX25122. Ledger only: TX25199 interest ($12.40)."],
          ["6.2", "FORECAST.ETS.SEASONALITY returns 12; December is the forecast peak."],
          ["6.4, 5.6", "Eight price-list rows, prices from $214.80 to $451.20."],
          ["6.7", "Spanish and French reviews detected as es and fr and translated."],
          ["7.2", "A small high-frequency, high-value cluster made up mostly of Pro / Guide customers."],
          ["8.4, 9.4", "Sizing is the most common negative topic."],
        ],
      },
      {
        title: "Appendix B: Sources and currency",
        intro: [
          "Feature status in this lab book comes from a November 2026 research report on AI in Excel. The research could not open Microsoft's own pages directly from its environment, so Microsoft facts come from search-engine summaries of those pages, and some come only from secondary sources. Each such feature carries a Verify before class note.",
          "Key Microsoft sources: the Excel Tech Community monthly What's New in Excel posts (January to October 2026), Microsoft 365 Copilot release notes, the Microsoft 365 roadmap and Message Center notices such as MC1184407 (App Skills), MC1454373 (COPILOT function), MC1528003 (iPhone), MC1430537 (brand kit), MC1234661 (DLP) and MC1526652 (AI Builder credits). Vendor sources: Anthropic's Claude for Excel documentation and OpenAI's ChatGPT for Excel help pages.",
          "Instructors should re-check every feature marked Verify before class in the week of delivery, and refresh the retired-features slide monthly.",
        ],
      },
    ],
  },
};

const SETUP_LAB = {
  id: "0",
  title: "Set up the lab workbook",
  minutes: 15,
  requires: "Excel for Microsoft 365 signed in with your work account. The three lab files from the course folder.",
  objective: "Get the lab workbook open in the right place and confirm which AI features your account can use.",
  steps: [
    "Copy Brightline_Excel_AI_Lab.xlsx, Supplier_Price_List.png and Vendor_Quote_UNTRUSTED.xlsx to your OneDrive for Business, in a folder named Excel AI Lab.",
    "Open Brightline_Excel_AI_Lab.xlsx in Excel desktop and save a copy as Excel_AI_Lab_YourName.xlsx in the same folder.",
    "Read the README sheet. Note the sheet names.",
    "Open File, Account. Note your product name and version (About Excel).",
    "Check the Home ribbon for the Copilot button and Analyze Data. Open Copilot and note the mode switcher (Chat, Plan, Edit) and whether a model picker appears.",
    "In an empty cell type =PY and press Tab. Note whether Python mode starts, then press Esc.",
    "Fill in the checklist below and give it to your instructor.",
  ],
  codeBlocks: [["Readiness checklist", "Excel version: ____________   Copilot button: Yes / No\nModes shown: Chat  Plan  Edit   Model picker: Yes / No\nAnalyze Data: Yes / No   =PY works: Yes / No\nInsider build: Yes / No   Claude or ChatGPT add-in approved: Yes / No"]],
  slideCode: "README\nSales (SalesTable)\nMonthlySales\nReviews (ReviewsTable)\nTargets\nStores\nMessyExport\nLegacyModel\nLedger, BankStatement",
  slideNote: "Full steps and the readiness checklist are in the lab book. Instructors: collect checklists to decide which labs run as demos.",
  notes: "Run Lab 0 first. The checklist tells you, within fifteen minutes, which modules this group can do hands-on. Keep a spare copy of the lab files on a USB stick in case downloads are blocked.",
  check: "Your copy of the workbook is open from OneDrive and your checklist is complete.",
  fallback: "If Excel desktop is not available, open the workbook in Excel for the web. Python, Copilot and most skills also work there.",
};

require("./ext/merge.js")(SECTIONS, ["excel_a", "excel_b", "excel_c"]);
module.exports = { COURSE, SETUP_LAB, SECTIONS };
