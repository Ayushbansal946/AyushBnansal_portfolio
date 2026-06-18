/**
 * ProcessSection.tsx — How We Work
 *
 * Desktop (lg+): Sticky scroll-driven horizontal animation (300vh tall section)
 * Mobile (<lg):  Touch-swipe/drag horizontal carousel with CSS scroll-snap
 */

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  { num: 'STEP 01', title: 'Discovery\nPhase',   description: 'Understanding your goals, pain points, audience, and what sets you apart.' },
  { num: 'STEP 02', title: 'Project\nKickoff',   description: 'Setting up projects, aligning on scope and milestones, and diving into the work.' },
  { num: 'STEP 03', title: 'Receive\n& Refine',  description: 'Sharing initial designs, gathering feedback, and fine-tuning together.' },
  { num: 'STEP 04', title: 'Continue\n& Grow',   description: 'Launching with confidence and supporting your next extraordinary moves.' },
];

const techStack = [
  "FIGMA", "ADOBE EXPRESS", "CANVA", "HTML", "CSS", "JAVASCRIPT",
  "CHATGPT", "GEMINI", "CLAUDE", "ANTIGRAVITY", "TAILWINDCSS"
];
// Double it for seamless loop
const marqueeItems = [...techStack, ...techStack];

export default function ProcessSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: mobileContainerRef });

  return (
    <>
      {/* ══════════════════════════════════════
          MOBILE — horizontal drag/swipe carousel
          Hidden on lg+ (desktop layout below)
      ══════════════════════════════════════ */}
      <section id="process" className="lg:hidden relative bg-bg pt-20 pb-16">

        {/* Header */}
        <div className="px-[5vw] mb-8">
          <p className="font-body font-bold uppercase text-[11px] tracking-[0.3em] text-text-muted mb-2">[PROCESS]</p>
          <div className="flex items-baseline justify-between">
            <h2 className="font-heading uppercase text-text-main leading-none text-fluid-heading">HOW I WORK</h2>
            <span className="font-body text-[10px] tracking-[0.15em] text-text-muted uppercase">← DRAG →</span>
          </div>
        </div>

        {/* Native CSS snap horizontal scroll — swipe on touch, drag on desktop */}
        <div
          ref={mobileContainerRef}
          className="flex overflow-x-auto pb-6"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
          } as React.CSSProperties}
        >
          {steps.map((step, i) => (
            <div
              key={i}
              className="shrink-0 h-[360px] flex items-center py-4"
              style={{
                width: '85vw',
                scrollSnapAlign: 'start',
                paddingLeft: '5vw',
                paddingRight: '4vw',
                borderLeft: i > 0 ? '1px solid var(--border)' : 'none',
              }}
            >
              <div>
                <span className="font-body font-bold text-accent block mb-5 tracking-[0.2em] uppercase text-[0.78rem]">{step.num}</span>
                <h3
                  className="font-heading uppercase text-text-main leading-[0.9] tracking-[-0.02em] mb-5 whitespace-pre-line"
                  style={{ fontSize: 'clamp(2.2rem, 7vw, 3rem)' }}
                >{step.title}</h3>
                <p className="font-body text-text-muted leading-[1.6] text-[0.95rem]">{step.description}</p>
              </div>
            </div>
          ))}
          <div className="shrink-0 w-[5vw]" />
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-2">
          {steps.map((_, i) => (
            <motion.div
              key={i}
              className="w-6 h-[2px] bg-accent rounded-full"
              style={{
                opacity: useTransform(
                  scrollXProgress,
                  [(i - 0.5) / 3, i / 3, (i + 0.5) / 3],
                  [0.2, 1, 0.2]
                ),
              }}
            />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          DESKTOP — sticky scroll-driven animation
          Hidden on mobile, shown on lg+
      ══════════════════════════════════════ */}
      <section
        id="process-desktop"
        ref={targetRef}
        className="hidden lg:block relative h-[300vh] bg-bg"
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
              className="font-heading uppercase text-text-main leading-none tracking-[-0.01em] text-fluid-heading"
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
                    className="font-body font-bold text-accent block mb-8 tracking-[0.2em] uppercase text-fluid-step-num"
                  >
                    {step.num}
                  </span>

                  {/* Step title — big editorial heading */}
                  <h3
                    className="font-heading uppercase text-text-main leading-[0.9] tracking-[-0.02em] mb-10 whitespace-pre-line text-fluid-step-title"
                  >
                    {step.title}
                  </h3>

                  {/* Step description */}
                  <p
                    className="font-body text-text-muted max-w-[500px] leading-[1.6] text-fluid-step-desc"
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

      </section>

      {/* ══════════════════════════════════════
          TECH STACK MARQUEE
      ══════════════════════════════════════ */}
      <div className="w-full bg-surface py-6 overflow-hidden relative flex items-center border-t border-border">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
        >
          {marqueeItems.map((item, idx) => (
            <div key={idx} className="flex items-center mx-6">
              <span className="font-heading uppercase text-text-main text-xl tracking-widest">{item}</span>
              <span className="text-accent mx-6 text-xl">✦</span>
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
