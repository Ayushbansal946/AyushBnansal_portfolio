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
                  <div className="flex flex-wrap gap-2 mb-8">
                    {tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[var(--text-main)] text-xs font-body font-bold uppercase tracking-widest"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Project Meta Info */}
                  <div className="grid grid-cols-2 gap-6 mb-8 font-body">
                    <div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Project Type</p>
                      <p style={{ fontSize: '1rem', color: 'var(--text-main)', fontWeight: 500 }}>{type}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Tools Used</p>
                      <p style={{ fontSize: '1rem', color: 'var(--text-main)', fontWeight: 500 }}>{tools}</p>
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Key Details</p>
                    <ul className="flex flex-col gap-4">
                      {details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <span style={{ color: 'var(--accent)', fontSize: '1.2rem', lineHeight: '1rem' }}>•</span>
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--text-light)', lineHeight: 1.6 }}>
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
