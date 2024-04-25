import Link from 'next/link';
import { Github, Mail, Instagram } from 'lucide-react';

import Navbar from '@/components/Header/Navbar';
import CommandBox from '@/components/Header/CommandBox';
import ToggleThemeButton from '@/components/Header/ToggleThemeButton';

const Header = () => {
  return (
    <header className="w-full flex gap-2">
      <Navbar />
      <div className="ml-auto flex w-[21rem] gap-4 items-center bg-gray-400 dark:bg-gray-700 p-2 rounded-lg px-4">
        <Link
          href="mailto:cwkim0321@gmail.com"
          className="dark:hover:bg-gray-800 hover:bg-gray-200 p-0 w-8 h-8 flex items-center rounded-md justify-center transition-colors duration-150 ease-out"
        >
          <Mail />
        </Link>
        <Link
          href="https://www.instagram.com/kcwww.w/"
          className="dark:hover:bg-gray-800 hover:bg-gray-200 p-0 w-8 h-8 flex items-center rounded-md justify-center transition-colors duration-150 ease-out"
        >
          <Instagram />
        </Link>
        <Link
          href="https://github.com/kcwww"
          className="dark:hover:bg-gray-800 hover:bg-gray-200 p-0 w-8 h-8 flex items-center rounded-md justify-center transition-colors duration-150 ease-out"
        >
          <Github />
        </Link>
        <ToggleThemeButton />
        <CommandBox />
      </div>
    </header>
  );
};

export default Header;