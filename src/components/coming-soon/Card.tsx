'use client';

import { motion } from 'framer-motion';

export interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  button?: React.ReactNode;
  index: number;
  isFirst?: boolean;
  isLast?: boolean;
  layout?: 'feature' | 'documentation';
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  iconClassName?: string;
  contentAlign?: 'left' | 'center';
}

export function Card({
  title,
  description,
  icon,
  button,
  index,
  isFirst = false,
  isLast = false,
  layout = 'feature',
  className = '',
  titleClassName = '',
  descriptionClassName = '',
  iconClassName = '',
  contentAlign = 'left',
}: CardProps) {
  const borderClasses = `${isFirst ? 'border-l' : ''} ${!isLast ? 'border-r' : ''} ${isLast ? 'border-r' : ''} border-white/10`;
  const alignClass = contentAlign === 'center' ? 'text-center' : '';

  return (
    <motion.div
      className={`relative p-8 flex flex-col h-full bg-black/40 backdrop-blur-sm group ${borderClasses} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {layout === 'documentation' && icon && (
        <div
          className={`flex items-center justify-center mb-6 ${iconClassName}`}
        >
          <div className="text-white/80">{icon}</div>
        </div>
      )}

      {/* Title */}
      <h3
        className={`text-2xl font-semibold text-white mb-3 ${alignClass} ${titleClassName}`}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className={`text-sm leading-relaxed mb-8 ${alignClass} ${descriptionClassName} ${layout === 'documentation' ? 'flex-grow' : ''}`}
      >
        {description}
      </p>

      {layout === 'feature' && icon && (
        <div
          className={`flex-grow flex items-center justify-center my-8 ${iconClassName}`}
        >
          <div className="w-full h-28 flex items-center justify-center">
            {icon}
          </div>
        </div>
      )}

      {/* Button */}
      {button && <div className="flex justify-center">{button}</div>}
    </motion.div>
  );
}
