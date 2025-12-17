'use client';

import { motion } from 'framer-motion';

export interface SectionLabelProps {
  label: string;
  className?: string;
  animate?: boolean;
}

export function SectionLabel({
  label,
  className = '',
  animate = true,
}: SectionLabelProps) {
  const content = (
    <div
      className={`text-white/40 text-sm font-mono tracking-wider ${className}`}
    >
      [ {label} ]
    </div>
  );

  if (!animate) {
    return content;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {content}
    </motion.div>
  );
}
