# Alexey Kim — Professional Portfolio

A first draft of Alexey’s internship portfolio, built with Next.js, TypeScript, and Tailwind CSS. The design uses charcoal, ice blue, locally bundled DM Sans and Instrument Serif fonts, and an original interactive graphic connecting technology, business, and data.

## Development

Use Node.js 24 and npm 11 (the validated cloud versions). No credentials or external services are required.

```sh
npm ci
npm run dev
```

Run these commands in the existing checkout. Cloud tasks already have an isolated workspace; do not create a Git worktree for setup.

## Build and validate

```sh
npm run build
npm run typecheck
npm run test:smoke
npm start
```

The build writes a static site to `out/`. `npm start` serves that export on port 3000; it requires a completed build. Stop a development server using port 3000 before starting the export, or use `PORT=3100 npm start`. The smoke suite starts its own temporary server on port 3210 and tests the production export using Chromium. In the cloud, Chromium is available at `/usr/bin/chromium`; elsewhere, set `CHROMIUM_PATH` to an installed Chromium executable. Screenshots are written to the ignored `test-results/` directory.

## Content review

Read [the draft text](docs/content-review.md) before approving or publishing. The website is intentionally marked `noindex, nofollow` while it is a draft. This indexing directive is not access control; public deployment would still make its contents accessible.

- Profile, experience, project notes, and skills: `src/lib/content.ts`.
- Layout and interactions: `src/components/portfolio.tsx`.
- Styling: `src/app/globals.css`.
- Cursor trail: `src/components/cursor-trail.tsx`.
- Website resume draft: `public/Alexey-Kim-Resume.pdf`.

The resume download is a separate, concise website copy based on the supplied background and resume. It omits GPA, the unconfirmed Industrial Engineering minor, telephone number, and numerical performance claims. The uploaded original has not been altered and is not in this checkout. Review the public copy as part of approving the website text.

Project graphics are illustrative, not screenshots or evidence of completed implementations. Missing contribution details, project status, and artifacts are explicitly acknowledged in project notes. No project demo or repository links are invented. The GitHub profile link awaits confirmation. A personal photograph is still needed; no placeholder portrait is presented as Alexey.

## Hosting later

No deployment has been performed. The static export can be hosted on GitHub Pages or another static host after content review.

For a GitHub Pages project site under `/alexey-kim-professional-website/`, build with:

```sh
PORTFOLIO_BASE_PATH=/alexey-kim-professional-website npm run build
PORTFOLIO_BASE_PATH=/alexey-kim-professional-website npm start
```

Both the generated asset URLs and the resume download include this prefix. For a custom domain or root-level site, omit `PORTFOLIO_BASE_PATH` and rebuild. Publish the contents of `out/` only after review; remove the draft indexing directive in `src/app/layout.tsx` at that time.

## Class assignment

The uploaded professional-website assignment sheet calls for personal photos, professional contact links, relevant work, and a separate student-authored written explanation. It states that AI-generated content may not be used. This draft is intended for the professional portfolio; Alexey must check permitted assistance with the instructor before using it as coursework. The class reflection has not been written here.
