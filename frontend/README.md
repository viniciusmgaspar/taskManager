
# Frontend - Desafio MedCof

This is a minimal React + Vite frontend for the Desafio MedCof project.

Prerequisites

- Node.js 18+ (recommended)
- npm

Install

```powershell
cd frontend
npm install
```

Run in development (opens at http://localhost:5173)

```powershell
npm run dev
```

Configuration

- API base URL is read from `VITE_API_URL` in `.env` (defaults to `http://localhost:3000`).
- The app stores the JWT token in `localStorage` under `token` after login.

Pages

- / -> Login
- /register -> Register
- /tasks -> List tasks (requires login)

Next steps

- Add validations, loading states, better error handling
- Add protected routes and logout
- Use React Query / SWR for data fetching
