import Image from 'next/image';
import AmbientBackground from '../components/AmbientBackground';
import SiteChrome from '../components/SiteChrome';
import PageTransition from '../components/PageTransition';

export const metadata = {
  title: 'Page Not Found - Luke McMeans',
};

export default function NotFound() {
  return (
    <>
      <AmbientBackground />
      <SiteChrome>
        <PageTransition>
          <div className="glass-panel notfound-panel">
            <h1>(404) Page Not Found</h1>
            <span>Best I can do is this:</span>
            <br />
            <Image
              className="cat"
              src="/images/maxwell-cat.webp"
              width={360}
              height={241}
              alt=""
              unoptimized
            />
          </div>
        </PageTransition>
      </SiteChrome>
    </>
  );
}
