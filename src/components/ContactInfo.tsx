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
import { useProfileSettings } from '../hooks/useProfileSettings';

export const ContactInfo = React.memo(function ContactInfo() {
  const profile = useProfileSettings();
  const labelClassName = "font-body text-[0.65rem] tracking-[0.2em] uppercase font-bold text-black/40 mb-[6px] block";
  
  const linkClassName = "font-body text-[#0C0C0C] block w-fit transition-all duration-200 no-underline hover:text-[#0055FF]";

  return (
    <div className="flex flex-col gap-8">
      {/* Tagline */}
      <p
        className="font-body text-black/80 max-w-[420px] leading-[1.5] font-medium"
        style={{
          fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
        }}
      >
        Have a project in mind? Fill out the form or reach out directly.
      </p>

      {/* Email */}
      <div>
        <span className={labelClassName}>Email</span>
        <a
          href={`mailto:${profile.email}`}
          className={linkClassName}
          style={{ fontSize: 'clamp(1rem, 1.5vw, 1.4rem)' }}
        >
          {profile.email}
        </a>
      </div>

      {/* Phone */}
      <div>
        <span className={labelClassName}>Phone / WhatsApp</span>
        <a
          href={`https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
          style={{ fontSize: 'clamp(1rem, 1.5vw, 1.4rem)' }}
        >
          {profile.phone}
        </a>
      </div>

      {/* Social Links */}
      <div className="flex gap-8 pt-2">
        {[
          { label: 'LinkedIn', href: profile.linkedin },
          { label: 'Behance',  href: profile.behance },
        ].map(social => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-[0.8rem] font-bold tracking-[0.1em] uppercase text-black/80 no-underline transition-colors duration-200 hover:text-[#0055FF]"
          >
            {social.label}
          </a>
        ))}
      </div>
    </div>
  );
});

export default ContactInfo;
