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
    <div className="border-b border-border py-10">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="group flex flex-col md:flex-row gap-4 md:gap-0 w-full items-center justify-between bg-transparent border-none cursor-pointer text-left"
      >
        <div className="flex items-center gap-8">
          <span className="font-body font-bold text-xs text-text-muted tracking-[0.1em] transition-colors duration-200">
            {number}
          </span>
          <h3
            className="font-heading uppercase text-text-main leading-none tracking-[-0.01em] transition-colors duration-200"
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
            }}
          >
            {role}
          </h3>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex flex-col md:items-end text-left md:text-right">
            <span className="font-body font-bold uppercase text-[0.85rem] text-text-main tracking-[0.05em] mb-1">
              {company}
            </span>
            <span className="font-body text-[0.85rem] text-text-muted">
              {date}
            </span>
          </div>
          
          <div 
            className={`w-[40px] h-[40px] rounded-full border border-border flex items-center justify-center text-text-main transition-all duration-300 ease ${isExpanded ? 'bg-text-main' : 'bg-transparent'}`}
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
            className="overflow-hidden"
          >
            <div 
              className="pt-10 pb-6 max-w-[1100px]"
              style={{ 
                paddingLeft: 'clamp(48px, 8vw, 120px)', // aligns with the title on desktop
                paddingRight: 'clamp(24px, 5vw, 80px)', // right margin
              }}
            >
              
              {/* Tools row */}
              {tools.length > 0 && (
                <div className="mb-8 flex flex-wrap gap-[10px]">
                  <span className="font-body text-xs font-bold text-text-main uppercase tracking-[0.12em] flex items-center mr-3">
                    Tools used during the work:
                  </span>
                  {tools.map((tool, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 rounded-[20px] border border-white/10 text-xs font-body text-text-light bg-white/5 transition-all duration-200 cursor-default hover:bg-text-main hover:text-bg hover:border-text-main"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              )}

              {/* Bullet points */}
              {bullets.length > 0 && (
                <ul className="flex flex-col gap-3 list-none">
                  {bullets.map((bullet, i) => (
                    <li 
                      key={i}
                      className="font-body text-base leading-[1.6] text-text-light flex items-start gap-3"
                    >
                      <span className="text-accent mt-[6px] text-[0.5rem]">●</span>
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
