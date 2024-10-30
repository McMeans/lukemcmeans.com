import Image from "next/image";
import { motion } from 'framer-motion';
import { variants } from '../utils/variants.js';

export default function HomePage({theme}) {
  return (
    <motion.div
          variants={variants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
      <title>Luke McMeans - Home</title>
      <div className="home-details">
        <div className="home-detail">
          <Image
            className="detail-image"
            src={`/images/${theme}-mode/coding-${theme}.png`}
            width={30}
            height={30}
          />
          <text className="detail-label">Aspiring <strong>Software Engineer</strong></text>
        </div>
        <div className="home-detail">
          <Image
            className="detail-image"
            src={`/images/${theme}-mode/uva-${theme}.png`}
            width={30}
            height={30}
          />
          <text className="detail-label"><strong>Computer Science and Data Science</strong> student at the <strong>University of Virginia</strong></text>
        </div>
      </div>
      <text className="summary">
        Enthusiastic computer science student with a strong foundation in software development, data structures,
        LLM/AI prompt-engineering, and mathematics. Committed to providing detail-driven work while staying efficient 
        and accurate. Proven history of organization, teamwork, and management both in and outside the classroom. 
        Aspires to utilize abilities while further developing skills, learning new technologies, and gaining real-world 
        experience, contributing to the success of a dynamic software development team.
      </text>
        <div className="socials">
          <a href="mailto:elukemcmeans@gmail.com" target="_blank" rel="noopener noreferrer">
            <Image 
              className="social-index"
              src='/images/socials/mail.png'
              width={30}
              height={30}
            />
          </a>
          <a href="https://www.linkedin.com/in/luke-mcmeans/" target="_blank" rel="noopener noreferrer">
            <Image 
              className="social-index"
              src='/images/socials/linkedin.png'
              width={30}
              height={30}
            />
          </a>
          <a href="https://github.com/McMeans" target="_blank" rel="noopener noreferrer">
            <Image 
              className="social-index"
              src='/images/socials/github.png'
              width={30}
              height={30}
            />
          </a>
        </div>
    </motion.div>
  );
}