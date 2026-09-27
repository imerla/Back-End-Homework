# Auth API

NestJS + MongoDB authentication API (JWT, no Passport).

## Setup

```bash
npm install
cp .env.example .env   # fill in MONGO_URI and JWT_SECRET
npm run start:dev      # http://localhost:3000
```

## Routes

| Method | Path | Guard | Description |
|---|---|---|---|
| POST | `/auth/sign-up` | — | Register (`fullName`, `email`, `password`) |
| POST | `/auth/sign-in` | — | Returns JWT as a raw string |
| GET | `/auth/current-user` | Auth | Current user |
| GET | `/users` | — | All users |
| GET | `/users/:id` | — | One user |
| PATCH | `/users` | Auth | Update own profile |
| DELETE | `/users` | Auth | Delete own account |
| DELETE | `/users/:id` | Auth + Admin | Admin deletes a user |

Send the token as `Authorization: Bearer <token>`.
