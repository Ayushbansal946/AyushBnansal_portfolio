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
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'HOME',       href: '#hero' },
  { label: 'PORTFOLIO',  href: '#portfolio' },
  { label: 'PROCESS',    href: '#process' },
  { label: 'SKILLS',     href: '#skills' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'ABOUT',      href: '#about' },
  { label: 'CONTACT',    href: '#contact' },
];

// ── Social link definitions ──
const socialLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/ayush946' },
  { label: 'Behance',  href: 'https://behance.net/Ayush-bansal' },
  { label: 'Email',    href: 'mailto:ayushbansal946@gmail.com' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  // ── Shared link hover helpers ──
  const onHoverAccent = (e: React.MouseEvent<HTMLElement>) =>
    (e.currentTarget.style.color = 'var(--accent)');
  const onLeaveMain = (e: React.MouseEvent<HTMLElement>) =>
    (e.currentTarget.style.color = 'var(--text-main)');
  const onLeaveLight = (e: React.MouseEvent<HTMLElement>) =>
    (e.currentTarget.style.color = 'var(--text-light)');

  return (
    <>
      {/* ══════════════════════════════════════
          FIXED TOP BAR
          ══════════════════════════════════════ */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 50,
          transition: 'background-color 0.35s, border-color 0.35s, backdrop-filter 0.35s',
          backgroundColor: scrolled ? 'rgba(10,10,10,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        <div
          style={{
            width: '100%',
            padding: '0 5vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '72px',
            position: 'relative',
          }}
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.55rem',
              color: 'var(--text-main)',
              letterSpacing: '0.05em',
              transition: 'color 0.2s',
              lineHeight: 1,
              textDecoration: 'none',
            }}
            onMouseEnter={onHoverAccent}
            onMouseLeave={onLeaveMain}
          >
            AYUSH
          </a>

          {/* Availability badge — center, desktop only */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              pointerEvents: 'none',
            }}
            className="hidden md:flex"
          >
            {/* Pulsing green dot */}
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                display: 'block',
                flexShrink: 0,
                boxShadow: '0 0 0 0 rgba(16,185,129,0.4)',
                animation: 'availablePulse 2s ease-in-out infinite',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}
            >
              Available for Project
            </span>
          </div>

          {/* Hamburger button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              color: 'var(--text-main)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.2s',
              position: 'relative',
              zIndex: 60,
            }}
            onMouseEnter={onHoverAccent}
            onMouseLeave={onLeaveMain}
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
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 40,
                backgroundColor: 'rgba(0,0,0,0.65)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
              }}
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
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                zIndex: 55,
                width: '100%',
                maxWidth: '480px',
                height: '100%',
                backgroundColor: 'var(--bg)',
                borderLeft: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* ── Panel Header: Close button ── */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  padding: '20px 24px',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'var(--text-muted)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-main)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  <X size={18} strokeWidth={2} />
                  Close
                </button>
              </div>

              {/* ── Nav links ── */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  flex: 1,
                  padding: '24px 48px',
                }}
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
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                      color: 'var(--text-main)',
                      display: 'block',
                      padding: '12px 0',
                      borderBottom: '1px solid var(--border)',
                      transition: 'color 0.2s',
                      lineHeight: 1,
                      letterSpacing: '-0.01em',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={onHoverAccent}
                    onMouseLeave={onLeaveMain}
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
                style={{ padding: '28px 48px', borderTop: '1px solid var(--border)' }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: '14px',
                  }}
                >
                  Connect
                </p>
                <div style={{ display: 'flex', gap: '28px' }}>
                  {socialLinks.map(social => (
                    <a
                      key={social.label}
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        color: 'var(--text-light)',
                        transition: 'color 0.2s',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={onHoverAccent}
                      onMouseLeave={onLeaveLight}
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
