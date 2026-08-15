import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { variants } from '../utils/variants.js';

export default function HomePage() {
  const [pdfReady, setPdfReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setPdfReady(true), 1200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
          variants={variants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
      <title>Resume - Luke McMeans</title>
      <div className="glass-panel resume-panel">
        <div className="resume-actions">
          <a className="glass-btn resume-download" href="/LukeMcMeans_Resume.pdf" download>
            Download PDF
          </a>
        </div>
        <div className={`resume-frame${pdfReady ? ' resume-frame--ready' : ''}`}>
          {!pdfReady && <div className="resume-skeleton" aria-hidden="true" />}
          <iframe
            src="/LukeMcMeans_Resume.pdf"
            allowFullScreen
            title="Luke McMeans resume"
            onLoad={() => setPdfReady(true)}
          />
        </div>
      </div>
    </motion.div>
  );
}
