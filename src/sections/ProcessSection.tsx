/**
 * ProcessSection.tsx — How We Work
 *
 * Desktop (lg+): Sticky scroll-driven horizontal animation (300vh tall section)
 * Mobile (<lg):  Touch-swipe/drag horizontal carousel with CSS scroll-snap
 */

import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

const steps = [
  { num: 'STEP 01', title: 'Discovery\nPhase',   description: 'Understanding your goals, pain points, audience, and what sets you apart.' },
  { num: 'STEP 02', title: 'Project\nKickoff',   description: 'Setting up projects, aligning on scope and milestones, and diving into the work.' },
  { num: 'STEP 03', title: 'Receive\n& Refine',  description: 'Sharing initial designs, gathering feedback, and fine-tuning together.' },
  { num: 'STEP 04', title: 'Continue\n& Grow',   description: 'Launching with confidence and supporting your next extraordinary moves.' },
];

const techStackLogos = [
  { name: 'Figma', src: 'https://raw.githubusercontent.com/pheralb/svgl/main/static/library/figma.svg' },
  { name: 'Adobe Creative Cloud', src: 'https://raw.githubusercontent.com/pheralb/svgl/main/static/library/adobe.svg' },
  { name: 'Canva', src: 'https://raw.githubusercontent.com/pheralb/svgl/main/static/library/canva.svg' },
  { name: 'HTML5', src: 'https://raw.githubusercontent.com/pheralb/svgl/main/static/library/html5.svg' },
  { name: 'CSS3', src: 'https://raw.githubusercontent.com/pheralb/svgl/main/static/library/css.svg' },
  { name: 'JavaScript', src: 'https://raw.githubusercontent.com/pheralb/svgl/main/static/library/javascript.svg' },
  { name: 'TypeScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { name: 'React', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'TailwindCSS', src: 'https://raw.githubusercontent.com/pheralb/svgl/main/static/library/tailwindcss.svg' },
  { name: 'Firebase', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg' },
  { name: 'Microsoft Copilot', src: 'https://res.cdn.office.net/officehub/images/content/images/unauth-odc/copilot-icon-513486c4f9.svg' },
  { name: 'OpenAI ChatGPT', src: '/logos/chatgpt.svg' },
  { name: 'Google Gemini', src: 'https://raw.githubusercontent.com/pheralb/svgl/main/static/library/gemini.svg' },
  { name: 'Claude AI', src: 'https://cdn.simpleicons.org/anthropic/white' },
  { name: 'Antigravity Agent', isText: true }
];
// Quadruple items to guarantee seamless looping across all screen widths up to 4K
const marqueeItems = [...techStackLogos, ...techStackLogos, ...techStackLogos, ...techStackLogos];

export default function ProcessSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start start', 'end end'] });
  // Create a stepped scroll effect so it "snaps" to each step.
  // 0.15 pause, 0.10 transition, 0.20 pause, etc.
  const x = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25, 0.45, 0.55, 0.75, 0.85, 1],
    ['0%', '0%', '-25%', '-25%', '-50%', '-50%', '-75%', '-75%']
  );

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
        <div className="px-6 md:px-[5vw] mb-8">
          <p className="font-body font-bold uppercase text-[11px] tracking-[0.3em] text-text-muted mb-2">[PROCESS]</p>
          <div className="flex items-baseline justify-between">
            <h2 className="font-heading uppercase text-text-main leading-none text-fluid-heading">HOW I WORK</h2>
            <span className="font-body text-[10px] tracking-[0.15em] text-text-muted uppercase">← DRAG →</span>
          </div>
        </div>

        {/* Native CSS snap horizontal scroll — swipe on touch, drag on desktop */}
        <div
          ref={mobileContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar px-6 md:px-[5vw] pb-8"
          style={{
            scrollbarWidth: 'none',
          } as React.CSSProperties}
        >
          {steps.map((step, i) => (
            <div
              key={i}
              className="shrink-0 h-[360px] flex items-center py-4 relative overflow-hidden"
              style={{
                width: '85vw',
                scrollSnapAlign: 'start',
                paddingLeft: '5vw',
                paddingRight: '4vw',
                borderLeft: i > 0 ? '1px solid var(--border)' : 'none',
              }}
            >
              <div className="relative z-10">
                <span className="font-body font-bold text-accent block mb-5 tracking-[0.2em] uppercase text-[0.78rem]">{step.num}</span>
                <h3
                  className="font-heading uppercase text-text-main leading-[0.9] tracking-[-0.02em] mb-5 whitespace-pre-line"
                  style={{ fontSize: 'clamp(2.2rem, 7vw, 3rem)' }}
                >{step.title}</h3>
                <p className="font-body text-text-muted leading-[1.6] text-[0.95rem] max-w-[85%]">{step.description}</p>
              </div>

              {/* Mobile Giant Number */}
              <div className="absolute right-0 bottom-[10%] z-0 pointer-events-none select-none opacity-[0.07]">
                <span 
                  className="font-heading text-[60vw] leading-none text-transparent" 
                  style={{ WebkitTextStroke: '1px var(--text-main)' }}
                >
                  {step.num.split(' ')[1]}
                </span>
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
                opacity: useTransform(scrollXProgress, (val) => {
                  const target = i / 3;
                  const dist = Math.abs(val - target);
                  if (dist < 0.166) {
                    return 1 - (dist / 0.166) * 0.8;
                  }
                  return 0.2;
                }),
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
                className={`w-[100vw] h-full flex items-center justify-between px-[5vw] shrink-0 relative ${index > 0 ? 'border-l border-border' : ''}`}
              >
                <div className="w-full max-w-[680px] relative z-10">
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

                {/* Giant Background Number for Empty Space */}
                <div className="hidden lg:flex absolute right-[10vw] top-1/2 -translate-y-1/2 z-0 pointer-events-none select-none opacity-20">
                  <span 
                    className="font-heading text-[28vw] leading-none text-transparent" 
                    style={{ WebkitTextStroke: '2px var(--text-main)' }}
                  >
                    {step.num.split(' ')[1]}
                  </span>
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
          TECH STACK MARQUEE (Pauses on Hover + Interactive Tooltips)
      ══════════════════════════════════════ */}
      <div 
        className="marquee-container w-full bg-surface pt-10 pb-8 overflow-x-hidden relative flex items-center border-t border-border select-none"
        aria-label="Technologies and Tools Marquee"
      >
        {/* Left & Right gradient edge masks for smooth fade transitions */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface via-surface/85 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface via-surface/85 to-transparent z-20 pointer-events-none" />

        <div className="marquee-track flex whitespace-nowrap items-center">
          {marqueeItems.map((item, idx) => (
            <div
              key={idx}
              tabIndex={0}
              className="group/item relative flex items-center mx-5 py-2 cursor-pointer outline-none"
              aria-label={item.name}
            >
              {/* Tooltip Popup / Hint — appears on hover or focus */}
              <div
                role="tooltip"
                className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 scale-90 translate-y-1 group-hover/item:opacity-100 group-hover/item:scale-100 group-hover/item:translate-y-0 group-focus/item:opacity-100 group-focus/item:scale-100 group-focus/item:translate-y-0 transition-all duration-200 ease-out z-40"
              >
                <div className="relative bg-[#0d0d0d] text-white text-[11px] font-body font-bold uppercase tracking-[0.12em] px-3 py-1.5 rounded-lg border border-border shadow-[0_8px_24px_rgba(0,0,0,0.7)] whitespace-nowrap flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0" />
                  <span>{item.name}</span>
                  {/* Downward triangle arrow pointing to the logo */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#0d0d0d]" />
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -z-10 w-0 h-0 border-x-[5px] border-x-transparent border-t-[5px] border-t-border" />
                </div>
              </div>

              {/* Logo / Text Icon with subtle scale-up on hover */}
              <div className="flex items-center justify-center h-8 transition-transform duration-200 group-hover/item:scale-115">
                {item.isText ? (
                  <span className="font-heading uppercase text-text-main text-lg tracking-widest transition-colors duration-200 group-hover/item:text-accent select-none">
                    {item.name}
                  </span>
                ) : (
                  <img
                    src={item.src}
                    alt={item.name}
                    className="h-7 w-auto max-w-[100px] object-contain opacity-70 group-hover/item:opacity-100 transition-opacity duration-200 select-none drop-shadow-sm"
                    loading="lazy"
                  />
                )}
              </div>

              <span className="text-accent/50 mx-5 text-base select-none">✦</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
