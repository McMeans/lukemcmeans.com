import Link from "next/link";
import Image from "next/image";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { variants } from '../utils/varients.js';

export default function Layout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const routesToPrefetch = ['/', '/projects', '/experience', '/education', '/resume', '/contact'];
    routesToPrefetch.forEach((route) => {
      router.prefetch(route);
    });
  }, [router]);

  return (
    <div className="whole-page">
      <link rel="icon" href="/public/favicon.ico" type="image/x-icon"></link>
      <div className="header">
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
      </div>
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
          initial="initial"
          animate="enter"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
