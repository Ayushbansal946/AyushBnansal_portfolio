import { motion } from 'framer-motion';
import ExperienceItem from '../components/ExperienceItem';
import { useSectionData } from '../hooks/useSectionData';
import { fallbackExperiences } from '../data/fallbackData';

export default function ExperienceSection() {
  const experiences = useSectionData('experiences', fallbackExperiences);

  return (
    <section
      id="experience"
      className="relative pt-[120px] pb-[120px] bg-bg"
    >
      <div className="w-full px-[5vw]">
        
        {/* ── Label ── */}
        <div className="mb-6">
          <p
            className="font-body font-bold uppercase text-[11px] tracking-[0.3em] text-text-muted"
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
            className="font-heading uppercase text-text-main leading-none tracking-[-0.01em] mb-12"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
            }}
          >
            EXPERIENCE
          </motion.h2>

          <div className="border-t border-border">
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
          <path d="M0,120 L600,60 L1200,120 Z" className="fill-surface" />
        </svg>
      </div>
    </section>
  );
}
