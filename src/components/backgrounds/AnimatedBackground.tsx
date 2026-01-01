'use client';

import { useState, useEffect } from 'react';

export interface AnimatedBackgroundProps {
  backgroundColor?: string;
  primaryGlowColor?: string;
  secondaryGlowColor?: string;
  tertiaryGlowColor?: string;
  primaryGlowOpacity?: number;
  enableVerticalFade?: boolean;
  fadeIntensity?: number;
  variant?: 'contained' | 'fullscreen';
}

export function AnimatedBackground({
  backgroundColor = '#000000',
  primaryGlowColor = '#854ED2',
  secondaryGlowColor = '#ffffffbd',
  tertiaryGlowColor = '#e0c8ffbe',
  primaryGlowOpacity = 0.5,
  enableVerticalFade = false,
  fadeIntensity = 0.85,
  variant = 'contained',
}: AnimatedBackgroundProps) {
  const [scrollFade, setScrollFade] = useState(fadeIntensity);

  useEffect(() => {
    if (!enableVerticalFade) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Calculate scroll percentage (0 to 1)
      const maxScroll = documentHeight - windowHeight;
      const scrollPercentage = maxScroll > 0 ? scrollPosition / maxScroll : 0;

      // Map scroll percentage to fadeIntensity
      // Start at the provided fadeIntensity and increase to 0.98 as you scroll
      const minFade = Math.min(fadeIntensity, 0.3);
      const maxFade = 0.98;
      const newFadeIntensity = minFade + scrollPercentage * (maxFade - minFade);

      setScrollFade(newFadeIntensity);
    };

    handleScroll(); // Initial call
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [enableVerticalFade, fadeIntensity]);

  const activeFadeIntensity = enableVerticalFade ? scrollFade : fadeIntensity;

  return (
    <div
      style={{
        position: variant === 'fullscreen' ? 'fixed' : 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -10,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <style>
        {`
          @keyframes drift {
            0% {
              transform: translate(-50%, -50%) translate(0, 0);
            }
            25% {
              transform: translate(-50%, -50%) translate(-100px, -80px);
            }
            50% {
              transform: translate(-50%, -50%) translate(50px, -120px);
            }
            75% {
              transform: translate(-50%, -50%) translate(-80px, 60px);
            }
            100% {
              transform: translate(-50%, -50%) translate(0, 0);
            }
          }

          @keyframes driftSecondary {
            0% {
              transform: translate(-50%, -50%) translate(0, 0) scale(1);
            }
            25% {
              transform: translate(-50%, -50%) translate(120px, 90px) scale(1.15);
            }
            50% {
              transform: translate(-50%, -50%) translate(-60px, 140px) scale(0.9);
            }
            75% {
              transform: translate(-50%, -50%) translate(100px, -70px) scale(1.1);
            }
            100% {
              transform: translate(-50%, -50%) translate(0, 0) scale(1);
            }
          }

          @keyframes pulseGlow {
            0%, 100% {
              opacity: 0.5;
            }
            50% {
              opacity: 0.7;
            }
          }

          @keyframes pulseGlowSecondary {
            0%, 100% {
              opacity: 0.8;
            }
            50% {
              opacity: 1;
            }
          }

          .glow-primary {
            animation: drift 12s ease-in-out infinite, pulseGlow 4s ease-in-out infinite;
          }

          .glow-secondary {
            animation: driftSecondary 10s ease-in-out infinite;
          }
        `}
      </style>

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: backgroundColor,
        }}
      />

      {/* Primary large glow with drifting motion */}
      <div
        className="glow-primary"
        style={{
          position: 'absolute',
          top: '50%',
          left: '100%',
          width: '1700px',
          height: '900px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${primaryGlowColor} 0%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
      />

      {/* Secondary glow with dramatic drifting and scaling */}
      <div
        className="glow-secondary"
        style={{
          position: 'absolute',
          top: '50%',
          left: '100%',
          width: '500px',
          height: '400px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${secondaryGlowColor} 0%, ${tertiaryGlowColor} 40%, transparent 65%)`,
          filter: 'blur(80px)',
        }}
      />

      {/* Vertical fade overlay - fades the background as it goes down */}
      {enableVerticalFade && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(to bottom,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 0) 10%,
              rgba(0, 0, 0, ${activeFadeIntensity * 0.3}) 30%,
              rgba(0, 0, 0, ${activeFadeIntensity * 0.6}) 60%,
              rgba(0, 0, 0, ${activeFadeIntensity}) 100%)`,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
}
