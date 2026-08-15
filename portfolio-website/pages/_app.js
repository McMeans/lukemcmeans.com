import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from './layout.js';
import AmbientBackground from '../components/AmbientBackground';
import '../styles/globals.css';
import '../styles/ambient.css';

function MyApp({ Component, pageProps, router }) {
  const excludeLayoutRoutes = ['/loggd-redirect'];
  const isExcluded = excludeLayoutRoutes.includes(router.pathname);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (userPrefersDark) {
      setTheme('dark');
      document.body.classList.add('dark-mode-colors');
    } else {
      setTheme('light');
      document.body.classList.remove('dark-mode-colors');
    }

    const handleThemeChange = (e) => {
      if (e.matches) {
        setTheme('dark');
        document.body.classList.add('dark-mode-colors');
      } else {
        setTheme('light');
        document.body.classList.remove('dark-mode-colors');
      }
    };

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleThemeChange);

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleThemeChange);
    };
  }, []);

  if (isExcluded) {
    return <Component {...pageProps} />;
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Luke McMeans — software engineer portfolio." />
        <link rel="preload" href="/fonts/PublicSans.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="prefetch" href="/LukeMcMeans_Resume.pdf" />
      </Head>
      <AmbientBackground />
      <Layout>
        <Component {...pageProps} key={router.asPath} theme={theme} />
      </Layout>
    </>
  );
}

export default MyApp;
