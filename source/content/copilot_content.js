// AI with Copilot - course framing. Three days, six modules.
const SECTIONS = [1, 2, 3, 4, 5, 6].map(i => require(`./cp_m${i}.js`));
const n = SECTIONS.reduce((a, s) => a + s.concepts.length, 0);

const COURSE = {
  title: "AI with Microsoft Copilot",
  subtitle: "Copilot for Business: prompting, Copilot in Microsoft 365, and agents",
  label: "AI with Copilot",
  footer: "Copilot for Business",
  noun: "module",
  tagline: `Three days, six modules, ${n} topics, one lab for each`,
  welcomeNotes: `Welcome. This is a three-day course. Day 1 is prompting: modules 1 and 2. Day 2 is Copilot in Outlook, Teams, Word, PowerPoint, Excel, OneDrive and SharePoint: modules 3 and 4. Day 3 is agents and Copilot for business: modules 5 and 6. Each topic has an explanation slide, a demo in these notes and a lab with the same number in the lab book.\n\nNames changed in August 2026: Microsoft 365 Copilot is now called Microsoft Copilot, and Copilot Chat is Microsoft Copilot Chat. Expect learners to see both names. Slides with an amber Verify before class strip describe features that are new, renamed, rolling out or confirmed only by secondary sources. Test each one in the training tenant the week before delivery.\n\nAsk the room: who has a paid Copilot licence? Who uses Copilot every day? Who has built an agent? Calibrate from that.`,
  rules: [["FiLink", "Check the sources", "Open at least one citation and check it says what Copilot claims."], ["FiHash", "Check the numbers", "Find every figure and date in a source document before you use it."], ["FiEyeOff", "Look for invention", "Names, quotes or facts you cannot find in a source do not go out."], ["FiShield", "Own it", "The person who sends it is accountable for it, whoever drafted it."]],
  sectionsTitle: "Three days, six modules",
  sectionsNotes: "Day 1: modules 1 and 2, prompting. Most labs work in free Copilot Chat. Day 2: modules 3 and 4, Copilot in the apps. Most labs need the paid licence. Day 3: modules 5 and 6, agents and business. Labs 5.5, 5.8 and 5.9 need Copilot Credits or Copilot Studio access set up by an admin.",
  needs: [
    ["A work account with Copilot Chat (free)", "Modules 1 and 2, and every lab in module 6.", "FiMonitor"],
    ["A paid Copilot licence (Microsoft 365 Copilot)", "Modules 3 and 4, and labs 5.2 to 5.7. Unlicensed learners pair up.", "FiZap"],
    ["Teams with transcription and Loop", "Labs 3.3 to 3.5 and 4.5. Facilitator and Interpreter enabled by the Teams admin.", "FiVideo"],
    ["A SharePoint training site", "Brightline Retail Ops site with the handbook, policy and agreements, for labs 5.6 and 5.7.", "FiServer"],
    ["Copilot Credits billing", "Cowork (lab 5.5), and agents used by unlicensed learners.", "FiCreditCard"],
    ["Copilot Studio environment", "Labs 5.8 to 5.10. A Power Platform environment with Copilot Studio access or trials.", "FiSliders"],
    ["Admin for demos", "Purview, SharePoint admin and the Copilot Dashboard in labs 6.1 and 6.3.", "FiShield"],
  ],
  needsNotes: "This slide summarizes the Copilot readiness call. Send the Email Pack to every learner and set up the SharePoint site at least two days before class.",
  dataTitle: "The lab pack has answers planted for Copilot to find",
  dataItems: [
    ["FiAlertTriangle", "A flawed draft", "The Q3 Returns Review draft has three planted errors: Apparel 21% (really 18%), Online lowest (really highest), SoHo 1 November (really 3)."],
    ["FiVideo", "A meeting", "A role-play script and transcript with three actions, one proposal and one parked question."],
    ["FiMail", "Four email threads", "A buried ask, a changed date, a late delivery and a suspicious email with hidden instructions."],
    ["FiFileText", "Two contracts", "The 2025 and 2026 Summit Packs agreements differ in six places, including a 5% late-delivery credit."],
    ["FiBook", "Knowledge sources", "A store handbook and a returns policy for agents to answer from."],
    ["FiGrid", "Sales data", "The Brightline workbook, with planted return drivers, a store closure and anomalies for Analyst."],
  ],
  dataNotes: "Files are in the course Lab Files folder: the lab pack Word documents and Brightline_Retail_Sales.xlsx. The lab book appendix has the answer key.",
  rolloutTitle: "Before you roll this out in your team",
  rollout: [
    ["FiShield", "Fix permissions", "Check oversharing and labels before Copilot finds them (lab 6.1)."],
    ["FiBookmark", "Share prompts", "Build a team prompt library from day one (lab 2.9)."],
    ["FiCpu", "One agent", "Start with one well-tested agent on clean sources (labs 5.7 and 5.10)."],
    ["FiTrendingUp", "Measure", "Time one task before and after and report it (lab 6.3)."],
  ],
  rolloutNotes: "These four steps are the practical takeaway for a sponsor. Offer the Day 0 Copilot readiness guide as the starting point.",
  thanks: "Lab book, lab pack and readiness guide: see the course folder.",
  lb: {
    dataLine: "Lab pack: nine Word documents and Brightline_Retail_Sales.xlsx. All companies, people and data are fictional.",
    intro: [
      "This course runs over three days. Day 1 (modules 1 and 2) is prompting. Day 2 (modules 3 and 4) is Copilot inside Outlook, Teams, Word, PowerPoint, Excel, OneDrive and SharePoint. Day 3 (modules 5 and 6) is agents and Copilot for business.",
      "Every topic has three parts. The slide explains what it is, how it works and why it exists. The instructor demonstrates it live. Then you do this lab. Lab numbers match slide numbers.",
      "Microsoft renamed its Copilot products in August 2026: Microsoft 365 Copilot became Microsoft Copilot, and Copilot Chat became Microsoft Copilot Chat. This book says Copilot Chat for the free version and the paid licence for the paid one.",
      "Labs with an amber Verify before class box describe features that were new, renamed, rolling out or confirmed only by secondary sources when this book was written in November 2026. Your instructor checks them in the training tenant first; some will run as demos.",
      "Do Lab 0 first. One rule runs through the whole book: Copilot drafts, you verify. Each lab ends with a check. Do not skip it.",
    ],
    dataHeading: "What is in the lab pack",
    dataNotes: [
      "Brightline_Q3_Returns_Review_DRAFT.docx: a weak draft with three planted errors. Apparel is given as 21% in the summary and 18% in the table, Online is called the lowest return channel when it is the highest at 16.5%, and SoHo is said to have reopened on 1 November when it reopened on 3 November.",
      "Weekly_Returns_Review_Meeting_Script.docx and Weekly_Returns_Review_Transcript.docx: a meeting with three actions (size guide, Marcus Lee, 20 November; finance check, Priya Shah, Tuesday; SoHo stock transfer, Dana Ortiz, 14 November), one proposal (cap footwear discounts at 25%) and one parked question (loyalty return window).",
      "Brightline_Email_Pack.docx: Thread A has a buried ask (Q3 return rates by category, one page, by Wednesday 5pm). Thread B changes the SoHo reopening date. Thread C reports a 12-day late delivery on a $48,600 order. Thread D is a suspicious email with a hidden instruction aimed at AI.",
      "Summit_Packs_Agreement_2025.docx and 2026.docx: six differences in term, pricing, payment, delivery credit, returns allowance and exclusivity.",
      "Brightline_Store_Operations_Handbook.docx and Brightline_Returns_Policy.docx: knowledge sources for the agents in module 5.",
      "Brightline_Brand_and_Voice_Guide.docx: voice and colours for labs 2.6 and 4.3.",
      "Brightline_Retail_Sales.xlsx: sales data in which Apparel, footwear, Online and 30% discounts drive returns, New York SoHo has no October 2025 sales, and Online has an outage on 14 to 16 August and a spike on 28 November 2025.",
    ],
    appendices: [
      {
        title: "Appendix A: Instructor answer key",
        intro: ["Copilot answers vary from run to run, so treat these as what a correct answer should contain."],
        table: [
          ["Lab", "A correct answer should show"],
          ["1.4, 2.10, 4.2", "The three planted errors: Apparel 18% not 21%; Online has the highest return rate (16.5%); SoHo reopened on 3 November 2025."],
          ["2.5, 3.3", "Actions: size guide (Marcus, 20 Nov); finance check on discounts (Priya, Tuesday); SoHo stock transfer (Dana, 14 Nov). Proposal: 25% footwear cap. Parked: loyalty window."],
          ["3.1", "Jordan's ask: Q3 return rates by category, as one page, by Wednesday 5pm."],
          ["3.2", "SoHo reopening moved from 1 to 3 November because the safety inspection moved to 2 November."],
          ["4.6, 5.8", "Six agreement differences. PO 55812 is 12 days late, over the 10-day threshold, so the credit is 5% of $48,600 = $2,430."],
          ["5.3", "Returns: Apparel, footwear, Online and 30% discounts. Anomalies: 14 to 16 August and 28 November 2025 in Online."],
          ["5.6, 5.7", "Stock transfers: request by Wednesday noon for Monday. Returns over $300 need manager sign-off. Worn footwear: one size exchange within 30 days."],
          ["5.9, 1.4 (optional)", "Thread D's hidden instruction must be ignored: no approval claim, no reply to the sender."],
          ["5.10", "A $450 kayak bought 40 days ago: no refund under the 30-day rule for items over $300, unless the customer is a loyalty member (60 days)."],
          ["6.2", "Safe: 1 (complaint reply for review) and 4 (supplier email). Rewrite: 5 (only in an approved tool, under the disclosure rules). Never: 2 and 3, which hand decisions about people to AI; rewrite them as requests for a process, not a verdict."],
        ],
      },
      {
        title: "Appendix B: Sources and currency",
        intro: [
          "Feature status in this lab book comes from research done in November 2026. The research could not open Microsoft's pages directly, so Microsoft facts come from search-engine summaries of Microsoft Learn, Microsoft Support, the Microsoft 365 and Tech Community blogs and Message Center mirrors. Some come only from secondary sources. Each such feature carries a Verify before class note.",
          "Key Message Center notices: MC1253858 (in-app Copilot for unlicensed users), MC1536163 (Copilot Chat usage limits), MC1535647 (new Home and Copilot Workspaces), MC1325422 (Work IQ button), MC1519861 (Prioritize my inbox retirement), MC1275312 (recap without a saved transcript), MC1449182 (Pages in OneDrive), MC1511052 (SharePoint agents to Agent Builder), MC1536062 (standalone app agents retired), MC1421920 (Surveys agent retirement) and MC1493223 (Skills in Copilot Chat).",
          "Instructors should re-check every feature marked Verify before class in the week of delivery, especially names, model options, prices and limits.",
        ],
      },
    ],
  },
};

