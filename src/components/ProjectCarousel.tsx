import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from './Icons';
import React from 'react';

interface ProjectCarouselProps {
  images: string[];
  tags?: string[];
}

export const ProjectCarousel = React.memo(function ProjectCarousel({ images }: ProjectCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const next = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIndex((i) => (i + 1) % images.length);
  };
  
  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((i) => (i - 1 + images.length) % images.length);
  };

  // Auto-scroll every 5 seconds when hovered
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isHovered) {
      interval = setInterval(() => {
        setIndex((i) => (i + 1) % images.length);
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovered, images.length]);

  return (
    <div 
      className="relative group aspect-[4/3] w-full overflow-hidden rounded-2xl bg-surface border border-border shadow-md transition-all duration-500 mb-2 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="flex h-full w-full"
        animate={{ x: `-${index * 100}%` }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {images.map((img, i) => {
          const isVideo = img.toLowerCase().includes('.mp4') || img.toLowerCase().includes('.webm');
          return (
          <div key={i} className="min-w-full h-full relative bg-surface flex items-center justify-center">
            {/* Loading Placeholder Text */}
            <span className="absolute text-text-muted font-heading text-sm uppercase tracking-widest animate-pulse pointer-events-none">
              Loading Asset...
            </span>

            {/* Ambient color-grade mix overlay */}
            <div className="absolute inset-0 bg-[var(--accent)]/5 mix-blend-overlay z-20 pointer-events-none" />
            
            {isVideo ? (
              <video 
                src={img}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-all duration-700 ease-in-out relative z-10"
              />
            ) : (
              <img 
                src={img} 
                className="w-full h-full object-cover transition-all duration-700 ease-in-out relative z-10" 
                alt={`Project screenshot ${i + 1}`} 
                loading="lazy"
              />
            )}
          </div>
        )})}
      </motion.div>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between px-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <button 
          onClick={prev} 
          className="p-3 bg-black/70 backdrop-blur-md text-white rounded-full hover:bg-[var(--accent)] hover:text-white transition-all duration-200 pointer-events-auto shadow-lg cursor-pointer"
          aria-label="Previous screenshot"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={next} 
          className="p-3 bg-black/70 backdrop-blur-md text-white rounded-full hover:bg-[var(--accent)] hover:text-white transition-all duration-200 pointer-events-auto shadow-lg cursor-pointer"
          aria-label="Next screenshot"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      {/* Dynamic Slide Pagination Dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-30 pointer-events-none">
        {images.map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-[var(--accent)]' : 'w-1.5 bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
});

export default ProjectCarousel;
