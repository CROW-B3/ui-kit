'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { PiHeadCircuit } from 'react-icons/pi';
import { MdOutlineTouchApp } from 'react-icons/md';

export interface PricingFeature {
  label: string;
  included: boolean;
}

export interface PricingInfoItem {
  icon: ReactNode;
  text: string;
}

export interface PricingCardProps {
  icon: ReactNode;
  category: string;
  title: string;
  description: string;
  price: number | string;
  period?: string;
  interactions?: string;
  patterns?: string;
  infoItems?: PricingInfoItem[];
  features: PricingFeature[];
  isPopular?: boolean;
  popularBadgeText?: string;
  accentColor?: string;
  borderColor?: string;
  hoverBorderColor?: string;
  backgroundColor?: string;
  className?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  checkIcon?: ReactNode;
  animated?: boolean;
  animationDelay?: number;
}

export function PricingCard({
  icon,
  category,
  title,
  description,
  price,
  period = 'mo',
  interactions,
  patterns,
  infoItems,
  features,
  isPopular = false,
  popularBadgeText = 'MOST POPULAR',
  accentColor = '#8B5CF6',
  borderColor,
  hoverBorderColor,
  backgroundColor,
  className = '',
  buttonText,
  onButtonClick,
  checkIcon,
  animated = true,
  animationDelay = 0,
}: PricingCardProps) {
  const defaultBorderColor =
    borderColor || (isPopular ? '#7C3AED80' : 'rgba(255, 255, 255, 0.1)');
  const defaultHoverBorderColor =
    hoverBorderColor || 'rgba(255, 255, 255, 0.2)';
  const defaultBackgroundColor =
    backgroundColor || 'bg-gradient-to-b from-white/5 to-transparent';

  const displayInfoItems = infoItems || [
    ...(interactions
      ? [
          {
            icon: <MdOutlineTouchApp className="h-4 w-4 text-gray-400" />,
            text: interactions,
          },
        ]
      : []),
    ...(patterns
      ? [
          {
            icon: <PiHeadCircuit className="h-4 w-4 text-gray-400" />,
            text: patterns,
          },
        ]
      : []),
  ];

  const CardContent = (
    <div
      className={`relative flex flex-col rounded-2xl border ${defaultBackgroundColor} p-5 backdrop-blur-sm transition-all ${className}`}
      style={
        {
          borderColor: defaultBorderColor,
          '--hover-border-color': defaultHoverBorderColor,
        } as React.CSSProperties & { '--hover-border-color': string }
      }
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = defaultHoverBorderColor;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = defaultBorderColor;
      }}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-purple-500 px-4 py-1 text-xs font-semibold text-white">
            {popularBadgeText}
          </span>
        </div>
      )}

      <div className="flex-grow">
        <div className="flex items-center justify-between mb-5">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10"
            style={{ backgroundColor: `${accentColor}15` }}
          >
            {icon}
          </div>
          <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
            {category}
          </span>
        </div>

        <h3 className="mb-1.5 text-xl font-bold" style={{ color: accentColor }}>
          {title}
        </h3>
        <p className="mb-5 text-sm text-gray-400">{description}</p>
      </div>

      <div className="mb-5 border-t border-white/10 pt-5">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-white">
            {typeof price === 'number' ? `$${price}` : price}
          </span>
          {period && <span className="text-gray-400">/{period}</span>}
        </div>
      </div>

      {displayInfoItems.length > 0 && (
        <div className="mb-5 space-y-2.5 text-sm">
          {displayInfoItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-gray-300">
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2.5">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2.5">
            {checkIcon || (
              <IoCheckmarkCircleOutline
                className={`h-4 w-4 ${feature.included ? 'opacity-100' : 'opacity-30'}`}
                style={{ color: feature.included ? accentColor : '#666' }}
              />
            )}
            <span
              className={`text-sm ${feature.included ? 'text-gray-200' : 'text-gray-500'}`}
            >
              {feature.label}
            </span>
          </div>
        ))}
      </div>

      {buttonText && (
        <button
          onClick={onButtonClick}
          className="mt-5 w-full rounded-lg py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ backgroundColor: accentColor }}
        >
          {buttonText}
        </button>
      )}
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: animationDelay }}
      >
        {CardContent}
      </motion.div>
    );
  }

  return CardContent;
}
