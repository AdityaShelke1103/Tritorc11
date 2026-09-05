# Tritorc — Tender Scanner

Extracts text from tender documents (PDF/DOCX), matches them against a
predefined keyword list, scores relevance, and generates an Excel report.

## Project Structure
<<<<<<< HEAD


## Prerequisites
- Node.js 18+
- A MongoDB connection string (e.g. from MongoDB Atlas)
- An OpenAI API key

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

Run it:

```bash
npm run dev
```

The API runs at `http://localhost:5000`. Main endpoints:
- `POST /api/scan` — upload documents (`documents` field, multipart form, up to 10 files)
- `GET /api/scan/excel` — download the generated Excel report

## Frontend Setup

```bash
cd frontend/my-app
npm install
```

Create `.env.local` in `frontend/my-app/`:

Run it:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Tech Stack
- Backend: Express, Mongoose, unpdf (PDF text extraction), mammoth (DOCX), ExcelJS
- Frontend: Next.js, React
- Deployment: Vercel (see DEPLOY.md)


