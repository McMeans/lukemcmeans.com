export const variants = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 28,
      stiffness: 220,
      opacity: { duration: 0.3 },
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.15,
      ease: 'easeOut',
    },
  },
};

export const container = {
  enter: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const item = {
  initial: { opacity: 0, y: 16 },
  enter: { opacity: 1, y: 0, transition: { type: 'spring', damping: 24, stiffness: 220 } },
};
