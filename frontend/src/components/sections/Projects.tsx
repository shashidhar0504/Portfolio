import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { projects } from "../../data/portfolio";

export default function Projects() {
  return (
    <section id="projects" className="section-padding bg-surface-alt">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          description="Full-stack platforms built end-to-end, from schema design to deployment."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="glass group flex flex-col rounded-2xl p-8 transition-shadow duration-300 hover:shadow-glow"
            >
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <span className="eyebrow inline-flex items-center gap-1.5">
                    <Sparkles size={12} /> {project.category}
                  </span>
                  <h3 className="mt-2 font-heading text-2xl font-semibold text-ink-900">
                    {project.title}
                  </h3>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight size={18} />
                </span>
              </div>

              <p className="text-sm leading-relaxed text-ink-700">{project.description}</p>

              <ul className="mt-5 space-y-1.5">
                {project.highlights.map((h) => (
                  <li key={h} className="text-sm text-ink-500">
                    <span className="text-brand-blue">›</span> {h}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2 border-t border-ink-900/5 pt-5">
                {project.techStack.map((tech) => (
                  <span key={tech} className="tech-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
