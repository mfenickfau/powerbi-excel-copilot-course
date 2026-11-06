# Brief: write Part B extensions and module challenges for a training course

You are extending hands-on labs in an instructor-led course for business users. Each topic already has a lab (now called Part A). Your job: write a **Part B** for every lab in your assigned modules, and one **module challenge** per assigned module. The goal is to roughly double hands-on time.

## Read first
- The course content file(s) named in your task. Each module (SECTIONS[i]) has `title`, `blurb`, `concepts[]`. Each concept has `id`, `title`, `status`, `qualify` (if present = feature is uncertain/rolling out), `requires`, `what`, `how`, `lab: {minutes, objective, steps, check, fallback, extra?}`, `demo`.
- The course wrapper file named in your task: read `COURSE.lb.dataNotes`, `COURSE.lb.appendices` (answer key) and `SETUP_LAB` to learn the lab files and the facts planted in them. Use ONLY these files and facts. Never invent new datasets, columns, sheets, people or numbers that contradict them. You may ask learners to create small things themselves (a measure, a prompt, a page, a test table).

## Part B rules (one per lab)
- Builds directly on the Part A lab: same feature, same files, deeper or more realistic. Good patterns: apply it to a harder case; combine with a feature from an earlier lab; break it and fix it; compare two methods; productionize (save, share, document, schedule); test edge cases; apply it to the learner's own work as the final step.
- **Hands-on**: the learner does things in the tool. No pure discussion labs (except where Part A itself needs no technology, e.g. policy/governance labs; then Part B is a practical exercise such as filling a template, building a checklist or role-play).
- `minutes`: roughly equal to Part A's minutes (between 0.8x and 1.5x, round to 5; minimum 10).
- `title`: short, specific (3 to 7 words), e.g. "Rescue a broken measure".
- `objective`: one sentence starting with a verb.
- `steps`: 5 to 8 steps. Imperative, concrete, one action each. Name exact files, sheets, tables, fields, prompts or menu paths the course already uses. Put prompts learners type in the step text after a colon.
- `check`: one or two sentences describing what done looks like; give concrete expected results when the planted data makes them knowable.
- If the concept has `qualify` (uncertain feature), make the last step or the check note a fallback path, e.g. "If the feature is missing, do steps 3 to 5 in Copilot Chat instead."
- Style: plain English, short sentences, active voice, US spelling is fine but match the existing text, no marketing words, no exclamation marks, no emojis. Never use the words "delve", "leverage", "robust", "seamless".

## Module challenge rules (one per module)
- A realistic business scenario for Brightline that uses several of the module's topics together. 30 to 60 minutes.
- Fields: `title` (3 to 7 words), `minutes`, `scenario` (2 to 3 sentences: who asks for what and why), `steps` (6 to 10), `deliverable` (one sentence), `check` (one or two sentences, concrete where possible).

## Output
Write a single CommonJS file at the path in your task, exactly in this shape (keys are the lab ids as strings, challenge keys are the 1-based module numbers as strings):

```js
module.exports = {
  labs: {
    "2.1": { title: "...", minutes: 15, objective: "...", steps: ["...", "..."], check: "..." },
  },
  challenges: {
    "2": { title: "...", minutes: 45, scenario: "...", steps: ["..."], deliverable: "...", check: "..." },
  },
};
```

Then verify with node that it loads, that every concept id in your modules has an entry, and that each entry has all fields with 5 to 8 steps (challenges 6 to 10). Fix and re-check until clean. Use valid JS strings (escape quotes). Do not modify any other file.

Report back only: the output path, the count of labs and challenges written, total Part B minutes and total challenge minutes. No other commentary.
