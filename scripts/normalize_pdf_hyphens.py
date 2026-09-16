#!/usr/bin/env python3
"""Normalize non-breaking hyphens in a PDF's text-extraction maps."""

from __future__ import annotations

import argparse
from pathlib import Path

from pypdf import PdfReader, PdfWriter


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("pdf", type=Path)
    args = parser.parse_args()

    reader = PdfReader(args.pdf)
    replacements = 0
    for page in reader.pages:
        for font in page["/Resources"].get("/Font", {}).values():
            to_unicode = font.get_object().get("/ToUnicode")
            if to_unicode is None:
                continue
            mapping = to_unicode.get_object()
            text = mapping.get_data()
            replacements += text.count(b"<2011>")
            mapping.set_data(text.replace(b"<2011>", b"<002D>"))

    if not replacements:
        return

    writer = PdfWriter()
    writer.clone_document_from_reader(reader)
    with args.pdf.open("wb") as output:
        writer.write(output)


if __name__ == "__main__":
    main()
