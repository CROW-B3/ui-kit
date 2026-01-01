import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  children,
  delay = 0,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`flex flex-col gap-5 ${className}`}
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? {} : { duration: 0.5, delay }}
    >
      <h3 className="text-xs font-medium text-violet-400 uppercase tracking-wider pl-1">
        {title}
      </h3>
      <div className="flex flex-col gap-4">{children}</div>
    </motion.div>
  );
};
