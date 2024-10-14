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
      <title>Luke McMeans - Education</title>
    </motion.div>
  );
}