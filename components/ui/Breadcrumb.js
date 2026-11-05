import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Breadcrumb({ items = [], className = '' }) {
  return (
    <nav aria-label="Breadcrumb" className={cn('py-3', className)}>
      <ol className="flex items-center flex-wrap gap-1.5 text-xs sm:text-sm text-brand-muted">
        <li>
          <Link
            href="/"
            className="inline-flex items-center hover:text-brand-blue transition-colors gap-1 font-medium"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-brand-muted/60 shrink-0" />
              {isLast || !item.href ? (
                <span className="font-semibold text-brand-navy truncate max-w-[200px] sm:max-w-xs" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-brand-blue transition-colors font-medium truncate max-w-[150px] sm:max-w-xs"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
