// Part B extensions and module challenges for AI with Microsoft Copilot, modules 1 to 3.
module.exports = {
  labs: {
    "1.1": {
      title: "Map the course to your licence",
      minutes: 10,
      objective: "Test the same three tasks in free Copilot Chat and the paid licence and record what changes.",
      steps: [
        "Pair with someone who has the other licence, or use one account and turn Work IQ off for the free view.",
        "In copilot.cloud.microsoft, both ask: What did Jordan Blake ask Priya to send before Thursday?",
        "Both upload Brightline_Q3_Returns_Review_DRAFT.docx and ask: What return rate does this give for Apparel?",
        "Both open Brightline_Q3_Returns_Review_DRAFT.docx in Word and look for the Copilot button.",
        "Record each result in a three-row table: task, free Copilot Chat, paid licence.",
        "Add one row for a task from your own job and say which licence it needs.",
        "If the labels or names on your screen differ from the lab book, note the names you see for your instructor."
      ],
      check: "A four-row table. Only the paid view answers the email question (Q3 return rates by category, one page, by Wednesday 5pm); both can read the uploaded draft, which gives Apparel as 21% in the summary and 18% in the table. If the Basic or Premium label is missing because of the August 2026 rename, use the Work IQ button to tell the views apart."
    },
    "1.2": {
      title: "Catch a source that is wrong",
      minutes: 15,
      objective: "Show that grounding repeats whatever the source says, and fix it by choosing a better source.",
      steps: [
        "In a new chat, ask: When did the SoHo store reopen? Note the date and the cited file.",
        "Ask again with / Brightline_Q3_Returns_Review_DRAFT and note the date.",
        "Ask again with / Brightline_Store_Operations_Handbook and note the date.",
        "Open both citations and find the sentence each answer came from.",
        "Ask: What are the Summit Packs payment terms? Check which agreement year the citation points to.",
        "Ask again naming / Summit_Packs_Agreement_2025 and / Summit_Packs_Agreement_2026, and ask for both terms side by side.",
        "Write two sentences: why the answers differed, and which source you would trust and why."
      ],
      check: "The draft gives 1 November and the handbook gives 3 November 2025. Payment terms are 45 days in 2025 and 60 days in 2026."
    },
    "1.3": {
      title: "Ask the same thing everywhere",
      minutes: 10,
      objective: "Ask one question in four places and explain why the answers differ.",
      steps: [
        "Write one question: What is the confirmed SoHo reopening date?",
        "Ask it in the Copilot app with Work IQ on, then with Work IQ off.",
        "Open Thread B of the Email Pack in Outlook and ask it in Copilot there.",
        "Open Brightline_Q3_Returns_Review_DRAFT.docx in Word and ask it in the Copilot pane.",
        "Ask it in Copilot in the Teams left navigation.",
        "Add a column to your Part A table: what each place answered and which source it used.",
        "Circle the place you would use for this kind of question and say why."
      ],
      check: "Outlook and the app with Work IQ on give 3 November from Thread B; Word gives 1 November from the draft; with Work IQ off Copilot cannot answer. If the new Home layout has moved the Work IQ button or the in-app pane is missing, note where you found it or skip that row."
    },
    "1.4": {
      title: "Build a failure-spotting card",
      minutes: 15,
      objective: "Turn the four failure modes into a test you can rerun and a fix that works for each.",
      steps: [
        "Ask: List the six differences between / Summit_Packs_Agreement_2025 and / Summit_Packs_Agreement_2026. Count how many it finds.",
        "Run the same prompt in two more new chats and mark any difference that appears in one answer but not another.",
        "Ask: Quote the sentence from each agreement that supports each difference. Check every quote in the documents.",
        "Ask a question with no answer in the lab pack: Who signed the 2026 Summit Packs agreement? Note whether Copilot invents a name.",
        "For each of the four failure modes, write the prompt fix that worked best for you.",
        "Put the four modes and fixes on one card, using the Part A examples as the evidence.",
        "Swap cards with a neighbour and test one of their fixes."
      ],
      check: "The full answer lists term, pricing, payment, delivery credit, returns allowance and exclusivity. The agreements name no signatory, so any name Copilot gives is invented."
    },
    "2.1": {
      title: "Score and rebuild a prompt",
      minutes: 15,
      objective: "Score prompts against the four parts and rebuild the weakest one until the answer can go out unchanged.",
      steps: [
        "Write this weak prompt in Copilot Chat and run it: Tell the team about the supplier problem.",
        "Score it out of 4: one point each for goal, context, source and expectations.",
        "Rewrite it with all four parts. Use Thread C: PO 55812, $48,600 of daypacks, 12 days late, new date 24 January 2026. The audience is store team leads; keep it under 80 words.",
        "Run it and mark any sentence you would still need to change.",
        "Add the missing detail to the prompt, not to the answer, and run it again.",
        "Score the two prompts you wrote from real work in Part A the same way and fix any part that scored 0.",
        "Write the four-part prompt you are proudest of on a card."
      ],
      check: "The final supplier message names PO 55812, the 12-day delay and 24 January 2026, stays under 80 words, and needed no manual edits."
    },
    "2.2": {
      title: "Ground one answer in two files",
      minutes: 15,
      objective: "Name two sources in one prompt to answer a question neither file answers alone.",
      steps: [
        "Ask with no files named: Can a customer return a $450 kayak bought 40 days ago? Note the answer and sources.",
        "Ask again with / Brightline_Returns_Policy. Note what changes.",
        "Ask: Using / Brightline_Returns_Policy and / Brightline_Store_Operations_Handbook, list every step a store team member takes for a return over $300.",
        "Open each citation and mark which steps came from which file.",
        "Ask: Which of these steps appear in only one of the two files?",
        "Ask about the worn-footwear rule naming the wrong file: / Summit_Packs_Agreement_2026. Note what Copilot does.",
        "Write a rule of thumb for how many sources to name at once."
      ],
      check: "No refund at 40 days under the 30-day rule for items over $300 unless the customer is a loyalty member (60 days). Steps include in-store inspection and manager sign-off. The agreement has no footwear rule, so Copilot should say it cannot find one."
    },
    "2.3": {
      title: "Iterate a supplier reply",
      minutes: 15,
      objective: "Bring a reply to Alex Moreno to a sendable state with targeted follow-up prompts.",
      steps: [
        "Ask Copilot to draft a reply to Alex Moreno at Summit Packs about the late PO 55812, using / Summit_Packs_Agreement_2026.",
        "Check whether it mentions the late-delivery credit. If not, prompt: Add the credit the 2026 agreement gives for this delay, with the amount.",
        "Prompt: Make it firm but polite, and cut it to 120 words.",
        "Prompt: Explain how you calculated the credit. Check the sum yourself.",
        "Prompt: What would Alex push back on? Then prompt it to answer that point in the reply.",
        "Compare the first and last drafts and list what each follow-up changed.",
        "Write the one follow-up prompt you would use first next time."
      ],
      check: "The final reply says the delivery is 12 days late, over the 10-day threshold, and asks for a 5% credit of $2,430 on $48,600, in 120 words or fewer."
    },
    "2.4": {
      title: "Write for a hard audience",
      minutes: 15,
      objective: "Write one difficult message for two audiences and test it with role-play critics.",
      steps: [
        "Read the Black Friday section of Brightline_Q3_Returns_Review_DRAFT.docx and the 25% footwear cap proposal in the transcript.",
        "Ask Copilot to write a note about the 25% cap for store team members. Remind it this is a proposal pending Priya's finance check.",
        "Ask for the same note for Priya to send to finance.",
        "Ask: Act as a store manager who expects angry customers on Black Friday. What is missing from the store version?",
        "Ask: Act as a finance analyst. Which claims in the finance version need a number?",
        "Fix one point from each critique.",
        "Check that neither version calls the 25% cap a decision."
      ],
      check: "Two versions that both describe the cap as a proposal awaiting finance, each improved by one critique point. The store version mentions the store-credit-only rule for items bought at 30% off or more."
    },
    "2.5": {
      title: "Build a reusable format template",
      minutes: 10,
      objective: "Write a format template once and reuse it on a different source.",
      steps: [
        "Write a prompt that fixes the format: Return a table with columns Item, Type (Action, Proposal or Parked), Owner, Due date, Source line. No other text.",
        "Run it on / Weekly_Returns_Review_Transcript.",
        "Paste the table into a new sheet in Excel and check each column landed in its own column.",
        "Run the same prompt on Thread B of the Email Pack.",
        "Fix the prompt for anything that broke, such as empty owners or merged columns, and rerun both.",
        "Add one line to the prompt asking for Not stated where a field is missing.",
        "Save the final prompt for lab 2.9."
      ],
      check: "The transcript table has five rows: three actions, the 25% cap proposal and the parked loyalty window. The Thread B table includes the 3 November reopening and the 14 November stock return."
    },
    "2.6": {
      title: "Teach Copilot the house style",
      minutes: 15,
      objective: "Combine the voice guide with good and bad examples so Copilot matches the Brightline style without reminders.",
      steps: [
        "Write one sentence that breaks the guide, using words from the Avoid column: Consumers can submit an RMA for product SKUs.",
        "Write the same sentence in the Brightline voice using the Say column.",
        "Prompt: Write a 60-word notice telling customers that worn footwear can be exchanged once for a different size within 30 days. Match the good example, not the bad one, and follow / Brightline_Brand_and_Voice_Guide.",
        "Check the notice against the guide: short sentences, active voice, digits, no words from the Avoid column.",
        "Ask Copilot to list any line that breaks the guide, then fix it.",
        "Run the same prompt for a second notice about refunds taking up to 5 business days.",
        "Save the final prompt with both examples for lab 2.9."
      ],
      check: "Both notices say customers and return, use digits (30 days, 5 business days) and contain no words from the Avoid column."
    },
    "2.7": {
      title: "Run the chain on a contract",
      minutes: 20,
      objective: "Reuse the four-step chain on the supplier agreements and produce a checked one-page brief.",
      steps: [
        "Reference / Summit_Packs_Agreement_2025, / Summit_Packs_Agreement_2026 and Thread C of the Email Pack in one chat.",
        "Gather: ask for every term in each agreement as a two-column list.",
        "Organize: ask Copilot to mark each term Same or Changed and flag which changes affect PO 55812.",
        "Draft: ask for a one-page brief for Priya Shah on what changed and what to do about the late order.",
        "Check: ask Copilot to list any sentence in the brief that no source supports.",
        "Check the credit sum and the six changes yourself and fix anything wrong.",
        "Compare this chain with your Part A chain and note which step caught the most."
      ],
      check: "The brief names six changes (term, pricing, payment, delivery credit, returns allowance, exclusivity) and a credit of 5% of $48,600 = $2,430 because the order is 12 days late."
    },
    "2.8": {
      title: "Stress-test a policy decision",
      minutes: 15,
      objective: "Use reasoning prompts to test the parked loyalty-window question before next month's meeting.",
      steps: [
        "Reference / Brightline_Returns_Policy and the Q3 figures in / Brightline_Q3_Returns_Review_DRAFT.",
        "Ask: Give three options for the loyalty return window, including no change, with cost, risk and customer impact.",
        "Ask: List the facts from the files you used and the assumptions you made. Mark each assumption True, False or Unknown.",
        "Ask: Argue for the option you ranked last.",
        "Ask: What data would you need to decide this? Name the file or system where it might be.",
        "Switch the model picker to Think deeper and rerun the options prompt. Compare.",
        "Write a two-sentence note for Priya's next meeting."
      ],
      check: "The options start from the current rule: loyalty members get an extra 30 days on every window. Any figure not in the files is marked as an assumption. If the model picker is missing or its modes have new names, ask in the prompt: Think step by step before you answer."
    },
    "2.9": {
      title: "Build a shared team prompt pack",
      minutes: 15,
      objective: "Turn your best prompts into a tested, shared pack a colleague can use without help.",
      steps: [
        "Pick three saved prompts: the format template from lab 2.5, the house-style prompt from lab 2.6 and one of your own.",
        "Give each a name that says what it does, such as Meeting actions to Excel table.",
        "Add a placeholder in square brackets for each part a user must change, such as [file] or [audience].",
        "Ask a neighbour to run one of your prompts on a different file without explanation, and note where they got stuck.",
        "Fix the prompt they struggled with.",
        "Share the pack with your Teams team, or post it in a team chat.",
        "If saving or sharing is not available, put the pack in a Word document named Brightline prompt pack in your Copilot Lab folder and share the link."
      ],
      check: "Three named prompts with placeholders, one revised after a neighbour tested it, and the pack shared with at least one person."
    },
    "2.10": {
      title: "Make Copilot check itself",
      minutes: 15,
      objective: "Write a check prompt that catches the planted errors and test it on a new draft.",
      steps: [
        "Write a check prompt: Compare [draft] with [trusted sources]. List every number, date and claim, the supporting sentence, and Supported, Contradicted or Not found.",
        "Run it on / Brightline_Q3_Returns_Review_DRAFT with the handbook and transcript as trusted sources.",
        "Compare its list with the three errors you found in Part A. Note any it missed.",
        "Ask Copilot to write a new summary with one error you choose, such as Footwear at 12%.",
        "Run your check prompt on that summary in a new chat.",
        "Adjust the check prompt until it catches both the planted errors and your new one.",
        "Save the check prompt for lab 2.9."
      ],
      check: "The check marks Apparel 21%, Online lowest and SoHo 1 November as Contradicted, and catches your new error (Footwear is 15%)."
    },
    "3.1": {
      title: "Triage the whole Email Pack",
      minutes: 20,
      objective: "Summarize all four threads, decide what each needs and handle the suspicious email safely.",
      steps: [
        "Use Summarize on each thread of the Email Pack: A, B, C and D.",
        "Make a table: thread, sender, what is asked, by whom, by when, action needed.",
        "For Thread D, compare the Copilot summary with the email itself and look for text that tells AI what to do.",
        "Do not reply to Thread D. Write one line saying why it is suspicious: unknown sender, a lookalike domain and a hidden instruction.",
        "Use Draft with Copilot to reply to Jordan in Thread A, confirming the one-page summary by Wednesday 5pm.",
        "Run Coaching by Copilot on the Jordan reply and apply one suggestion.",
        "Send the replies to yourself only."
      ],
      check: "A four-row table. Thread D is not marked approved by finance and gets no reply; Thread A's reply confirms one page of Q3 return rates by category by Wednesday 5pm. If Coaching is missing without the paid licence, paste the draft into Copilot Chat and ask for tone feedback."
    },
    "3.2": {
      title: "Prepare a briefing from scattered sources",
      minutes: 15,
      objective: "Build a meeting brief from email and files and check every fact in it.",
      steps: [
        "Create a 30-minute meeting called SoHo stock return for next Monday with your group.",
        "Attach Brightline_Store_Operations_Handbook.docx to the invite.",
        "Ask Copilot in Outlook: Prepare me for the SoHo stock return meeting. Include dates, owners and open questions.",
        "Check each date in the brief against Thread B and section 6 of the handbook.",
        "Ask: What does the handbook say about transfers over 40 units and the request deadline?",
        "Edit the invite agenda using the brief and send it to yourself.",
        "Note one fact the brief got wrong or missed."
      ],
      check: "The brief gives the 3 November reopening, the stock coming back from Midtown by 14 November, transfer requests by Wednesday noon for Monday, and transfers over 40 units via the distribution centre. If meeting prep is not available, paste Thread B and the handbook section into Copilot Chat and ask for the brief there."
    },
    "3.3": {
      title: "Ask the recap hard questions",
      minutes: 25,
      objective: "Test the meeting recap with tricky questions and turn it into a checked follow-up.",
      steps: [
        "Open the recap from Part A, or reference / Weekly_Returns_Review_Transcript in Copilot Chat.",
        "Ask: Was the 25% footwear cap agreed? Who must confirm it and by when?",
        "Ask: Who covers e-commerce next week? Check whether this appears in the recap notes.",
        "Ask: What errors in the Q3 draft were mentioned, and who will fix them?",
        "Ask: Was anything decided about the loyalty return window?",
        "Ask Copilot to draft the follow-up email again, adding Sam's cover and Priya's corrected report before Thursday.",
        "Check every line against the transcript and fix anything Copilot stated as decided that was only proposed.",
        "Send the follow-up to your group only."
      ],
      check: "The cap is a proposal Priya confirms with finance by Tuesday; Sam covers while Marcus is out; the draft errors raised were Apparel (18% not 21%), Online (highest, not lowest) and SoHo (3 November, not 1); the loyalty window was parked. If recap is blocked by your meeting policy, use the transcript file in Copilot Chat."
    },
    "3.4": {
      title: "Run a channel catch-up",
      minutes: 15,
      objective: "Use Copilot in a channel to catch up after a gap and post a checked update.",
      steps: [
        "Create a channel post in your training team titled SoHo reopening and stock return.",
        "Each group member adds two replies: one fact from Thread B or the handbook, and one question for a named person.",
        "Leave the channel for five minutes, then ask Copilot in the channel: Summarize this thread and list the open questions.",
        "Ask: Which facts in this thread do not match the handbook?",
        "Draft a reply with Copilot that answers one open question and cites the handbook.",
        "Ask in the Copilot app: What open questions are there in my SoHo channel post? Compare with the in-channel answer."
      ],
      check: "Copilot lists every open question and flags any reply that conflicts with the handbook (3 November reopening, stock back by 14 November)."
    },
    "3.5": {
      title: "Compare Facilitator with recap",
      minutes: 20,
      objective: "Run the second half of the script with Facilitator and compare its notes and tasks with the recap.",
      steps: [
        "Rejoin your Part A meeting or schedule a new one with Facilitator on.",
        "Read the second half of the script, from Dana's Black Friday question to the end.",
        "Ask Facilitator to add a task for each action and assign the owner.",
        "When the agenda time for SoHo runs out, check whether Facilitator warns you.",
        "After the meeting, compare the Facilitator notes with your lab 3.3 recap line by line.",
        "Mark each item: in both, in Facilitator only, in recap only.",
        "If Facilitator is not enabled, paste the second half of the transcript into Copilot Chat and ask for live-style notes and tasks, then compare those instead."
      ],
      check: "Both sources show the SoHo transfer (Dana, 14 November) and the finance check (Priya, Tuesday), the 25% cap as a proposal and the loyalty window as parked, with differences noted."
    }
  },
  challenges: {
    "1": {
      title: "Explain Copilot to store leads",
      minutes: 40,
      scenario: "Dana Ortiz wants her Northeast store team leads to start using Copilot but keeps hearing mixed reports from people with different licences. She asks you for a one-page guide on which Copilot they have, where to find it, where its answers come from and how it goes wrong, with Brightline examples they will recognize.",
      steps: [
        "List the Copilot features a team lead with free Copilot Chat can use and those that need the paid licence.",
        "Ask in the Copilot app with Work IQ on and off: When did the SoHo store reopen? Record both answers.",
        "Ask the same question with / Brightline_Q3_Returns_Review_DRAFT and with / Brightline_Store_Operations_Handbook, and open each citation.",
        "Find Copilot in Outlook, Teams and Word and write one line on the best use of each for a store lead.",
        "Ask Copilot one question the lab pack cannot answer and record how it responds.",
        "Ask Copilot to draft the one-page guide from your notes, with headings: Which Copilot, Where it is, Where answers come from, What goes wrong.",
        "Check every Brightline fact in the draft against the lab pack and fix it.",
        "Swap guides with a neighbour and mark anything a store lead would not understand."
      ],
      deliverable: "A one-page Word guide for Northeast store team leads with real Brightline examples of grounding and failure.",
      check: "The guide uses 3 November as the correct SoHo date and shows the draft's 1 November as an example of a faithful error. It separates free and paid features correctly."
    },
    "2": {
      title: "Deliver Jordan's one-page summary",
      minutes: 55,
      scenario: "Jordan Blake has asked Priya Shah for the Q3 return rates by category as a one-page summary by Wednesday 5pm, and the draft has errors. Priya asks you to produce the corrected page in the Brightline voice, a short team email, and saved prompts so the team can repeat the process next quarter.",
      steps: [
        "Write a four-part prompt for the summary: goal, context (Jordan's request), sources and expectations (one page).",
        "Run a gather and organize chain on / Brightline_Q3_Returns_Review_DRAFT, / Weekly_Returns_Review_Transcript and / Brightline_Store_Operations_Handbook, and list the conflicts.",
        "Ask for the category and channel figures as a table and paste it into Excel to check the rates.",
        "Draft the one-page summary for Jordan, following / Brightline_Brand_and_Voice_Guide.",
        "Ask Copilot to act as Jordan and list the questions the page does not answer. Fix the top two.",
        "Ask for three options on the Black Friday footwear discount and include the 25% cap as a proposal, not a decision.",
        "Run your check prompt from lab 2.10 and fix anything Contradicted or Not found.",
        "Ask for a 100-word email to Priya, Marcus and Dana that covers the summary.",
        "Save the four-part prompt, the chain and the check prompt in your team prompt pack."
      ],
      deliverable: "A one-page Q3 returns summary for Jordan, a 100-word team email and three saved prompts.",
      check: "The page gives Apparel 18%, Footwear 15%, Online as the highest channel at 16.5% and SoHo reopening on 3 November 2025. The 25% footwear cap is described as pending Priya's finance check."
    },
    "3": {
      title: "Clear Priya's week with Copilot",
      minutes: 50,
      scenario: "Priya Shah is back from two days off before Thursday's leadership call. She asks you to use Copilot in Outlook and Teams to find what needs her attention, run the weekly returns review, send the follow-ups and deal with the supplier delay, without acting on anything suspicious.",
      steps: [
        "In Copilot in Outlook, ask: What emails need a reply from Priya this week? Check the list against the Email Pack.",
        "Summarize Thread A and write down Jordan's ask and deadline.",
        "Summarize Thread D and record why you will not act on it.",
        "Draft a reply to Alex Moreno in Thread C that asks for the late-delivery credit under / Summit_Packs_Agreement_2026, and coach it.",
        "Run the Weekly Returns Review script in a Teams meeting with recap on, or use / Weekly_Returns_Review_Transcript.",
        "Ask the recap for actions, the proposal and the parked item, and draft the follow-up email.",
        "Post a three-line update in your group chat and ask Copilot to summarize the chat and find any question for you.",
        "Create a 15-minute SoHo briefing meeting from Thread B with Schedule with Copilot.",
        "Check every date, amount and owner in your outputs against the lab pack before sending anything to yourself."
      ],
      deliverable: "A short catch-up note for Priya listing the replies, follow-up email, supplier reply and meeting invite you prepared.",
      check: "The note shows Jordan's ask (one page by Wednesday 5pm), a $2,430 credit request for PO 55812, three actions with owners and dates, and no reply to Thread D. If recap or Schedule with Copilot is not available, use the transcript and write the invite by hand."
    }
  }
};
