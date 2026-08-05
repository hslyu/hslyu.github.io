# Portfolio Site Guidelines

This repository is Hyeonsu Lyu's portfolio website. Keep it small, data-driven, and deployable from a clean checkout.

## Source of truth

| Content                                                                                               | Edit here                                        | Do not duplicate it in       |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ---------------------------- |
| Profile, homepage, experience, awards, services, domestic papers, intellectual property, and projects | `content/portfolio.yml`                          | Page markup or CV-only files |
| International publications                                                                            | `_bibliography/papers.bib`                       | `content/portfolio.yml`      |
| CV-only presentation choices                                                                          | `vendor/awesome-phd-cv/research-cv/cv-extra.yml` | Portfolio data               |
| CV renderer and LaTeX template                                                                        | `vendor/awesome-phd-cv/research-cv/`             | This repository              |
| Website structure                                                                                     | `_pages/`                                        | Generated HTML               |
| Shared website behavior and styling                                                                   | `assets/js/site.js`, `assets/css/site.css`       | Inline page blocks           |

`vendor/awesome-phd-cv` is a pinned Git submodule. Commit an updated submodule pointer here only after the fork itself is committed and pushed.

## Change rules

- Make the smallest change that satisfies the request. Do not add a new source of truth for existing content.
- Keep page-specific markup in `_pages/`; keep shared behavior out of inline scripts and styles.
- Do not commit `assets/pdf/hyeonsu-lyu-cv.pdf`; GitHub Actions generates it for the Pages artifact.
- Keep `Gemfile` and `_config.yml` aligned when adding or removing a Jekyll plugin.
- Do not edit generated directories such as `_site/`, `.jekyll-cache/`, or `vendor/awesome-phd-cv/research-cv/generated/`.

## Required verification

Run the narrowest relevant checks first. For a content or CV change:

```bash
python3 vendor/awesome-phd-cv/research-cv/scripts/render_cv.py \
  --portfolio content/portfolio.yml \
  --bibliography _bibliography/papers.bib \
  --extra vendor/awesome-phd-cv/research-cv/cv-extra.yml \
  --output vendor/awesome-phd-cv/research-cv/generated
```

For a site change:

```bash
npm run lint:prettier
npm run lint:style-contract
bundle exec jekyll build
```

Before publishing, run the full checklist in [`docs/HOMEPAGE_CV_PLAN.md`](docs/HOMEPAGE_CV_PLAN.md).
