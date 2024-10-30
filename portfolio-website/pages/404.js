import Image from "next/image";
import { motion } from 'framer-motion';
import { variants } from '../utils/variants.js';
import { useState } from 'react';

export default function PageNotFound() {
  return (
    <motion.div
          variants={variants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
      <title>Luke McMeans - Page Not Found</title>
      <h1>(404) Page Not Found</h1>
      <span>Best I can do is this:</span>
      <br/>
      <img
        className="cat"
        src="/images/maxwell-cat.gif"
      />
    </motion.div>
  );
}