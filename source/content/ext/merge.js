// Attach Part B extensions and module challenges to course SECTIONS, if the ext files exist.
const fs = require("fs"), path = require("path");
module.exports = function merge(SECTIONS, names) {
  if (process.env.NO_EXT) return SECTIONS;
  const labs = {}, challenges = {};
  for (const n of names) {
    const f = path.join(__dirname, `${n}.js`);
    if (!fs.existsSync(f)) continue;
    const m = require(f);
    Object.assign(labs, m.labs || {}); Object.assign(challenges, m.challenges || {});
  }
  SECTIONS.forEach((s, i) => {
    s.concepts.forEach((c) => { if (labs[c.id]) c.lab.partB = labs[c.id]; });
    if (challenges[String(i + 1)]) s.challenge = challenges[String(i + 1)];
  });
  return SECTIONS;
};
