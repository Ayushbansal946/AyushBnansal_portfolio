/**
 * ContactForm.tsx — Interactive contact form on orange background
 * 
 * Renders the portfolio contact form with:
 *   - Floating labels (slide up when input is focused or filled)
 *   - Loading state during submission
 *   - Success banner with bounce animation
 *   - Error message display
 * 
 * All input styling uses WHITE borders and white text for maximum contrast
 * on the orange (#FF4925) ContactSection background.
 * 
 * =========================================================================
 *                   BACKEND INTEGRATION GUIDE (FREE SERVICES)
 * =========================================================================
 * 
 * OPTION A: EmailJS — Client-Side Only, FREE 200 emails/month
 * ─────────────────────────────────────────────────────────────
 * 1. npm install @emailjs/browser
 * 2. Sign up at https://www.emailjs.com/ → link your Gmail
 * 3. Create a template with {{from_name}}, {{reply_to}}, {{message}}
 * 4. Replace the mock delay in handleSubmit with:
 *    ```typescript
 *    import emailjs from '@emailjs/browser';
 *    await emailjs.send(
 *      'YOUR_SERVICE_ID',
 *      'YOUR_TEMPLATE_ID',
 *      { from_name: formData.name, reply_to: formData.email, message: formData.message },
 *      'YOUR_PUBLIC_KEY'
 *    );
 *    ```
 * 
 * OPTION B: Resend + Vercel Serverless — FREE 3,000 emails/month
 * ─────────────────────────────────────────────────────────────
 * 1. Create api/contact.ts in your Vercel project:
 *    ```typescript
 *    import { Resend } from 'resend';
 *    const resend = new Resend(process.env.RESEND_API_KEY);
 *    export async function POST(req: Request) {
 *      const { name, email, message } = await req.json();
 *      await resend.emails.send({
 *        from: 'Portfolio <onboarding@resend.dev>',
 *        to: 'ayushbansal946@gmail.com',
 *        subject: `Message from ${name}`,
 *        html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b> ${message}</p>`
 *      });
 *      return Response.json({ success: true });
 *    }
 *    ```
 * 2. Replace mock delay with: fetch('/api/contact', { method: 'POST', ... })
 * 
 * OPTION C: Firebase Firestore — FREE 50k reads/day
 * ─────────────────────────────────────────────────────────────
 * 1. npm install firebase
 * 2. Initialize Firebase, get a Firestore instance
 * 3. Replace mock delay with:
 *    ```typescript
 *    await addDoc(collection(db, 'contacts'), {
 *      name: formData.name, email: formData.email,
 *      message: formData.message, timestamp: new Date()
 *    });
 *    ```
 */

import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import Button from './Button';

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      if (!formRef.current) return;
      
      // ── EMAILJS INTEGRATION ──
      const SERVICE_ID = 'service_xcaj0rh';
      const TEMPLATE_ID = 'template_29pap4c';
      const PUBLIC_KEY = 'QI9x2QSSGOmPBEmWx';
      
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      setErrorMessage('Something went wrong. Please reach out directly via email.');
    }
  };

  // ── Success state ──
  if (status === 'success') {
    return (
      <div
        style={{
          background: 'rgba(0,0,0,0.05)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(0,0,0,0.1)',
          borderRadius: '20px',
          padding: '48px 32px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        {/* Animated checkmark */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#0c0c0c',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            animation: 'bounce 1s infinite',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            color: '#0c0c0c',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Message Sent!
        </h3>
        <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(0,0,0,0.7)', maxWidth: '320px', lineHeight: 1.6 }}>
          Thank you for reaching out. I'll get back to you shortly!
        </p>
        <button
          onClick={() => setStatus('idle')}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#0c0c0c',
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            opacity: 0.8,
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0.8')}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  // Shared input/textarea style
  const inputStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '2px solid rgba(0,0,0,0.3)',
    color: '#0c0c0c',
    fontSize: '1.1rem',
    fontFamily: 'var(--font-body)',
    padding: '16px 0 12px',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'rgba(0,0,0,0.6)',
    marginBottom: '4px',
    letterSpacing: '0.02em',
  };

  return (
    <form
      ref={formRef}
      style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}
      onSubmit={handleSubmit}
    >
      {/* Name */}
      <div>
        <label htmlFor="contact-name" style={labelStyle}>Your Name</label>
        <input
          type="text"
          id="contact-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ayush Bansal"
          required
          disabled={status === 'loading'}
          style={inputStyle}
          onFocus={e => (e.currentTarget.style.borderBottomColor = '#000')}
          onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(0,0,0,0.3)')}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" style={labelStyle}>Email Address</label>
        <input
          type="email"
          id="contact-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="hello@example.com"
          required
          disabled={status === 'loading'}
          style={inputStyle}
          onFocus={e => (e.currentTarget.style.borderBottomColor = '#000')}
          onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(0,0,0,0.3)')}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" style={labelStyle}>Tell me about your project</label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="I'd love to work on..."
          rows={4}
          required
          disabled={status === 'loading'}
          style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }}
          onFocus={e => (e.currentTarget.style.borderBottomColor = '#000')}
          onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(0,0,0,0.3)')}
        />
      </div>

      {/* Error state */}
      {status === 'error' && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#fff',
            background: '#E53E3E',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 16px',
          }}
        >
          {errorMessage}
        </p>
      )}

      {/* Submit */}
      <div style={{ paddingTop: '8px' }}>
        <Button type="submit" variant="primary" style={{ width: '100%', backgroundColor: '#0c0c0c', borderColor: '#0c0c0c', color: '#fff' }}>
          {status === 'loading' ? 'Sending…' : 'Send Message'}
        </Button>
      </div>
    </form>
  );
}

export default ContactForm;
