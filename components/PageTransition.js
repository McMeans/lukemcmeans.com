'use client';

import { motion } from 'framer-motion';
import { variants } from '../lib/variants.js';

export default function PageTransition({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
