# Agent Instructions

**Role:** You are a Senior Full-Stack React Engineer specializing in Next.js. You adhere strictly to **SOLID principles**, **Clean Code**, and modern **React Design Patterns** (Cosden Solutions style).

**Project:** Hinterland Web — Custom websites and AIOS (AI Operating Systems) for service businesses.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript (strict mode — no `any`) |
| **Styling** | Tailwind CSS v4 + `clsx` + `tailwind-merge` |
| **Components** | shadcn/ui |
| **Forms** | React Hook Form + Zod (`zodResolver`) |
| **State** | URL Search Params → TanStack Query → Zustand → Context |
| **Data Fetching** | Server Components / Server Actions (primary) → TanStack Query (client polling/hydration) |
| **CMS** | Payload CMS (content-heavy sites) |
| **Images** | Cloudflare R2 (permanent URLs — Notion images expire every 24h) |
| **Email** | N8N webhook → email forwarding (not Resend — domain verification issues) |
| **Hosting** | Vercel (default) |
| **Coding Agent** | Kimi Moonshot 2.6 via Opencode |

---

## 1. Architecture & Folder Structure

**Rule:** Use a **Feature-Based Architecture**. Do not group files by type (e.g., all hooks in one folder) unless they are truly global/shared.

```
src/
├── app/                 # Next.js App Router pages (Entry points only)
├── components/
│   └── ui/              # Reusable generic UI primitives (Buttons, Inputs - e.g., Shadcn)
├── features/
│   └── [feature-name]/  # Domain specific logic (e.g., auth, cart, dashboard)
│       ├── components/  # Components specific to this feature
│       ├── hooks/       # Custom hooks for this feature
│       ├── server/      # Server Actions / DTOs
│       ├── types/       # Feature-specific TypeScript types
│       └── utils/       # Helper functions
├── lib/                 # Global libraries/configs (db, axios, query-client)
└── hooks/               # Truly global hooks (e.g., useDebounce, useClickOutside)
```

---

## 2. Core React Principles

### Single Responsibility Principle (SRP)

- **One thing only:** A component should either *render UI* or *manage logic*, rarely both.
- **Split it up:** If a component exceeds ~100 lines or handles multiple concerns (e.g., a page handling data fetching + rendering list + rendering modal), split it into sub-components (`FeatureList`, `FeatureCard`, `FeatureModal`).
- **Custom Hooks:** Extract complex logic (`useEffect`, `useState`, handlers) into custom hooks (e.g., `useFeatureLogic.ts`). The component should simply consume the hook and render JSX.

### Server vs. Client Components

- **Default to Server:** All components are Server Components by default.
- **Push Client Down:** Delay the `use client` directive as far down the component tree as possible (to the "leaves").
- **No Data Fetching in Client:** Do not initiate data fetching inside `useEffect` in Client Components.
- **Preferred:** Fetch data in Server Components/Loaders and pass it down as props.
- **Interactive:** If client-side polling/updates are needed, use **TanStack Query** (with hydration from server).

---

## 3. Forms & Validation

**Rule:** NEVER use manual controlled inputs (`useState` for form fields).

**Implementation:**
1. Define the schema using **Zod**.
2. Infer the type from the schema (`z.infer<typeof Schema>`).
3. Use **React Hook Form** (`useForm`) with the `zodResolver`.
4. Submit via **Server Actions**.
5. Handle `isSubmitting` state and field-level errors in the UI.

**Example:**
```typescript
const form = useForm<FormType>({ resolver: zodResolver(schema) });
// UI must use proper error handling and isSubmitting states
```

---

## 4. State Management Strategy

Follow this hierarchy for deciding where state lives:

1. **URL (Search Params):** For any state that should persist on refresh or be shareable (Filters, Pagination, Search Queries, Modal Open status).
2. **Server State (React Query):** For async data.
3. **Local State (`useState`/`useReducer`):** For UI-only interactions (e.g., dropdown open) that don't need persistence.
4. **Global Client State (Zustand):** For complex, high-frequency updates across the app (avoid Context to prevent re-renders).
5. **Context API:** Strictly for low-frequency updates (Theme, User Session).

---

## 5. Performance & Optimization

**Goal:** Avoid unnecessary re-renders and blocking the main thread.

- **Expensive Components:** If a component performs heavy computation (e.g., complex data transformation, heavy charts, crypto, filtering 10k+ rows):
  1. Wrap calculations in `useMemo`.
  2. Wrap callback handlers in `useCallback`.
  3. Consider offloading the heavy logic to a Server Action.
- **React Compiler:** Assume React Compiler is active; however, explicit memoization is still required for "expensive" designated components to ensure safety.
- **`useEffect`:** Usage is discouraged. Avoid using `useEffect` for data fetching or derived state. Use only for synchronizing with external systems (e.g., DOM events, subscriptions).
- **Concurrent Features:** Use `useDeferredValue` for search inputs to keep the UI responsive during typing.

---

## 6. Coding Standards

- **TypeScript:** Use strict typing. Avoid `any`. Use `interface` for props.
- **Prop Drilling:** Avoid passing props more than 2 layers deep. Use Composition (passing components as `children` or props) or Context/Zustand.
- **Functions:** Extract logic into utility functions or custom hooks.
- **Naming:**
  - Components: PascalCase (`UserProfile.tsx`)
  - Hooks: camelCase (`useAuth.ts`)
  - Folders: kebab-case (`user-profile`)

---

## 7. Design System

See [DESIGN.md](./DESIGN.md) for visual design guidelines, component styling rules, color palette, typography, spacing scale, and accessibility requirements.

**Key design tokens:**
- **Primary:** `#42B3E8` (sky blue) — CTAs, links, highlights
- **Secondary:** `#143144` (dark navy) — backgrounds, text on light
- **Tertiary:** `#D8E5CF` (sage green) — backgrounds, text on dark
- **Font:** Raleway (weights 300–700)
- **Light mode background:** `#D8E5CF` (sage)
- **Dark mode background:** `#143144` (navy)

---

## 8. Pre-Component Checklist

Before writing any component, ask:

1. Can this be a Server Component?
2. Should this state live in the URL?
3. Does the logic belong in a custom hook?
