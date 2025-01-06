import { motion } from 'framer-motion';
import { variants } from '../utils/variants.js';

export default function PageNotFound() {
  return (
    <motion.div
          variants={variants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
      <title>Page Not Found - Luke McMeans</title>
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