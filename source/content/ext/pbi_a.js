module.exports = {
  labs: {
    "1.1": {
      title: "Test the limits of grounding",
      minutes: 15,
      objective: "Push Copilot with questions it can and cannot answer from the Brightline model, and log which answers you could verify.",
      steps: [
        "Open your published AI_Lab report in the browser and open the Copilot pane.",
        "Ask: Which store had the largest drop in sales in October 2025? Then ask: Why might that be? Note whether Copilot gives a reason the data cannot support.",
        "Ask an ambiguous question: How did sales do last year? Note which year Copilot assumed and whether it said so.",
        "Ask a question the model cannot answer: What was Brightline's profit margin in 2025? Note whether Copilot declines, asks for more detail or guesses.",
        "Ask: Summarize the Online store's performance in three bullets for a regional manager. Click every citation in the answer.",
        "Back in Desktop, build a table visual with StoreName, YearMonth and Total Sales, filtered to 2025-10 and 2025-11, to check the October answer.",
        "Write a short log with four columns: question, answer, source cited, verified (yes, no or cannot verify)."
      ],
      check: "Copilot names New York SoHo with no October 2025 sales and cannot know about the renovation, your table shows SoHo blank in October and back in November, and the profit question is declined or flagged because the model has no cost data."
    },
    "1.2": {
      title: "Build a merchandising page by iteration",
      minutes: 20,
      objective: "Generate a returns page for a second audience, refine it with follow-up prompts and hand edits, and check that it tells the right story.",
      steps: [
        "In Desktop, open AI_Lab_YourName.pbix, add a blank page and open the Copilot pane. Click Suggest content and note the page ideas it offers.",
        "Type: Create a page for the merchandising team showing Return Rate by Category and by ProductName for 2025, with a Region slicer and a card for Returned Lines.",
        "Read the page. Write down anything Copilot added that you did not ask for and anything it left out.",
        "On the same page, ask Copilot a follow-up to change it, for example: Sort the product chart by Return Rate from highest to lowest.",
        "Fix at least two more things by hand: titles that say what the reader learns, consistent percentage format, or a visual you do not need.",
        "Open the Copilot pane on this page and ask: Which category has the highest return rate? Check that the answer matches the chart.",
        "Rename the page Returns view and save."
      ],
      check: "A Returns view page where the category chart shows Apparel with the highest Return Rate and the product chart is sorted with footwear and Apparel items near the top. You have a list of what Copilot added or missed."
    },
    "1.3": {
      title: "Compare summaries across filter states",
      minutes: 10,
      objective: "Test how report and visual summaries respond to different filters, then turn one into a manager-ready message.",
      steps: [
        "Open your published report in the browser. Set the Year slicer to 2024 (add one in Desktop and republish if your page has none) and click Summarize. Copy the result.",
        "Set the Year slicer to 2025 and the Region slicer to Northeast. Click Summarize again. Note whether it mentions October 2025.",
        "Open the header of the monthly sales chart and choose Summarize with the same filters. Note whether the visual summary points to New York SoHo or only to a dip.",
        "Clear the filters. Open the Copilot pane and type: Summarize this page in three bullets for a regional manager. Lead with the biggest change compared with last year.",
        "Compare the custom summary with the Summarize button result. Note which one you would send.",
        "Edit the better summary into a four-line email, and check every number in it against a card or visual."
      ],
      check: "Three summaries saved for different filter states, a Northeast 2025 summary that shows the October dip, and a four-line email with every number checked."
    },
    "1.4": {
      title: "Tune and stress-test a narrative",
      minutes: 15,
      objective: "Rewrite the narrative prompt for a different job, limit its source to chosen visuals, and test it against filter states where the story changes.",
      steps: [
        "On the page with your narrative from Part A, edit the prompt to: List the top and bottom store by sales and give the gap in dollars. Update the narrative.",
        "Build a table visual with StoreName and Total Sales sorted from highest to lowest. Check the top store, the bottom store and the gap.",
        "Change the narrative source from the whole page to only two visuals you choose. Update it and note what it no longer mentions.",
        "Set the Region slicer to Northeast and filter the page to October 2025. Read the narrative and note whether it explains New York SoHo correctly or invents a cause.",
        "Edit the prompt to: In two sentences, summarize return rate and the category driving it. Avoid jargon. Select Online in the Region slicer and update.",
        "Add one line to the prompt that stops a mistake you saw, for example: Describe only what the data shows. Do not give reasons. Update and compare.",
        "Save the file with the version of the prompt you would keep."
      ],
      check: "The store gap in the narrative matches your table, the October Northeast state shows SoHo with no sales, and the Online return-rate narrative names Apparel or footwear as a driver."
    },
    "1.5": {
      title: "Write harder measures and test edge cases",
      minutes: 20,
      objective: "Use Copilot to write three harder measures, test their edge cases and correct any that are wrong.",
      steps: [
        "In Desktop, open a table visual with 'Date'[Year] and your year-over-year measure from Part A. Check that 2024 shows blank, not an error or 100%.",
        "In Table view, look at Sales[Discount] and note whether 30% is stored as 0.3 or 30.",
        "Ask Copilot: Create a measure named Return Rate High Discount that calculates Return Rate only for order lines where Sales[Discount] is 30% or more. Read the DAX and check it uses the format you found.",
        "Ask Copilot: Create a measure named Online Share 2025 that divides Total Sales for the Online Store by Total Sales for all stores, for 2025. Read how it removes the store filter.",
        "Build a table with Region, Online Share 2025 and Return Rate High Discount. If a value looks wrong, describe the problem to Copilot and ask for a corrected measure.",
        "Build a hand check: a card with Return Rate, filtered on the Filters pane to Sales[Discount] at 30% or more. It should match Return Rate High Discount.",
        "Write down which of the three measures needed a correction and what the correction was."
      ],
      check: "The year-over-year measure is blank for 2024, Return Rate High Discount matches the filtered card and is higher than the overall Return Rate, and Online Share 2025 shows the same value in every Region row unless you chose to keep the Region filter."
    },
    "1.6": {
      title: "Audit measures with DAX queries",
      minutes: 15,
      objective: "Use Copilot in DAX query view to audit the measures and patterns from earlier labs and save the queries for reuse.",
      steps: [
        "In DAX query view, open a new tab and ask Copilot: Show Net Sales 2025 and Net Sales 2025 Hand by Region, with a column for the difference. Run it.",
        "Ask: Show Total Sales by month for New York SoHo in 2025. Run it and look at October and November.",
        "Ask: Show Return Rate and Order Lines by Category and by Stores[Channel] for 2025, sorted by Return Rate. Run it.",
        "Ask: Show Return Rate by Sales[Discount]. Run it and note the discount level with the highest rate.",
        "Edit one query by hand to add a column, such as Returned Lines, and run it again. If it fails, ask Copilot to fix it.",
        "Rename each query tab with what it checks, for example Audit Net Sales, and save the file so the queries stay with the model."
      ],
      check: "The difference column is zero for every Region, SoHo shows no October 2025 sales and recovers in November, Apparel and Online have the highest return rates, and the 30% discount has the highest rate by discount."
    },
    "1.7": {
      title: "Document new measures and test them",
      minutes: 10,
      objective: "Add descriptions to the measures and key columns you created in earlier labs, then test whether Copilot uses them.",
      steps: [
        "In Model view, select Net Sales 2025 and choose Create with Copilot under Description. Edit the draft so it says returns are excluded and the year is fixed at 2025.",
        "Repeat for your year-over-year measure and any measure you added in lab 1.5. Say what happens when there is no prior year.",
        "Select the column Stores[Region] and write a description by hand: Online is a channel and also appears as its own Region.",
        "Write a description by hand for Sales[Returned]: Yes means the order line was returned.",
        "Open the Copilot pane and ask: What does Net Sales 2025 measure? Compare the answer with your description.",
        "Save and publish the file to the training workspace so the descriptions are available in the browser."
      ],
      check: "At least three more measures and two columns have business-language descriptions, and Copilot's explanation of Net Sales 2025 matches your description."
    },
    "1.8": {
      title: "Review, reject and reconcile web edits",
      minutes: 15,
      objective: "Ask web modeling Copilot for a mix of good and bad changes, reject the bad ones, and bring the web edits back in line with your Desktop file.",
      steps: [
        "In the browser, open your semantic model with Open data model and open Copilot.",
        "Ask: Create a measure named Online Share of Sales that divides Total Sales for the Online Store by Total Sales for all stores. Review the DAX before you accept it.",
        "Ask: Add a description to Average Line Value that a sales manager would understand. Edit it if needed, then accept.",
        "Ask: Create a relationship between Targets and Sales. Read the proposal, then reject it, because the lab model keeps Targets unrelated.",
        "Open the report on this model and build a card with Online Share of Sales. Compare it with Online Share 2025 from lab 1.5 if you made it.",
        "Write down every change you made in the browser. Repeat them in AI_Lab_YourName.pbix in Desktop so that republishing from Desktop does not remove them.",
        "If web modeling or its Copilot is missing, make steps 2 to 4 in Desktop with Copilot instead and note which route needed fewer clicks."
      ],
      check: "Online Share of Sales and the Average Line Value description are live in the published model, no Targets relationship exists, and your Desktop file has the same changes."
    },
    "1.9": {
      title: "Answer questions across your workspace",
      minutes: 10,
      objective: "Use standalone Copilot to find items and answer harder questions, then verify one answer against a query you already trust.",
      steps: [
        "On Power BI Home, open Copilot and ask: Which reports and semantic models can I access that include return rate?",
        "Ask: Which store had the lowest sales in October 2025? Note which item Copilot used to answer.",
        "Ask: Compare the return rate of the Online Store with the average of the other stores in 2025.",
        "Ask: Did Brightline meet its 2025 targets? Note whether Copilot used the Targets table and how it described the result.",
        "Check the Online comparison against your Return Rate by Channel query from lab 1.6 Part B, or a table visual in Desktop.",
        "If standalone Copilot is not available, ask steps 2 to 4 in the report's Copilot pane and note what context you had to add."
      ],
      check: "Copilot found the AI_Lab model, named New York SoHo for October 2025, and gave an Online return rate higher than the store average that matches your query."
    },
    "1.10": {
      title: "Prepare for a meeting on mobile",
      minutes: 10,
      objective: "Use Copilot on your phone to prepare a short briefing with a filter applied, and check it on a larger screen.",
      steps: [
        "Open the AI_Lab report in the Power BI mobile app and go to the Regional view page.",
        "Set the Region slicer to Northeast on your phone.",
        "Tap Copilot and ask: Summarize this page in three bullets for a regional manager.",
        "Follow up with: Which store in this region had the weakest October 2025? Tap the cited visual.",
        "Copy the answer or take a screenshot, and share it to yourself by email or Teams.",
        "On your laptop, open the same page with the same filter and check one number from the phone answer."
      ],
      check: "A three-bullet Northeast briefing from your phone that names New York SoHo for October 2025, with one number matched on the laptop.",
    },
    "1.11": {
      title: "Tailor a subscription for a manager",
      minutes: 10,
      objective: "Create a filtered subscription with a Copilot summary for a specific reader and compare it with your manual summary.",
      steps: [
        "Open the Regional view page in the browser and set the Region slicer to West.",
        "Choose Subscribe to report and create a second subscription to yourself that keeps the current filter, with the Copilot summary option on.",
        "Set a schedule a West regional manager would want, such as Monday at 8 a.m., then use Send now.",
        "Compare the West email with the unfiltered email from Part A. Note whether the summary follows the filter.",
        "Compare the West summary with the Summarize result for West from lab 1.3. Note any number that differs.",
        "Open Manage subscriptions and turn off or delete any subscription you do not want to keep.",
        "If the summary option is missing, send the filtered subscription without it and paste the West Summarize result into a reply to the email."
      ],
      check: "Two subscription emails, one filtered to West with a summary that mentions only West figures, and one number checked against the report."
    },
    "1.12": {
      title: "Run a second goal and audit it",
      minutes: 20,
      objective: "Give the agent a goal for a different team with your own review rules, then test, keep or roll back each change.",
      steps: [
        "Open your report in edit mode and start the agent experience from the Copilot pane.",
        "Enter the goal: Build a page for the store operations team comparing Total Sales by store and by month for 2025, with a Region slicer, and point out stores with unusual months.",
        "Before approving, add a step to the plan: Add a business description to every new measure. Remove or change any step that edits a measure you already trust.",
        "Approve and let the agent run. Check that New York SoHo October 2025 is shown as unusual.",
        "Write the agent's changes into a change log: each measure, model change and page, with keep or remove.",
        "Remove one change you do not want and confirm the report still works.",
        "Check one new measure with a DAX query from lab 1.6, then save the file."
      ],
      check: "A store operations page that flags New York SoHo in October 2025, every new measure with a description, a change log, and one measure verified by a query."
    },
    "1.13": {
      title: "Compare answers across Copilot surfaces",
      minutes: 10,
      objective: "Ask the same questions in Microsoft 365 Copilot, the report Copilot pane and standalone Copilot, and record how the answers differ.",
      steps: [
        "In Microsoft 365 Copilot, ask: Which store had the largest drop in sales in October 2025?",
        "Ask the same question in the report's Copilot pane and in standalone Copilot on Power BI Home.",
        "Ask in all three: What share of 2025 sales came from Online?",
        "Make a table with one row per question and one column per surface. Record the answer, the source link and whether it matches.",
        "In Microsoft 365 Copilot, ask: Draft a two-line Teams message for the merchandising team with the 2025 return rate by category. Check every number.",
        "If Microsoft 365 Copilot is not available to you, fill only the report and standalone columns and note what you would expect the third to add."
      ],
      check: "A comparison table where all surfaces name New York SoHo and give the same Online share, plus a Teams draft with checked numbers."
    },
    "1.14": {
      title: "Build and use a readiness checklist",
      minutes: 15,
      objective: "Turn the troubleshooting checklist into a working diagnostic for your own team and test it in a role-play.",
      steps: [
        "Create a table in Word or Excel with columns: Check, Where to look, Who can check, Result for our team.",
        "Add one row for each item on the slide checklist: capacity type, tenant setting, trial capacity, cross-geography setting, view-only default and Desktop account.",
        "Fill the Result column for your training workspace: capacity name and type from License info, and your role from Manage access.",
        "In Desktop, open File, Account and record which account is signed in. Add the result to the table.",
        "Role-play in pairs: one person states a symptom, such as Copilot works in the browser but not in Desktop. The other uses the checklist to name the likely cause.",
        "Swap roles and run two more symptoms. Add any check you were missing to the table.",
        "Save the checklist as Copilot_Readiness_YourName so you can send it to your IT team with the questions from Part A."
      ],
      check: "A checklist with at least six rows, your workspace's results filled in, and three role-play symptoms diagnosed. The Desktop-only symptom should point to the signed-in account."
    }
  },
  challenges: {
    "1": {
      title: "Monthly returns briefing for merchandising",
      minutes: 50,
      scenario: "Brightline's head of merchandising wants to understand what drives returns before the next buying cycle. She asks for one report page, a short written briefing with numbers she can trust, and a weekly email so she does not have to open the report. You have one session to deliver it with Copilot, and every number must be checked.",
      steps: [
        "Open your published report and use the Copilot pane to ask three scoping questions about returns by category, product, store and discount. Save the answers.",
        "In Desktop, ask Copilot to write two measures: Return Rate 2025 and Return Rate High Discount. Read the DAX before adding them.",
        "In DAX query view, use Copilot to write a query that checks both measures by Category and by Stores[Channel]. Fix any measure that disagrees with a hand-built filter.",
        "Add business-language descriptions to both new measures with Create with Copilot.",
        "Create a page from a prompt for the merchandising team showing Return Rate by Category, ProductName and StoreName for 2025, with a Region slicer. Fix at least two things by hand.",
        "Add a Copilot narrative visual with the prompt: In two sentences, summarize return rate and the category driving it. Avoid jargon.",
        "Publish, click Summarize on the ribbon, and edit the result into a five-line briefing. Check every number against a visual or your query.",
        "Create a weekly subscription for the page with the Copilot summary option on, and use Send now.",
        "Write a short note listing which numbers you verified, how, and one thing Copilot got wrong or left out."
      ],
      deliverable: "A published Returns briefing page with documented measures, a checked five-line briefing, a working weekly subscription and a verification note.",
      check: "The page and briefing show Apparel with the highest return rate, Online above the other stores, and a higher return rate at 30% discount. The query results match the measures, and the verification note lists every number used."
    }
  }
};
