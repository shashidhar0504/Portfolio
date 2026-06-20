import { motion } from "framer-motion";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} mb-14`}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-3 font-heading text-3xl sm:text-4xl font-semibold text-ink-900 tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-ink-500 leading-relaxed">{description}</p>
      )}
    </motion.div>
  );
}
