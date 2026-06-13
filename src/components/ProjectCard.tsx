import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from './Icons';
import ProjectCarousel from './ProjectCarousel';

interface ProjectCardProps {
  num: string;
  title: string;
  subtitle?: string;
  description: string;
  images: string[];
  tags: string[];
  type: string;
  tools: string;
  details: string[];
}

export const ProjectCard = React.memo(function ProjectCard({
  num,
  title,
  subtitle,
  description,
  images,
  tags,
  type,
  tools,
  details
}: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="flex flex-col h-full cursor-pointer group"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <ProjectCarousel images={images} tags={tags} />

      <div className="flex items-start justify-between gap-4" style={{ marginTop: '20px' }}>
        <div className="flex-1 w-full">
          
          <div className="flex items-baseline justify-between w-full" style={{ marginBottom: '16px' }}>
            <div className="flex items-baseline gap-4">
              <span
                className="font-heading font-bold select-none"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  color: 'var(--accent)',
                  lineHeight: 1,
                }}
              >
                {num}.
              </span>
              <div>
                <h3 
                  className="font-heading uppercase"
                  style={{
                    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                    lineHeight: 0.95,
                    color: 'var(--text-main)',
                  }}
                >
                  {title}
                </h3>
                {subtitle && (
                  <p
                    className="font-body"
                    style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}
                  >
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
            
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors"
            >
              <ChevronDown size={28} />
            </motion.div>
          </div>

          <p
            className="font-body leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 1.2vw, 1.15rem)', color: 'var(--text-light)' }}
          >
            {description}
          </p>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: 'auto', opacity: 1, marginTop: 24 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="overflow-hidden"
              >
                <div className="pt-6 border-t border-[var(--border)]">
                  
                  {/* Tags */}
                  <div className="flex flex-wrap" style={{ gap: '0.75rem', marginBottom: '2.5rem' }}>
                    {tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="rounded-full border border-white/10 bg-white/5 font-body font-semibold uppercase"
                        style={{ padding: '0.5rem 1rem', color: 'var(--text-light)', fontSize: '0.75rem', letterSpacing: '0.15em' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Project Meta Info */}
                  <div className="grid grid-cols-2 font-body rounded-2xl bg-white/[0.02] border border-white/5" style={{ gap: '2rem', marginBottom: '2.5rem', padding: '1.5rem' }}>
                    <div>
                      <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>Project Type</p>
                      <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: 500 }}>{type}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>Tools Used</p>
                      <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: 500 }}>{tools}</p>
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <div style={{ paddingLeft: '0.5rem' }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-main)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px' }}>Key Details</p>
                    <ul className="flex flex-col" style={{ gap: '1.5rem' }}>
                      {details.map((detail, i) => (
                        <li key={i} className="flex items-start" style={{ gap: '1.25rem' }}>
                          <span style={{ color: 'var(--accent)', fontSize: '1.5rem', lineHeight: '1.2rem' }}>•</span>
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'var(--text-light)', lineHeight: 1.8 }}>
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
});

export default ProjectCard;
