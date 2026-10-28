# Contributing to Simplify

Thanks for considering a contribution! This is a small portfolio project, but
pull requests, bug reports and tool suggestions are welcome.

## Getting started

```bash
npm install
npm run dev
```

See the [README](./README.md) for the full list of scripts.

## Adding a new tool

Each tool is a self-contained module under `src/tools/<tool-id>/`:

- `logic.ts` — pure, framework-free functions with the actual behavior.
- `logic.test.ts` — unit tests for those functions.
- `<ToolName>Tool.tsx` — the React component that wires the UI to the logic.
- `<ToolName>Tool.module.css` — component-scoped styles.

Register the tool in `src/lib/tools.ts` (name, description, route, icon,
tags) and it will automatically show up on the home page, in search and in
routing.

## Before opening a pull request

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

All four must pass; CI runs the same checks on every PR.

## Commit style

This project follows [Conventional Commits](https://www.conventionalcommits.org/)
(`feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`).

## Code of conduct

Be respectful and constructive. This is a learning-focused project — questions
and beginner-friendly PRs are welcome.
