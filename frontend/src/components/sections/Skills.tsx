import { motion } from "framer-motion";
import { Layers, Server, MonitorSmartphone, Database } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import ProgressBar from "../ui/ProgressBar";
import { skillCategories } from "../../data/portfolio";

const ICONS = [Layers, Server, MonitorSmartphone, Database];

export default function Skills() {
  return (
    <section id="skills" className="section-padding bg-surface-alt">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Skills"
          title="The stack I build with"
          description="From database schema to deployed UI — verified, hands-on skills across the full stack."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {skillCategories.map((cat, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                className="glass rounded-2xl p-7"
              >
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                    <Icon size={20} />
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-ink-900">
                    {cat.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {cat.skills.map((skill, idx) => (
                    <ProgressBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={idx * 0.06}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
