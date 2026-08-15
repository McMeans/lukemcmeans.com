'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Loggd.module.css';

export default function LoggdRedirect() {
  const [isDetecting, setIsDetecting] = useState(true);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    if (/Chrom(e|ium)/.test(userAgent)) {
      window.location.href = 'https://chromewebstore.google.com/detail/loggd/ecbepjhmbpkgmdejfekkmpoeijkcophm';
    } else if (/Firefox/.test(userAgent)) {
      window.location.href = 'https://addons.mozilla.org/en-US/firefox/addon/loggd/';
    } else {
      setIsDetecting(false);
    }
  }, []);

  if (isDetecting) {
    return (
      <main className={styles.body}>
        <span className={styles.message}>
          Redirecting...
        </span>
      </main>
    );
  }

  return (
    <main className={styles.body}>
      <Image
        className={styles.logo}
        src="/images/loggd-page/loggdWordmark.png"
        width={275}
        height={275}
        alt="Loggd"
      />
      <span className={styles.message}>
        We appreciate your interest in Loggd! Unfortunately, your browser either
        wasn't detected properly, or it's not compatible. Currently,
        this extension works with Chromium-based browsers <a className={styles.chromium}
          href="https://en.wikipedia.org/wiki/Chromium_(web_browser)#Browsers_based_on_Chromium"
          target="_blank" rel="noopener noreferrer">(see all here)</a> and Firefox.
        We've provided download links for each of those browsers below, so you're welcome to
        manually navigate and download.
      </span>
      <div className={styles.links}>
        <a className={styles.hotlink} href="https://chromewebstore.google.com/detail/loggd/ecbepjhmbpkgmdejfekkmpoeijkcophm">
          <Image
            className={styles.browserLogo}
            src="/images/loggd-page/chromiumLogo.png"
            width={100}
            height={100}
            alt=""
          />
          Add to Chromium
        </a>
        <a className={styles.hotlink} href="https://addons.mozilla.org/en-US/firefox/addon/loggd/">
          <Image
            className={styles.browserLogo}
            src="/images/loggd-page/firefoxLogo.png"
            width={100}
            height={100}
            alt=""
          />
          Add to Firefox
        </a>
      </div>
    </main>
  );
}
