# Rahul Jain — Grenade preview

Personal site. Production remains at https://rjjainrahul97.github.io/.

## Three views

- Main (live): https://rjjainrahul97.github.io/
- Existing test branch (`preview-diagnostic`): https://raw.githack.com/rjjainrahul97/rjjainrahul97.github.io/preview-diagnostic/index.html
- New test branch (`preview-grenade`): https://raw.githack.com/rjjainrahul97/rjjainrahul97.github.io/preview-grenade/index.html
- Comparison page on this branch: https://raw.githack.com/rjjainrahul97/rjjainrahul97.github.io/preview-grenade/review/index.html

The test links use the third-party raw.githack.com development preview service, not GitHub Pages deployments. It serves public branch HTML with relative CSS, JavaScript and images. Previews may be cached. The `review/main/` and `review/test/` directories are unchanged snapshots of main at ac982e1 and the existing test at 91f06cc.

## Design

Inspired by https://github.com/rubenhassid1/grenade: evidence on the first screen, fewer sections, plain headings, one primary action, serif headings, clay accent, and reduced copy. The established static HTML/CSS/JS stack remains compatible with GitHub Pages and needs no build or paid services.

- Three comparisons lead directly to the supporting cases.
- Expected quote-to-cash benefits are explicitly described as expected.
- Five challenge choices open the corresponding case; there is no diagnostic scoring or collection of visitor inputs.
- The latest newsletter name, recognition, education and side builds come from the existing test branch.
- Light/dark choice persists locally where browser storage is available. Without JavaScript, content, case disclosures, navigation and contact links work.
- This preview has `noindex,follow`; remove that preview directive if promoting it to the main website.

## Local review

Run `python -m http.server 8000` in this directory. Open http://localhost:8000/review/ to compare all three versions. There are no dependencies or build step.

## Validation

Browser checks cover desktop (1440px), phone (400px) and narrow phone (320px), overflow, all challenge choices, direct case links, theme persistence, internal anchors, comparison routes and no-JavaScript case access. Source claims are carried over from the supplied repository; client outcomes were not independently audited.
