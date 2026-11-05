import React from 'react';
import { cn } from '@/lib/utils';

export default function Badge({ children, variant = 'blue', className = '' }) {
  const variants = {
    blue: 'bg-brand-lightBlue text-brand-blue border-brand-blue/20 font-semibold',
    navy: 'bg-brand-navy text-white border-transparent font-semibold',
    slate: 'bg-brand-bg text-brand-muted border-brand-border font-medium',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-[11px] uppercase tracking-wider border transition-colors select-none shrink-0',
        variants[variant] || variants.blue,
        className
      )}
    >
      {children}
    </span>
  );
}
