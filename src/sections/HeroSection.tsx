/**
 * HeroSection.tsx — Full-screen hero / above-the-fold section
 * 
 * Layout:
 *   - Oversized name "AYUSH" spanning full viewport width
 *   - Profile photo centered / right-biased behind the name
 *   - Editorial tagline top-right (desktop) and bottom-right (mobile)
 *   - Descriptive bio snippet bottom-left
 * 
 * Components used: (none — fully self-contained)
 * 
 * Future Development:
 *   - Replace static profile image with a Cloudinary-hosted asset with
 *     automatic format optimization (AVIF/WebP) and lazy loading.
 *   - Add a subtle looping background particle canvas for ambient texture.
 */

import { motion } from 'framer-motion';
import Button from '../components/Button';
import { useProfileSettings } from '../hooks/useProfileSettings';

export default function HeroSection() {
  const profile = useProfileSettings();

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-between"
      style={{
        paddingTop: '10vh',
        paddingBottom: '100px',
        paddingLeft: '5vw',
        paddingRight: '5vw',
        backgroundColor: 'var(--bg)',
        overflow: 'hidden',
      }}
    >
      {/* ── Background Noise & Gradients ── */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none mix-blend-overlay">
        {/* Subtle noise texture */}
      </div>
      
      {/* ── Top Row: Name + Tagline ── */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center relative z-20">
        
        {/* Left Side — Split lines for layout */}
        <div className="flex flex-col relative w-full lg:w-auto">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p
              className="font-body font-bold uppercase tracking-widest"
              style={{ fontSize: '11px', letterSpacing: '0.3em', color: 'var(--text-muted)',marginTop: '5.5rem' }}
            >
              [PORTFOLIO]
            </p>
          </motion.div>

          {/* Oversized AYUSH wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="z-20 relative"
            style={{ marginTop: 'clamp(2rem, 5vh, 5rem)' }}
          >
            <h1
              className="text-text-main tracking-tighter leading-[1]"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(3rem, 10vw, 8.5rem)',
                textTransform: 'uppercase',
                marginLeft: '-0.04em',
                color: 'var(--text-main)',
                marginTop: '-0.25em',
              }}
            >
              AYUSH<sup className="text-xl md:text-3xl ml-2 font-bold" style={{ color: 'var(--accent)' }}>®</sup>
            </h1>
          </motion.div>

          {/* Tagline — subheading under name */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-body font-medium tracking-tight leading-snug"
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.8rem)',
              color: 'var(--text-muted)',
              marginTop: 'clamp(0.75rem, 1.5vh, 1.5rem)',
            }}
          >
            Beyond Visuals. <span style={{ color: 'var(--text-main)' }}>Built with Vision.</span>
          </motion.p>
        </div>


      </div>

      {/* ── Center: Profile Image (sits behind name) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-32 z-10 pointer-events-none"
        style={{ marginTop: '20px' }}
      >
        <div className="relative w-[85%] md:w-[55%] lg:w-[42%] aspect-[4/3] overflow-hidden rounded-xl">
          {/* Gradient edges that blend the photo into the dark bg */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{ background: 'linear-gradient(to top, var(--bg) 0%, transparent 50%, transparent 100%)' }}
          />
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{ background: 'linear-gradient(to right, var(--bg) 0%, transparent 20%, transparent 80%, var(--bg) 100%)' }}
          />
          <img
            src="/images/profile_enhanced.png"
            alt="Ayush Bansal — UI/UX Designer"
            className="w-full h-full object-cover object-top brightness-90 pointer-events-auto select-none"
          />
        </div>
      </motion.div>

      {/* ── Bottom Row: Bio + Mobile Tagline ── */}
      <div className="flex justify-between items-end relative z-20">

        {/* Bio snippet & Actions — bottom left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl"
        >
          <p
            className="font-medium leading-[1.25]"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.85rem, 1.36vw, 1.08rem)',
              color: 'var(--text-main)',
              letterSpacing: '-0.01em',
            }}
          >
            I build brands, websites, and digital experiences{' '}
            <br className="hidden md:block" />
            <span style={{ color: 'var(--text-muted)' }}>
              with intention, clarity and care.
            </span>
          </p>
          
          <div className="flex flex-wrap gap-4" style={{ marginTop: '48px' }}>
            <Button 
              as="a" 
              href={profile.resumeUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              variant="primary"
            >
              Download Resume
            </Button>
            <Button 
              as="a" 
              href="#contact" 
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact Me
            </Button>
          </div>
        </motion.div>


        </div>

      {/* ── Shape Divider: Soft Arch ── */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-0 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[80px]">
          <path d="M0,120 L0,60 C300,120 900,120 1200,60 L1200,120 Z" fill="var(--surface)" />
        </svg>
      </div>
    </section>
  );
}
