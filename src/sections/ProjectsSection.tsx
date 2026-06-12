import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { useSectionData } from '../hooks/useSectionData';
import { fallbackProjects } from '../data/fallbackData';

export default function ProjectsSection() {
  const projects = useSectionData('projects', fallbackProjects);

  return (
    <section
      id="portfolio"
      className="relative"
      style={{ paddingTop: '120px', paddingBottom: '120px', backgroundColor: 'var(--surface)' }}
    >
      <div
        className="flex justify-between items-start"
        style={{ padding: '0 10vw', marginBottom: '80px' }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="font-heading uppercase"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            color: 'var(--text-main)',
            lineHeight: 1,
            letterSpacing: '-0.01em',
            marginBottom: '16px',
          }}
        >
          PORTFOLIO
        </motion.h2>
        <span
          className="font-body font-bold"
          style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}
        >
          (04)
        </span>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ padding: '0 10vw', gap: '80px' }}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            num={project.num}
            title={project.title}
            subtitle={project.subtitle}
            description={project.description}
            images={project.images}
            tags={project.tags}
            type={project.type}
            tools={project.tools}
            details={project.details}
          />
        ))}
      </div>

      {/* ── Shape Divider: Stepped Edge ── */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-0 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-[30px] md:h-[60px]">
          <path d="M0,120 L1200,120 L1200,80 L800,80 L800,40 L400,40 L400,80 L0,80 Z" fill="var(--bg)" />
        </svg>
      </div>
    </section>
  );
}
