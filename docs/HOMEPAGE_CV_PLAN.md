# Homepage and CV Maintenance Guide

## Design

The portfolio has two deliberately small data sources:

| Source                     | Consumers                                | Use it for                                                                                     |
| -------------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `content/portfolio.yml`    | Homepage, Experiences, Miscellaneous, CV | Profile, career, education, awards, services, domestic papers, intellectual property, projects |
| `_bibliography/papers.bib` | Publications, CV                         | International publications and venue abbreviations                                             |

The website renders those sources with `_pages/` and shared assets in `assets/`. The CV is rendered by the pinned `vendor/awesome-phd-cv` submodule. Its only portfolio-specific file is `research-cv/cv-extra.yml`; its Python renderer and LaTeX template remain in the fork so the website repository does not carry a second CV implementation.

GitHub Actions generates `assets/pdf/hyeonsu-lyu-cv.pdf` only inside the Pages build artifact. It is intentionally ignored by Git.

## Routine update

1. Update `content/portfolio.yml` or `_bibliography/papers.bib`.
2. If the CV needs additional prose or a different section order, update `vendor/awesome-phd-cv/research-cv/cv-extra.yml` and commit it in the submodule repository first.
3. Render and inspect the CV locally:

   ```bash
   python3 vendor/awesome-phd-cv/research-cv/scripts/render_cv.py \
     --portfolio content/portfolio.yml \
     --bibliography _bibliography/papers.bib \
     --extra vendor/awesome-phd-cv/research-cv/cv-extra.yml \
     --output vendor/awesome-phd-cv/research-cv/generated
   ```

4. Build the website:

   ```bash
   npm run lint:prettier
   npm run lint:style-contract
   bundle exec jekyll build
   ```

5. Commit the parent repository changes, including the submodule pointer if it changed. Push a branch and review the draft pull request. Merging to `main` deploys the Pages artifact and rebuilds the PDF.

## Update the CV fork

Use this only for CV renderer/template changes, not ordinary content updates.

```bash
cd vendor/awesome-phd-cv
git switch main
git pull --ff-only
# edit and test research-cv/
git add research-cv
git commit -m "..."
git push origin main
cd ../..
git add vendor/awesome-phd-cv
git commit -m "chore: update CV renderer"
```

Keep the submodule pinned to a reviewed commit. Do not use a floating branch reference in the deployment workflow.

## Verification checklist

Before merging a substantive change:

```bash
git diff --check
npm run lint:prettier
npm run lint:style-contract
bundle exec jekyll build
```

For CV changes, also compile `vendor/awesome-phd-cv/research-cv/cv.tex` with XeLaTeX and check that `pdftotext` contains `Hyeonsu Lyu`. For JavaScript changes, verify publication full-name filtering, the Miscellaneous year range filter, and the sticky sidebars in a browser.

## Boundaries

- Do not restore the removed RenderCV configuration or a second publication list.
- Do not put portfolio content into page markup or JavaScript.
- Keep global visual rules in `assets/css/site.css` and interaction logic in `assets/js/site.js`.
- Keep generated files, caches, and local PDFs out of commits.
