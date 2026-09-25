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

Requires Ruby 3.3.5/Bundler 4.0.6, Node.js 20+, Python 3.10+, XeLaTeX/`latexmk`, ImageMagick, and `pdfinfo`/`pdftotext`. On this machine Ruby/Bundler are in `~/.rbenv`; `bin/portfolio` finds them even when `bundle` is absent from `PATH`.

```bash
./bin/portfolio setup  # install/update project dependencies
./bin/portfolio serve  # preview at http://localhost:4000
./bin/portfolio build  # verify and generate CV PDF and _site/
```

`setup` installs project dependencies, not the prerequisite tools. `build` writes `assets/pdf/hyeonsu-lyu-cv.pdf` and `_site/`; both are ignored by Git.

To publish committed `main` after a full build:

```bash
./bin/portfolio publish
```

See [`docs/HOMEPAGE_CV_PLAN.md`](docs/HOMEPAGE_CV_PLAN.md) for the architecture, CV workflow, and release checklist. See [`AGENTS.md`](AGENTS.md) for repository rules.
