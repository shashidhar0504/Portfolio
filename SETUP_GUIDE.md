# 🚀 Portfolio Setup Guide — Step-by-Step Instructions

Your premium, fully animated portfolio website is ready to run locally and deploy to production.

---

## 📋 What You Have

```
portfolio/
├── frontend/               React + TypeScript + Tailwind + Framer Motion
│   ├── src/
│   │   ├── components/     (UI primitives + section components)
│   │   ├── data/           (portfolio.ts — your resume content)
│   │   ├── hooks/          (typewriter, counter animations)
│   │   └── App.tsx         (main layout)
│   ├── public/
│   │   ├── resume.pdf      (your actual resume — download button works)
│   │   ├── profile-placeholder.svg  (replace with your photo)
│   │   └── favicon.svg
│   └── [config files]
│
├── backend/                Express API — Gmail SMTP contact form
│   ├── routes/contact.js   (handles form submissions)
│   ├── utils/mailer.js     (Gmail SMTP setup)
│   ├── server.js           (main entry point)
│   └── README.md           (detailed Gmail + deployment guide)
│
└── README.md               (project overview)
```

**All your resume content is in one file:** `frontend/src/data/portfolio.ts` — update that and the whole site updates.

---

## 🏃 Quick Start (Local Dev)

### Terminal 1: Backend

```bash
cd portfolio/backend
cp .env.example .env
```

Edit `backend/.env` with your Gmail credentials:

```env
GMAIL_USER=shashidharbiradar6@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx    # See backend/README.md for how to generate this
OWNER_EMAIL=shashidharbiradar6@gmail.com
CLIENT_URL=http://localhost:5173
PORT=5000
```

Then:

```bash
npm install
npm run dev
```

Expected output:
```
🚀 Backend running on http://localhost:5000
✅ Gmail SMTP connection verified — ready to send mail.
```

If you see ❌ instead, check the Gmail App Password — see `backend/README.md`.

### Terminal 2: Frontend

```bash
cd portfolio/frontend
cp .env.example .env
```

Leave `.env` as-is (it defaults to `http://localhost:5000`):

```env
VITE_API_URL=http://localhost:5000
```

Then:

```bash
npm install
npm run dev
```

Expected output:
```
➜  Local:   http://localhost:5173/
```

**Open http://localhost:5173** — your portfolio is live locally.

---

## 📸 Before Launch: Add Your Profile Photo

1. **Prepare your photo:**
   - Size: ~600x750px (portrait)
   - Format: JPG or PNG
   - File size: < 500KB

2. **Drop it in the public folder:**
   ```bash
   cp ~/your-photo.jpg portfolio/frontend/public/profile.jpg
   ```

3. **Update the reference:**
   Open `frontend/src/data/portfolio.ts` and change:
   ```typescript
   profileImage: "/profile-placeholder.svg",
   ```
   to:
   ```typescript
   profileImage: "/profile.jpg",
   ```

4. **Test locally** — refresh the site, your photo should appear in the hero section.

---

## 📄 Resume Updates

Your resume is already in `frontend/public/resume.pdf` (the file you uploaded). When you need to update it:

1. Generate a new PDF from your updated resume.
2. Replace the file at `frontend/public/resume.pdf`.
3. **Keep the filename as `resume.pdf`** — the download button points to it by default.

No code changes needed.

---

## 🔐 Gmail App Password Setup (Required for Contact Form)

The contact form sends emails using **Gmail SMTP**. You never expose your real Gmail password in code — use an **App Password** instead.

### Get your App Password (5 minutes):

