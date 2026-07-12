import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import clsx from 'clsx';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check local storage or system preference
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      setIsDark(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={clsx('icon-btn', className)}
      aria-label="Toggle dark mode"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
