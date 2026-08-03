# Portfolio content export

`portfolio.yml` is the theme-independent portfolio source for the site. It
collects visitor-facing settings, profile, homepage copy, news, career,
academic service, publications, intellectual properties, teaching, projects,
personal page, memories, and asset paths.

The Miscellaneous page reads this file through `_data/portfolio.yml` (a
symlink), so its detailed content is rendered from the same source that a
future CV generator can consume. Keep structured records here instead of
adding duplicated page-only text.

The following legacy files remain the authoritative detailed sources until the
theme switch, because they contain machine-readable records that should be
converted rather than copied into page markup:

- `_data/bibtex.yml` → al-folio `_bibliography/papers.bib`
- `memories.md` → the full memory timeline

The remaining legacy files are retained while the future CV build is designed.
