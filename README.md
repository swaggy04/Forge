# Forge — Modern AI-Powered Resume Builder

Forge is an open-source, full-stack resume builder designed to help professionals craft, organize, and export ATS-optimized resumes. Powered by **Next.js 16**, **React 19**, **Prisma ORM**, **Clerk Authentication**, and **Google Gemini AI**, Forge combines real-time editing and live previewing with automated resume generation capabilities.

---

## Features

- **Multi-Step Structured Editor**:
  - Step-by-step form navigation: *General Info*, *Personal Info*, *Work Experience*, *Education*, *Projects*, *Skills*, and *Summary*.
  - Comprehensive field validation powered by **Zod** and **React Hook Form**.
- **AI-Powered Resume Drafting**:
  - Automated professional summary generation tailored to your job title, experience, and skills.
  - ATS-friendly work experience bullet point enhancement with impactful action verbs.
  - Project description generator with tech-stack highlighting and plain-text ATS formatting.
  - Resilient API execution with automated retries and exponential backoff using **Google Gemini 2.5 Flash**.
- **Real-Time Live Preview & Autosave**:
  - Live side-by-side resume rendering as you type.
  - Debounced background autosave ensuring progress is never lost.
  - URL synchronization for seamless transitions between resume creation and editing.
- **Customization & Layout**:
  - Accent color picker supporting custom HEX shades.
  - Selectable border styles (squircle and geometric frames).
  - Drag-and-drop reordering for work experiences, educations, projects, and skills using **@dnd-kit**.
- **Categorized Skills Matrix**:
  - Classify skills into dedicated technical domains: Language, Frontend, Backend, Database, Tool, Cloud, DevOps, Mobile, AI, Concept, and Other.
- **Photo Uploads**:
  - Candidate profile picture uploads directly to **Vercel Blob** storage with size and MIME validation.
  - Automatic purging of orphaned or replaced images.
- **PDF & Print Ready**:
  - Standardized paper format styling with one-click print-to-PDF via **react-to-print**.
- **User Dashboard**:
  - Centralized dashboard to view, edit, duplicate, and delete existing resumes.
  - Quick statistics overview and visual card previews.

---

## Tech Stack

