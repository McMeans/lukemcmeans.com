import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Layout from './layout.js';
import '../styles/globals.css';

function MyApp({ Component, pageProps, router }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check if the user has a preferred color scheme
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (userPrefersDark) {
      setTheme('dark');
      document.body.classList.add('dark-mode-colors');
    } else {
      setTheme('light');
      document.body.classList.remove('dark-mode-colors');
    }

    // Listen for changes to the preferred color scheme
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
          <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
    </Layout>
  );
}

export default MyApp;
