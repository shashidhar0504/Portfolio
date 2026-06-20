# 🏗️ Architecture & Data Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         PRODUCTION SETUP                         │
└─────────────────────────────────────────────────────────────────┘

                            User's Browser
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
              ┌──────────┐              ┌────────────┐
              │ Vercel   │              │   Render   │
              │ (Static) │              │ (API)      │
              └──────────┘              └────────────┘
                    │                        │
    ┌───────────────┼────────────────────────┼───────────────┐
    │               │                        │               │
    │      React SPA                  Node.js Express        │
    │   (frontend/dist)              (backend/server.js)     │
    │                                                        │
    │   • Hero, About, Skills        • POST /api/contact    │
    │   • Projects, Experience       • Validate input       │
    │   • Education, Contact Form    • Gmail SMTP           │
    │   • Smooth animations          • Send 2 emails        │
    │                                                        │
    └──────────────────────────────────────────────────────┘
                              │
                              │
                    ┌─────────────────┐
                    │   Gmail SMTP    │
                    │ (Nodemailer)    │
                    └─────────────────┘
                              │
            ┌─────────────────┴─────────────────┐
            │                                   │
      ┌─────────────┐                  ┌───────────────┐
      │ Email to    │                  │ Auto-reply to │
      │ Site Owner  │                  │ Form Sender   │
      │ (notification)                 │ (confirmation)│
      └─────────────┘                  └───────────────┘
```

---

## Local Development Setup

```
┌──────────────────────────────────────┐
│      Your Computer (localhost)        │
└──────────────────────────────────────┘
         │                    │
         │                    │
    ┌────┴─────┐         ┌────┴──────┐
    │ Terminal1 │         │ Terminal2  │
    └─────┬────┘         └────┬───────┘
          │                   │
     npm run dev         npm run dev
          │                   │
    ┌─────▼───────┐     ┌────▼──────┐
    │ Backend     │     │ Frontend   │
    │ :5000       │     │ :5173      │
    └─────┬───────┘     └────┬───────┘
          │                   │
          │        ┌──────────┘
          │        │
          └────┬───┘
               │
          User Browser
          http://localhost:5173
               │
        ┌──────┴──────┐
        │              │
   View Site    Submit Contact Form
        │              │
        └──────┬───────┘
               │
          Backend API
          POST :5000/api/contact
               │
          ┌────┴─────┐
          │           │
     Validate    Send Emails
          │           │
          └──────┬────┘
                 │
           Gmail SMTP
```

---

## Contact Form Data Flow (Detailed)

```
User fills form (name, email, message)
    ↓
Frontend validates (required, length, email format)
    ↓
[Valid] → POST http://localhost:5000/api/contact
[Invalid] → Show error toast on form
    ↓
Backend receives JSON
    ↓
Server-side validation (length caps, regex, rate-limit)
    ↓
[Invalid] → Return 400 error
[Valid] → Continue
    ↓
Send Email #1: NOTIFICATION
  From: Gmail SMTP (your account)
  To: OWNER_EMAIL (shashidharbiradar6@gmail.com)
  Reply-To: Form sender's email
  Subject: New portfolio message from [Name]
  Body: Name, email, message in formatted HTML
    ↓
Send Email #2: AUTO-REPLY
  From: Gmail SMTP
  To: Form sender's email
  Subject: Thanks for reaching out!
  Body: "Received your message — I'll contact you soon."
    ↓
Return success response (200)
    ↓
Frontend shows green toast:
"Received your message — I'll contact you soon.
 A confirmation has been sent to your email."
```

---

## Content Updates Flow

```
User edits: frontend/src/data/portfolio.ts
    ↓
Save file
    ↓
Vite detects change (HMR)
    ↓
All components re-render with new data:
  • Hero (name, roles, tagline)
  • About (summary, highlights)
  • Skills (categories + progress)
  • Projects (cards + tech stack)
  • Experience (timeline)
  • Education (timeline)
  • Achievements (list)
  • Contact (owner info)
    ↓
Browser refreshes in ~500ms
    ↓
