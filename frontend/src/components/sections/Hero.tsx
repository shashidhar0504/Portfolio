import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { Download, Mail, MapPin, Github, Linkedin } from "lucide-react";
import Button from "../ui/Button";
import { profile } from "../../data/portfolio";
import { useTypewriter } from "../../hooks/useTypewriter";

export default function Hero() {
  const typed = useTypewriter(profile.roles);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20"
    >
      {/* background layer */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,black,transparent)]" />
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-brand-blue-light/20 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-brand-blue/15 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 sm:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:px-24">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-brand-blue/15 bg-brand-blue/5 px-3 py-1">
            Available for hire
          </span>

          <h1 className="mt-6 font-heading text-4xl font-bold leading-[1.1] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
            {profile.name}
          </h1>

          <div className="mt-4 h-9 font-mono text-lg text-brand-blue sm:text-xl">
            <span>{typed}</span>
            <span className="animate-blink">|</span>
          </div>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-500 sm:text-lg">
            {profile.tagline}
          </p>

          <div className="mt-5 flex items-center gap-2 text-sm text-ink-500">
            <MapPin size={16} className="text-brand-blue" />
            {profile.location}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href={`${profile.resumeFile}?v=1.0.1`} download icon={<Download size={18} />}>
              Download Resume
            </Button>
            <ScrollLink to="contact" smooth duration={500} offset={-80}>
              <Button variant="secondary" icon={<Mail size={18} />}>
                Contact Me
              </Button>
            </ScrollLink>
          </div>

          <div className="mt-10 flex items-center gap-4">
            {[
              { href: profile.github, icon: Github, label: "GitHub" },
              { href: profile.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: `mailto:${profile.email}`, icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-900/10 bg-white text-ink-700 shadow-soft transition-all hover:-translate-y-0.5 hover:border-brand-blue hover:text-brand-blue"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right: profile + signature stack panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="glass-strong relative overflow-hidden rounded-[2rem] p-3">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-brand-blue/10 to-brand-blue-light/10">
              <img
                src={profile.profileImage}
                alt={profile.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* floating stack-layer badges — signature element representing his full-stack ownership */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="glass absolute -left-8 top-8 rounded-xl px-4 py-2.5 sm:-left-12"
          >
            <p className="font-mono text-[10px] uppercase tracking-wider text-ink-500">Frontend</p>
            <p className="font-heading text-sm font-semibold text-brand-blue">React.js</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="glass absolute -right-6 top-1/3 rounded-xl px-4 py-2.5 sm:-right-10"
          >
            <p className="font-mono text-[10px] uppercase tracking-wider text-ink-500">Backend</p>
            <p className="font-heading text-sm font-semibold text-brand-blue">Spring Boot</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="glass absolute -bottom-6 left-6 rounded-xl px-4 py-2.5"
          >
            <p className="font-mono text-[10px] uppercase tracking-wider text-ink-500">Database</p>
            <p className="font-heading text-sm font-semibold text-brand-blue">MySQL</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
