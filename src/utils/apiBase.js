// Base URL for the Go backend API.
//
// Local dev falls back to the local server. In production set
// VITE_API_BASE_URL in the Vercel dashboard (Environment Variables):
//   - "/api/v1"                      when proxying through Vercel (vercel.json rewrite)
//   - "https://api.todo-manager.app/api/v1"  for a direct cross-origin backend
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api/v1";
