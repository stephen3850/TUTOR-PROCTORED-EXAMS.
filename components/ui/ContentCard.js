import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Badge from './Badge';
import { cn } from '@/lib/utils';

export default function ContentCard({
  title,
  description,
  badge,
  icon: Icon,
  href,
  actionText = 'Learn details',
  className = '',
  children,
}) {
  const renderIcon = () => {
    if (!Icon) return null;
    if (React.isValidElement(Icon)) {
      return Icon;
    }
    const IconComponent = Icon;
    return <IconComponent className="w-4 h-4" />;
  };

  const content = (
    <div
      className={cn(
        'group relative bg-white border border-brand-border rounded-xl p-5 sm:p-6 transition-all duration-200 hover:shadow-cardHover hover:border-brand-blue/50 flex flex-col justify-between h-full',
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          {Icon && (
            <div className="w-9 h-9 rounded-lg bg-brand-lightBlue text-brand-blue flex items-center justify-center shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-200 shadow-subtle">
              {renderIcon()}
            </div>
          )}
          {badge && <Badge variant="slate">{badge}</Badge>}
        </div>

        <h3 className="text-base sm:text-lg font-bold text-brand-navy mb-1.5 group-hover:text-brand-blue transition-colors leading-snug">
          {title}
        </h3>

        {description && (
          <p className="text-brand-muted text-xs leading-relaxed mb-3 font-normal">
            {description}
          </p>
        )}

        {children}
      </div>

      {href && (
        <div className="pt-3 mt-1 border-t border-brand-border/60 flex items-center text-xs font-semibold text-brand-blue group-hover:translate-x-0.5 transition-transform">
          <span>{actionText}</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full focus:outline-none focus:ring-2 focus:ring-brand-blue rounded-xl">
        {content}
      </Link>
    );
  }

  return content;
}
