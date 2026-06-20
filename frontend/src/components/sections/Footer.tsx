import { Link as ScrollLink } from "react-scroll";
import { ArrowUp, Github, Linkedin, Mail, Code2 } from "lucide-react";
import { profile } from "../../data/portfolio";

const QUICK_LINKS = [
  { to: "about", label: "About" },
  { to: "skills", label: "Skills" },
  { to: "projects", label: "Projects" },
  { to: "contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-ink-900/5 bg-surface px-6 pb-10 pt-16 sm:px-10 lg:px-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 text-center">
        <ScrollLink
          to="home"
          smooth
          duration={500}
          className="flex cursor-pointer items-center gap-2 font-heading text-lg font-semibold text-ink-900"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-blue text-white">
            <Code2 size={18} />
          </span>
          Shashidhar<span className="text-brand-blue">.dev</span>
        </ScrollLink>

        <div className="flex flex-wrap justify-center gap-6">
          {QUICK_LINKS.map((link) => (
            <ScrollLink
              key={link.to}
              to={link.to}
              smooth
              duration={500}
              offset={-80}
              className="cursor-pointer text-sm text-ink-500 transition-colors hover:text-brand-blue"
            >
              {link.label}
            </ScrollLink>
          ))}
        </div>

        <div className="flex gap-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/10 text-ink-700 transition-all hover:border-brand-blue hover:text-brand-blue"
          >
            <Github size={16} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/10 text-ink-700 transition-all hover:border-brand-blue hover:text-brand-blue"
          >
            <Linkedin size={16} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/10 text-ink-700 transition-all hover:border-brand-blue hover:text-brand-blue"
          >
            <Mail size={16} />
          </a>
        </div>

        <p className="text-xs text-ink-500">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>

      <ScrollLink
        to="home"
        smooth
        duration={500}
        aria-label="Back to top"
        className="fixed bottom-7 right-7 z-40 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-brand-blue text-white shadow-glow transition-all hover:-translate-y-1 hover:bg-brand-blue-dark"
      >
        <ArrowUp size={20} />
      </ScrollLink>
    </footer>
  );
}
