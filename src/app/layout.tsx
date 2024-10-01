import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from '@nsa/lib/providers/ThemeProvider';
import { QueryClientProvider } from '@nsa/lib/providers/QueryClientProvider';
import { Toaster } from '@nsa/lib/components/ui/Toaster';
import { SonnerToast } from '@nsa/lib/components/ui/Sonner';
import '@nsa/styles/tailwind.css';
import '@nsa/styles/ol.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

// const geistSans = localFont({
//   src: './fonts/GeistVF.woff',
//   variable: '--font-geist-sans',
//   weight: '100 900',
// });
// const geistMono = localFont({
//   src: './fonts/GeistMonoVF.woff',
//   variable: '--font-geist-mono',
//   weight: '100 900',
// });

export const metadata: Metadata = {
  title: 'New Service Application',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased h-screen w-screen overflow-x-hidden overflow-y-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <QueryClientProvider>
            {children}
            <Toaster />
            <SonnerToast />
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
