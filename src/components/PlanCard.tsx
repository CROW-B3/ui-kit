import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export interface PlanCardSpec {
  label: string;
  value: string;
  highlighted?: boolean;
}

export interface PlanCardFeature {
  icon: ReactNode;
  text: string;
  variant?: 'default' | 'highlighted' | 'disabled';
}

export interface PlanCardButton {
  text: string;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
}

export interface PlanCardProps {
  children?: ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass' | 'plan';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  animated?: boolean;
  animationDelay?: number;
  header?: {
    badge?: string;
    title?: string;
    description?: string;
    icon?: ReactNode;
  };
  price?: {
    amount: string;
    period?: string;
    currency?: string;
  };
  featuresTitle?: string;
  specs?: PlanCardSpec[];
  showSpecsDivider?: boolean;
  features?: PlanCardFeature[];
  footer?: {
    buttons?: PlanCardButton[];
    content?: ReactNode;
  };
  recommended?: boolean;
  disabled?: boolean;
  selected?: boolean;
  showCheckbox?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
}

export function PlanCard({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  animated = true,
  animationDelay = 0,
  header,
  price,
  featuresTitle = 'INCLUDED LIMITS',
  specs,
  showSpecsDivider = true,
  features,
  footer,
  recommended = false,
  disabled = false,
  selected = false,
  showCheckbox = false,
  onCheckboxChange,
}: PlanCardProps) {
  const variantStyles = {
    default: 'bg-white/[0.02] border border-white/10',
    elevated: 'bg-white/[0.04] border border-white/20 shadow-card-glow',
    outlined: 'bg-transparent border-2 border-white/20',
    glass: 'bg-white/[0.03] backdrop-blur-lg border border-white/10',
    plan: recommended
      ? 'bg-white/[0.04] border border-violet-500/30 shadow-card-glow ring-1 ring-violet-500/20'
      : 'bg-white/[0.02] border border-white/10 hover:border-white/20',
  };

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-5',
    md: 'p-8',
    lg: 'p-10',
  };

  const buttonStyles = {
    primary:
      'bg-violet-600 hover:bg-violet-700 text-white shadow-glow hover:shadow-glow-hover',
    secondary:
      'bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-white',
    outline:
      'bg-transparent border border-white/20 hover:bg-white/5 text-gray-300 hover:text-white',
  };

  const cardClasses = cn(
    variantStyles[variant],
    paddingStyles[padding],
    'rounded-3xl transition-all duration-300 relative h-full flex flex-col',
    disabled && 'opacity-50 cursor-not-allowed',
    selected && 'ring-2 ring-violet-500',
    className
  );

  const CardContent = (
    <div className={cardClasses}>
      {recommended && (
        <div className="absolute top-0 right-0 left-0 flex justify-center -mt-3">
          <span className="bg-violet-600 text-[10px] font-bold uppercase tracking-wider text-white px-3 py-1 rounded-full shadow-lg">
            Recommended
          </span>
        </div>
      )}

      {showCheckbox && (
        <div className="absolute top-6 right-6">
          <input
            type="checkbox"
            checked={selected}
            onChange={e => onCheckboxChange?.(e.target.checked)}
            className="w-5 h-5 rounded border-2 border-white/20 bg-transparent checked:bg-transparent checked:border-violet-500 cursor-pointer appearance-none checked:after:content-['✓'] checked:after:text-violet-500 checked:after:text-xs checked:after:flex checked:after:items-center checked:after:justify-center"
          />
        </div>
      )}

      {header && (
        <div
          className={cn('mb-3', recommended && 'mt-2', header.badge && 'mt-3')}
        >
          {header.badge && (
            <span className="inline-block bg-violet-600/20 text-violet-400 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded mb-2">
              {header.badge}
            </span>
          )}
          {header.icon && (
            <div className="mb-3 flex items-center justify-center">
              {header.icon}
            </div>
          )}
          {header.title && (
            <h3 className="text-lg font-semibold text-white mb-1">
              {header.title}
            </h3>
          )}
          {header.description && (
            <p className="text-xs text-gray-500 leading-relaxed">
              {header.description}
            </p>
          )}
        </div>
      )}

      {price && (
        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-white">
              {price.amount}
            </span>
            {price.period && (
              <span className="text-gray-400 text-sm">/{price.period}</span>
            )}
          </div>
        </div>
      )}

      {specs && specs.length > 0 && (
        <div
          className={cn(
            'mb-5 space-y-1.5',
            showSpecsDivider && 'border-t border-white/5 pt-3'
          )}
        >
          {specs.map((spec, index) => (
            <div
              key={index}
              className="flex justify-between text-[11px] text-gray-400"
            >
              <span>{spec.label}</span>
              <span
                className={cn(
                  spec.highlighted ? 'text-white font-medium' : 'text-gray-200'
                )}
              >
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {features && features.length > 0 && (
        <div className="flex-grow mb-6">
          {featuresTitle && (
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-4">
              {featuresTitle}
            </h4>
          )}
          <div className="space-y-3">
            {features.map((feature, index) => {
              const textColor =
                feature.variant === 'disabled'
                  ? 'text-gray-500'
                  : feature.variant === 'highlighted'
                    ? 'text-gray-200 font-medium'
                    : 'text-gray-300';

              return (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-violet-500 flex-shrink-0 text-sm">
                    {feature.icon}
                  </span>
                  <span className={cn('text-xs', textColor)}>
                    {feature.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {children && <div className="flex-grow">{children}</div>}

      {footer && (
        <div className="mt-auto">
          {footer.buttons && footer.buttons.length > 0 && (
            <div className="space-y-2">
              {footer.buttons.map((button, index) => (
                <button
                  key={index}
                  onClick={button.onClick}
                  disabled={disabled}
                  className={cn(
                    'w-full text-sm font-medium py-2.5 rounded-full transition-all duration-200',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    buttonStyles[button.variant || 'outline']
                  )}
                >
                  {button.text}
                </button>
              ))}
            </div>
          )}
          {footer.content && <div>{footer.content}</div>}
        </div>
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
