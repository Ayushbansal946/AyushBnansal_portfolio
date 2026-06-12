/**
 * SkillsSection.tsx — Prioritized skills display
 * 
 * Shows skills grouped by priority:
 * 1. AI (Generative AI)
 * 2. UI/UX Design
 * 3. Web Development
 * 4. Other Skills
 * 
 * Uses a clean, editorial layout with tags/pills for individual skills.
 */

import { motion } from 'framer-motion';
import { useSectionData } from '../hooks/useSectionData';
import { fallbackSkills } from '../data/fallbackData';

export default function SkillsSection() {
  const skillCategories = useSectionData('skills', fallbackSkills);

  return (
    <section
      id="skills"
      className="relative"
      style={{
        backgroundColor: 'var(--surface)',
        paddingTop: '120px',
        paddingBottom: '120px',
      }}
    >
      <div style={{ padding: '0 5vw' }}>
        
        {/* Section Header */}
        <div style={{ marginBottom: '80px' }}>
          <p
            className="font-body font-bold uppercase"
            style={{ fontSize: '11px', letterSpacing: '0.3em', color: 'var(--text-muted)', marginBottom: '8px' }}
          >
            [EXPERTISE]
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="font-heading uppercase"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              color: 'var(--text-main)',
              lineHeight: 1,
              letterSpacing: '-0.01em',
              marginBottom: '64px',
            }}
          >
            SKILLS & TOOLS
          </motion.h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 
                className="font-body font-bold"
                style={{
                  fontSize: '1.25rem',
                  color: 'var(--text-main)',
                  marginBottom: '24px',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid var(--border)',
                  paddingBottom: '12px'
                }}
              >
                {category.title}
              </h3>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {category.skills.map((skill, i) => (
                  <span 
                    key={i}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '30px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 500,
                      color: index === 0 ? 'var(--accent)' : 'var(--text-light)', // Highlight AI skills in accent color
                      backgroundColor: 'rgba(255,255,255,0.02)',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--text-main)';
                      e.currentTarget.style.color = 'var(--bg)';
                      e.currentTarget.style.borderColor = 'var(--text-main)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)';
                      e.currentTarget.style.color = index === 0 ? 'var(--accent)' : 'var(--text-light)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
      
      {/* ── Shape Divider: Fluid Wave ── */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-0 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[80px]">
          <path d="M0,60 C150,0 350,0 600,60 C850,120 1050,120 1200,60 L1200,120 L0,120 Z" fill="var(--bg)" />
        </svg>
      </div>
    </section>
  );
}
