import Link from 'next/link';
import { Home } from 'lucide-react';

import { SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/constants/routes';

const Links = ({ view }: { view: string | undefined }) => {
  return (
    <nav
      className={cn(
        'w-full flex items-center p-2 rounded-lg',
        view ? 'flex-col gap-8 mt-8' : 'bg-gray-400 dark:bg-gray-700 gap-2'
      )}
    >
      <Link
        href={ROUTES.LANDING}
        className="text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors duration-200 ease-out"
      >
        {view ? (
          <SheetTrigger asChild>
            <Home />
          </SheetTrigger>
        ) : (
          <Home />
        )}
      </Link>
      <Link
        href={ROUTES.POSTS}
        className="text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors duration-200 ease-out"
      >
        {view ? (
          <SheetTrigger asChild>
            <p>Posts</p>
          </SheetTrigger>
        ) : (
          'Posts'
        )}
      </Link>
      <Link
        href={ROUTES.SERIES}
        className="text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors duration-200 ease-out"
      >
        {view ? (
          <SheetTrigger asChild>
            <p>Series</p>
          </SheetTrigger>
        ) : (
          'Series'
        )}
      </Link>
      <Link
        href={ROUTES.SNIPPETS}
        className="text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors duration-200 ease-out"
      >
        {view ? (
          <SheetTrigger asChild>
            <p>Snippets</p>
          </SheetTrigger>
        ) : (
          'Snippets'
        )}
      </Link>

      <Link
        href={'https://bit.ly/3wVaQjS'} // temp
        className="text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors duration-200 ease-out"
        target="_blank" //temp
      >
        {view ? (
          <SheetTrigger asChild>
            <p>Portfoilo</p>
          </SheetTrigger>
        ) : (
          'Portfoilo'
        )}
      </Link>
    </nav>
  );
};

export default Links;
