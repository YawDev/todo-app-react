# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

The **React 19 + Vite** frontend SPA for a two-service Todo app. It is a pure client tier — all persistence and business logic live in the separate Go backend ([todo-web-api](https://github.com/YawDev/todo-web-api)), reached at `http://localhost:8080/api/v1`. This SPA runs at `http://localhost:5173`.

## Commands

```bash
npm install        # install deps
npm run dev        # dev server + HMR (localhost:5173)
npm run build      # production build → dist/
npm run preview    # preview the production build
npm run lint       # ESLint
```

There is no test suite configured.

## Architecture

- **Entry:** `src/main.jsx` → `src/App.jsx`.
- **`App.jsx`** owns the `react-router-dom` routes, wraps everything in `AppContext.Provider`, and bootstraps the session by calling `AuthStatusAPI()` on mount (re-checked every 15 min).
- **Shared state** lives in `AppContext` (`src/utils/Context.js`): `isLoggedIn`, `userContext` (`{ username, id }`), `todoList`, `listId`, and their setters. There is no Redux/Zustand — Context is the single source of UI state.
- **All HTTP goes through two client modules** — never call `fetch` directly from components:
  - `src/utils/GoServiceAuth.js` — Login / Register / Logout / AuthStatus
  - `src/utils/GoServiceTodo.js` — list + task CRUD
- **`pages/`** = route-level views, **`components/`** = reusable UI, **`styles/`** = per-component CSS.

## Conventions

- Functional components + hooks only.
- Every API call uses `fetch` with `credentials: "include"` so the browser sends the backend's HttpOnly auth cookies. **Keep this on every request** or auth breaks.
- The frontend never reads or stores JWTs — tokens are HttpOnly cookies managed entirely by the backend. Don't add token-in-localStorage logic.
- API base URL is currently hardcoded (`http://localhost:8080/api/v1`) in both `GoService*.js` files. If changing environments, update both — or migrate to a `VITE_API_BASE_URL` env var.
- Styling is mixed (Tailwind 4 + Bootstrap 5 + custom CSS). Match the approach already used in the file you're editing.

## Backend contract (important)

- One list per user. `GET /GetList/{userID}` returns `{ id, user_id, tasks: [...] }`.
- Task shape: `{ id, title, description, isCompleted, list_id, created_at }`.
- Protected endpoints return `401` when the session is invalid; the client modules already special-case `data.status === 401` / `404`.
- CORS on the backend is locked to origin `http://localhost:5173` with credentials — keep the dev server on that port.

## Gotchas

- If auth "randomly" fails, check `credentials: "include"` is present and the backend cookies are `Secure` + `SameSite=None` (they are) — these require the right origin/port pairing.
- Changing routes? They're centralized in `src/App.jsx`.
