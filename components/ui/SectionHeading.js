import React from 'react';
import Badge from './Badge';
import { cn } from '@/lib/utils';

export default function SectionHeading({
  badge,
  title,
  subtitle,
  centered = false,
  className = '',
  titleAs = 'h2',
}) {
  const HeadingTag = titleAs;

  return (
    <div className={cn('space-y-2', centered ? 'text-center max-w-2xl mx-auto' : 'max-w-2xl', className)}>
      {badge && <Badge variant="blue">{badge}</Badge>}
      <HeadingTag className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-brand-navy leading-tight">
        {title}
      </HeadingTag>
      {subtitle && (
        <p className="text-xs sm:text-sm lg:text-base text-brand-muted leading-relaxed text-balance font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}
