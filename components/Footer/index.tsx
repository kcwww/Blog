import Link from 'next/link';
import { Mail, Linkedin, Instagram, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="flex flex-col gap-4 items-center justify-center w-full h-12  dark:border-gray-700 text-sm p-8 h-full">
      <div className="flex gap-4 items-center">
        <Link
          href="mailto:cwkim0321@gmail.com"
          className="dark:hover:bg-gray-800 hover:bg-gray-200 p-0 w-8 h-8 flex items-center rounded-md justify-center transition-colors duration-150 ease-out"
        >
          <Mail />
        </Link>
        <Link
          href="https://www.linkedin.com/in/chanwoo-kim-8757a12a5/"
          className="dark:hover:bg-gray-800 hover:bg-gray-200 p-0 w-8 h-8 flex items-center rounded-md justify-center transition-colors duration-150 ease-out"
        >
          <Linkedin />
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
      </div>
      <p>Copyright © kcwww 2024</p>
      <p>ChanwooYam Blog Powered by Next.js</p>
    </footer>
  );
};

export default Footer;
