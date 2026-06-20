import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { experience } from "../../data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="section-padding bg-surface">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Experience" title="Where I've worked" />

        <div className="relative ml-3 border-l-2 border-brand-blue/15 pl-10">
          {experience.map((item, i) => (
            <motion.div
              key={item.role + item.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative mb-12 last:mb-0"
            >
              <span className="absolute -left-[3.1rem] flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue text-white shadow-glow">
                <Briefcase size={16} />
              </span>

              <div className="glass rounded-2xl p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-heading text-lg font-semibold text-ink-900">
                    {item.role}
                  </h3>
                  <span className="eyebrow">{item.period}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-brand-blue">{item.company}</p>

                <ul className="mt-4 space-y-2">
                  {item.points.map((p) => (
                    <li key={p} className="text-sm leading-relaxed text-ink-700">
                      <span className="text-brand-blue">›</span> {p}
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
