import { ReactNode } from "react";
import { motion } from "framer-motion";

type CardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
};

export default function Card({
  children,
  className = "",
  hover = true,
  delay = 0,
}: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      whileHover={hover ? { y: -6 } : undefined}
      className={`glass rounded-2xl transition-shadow duration-300 ${
        hover ? "hover:shadow-glow" : ""
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
