'use client';

import { useEffect, useState } from 'react';

export default function ResumeFrame() {
  const [pdfReady, setPdfReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setPdfReady(true), 1200);
    return () => clearTimeout(timeout);
  }, []);

  return (
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
  );
}
