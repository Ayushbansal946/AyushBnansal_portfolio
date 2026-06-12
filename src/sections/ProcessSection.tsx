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
      style={{ position: 'relative', height: '300vh', backgroundColor: 'var(--bg)' }}
    >
      {/* Sticky viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          paddingTop: '80px', // Push content below the fixed navbar
          paddingBottom: '40px', // Provide bottom breathing room
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ── Top Area: Section label + Heading ── */}
        <div
          style={{
            padding: '32px 5vw 0',
            width: '100%',
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}
        >
          {/* Left: label + heading */}
          <div>
            <p
              className="font-body font-bold uppercase"
              style={{ fontSize: '11px', letterSpacing: '0.3em', color: 'var(--text-muted)', marginBottom: '8px' }}
            >
              [PROCESS]
            </p>
            <h2
              className="font-heading uppercase"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                color: 'var(--text-main)',
                lineHeight: 1,
                letterSpacing: '-0.01em',
              }}
            >
              HOW I WORK
            </h2>
          </div>

          {/* Right: step counter */}
          <motion.p
            className="font-body font-bold hidden md:block"
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              color: 'var(--text-muted)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            SCROLL TO EXPLORE →
          </motion.p>
        </div>

        {/* ── Horizontal Steps Track ── */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          <motion.div
            className="flex"
            style={{
              x,
              width: '400vw',
              height: '100%',
              alignItems: 'center',
            }}
          >
            {steps.map((step, index) => (
              <div
                key={index}
                style={{
                  width: '100vw',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 5vw',
                  borderLeft: index > 0 ? '1px solid var(--border)' : 'none',
                  flexShrink: 0,
                }}
              >
                <div style={{ maxWidth: '680px', width: '100%' }}>
                  {/* Step number */}
                  <span
                    className="font-body font-bold"
                    style={{
                      fontSize: 'clamp(0.75rem, 1.2vw, 1rem)',
                      color: 'var(--accent)',
                      display: 'block',
                      marginBottom: '32px',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {step.num}
                  </span>

                  {/* Step title — big editorial heading */}
                  <h3
                    className="font-heading uppercase"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.8rem, 4.3vw, 4.6rem)',
                      color: 'var(--text-main)',
                      lineHeight: 0.9,
                      letterSpacing: '-0.02em',
                      marginBottom: '40px',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {step.title}
                  </h3>

                  {/* Step description */}
                  <p
                    className="font-body leading-relaxed"
                    style={{
                      fontSize: 'clamp(1rem, 1.4vw, 1.35rem)',
                      color: 'var(--text-muted)',
                      maxWidth: '500px',
                      lineHeight: 1.6,
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
        <div
          style={{
            padding: '0 5vw 28px',
            width: '100%',
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          {steps.map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: '2px',
                backgroundColor: 'var(--border)',
                borderRadius: '2px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'var(--accent)',
                  transformOrigin: 'left',
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
          <path d="M0,120 L0,0 L600,120 L1200,0 L1200,120 Z" fill="var(--surface)" />
        </svg>
      </div>
    </section>
  );
}
