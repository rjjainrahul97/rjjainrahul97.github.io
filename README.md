# Rahul Jain — Personal website

Personal site, published from the `main` branch at https://rjjainrahul97.github.io/.

## Maintained versions

- Current website (version 3, Grenade redesign): https://rjjainrahul97.github.io/
- Version directory: https://rjjainrahul97.github.io/review/
- Version 1 archive (original): https://rjjainrahul97.github.io/review/main/
- Version 2 archive (growth diagnostic): https://rjjainrahul97.github.io/review/test/

All three views are hosted together by GitHub Pages. The footer links to the version directory; each archive links back to the current website and all versions. The archives carry `noindex,follow` so they remain accessible without competing with the current page in search.

The archived content comes from main at `ac982e1` and `preview-diagnostic` at `91f06cc`, with only archive navigation and indexing metadata added. Their original branches remain available. Keep archive content stable when editing the current website. Before any future redesign replaces the current version, preserve it as a new numbered archive and update the directory.

## Design

Inspired by https://github.com/rubenhassid1/grenade: evidence on the first screen, fewer sections, plain headings, one primary action, serif headings, clay accent, and reduced copy. The established static HTML/CSS/JS stack remains compatible with GitHub Pages and needs no build or paid services.

- Three comparisons lead directly to the supporting cases.
- Expected quote-to-cash benefits are explicitly described as expected.
- Five challenge choices open the corresponding case; there is no diagnostic scoring or collection of visitor inputs.
- The latest newsletter name, recognition, education and side builds come from the existing test branch.
- Light/dark choice persists locally where browser storage is available. Without JavaScript, content, case disclosures, navigation and contact links work.
- The current homepage has a production canonical URL and is indexable. Only archive pages and the version directory use `noindex`.

## Local review

Run `python -m http.server 8000` in this directory. Open http://localhost:8000/review/ to compare all three versions. There are no dependencies or build step.

## Validation

Browser checks cover desktop (1440px), phone (400px) and narrow phone (320px), overflow, all challenge choices, direct case links, theme persistence, internal anchors, comparison routes and no-JavaScript case access. Source claims are carried over from the supplied repository; client outcomes were not independently audited.
