'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ProcessStepsSequentialReveal({ steps = [] }) {
  // Distinct Soft Background Color Palette per Card
  const cardStyles = [
    {
      bg: 'bg-blue-50/90',
      border: 'border-blue-200/90',
      numberColor: 'text-[#2563EB]',
      hoverBorder: 'hover:border-[#2563EB]',
    },
    {
      bg: 'bg-emerald-50/90',
      border: 'border-emerald-200/90',
      numberColor: 'text-[#059669]',
      hoverBorder: 'hover:border-[#059669]',
    },
    {
      bg: 'bg-purple-50/90',
      border: 'border-purple-200/90',
      numberColor: 'text-[#7C3AED]',
      hoverBorder: 'hover:border-[#7C3AED]',
    },
    {
      bg: 'bg-amber-50/90',
      border: 'border-amber-200/90',
      numberColor: 'text-[#D97706]',
      hoverBorder: 'hover:border-[#D97706]',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.45, // 450ms stagger delay between cards
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 25,
      scale: 0.94,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1], // Smooth ease-out
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {steps.map((step, idx) => {
        const style = cardStyles[idx % cardStyles.length];
        return (
          <motion.div
            key={idx}
            variants={cardVariants}
            className={`relative rounded-xl p-5 space-y-2 border transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 transform-gpu ${style.bg} ${style.border} ${style.hoverBorder}`}
          >
            {/* Prominent Number Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.45 + 0.15, duration: 0.4 }}
              className={`text-2xl font-black font-mono tracking-wider ${style.numberColor}`}
            >
              {step.step}
            </motion.div>
            <h3 className="text-base font-extrabold text-[#0F172A]">{step.title}</h3>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">{step.description}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
