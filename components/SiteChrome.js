'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '../lib/nav.js';

export default function SiteChrome({ children }) {
  const pathname = usePathname();

  return (
    <div className="whole-page">
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
              const isCurrent = pathname === href;
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
