import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Github, Linkedin, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { profile } from "../../data/portfolio";

type Status = "idle" | "loading" | "success" | "error";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="section-padding bg-surface-alt">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something together"
          description="Have a project in mind or a role to discuss? Send a message and I'll get back to you."
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {[
              { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
              { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone}` },
              { icon: MapPin, label: "Location", value: profile.location },
            ].map((item) => (
              <div key={item.label} className="glass flex items-center gap-4 rounded-2xl p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                  <item.icon size={18} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-ink-500">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="font-medium text-ink-900 hover:text-brand-blue">
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-medium text-ink-900">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="flex gap-3 pt-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-900/10 bg-white text-ink-700 shadow-soft transition-all hover:-translate-y-0.5 hover:border-brand-blue hover:text-brand-blue"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-900/10 bg-white text-ink-700 shadow-soft transition-all hover:-translate-y-0.5 hover:border-brand-blue hover:text-brand-blue"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="glass-strong rounded-2xl p-8"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink-700">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition-colors focus:border-brand-blue"
                />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition-colors focus:border-brand-blue"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or role..."
                  className="w-full resize-none rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition-colors focus:border-brand-blue"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary mt-6 w-full sm:w-auto"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  Send Message <Send size={18} />
                </>
              )}
            </button>

            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-start gap-2 rounded-xl bg-green-50 p-4 text-sm text-green-700"
              >
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                Received your message — I'll contact you soon. A confirmation has also been sent to your email.
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-700"
              >
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                {errorMsg}
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
