const express = require("express");
const { sendOwnerNotification, sendSenderConfirmation } = require("./mailer");

const router = express.Router();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/", async (req, res) => {
  const { name, email, message } = req.body || {};

  // Basic server-side validation — never trust the client.
  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email, and message are all required." });
  }
  if (typeof name !== "string" || name.trim().length < 2 || name.length > 100) {
    return res.status(400).json({ message: "Please enter a valid name." });
  }
  if (typeof email !== "string" || !EMAIL_REGEX.test(email) || email.length > 150) {
    return res.status(400).json({ message: "Please enter a valid email address." });
  }
  if (typeof message !== "string" || message.trim().length < 5 || message.length > 5000) {
    return res.status(400).json({ message: "Message must be between 5 and 5000 characters." });
  }

  const clean = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  };

  try {
    // Notify the site owner, then auto-reply to the sender.
    await sendOwnerNotification(clean);
    await sendSenderConfirmation(clean);

    return res.status(200).json({
      message: "Received your message — I'll contact you soon.",
    });
  } catch (err) {
    console.error("Contact form email error:", err);
    return res.status(502).json({
      message: "Your message could not be sent right now. Please try again shortly or email directly.",
    });
  }
});

module.exports = router;
