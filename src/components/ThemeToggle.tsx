import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <motion.button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      {theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
    </motion.button>
  );
}
