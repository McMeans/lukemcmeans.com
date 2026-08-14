import { motion } from 'framer-motion';
import { variants } from '../utils/variants.js';

export default function HomePage() {
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
        <iframe src="/LukeMcMeans_Resume.pdf" allowFullScreen/>
      </div>
    </motion.div>
  );
}