# Portfolio content export

`portfolio.yml` is the theme-independent inventory for the al-folio migration.
It collects the visitor-facing site settings, profile, homepage copy, news,
career, academic service, publications, domestic papers, software, personal
page, memories, and asset paths.

The following legacy files remain the authoritative detailed sources until the
theme switch, because they contain machine-readable records that should be
converted rather than copied into page markup:

- `_data/bibtex.yml` → al-folio `_bibliography/papers.bib`
- `_data/miscellaneous.yml` → the detailed patents and domestic-paper metadata
- `miscellaneous.md` → detailed project descriptions and external links
- `memories.md` → the full memory timeline

The current public pages are intentionally unchanged. During the migration,
this directory is the content checklist and `portfolio.yml` provides the data
to place into al-folio's `_config.yml`, `_pages/about.md`, `_news/`, and
`_bibliography/`.
