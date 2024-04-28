import Link from 'next/link';
import { Home } from 'lucide-react';

import { ROUTES } from '@/constants/routes';
import Sidebar from '@/components/Header/Sidebar';

const Navbar = () => {
  return (
    <>
      <div className="w-full md:block hidden">
        <nav className="w-full flex gap-2 items-center bg-gray-400 dark:bg-gray-700 p-2 rounded-lg md:min-w-[25rem]">
          <Link
            href={ROUTES.LANDING}
            className="text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors duration-200 ease-out"
          >
            <Home />
          </Link>
          <Link
            href={ROUTES.POSTS}
            className="text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors duration-200 ease-out"
          >
            Posts
          </Link>
          <Link
            href={ROUTES.SERIES}
            className="text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors duration-200 ease-out"
          >
            Series
          </Link>
          <Link
            href={ROUTES.SNIPPETS}
            className="text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors duration-200 ease-out"
          >
            Snippets
          </Link>

          <Link
            href={ROUTES.PORTFOLIO}
            className="text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors duration-200 ease-out"
          >
            Portfolio
          </Link>
        </nav>
      </div>
      <div className="md:hidden flex items-center">
        <Sidebar />
      </div>
    </>
  );
};

export default Navbar;
