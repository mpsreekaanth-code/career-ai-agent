# CareerAI — AI Resume, CV & Formal Letter Generator

A full-stack application using React + Vite + Tailwind CSS, Express, and the Google Gemini API.

## Features
- Generate resumes, CVs, cover letters, formal letters, and applications
- Conversational-style document brief through a single form
- AI content generation through a server-side API powered by Google Gemini
- Editable preview
- Print / Save as PDF from the browser
- Copy generated text
- Clear error handling and API key kept secure on the server

## Requirements
- Node.js 20+
- A Google Gemini API key (from [Google AI Studio](https://aistudio.google.com/))

## Local Development

### 1. Configure the backend
```bash
cd career-ai-agent/backend
npm install
cp .env.example .env
```
Add your `GEMINI_API_KEY` to `backend/.env`.

### 2. Start the backend
```bash
npm run dev
```
Backend runs at http://localhost:5000.

### 3. Start the frontend
Open another terminal:
```bash
cd career-ai-agent/frontend
npm install
npm run dev
```
Open the Vite URL shown in the terminal (http://localhost:5173).

---

## Deploy to Vercel

The project is configured for seamless full-stack deployment on Vercel:
- **Frontend**: Built with Vite and served statically with SPA routing.
- **Backend**: Runs as a Vercel Serverless Function via `/api/*`.

### Option A: 1-Click via GitHub (Recommended)
1. Push your repository to GitHub.
2. Go to your [Vercel Dashboard](https://vercel.com/) and click **Add New > Project**.
3. Import your repository (`mpsreekaanth-code/career-ai-agent`).
4. Under **Environment Variables**, add:
   - `GEMINI_API_KEY`: Your Google Gemini API key.
   - `GEMINI_MODEL`: `gemini-3.5-flash` (optional, defaults to `gemini-flash-latest`).
5. Click **Deploy**.

### Option B: Deploy via Vercel CLI
1. Log in to Vercel:
   ```bash
   npx vercel login
   ```
2. Deploy to production:
   ```bash
   npx vercel --prod
   ```
3. Set your environment variable in Vercel:
   ```bash
   npx vercel env add GEMINI_API_KEY
   ```