Live site shows updates
```

---

## Database & Storage Model

**NO DATABASE NEEDED** — This is a static site + API:

- **Frontend:** All content in `frontend/src/data/portfolio.ts` (TypeScript object)
- **Backend:** Stateless API — receives form, sends email, no persistence
- **Contact Form Responses:** Emailed to you, stored in your Gmail inbox

To add a database later (for form history, comments, etc.):
1. Add a DB client (MongoDB, PostgreSQL, Supabase)
2. Update `backend/routes/contact.js` to write to DB before/after sending email
3. Add a new endpoint to fetch stored submissions

For now, everything is simple and deploys instantly.

---

## Environment Variables Dependency Graph

```
                 frontend/.env
                       │
        ┌──────────────┘
        │
   VITE_API_URL ──→ Tells frontend where the backend is
                   (http://localhost:5000 locally,
                    https://your-api.com in production)

                backend/.env
        ┌────────────────────────┐
        │                        │
   GMAIL_USER          GMAIL_APP_PASSWORD
        │                        │
        └────────┬───────────────┘
                 │
        Nodemailer SMTP connection
                 │
        ┌────────┴──────────┐
        │                   │
      OWNER_EMAIL      CLIENT_URL
        │                   │
   Where to send      Which frontend domains
   notifications      can call the API (CORS)
```

---

## Deployment Paths

### Path 1: Vercel + Render (Recommended)

```
GitHub Repo
    │
    ├─ Vercel (connect /frontend)
    │   Build: npm run build
    │   Output: dist/
    │   Deploy: Static files to CDN
    │   Custom Domain: your-domain.com
    │
    └─ Render (connect /backend)
        Build: npm install
        Start: npm start
        Deploy: Node.js container
        Custom Domain: api.your-domain.com
```

### Path 2: Single VPS (DigitalOcean, Linode, etc.)

```
VPS (Linux)
    │
    ├─ Nginx (port 80/443)
    │   ├─ Serve frontend (static files)
    │   └─ Proxy /api to backend
    │
    └─ PM2 (runs backend)
        └─ Node.js backend server
```

### Path 3: Docker + Any Host

```
Dockerfile (builds both frontend + backend)
    │
    ├─ Build stage: npm run build (frontend)
    ├─ Build stage: npm install (backend)
    │
    └─ Runtime: Run both services in container
        Deploy to: Heroku, AWS, Fly.io, etc.
```

---

## Performance Characteristics

| Metric              | Value              | Why |
|---------------------|--------------------|-----|
| Frontend JS (gzipped) | ~102 KB            | React 18 + deps, optimized by Vite |
| CSS (gzipped)       | ~4.9 KB            | Tailwind purged unused classes |
| Initial Load        | ~1-2 sec (local)   | Depends on network; small assets |
| Time to Interactive | ~800ms (local)     | Vite dev server, fast bundler |
| Animations FPS      | 60 FPS target      | Framer Motion GPU-accelerated |
| Contact Form Send   | ~1-2 sec           | Gmail SMTP + email delivery |

Optimizations built-in:
- Code splitting (Vite)
- Tree-shaking (TypeScript)
- Image lazy loading (planned)
- CSS purging (Tailwind)
- Gzip compression (hosting)
- GPU-accelerated animations

---

## Error Handling

### Frontend
- Form validation errors: Displayed as inline toasts
- Network errors: "Network failed. Please try again." toast
- Reduced motion: Respects `prefers-reduced-motion` setting

### Backend
- Missing fields: 400 Bad Request
- Invalid email: 400 Bad Request
- Message too long: 400 Bad Request
- Rate limit exceeded: 429 Too Many Requests (5 per 15 min)
- SMTP failure: 502 Bad Gateway (email couldn't send)
- Server crash: 500 Internal Server Error

---

## Security

✅ **Frontend:**
- Input validated client + server-side
- No secrets in code
- HTTPS-only in production
- XSS protection via escapeHtml()

✅ **Backend:**
- CORS whitelisting (only allow your domain)
- Rate limiting (5 submissions per 15 min per IP)
- Input length caps (prevent buffer overflows)
- Email sanitization (prevent injection)
- Gmail App Password (scoped, revokable)
- `.env` gitignored (secrets never committed)

✅ **Email:**
- Reply-to set to sender (you can reply directly)
- HTML escaping (prevent email injection)
- No credentials logged (never expose App Password)

---

## Scaling Considerations

As your portfolio grows or you add features:

1. **More projects?** Add to `portfolio.ts` — no changes needed
2. **Want form history?** Add a database (MongoDB, PostgreSQL)
3. **Need analytics?** Add Vercel Analytics or Plausible
4. **Want comments on projects?** Add database + auth
5. **Need admin dashboard?** Create a separate Next.js app calling the same API

The architecture scales because:
- Frontend is fully static (CDN cacheable)
- Backend is stateless (horizontal scaling)
- Data lives in Git (version controlled)

Good design for a portfolio!
