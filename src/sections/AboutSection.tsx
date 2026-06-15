/**
 * AboutSection.tsx — Biography & Word Reveal
 * 
 * Layout (full-width editorial):
 *   - Section label "[ABOUT]"
 *   - Scroll-driven word-by-word bio text reveal (WordReveal component)
 */

import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';
import WordReveal from '../components/WordReveal';

const aboutBio =
  "I'm an innovative UI/UX Designer and Front-End Developer with a passion for creating user-centric digital solutions. I combine years of web design expertise to craft meaningful, story-driven experiences.";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Track scroll progress within this specific section for the word-reveal
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 70%', 'center center'],
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative pt-[120px] pb-[120px] bg-bg"
    >
      <div className="w-full px-[5vw]">

        {/* ── Label ── */}
        <div className="mb-6">
          <p
            className="font-body font-bold uppercase text-[11px] tracking-[0.3em] text-text-muted"
          >
            [ABOUT]
          </p>
        </div>

        {/* ── Massive Heading ── */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="font-heading uppercase text-text-main leading-[0.9] tracking-[-0.02em] mb-12"
          style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
          }}
        >
          ABOUT ME
        </motion.h2>

        {/* ── Scroll-Driven Word Reveal Bio ── */}
        <div className="relative max-w-[1200px]">
          <WordReveal text={aboutBio} progress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}
