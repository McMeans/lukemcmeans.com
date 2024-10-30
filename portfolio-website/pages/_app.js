import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from './layout.js';
import '../styles/globals.css';

function MyApp({ Component, pageProps, router }) {
  const excludeLayoutRoutes = ['/loggd-redirect'];
  const isExcluded = excludeLayoutRoutes.includes(router.pathname);
  if (isExcluded) {
    return <Component {...pageProps} />;
  }
  
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

  return (
    <Layout>
      <AnimatePresence mode="wait">
          <Component {...pageProps} key={router.asPath} theme={theme}/>
      </AnimatePresence>
    </Layout>
  );
}

export default MyApp;
