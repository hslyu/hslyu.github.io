# Hyeonsu Lyu

Source for [hslyu.github.io](https://hslyu.github.io): an academic portfolio, publications list, and automatically generated CV.

## Update content

| Change                                                                                                  | File                                                                                               |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Homepage, experience, education, awards, services, domestic papers, intellectual property, and projects | [`content/portfolio.yml`](content/portfolio.yml)                                                   |
| International publications                                                                              | [`_bibliography/papers.bib`](_bibliography/papers.bib)                                             |
| CV-only text and section order                                                                          | [`vendor/awesome-phd-cv/research-cv/cv-extra.yml`](vendor/awesome-phd-cv/research-cv/cv-extra.yml) |

The CV generator lives in the pinned [`Awesome-PhD-CV`](https://github.com/hslyu/Awesome-PhD-CV) submodule. GitHub Pages builds the PDF for each deployment; the generated PDF is an artifact, not repository content.

## Local checks

```bash
bundle install
npm ci
npm run lint:prettier
npm run lint:style-contract
bundle exec jekyll build
```

See [`docs/HOMEPAGE_CV_PLAN.md`](docs/HOMEPAGE_CV_PLAN.md) for the architecture, CV workflow, and release checklist. See [`AGENTS.md`](AGENTS.md) for repository rules.
