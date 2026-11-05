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
    <div className={cn('space-y-3', centered ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl', className)}>
      {badge && <Badge variant="blue">{badge}</Badge>}
      <HeadingTag className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-navy leading-tight">
        {title}
      </HeadingTag>
      {subtitle && (
        <p className="text-sm sm:text-base lg:text-lg text-brand-muted leading-relaxed text-balance font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}
