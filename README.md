# Shashidhar Biradar — Portfolio Website

A premium, fully animated portfolio site for Shashidhar Biradar, Full Stack Java Developer.

```
portfolio/
├── frontend/   React + TypeScript + Vite + Tailwind CSS + Framer Motion
└── backend/    Express API — Gmail SMTP contact form + auto-reply
```

All content (projects, skills, experience, education) is sourced directly from his resume and lives in `frontend/src/data/portfolio.ts` — edit that one file to update anything on the site.

## Quick Start

### 1. Backend (contact form / email)

```bash
cd backend
cp .env.example .env     # then fill in your Gmail App Password — see backend/README.md
npm install
npm run dev               # runs on http://localhost:5000
```

Full Gmail SMTP setup + deployment guide: **`backend/README.md`**

### 2. Frontend

```bash
cd frontend
cp .env.example .env      # VITE_API_URL should point at the backend above
npm install
npm run dev                # runs on http://localhost:5173
```

Open http://localhost:5173 — the site should load with the backend wired up for the contact form.

## Before going live

1. **Profile photo** — replace `frontend/public/profile-placeholder.svg`. Easiest: drop in `profile.jpg` (or `.png`), then update `profileImage` in `frontend/src/data/portfolio.ts` to `/profile.jpg`.
2. **Resume** — `frontend/public/resume.pdf` is already your real resume (copied from your upload). Replace this file directly whenever you update your resume — the filename must stay `resume.pdf`, or update `resumeFile` in `portfolio.ts` to match.
3. **Gmail SMTP** — follow `backend/README.md` to generate an App Password and deploy the backend.
4. **Production build** — `cd frontend && npm run build` outputs static files to `frontend/dist/`, deployable to Vercel, Netlify, or any static host. Just make sure `VITE_API_URL` in the frontend's production env points at your live backend URL.

## Tech stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide icons, react-scroll
- **Backend:** Node.js, Express, Nodemailer (Gmail SMTP), express-rate-limit, CORS

## Sections included

Hero · About · Skills (animated progress bars) · Projects · Experience · Education (timeline) · Achievements · Contact (live form with Gmail confirmation emails) · Footer
