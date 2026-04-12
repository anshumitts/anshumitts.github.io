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
  patents.tsv           ← Patent entries
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

**Currently enabled.** The Patents section and nav link are active.

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

### Deploying to GitHub Pages

This site is hosted at **https://anshumitts.github.io** via the repo
**https://github.com/anshumitts/anshumitts.github.io**.

Since this folder lives inside the AdsMCP repo, you cannot push directly.
Use the following steps to deploy:

1. **Clone the GitHub Pages repo** to a temp directory:
   ```bash
   git clone https://github.com/anshumitts/anshumitts.github.io.git /tmp/site-deploy
   ```

2. **Copy all files** (excluding `.git`) from this folder into the clone:
   ```bash
   cp -r anshumitts.github.io-master/* /tmp/site-deploy/
   ```

3. **Commit and push**:
   ```bash
   cd /tmp/site-deploy
   git add -A
   git commit -m "docs: describe your changes here"
   git push origin master
   ```

4. **Clean up** the temp directory:
   ```bash
   rm -rf /tmp/site-deploy
   ```

The site updates automatically within a few minutes after pushing to `master`.

---

### Files in Use

| File | Purpose |
|------|---------|
| `index.html` | Single-page layout |
| `css/main.css` | All styles |
| `js/main.js` | TSV loading + rendering |
| `data/publications.tsv` | Publications database |
| `data/news.tsv` | News database |
| `data/patents.tsv` | Patents database |
| `data/research_notes.tsv` | Blog posts database (hidden) |
| `img/*` | Logo/icon assets |
| `docs/Resume_Anshul_Mittal.pdf` | CV PDF |

**Do not add jQuery, external CSS, or framework files.** Keep the site dependency-free.

---

### Database Reference

All website content is stored in **tab-separated (TSV)** files under `data/`.
Each file has a header row defining the columns, followed by one row per entry.
Fields are separated by **literal tab characters** — do not use spaces.
Empty fields must still have their surrounding tab separators (e.g., `value1\t\tvalue3`).

> **AI RULE**: Whenever you add, remove, or modify any entry in a TSV database file,
> you **must** also update the corresponding **Database Stats** section at the bottom
> of this README to keep the entry count and table in sync.

---

#### 1. Publications — `data/publications.tsv`

**Purpose**: Academic papers, preprints, and technical reports displayed in the Publications section on the website.
Rendered by `renderPublications()` in `js/main.js`. Auto-sorted by year (newest first).

**Schema** (7 columns):

| Column | Required | Description |
|--------|----------|-------------|
| `title` | Yes | Full paper title in title case |
| `authors` | Yes | Comma-separated author list, format: `A. Mittal, K. Dahiya` |
| `venue` | Yes | Short venue name: `CVPR`, `WSDM`, `WWW`, `ICML`, `arXiv`, `JVCIR`, etc. |
| `year` | Yes | 4-digit publication year |
| `pdf_url` | No | Full URL to the paper PDF or landing page |
| `code_url` | No | Full URL to the code repository |
| `video_url` | No | Full URL to a talk/demo video |

**Example row** (tabs shown as `→`):
```
My Paper Title→A. Mittal, B. Coauthor→ICML→2026→https://arxiv.org/abs/1234.56789→→
```

---

#### 2. News — `data/news.tsv`

**Purpose**: Announcements and milestones displayed in the sidebar "News" section.
Rendered by `renderNews()` in `js/main.js`. Auto-sorted by date (newest first).

**Schema** (3 columns):

| Column | Required | Description |
|--------|----------|-------------|
| `date` | Yes | Format: `Mon YYYY` (e.g., `Sep 2025`) or just `YYYY` (e.g., `2023`) |
| `text` | Yes | Short announcement text (one line) |
| `highlight` | Yes | `1` = highlighted (blue background), `0` = normal |

**Example row**:
```
Jun 2026→Paper accepted at NeurIPS 2026→1
```

---

#### 3. Patents — `data/patents.tsv`

**Purpose**: Patent filings and grants. Rendered in the Patents section on the website.
Rendered by `renderPatents()` in `js/main.js`. Auto-sorted by year (newest first).

**Schema** (7 columns):

