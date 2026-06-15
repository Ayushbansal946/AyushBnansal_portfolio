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
      className="relative bg-surface pt-[120px] pb-[120px]"
    >
      <div className="px-[5vw]">
        
        {/* Section Header */}
        <div className="mb-[80px]">
          <p
            className="font-body font-bold uppercase text-[11px] tracking-[0.3em] text-text-muted mb-2"
          >
            [EXPERTISE]
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="font-heading uppercase text-text-main leading-none tracking-[-0.01em] mb-[64px]"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
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
                className="font-body font-bold text-xl text-text-main mb-6 tracking-[0.05em] uppercase border-b border-border pb-3"
              >
                {category.title}
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, i) => (
                  <span 
                    key={i}
                    className={`px-4 py-2 rounded-[30px] border border-white/10 text-[0.85rem] font-body font-medium transition-all duration-200 bg-white/5 hover:bg-text-main hover:text-bg hover:border-text-main ${index === 0 ? 'text-accent' : 'text-text-light'}`}
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
          <path d="M0,60 C150,0 350,0 600,60 C850,120 1050,120 1200,60 L1200,120 L0,120 Z" className="fill-bg" />
        </svg>
      </div>
    </section>
  );
}
