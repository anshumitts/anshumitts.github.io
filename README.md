# anshulmittal.org — Personal Academic Website

## Site Maintenance Instructions

This is a static academic website. No build step or framework is required.  
All dynamic content is loaded from **TSV files** in `data/` via vanilla JavaScript.

---

### File Structure

```
index.html              ← Single-page layout (mobile header + page wrapper + sidebar + main content)
css/main.css            ← All styling (responsive: desktop centered card + mobile hamburger drawer)
js/main.js              ← TSV loader and renderers (no dependencies, no jQuery)
data/
  publications.tsv      ← Publication entries
  news.tsv              ← News/announcements (rendered in sidebar)
  patents.tsv           ← Patent entries (currently hidden)
  research_notes.tsv    ← Blog/research notes (currently hidden)
docs/
  Resume_Anshul_Mittal.pdf
img/                    ← Logo and icon assets
```

---

### How to Add a New Publication

1. Open `data/publications.tsv`
2. Append a new line with **tab-separated** fields in this exact order:

```
title	authors	venue	year	pdf_url	code_url	video_url
```

- `title` — Paper title (title case)
- `authors` — Comma-separated, format: `A. Mittal, K. Dahiya, M. Varma`
- `venue` — Short venue name: `CVPR`, `WSDM`, `WWW`, `ICML`, `arXiv`, etc.
- `year` — 4-digit year: `2025`
- `pdf_url` — Full URL to PDF (leave empty if none)
- `code_url` — Full URL to code repo (leave empty if none)
- `video_url` — Full URL to talk video (leave empty if none)

Empty fields must still have their tab separators. Example:

```
My Paper Title	A. Mittal, B. Coauthor	ICML	2026	https://arxiv.org/abs/1234.56789		
```

Publications are **auto-sorted by year descending** on page load.

---

### How to Add a News Item

1. Open `data/news.tsv`
2. Append a new line with **tab-separated** fields:

```
date	text	highlight
```

- `date` — Format: `Mon YYYY` (e.g., `Sep 2025`) or just `YYYY` (e.g., `2023`)
- `text` — Short announcement text
- `highlight` — `1` to highlight (blue background), `0` for normal

Example:

```
Jun 2026	Paper accepted at NeurIPS 2026	1
```

News is **auto-sorted by month+year descending** (newest first).

---

### How to Add a Patent

1. Open `data/patents.tsv`
2. Append a new line with **tab-separated** fields:

```
title	inventors	patent_number	status	year	abstract	citation
```

- `title` — Patent title
- `inventors` — Comma-separated inventor names
- `patent_number` — e.g., `US-2025-XXXXXX`
- `status` — `Filed`, `Granted`, `Published`
- `year` — 4-digit year
- `abstract` — One-paragraph description
- `citation` — Formal citation string

**Currently hidden.** To enable:
1. In `index.html`: uncomment the Patents `<section>` block and its `<a>` nav link
2. In `js/main.js`: uncomment `renderPatents();`

---

### How to Add a Research Note / Blog Post

1. Open `data/research_notes.tsv`
2. Append a new line with **tab-separated** fields:

```
date	title	summary	content
```

- `date` — Format: `Mon YYYY` (e.g., `Mar 2026`)
- `title` — Post title
- `summary` — One-line preview (shown by default)
- `content` — Full body text. Use `\n` for line breaks within the content

**Currently hidden.** To enable:
1. In `index.html`: uncomment the Research Notes `<section>` block and its `<a>` nav link
2. In `js/main.js`: uncomment `renderResearchNotes();`

---

### Style Rules — DO NOT CHANGE

- **Font**: System font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ...`)
- **Color scheme**: `--c-accent: #1a5276` (dark blue), `--c-bg: #ffffff`, `--c-sidebar: #f7f7f8`
- **Background**: Dark navy-blue AI-themed background (`#0b1a2e`) with radial gradient glows and a subtle dot-grid overlay, fixed behind the page
- **Layout**: Centered `.page-wrapper` card (max-width 1120px) with sticky sidebar (280px) + scrollable main content (max 820px), using flexbox
- **Responsive**:
  - **Desktop (>860px)**: Sidebar is sticky inside the centered card; content floats over the dark background
  - **Mobile (<=860px)**: Full-width white layout with a fixed top header bar and hamburger menu; sidebar slides in as a drawer overlay
  - **Small phones (<=480px)**: Further reduced padding, image sizes, and font sizes
- **Mobile menu**: Hamburger button in `.mobile-header` toggles `.sidebar.open` and `.sidebar-overlay.open` via inline `<script>` at bottom of `index.html`
- **No external dependencies**: No jQuery, no frameworks, no CDNs
- All images use `position: static` and `display: block` — do not add `position: absolute`

---

### How to Update Bio / Contact / Education

These are hardcoded in `index.html` (not TSV-driven). Edit directly:

- **Name/title/affiliation**: Lines 18–20 in the `<aside class="sidebar">` block
- **Email**: Search for `mailto:` — update both the icon link and the sidebar-contact text
- **Bio paragraphs**: Inside `<section id="about">` → `<div class="about-text">`
- **Education list**: Inside `<div class="education">` → `<ul>`
- **Affiliation logos**: Inside `<div class="affiliations">` — add/remove `<img>` tags

---

### How to Add a New Affiliation Logo

1. Place the image in `img/` (PNG, JPG, or SVG)
2. In `index.html`, add inside `<div class="affiliations">`:
   ```html
   <img src="./img/yourlogo.png" alt="Name" title="Name">
   ```
3. Logos render at 44px height, auto width, with slight grayscale filter

---

### How to Re-enable CV Link

In `index.html`, find and uncomment:
```html
<!-- <a href="./docs/Resume_Anshul_Mittal.pdf" target="_blank">CV</a> -->
```

---

### Testing Locally

Start a local server (required for TSV fetch to work):
```bash
python -m http.server 8765
```
Then open `http://localhost:8765`

---

### Files in Use

| File | Purpose |
|------|---------|
| `index.html` | Single-page layout |
| `css/main.css` | All styles |
| `js/main.js` | TSV loading + rendering |
| `data/publications.tsv` | Publications database |
| `data/news.tsv` | News database |
| `data/patents.tsv` | Patents database (hidden) |
| `data/research_notes.tsv` | Blog posts database (hidden) |
| `img/*` | Logo/icon assets |
| `docs/Resume_Anshul_Mittal.pdf` | CV PDF |

**Do not add jQuery, external CSS, or framework files.** Keep the site dependency-free.