'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FaqAccordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `faq-button-${index}`;
        const contentId = `faq-content-${index}`;

        return (
          <div
            key={index}
            className="border border-brand-border rounded-2xl bg-white overflow-hidden transition-all duration-200 hover:border-brand-blue/40 shadow-subtle"
          >
            <button
              id={buttonId}
              type="button"
              className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-brand-navy hover:text-brand-blue transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-1 rounded-2xl min-h-[48px]"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              aria-controls={contentId}
            >
              <span className="text-base sm:text-lg leading-snug">{item.question}</span>
              <ChevronDown
                className={cn(
                  'w-5 h-5 text-brand-blue shrink-0 transition-transform duration-200',
                  isOpen && 'transform rotate-180'
                )}
                aria-hidden="true"
              />
            </button>
            {isOpen && (
              <div
                id={contentId}
                role="region"
                aria-labelledby={buttonId}
                className="px-5 pb-6 text-sm sm:text-base text-brand-muted leading-relaxed border-t border-brand-border/40 pt-4"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
