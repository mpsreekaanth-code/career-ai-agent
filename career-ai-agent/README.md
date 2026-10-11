# CareerAI — AI Resume, CV & Formal Letter Generator

A starter MERN-style project using React + Vite + Tailwind CSS, Express, MongoDB (optional for this MVP), and the OpenAI Responses API.

## Features
- Generate resumes, CVs, cover letters, formal letters, and applications
- Conversational-style document brief through a single form
- AI content generation through a server-side API
- Editable preview
- Print / Save as PDF from the browser
- Copy generated text
- Clear error handling and API key kept on the server

> This is a working MVP starter, not a production-hardened SaaS. It does not yet include authentication, saved document history, DOCX export, billing, or a full autonomous tool loop.

## Requirements
- Node.js 20+
- An OpenAI API key
- Optional MongoDB URI if you want to extend it with persistence

## 1. Configure the backend
```bash
cd backend
npm install
cp .env.example .env
```
Put your API key in `backend/.env`. Set `OPENAI_MODEL` to a model available to your account.

## 2. Start the backend
```bash
npm run dev
```
Backend runs at http://localhost:5000.

## 3. Start the frontend
Open another terminal:
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
Open the Vite URL shown in the terminal.

## Notes
- Never place the OpenAI API key in frontend code or commit `.env`.
- Review every generated document for accuracy before sending it.
- The app should never invent degrees, dates, job titles, skills, awards, or experience. Fill unknown details with placeholders or omit them.
- Browser print dialog can save the document as PDF. DOCX export can be added using the `docx` package.
