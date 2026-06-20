require("dotenv").config();

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const contactRoute = require("./contact");
const { verifyTransport } = require("./mailer");

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// --- Middleware ---
app.use(
  cors({
    origin: CLIENT_URL.split(",").map((url) => url.trim()),
  })
);
app.use(express.json({ limit: "20kb" }));

// Limit the contact form to 5 submissions per 15 minutes per IP to prevent abuse.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: "Too many messages sent. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

// --- Routes ---
app.get("/", (req, res) => {
  res.json({ status: "ok", service: "shashidhar-portfolio-backend" });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/contact", contactLimiter, contactRoute);

// --- Fallback error handler ---
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Unexpected server error." });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
  console.log(`   Allowing requests from: ${CLIENT_URL}`);
  verifyTransport();
});
