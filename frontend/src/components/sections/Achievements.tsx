import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { achievements } from "../../data/portfolio";

export default function Achievements() {
  return (
    <section id="achievements" className="section-padding bg-surface">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Achievements"
          title="What I've delivered"
          description="Verified outcomes from freelance, academic, and internship work."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {achievements.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
              whileHover={{ y: -3 }}
              className="glass flex items-start gap-3 rounded-2xl p-5"
            >
              <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-brand-blue" />
              <p className="text-sm leading-relaxed text-ink-700">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
