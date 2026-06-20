# ⚡ Quick Reference — Common Tasks

## Start Development Locally

**Backend (Terminal 1):**
```bash
cd portfolio/backend
npm install
npm run dev
# Runs on http://localhost:5000
```

**Frontend (Terminal 2):**
```bash
cd portfolio/frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

---

## Update Your Resume

1. Generate new PDF from your resume tool
2. Save as `portfolio/frontend/public/resume.pdf` (replace existing)
3. No code changes needed — download button uses this file automatically

---

## Add / Update Profile Photo

1. Save your photo as `portfolio/frontend/public/profile.jpg` (or .png)
2. Open `frontend/src/data/portfolio.ts`
3. Find: `profileImage: "/profile-placeholder.svg",`
4. Change to: `profileImage: "/profile.jpg",`
5. Save and refresh

---

## Edit Content (Skills, Projects, Experience, etc.)

**One file to edit:** `frontend/src/data/portfolio.ts`

Examples:

**Change your roles in the typewriter hero:**
```typescript
roles: [
  "Full Stack Java Developer",
  "Spring Boot & React Specialist",
  "Backend Developer",
],
```

**Add a skill:**
```typescript
skills: [
  { name: "Java", level: 90 },
  { name: "Python", level: 75 },  // ← Add this
],
```

**Update your tagline:**
```typescript
tagline: "I build scalable, secure web applications...",
```

**Add a new project:**
```typescript
projects: [
  // ... existing projects
  {
    id: "my-new-project",
    title: "My New Project",
    category: "Freelance",
    description: "...",
    techStack: ["React", "Node.js"],
    highlights: ["Feature 1", "Feature 2"],
  },
]
```

Save the file → changes appear on the live site instantly (if running `npm run dev`).

---

## Gmail App Password (for contact form emails)

1. Go: https://myaccount.google.com/apppasswords
2. Select Mail + your device
3. Generate password (16 chars)
4. Copy to `backend/.env`: `GMAIL_APP_PASSWORD=abcdefghijklmnop`
5. Restart backend

If you don't see App passwords:
- Enable 2-Step Verification first (https://myaccount.google.com/security)

---

## Deploy to Production

### Vercel + Render (Easiest)

**Frontend → Vercel:**
1. Push `frontend/` to GitHub
2. Go vercel.com → Import repo
3. Root: `frontend`
4. Env var: `VITE_API_URL=https://your-render-backend.com`
5. Deploy

**Backend → Render:**
1. Push `backend/` to GitHub
2. Go render.com → New Web Service
3. Root: `backend`
4. Build: `npm install`
5. Start: `npm start`
6. Env vars (from `.env.example`):
   - `GMAIL_USER`
   - `GMAIL_APP_PASSWORD`
   - `OWNER_EMAIL`
   - `CLIENT_URL=https://your-vercel-frontend.com`
7. Deploy

Copy backend URL from Render → paste into Vercel's `VITE_API_URL` → redeploy Vercel.

**Total time: ~15 minutes. Both free tier.**

---

## Production Build

```bash
cd frontend
npm run build
# Creates optimized frontend in dist/
```

Deploy `dist/` to any static host (Vercel, Netlify, S3, etc.).

```bash
cd backend
npm start
# Runs production-ready server
```

Deploy with PM2, Docker, or a platform like Render.

---

## Check for Errors

**Frontend:**
```bash
cd frontend
npm run lint
```

**Backend:**
```bash
cd backend
node -c server.js   # Syntax check
```

---

## Environment Variables Reference

### Frontend (`frontend/.env`)
```
VITE_API_URL=http://localhost:5000  (local) or https://your-api.com (prod)
```

### Backend (`backend/.env`)
```
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=aaaa bbbb cccc dddd
OWNER_EMAIL=where@to@send@notifications.com
CLIENT_URL=http://localhost:5173  (local) or https://your-site.com (prod)
PORT=5000
```

---

## Useful Links

- **Gmail App Passwords:** https://myaccount.google.com/apppasswords
- **Vercel Docs:** https://vercel.com/docs
- **Render Docs:** https://render.com/docs
- **Node.js:** https://nodejs.org (need v16+)
- **React:** https://react.dev
- **Tailwind:** https://tailwindcss.com/docs
- **Framer Motion:** https://www.framer.com/motion

---

## File Structure Cheat Sheet

```
portfolio/
├── frontend/
│   ├── public/
│   │   ├── resume.pdf            ← Your resume
│   │   ├── profile.jpg           ← Your photo (replace placeholder)
│   │   └── favicon.svg
│   ├── src/
│   │   ├── data/
│   │   │   └── portfolio.ts      ← EDIT THIS for content updates
│   │   ├── components/
│   │   │   ├── ui/               ← Reusable UI components
│   │   │   └── sections/         ← Page sections (Hero, About, Skills, etc.)
│   │   ├── hooks/                ← Custom animation hooks
│   │   ├── App.tsx               ← Main layout
│   │   ├── main.tsx              ← React entry point
│   │   └── index.css             ← Global styles + Tailwind
│   ├── .env.example              ← Copy to .env
│   └── package.json
│
├── backend/
│   ├── routes/
│   │   └── contact.js            ← Contact form endpoint
│   ├── utils/
│   │   └── mailer.js             ← Gmail SMTP setup
│   ├── server.js                 ← Main entry point
│   ├── .env.example              ← Copy to .env
│   └── README.md                 ← Full Gmail + deployment guide
│
├── README.md                     ← Project overview
└── SETUP_GUIDE.md                ← This file
```

---

## Need Help?

1. **Read the docs** — `backend/README.md` has detailed Gmail & deployment steps
2. **Check `.env.example` files** — they show all required environment variables
3. **Look at the component structure** — everything is modular and well-commented
4. **Browser console** — press F12, check Console and Network tabs for errors

Good luck! 🚀
