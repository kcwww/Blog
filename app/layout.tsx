import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { cn } from '@/lib/utils';
import ThemeProvider from '@/components/provider/ThemeProvider';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '찬우얌의 블로그',
  description: 'Frontend Developer 찬우얌의 블로그입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={cn(
          inter.className,
          'dark:bg-gray-900 bg-gray-300 transition-colors duration-300 ease-out'
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
