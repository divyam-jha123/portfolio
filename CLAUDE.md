# CLAUDE.md

Personal portfolio for Divyam Jha. React + Vite + TypeScript, `framer-motion` for
motion, `react-icons`/`lucide-react` for icons. Single page, content-driven from
`src/data.ts`, all styling in one hand-written `src/index.css` (no CSS framework).

## Design Context

### Recommended typography scale

This is the pinned type scale for the site. Treat it as authority: when a value
here conflicts with what is currently in `src/index.css`, this table wins and the
CSS should be brought to it.

| Element | Desktop | Mobile | Weight | Line height |
|---|---|---|---|---|
| **Hero main heading** | **64px** | **40px** | 600–700 | 1.05–1.1 |
| Hero supporting text | 20px | 17px | 400 | 1.5 |
| Section eyebrow / label | 13px | 12px | 500–600 | 1.4 |
| **Section heading** | **40px** | **30px** | 600 | 1.15 |
| Section intro paragraph | 18px | 16px | 400 | 1.6 |
| **Project title** | **28px** | **24px** | 600 | 1.25 |
| Project description | 16px | 15–16px | 400 | 1.6 |
| Project metadata | 14px | 13px | 400–500 | 1.5 |
| Card heading | 18px | 17px | 600 | 1.35 |
| Card body | 15px | 14–15px | 400 | 1.55 |
| Navigation | 14px | 14px | 500 | 1 |
| Button text | 14–15px | 14px | 500–600 | 1 |
| Right sidebar sections | 13–14px | — | 400–500 | 1.4 |
| Footer text | 13–14px | 13px | 400 | 1.5 |

Notes on applying it:

- The mobile column is the value at the `max-width: 640px` breakpoint, which is
  the only breakpoint this stylesheet uses.
- Tracking is not in the table. Keep the existing convention: negative tracking
  that tightens as size grows (roughly `-0.03em` at 40px+, `-0.02em` in the
  20–30px range, `-0.01em` at 17px, none below that).
- "Right sidebar sections" has no counterpart in the current single-column
  layout; it applies only if a sidebar is introduced.

### Structural conventions

- **Headings are real headings.** One `<h1>` on the page (the name, visually
  hidden behind the hero artwork), `<h2>` for every section label, `<h3>` for
  entry titles and tech categories. Never style a `<div>` as a heading — heading
  navigation has to work.
- **Section labels** currently render as 12px uppercase mono via
  `.section-label`. The scale above adds a distinct **section heading** tier at
  40px that the page does not yet have; a section that adopts it keeps the label
  as an eyebrow above the heading.
- **Color tokens** live at the top of `src/index.css` under `:root` and
  `[data-theme="dark"]`. Never hardcode a color in a component.
- **Content lives in `src/data.ts`.** Components render it; they do not contain
  copy.

### Accessibility floor

Do not regress these — they were added deliberately:

- `:focus-visible` ring on all interactive elements, plus a skip link.
- `prefers-reduced-motion` block that stops the tech marquee and neutralizes
  transitions; `<MotionConfig reducedMotion="user">` wraps the app so every
  `framer-motion` section honors it.
- The tech marquee is `aria-hidden` (it duplicates the expandable grid) and has
  a visible pause control plus pause-on-hover/focus.
- The QR modal is a real dialog: `role="dialog"`, `aria-modal`, focus trap,
  Escape to close, focus returned to its trigger.
- Body text targets WCAG AA (4.5:1). `--text-tertiary` currently fails at 2.33:1
  in light mode and is a known open issue.


### staging and pushing instructions
- dont use the signoff by claude code
- use `ga <file-name>` for staging
- use `git commit -m <commit message>` for commiting changes

### Assets

Hero portraits are theme-swapped CSS backgrounds using `image-set()` with WebP
first and a plain-PNG fallback line above it (so an unsupported browser still
renders art). Both PNGs are opaque and depend on `mix-blend-mode` cancelling
their baked plate against the exact page background — changing `--bg-primary`
will reveal a rectangle around the portrait.

## Commands

```bash
npm run dev      # vite dev server
npm run build    # tsc -b && vite build
npm run preview  # serve dist/
```
