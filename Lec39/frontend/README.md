# Auth Frontend

Next.js (App Router, TypeScript, Tailwind) frontend for a full-stack authentication app.

## Setup

```bash
npm install
npm run dev      # http://localhost:3001
```

Requests go to `/api/*` and are proxied by Next (`next.config.ts` rewrites) to the backend.
By default, it points to `http://localhost:3000`. Override with the `API_URL` env variable
(it is read at build time).

## Pages

| Path | Description |
|---|---|
| `/sign-up` | Register |
| `/sign-in` | Sign in, JWT stored in `localStorage` |
| `/profile` | Current user, edit profile, delete account |
| `/users` | All users (admin can delete) |
| `/users/[id]` | User details |
