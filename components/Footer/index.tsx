import Image from 'next/image';
import Link from 'next/link';
import { Mail, Linkedin, Instagram, Github, Rss } from 'lucide-react';

import LINK from '@/constants/link';
import { ROUTES } from '@/constants/routes';

const Footer = () => {
  const iconClass =
    'flex h-8 w-8 items-center justify-center rounded-md p-0 transition-colors duration-150 ease-out hover:bg-gray-200 dark:hover:bg-gray-800';

  return (
    <footer className="flex h-full w-full flex-col items-center justify-center gap-4  p-8 text-sm dark:border-gray-700">
      <div className="flex items-center gap-4">
        <Link href={LINK.MAIL} className={iconClass}>
          <Mail />
        </Link>
        <Link
          target="_blank"
          rel="noreferrer noopener"
          href={LINK.LINKEDIN}
          className={iconClass}
        >
          <Linkedin />
        </Link>
        <Link
          target="_blank"
          rel="noreferrer noopener"
          href={LINK.INSTAGRAM}
          className={iconClass}
        >
          <Instagram />
        </Link>
        <Link
          target="_blank"
          rel="noreferrer noopener"
          href={LINK.GITHUB}
          className={iconClass}
        >
          <Github />
        </Link>
        <Link
          target="_blank"
          rel="noreferrer noopener"
          href={LINK.NAVER_BLOG}
          className={iconClass}
        >
          <Image
            src="/naverBlog.png"
            className="p-1"
            width={500}
            height={500}
            alt="Blog"
          />
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
