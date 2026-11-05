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
    return <IconComponent className="w-5 h-5" />;
  };

  const content = (
    <div
      className={cn(
        'group relative bg-white border border-brand-border rounded-2xl p-6 sm:p-7 transition-all duration-200 hover:shadow-cardHover hover:border-brand-blue/50 flex flex-col justify-between h-full',
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          {Icon && (
            <div className="w-11 h-11 rounded-xl bg-brand-lightBlue text-brand-blue flex items-center justify-center shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-200 shadow-subtle">
              {renderIcon()}
            </div>
          )}
          {badge && <Badge variant="slate">{badge}</Badge>}
        </div>

        <h3 className="text-xl font-bold text-brand-navy mb-2 group-hover:text-brand-blue transition-colors leading-snug">
          {title}
        </h3>

        {description && (
          <p className="text-brand-muted text-xs sm:text-sm leading-relaxed mb-4 font-normal">
            {description}
          </p>
        )}

        {children}
      </div>

      {href && (
        <div className="pt-4 mt-2 border-t border-brand-border/60 flex items-center text-xs sm:text-sm font-semibold text-brand-blue group-hover:translate-x-0.5 transition-transform">
          <span>{actionText}</span>
          <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full focus:outline-none focus:ring-2 focus:ring-brand-blue rounded-2xl">
        {content}
      </Link>
    );
  }

  return content;
}
