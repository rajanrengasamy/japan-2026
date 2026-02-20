# Contributing to Japan 2026 Family Pages

This GitHub Pages site is maintained by **Edith** (family travel agent). Keep updates friendly, clear, and visual for family use.

## Page structure

- `index.html` — main itinerary page
- `hotels.html` — hotel recommendations (currently placeholder)
- `transport.html` — transport guide (currently placeholder)
- `nav.html` — shared nav markup shell
- `nav.js` — shared nav logic + styling + current-page highlight

All pages should include the shared navigation right after `<body>`:

```html
<script src="nav.js"></script>
<div id="japan-nav"></div>
```

## Navigation system

`nav.js` owns the nav links via `NAV_ITEMS`.

To add a page:

1. Copy `hotels.html` or `transport.html` as your starting template
2. Rename and update metadata (`<title>`, description, heading)
3. Add a new item in `NAV_ITEMS` inside `nav.js`
4. Commit and push

If a nav item points to a page that does not exist yet, the nav automatically renders it as a **Coming soon** pill.

## Design tokens (keep consistent)

Use the same core tokens from `index.html`:

- Fonts:
  - Headings: **Fraunces**
  - Body/UI: **Inter**
- Colors:
  - `--bg: #fbf8f5`
  - `--paper: #ffffff`
  - `--ink: #101828`
  - `--muted: #667085`
  - `--sakura: #f6c1d1`
  - `--zen: #2f7a6d`
  - `--indigo: #1e2a4a`
  - `--gold: #f2b233`
- Visual style:
  - Soft cards, rounded corners (`--radius-lg`)
  - Light gradients with sakura + zen tones
  - Family-friendly tone and scannable layout

## Content guidelines

- Keep language warm and practical
- Optimise for quick reading on mobile
- Avoid clutter and dense walls of text
- Preserve the sakura/zen visual identity across all new pages
