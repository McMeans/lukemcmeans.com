import { useEffect } from "react";

export default function Loggd() {
    useEffect(() => {
        const userAgent = navigator.userAgent
        if (/Chrom(e|ium)/.test(userAgent)){
            window.location.href = 'https://chromewebstore.google.com/detail/loggd/ecbepjhmbpkgmdejfekkmpoeijkcophm';
        }
        else if (/Safari/.test(userAgent)){
            window.location.href = 'https://chromewebstore.google.com/detail/loggd/ecbepjhmbpkgmdejfekkmpoeijkcophm';
            // TODO: CHANGE TO CORRESPONDING WEBSITE
        }
        else if (/Firefox/.test(userAgent)){
            window.location.href = 'https://chromewebstore.google.com/detail/loggd/ecbepjhmbpkgmdejfekkmpoeijkcophm';
            // TODO: CHANGE TO CORRESPONDING WEBSITE
        }
        else{
            return (
                <html>
                    {/* TODO: ADD PAGE WITH OPTIONS */}
                </html>
            );
        }
    }, []);
}