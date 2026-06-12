/**
 * ContactInfo.tsx — Direct contact channels display
 * 
 * Shows email, phone/WhatsApp, and social links (LinkedIn, Behance)
 * designed specifically to sit on the orange (#FF4925) ContactSection background.
 * All text and link colors are white-based to maximize contrast.
 * 
 * Future Development:
 *   - Integrate a Calendly or Cal.com scheduling widget so prospects
 *     can book a call directly without email latency.
 *   - Add a location tag (city/timezone) for global clients.
 */

import React from 'react';

export const ContactInfo = React.memo(function ContactInfo() {
  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: '0.65rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    fontWeight: 700,
    color: 'rgba(0,0,0,0.4)',
    marginBottom: '6px',
    display: 'block',
  };

  const linkStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: 'clamp(1rem, 1.5vw, 1.4rem)',
    color: '#0C0C0C',
    display: 'block',
    width: 'fit-content',
    transition: 'color 0.2s, transform 0.2s',
    textDecoration: 'none',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Tagline */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
          color: 'rgba(0,0,0,0.8)',
          maxWidth: '420px',
          lineHeight: 1.5,
          fontWeight: 500,
        }}
      >
        Have a project in mind? Fill out the form or reach out directly.
      </p>

      {/* Email */}
      <div>
        <span style={labelStyle}>Email</span>
        <a
          href="mailto:ayushbansal946@gmail.com"
          style={linkStyle}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#0055FF'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#0C0C0C'; }}
        >
          ayushbansal946@gmail.com
        </a>
      </div>

      {/* Phone */}
      <div>
        <span style={labelStyle}>Phone / WhatsApp</span>
        <a
          href="https://wa.me/917500039393"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#0055FF'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#0C0C0C'; }}
        >
          +91 7500039393
        </a>
      </div>

      {/* Social Links */}
      <div style={{ display: 'flex', gap: '32px', paddingTop: '8px' }}>
        {[
          { label: 'LinkedIn', href: 'https://linkedin.com/in/ayush946' },
          { label: 'Behance',  href: 'https://behance.net/Ayush-bansal' },
        ].map(social => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.8)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#0055FF'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(0,0,0,0.8)'; }}
          >
            {social.label}
          </a>
        ))}
      </div>
    </div>
  );
});

export default ContactInfo;
