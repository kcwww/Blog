import type { Metadata } from 'next';
import { Jua } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';

import './globals.css';
import { cn } from '@/lib/utils';
import ThemeProvider from '@/components/provider/ThemeProvider';
import AuthProvider from '@/components/provider/AuthProvider';
import ModalProvider from '@/components/provider/ModalProvider';
import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/Header';
import MainSection from '@/components/Main/MainSection';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';
import { ORIGIN } from '@/constants/url';

const inter = Jua({
  weight: ['400'],
  style: 'normal',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '망그러진 블로그',
  description: 'Frontend Developer 찬우얌 블로그입니다.',
  icons: {
    icon: '/kickBear.png',
  },
  metadataBase: new URL('/kickBear.png', ORIGIN),
  robots: 'follow, index',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '망그러진 블로그',
    images: [
      {
        url: `https://${process.env.AWS_CLOUDFRONT_DOMAIN}/main/ogImg.png`,
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
    <html lang="ko" className={inter.className}>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <meta
        name="naver-site-verification"
        content="496e4cec4d52d38aa27a02f663c5acd8ae8a241c"
      />
      <body
        className={cn('mx-8 flex flex-col items-center justify-center bg-gray-300 transition-colors duration-300 ease-out dark:bg-gray-900')}
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
      <GoogleAnalytics gaId={process.env.GA_ID || ''} />
      <Analytics />
    </html>
  );
};

export default RootLayout;
