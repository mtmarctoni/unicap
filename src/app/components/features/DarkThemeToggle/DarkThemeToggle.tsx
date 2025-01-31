'use client';
import { useTheme } from 'next-themes';

import { SunIcon, MoonIcon } from '@heroicons/react/20/solid'

export const DarkThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full hover:bg-gray-dark transition-colors duration-500 hover:animate-spin"
    >
      {theme === 'dark' ? (
        <SunIcon className="text-primary w-5 h-5" />
      ) : theme === 'light' ? (
        <MoonIcon className="text-secondary w-5 h-5" />
      ) : null}
    </button>
  );
};