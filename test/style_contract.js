const fs = require("node:fs");

const required = ["content/portfolio.yml", "_bibliography/papers.bib", "assets/css/site.css", "assets/js/site.js", "vendor/awesome-phd-cv"];
const forbidden = ["_layouts", "_includes", "_sass", "_scripts", "assets/rendercv", "_data/cv.yml"];
const failures = [];

for (const path of required) {
  if (!fs.existsSync(path)) failures.push(`Missing required portfolio path: ${path}`);
}

for (const path of forbidden) {
  if (fs.existsSync(path)) failures.push(`Obsolete or generated path must not be restored: ${path}`);
}

const config = fs.readFileSync("_config.yml", "utf8");
for (const plugin of ["al_folio_core", "al_icons", "al_search", "jekyll/scholar", "jekyll-toc"]) {
  if (!new RegExp(`^\\s*-\\s*${plugin}\\s*$`, "m").test(config)) failures.push(`Missing required plugin: ${plugin}`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Portfolio source contract check passed.");
