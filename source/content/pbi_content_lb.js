const base = require("./content.js");
const COURSE = Object.assign({}, base.COURSE, {
  noun: "section",
  needs: [
    ["Power BI Desktop only", "Section 3 in full, and labs 4.5, 4.6, 5.4, 5.5 and 5.6"],
    ["A Copilot-enabled capacity (Fabric F2 or larger, or Premium P1)", "Sections 1 and 2, except lab 1.13. Trial capacities do not include Copilot."],
    ["A Microsoft Fabric workspace", "Labs 4.1 to 4.4, 5.1 and 5.2"],
    ["A Microsoft 365 Copilot licence", "Lab 1.13, once an admin turns on the Power BI entry point"],
    ["Copilot Studio access", "Lab 5.2"],
  ],
  lb: {
    dataLine: "Lab data: Brightline_Retail_Sales.xlsx, a synthetic dataset. No real customers, people or companies appear in it.",
    intro: [
      "Every feature in the course has three parts. The slide explains what it is, how it works and why it exists. The instructor demonstrates it live. Then you do this lab. Lab numbers match slide numbers, so Lab 1.5 goes with slide 1.5.",
      "Each lab lists the time it takes and what it needs. Many AI features depend on licences and settings your organization controls, so every lab ends with what to do if the feature is not available to you.",
      "Do Lab 0 first. Every other lab assumes the Brightline model from Lab 0 is open in Power BI Desktop or published to your training workspace.",
      "One rule runs through the whole book: AI proposes, you verify. Each lab ends with a check. Do not skip it.",
    ],
    dataHeading: "Patterns planted in the lab data",
    dataNotes: [
      "Returns are driven by Apparel, footwear, the Online store and 30% discounts. Labs 3.1 and 4.2 should find this.",
      "New York SoHo has no sales in October 2025 because it was closed for renovation. Labs 1.1, 1.6, 3.2 and 3.5 should find this.",
      "The Online store had an outage from 14 to 16 August 2025, and Black Friday spiked sales on 29 November 2024 and 28 November 2025. Lab 3.3 should find both.",
      "Water products sell mostly from May to September. Labs 3.4 and 3.6 should show this.",
      "Pro / Guide customers buy more often and in larger quantities, and Gift Buyers rarely buy. Lab 3.7 should separate them.",
      "The Reviews sheet has about 500 reviews with star ratings. Most are in English, with some in Spanish and French. Sizing complaints cluster on Apparel and footwear.",
    ],
    appendices: [
      { title: "Appendix A: Brightline Returns Policy", intro: ["Use this document as a knowledge source in lab 5.2. It is fictional."], bullets: [
        "Customers may return most items within 60 days of purchase for a full refund to the original payment method.",
        "Footwear and apparel may be returned within 60 days if unworn, with tags attached. Worn items may be exchanged once for a different size within 30 days.",
        "Kayaks, paddles and other items over $300 must be returned within 30 days and inspected in store before a refund is issued.",
        "Items bought at 30% discount or more during Black Friday events may be returned for store credit only.",
        "Gift cards cannot be returned or refunded.",
        "Online orders can be returned by mail using the prepaid label in the order email, or in any Brightline store.",
        "Loyalty members receive an extra 30 days on every return window."] },
      { title: "Appendix B: Instructor answer key", intro: ["Expected findings on the Brightline Retail workbook. Copilot answers vary from run to run, so treat these as what a correct answer should contain."], table: [
        ["Lab", "A correct answer should show"],
        ["1.1, 1.6, 3.2, 3.5", "New York SoHo (Northeast) has no sales in October 2025, and November recovers."],
        ["1.5", "The Copilot and hand-built Net Sales 2025 measures match for every Region."],
        ["3.1", "Apparel, the four footwear products, the Online store and the 30% discount raise the chance of a return. Apparel is roughly four times the base rate."],
        ["3.3", "A dip on 14 to 16 August 2025 and a spike on 28 November 2025 in Online sales."],
        ["3.4", "A December peak in the forecast, and a strongly summer-shaped Water forecast."],
        ["3.6", "Water's sales are concentrated from May to September compared with other categories."],
        ["3.7", "A small high-frequency, high-value cluster dominated by Pro / Guide customers."],
        ["4.2, 4.4", "Sentiment rises with rating. Sizing is the most common negative topic and is concentrated on Apparel and footwear. Spanish and French reviews are detected."],
        ["5.6", "Safe: A, C, D, F and H. Rewrite as schema-only: B. Never in an unapproved tool: E and G."]] },
      { title: "Appendix C: Sources and currency", intro: ["Feature status in this lab book was checked against Microsoft's Power BI monthly feature summaries, the Power BI update archive on Microsoft Learn, and Microsoft's Q&A retirement notice (Message Center MC1218421), as of November 2026. Microsoft changes preview features often. Instructors should re-check every feature marked Preview or Check status before each delivery."] },
    ],
  },
});
module.exports = { COURSE, SETUP_LAB: base.SETUP_LAB, SECTIONS: base.SECTIONS };
