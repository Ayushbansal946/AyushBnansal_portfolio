import { motion } from 'framer-motion';
import React from 'react';
import { ExternalLink } from './Icons';

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
      className="group relative overflow-hidden flex flex-col justify-between p-8 bg-surface border border-border rounded-[20px] transition-all duration-300 ease-out cursor-pointer min-h-[260px]"
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
          className={`w-12 h-12 rounded-xl bg-bg border border-border flex items-center justify-center mb-6 transition-all duration-300 overflow-hidden group-hover:border-[var(--accent)] group-hover:shadow-[0_0_20px_rgba(0,85,255,0.3)] ${issuer.includes('IBM') ? 'p-[2px]' : 'p-2'}`}
        >
          <img 
            src={logoUrl} 
            alt={`${issuer} logo`} 
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>

        {/* Certificate Title */}
        <h3
          className="font-body font-bold text-text-main leading-[1.4] mb-2 transition-colors duration-300 tracking-[-0.01em] group-hover:text-[var(--accent)]"
          style={{
            fontSize: 'clamp(1.1rem, 1.5vw, 1.25rem)',
          }}
        >
          {title}
        </h3>

        {/* Issuer */}
        <p
          className="font-body font-medium text-[0.9rem] text-text-muted"
        >
          {issuer}
        </p>
      </div>

      {/* View Credential Hint */}
      <div className="mt-8 flex items-center gap-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <span className="text-accent text-[0.85rem] font-semibold uppercase tracking-[0.05em]">
          View Credential
        </span>
        <ExternalLink size={14} color="var(--accent)" />
      </div>

    </motion.div>
  );
});

export default CertificateCard;
