import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { cn } from '@/lib/utils';
import ThemeProvider from '@/components/provider/ThemeProvider';
import AuthProvider from '@/components/provider/AuthProvider';
import Header from '@/components/Header';
import MainSection from '@/components/Main/MainSection';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';
import ModalProvider from '@/components/provider/ModalProvider';
import { ORIGIN } from '@/constants/url';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '망그러진 블로그',
  description: 'Frontend Developer 찬우얌 블로그입니다.',
  icons: {
    icon: '/kickBear.png',
  },
  robots: 'follow, index',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '망그러진 블로그',
    images: [
      {
        url: 'https://chanwooyam-blog.s3.ap-northeast-2.amazonaws.com/main/main.png',
        width: 400,
        height: 300,
        alt: '망그러진 블로그',
      },
    ],
    title: '망그러진 블로그',
    description: 'Frontend Developer 찬우얌 블로그입니다.',
    url: ORIGIN,
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <body
        className={cn(
          inter.className,
          'dark:bg-gray-900 bg-gray-300 transition-colors duration-300 ease-out mx-8 flex justify-center items-center flex-col'
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <Header />
            <main className="w-full lg:w-2/3 2xl:w-1/2">
              <MainSection>{children}</MainSection>
              <ScrollToTopButton />
              <Toaster richColors />
              <ModalProvider />
            </main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
