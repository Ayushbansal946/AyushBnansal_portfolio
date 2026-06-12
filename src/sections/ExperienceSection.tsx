import { motion } from 'framer-motion';
import ExperienceItem from '../components/ExperienceItem';
import { useSectionData } from '../hooks/useSectionData';
import { fallbackExperiences } from '../data/fallbackData';

export default function ExperienceSection() {
  const experiences = useSectionData('experiences', fallbackExperiences);

  return (
    <section
      id="experience"
      className="relative"
      style={{ paddingTop: '120px', paddingBottom: '120px', backgroundColor: 'var(--bg)' }}
    >
      <div className="w-full" style={{ padding: '0 5vw' }}>
        
        {/* ── Label ── */}
        <div style={{ marginBottom: '24px' }}>
          <p
            className="font-body font-bold uppercase"
            style={{ fontSize: '11px', letterSpacing: '0.3em', color: 'var(--text-muted)' }}
          >
            [CAREER]
          </p>
        </div>

        {/* ── Experience Table ── */}
        <div className="w-full">
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
              marginBottom: '48px',
            }}
          >
            EXPERIENCE
          </motion.h2>

          <div style={{ borderTop: '1px solid var(--border)' }}>
            {experiences.map((exp) => (
              <ExperienceItem
                key={exp.num}
                number={exp.num}
                role={exp.role}
                company={exp.company}
                date={exp.date}
                tools={exp.tools}
                bullets={exp.bullets}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* ── Shape Divider: Minimal Inverted V ── */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-0 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-[30px] md:h-[60px]">
          <path d="M0,120 L600,60 L1200,120 Z" fill="var(--surface)" />
        </svg>
      </div>
    </section>
  );
}
