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
