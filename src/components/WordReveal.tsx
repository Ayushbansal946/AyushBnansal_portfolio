/**
 * WordReveal.tsx — Scroll-driven word-by-word text opacity animation
 * 
 * Splits an input string into individual words and fades each one in
 * sequentially as the user scrolls through the parent section.
 * 
 * How it works:
 *   - Parent section tracks its scrollYProgress via Framer Motion useScroll()
 *   - Progress is passed in as a MotionValue<number> from 0→1
 *   - Each word is mapped to a sub-range [i/n → (i+1)/n] of that progress
 *   - useTransform maps the sub-range to opacity 0.15→1
 * 
 * Performance:
 *   - Wrapped in React.memo to prevent re-renders during scroll
 *   - useTransform updates style directly on the DOM node (no React re-render)
 * 
 * Future Development:
 *   - Add a subtle translateY animation per word for a floating entrance effect
 *   - Support character-by-character reveal for short hero slogans
 */

import { motion, useTransform } from 'framer-motion';
import React from 'react';

// ── Types ──

interface WordRevealProps {
  text: string;
  progress: any; // Framer Motion MotionValue<number>
}

interface WordProps {
  children: string;
  progress: any;
  range: [number, number];
}

// ── Word sub-component ──

const Word = ({ children, progress, range }: WordProps) => {
  const opacity = useTransform(progress, range, [0.15, 1]);

  return (
    <span style={{ marginRight: '0.25em', display: 'inline-block' }}>
      <motion.span
        style={{
          opacity,
          fontFamily: 'var(--font-body)',
          color: 'var(--text-main)',
          display: 'inline',
        }}
      >
        {children}
      </motion.span>
    </span>
  );
};

// ── WordReveal container ──

export const WordReveal = React.memo(function WordReveal({ text, progress }: WordRevealProps) {
  const words = text.split(' ');

  return (
    <div
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(1.2rem, 3vw, 2rem)',
        lineHeight: 1.25,
        letterSpacing: '-0.01em',
        fontWeight: 400,
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;

        return (
          <Word key={i} progress={progress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </div>
  );
});

export default WordReveal;
