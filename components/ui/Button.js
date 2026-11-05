import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'right',
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none active:scale-[0.99]';

  const variants = {
    primary:
      'bg-brand-blue text-white hover:bg-brand-secondaryNavy shadow-sm hover:shadow-md focus:ring-brand-blue border border-transparent',
    secondary:
      'bg-brand-navy text-white hover:bg-brand-secondaryNavy shadow-sm hover:shadow-md focus:ring-brand-navy border border-transparent',
    light:
      'bg-brand-lightBlue text-brand-blue hover:bg-blue-100 hover:text-brand-navy focus:ring-brand-blue border border-brand-blue/20',
    outline:
      'border border-brand-border bg-white text-brand-text hover:bg-brand-bg hover:border-brand-blue hover:text-brand-blue focus:ring-brand-blue shadow-subtle',
    ghost:
      'text-brand-text hover:bg-brand-lightBlue hover:text-brand-blue focus:ring-brand-blue',
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-2 gap-1.5 min-h-[36px]',
    md: 'text-sm px-5 py-2.5 gap-2 min-h-[44px]',
    lg: 'text-base px-6 py-3.5 gap-2.5 min-h-[48px]',
  };

  const renderIcon = () => {
    if (!Icon) return null;
    if (React.isValidElement(Icon)) return Icon;
    const IconComponent = Icon;
    return <IconComponent className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />;
  };

  const buttonContent = (
    <>
      {Icon && iconPosition === 'left' && renderIcon()}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && renderIcon()}
    </>
  );

  const combinedClasses = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={combinedClasses} {...props}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button type={type} className={combinedClasses} onClick={onClick} {...props}>
      {buttonContent}
    </button>
  );
}
