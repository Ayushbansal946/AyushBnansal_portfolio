import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg text-text-main flex flex-col items-center justify-center relative overflow-hidden selection:bg-accent selection:text-white p-6">
      {/* Background Noise & Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.04] mix-blend-overlay bg-noise" />
      
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-[var(--accent)]/10 blur-[100px] rounded-full pointer-events-none z-0" />

      <motion.div 
        className="relative z-10 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.h1 
          className="font-heading text-[8rem] md:text-[12rem] leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 select-none"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, type: "spring", bounce: 0.5 }}
        >
          404
        </motion.h1>
        
        <h2 className="font-heading text-2xl md:text-4xl mt-4 mb-6 uppercase tracking-wide">
          Page Not Found
        </h2>
        
        <p className="font-body text-text-muted max-w-md mx-auto mb-10 text-lg">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <Link 
          to="/"
          className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-white font-heading uppercase tracking-wider rounded-full hover:bg-white hover:text-accent transition-all duration-300"
        >
          Return Home
        </Link>
      </motion.div>
    </div>
  );
}
