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
import QueryProvider from '@/components/provider/QueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '망그러진 블로그',
  description: 'Frontend Developer 찬우얌 블로그입니다.',
  icons: {
    icon: '/kickBear.png',
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
          'dark:bg-gray-900 bg-gray-300 transition-colors duration-300 ease-out lg:mx-[12rem]'
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <QueryProvider>
              <main className="w-full p-8">
                <Header />
                <MainSection>{children}</MainSection>
                <ScrollToTopButton />
                <Footer />
                <Toaster richColors />
              </main>
            </QueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
