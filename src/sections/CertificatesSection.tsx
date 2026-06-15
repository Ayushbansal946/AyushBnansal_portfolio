import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from '../components/Icons';
import CertificateCard from '../components/CertificateCard';
import { useSectionData } from '../hooks/useSectionData';
import { fallbackCertificates } from '../data/fallbackData';

export default function CertificatesSection() {
  const certs = useSectionData('certificates', fallbackCertificates);
  const [selectedCert, setSelectedCert] = useState<typeof fallbackCertificates[0] | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedCert]);

  return (
    <section
      id="certifications"
      className="relative bg-surface pt-[120px] pb-[120px]"
    >
      <div className="px-[5vw]">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-[64px]"
        >
          <h2
            className="font-heading uppercase text-text-main leading-none tracking-[-0.01em] mb-4"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
            }}
          >
            CERTIFICATIONS
          </h2>
          <p
            className="font-body text-[1.05rem] text-text-muted"
          >
            Professional development &amp; continuous learning
          </p>
        </motion.div>

        {/* ── Certificate Grid ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[32px]"
        >
          {certs.map((cert, index) => (
            <CertificateCard
              key={index}
              index={index}
              title={cert.title}
              issuer={cert.issuer}
              logoUrl={cert.logoUrl}
              onClick={() => setSelectedCert(cert)}
            />
          ))}
        </div>
      </div>

      {/* ── Lightbox Modal ── */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl h-[85vh]"
              onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
            >
              
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/5 bg-black/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-white p-1">
                    <img src={selectedCert.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="font-body font-bold text-white text-lg">{selectedCert.title}</h3>
                    <p className="font-body text-sm text-[var(--text-muted)]">{selectedCert.issuer}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="w-full h-[calc(100%-76px)] bg-black/50 p-4 md:p-8 flex items-center justify-center">
                {selectedCert.type === 'pdf' ? (
                  <iframe 
                    src={`${selectedCert.fileUrl}#view=FitH`} 
                    title={selectedCert.title}
                    className="w-full h-full rounded-lg shadow-lg bg-white"
                  />
                ) : (
                  <img 
                    src={selectedCert.fileUrl} 
                    alt={selectedCert.title} 
                    className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                  />
                )}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Shape Divider: Slant ── */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-0 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[80px]">
          <path d="M1200 120L0 120 0 0 1200 120z" className="fill-bg" />
        </svg>
      </div>
    </section>
  );
}