| Column | Required | Description |
|--------|----------|-------------|
| `title` | Yes | Patent title |
| `inventors` | Yes | Comma-separated inventor names |
| `patent_number` | Yes | Patent application number (e.g., `US-2025-XXXXXX`) |
| `status` | Yes | `Filed`, `Published`, or `Granted` |
| `year` | Yes | 4-digit year |
| `abstract` | No | One-paragraph description of the invention |
| `citation` | No | Formal citation string |

---

#### 4. Research Notes — `data/research_notes.tsv` *(section currently hidden)*

**Purpose**: Blog-style posts about research and engineering work. Currently not rendered.
To enable: uncomment the Research Notes `<section>` in `index.html` and `renderResearchNotes()` in `js/main.js`.

**Schema** (4 columns):

| Column | Required | Description |
|--------|----------|-------------|
| `date` | Yes | Format: `Mon YYYY` (e.g., `Mar 2026`) |
| `title` | Yes | Post title |
| `summary` | Yes | One-line preview shown in the collapsed view |
| `content` | Yes | Full body text. Use `\n` for line breaks within the field |

---

### Database Stats

> **Keep this section up to date.** When any TSV file is modified, update the counts and tables below.
> Last updated: **April 2026**

#### Publications (`data/publications.tsv`) — 14 entries

| # | Title | Venue | Year |
|---|-------|-------|------|
| 1 | Graph Regularized Encoder Training for Extreme Classification | WWW | 2025 |
| 2 | MOGIC: Metadata-infused Oracle Guidance for Improved Extreme Classification | ICML | 2025 |
| 3 | NGAME: Negative Mining-aware Mini-batching for Extreme Classification | WSDM | 2023 |
| 4 | EHI: End-to-end Learning of Hierarchical Index for Efficient Dense Retrieval | arXiv | 2024 |
| 5 | Multi-Modal Extreme Classification | CVPR | 2022 |
| 6 | ECLARE: Extreme Classification with Label Graph Correlations | WWW | 2021 |
| 7 | DECAF: Deep Extreme Classification with Label Features | WSDM | 2021 |
| 8 | DeepXML: A Deep Extreme Multi-Label Learning Framework Applied to Short Text Documents | WSDM | 2021 |
| 9 | OAK: Enriching Document Representations using Auxiliary Knowledge for Extreme Classification | ICML | 2024 |
| 10 | A Modified LSTM Model for Continuous Sign Language Recognition Using Leap Motion | IEEE Sensors Journal | 2019 |
| 11 | Sub-scene Target Detection and Recognition Using Deep Learning CNNs | ICDSMLA | 2020 |
| 12 | Data Extraction from Traffic Videos Using Machine Learning Approach | SocProS | 2018 |
| 13 | The Extreme Classification Repository: Multi-label Datasets and Code | Technical Report | 2017 |
| 14 | Rotation and Script Independent Text Detection from Video Frames Using Sub Pixel Mapping | JVCIR | 2017 |

#### News (`data/news.tsv`) — 7 entries

| # | Date | Text | Highlighted |
|---|------|------|-------------|
| 1 | Sep 2025 | Promoted to Senior Data and Applied Scientist at Microsoft | Yes |
| 2 | Oct 2024 | Completed Ph.D. from IIT Delhi | Yes |
| 3 | 2024 | Joined Microsoft | Yes |
| 4 | 2023 | Completed Synopsis | No |
| 5 | 2023 | Ph.D. intern at Microsoft Research | No |
| 6 | 2022 | 1 accepted publication in CVPR 2022 | No |
| 7 | 2022 | Ph.D. intern at Google Research | No |

#### Patents (`data/patents.tsv`) — 2 entries

| # | Title | Status | Year |
|---|-------|--------|------|
| 1 | Leveraging Token Relationships for Enhancing Token Embeddings | Pending | 2025 |
| 2 | TREAT: Tokenization for Retrieving Entity-Aware Targets | Pending | 2025 |

#### Research Notes (`data/research_notes.tsv`) — 1 entry *(hidden)*

| # | Date | Title |
|---|------|-------|
| 1 | Mar 2026 | Scaling Tokenization for Multilingual Ad Queries |