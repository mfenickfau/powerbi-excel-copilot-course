# AI for Business Training: Power BI, Excel and Microsoft Copilot

Three instructor-led courses that teach business users to use AI in the Microsoft tools they already work in. Every topic follows the same pattern:

1. **Explain**: one slide on what the feature is, how it works and why it exists.
2. **Demo**: a live demo script in the speaker notes.
3. **Lab**: a hands-on lab with the same number in the lab book, with a check at the end and a fallback if the feature is not available.

All labs use **Brightline Outdoor Co.**, a fictional US outdoor-gear retailer, with synthetic data that has patterns planted for the AI to find. Feature status was researched in November 2026; slides with an amber *Verify before class* strip mark features that are new, renamed, in preview or rolling out.

## Courses

| Course | Length | Modules | Topics and labs |
|---|---|---|---|
| [AI in Power BI](power-bi/) | Two to three days | 5 | 41 |
| [AI in Excel](excel/) | Two to three days | 11 | 85 |
| [AI with Microsoft Copilot](copilot/) | Three days | 6 | 43 |

## Repository layout

```
power-bi/  excel/  copilot/
  00-start-here/        intro and closing deck, Lab 0, answer key
  NN-module-name/
    slides/             module deck (.pptx), demo scripts in speaker notes
    handouts/           lab book for the module (.docx) and lab documents
    workbooks/          data files used in the labs
  full-course/          complete deck and lab book
datasets/               Brightline workbooks for five business domains (retail, finance, HR, marketing, operations)
source/                 Node and Python builders, course content and data generators
```

## Rebuilding the materials

The decks and lab books are generated from the content files in `source/content/`. To rebuild, copy `source/builders` and `source/content` into one folder, then:

```bash
npm install pptxgenjs docx react react-dom react-icons sharp
node build_course_deck.js ./copilot_content.js AI_with_Copilot.pptx
node build_course_labbook.js ./copilot_content.js AI_with_Copilot_Lab_Book.docx
```

Set `ONLY=intro,wrap` or `ONLY=3` to build one module. Set `BRAND` and `WORDMARK` to change the footer branding.

## Notes

- Brightline Outdoor Co., its people and all data are fictional.
- Microsoft, Power BI, Excel, Copilot and related names are trademarks of Microsoft. This is independent training material, not Microsoft documentation.
