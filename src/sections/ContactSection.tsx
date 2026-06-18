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
      className="relative overflow-hidden bg-[#F2F2F2] text-[#0C0C0C] rounded-t-[3rem]"
    >
      {/* ── Main Content: Left + Right columns ── */}
      <div
        className="flex flex-col md:flex-row px-[5vw] py-[96px] gap-[80px]"
      >
        {/* LEFT COLUMN: Heading + ContactInfo */}
        <div
          className="flex-1 flex flex-col justify-between min-w-0"
        >
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading uppercase leading-none tracking-[-0.01em] text-[#0C0C0C] mb-[48px] text-fluid-heading"
            >
              LET'S WORK<br />TOGETHER
            </motion.h2>
            <ContactInfo />
          </div>
        </div>

        {/* RIGHT COLUMN: Contact Form */}
        <div
          className="flex-1 w-full max-w-[520px]"
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
      <div className="border-t border-[rgba(0,0,0,0.12)]">
        <div
          className="flex flex-col sm:flex-row items-center justify-between px-[5vw] py-[28px] gap-3"
        >
          <p
            className="font-body font-bold uppercase text-[0.7rem] tracking-[0.15em] text-black/50"
          >
            Designed by Ayush Bansal
          </p>
          <p
            className="font-body font-bold uppercase text-[0.7rem] tracking-[0.15em] text-black/50"
          >
            © 2025 All Rights Reserved
          </p>
        </div>
      </div>
    </section>
  );
}
