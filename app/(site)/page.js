import Image from 'next/image';
import Link from 'next/link';
import PageTransition from '../../components/PageTransition';
import { TAGLINE, SUMMARY, SOCIALS } from '../../content/home.js';

export const metadata = {
  title: 'Home - Luke McMeans',
};

export default function HomePage() {
  return (
    <PageTransition>
      <div className="glass-panel home-tagline-panel">
        <p className="home-tagline">{TAGLINE}</p>
      </div>
      <div className="glass-panel hero-panel">
        <div className="home-details">
          <div className="home-detail">
            <Image
              className="detail-image"
              src="/images/timmons-icon.png"
              width={30}
              height={30}
              alt=""
              priority
            />
            <span className="detail-label"><strong>Software Engineer</strong> at <strong>Timmons Group</strong></span>
          </div>
          <div className="home-detail">
            <picture>
              <source srcSet="/images/dark-mode/uva-dark.png" media="(prefers-color-scheme: dark)" />
              <img
                className="detail-image"
                src="/images/light-mode/uva-light.png"
                width={30}
                height={30}
                alt=""
                decoding="async"
                fetchPriority="high"
              />
            </picture>
            <span className="detail-label"><strong>Computer Science and Data Science</strong> graduate at the <strong>University of Virginia</strong></span>
          </div>
        </div>
        <span className="summary">
          {SUMMARY}
        </span>
        <div className="home-actions">
          <Link href="/resume" className="glass-btn home-resume">
            Resume
          </Link>
          <div className="socials">
            {SOCIALS.map(({ href, src, label }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Image
                  className="social-index"
                  src={src}
                  width={30}
                  height={30}
                  alt=""
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
