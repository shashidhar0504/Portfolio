const nodemailer = require("nodemailer");

// Gmail SMTP transport using an App Password (never use your real Gmail password here).
// See backend/README.md for how to generate a Gmail App Password.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

async function verifyTransport() {
  try {
    await transporter.verify();
    console.log("✅ Gmail SMTP connection verified — ready to send mail.");
  } catch (err) {
    console.error("❌ Gmail SMTP connection failed:", err.message);
    console.error(
      "   Check GMAIL_USER and GMAIL_APP_PASSWORD in your .env file. See backend/README.md."
    );
  }
}

function escapeHtml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Email sent to the portfolio owner whenever someone submits the contact form.
async function sendOwnerNotification({ name, email, message }) {
  const ownerEmail = process.env.OWNER_EMAIL || process.env.GMAIL_USER;

  return transporter.sendMail({
    from: `"Portfolio Contact Form" <${process.env.GMAIL_USER}>`,
    to: ownerEmail,
    replyTo: email,
    subject: `New portfolio message from ${name}`,
    html: `
      <div style="font-family: Inter, Arial, sans-serif; max-width: 560px; margin: 0 auto; color:#0F172A;">
        <h2 style="color:#2563EB; margin-bottom: 4px;">New Contact Form Submission</h2>
        <p style="color:#64748B; margin-top:0;">Someone reached out through your portfolio.</p>
        <table style="width:100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding:8px 0; font-weight:600; width:90px;">Name</td>
            <td style="padding:8px 0;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding:8px 0; font-weight:600;">Email</td>
            <td style="padding:8px 0;">${escapeHtml(email)}</td>
          </tr>
        </table>
        <div style="margin-top:16px; padding:16px; background:#F8FAFC; border-radius:12px; border:1px solid #E2E8F0;">
          <p style="margin:0; white-space:pre-wrap; line-height:1.6;">${escapeHtml(message)}</p>
        </div>
        <p style="margin-top:20px; color:#94A3B8; font-size:12px;">Reply directly to this email to respond to ${escapeHtml(name)}.</p>
      </div>
    `,
  });
}

// Auto-reply sent back to whoever filled out the form.
async function sendSenderConfirmation({ name, email }) {
  return transporter.sendMail({
    from: `"Shashidhar Biradar" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Thanks for reaching out!",
    html: `
      <div style="font-family: Inter, Arial, sans-serif; max-width: 560px; margin: 0 auto; color:#0F172A;">
        <div style="background: linear-gradient(135deg, #2563EB, #60A5FA); padding: 28px; border-radius: 16px 16px 0 0;">
          <h2 style="color:#FFFFFF; margin:0;">Hi ${escapeHtml(name)},</h2>
        </div>
        <div style="border:1px solid #E2E8F0; border-top:none; border-radius:0 0 16px 16px; padding:28px;">
          <p style="line-height:1.7; font-size:15px;">
            Received your message — I'll contact you soon.
          </p>
          <p style="line-height:1.7; font-size:15px; color:#334155;">
            Thanks for getting in touch through my portfolio. I read every message personally
            and will get back to you as soon as possible.
          </p>
          <p style="margin-top:24px; line-height:1.6;">
            Best,<br/>
            <strong>Shashidhar Biradar</strong><br/>
            <span style="color:#64748B; font-size:13px;">Full Stack Java Developer</span>
          </p>
        </div>
      </div>
    `,
  });
}

module.exports = { transporter, verifyTransport, sendOwnerNotification, sendSenderConfirmation };
