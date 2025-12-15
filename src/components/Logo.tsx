'use client';

import { motion } from 'framer-motion';

export interface LogoProps {
  src: string;
  alt: string;
}

export function Logo({ src, alt }: LogoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="absolute left-8 top-8 z-50"
    >
      <img
        src={src}
        alt={alt}
        width={80}
        height={80}
        className="h-16 w-16 object-contain sm:h-20 sm:w-20"
      />
    </motion.div>
  );
}
