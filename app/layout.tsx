import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import ClientQueryProvider from '@/components/tanstack-provider/tanstack-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Crypto Market Scanner',
  description: 'Comprehensive crypto market screening dashboard',
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<JSX.Element> => {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ClientQueryProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
            disableTransitionOnChange
          >
            <div className='min-h-screen bg-background'>
              <Header />
              {children}
            </div>
          </ThemeProvider>
        </ClientQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
