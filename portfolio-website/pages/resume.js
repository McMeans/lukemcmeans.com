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
      <title>Luke McMeans - Resume</title>
      <iframe src="/LukeMcMeans_Resume.pdf" allowFullScreen/>
    </motion.div>
  );
}