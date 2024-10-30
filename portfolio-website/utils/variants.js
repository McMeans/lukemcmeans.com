export const variants = {
  initial: {
    y: "50vh",
    opacity: 0,
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 200,
      opacity: { duration: 0.3 }
    }
  },
  exit: {
    y: "-50vh",
    opacity: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 200,
      opacity: { duration: 0.2 }
    }
  },
};