1. Go to **https://myaccount.google.com/security**
2. Turn on **2-Step Verification** (if not already on)
3. Go to **App passwords** (direct: https://myaccount.google.com/apppasswords)
4. Select:
   - **App:** Mail
   - **Device:** Windows Computer (or your OS)
5. Click **Generate**
6. Google shows a 16-character password like `abcd efgh ijkl mnop` — **copy this**
7. Paste it into `backend/.env` as `GMAIL_APP_PASSWORD` (no spaces):
   ```env
   GMAIL_APP_PASSWORD=abcdefghijklmnop
   ```

**That's it.** You can revoke this password anytime from the same page without changing your real Gmail password.

Full details: **`backend/README.md`**

---

## 🌐 Deploy to Production

### Option 1: Vercel + Render (Recommended)

**Frontend → Vercel** (free, fast, easy)
**Backend → Render** (free tier, email works great)

#### Frontend on Vercel:

1. Push `portfolio/frontend` to GitHub (create a repo)
2. Go to https://vercel.com, click **"New Project"**
3. Import your GitHub repo
4. **Framework:** Vite
5. **Root Directory:** `frontend`
6. **Build:** `npm run build` (auto-detected)
7. **Output Directory:** `dist`
8. Environment variable:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```
   (Get this from Render once the backend is live)
9. Click **Deploy** — done in ~2 minutes

#### Backend on Render:

1. Push `portfolio/backend` to GitHub (same or separate repo)
2. Go to https://render.com, click **"Create +"** → **"Web Service"**
3. Connect your GitHub repo
4. **Name:** `shashidhar-portfolio-backend`
5. **Root Directory:** `backend`
6. **Build:** `npm install`
7. **Start:** `npm start`
8. **Environment:** Add these variables:
   ```
   GMAIL_USER=shashidharbiradar6@gmail.com
   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
   OWNER_EMAIL=shashidharbiradar6@gmail.com
   CLIENT_URL=https://your-vercel-frontend-url.com
   PORT=5000
   ```
9. Click **Create Web Service** — it deploys (~1 minute)
10. Copy the URL (e.g., `https://shashidhar-portfolio-backend.onrender.com`)
11. Go back to Vercel and update `VITE_API_URL` to that URL
12. Redeploy on Vercel

**Total time: ~15 minutes. Both are free.**

### Option 2: Single VPS (DigitalOcean, Linode, etc.)

For both frontend + backend on one Linux server:

```bash
# SSH into your server
ssh root@your-server-ip

# Clone your repo
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Backend
cd backend
cp .env.example .env
# Edit .env with your Gmail credentials
npm install -g pm2
npm install
pm2 start server.js --name portfolio-backend
pm2 save
cd ..

# Frontend
cd frontend
npm install
npm run build
cd ..

# Install Nginx
apt update && apt install -y nginx certbot python3-certbot-nginx

# Point Nginx to the frontend dist/
# Put this in /etc/nginx/sites-enabled/default:
```

See `backend/README.md` for full Nginx + HTTPS setup instructions.

### Option 3: Netlify (Frontend Only) + Render (Backend)

Netlify is also great for the frontend:

1. Push frontend to GitHub
2. Go to netlify.com → **"Import from Git"**
3. **Build command:** `npm run build`
4. **Publish directory:** `dist`
5. **Environment variable:** `VITE_API_URL=https://your-render-backend-url.com`

---

## 🎨 Customizing Content

Everything on the site comes from **`frontend/src/data/portfolio.ts`**. Edit this one file to change:

- Your name, roles, location, contact info
- About section
- Skills (with proficiency levels)
- Projects
- Experience
- Education
- Achievements
- Languages you speak
- Stats (projects delivered, etc.)

Example: Add a new skill

```typescript
export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "Java", level: 90 },
      { name: "Python", level: 75 },  // ← Add this
      // ...
    ],
  },
  // ...
];
```

Save, restart `npm run dev`, and the skill appears on the live site instantly.

---

## 📧 Contact Form Walkthrough

When someone fills out the contact form:

1. Form validates on the client (required fields, email format)
2. Sends JSON to `backend/api/contact`
3. Backend validates again server-side (length, regex, rate-limit)
4. If valid, backend sends **two emails** via Gmail SMTP:
   - **To you** (`OWNER_EMAIL`): Full message with reply-to set to the sender
   - **To the sender**: Auto-reply — *"Received your message — I'll contact you soon."*
5. Shows success/error toast on the frontend

The form is rate-limited to **5 submissions per 15 minutes per IP** to prevent spam.

---

## 🔧 Troubleshooting

**Frontend won't start?**
- Make sure you ran `npm install`
- Check Node version: `node -v` (need 16+)
- Clear node_modules: `rm -rf node_modules && npm install`

**Backend won't send emails?**
- Check the ❌ error message when you `npm run dev`
- Verify `GMAIL_USER` and `GMAIL_APP_PASSWORD` in `.env`
- Make sure 2-Step Verification is on in your Google Account
- App Password is 16 characters (no spaces) — paste it exactly

**Contact form shows "Network error"?**
- Backend not running? Start it in a separate terminal
- Check `VITE_API_URL` in `frontend/.env` points to the correct backend URL
- Check browser console (F12 → Network tab) for CORS errors
- If you're on a live site, make sure `CLIENT_URL` in `backend/.env` includes your frontend domain

**Animations feel laggy?**
- Reduce the number of floating elements in the Hero section
- Check your system's GPU usage
- If deploying, enable gzip compression in your hosting provider (Vercel/Netlify do this by default)

---

## 📦 What's Included

✅ **100% Verified Resume Content** — No fake projects, certifications, or claims  
✅ **Fully Responsive** — Mobile, tablet, desktop  
✅ **Production-Ready Animations** — Framer Motion, scroll reveals, typewriter effect  
✅ **Live Contact Form** — Gmail SMTP, auto-confirmation emails, rate-limited  
✅ **SEO Optimized** — Meta tags, semantic HTML, OG tags  
✅ **Accessibility** — Keyboard nav, focus indicators, reduced-motion support  
✅ **TypeScript** — Full type safety, no `any`  
✅ **Modern Stack** — React 18, Vite, Tailwind, Framer Motion  
✅ **Easy to Deploy** — Vercel + Render in ~15 minutes  

---

## 🚀 Next Steps

1. ✅ **Download the project** — it's in `/outputs/portfolio`
2. ✅ **Set up Gmail App Password** — 5 minutes (see above)
3. ✅ **Run locally** — backend + frontend, test the contact form
4. ✅ **Add your photo** — replace the placeholder
5. ✅ **Deploy to Vercel + Render** — ~15 minutes, free tier works great
6. ✅ **Share your portfolio** — recruiters will be impressed

---

## 💬 Questions?

Refer to:
- **Backend setup:** `portfolio/backend/README.md`
- **Gmail:** https://myaccount.google.com/apppasswords
- **Vercel:** https://vercel.com/docs
- **Render:** https://render.com/docs

Good luck! 🎉
