import Link from "next/link";
import Image from "next/image";
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const NAV_ITEMS = [
  {
    href: '/',
    label: 'Home',
    icon: (
      <svg className="tab-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V20h14V9.5" />
      </svg>
    ),
  },
  {
    href: '/projects',
    label: 'Projects',
    icon: (
      <svg className="tab-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 7.5 12 3l9 4.5-9 4.5-9-4.5Z" />
        <path d="M3 7.5V16.5L12 21l9-4.5V7.5" />
      </svg>
    ),
  },
  {
    href: '/experience',
    label: 'Experience',
    icon: (
      <svg className="tab-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M3 12h18" />
      </svg>
    ),
  },
  {
    href: '/education',
    label: 'Education',
    icon: (
      <svg className="tab-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 10 12 5 2 10l10 5 10-5Z" />
        <path d="M6 12v5c0 0 3.5 2 6 2s6-2 6-2v-5" />
      </svg>
    ),
  },
  {
    href: '/resume',
    label: 'Resume',
    icon: (
      <svg className="tab-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6" />
        <path d="M8 13h8" />
        <path d="M8 17h8" />
      </svg>
    ),
  },
  {
    href: '/contact',
    label: 'Contact',
    icon: (
      <svg className="tab-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
];

export default function Layout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const routesToPrefetch = ['/', '/projects', '/experience', '/education', '/resume', '/contact'];
    routesToPrefetch.forEach((route) => {
      router.prefetch(route);
    });
    const prefetchPdf = () => {
      fetch('/LukeMcMeans_Resume.pdf', { cache: 'force-cache' }).catch(() => {});
    };
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(prefetchPdf);
    } else {
      setTimeout(prefetchPdf, 250);
    }
  }, [router]);

  return (
    <div className="whole-page">
      <link rel="icon" href="/favicon.ico" type="image/x-icon"></link>
      <div className="header">
        <Link href="/">
          <Image
            className="header-logo mono-logo"
            src="/images/lm-mark.png"
            width={191}
            height={100}
            alt="Luke McMeans"
            priority
            sizes="(max-width: 700px) 50px, 92px"
          />
          <span>Luke McMeans</span>
        </Link>
      </div>
      <div className="gap"></div>
      <div className="layout-body">
        <div className="nav-column">
          <div className="tabs">
            {NAV_ITEMS.map(({ href, label, icon }) => {
              const slug = href === '/' ? 'home' : href.slice(1);
              const isCurrent = router.pathname === href;
              return (
                <Link key={href} href={href} aria-label={label}>
                  <span className={`tab tab-${slug}${isCurrent ? ' current-tab' : ''}`}>
                    <span className="tab-label">{label}</span>
                    <span className="tab-icon">{icon}</span>
                  </span>
                </Link>
              );
            })}
          </div>
          <footer>
            <p>Created by Luke McMeans (2026)</p>
          </footer>
        </div>
        <div className="content">
          {children}
          <div className="mobile-bottom-padding" />
        </div>
      </div>
    </div>
  );
}
