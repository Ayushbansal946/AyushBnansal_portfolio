import { motion } from 'framer-motion';
import React from 'react';
import { ExternalLink } from 'lucide-react';

interface CertificateCardProps {
  title: string;
  issuer: string;
  logoUrl: string;
  index: number;
  onClick: () => void;
}

export const CertificateCard = React.memo(function CertificateCard({ 
  title, 
  issuer, 
  logoUrl,
  index,
  onClick
}: CertificateCardProps) {
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={onClick}
      className="group relative overflow-hidden flex flex-col justify-between"
      style={{
        padding: '32px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        transition: 'all 0.3s ease-out',
        cursor: 'pointer',
        minHeight: '260px'
      }}
      whileHover={{
        y: -6,
        borderColor: 'var(--accent)',
        boxShadow: '0 20px 40px -10px rgba(0, 85, 255, 0.15)',
      }}
    >
      {/* Decorative Background Mesh (Subtle) */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[var(--accent)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        {/* Certificate Logo Block */}
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
            transition: 'all 0.3s',
            overflow: 'hidden',
            padding: issuer.includes('IBM') ? '2px' : '8px',
          }}
          className="group-hover:border-[var(--accent)] group-hover:shadow-[0_0_20px_rgba(0,85,255,0.3)]"
        >
          <img 
            src={logoUrl} 
            alt={`${issuer} logo`} 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            loading="lazy"
          />
        </div>

        {/* Certificate Title */}
        <h3
          className="font-body font-bold group-hover:text-[var(--accent)]"
          style={{
            fontSize: 'clamp(1.1rem, 1.5vw, 1.25rem)',
            lineHeight: 1.4,
            color: 'var(--text-main)',
            marginBottom: '8px',
            transition: 'color 0.3s',
            letterSpacing: '-0.01em'
          }}
        >
          {title}
        </h3>

        {/* Issuer */}
        <p
          className="font-body font-medium"
          style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}
        >
          {issuer}
        </p>
      </div>

      {/* View Credential Hint */}
      <div className="mt-8 flex items-center gap-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <span style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          View Credential
        </span>
        <ExternalLink size={14} color="var(--accent)" />
      </div>

    </motion.div>
  );
});

export default CertificateCard;
