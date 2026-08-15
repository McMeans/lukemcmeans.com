import Image from "next/image";
import Link from "next/link";
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
      <title>Home - Luke McMeans</title>
      <div className="glass-panel home-tagline-panel">
        <p className="home-tagline">Ambitious about building. Careful about doing it well.</p>
      </div>
      <div className="glass-panel hero-panel">
      <div className="home-details">
        <div className="home-detail">
          <Image
            className="detail-image"
            src='/images/timmons-icon.png'
            width={30}
            height={30}
            alt=""
            priority
          />
          {/* <text className="detail-label">Aspiring <strong>Software Engineer</strong></text> */}
          <text className="detail-label"><strong>Software Engineer</strong> at <strong>Timmons Group</strong></text>
        </div>
        <div className="home-detail">
          <picture>
            <source srcSet="/images/dark-mode/uva-dark.png" media="(prefers-color-scheme: dark)" />
            <img
              className="detail-image"
              src="/images/light-mode/uva-light.png"
              width={30}
              height={30}
              alt=""
              decoding="async"
              fetchPriority="high"
            />
          </picture>
          <text className="detail-label"><strong>Computer Science and Data Science</strong> graduate at the <strong>University of Virginia</strong></text>
        </div>
      </div>
      <text className="summary">
        Strong foundation in software development, user experience, and practical AI-assisted work. Committed to providing 
        detail-driven work while staying efficient and accurate. Proven history of leading development across projects. 
        Creative and ambitious when inspiration hits, and always looking for a better way to build.
      </text>
      <div className="home-actions">
        <Link href="/resume" className="glass-btn home-resume">
          Resume
        </Link>
        <div className="socials">
          <a href="mailto:elukemcmeans@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email">
            <Image 
              className="social-index"
              src='/images/socials/mail.png'
              width={30}
              height={30}
              alt=""
              priority
            />
          </a>
          <a href="https://www.linkedin.com/in/luke-mcmeans/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Image 
              className="social-index"
              src='/images/socials/linkedin.png'
              width={30}
              height={30}
              alt=""
              priority
            />
          </a>
          <a href="https://github.com/McMeans" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Image 
              className="social-index"
              src='/images/socials/github.png'
              width={30}
              height={30}
              alt=""
              priority
            />
          </a>
        </div>
      </div>
      </div>
    </motion.div>
  );
}
