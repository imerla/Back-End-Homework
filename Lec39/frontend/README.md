# Auth Frontend

Next.js (App Router, TypeScript, Tailwind) frontend for a full-stack authentication app.

## Live URLs

- Frontend: https://front-end-vercel-git-master-imera.vercel.app
- Backend: https://back-end-render-bbn4.onrender.com

## Setup

```bash
npm install
npm run dev      # http://localhost:3001
```

Requests go to `/api/*` and are proxied by Next (`next.config.ts` rewrites) to the backend.
By default, local development uses `http://localhost:3000`, while production uses the Render backend URL.
You can still override this with the `API_URL` environment variable in Vercel or locally.

## Deployment

For production hosting, set:

```bash
API_URL=https://back-end-render-bbn4.onrender.com
```

For local development, either leave it unset or set:

```bash
API_URL=http://localhost:3000
```

## Pages

| Path | Description |
|---|---|
| `/sign-up` | Register |
| `/sign-in` | Sign in, JWT stored in `localStorage` |
| `/profile` | Current user, edit profile, delete account |
| `/users` | All users (admin can delete) |
| `/users/[id]` | User details |
