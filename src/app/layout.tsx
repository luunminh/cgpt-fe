import { configs } from '@config/index';
import { ModalProvider, QueryProvider } from '@providers';
import { ThemeProvider } from '@providers/theme-provider';
import { Toaster } from '@ui/toaster';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

export const font = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Cái giá phải trả',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={font.className}>
      <body
        className="min-h-[90vh]"
        suppressHydrationWarning
        style={{ height: `calc(100vh - ${configs.NAVBAR_HEIGHT}px)` }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <ModalProvider />
            <Toaster />

            <main style={{ marginTop: configs.NAVBAR_HEIGHT }}>{children}</main>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
