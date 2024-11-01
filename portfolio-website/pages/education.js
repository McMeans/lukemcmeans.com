import Image from "next/image";
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
      <title>Luke McMeans - Experience</title>
      <div className="activity-tab uva">
        <Image
            className="company-image"
            src='/images/project-experience/uva.png'
            width={30*(1587/384)}
            height={30}
        />
        <text className="activity-title">
            B.A. Computer Science
        </text>
        <text className="minor">Data Science Minor</text>
        <span>08/2022 - 05/2026</span>
        <ul className="tasks">
            <li>3.56 GPA</li>
            <li>Dean's List Spring 2023</li>
            <li>Developer and Graphic Designer for the Super Smash Brothers Club</li>
            <li>Member of the Association for Computing Machinery</li>
            <li>Relevant Coursework:
              <ul>
                <li>CS 3240 - Software Engineering</li>
                <li>CS 3140 - Software Development Essentials</li>
                <li>CS 3100 - Data Structures and Algorithms 2</li>
                <li>CS 3130 - Computer Systems and Organization 2</li>
                <li>CS 2120 - Discrete Mathematics and Theory 1</li>
                <li>MATH 3351 - Elementary Linear Algebra</li>
                <li>MATH 2310 - Multivariable Calculus</li>
              </ul>
            </li>
            <li>Anticipated Coursework:
              <ul>
                <li>CS 4170 - Artificial Intelligence</li>
                <li>CS 3120 - Discrete Mathematics and Theory 2</li>
                <li>DS 3001 - Foundations of Machine Learning</li>
                <li>DS 2002 - Database Systems</li>
              </ul>
            </li>
        </ul>
      </div>
      <span style={{display: "block", marginBottom: "20px"}}>*Expecting to start an online master's degree while working in 2027</span>
    </motion.div>
  );
}