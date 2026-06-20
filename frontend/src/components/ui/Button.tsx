import { ReactNode } from "react";
import { motion } from "framer-motion";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  icon?: ReactNode;
  download?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  icon,
  download,
  type = "button",
  disabled,
  className = "",
}: ButtonProps) {
  const base = variant === "primary" ? "btn-primary" : "btn-secondary";
  const classes = `${base} ${className} ${disabled ? "opacity-60 cursor-not-allowed" : ""}`;

  const content = (
    <motion.span
      whileTap={{ scale: 0.97 }}
      className="inline-flex items-center gap-2"
    >
      {children}
      {icon}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} download={download} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  );
}
