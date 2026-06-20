import { motion } from "framer-motion";

type ProgressBarProps = {
  name: string;
  level: number;
  delay?: number;
};

export default function ProgressBar({ name, level, delay = 0 }: ProgressBarProps) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-medium text-ink-700">{name}</span>
        <span className="font-mono text-xs text-brand-blue">{level}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-900/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, ease: "easeOut", delay }}
          className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-blue-light"
        />
      </div>
    </div>
  );
}
