/**
 * Navigation.tsx — Fixed global navigation bar + hamburger menu overlay
 * 
 * Features:
 *   - Fixed top bar: Logo (left), "AVAILABLE FOR PROJECT" indicator (center), Hamburger (right)
 *   - Background becomes frosted glass when the user scrolls past 50px
 *   - Full-screen slide-out panel with large nav links and social links at bottom
 *   - Close button INSIDE the panel for clear discoverability
 *   - Escape key closes the overlay (accessibility requirement)
 * 
 * Scroll locking:
 *   - Body scroll is locked when the menu overlay is open
 *   - Clicking the backdrop also closes the overlay
 * 
 * Future Development:
 *   - Replace static "AVAILABLE FOR PROJECT" with a live Supabase boolean flag.
 *   - Add active-section highlight on nav links using IntersectionObserver.
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from './Icons';
import { useProfileSettings } from '../hooks/useProfileSettings';

const navLinks = [
  { label: 'HOME',       href: '#hero' },
  { label: 'PORTFOLIO',  href: '#portfolio' },
  { label: 'PROCESS',    href: '#process' },
  { label: 'SKILLS',     href: '#skills' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'ABOUT',      href: '#about' },
  { label: 'CONTACT',    href: '#contact' },
];



export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profile = useProfileSettings();
  
  const socialLinks = [
    { label: 'LinkedIn', href: profile.linkedin },
    { label: 'Behance',  href: profile.behance },
    { label: 'Email',    href: `mailto:${profile.email}` },
  ];

  // Toggle frosted-glass navbar after scrolling 50px
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape key (P2 accessibility fix)
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) setIsOpen(false);
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Smooth-scroll to section and close menu
  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };



  return (
    <>
      {/* ══════════════════════════════════════
          FIXED TOP BAR
          ══════════════════════════════════════ */}
      <nav
        className={`fixed top-0 left-0 w-full z-[60] transition-all duration-[350ms] ${scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-[14px] border-b border-border' : 'bg-transparent border-b border-transparent'}`}
      >
        <div
          className="w-full px-6 md:px-[5vw] flex items-center justify-between h-[72px] relative"
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
            className="font-heading text-[1.55rem] text-text-main tracking-[0.05em] transition-colors duration-200 leading-none no-underline hover:text-accent"
          >
            AYUSH
          </a>

          {/* Availability badge — center, desktop only */}
          <div
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-[10px] pointer-events-none"
          >
            {/* Pulsing green dot */}
            <span
              className="w-2 h-2 rounded-full bg-[#10b981] block shrink-0"
              style={{
                boxShadow: '0 0 0 0 rgba(16,185,129,0.4)',
                animation: 'availablePulse 2s ease-in-out infinite',
              }}
            />
            <span
              className="font-body text-[0.62rem] font-bold tracking-[0.22em] uppercase text-text-muted"
            >
              Available for Project
            </span>
          </div>

          {/* Hamburger button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            className="flex items-center justify-center w-[44px] h-[44px] text-text-main bg-transparent border-none cursor-pointer transition-colors duration-200 relative z-[60] hover:text-accent"
          >
            {isOpen ? <X size={26} strokeWidth={2} /> : <Menu size={26} strokeWidth={2} />}
          </button>
        </div>
      </nav>

      {/* ══════════════════════════════════════
          MENU OVERLAY
          ══════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dim backdrop — click to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/65 backdrop-blur-sm"
            />

            {/* Slide-out panel from right */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed top-0 right-0 z-[55] w-full max-w-[480px] h-full bg-bg border-l border-border flex flex-col justify-between"
            >
              {/* ── Panel Header: Close button ── */}
              <div
                className="flex justify-end py-5 px-6 border-b border-border"
              >
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="flex items-center gap-2 text-text-muted bg-transparent border-none cursor-pointer font-body text-[0.7rem] font-bold tracking-[0.15em] uppercase transition-colors duration-200 hover:text-text-main"
                >
                  <X size={18} strokeWidth={2} />
                  Close
                </button>
              </div>

              {/* ── Nav links ── */}
              <div
                className="flex flex-col justify-center flex-1 py-6 px-8 md:px-12"
              >
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ delay: 0.06 + i * 0.07, duration: 0.32 }}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="font-heading text-text-main block py-3 border-b border-border transition-colors duration-200 leading-none tracking-[-0.01em] no-underline hover:text-accent"
                    style={{
                      fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>

              {/* ── Social links at bottom ── */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ delay: 0.38, duration: 0.32 }}
                className="py-7 px-12 border-t border-border"
              >
                <p
                  className="font-body text-[0.62rem] font-bold tracking-[0.22em] uppercase text-text-muted mb-[14px]"
                >
                  Connect
                </p>
                <div className="flex gap-7">
                  {socialLinks.map(social => (
                    <a
                      key={social.label}
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="font-body text-[0.82rem] font-semibold text-text-light transition-colors duration-200 no-underline hover:text-accent"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Keyframe for the pulsing green dot */}
      <style>{`
        @keyframes availablePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.5); }
          50% { box-shadow: 0 0 0 6px rgba(16,185,129,0); }
        }
      `}</style>
    </>
  );
}
