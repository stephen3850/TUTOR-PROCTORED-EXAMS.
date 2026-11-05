import React from 'react';
import { cn } from '@/lib/utils';

export default function PageContainer({
  children,
  className = '',
  size = 'default',
  as: Component = 'div',
}) {
  const sizes = {
    small: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-8xl',
    full: 'max-w-full',
  };

  return (
    <Component
      className={cn(
        'w-full mx-auto px-4 sm:px-6 lg:px-8',
        sizes[size] || sizes.default,
        className
      )}
    >
      {children}
    </Component>
  );
}
