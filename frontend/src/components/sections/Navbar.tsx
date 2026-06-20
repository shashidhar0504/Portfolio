import { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2 } from "lucide-react";

const NAV_LINKS = [
  { to: "about", label: "About" },
  { to: "skills", label: "Skills" },
  { to: "projects", label: "Projects" },
  { to: "experience", label: "Experience" },
  { to: "education", label: "Education" },
  { to: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "glass shadow-soft py-3" : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-24">
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

        <div className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <ScrollLink
              key={link.to}
              to={link.to}
              smooth
              duration={500}
              offset={-80}
              spy
              activeClass="text-brand-blue"
              className="cursor-pointer text-sm font-medium text-ink-700 transition-colors hover:text-brand-blue"
            >
              {link.label}
            </ScrollLink>
          ))}
          <ScrollLink to="contact" smooth duration={500} offset={-80}>
            <button className="rounded-full bg-brand-blue px-5 py-2.5 text-sm font-medium text-white shadow-glow transition-all hover:bg-brand-blue-dark hover:-translate-y-0.5">
              Hire Me
            </button>
          </ScrollLink>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-ink-900 md:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="glass mx-6 mt-3 overflow-hidden rounded-2xl md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {NAV_LINKS.map((link) => (
                <ScrollLink
                  key={link.to}
                  to={link.to}
                  smooth
                  duration={500}
                  offset={-80}
                  onClick={() => setOpen(false)}
                  className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:bg-brand-blue/5 hover:text-brand-blue"
                >
                  {link.label}
                </ScrollLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
