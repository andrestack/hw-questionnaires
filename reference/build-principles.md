# Build Principles — Websites & Custom Apps

*These rules apply to all Next.js projects. Follow them unless there's an explicit reason not to.*

---

## Architecture

**Feature-based folder structure** — never group by file type.

```
src/
├── app/                 # App Router pages (entry points only)
├── components/ui/       # Reusable UI primitives (Shadcn)
├── features/
│   └── [feature-name]/
│       ├── components/  # Feature-specific components
│       ├── hooks/       # Feature-specific hooks
│       ├── server/      # Server Actions / DTOs
│       ├── types/
│       └── utils/
├── lib/                 # Global configs (db, axios, query-client)
└── hooks/               # Truly global hooks (useDebounce, useClickOutside)
```

---

## React Principles

**Single Responsibility**
- A component either renders UI or manages logic — not both.
- Split any component over ~100 lines or handling multiple concerns.
- Extract all complex logic (`useEffect`, `useState`, handlers) into custom hooks. Component only consumes hook + renders JSX.

**Server vs. Client**
- Default to Server Components. Add `use client` only at the leaf level.
- Never fetch data inside `useEffect` in Client Components.
- Fetch in Server Components/Loaders and pass down as props.
- If client-side polling is needed, use TanStack Query with server hydration.

---

## Forms

Never use `useState` for form fields. Always:
1. Define schema with Zod
2. Infer type via `z.infer<typeof Schema>`
3. Use `useForm` with `zodResolver`
4. Submit via Server Actions
5. Handle `isSubmitting` state and field-level errors in the UI

---

## State Management

Decide where state lives in this order:

1. **URL (Search Params)** — filters, pagination, search, modal open/close
2. **TanStack Query** — any async/server data
3. **`useState` / `useReducer`** — UI-only (dropdown open, tooltip) — no persistence needed
4. **Zustand** — complex, high-frequency cross-app state
5. **Context API** — only for low-frequency updates (theme, user session)

---

## Performance

- Wrap expensive calculations in `useMemo`, expensive callbacks in `useCallback`.
- For 10k+ row filtering or heavy transforms, prefer Server Actions over client-side compute.
- Use `useDeferredValue` for search inputs to keep UI responsive.
- Avoid `useEffect` except for syncing with external systems (DOM events, subscriptions).
- React Compiler is assumed active — still add explicit memoization on "expensive" components.

---

## Coding Standards

- TypeScript strict mode — no `any`. Use `interface` for props.
- Avoid prop drilling beyond 2 levels — use composition (`children`/slot props) or Zustand.
- Naming: Components `PascalCase`, hooks `camelCase`, folders `kebab-case`.
- Keep component files focused. Extract logic to a custom hook if it grows past ~10 lines.

---

## Checklist (before writing any component)

1. Can this be a Server Component?
2. Should this state live in the URL?
3. Does the logic belong in a custom hook?
