/**
 * ContactSection.tsx — "LET'S WORK TOGETHER" Call to Action
 * 
 * Layout (orange backdrop with rounded top corners):
 *   LEFT  — Large typographic heading + ContactInfo (email, phone, socials)
 *   RIGHT — ContactForm (name, email, message, submit button)
 *   BOTTOM — Copyright bar
 * 
 * Sub-components:
 *   - ContactInfo → src/components/ContactInfo.tsx
 *   - ContactForm → src/components/ContactForm.tsx
 * 
 * Backend Notes:
 *   - ContactForm currently simulates sending (mock 1.5s delay).
 *   - To wire up a real email backend, see the implementation guide
 *     at the top of ContactForm.tsx (EmailJS / Resend / Firebase options).
 */

import { motion } from 'framer-motion';
import ContactForm from '../components/ContactForm';
import ContactInfo from '../components/ContactInfo';

export default function ContactSection() {
  return (
    <section
      id="contact"
      style={{
        backgroundColor: '#F2F2F2',
        position: 'relative',
        overflow: 'hidden',
        color: '#0C0C0C',
        borderRadius: '3rem 3rem 0 0',
      }}
    >
      {/* ── Main Content: Left + Right columns ── */}
      <div
        className="flex flex-col md:flex-row"
        style={{
          padding: '96px 5vw',
          gap: '80px',
        }}
      >
        {/* LEFT COLUMN: Heading + ContactInfo */}
        <div
          className="flex-1 flex flex-col justify-between"
          style={{ minWidth: 0 }}
        >
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading uppercase"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                lineHeight: 1,
                letterSpacing: '-0.01em',
                color: '#0C0C0C',
                marginBottom: '48px',
              }}
            >
              LET'S WORK<br />TOGETHER
            </motion.h2>
            <ContactInfo />
          </div>
        </div>

        {/* RIGHT COLUMN: Contact Form */}
        <div
          className="flex-1 w-full"
          style={{ maxWidth: '520px' }}
        >
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>

      {/* ── Footer Bar ── */}
      <div style={{ borderTop: '1px solid rgba(0,0,0,0.12)' }}>
        <div
          className="flex flex-col sm:flex-row items-center justify-between"
          style={{
            padding: '28px 5vw',
            gap: '12px',
          }}
        >
          <p
            className="font-body font-bold uppercase"
            style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(0,0,0,0.5)' }}
          >
            Designed by Ayush Bansal
          </p>
          <p
            className="font-body font-bold uppercase"
            style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(0,0,0,0.5)' }}
          >
            © 2025 All Rights Reserved
          </p>
        </div>
      </div>
    </section>
  );
}
