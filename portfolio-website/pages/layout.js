import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { variants } from '../utils/variants.js';

export default function Layout({ children }) {
  const router = useRouter();
  const [isFirstMount, setIsFirstMount] = useState(true);

  const headerColors = useMemo(() => ({
    '/': 'linear-gradient(150deg, rgba(208, 0, 0, 1), rgba(7, 55, 99, 1))',
    '/projects': 'linear-gradient(150deg, rgba(60, 120, 216, 1), rgba(7, 55, 99, 1))',
    '/experience': 'linear-gradient(150deg, rgba(42, 86, 165, 1), rgba(102, 102, 102, 1))',
    '/education': 'linear-gradient(150deg, rgba(229, 114, 0, 1), rgba(35, 45, 75, 1))',
    '/resume': 'linear-gradient(150deg, rgba(67, 67, 67, 1), rgba(102, 102, 102, 1))',
    '/contact': 'linear-gradient(150deg, rgba(83, 215, 105, 1), rgba(10, 102, 194, 1))',
  }), []);

  useEffect(() => {
    setIsFirstMount(false);
  }, []);

  useEffect(() => {
    const routesToPrefetch = ['/', '/projects', '/experience', '/education', '/resume', '/contact'];
    routesToPrefetch.forEach((route) => {
      router.prefetch(route);
    });
  }, [router]);

  return (
    <div className="whole-page">
      <link rel="icon" href="/public/favicon.ico" type="image/x-icon"></link>
      <motion.div 
        className="header"
        animate={{
          background: `${headerColors[router.pathname] || headerColors['/']}`
        }}
        transition={{ duration: 0.3 }}
      >
        <Link href="/">
          <Image
            className="header-logo"
            src='/images/header-logo.png'
            width={80}
            height={80}
            alt="Header Logo"
          />
          <span>Luke McMeans</span>
        </Link>
      </motion.div>
      <div className="gap"></div>
      <div className="layout-body">
        <div className="nav-column">
          <div className="tabs">
            <Link href="/">
              <span className={router.pathname === "/" ? "current-tab" : ""}>Home</span>
            </Link>
            <Link href="/projects">
              <span className={router.pathname === "/projects" ? "current-tab" : ""}>Projects</span>
            </Link>
            <Link href="/experience">
              <span className={router.pathname === "/experience" ? "current-tab" : ""}>Experience</span>
            </Link>
            <Link href="/education">
              <span className={router.pathname === "/education" ? "current-tab" : ""}>Education</span>
            </Link>
            <Link href="/resume">
              <span className={router.pathname === "/resume" ? "current-tab" : ""}>Resume</span>
            </Link>
            <Link href="/contact">
              <span className={router.pathname === "/contact" ? "current-tab" : ""}>Contact</span>
            </Link>
          </div>
          <div className="bottom-footer">
            <footer>
              <p>Created by Luke McMeans</p>
              <p>Built using <a href="https://nextjs.org/" target="_blank">Next.js</a></p>
              <p>Deployed using Vercel</p>
            </footer>
          </div>
        </div>
        <motion.div
          className="content"
          variants={variants}
          initial={isFirstMount ? "enter" : "initial"}
          animate="enter"
          exit="exit"
        >
          {children}
          <div className="mobile-bottom-padding" />
        </motion.div>
      </div>
    </div>
  );
}
