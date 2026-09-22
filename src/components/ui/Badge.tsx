import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'emerald' | 'slate' | 'blue' | 'amber' | 'rose' | 'teal';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'emerald',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-semibold rounded-full border';

  const variants = {
    // High contrast for WCAG AA (>= 4.5:1 ratio)
    emerald: 'bg-emerald-50 text-emerald-900 border-emerald-300',
    slate: 'bg-slate-100 text-slate-900 border-slate-300',
    blue: 'bg-blue-50 text-blue-900 border-blue-300',
    amber: 'bg-amber-50 text-amber-950 border-amber-300',
    rose: 'bg-rose-50 text-rose-950 border-rose-300',
    teal: 'bg-teal-50 text-teal-950 border-teal-300',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </span>
  );
};
