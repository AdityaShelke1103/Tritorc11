# Deployment Plan

## Frontend
- **Host:** Vercel
- **Root Directory:** `frontend/my-app`
- **Framework:** Next.js (auto-detected, zero-config)
- **Production URL shape:** `https://tritorc-frontend.vercel.app`

## Backend
- **Host:** Vercel (serverless functions)
- **Root Directory:** `backend`
- **Entry point:** `backend/api/index.js` (Vercel auto-detects anything
  under `/api` as a serverless function)
- **Routing:** `backend/vercel.json` rewrites all paths to `/api/index`,
  letting Express handle internal routing
- **Production URL shape:** `https://tritorc-backend.vercel.app`
- **Endpoints:** `POST /api/scan`, `GET /api/scan/excel`

## Environment Variables
Set directly in each Vercel project's dashboard
(Settings → Environment Variables), not committed to the repo:

| Variable | Project | Purpose |
|---|---|---|
| `MONGO_URI` | Backend | MongoDB Atlas connection string |
| `OPENAI_API_KEY` | Backend | LLM enrichment of tender fields |
| `NEXT_PUBLIC_API_URL` | Frontend | Points frontend at the live backend domain |

## Why two separate projects
Backend and frontend are deployed as two independent Vercel projects
from the same monorepo (using Root Directory to scope each one). This
keeps build configs isolated — the backend needs no build step (plain
Node function), while the frontend needs a full Next.js build.

## Notable deployment decision
Initially used `pdf-parse`, which depends on `pdfjs-dist`'s canvas
APIs — incompatible with Vercel's serverless Node runtime
(`DOMMatrix is not defined`). Replaced it with `unpdf`, which has zero
native dependencies and is built for serverless/edge environments.
