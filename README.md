# Daniel Ramirez — Portfolio

## Resumen

Soy Daniel Ramírez, desarrollador con 2 años enfocado en Frontend —
Next.js, TypeScript y todo lo que hace que una interfaz se sienta bien.
Puedo moverme al stack completo cuando el proyecto lo pide.

Busco un equipo donde pueda aportar desde el día uno y seguir creciendo.
Remoto o presencial, rol Frontend o FullStack — estoy disponible y con
ganas. Lo que ves acá es trabajo real, sin relleno.

![Vercel](https://img.shields.io/badge/deploy-vercel-black) ![Lint](https://img.shields.io/badge/lint-eslint-brightgreen)

## Stack y librerías clave

- Framework: Next.js (App Router)
- Lenguaje: TypeScript
- Estilos: Tailwind CSS
- Animaciones: GSAP (+ ScrollTrigger)
- Form & Email: EmailJS (`@emailjs/browser`)
- Íconos: `react-icons`
- Linter: ESLint

**Quick Links**

- **Environment variables:** [.env.local](.env.local#L1-L3)
- **Email config:** [src/shared/constants/contact.constants.ts](src/shared/constants/contact.constants.ts#L33-L39)
- **Contact send logic:** [src/infrastructure/repositories/ContactRepository.ts](src/infrastructure/repositories/ContactRepository.ts#L1-L60)
- **Vercel configuration:** [vercel.json](vercel.json#L1-L4)
- **Ignored files:** [.gitignore](.gitignore#L1-L20)

**Table of Contents**

- Project summary
- Requirements
- Getting started (development)
- Build & production
- Environment variables
- Project structure
- Important implementation notes
- Deployment
- Maintenance & contribution

**Project summary**

- Next.js application using the App Router and TypeScript. The codebase follows a clean architecture separation (core, infrastructure, presentation, shared).

**Requirements**

- Node.js 18+ (recommended)
- npm 9+ or compatible

**Getting started (development)**

- Clone the repository and install dependencies:

  ```bash
  git clone <repo-url>
  cd portfolio
  npm ci
  ```

- Create local environment variables (example file is provided in the repo):

  ```bash
  cp .env.example .env.local
  # Edit .env.local with your values
  ```

- Run the development server:

  ```bash
  npm run dev
  # Open http://localhost:3000
  ```

**Build & production**

- Create a production build and run locally:

  ```bash
  npm run build
  npm start
  ```

**Environment variables**

- Store secrets and configuration only in environment variables. Example variables used by this project:

  ```env
  NEXT_PUBLIC_EMAILJS_SERVICE_ID=
  NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
  NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
  ```

- Notes:
  - Variables prefixed with `NEXT_PUBLIC_` are exposed to client-side code — only place values there that are intended to be public. See [src/shared/constants/contact.constants.ts](src/shared/constants/contact.constants.ts#L33-L39).
  - For server-only secrets, use variables without the `NEXT_PUBLIC_` prefix and consume them in server-side code or API routes.

**Project structure (high level)**

- `src/app/` — Next.js App Router pages and layouts.
- `src/core/` — Domain entities, repository interfaces and use-cases.
- `src/infrastructure/` — Implementations (DI container and repository implementations). See [src/infrastructure/di/container.ts](src/infrastructure/di/container.ts#L1-L40).
- `src/presentation/` — React components and hooks used by the UI.
- `src/shared/` — Shared constants, types and utilities.
- `public/` — Static assets.

**Important implementation notes**

- Contact form: client-side flow uses `@emailjs/browser` and reads configuration from environment variables via [src/shared/constants/contact.constants.ts](src/shared/constants/contact.constants.ts#L33-L39). The send behavior is implemented in [src/infrastructure/repositories/ContactRepository.ts](src/infrastructure/repositories/ContactRepository.ts#L1-L60). Review these files when changing contact behavior.
- Logging: avoid logging PII in production. The repository contains guards to prevent email send attempts when variables are not configured.
- `.env.local` is ignored by default via [.gitignore](.gitignore#L1-L20); do not commit secrets.

**Deployment**

- The project is configured for Vercel. The `vercel.json` file contains the build and install commands: [vercel.json](vercel.json#L1-L4).
- Recommended steps for production deploy:
  1. Add project to Vercel and connect the Git repository.
  2. Add required environment variables in Vercel UI (do not commit them to git).
  3. Set up branch protection and require status checks before merging.

**Maintenance & contribution**

- Formatting & linting:
  - Lint with `npm run lint`.

- Local cleanup:
  - The repo includes a `scripts/` helper directory; add it to `.gitignore` if you don't want to publish helper scripts (already ignored in this workspace).

- Removing sensitive artifacts:
  - If a secret was accidentally committed, rotate the key immediately and remove it from git history (tools: `git filter-repo`, `BFG`). Contact team members before rewriting history.

**Troubleshooting**

- Build errors: verify Node.js version and run `npm ci` to install dependencies.
- Missing env vars: the app will generally log warnings if required env vars for third-party services are missing; ensure variables are present in the environment before running production builds.

## Contacto

- Daniel Ramirez — GitHub: https://github.com/DAMN05 — LinkedIn: https://www.linkedin.com/in/daniel-rmdev/

---
