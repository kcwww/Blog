'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

const ToggleThemeButton = () => {
  const { setTheme, theme } = useTheme();
  const [themeMounted, setThemeMounted] = useState(false);

  useEffect(() => setThemeMounted(true), []);

  if (!themeMounted) return null;

  return (
    <Button
      className="bg-transparent dark:hover:bg-gray-800 hover:bg-gray-200 p-0 w-9 h-9"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? <Moon color="#ffd700" /> : <Sun color="#ffd700" />}
    </Button>
  );
};

export default ToggleThemeButton;
