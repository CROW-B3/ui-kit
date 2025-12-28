import React from 'react';
import { motion } from 'framer-motion';

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
  return (
    <motion.div
      className={`flex flex-col gap-5 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <label className="text-xs font-medium text-violet-400 uppercase tracking-wider pl-1">
        {title}
      </label>
      <div className="flex flex-col gap-4">{children}</div>
    </motion.div>
  );
};
