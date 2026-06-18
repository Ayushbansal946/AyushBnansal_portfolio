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
      <ProjectCarousel images={images} tags={tags} projectName={title} />

      <div className="flex items-start justify-between gap-4 mt-5">
        <div className="flex-1 w-full">
          
          <div className="flex items-baseline justify-between w-full mb-4">
            <div className="flex items-baseline gap-4">
              <span
                className="font-heading font-bold select-none text-accent leading-none text-fluid-proj-num"
              >
                {num}.
              </span>
              <div>
                <h3 
                  className="font-heading uppercase leading-[0.95] text-text-main text-fluid-proj-title"
                >
                  {title}
                </h3>
                {subtitle && (
                  <p
                    className="font-body text-[0.85rem] text-text-muted mt-1"
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
            className="font-body leading-relaxed text-text-light text-fluid-proj-desc"
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
                <div className="pt-8 mt-2 border-t border-border">
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-3 mb-10 mt-2">
                    {tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 font-body font-semibold uppercase text-text-light text-xs tracking-[0.15em]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Project Meta Info */}
                  <div className="grid grid-cols-2 gap-8 mb-10 p-6 font-body rounded-2xl bg-white/2 border border-white/5">
                    <div>
                      <p className="text-[0.7rem] text-text-muted uppercase tracking-[0.15em] mb-2">Project Type</p>
                      <p className="text-[1.05rem] text-text-main font-medium">{type}</p>
                    </div>
                    <div>
                      <p className="text-[0.7rem] text-text-muted uppercase tracking-[0.15em] mb-2">Tools Used</p>
                      <p className="text-[1.05rem] text-text-main font-medium">{tools}</p>
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <div className="pl-2">
                    <p className="text-xs text-text-main font-semibold uppercase tracking-[0.1em] mb-5">Key Details</p>
                    <ul className="flex flex-col gap-6">
                      {details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-5">
                          <span className="text-accent text-2xl leading-[1.2rem]">•</span>
                          <span className="font-body text-[1.05rem] text-text-light leading-[1.8]">
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
