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
      className="relative w-full min-h-screen flex flex-col justify-between bg-bg overflow-hidden pt-[15vh] pb-16 px-6 md:px-[5vw] lg:pt-[10vh] lg:pb-[100px]"
    >
      {/* ── Background Image & Overlay ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/images/hero_bg.png"
          alt="Cityscape"
          className="w-full h-full object-cover object-center opacity-50 mix-blend-luminosity"
        />
        {/* Gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/90 via-bg/60 to-bg pointer-events-none" />
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
            // className="mb-4 lg:mb-8"
          >
            <p
              className="font-body font-bold uppercase tracking-[0.3em] text-text-muted mt-16 lg:mt-[5.5rem] text-[11px]"
            >
              [PORTFOLIO]
            </p>
          </motion.div>

          {/* Oversized AYUSH wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="z-20 relative mt-[clamp(2rem,5vh,5rem)]"
          >
            <h1
              className="font-heading uppercase tracking-tighter leading-[1] text-text-main -ml-[0.04em] -mt-[0.25em] text-fluid-hero"
            >
              AYUSH<sup className="text-xl md:text-3xl ml-2 font-bold text-accent">®</sup>
            </h1>
          </motion.div>

          {/* Tagline — subheading under name */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-body font-medium tracking-tight leading-snug text-text-muted text-fluid-tagline mt-[clamp(0.75rem,1.5vh,1.5rem)]"
          >
            Beyond Visuals. <span className="text-text-main">Built with Vision.</span>
          </motion.p>
        </div>


      </div>

      {/* ── Center: Profile Image (sits behind name) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-32 z-10 pointer-events-none mt-5"
      >
        <div className="relative w-[85%] md:w-[55%] lg:w-[42%] aspect-[4/3] overflow-hidden rounded-xl">
          {/* Gradient edges that blend the photo into the dark bg */}
          <div
            className="absolute inset-0 pointer-events-none z-10 rounded-xl"
            style={{ 
              background: 'linear-gradient(to top, var(--bg) 0%, transparent 40%), linear-gradient(to bottom, var(--bg) 0%, transparent 30%), linear-gradient(to right, var(--bg) 0%, transparent 20%, transparent 80%, var(--bg) 100%)',
              boxShadow: 'inset 0 0 80px 20px var(--bg)'
            }}
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
            className="font-body font-medium leading-[1.25] text-text-main tracking-[-0.01em] text-fluid-bio"
          >
            I build brands, websites, and digital experiences{' '}
            <br className="hidden md:block" />
            <span className="text-text-muted">
              with intention, clarity and care.
            </span>
          </p>
          
          <div className="flex flex-wrap gap-4 mt-8 lg:mt-12">
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
          <path d="M0,120 L0,60 C300,120 900,120 1200,60 L1200,120 Z" className="fill-surface" />
        </svg>
      </div>
    </section>
  );
}
