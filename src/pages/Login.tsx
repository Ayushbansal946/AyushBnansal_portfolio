import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink
} from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}

export default function Login() {
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  // Hardcoded as requested
  const [phone, setPhone] = useState('+917500039393');
  const [email, setEmail] = useState('ayushbansal946@gmail.com');
  
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'request' | 'verify' | 'emailSent'>('request');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  // Handle Email Link Sign In on Mount
  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let emailForSignIn = window.localStorage.getItem('emailForSignIn');
      if (!emailForSignIn) {
        emailForSignIn = window.prompt('Please provide your email for confirmation');
      }
      if (emailForSignIn) {
        setLoading(true);
        signInWithEmailLink(auth, emailForSignIn, window.location.href)
          .then(() => {
            window.localStorage.removeItem('emailForSignIn');
            navigate('/admin');
          })
          .catch((err) => {
            setError(err.message);
            setLoading(false);
          });
      }
    }
  }, [navigate]);

  // Prevent Inspect Element and DevTools
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent F12
      if (e.key === 'F12') {
        e.preventDefault();
      }
      // Prevent Ctrl+Shift+I / Cmd+Option+I (Inspect)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
        e.preventDefault();
      }
      // Prevent Ctrl+Shift+C / Cmd+Option+C (Inspect Element)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
      }
      // Prevent Ctrl+Shift+J / Cmd+Option+J (Console)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
      }
      // Prevent Ctrl+U / Cmd+U (View Source)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return setError('Please enter a valid phone number');
    setError('');
    setLoading(true);
    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
      window.confirmationResult = confirmationResult;
      setStep('verify');
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    }
    setLoading(false);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return setError('Please enter the OTP');
    setError('');
    setLoading(true);
    try {
      await window.confirmationResult.confirm(otp);
      navigate('/admin');
    } catch (err: any) {
      setError('Invalid OTP');
    }
    setLoading(false);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return setError('Please enter a valid email');
    setError('');
    setLoading(true);
    try {
      const actionCodeSettings = {
        url: window.location.origin + '/admin/login',
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      setStep('emailSent');
    } catch (err: any) {
      setError(err.message || 'Failed to send email link');
    }
    setLoading(false);
  };

  const inputStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '2px solid rgba(255,255,255,0.2)',
    color: 'var(--text-main)',
    fontSize: '1.2rem',
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
    color: 'rgba(255,255,255,0.6)',
    marginBottom: '4px',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  };

  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        backgroundColor: 'var(--bg)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '2rem'
      }}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '100%',
          maxWidth: '480px',
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '24px',
          padding: '48px',
          boxShadow: 'var(--card-shadow)'
        }}
      >
        <h1 
          className="font-heading" 
          style={{ 
            fontSize: '3rem', 
            textAlign: 'center', 
            marginBottom: '8px', 
            color: 'var(--text-main)' 
          }}
        >
          SECURE PORTAL
        </h1>
        <p 
          style={{ 
            textAlign: 'center', 
            color: 'var(--text-muted)', 
            marginBottom: '40px',
            fontFamily: 'var(--font-body)'
          }}
        >
          Authorized admin access only
        </p>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            style={{
              marginBottom: '24px',
              padding: '16px',
              backgroundColor: 'rgba(255,0,0,0.1)',
              border: '1px solid rgba(255,0,0,0.2)',
              borderRadius: '8px',
              color: '#FF6B6B',
              fontSize: '0.9rem',
              fontFamily: 'var(--font-body)'
            }}
          >
            {error}
          </motion.div>
        )}

        {step === 'request' && (
          <>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '40px' }}>
              <button
                onClick={() => { setMethod('phone'); setError(''); }}
                style={{
                  flex: 1,
                  padding: '12px 0',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: `1px solid ${method === 'phone' ? 'var(--white)' : 'var(--border)'}`,
                  borderRadius: '8px',
                  backgroundColor: method === 'phone' ? 'var(--white)' : 'transparent',
                  color: method === 'phone' ? 'var(--bg)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Phone
              </button>
              <button
                onClick={() => { setMethod('email'); setError(''); }}
                style={{
                  flex: 1,
                  padding: '12px 0',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: `1px solid ${method === 'email' ? 'var(--white)' : 'var(--border)'}`,
                  borderRadius: '8px',
                  backgroundColor: method === 'email' ? 'var(--white)' : 'transparent',
                  color: method === 'email' ? 'var(--bg)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Email
              </button>
            </div>

            {method === 'phone' ? (
              <form onSubmit={handlePhoneSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div>
                  <label htmlFor="phone" style={labelStyle}>Admin Phone</label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    readOnly
                    style={{ ...inputStyle, color: 'var(--text-muted)', cursor: 'not-allowed' }}
                  />
                </div>
                <div id="recaptcha-container"></div>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '16px',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.2rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    backgroundColor: 'var(--white)',
                    color: 'var(--bg)',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                    transition: 'opacity 0.2s'
                  }}
                >
                  {loading ? 'SENDING...' : 'SEND OTP'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div>
                  <label htmlFor="email" style={labelStyle}>Admin Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    readOnly
                    style={{ ...inputStyle, color: 'var(--text-muted)', cursor: 'not-allowed' }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '16px',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.2rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    backgroundColor: 'var(--white)',
                    color: 'var(--bg)',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                    transition: 'opacity 0.2s'
                  }}
                >
                  {loading ? 'SENDING...' : 'SEND MAGIC LINK'}
                </button>
              </form>
            )}
          </>
        )}

        {step === 'verify' && (
          <form onSubmit={handleOtpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <label htmlFor="otp" style={labelStyle}>ENTER OTP</label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                style={{
                  ...inputStyle,
                  textAlign: 'center',
                  letterSpacing: '0.5em',
                  fontSize: '2rem',
                }}
                onFocus={e => e.currentTarget.style.borderBottomColor = 'var(--white)'}
                onBlur={e => e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.2)'}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '16px',
                fontFamily: 'var(--font-heading)',
                fontSize: '1.2rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                backgroundColor: 'var(--white)',
                color: 'var(--bg)',
                border: 'none',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                transition: 'opacity 0.2s'
              }}
            >
              {loading ? 'VERIFYING...' : 'VERIFY OTP'}
            </button>
            <button
              type="button"
              onClick={() => setStep('request')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-body)',
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
            >
              Back
            </button>
          </form>
        )}

        {step === 'emailSent' && (
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--white)" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-main)', lineHeight: 1.6 }}>
              A secure sign-in link has been sent to<br/>
              <strong style={{ color: 'var(--white)' }}>{email}</strong>
            </p>
            <button
              onClick={() => setStep('request')}
              style={{
                marginTop: '16px',
                padding: '16px',
                fontFamily: 'var(--font-heading)',
                fontSize: '1rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                backgroundColor: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--text-main)',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Back
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
