# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js App Router project focused on a landing page.

- `app/`: route entrypoints and global styling (`layout.tsx`, `page.tsx`, `globals.css`).
- `components/`: page sections and reusable UI. Section components use kebab-case file names (for example, `hero-section.tsx`), while exports use PascalCase.
- `components/ui/`: shared primitive UI components.
- `lib/`: shared utilities and server-side actions (for example, `contact-actions.ts`).
- `hooks/`: custom React hooks.
- `public/`: static files and images.

## Build, Test, and Development Commands

Use Yarn (lockfile is `yarn.lock`):

- `yarn dev`: run local development server at `http://localhost:3000`.
- `yarn build`: create production build.
- `yarn start`: run the production build locally.
- `yarn lint`: run ESLint checks.

## Coding Style & Naming Conventions

- Language: TypeScript + React function components.
- Formatting is enforced by Prettier (`.prettierrc`): single quotes, trailing commas, avoid parens for single-arg arrows.
- Linting uses `eslint-config-next` + TypeScript + `eslint-config-prettier`.
- Prefer path aliases (`@/components/...`, `@/lib/...`) over long relative imports.
- File names: kebab-case for component/module files (`contact-form.tsx`), camelCase for hook names (`useInView` in `use-in-view.ts`).

## Testing Guidelines

There is currently no dedicated test framework configured in this repository. For changes:

- Run `yarn lint` before opening a PR.
- Manually verify key flows in `yarn dev` (page render, navigation behavior, contact form submission success/failure).
- If adding tests, co-locate with source as `*.test.ts` / `*.test.tsx` and document the command in `package.json`.

## Security & Configuration Tips

- Do not commit secrets or webhook credentials.
- Move environment-specific endpoints to environment variables when extending integrations.
