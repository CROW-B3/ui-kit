'use client';

import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -10,
        overflow: 'hidden',
      }}
    >
      {/* Base black background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#000000',
        }}
      />

      {/* Purple circle with 50% opacity */}
      <motion.div
        animate={{
          opacity: [0.5, 0.5],
        }}
        style={{
          position: 'absolute',
          top: '60%',
          left: '100%',
          transform: 'translate(-50%, -50%)',
          width: '1700px',
          height: '900px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #854ED2 0%, transparent 70%)',
          opacity: 0.5,
          filter: 'blur(40px)',
        }}
      />

      {/* White circle */}
      <motion.div
        style={{
          position: 'absolute',
          top: '60%',
          left: '100%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '400px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, #ffffffbd 0%, #e0c8ffbe 40%, transparent 65%)',
          filter: 'blur(80px)',
        }}
      />
    </div>
  );
}
