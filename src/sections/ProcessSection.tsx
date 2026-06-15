/**
 * ProcessSection.tsx — How We Work (Horizontal Scroll Steps)
 * 
 * A sticky horizontal scroll experience driven by vertical page scroll.
 * The parent section is 300vh tall (reduced from 400vh) so the experience
 * feels appropriately paced — not overly long.
 * 
 * Technique:
 *   - Parent: `position: relative; height: 300vh`
 *   - Inner:  `position: sticky; top: 0; height: 100vh`
 *   - Framer Motion maps scrollYProgress [0→1] to translateX [0%→-75%]
 *     on a 400vw wide flex row (4 steps × 100vw each)
 * 
 * Sub-components: (none — fully self-contained)
 * 
 * Future Development:
 *   - Add progress indicator dots at the top showing current step (1/4, 2/4…)
 *   - Mobile: collapse into a vertical stacked list (no sticky scroll)
 *   - Add swipe support via Framer Motion drag="x" for touch devices
 */

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// ── Static step data ──
const steps = [
  {
    num: 'STEP 01',
    title: 'Discovery\nPhase',
    description: 'Understanding your goals, pain points, audience, and what sets you apart.',
  },
  {
    num: 'STEP 02',
    title: 'Project\nKickoff',
    description: 'Setting up projects, aligning on scope and milestones, and diving into the work.',
  },
  {
    num: 'STEP 03',
    title: 'Receive\n& Refine',
    description: 'Sharing initial designs, gathering feedback, and fine-tuning together.',
  },
  {
    num: 'STEP 04',
    title: 'Continue\n& Grow',
    description: 'Launching with confidence and supporting your next extraordinary moves.',
  },
];

export default function ProcessSection() {
  const targetRef = useRef<HTMLDivElement>(null);

  // Track vertical scroll progress of the 300vh container
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll 0→1 to horizontal translation 0%→-75%
  // (4 items each 100vw wide; to reach last, move left by 3×100vw = 75% of total 400vw)
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

  return (
    <section
      id="process"
      ref={targetRef}
      className="relative h-[300vh] bg-bg"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-[100vh] pt-[80px] pb-[40px] overflow-hidden flex flex-col">
        {/* ── Top Area: Section label + Heading ── */}
        <div className="w-full flex items-baseline justify-between shrink-0 px-[5vw] pt-8">
          {/* Left: label + heading */}
          <div>
            <p className="font-body font-bold uppercase text-[11px] tracking-[0.3em] text-text-muted mb-2">
              [PROCESS]
            </p>
            <h2
              className="font-heading uppercase text-text-main leading-none tracking-[-0.01em]"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
              }}
            >
              HOW I WORK
            </h2>
          </div>

          {/* Right: step counter */}
          <motion.p
            className="font-body font-bold hidden md:block text-xs tracking-[0.15em] text-text-muted tabular-nums"
          >
            SCROLL TO EXPLORE →
          </motion.p>
        </div>

        {/* ── Horizontal Steps Track ── */}
        <div className="flex-1 flex items-center overflow-hidden">
          <motion.div
            className="flex items-center w-[400vw] h-full"
            style={{ x }}
          >
            {steps.map((step, index) => (
              <div
                key={index}
                className={`w-[100vw] h-full flex items-center px-[5vw] shrink-0 ${index > 0 ? 'border-l border-border' : ''}`}
              >
                <div className="w-full max-w-[680px]">
                  {/* Step number */}
                  <span
                    className="font-body font-bold text-accent block mb-8 tracking-[0.2em] uppercase"
                    style={{
                      fontSize: 'clamp(0.75rem, 1.2vw, 1rem)',
                    }}
                  >
                    {step.num}
                  </span>

                  {/* Step title — big editorial heading */}
                  <h3
                    className="font-heading uppercase text-text-main leading-[0.9] tracking-[-0.02em] mb-10 whitespace-pre-line"
                    style={{
                      fontSize: 'clamp(1.8rem, 4.3vw, 4.6rem)',
                    }}
                  >
                    {step.title}
                  </h3>

                  {/* Step description */}
                  <p
                    className="font-body text-text-muted max-w-[500px] leading-[1.6]"
                    style={{
                      fontSize: 'clamp(1rem, 1.4vw, 1.35rem)',
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Bottom progress bar ── */}
        <div className="w-full flex items-center gap-2 shrink-0 px-[5vw] pb-7">
          {steps.map((_, i) => (
            <div
              key={i}
              className="flex-1 h-[2px] bg-border rounded-[2px] overflow-hidden relative"
            >
              <motion.div
                className="absolute inset-0 bg-accent origin-left"
                style={{
                  scaleX: useTransform(
                    scrollYProgress,
                    [i / 4, (i + 1) / 4],
                    [0, 1]
                  ),
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Shape Divider: Arrow ── */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-0 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[80px]">
          <path d="M0,120 L0,0 L600,120 L1200,0 L1200,120 Z" className="fill-surface" />
        </svg>
      </div>
    </section>
  );
}
