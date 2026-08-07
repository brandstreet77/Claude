# Brandstreet Agency — Landing Page

A single-page, conversion-focused landing page for a web design/development
agency. Static HTML/CSS/JS — no build step, no dependencies.

## Files

- `index.html` — page structure and content
- `styles.css` — all styling (clean/professional navy + blue palette)
- `script.js` — mobile nav, FAQ accordion, scroll animations, form validation
- `assets/favicon.svg` — placeholder logo mark used as the favicon

## Before you launch — placeholders to replace

Search the codebase for `PLACEHOLDER` or `[` to find every spot that needs
real content:

```
grep -n "PLACEHOLDER\|\[" index.html
```

Specifically:

1. **Trust bar logos** (`index.html`, `.logo-strip`) — swap the text names
   for real client logo images.
2. **Stats section** (`.stats-section`) — replace the four numbers with
   verified results (websites launched, lead increase, retention, years in
   business).
3. **Portfolio / Work section** (`#work`) — replace the three cards with
   real project screenshots, names, and links to live case studies.
4. **Testimonials** (`#testimonials`) — replace quotes with real client
   feedback, names, and companies.
5. **Contact info** — replace `[hello@brandstreetagency.com]` and
   `[(555) 555-5555]` in both the CTA section and the footer.
6. **Social links** in the footer (`href="#"`) — point to real profiles.

## Wiring up the contact form

The form in `#contact` is pre-configured for **Netlify Forms**
(`data-netlify="true"` + a hidden `form-name` field), which works with zero
backend code if you deploy on Netlify — form submissions show up in your
Netlify dashboard automatically.

If you're hosting elsewhere, either:

- Use **[Formspree](https://formspree.io)**: change the `<form>` tag to
  `<form action="https://formspree.io/f/yourFormId" method="POST">` and
  remove the `data-netlify` attribute.
- Wire it to your own backend/serverless function that accepts a POST with
  `name`, `email`, `website`, and `message` fields.

Client-side validation (required fields, email format) already runs in
`script.js` before submission.

## Deploying

Any static host works — this is plain HTML/CSS/JS:

- **Netlify**: drag-and-drop the folder, or connect the repo (forms work
  out of the box).
- **Vercel**: `vercel deploy` from this directory.
- **GitHub Pages**: enable Pages on this repo, serve from the root.

## Customizing

- Colors, fonts, and spacing are defined as CSS custom properties at the
  top of `styles.css` (`:root { ... }`) — change them once, they apply
  everywhere.
- Section order in `index.html` follows a standard high-converting layout:
  Hero → Trust bar → Services → Why us → Stats → Process → Work →
  Testimonials → FAQ → Contact. Reorder sections by moving the `<section>`
  blocks; anchor links (`#services`, `#work`, etc.) will keep working as
  long as the `id` attributes stay intact.
