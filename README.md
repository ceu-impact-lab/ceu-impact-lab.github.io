# CEU Impact Lab Website

Marketing site for the CEU Impact Lab university hackathon, built with Next.js App Router, TypeScript, and MUI (Material Design 3).

## Local Development

- `npm run dev` - start the development server
- `npm run build` - production build
- `npm run start` - run the production build
- `npm run lint` - lint the project

## Content and Theming

- Update event details, CTAs, schedule, rulebook, and FAQ in src/content/site.ts.
- Primary and secondary theme colors are read from the same content file.

## Pages

- Home, como funciona, agenda, retos, bases (rulebook), rubrica, empresas, FAQ, contacto, inscripcion.

## Notes

- Registration URL placeholders are in the content file. If empty, CTAs render disabled.
- Replace sponsor placeholders once confirmed.

## Deploy to GitHub Pages

This project is configured for static export and GitHub Pages.

1. Push to the `main` branch.
2. In GitHub, go to Settings → Pages.
3. Under "Build and deployment", set Source to "GitHub Actions".
4. The workflow will build and deploy to Pages automatically.

If you rename the repository, update the `repoName` value in next.config.ts.

## Slide Deck PDF Export (Tampermonkey)

The presentation at `/presentacion/retos/ia-operaciones` is an interactive carousel that cannot be printed to PDF reliably via the browser's built-in print dialog (CSS transforms, `backdrop-filter`, and GPU compositing prevent correct rendering).

A Tampermonkey userscript is included at `scripts/tampermonkey-slides-to-pdf.user.js` that captures each slide at native 1920×1080 resolution (2× scale for retina quality) and assembles them into a single landscape PDF.

### How to use

1. Install the [Tampermonkey](https://www.tampermonkey.net/) browser extension.
2. Open the Tampermonkey dashboard and create a new script.
3. Paste the contents of `scripts/tampermonkey-slides-to-pdf.user.js` and save.
4. Navigate to the presentation page (e.g. `localhost:3000/presentacion/retos/ia-operaciones`).
5. Click the **📥 Export PDF** button that appears in the top-right corner, or right-click the Tampermonkey icon and choose **Export deck to PDF**.
6. Wait for all 12 slides to be captured — the button shows progress. The PDF downloads automatically when done.