| Domain | Technology |
|---|---|
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) |
| **Frontend Library** | [React 19](https://react.dev/) & [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & [tw-animate-css](https://github.com/) |
| **UI Primitives** | [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/), [Hugeicons](https://hugeicons.com/) |
| **Authentication** | [Clerk](https://clerk.com/) (`@clerk/nextjs`) |
| **Database** | [PostgreSQL](https://www.postgresql.org/) |
| **ORM** | [Prisma ORM](https://www.prisma.io/) |
| **AI Engine** | [Google GenAI SDK](https://github.com/google/generative-ai-js) (`gemini-2.5-flash`) |
| **File Storage** | [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) |
| **State & Forms** | [Zustand](https://github.com/pmndrs/zustand), [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) |
| **Drag & Drop** | [@dnd-kit](https://dndkit.com/) |
| **Export** | [react-to-print](https://github.com/gregnb/react-to-print) |

---

## Architecture Overview

Forge leverages React Server Components and Server Actions to securely process resume updates, authenticate users, and interact with external AI and storage services.

For an in-depth breakdown of system components, entity-relationship diagrams, security policies, and AI prompt pipelines, see the [Architecture Documentation](docs/ARCHITECTURE.md).

---

## Prerequisites

Before setting up Forge locally, ensure you have:
- **Node.js**: `v20.19.0` or higher (Node 20+ recommended)
- **Package Manager**: `npm` (v10+), `pnpm`, or `yarn`
- **Database**: Accessible PostgreSQL instance (Local, Neon, Supabase, or AWS RDS)
- **Clerk Account**: For application authentication and session management
- **Google AI Studio API Key**: For Gemini AI features
- **Vercel Blob Token**: For candidate photo uploads

---

## Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/swaggy04/Forge.git
cd Forge
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory by copying `.env.example`:

```bash
cp .env.example .env
```

Populate the required keys in `.env`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/forge?schema=public"
DATABASE_URL_UNPOOLED="postgresql://user:password@localhost:5432/forge?schema=public"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL="/resume"
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL="/resume"

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."

# Google Gemini AI
GEMINI_API_KEY="AIzaSy..."
```

### 4. Initialize Database Schema

Generate the Prisma Client and push the schema to your PostgreSQL database:

```bash
# Push schema to database
npx prisma db push

# Generate Prisma Client types
npx prisma generate
```

*(Optional)* Launch Prisma Studio to inspect your database records visually:

```bash
npx prisma studio
```

### 5. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Next.js development server at `http://localhost:3000`. |
| `npm run build` | Builds the production-optimized Next.js application. |
| `npm run start` | Runs the compiled production build. |
| `npm run lint` | Runs ESLint to check for code quality and TypeScript conventions. |

---

## Project Structure

```text
forge/
├── app/                              # Next.js App Router
│   ├── (auth)/                       # Clerk authentication pages
│   │   ├── sign-in/                  # Sign-in route
│   │   └── sign-up/                  # Sign-up route
│   ├── (main)/                       # Protected application routes
│   │   ├── editor/                   # Multi-step resume editor
│   │   │   ├── forms/                # Form sections & AI generation actions
│   │   │   ├── resumeeditor/         # Editor component & live preview
│   │   │   └── actions.ts            # saveResume server action
│   │   └── resume/                   # Dashboard listing & delete actions
│   ├── about/                        # About landing section
│   ├── globals.css                   # Global styles & Tailwind config
│   ├── layout.tsx                    # Root layout with ClerkProvider
│   └── page.tsx                      # Public landing page
├── components/                       # Shared React components
│   ├── dashboard/                    # Dashboard cards, lists, & sidebars
│   ├── ui/                           # Radix / shadcn UI primitives
│   ├── Herosection.tsx               # Landing hero section
│   ├── ResumePreview.tsx             # Printable resume preview layout
│   └── SplitEditorPreview.tsx        # Split screen editor & preview panel
├── docs/                             # Project documentation
│   └── ARCHITECTURE.md               # Architecture, ERD, and security docs
├── hooks/                            # Custom React hooks (autosave, debounce, etc.)
├── lib/                              # Core utilities and client singletons
│   ├── gemini.ts                     # Google GenAI client instance
│   ├── prisma.ts                     # Prisma client singleton
│   ├── types.ts                      # Shared types & Prisma payload includes
│   ├── utils.ts                      # Utility functions (cn, mapper)
│   └── validation.ts                 # Zod validation schemas
├── prisma/
│   └── schema.prisma                 # Database models and relations
├── proxy.ts                          # Clerk edge authentication middleware
├── next.config.ts                    # Next.js configuration & image domains
├── package.json                      # Project dependencies and scripts
└── tsconfig.json                     # TypeScript compiler configuration
```

---

## Security & Boundaries

- **Authentication Enforcement**: Protected routes (`/resume`, `/editor`) and server actions require authenticated sessions verified via Clerk.
- **Tenant Isolation**: Every database operation enforces strict tenant matching (`where: { id, userId }`), preventing unauthorized access or modification of other users' resumes.
- **File Upload Protection**: Image uploads are restricted to `image/*` formats under 4MB. Server Actions enforce a matching 4MB payload limit.
- **External Asset Whitelisting**: Remote images are strictly locked to configured Vercel Blob domains in `next.config.ts`.
- **Secret Protection**: API keys (`GEMINI_API_KEY`, `CLERK_SECRET_KEY`, `BLOB_READ_WRITE_TOKEN`, database credentials) are strictly server-side and never exposed to client bundles.

---

## Limitations

- **Print Layout**: Resume styling is optimized for standard single-page or cleanly broken multi-page letter/A4 formats via `react-to-print`; complex multi-column overflow depends on browser print engines.
- **AI Rate Limits**: Gemini API calls include a 3-attempt retry loop with exponential backoff, but remain subject to Google Cloud project quotas.
- **Automated Testing**: The repository currently relies on TypeScript static analysis and ESLint; automated test suites (Jest/Vitest/Playwright) are planned for future releases.

---

## Contributing & License

Contributions are welcome! Please create a feature branch and submit a pull request for review.

Licensed under the [MIT License](LICENSE).
