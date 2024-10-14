import Image from "next/image";
import { motion } from 'framer-motion';
import { variants } from '../utils/varients.js';

export default function HomePage() {
  return (
    <motion.div
          className="content"
          variants={variants}
          initial="initial"
          animate="enter"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
      <title>Luke McMeans - Projects</title>
      <div className="activity-tab carahsoft">
        <Image
            className="company-image"
            src='/images/project-experience/carahsoft.png'
            width={25*(826/171)}
            height={25}
        />
        <text className="activity-title">
            Software Development Intern
        </text>
        <span>06/2024 - 08/2024</span>
        <ul className="tasks">
            <li>Developed REST API database functions to view, create, and manage care packages for 5000+ vendors</li>
            <li>Expanded an ASP.NET web app for users to interact with the care package configurations intuitively</li>
            <li>Created an xUnit project with over 30 tests to reinforce an automated care package delivery service</li>
            <li>Converted 100+ API client functions to asynchronous for enhanced response time and scalability</li>
            <li>Collaborated with teams of 4-8 to provide refactoring and debugging support, ensuring efficient code</li>
        </ul>
      </div>
      <div className="activity-tab tln">
        <Image
            className="company-image"
            src='/images/project-experience/tln.png'
            width={25*(1079/527)}
            height={25}
        />
        <text className="activity-title">
            Vice President of Video Editing
        </text>
        <span>02/2021 - 09/2021</span>
        <ul className="tasks">
            <li>Boosted efficiency by over 50% using video editing software expertise to produce high-quality content</li>
            <li>Supervised the work of 4 incoming trainees, providing guidance to maintain production value</li>
            <li>Trusted with publishing over 20 finalized videos across the brand’s social media and podcast platforms</li>
        </ul>
      </div>
    </motion.div>
  );
}