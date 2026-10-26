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
    if (status === 'loading') return;

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    // Input sanitization & validation
    if (!trimmedName || trimmedName.length < 2) {
      setStatus('error');
      setErrorMessage('Please enter your name (at least 2 characters).');
      return;
    }

    if (trimmedName.length > 80) {
      setStatus('error');
      setErrorMessage('Name cannot exceed 80 characters.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmedEmail)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!trimmedMessage || trimmedMessage.length < 5) {
      setStatus('error');
      setErrorMessage('Please enter a message (at least 5 characters).');
      return;
    }

    if (trimmedMessage.length > 3000) {
      setStatus('error');
      setErrorMessage('Message cannot exceed 3000 characters.');
      return;
    }

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
      setErrorMessage('Something went wrong. Please reach out directly via email or WhatsApp.');
    }
  };

  // ── Success state ──
  if (status === 'success') {
    return (
      <div
        className="bg-black/5 backdrop-blur-[12px] border border-black/10 rounded-[20px] py-12 px-8 text-center flex flex-col items-center gap-6"
      >
        {/* Animated checkmark */}
        <div
          className="w-16 h-16 rounded-full bg-[#0c0c0c] text-white flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.15)] animate-bounce"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3
          className="font-heading text-[#0c0c0c] uppercase tracking-[0.05em]"
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}
        >
          Message Sent!
        </h3>
        <p className="font-body text-black/70 max-w-[320px] leading-[1.6]">
          Thank you for reaching out. I'll get back to you shortly!
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="font-body text-[0.7rem] font-bold tracking-[0.15em] uppercase text-[#0c0c0c] underline underline-offset-4 bg-transparent border-none cursor-pointer opacity-80 transition-opacity duration-200 hover:opacity-100"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  // Shared input/textarea style
  const inputClassName = "block w-full bg-transparent border-none border-b-2 border-black/30 text-[#0c0c0c] text-[1.1rem] font-body pt-4 pb-3 outline-none transition-colors duration-200 focus:border-black/100";
  const labelClassName = "block font-body text-[0.85rem] font-semibold text-black/60 mb-1 tracking-[0.02em]";

  return (
    <form
      ref={formRef}
      className="flex flex-col gap-9"
      onSubmit={handleSubmit}
    >
      {/* Name */}
      <div>
        <label htmlFor="contact-name" className={labelClassName}>Your Name</label>
        <input
          type="text"
          id="contact-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ayush Bansal"
          required
          maxLength={80}
          disabled={status === 'loading'}
          className={inputClassName}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className={labelClassName}>Email Address</label>
        <input
          type="email"
          id="contact-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="hello@example.com"
          required
          maxLength={100}
          disabled={status === 'loading'}
          className={inputClassName}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className={labelClassName}>Tell me about your project</label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="I'd love to work on..."
          rows={4}
          required
          maxLength={3000}
          disabled={status === 'loading'}
          className={`${inputClassName} resize-none leading-[1.6]`}
        />
      </div>

      {/* Error state */}
      {status === 'error' && (
        <p
          className="font-body text-xs font-bold tracking-[0.08em] uppercase text-white bg-[#E53E3E] border-none rounded-lg py-2.5 px-4"
        >
          {errorMessage}
        </p>
      )}

      {/* Submit */}
      <div className="pt-2">
        <Button type="submit" variant="primary" style={{ width: '100%', backgroundColor: '#0c0c0c', borderColor: '#0c0c0c', color: '#fff' }}>
          {status === 'loading' ? 'Sending…' : 'Send Message'}
        </Button>
      </div>
    </form>
  );
}

export default ContactForm;
