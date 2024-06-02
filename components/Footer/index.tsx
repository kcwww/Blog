import Link from 'next/link';
import { Mail, Linkedin, Instagram, Github, Rss } from 'lucide-react';

import LINK from '@/constants/link';
import { ROUTES } from '@/constants/routes';

const Footer = () => {
  return (
    <footer className="flex h-full w-full flex-col items-center justify-center gap-4  p-8 text-sm dark:border-gray-700">
      <div className="flex items-center gap-4">
        <Link
          href={LINK.MAIL}
          className="flex h-8 w-8 items-center justify-center rounded-md p-0 transition-colors duration-150 ease-out hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          <Mail />
        </Link>
        <Link
          href={LINK.LINKEDIN}
          className="flex h-8 w-8 items-center justify-center rounded-md p-0 transition-colors duration-150 ease-out hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          <Linkedin />
        </Link>
        <Link
          href={LINK.INSTAGRAM}
          className="flex h-8 w-8 items-center justify-center rounded-md p-0 transition-colors duration-150 ease-out hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          <Instagram />
        </Link>
        <Link
          href={LINK.GITHUB}
          className="flex h-8 w-8 items-center justify-center rounded-md p-0 transition-colors duration-150 ease-out hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          <Github />
        </Link>
      </div>
      <div className="text-md flex items-center gap-2">
        <p>Copyright © kcwww 2024</p>
        <Link href={ROUTES.RSS}>
          <Rss size={'1.2rem'} />
        </Link>
      </div>
      <p>ChanwooYam Blog Powered by Next.js</p>
    </footer>
  );
};

export default Footer;
