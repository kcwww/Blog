import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';

import './globals.css';
import { inter } from '@/lib/fonts';
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
import LINK from '@/constants/link';

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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': '망그러진 블로그',
    'description':
      '사람들의 삶에 가치를 더하는 경험을 제공하고자 하는 개발자 찬우얌입니다.',
    'url': ORIGIN,
    'logo': `https://${process.env.AWS_CLOUDFRONT_DOMAIN}/main/ogImg.png`,
    'sameAs': [LINK.LINKEDIN, LINK.INSTAGRAM, LINK.GITHUB, LINK.NAVER_BLOG],
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'item': {
          '@id': `${ORIGIN}/posts`,
          'name': 'Posts',
          'description': '블로그의 모든 포스트를 확인할 수 있습니다.',
        },
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'item': {
          '@id': `${ORIGIN}/series`,
          'name': 'Series',
          'description':
            '시리즈별로 작성한 포스트를 이어서 확인할 수 있습니다.',
        },
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'item': {
          '@id': `${ORIGIN}/snippets`,
          'name': 'Snippets',
          'description':
            '스니펫을 통해 빠르게 원하는 정보를 확인할 수 있습니다.',
        },
      },
    ],
  };

  return (
    <html lang="ko" className={inter.className}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta
          name="naver-site-verification"
          content="496e4cec4d52d38aa27a02f663c5acd8ae8a241c"
        />
        <script
          typeof="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={cn(
          'flex flex-col items-center justify-center bg-gray-300 transition-colors duration-300 ease-out dark:bg-gray-900 sm:mx-8'
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
      <GoogleAnalytics gaId={process.env.GA_ID || ''} />
      <Analytics />
    </html>
  );
};

export default RootLayout;
