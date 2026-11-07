'use client';

import React, { useState, useEffect } from 'react';

export default function TypewriterHeroHeadline({
  text = "Your Academic and Exams Success Starts With The Right Approach",
  className = "",
  typingSpeed = 75,
  pauseDuration = 2000,
}) {
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;

    if (!isDeleting && typedText.length < text.length) {
      // 1. Reveal each letter individually left to right (60-90ms per character)
      timer = setTimeout(() => {
        setTypedText(text.slice(0, typedText.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && typedText.length === text.length) {
      // 2. Full heading displayed -> pause for 2 seconds
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting && typedText.length > 0) {
      // 3. Clear text smoothly character by character
      timer = setTimeout(() => {
        setTypedText(text.slice(0, typedText.length - 1));
      }, 35);
    } else if (isDeleting && typedText.length === 0) {
      // 4. Repeat typing animation
      setIsDeleting(false);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, text, typingSpeed, pauseDuration]);

  return (
    <h1 className={`text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.15] drop-shadow-[0_4px_10px_rgba(0,0,0,0.95)] min-h-[4rem] sm:min-h-[6.5rem] lg:min-h-[8.5rem] flex items-center flex-wrap ${className}`}>
      <span>{typedText}</span>
      <span className="animate-pulse inline-block border-r-2 sm:border-r-4 border-white ml-1 h-[0.85em] align-middle shrink-0" aria-hidden="true">&nbsp;</span>
    </h1>
  );
}
