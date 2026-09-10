# Hyeonsu Lyu

Source for [hslyu.github.io](https://hslyu.github.io): an academic portfolio, publications list, and automatically generated CV.

## Update content

| Change                                                                                                  | File                                                                                               |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Homepage, experience, education, awards, services, domestic papers, intellectual property, and projects | [`content/portfolio.yml`](content/portfolio.yml)                                                   |
| International publications                                                                              | [`_bibliography/papers.bib`](_bibliography/papers.bib)                                             |
| CV-only text and section order                                                                          | [`vendor/awesome-phd-cv/research-cv/cv-extra.yml`](vendor/awesome-phd-cv/research-cv/cv-extra.yml) |

The CV generator lives in the pinned [`Awesome-PhD-CV`](https://github.com/hslyu/Awesome-PhD-CV) submodule. GitHub Pages builds the PDF for each deployment; the generated PDF is an artifact, not repository content.

## Local build environment

```bash
./bin/portfolio setup
./bin/portfolio build
```

`setup` installs the repository's Ruby, Node, and Python dependencies; add
`--system` on Ubuntu/Debian to install ImageMagick and Poppler. ImageMagick is
required so local responsive-image output matches deployment. A TeX Live
installation with XeLaTeX and `latexmk` is required for PDF generation and is
intentionally not installed automatically because it is large.

`build` runs the complete local release build and writes the generated CV to
`assets/pdf/hyeonsu-lyu-cv.pdf` and the website to `_site/`. Both outputs are
ignored by Git. For live preview, run:

```bash
./bin/portfolio serve
```

Pushing `main` triggers the GitHub Pages workflow, which repeats the build and
deploys the generated site and CV. After committing changes, the guarded
release command runs the full build before pushing `main`:

```bash
./bin/portfolio publish
```

The same build and serve commands are also available as
`npm run build:local` and `npm run serve:local` after setup.

See [`docs/HOMEPAGE_CV_PLAN.md`](docs/HOMEPAGE_CV_PLAN.md) for the architecture, CV workflow, and release checklist. See [`AGENTS.md`](AGENTS.md) for repository rules.
