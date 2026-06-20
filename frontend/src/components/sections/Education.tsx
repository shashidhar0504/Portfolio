import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { education } from "../../data/portfolio";

export default function Education() {
  return (
    <section id="education" className="section-padding bg-surface">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Education" title="Academic background" />

        <div className="relative ml-3 border-l-2 border-brand-blue/15 pl-10">
          {education.map((item, i) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative mb-12 last:mb-0"
            >
              <span className="absolute -left-[3.1rem] flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue text-white shadow-glow">
                <GraduationCap size={16} />
              </span>

              <div className="glass rounded-2xl p-6">
                <p className="eyebrow">{item.period}</p>
                <h3 className="mt-1.5 font-heading text-lg font-semibold text-ink-900">
                  {item.degree}
                </h3>
                <p className="text-sm text-ink-500">{item.institution}</p>
                <ul className="mt-3 space-y-1.5">
                  {item.details.map((d) => (
                    <li key={d} className="text-sm text-ink-700">
                      • {d}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
