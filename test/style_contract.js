const fs = require("node:fs");

const required = [
  "content/portfolio.yml",
  "_bibliography/papers.bib",
  "assets/css/site.css",
  "assets/js/site.js",
  "vendor/awesome-phd-cv",
  "_includes/portfolio/branded-text.liquid",
  "_includes/portfolio/date-column.liquid",
  "_includes/portfolio/project-card.liquid",
  "_includes/portfolio/sidebar.liquid",
];
const forbidden = ["_layouts", "_sass", "_scripts", "assets/rendercv", "_data/cv.yml"];
const failures = [];

for (const path of required) {
  if (!fs.existsSync(path)) failures.push(`Missing required portfolio path: ${path}`);
}

for (const path of forbidden) {
  if (fs.existsSync(path)) failures.push(`Obsolete or generated path must not be restored: ${path}`);
}

const config = fs.readFileSync("_config.yml", "utf8");
for (const plugin of ["al_folio_core", "al_icons", "al_search", "jekyll/scholar"]) {
  if (!new RegExp(`^\\s*-\\s*${plugin}\\s*$`, "m").test(config)) failures.push(`Missing required plugin: ${plugin}`);
}

for (const excludedPath of ["assets/css/site.css", "bin/", "tmp/", "vendor/"]) {
  if (!new RegExp(`^\\s*-\\s*${excludedPath.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}\\s*$`, "m").test(config)) {
    failures.push(`Build-only path must be excluded from the generated site: ${excludedPath}`);
  }
}

for (const page of ["_pages/cv.md", "_pages/miscellaneous.md", "_pages/publications.md"]) {
  if (/\sstyle\s*=/.test(fs.readFileSync(page, "utf8"))) failures.push(`Move static inline styles into assets/css/site.css: ${page}`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Portfolio source contract check passed.");
