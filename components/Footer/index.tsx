import Link from 'next/link';
import { Mail, Linkedin, Instagram, Github } from 'lucide-react';

import LINK from '@/constants/link';

const Footer = () => {
  return (
    <footer className="flex flex-col gap-4 items-center justify-center w-full h-full  dark:border-gray-700 text-sm p-8">
      <div className="flex gap-4 items-center">
        <Link
          href={LINK.MAIL}
          className="dark:hover:bg-gray-800 hover:bg-gray-200 p-0 w-8 h-8 flex items-center rounded-md justify-center transition-colors duration-150 ease-out"
        >
          <Mail />
        </Link>
        <Link
          href={LINK.LINKEDIN}
          className="dark:hover:bg-gray-800 hover:bg-gray-200 p-0 w-8 h-8 flex items-center rounded-md justify-center transition-colors duration-150 ease-out"
        >
          <Linkedin />
        </Link>
        <Link
          href={LINK.INSTAGRAM}
          className="dark:hover:bg-gray-800 hover:bg-gray-200 p-0 w-8 h-8 flex items-center rounded-md justify-center transition-colors duration-150 ease-out"
        >
          <Instagram />
        </Link>
        <Link
          href={LINK.GITHUB}
          className="dark:hover:bg-gray-800 hover:bg-gray-200 p-0 w-8 h-8 flex items-center rounded-md justify-center transition-colors duration-150 ease-out"
        >
          <Github />
        </Link>
      </div>
      <p>Copyright © kcwww 2024</p>
      <p>ChanwooYam Blog Powered by Next.js</p>
    </footer>
  );
};

export default Footer;
