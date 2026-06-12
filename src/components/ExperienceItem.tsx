/**
 * ExperienceItem.tsx — Expandable timeline row
 * 
 * Clickable row that expands to reveal tools used and resume bullet points.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus } from './Icons';

interface ExperienceItemProps {
  number: string;
  role: string;
  company: string;
  date: string;
  tools?: string[];
  bullets?: string[];
}

export default function ExperienceItem({ number, role, company, date, tools = [], bullets = [] }: ExperienceItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      style={{
        borderBottom: '1px solid var(--border)',
        padding: '40px 0',
      }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
        className="group flex-col md:flex-row gap-4 md:gap-0"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <span
            className="font-body font-bold"
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.1em',
              transition: 'color 0.2s',
            }}
          >
            {number}
          </span>
          <h3
            className="font-heading uppercase"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
              color: 'var(--text-main)',
              lineHeight: 1,
              letterSpacing: '-0.01em',
              transition: 'color 0.2s',
            }}
          >
            {role}
          </h3>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
        >
          <div className="flex flex-col md:items-end text-left md:text-right">
            <span
              className="font-body font-bold uppercase"
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-main)',
                letterSpacing: '0.05em',
                marginBottom: '4px',
              }}
            >
              {company}
            </span>
            <span
              className="font-body"
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
              }}
            >
              {date}
            </span>
          </div>
          
          <div 
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-main)',
              transition: 'all 0.3s ease',
              backgroundColor: isExpanded ? 'var(--text-main)' : 'transparent',
            }}
          >
            {isExpanded ? <Minus size={18} color="var(--bg)" /> : <Plus size={18} />}
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div 
              style={{ 
                paddingTop: '40px', 
                paddingBottom: '24px', 
                paddingLeft: 'clamp(48px, 8vw, 120px)', // aligns with the title on desktop
                paddingRight: 'clamp(24px, 5vw, 80px)', // right margin
                maxWidth: '1100px' 
              }}
            >
              
              {/* Tools row */}
              {tools.length > 0 && (
                <div style={{ marginBottom: '32px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  <span style={{ 
                    fontFamily: 'var(--font-body)', 
                    fontSize: '0.75rem', 
                    fontWeight: 700, 
                    color: 'var(--text-main)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    display: 'flex',
                    alignItems: 'center',
                    marginRight: '12px'
                  }}>
                    Tools used during the work:
                  </span>
                  {tools.map((tool, i) => (
                    <span 
                      key={i}
                      style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-body)',
                        color: 'var(--text-light)',
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        transition: 'all 0.2s ease',
                        cursor: 'default'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--text-main)';
                        e.currentTarget.style.color = 'var(--bg)';
                        e.currentTarget.style.borderColor = 'var(--text-main)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                        e.currentTarget.style.color = 'var(--text-light)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              )}

              {/* Bullet points */}
              {bullets.length > 0 && (
                <ul style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '12px',
                  listStyle: 'none'
                }}>
                  {bullets.map((bullet, i) => (
                    <li 
                      key={i}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                        color: 'var(--text-light)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px'
                      }}
                    >
                      <span style={{ color: 'var(--accent)', marginTop: '6px', fontSize: '0.5rem' }}>●</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
