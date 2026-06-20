import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import { about, stats, profile } from "../../data/portfolio";
import { useCountUp } from "../../hooks/useCountUp";

function Stat({ value, label }: { value: number; label: string }) {
  const { ref, displayValue } = useCountUp(value);
  return (
    <div className="rounded-2xl border border-ink-900/5 bg-white p-5 text-center shadow-soft">
      <span ref={ref} className="block font-heading text-3xl font-bold text-brand-blue">
        {displayValue}+
      </span>
      <span className="mt-1 block text-xs text-ink-500">{label}</span>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="section-padding bg-surface-alt">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="About Me"
          title="Turning ideas into production-ready software"
          description="A snapshot of how I work and what I bring to a team."
        />

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            {about.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="mb-5 leading-relaxed text-ink-700"
              >
                {p}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3"
            >
              {about.highlights.map((h) => (
                <div
                  key={h.label}
                  className="rounded-xl border border-brand-blue/10 bg-brand-blue/5 px-4 py-3"
                >
                  <p className="text-xs uppercase tracking-wide text-ink-500">{h.label}</p>
                  <p className="mt-1 font-heading text-sm font-semibold text-ink-900">
                    {h.value}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {profile.languagesSpoken.map((lang) => (
                <span key={lang} className="tech-pill">
                  {lang}
                </span>
              ))}
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <Stat key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
