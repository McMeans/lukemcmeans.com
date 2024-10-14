import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [imageVisible, setImageVisible] = useState(true);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
      document.body.classList.add(storedTheme === 'dark' ? 'dark-mode' : '');
    } else {
      const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = userPrefersDark ? 'dark' : 'light';
      setTheme(initialTheme);
      document.body.classList.add(initialTheme === 'dark' ? 'dark-mode' : '');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.classList.toggle('dark-mode', newTheme === 'dark');
  };

  const toggleImageVisibility = () => {
    setImageVisible(!imageVisible);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, imageVisible, toggleImageVisibility }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
