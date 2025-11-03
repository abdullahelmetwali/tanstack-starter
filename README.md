# Tanstack Template Starter

A lightweight and modern React + TypeScript template designed for fast project setup.  
Includes essential tools and structure for scalable frontend development.

---

## Features
- **Vite** for bundling
- **React 18** with TypeScript
- **React Hook Form + Zod** for type-safe form validation
- **TanStack Query** for data fetching
- **TanStack Router** for routing
- **Axios** for HTTP requests
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Radix UI primitives** used by shadcn/ui
- **lucide** for UI components
- **Next Themes** for dark/light mode
- **i18next** for translation
- **i18next language detector** for auto locale selection
- **Zustand** for state management
- **Lucide Icons** for consistent iconography
- **Recharts** for charts
- **Vitest + Testing Library** for unit/component tests
- **TanStack Devtools** for Query and Router
- **Router plugin** with automatic route tree codegen
- **Web Vitals** reporting
- **Utilities**: clsx, class-variance-authority, tailwind-merge
- Organized folder structure ready for scaling
- Fully configured ESLint, Prettier and TailwindCSS

## Folder structure

tanstack-starter/
├─ public/
│  ├─ fonts/               # Fonts for ENGLISH - ARABIC
│  ├─ images/              # Assets - images
├─ src/
│  ├─ components/          # Reusable UI components (incl. shadcn/ui wrappers)
│  ├─ hooks/               # Reusable React hooks
│  ├─ lib/                 # Libraries fnc
│  ├─ locales/             # JSON files for translations
│  ├─ routes/              # TanStack Router routes
│  ├─ store/               # Zustand stores and providers
│  ├─ types/               # For project TS types
│  ├─ utils/               # Reusable utilities - functions
│  └─ styles.css           # Tailwind and global styles
├─ index.html
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
└─ README.md