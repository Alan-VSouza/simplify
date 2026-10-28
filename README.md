# Simplify 🌿

A small, nature-themed collection of everyday web utilities — built as a
front-end portfolio project with React, TypeScript and Vite.

**Live site:** https://alan-vsouza.github.io/simplify/

## Tools

| Tool | Description | Network |
| --- | --- | --- |
| CPF/CNPJ generator & validator | Generates valid test CPFs/CNPJs and validates existing ones | Offline |
| CEP lookup | Looks up a Brazilian address from a postal code via ViaCEP | Online |
| Currency converter | Converts between currencies using live, keyless exchange rates | Online |
| Compound interest & financing calculator | Projects investment growth and Price/SAC loan amortization, with a chart | Offline |
| Password generator | Generates strong passwords with `crypto.getRandomValues` and a strength meter | Offline |
| Unit converter | Converts length, mass, volume and temperature | Offline |
| Character/word counter | Counts characters, words, sentences, paragraphs and estimated reading time | Offline |
| JSON formatter/validator | Formats, minifies and validates JSON, with error reporting | Offline |

The home page lets you search and filter tools by category, and star
favorites — both the filter state and favorites persist in `localStorage`.

## Stack

- **React 18 + TypeScript** (`strict` mode)
- **Vite** for the dev server and build (migrated from Create React App, which
  is no longer maintained)
- **React Router** (`HashRouter`, to keep deep links working on GitHub Pages
  without extra server configuration)
- **Vitest + React Testing Library** for unit and component tests
- **vite-plugin-pwa** for offline support (installable app + service worker)
- Plain CSS Modules + CSS variables for theming — no CSS framework, to keep
  the bundle small and the styling approach easy to follow

## Getting started

```bash
git clone https://github.com/Alan-VSouza/simplify.git
cd simplify
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

### Environment variables

No API key is required to run the app: both the currency converter
(Frankfurter) and the CEP lookup (ViaCEP) are free and keyless. The contact
form uses [EmailJS](https://www.emailjs.com/), whose public key is designed
to be exposed in client code; copy `.env.example` to `.env` and fill it in
only if you want the contact form to actually send email in your own fork:

```bash
cp .env.example .env
```

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Starts the Vite dev server |
| `npm run build` | Type-checks and builds for production into `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm test` | Runs the unit/component test suite once |
| `npm run test:watch` | Runs tests in watch mode |
| `npm run coverage` | Runs tests with a coverage report |
| `npm run lint` / `npm run lint:fix` | Lints (and optionally auto-fixes) the code |
| `npm run typecheck` | Runs the TypeScript compiler in check-only mode |
| `npm run format` | Formats the codebase with Prettier |

## Project structure

```
src/
  components/
    layout/      # Header, Footer
    ui/           # Reusable primitives: Button, Card, Input, AsyncState, LineChart
  hooks/          # useLocalStorage, useTheme, useFavorites, useDocumentHead
  lib/
    tools.ts      # Central registry: every tool's metadata lives here
  pages/          # Home, About, Contact, NotFound
  tools/
    <tool-id>/
      logic.ts            # Pure, framework-free logic
      logic.test.ts        # Unit tests for that logic
      <Name>Tool.tsx       # The UI, wired to logic.ts
      <Name>Tool.module.css
```

Each tool is self-contained and independently testable: the UI never
contains business logic, and `logic.ts` never imports React. Adding a tool
means creating its folder and adding one entry to `src/lib/tools.ts` — the
home page, search, filters and routing all pick it up automatically.

## Technical decisions

- **Vite over Create React App.** CRA is no longer maintained; Vite gives a
  much faster dev server and a smaller, modern build with no extra
  configuration cost for this project's size.
- **No currency API key.** The original version shipped a `currencyapi.com`
  key hardcoded in the client. Any key shipped to the browser is public by
  definition, so the real fix isn't "move it to an environment variable" —
  it's not needing one. [Frankfurter](https://www.frankfurter.app/) mirrors
  the European Central Bank's daily rates and needs no key at all.
- **`HashRouter` instead of `BrowserRouter`.** GitHub Pages serves static
  files with no server-side rewrite rules, so a direct link to
  `/ferramentas/cep` would 404 under `BrowserRouter`. `HashRouter` keeps
  every route workable without extra GitHub Pages tricks (a custom 404.html,
  a basename dance, etc.).
- **Hand-rolled CPF/CNPJ check digits instead of a dependency.** The
  algorithm is ~15 lines and is exactly the kind of pure, testable logic this
  project exists to showcase.
- **No charting library for the financing chart.** A single small SVG
  polyline component covers the one chart this app needs, without the bundle
  weight of a full charting library.

## Testing strategy

- **Unit tests** cover every tool's `logic.ts` — the CPF/CNPJ check-digit
  algorithm, the Price/SAC amortization math, unit conversions, password
  strength scoring, JSON parsing, text statistics, and the CEP/currency
  fetch wrappers (network calls are mocked).
- **No snapshot tests.** Behavior is asserted directly; styling is covered by
  manual and Lighthouse/axe checks instead.

## Accessibility & SEO

- Semantic landmarks, a skip-to-content link, visible focus states and
  `aria-*` attributes on interactive controls (favorites, tabs, theme
  toggle).
- Each page sets its own `<title>`, description and Open Graph tags.
- Color contrast and keyboard navigation were checked with Lighthouse/axe;
  the light and dark themes both target WCAG AA contrast.

## Roadmap

- [ ] Full i18n (the UI is in Portuguese for the primary Brazilian audience,
      but all user-facing strings are already centralized per component,
      which is the main prerequisite for adding `react-i18next` later)
- [x] More unit converters (data storage, speed) — added digital storage
      (bytes to terabytes) and speed (m/s, km/h, mph, knots) categories
- [ ] Dark-mode-aware chart colors picked from a palette instead of CSS vars
      inline in SVG

## License

MIT — see [LICENSE](./LICENSE).