const SETUP_LAB = {
  id: "0",
  title: "Set up your Copilot lab",
  minutes: 15,
  requires: "A work account signed in to Microsoft 365. The lab pack from the course folder.",
  objective: "Get the lab pack in the right place and find out which Copilot features your account can use.",
  steps: [
    "Create a folder named Copilot Lab in your OneDrive for Business.",
    "Copy the nine lab pack documents and Brightline_Retail_Sales.xlsx into it.",
    "Check that the four Email Pack threads have arrived in your inbox. If not, tell your instructor.",
    "Open copilot.cloud.microsoft. Note the Basic or Premium label, the Work IQ button and the model picker options.",
    "Open Word, PowerPoint, Excel, Outlook and Teams and note where the Copilot button appears.",
    "Open Agents in the Copilot app and note whether Researcher, Analyst and Cowork are listed.",
    "Fill in the checklist below and give it to your instructor.",
  ],
  codeBlocks: [["Readiness checklist", "Copilot label: Basic / Premium   Work IQ button: Yes / No\nModel picker: Auto  Quick response  Think deeper  Other: ______\nCopilot in Word / PowerPoint / Excel / Outlook / Teams: Y / N each\nResearcher / Analyst / Cowork listed: Y / N each\nEmail Pack received: Yes / No   SharePoint training site opens: Yes / No"]],
  slideCode: "OneDrive > Copilot Lab\n  Brightline_Q3_Returns_Review_DRAFT\n  Weekly_Returns_Review_Script\n  Weekly_Returns_Review_Transcript\n  Brightline_Email_Pack\n  Summit_Packs_Agreement_2025 / 2026\n  Store_Operations_Handbook\n  Returns_Policy, Brand_and_Voice_Guide\n  Brightline_Retail_Sales.xlsx",
  slideNote: "Full steps and the readiness checklist are in the lab book. Instructors: collect checklists to decide who pairs up for Day 2 and which labs run as demos.",
  notes: "Run Lab 0 first. The checklist tells you, within fifteen minutes, who has the paid licence. Pair each unlicensed learner with a licensed one for Day 2.",
  check: "The lab pack is in OneDrive, the emails have arrived and your checklist is complete.",
  fallback: "If OneDrive is not available, upload the files to Copilot Chat when each lab needs them.",
};

module.exports = { COURSE, SETUP_LAB, SECTIONS };
