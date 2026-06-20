# Backend — Contact Form API (Gmail SMTP)

A small Express API with one job: receive the portfolio contact form, email you the message, and send the sender an automatic confirmation reply.

## 1. Generate a Gmail App Password

Never put your real Gmail password in code. Use an **App Password** instead:

1. Go to your Google Account → **Security**.
2. Turn on **2-Step Verification** if it isn't already on (App Passwords require it).
3. Go to **Security → 2-Step Verification → App passwords**
   (direct link: https://myaccount.google.com/apppasswords).
4. Choose **"Mail"** as the app, give it a name like `Portfolio Contact Form`, and click **Generate**.
5. Google shows a 16-character password (e.g. `abcd efgh ijkl mnop`). Copy it — you won't see it again.

## 2. Configure environment variables

```bash
cd backend
cp .env.example .env
```

Edit `.env`:

```env
GMAIL_USER=youraddress@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop   # the 16-char App Password, no spaces
OWNER_EMAIL=shashidharbiradar6@gmail.com
CLIENT_URL=http://localhost:5173
PORT=5000
```

## 3. Run locally

```bash
npm install
npm run dev
```

You should see:

```
🚀 Backend running on http://localhost:5000
✅ Gmail SMTP connection verified — ready to send mail.
```

If you see a ❌ instead, double-check `GMAIL_USER` / `GMAIL_APP_PASSWORD` and that 2-Step Verification is enabled on the Gmail account.

## 4. How it works

- `POST /api/contact` with `{ name, email, message }`
- Validates input server-side (length, required fields, email format)
- Rate-limited to 5 submissions per 15 minutes per IP
- Sends **two** emails via Gmail SMTP (Nodemailer):
  1. A notification to you (`OWNER_EMAIL`) with the message, set to reply-to the sender
  2. An auto-reply to the sender: *"Received your message — I'll contact you soon."*

## 5. Deploying (Render / Railway / VPS)

This is a standard Node/Express app — any of these work:

### Render / Railway
1. Push this `backend/` folder to a GitHub repo.
2. Create a new **Web Service**, point it at the repo.
3. Build command: `npm install`
4. Start command: `npm start`
5. Add the environment variables from `.env` in the dashboard's "Environment" section.
6. Once deployed, copy the live URL (e.g. `https://your-app.onrender.com`).

### VPS (Ubuntu, etc.)
```bash
git clone <your-repo>
cd backend
npm install
cp .env.example .env   # then fill in real values
npm install -g pm2
pm2 start server.js --name portfolio-backend
pm2 save
```
Put it behind Nginx with HTTPS (e.g. via Certbot) so the frontend can call it over `https://`.

## 6. Connect the frontend

In `frontend/.env`, set:

```env
VITE_API_URL=https://your-deployed-backend-url.com
```

Also update `CLIENT_URL` in the backend's `.env` to your deployed **frontend** URL, so CORS allows it:

```env
CLIENT_URL=https://your-deployed-frontend-url.com
```

## Security notes

- The App Password is scoped to mail-sending only and can be revoked anytime from Google Account → Security → App Passwords, without changing your real password.
- `.env` is git-ignored — never commit it.
- Input is validated and length-capped server-side; the contact route is rate-limited per IP.
