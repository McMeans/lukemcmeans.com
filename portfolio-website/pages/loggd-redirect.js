import { useEffect, useState } from "react";
import styles from "/styles/Loggd.module.css"
import Image from "next/image";

export default function Loggd() {
    const [isDetecting, setIsDetecting] = useState(true);
    useEffect(() => {
        const userAgent = navigator.userAgent
        if (/Chrom(e|ium)/.test(userAgent)) {
            window.location.href = 'https://chromewebstore.google.com/detail/loggd/ecbepjhmbpkgmdejfekkmpoeijkcophm';
        } else if (/Safari/.test(userAgent)) {
            window.location.href = 'https://chromewebstore.google.com/detail/loggd/ecbepjhmbpkgmdejfekkmpoeijkcophm';
            // TODO: CHANGE TO CORRESPONDING WEBSITE
        } else if (/Firefox/.test(userAgent)) {
            window.location.href = 'https://addons.mozilla.org/en-US/firefox/addon/loggd/';
        } else {
            setIsDetecting(false);
        }
    }, []);

    if (isDetecting) {
        return (
            <main className={styles.body}>
                <text className={styles.message}>
                    Redirecting...
                </text>
            </main>
        );
    }
    return (
        <main className={styles.body}>
            <title>Add Loggd to Browser</title>
            <Image
                className={styles.logo}
                src="/images/loggd-page/loggdWordmark.png"
                width={275}
                height={275}
            />
            <text className={styles.message}>
                We appreciate your interest in Loggd! Unfortunately, your browser either
                wasn't detected properly, or it's not compatible. Currently,
                this extension works with Chromium-based browsers <a className={styles.chromium}
                    href="https://en.wikipedia.org/wiki/Chromium_(web_browser)#Browsers_based_on_Chromium"
                    target="_blank" rel="noopener noreferrer">(see all here)</a>, Safari, and Firefox.
                We've provided download links for each of those browsers below, so you're welcome to
                manually navigate and download.
            </text>
            <div className={styles.links}>
                <a className={styles.hotlink} href="https://chromewebstore.google.com/detail/loggd/ecbepjhmbpkgmdejfekkmpoeijkcophm">
                    <Image
                        className={styles.browserLogo}
                        src="/images/loggd-page/chromiumLogo.png"
                        width={100}
                        height={100}
                    />
                    Add to Chromium
                </a>
                <a className={styles.hotlink} href="https://chromewebstore.google.com/detail/loggd/ecbepjhmbpkgmdejfekkmpoeijkcophm">
                    <Image
                        className={styles.browserLogo}
                        src="/images/loggd-page/safariLogo.png"
                        width={100}
                        height={100}
                    />
                    Add to Safari
                </a>
                <a className={styles.hotlink} href="https://chromewebstore.google.com/detail/loggd/ecbepjhmbpkgmdejfekkmpoeijkcophm">
                    <Image
                        className={styles.browserLogo}
                        src="/images/loggd-page/firefoxLogo.png"
                        width={100}
                        height={100}
                    />
                    Add to Firefox
                </a>
            </div>
        </main>
    );
}