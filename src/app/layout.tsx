import type { Metadata } from 'next';
import { Poppins, Montserrat, DM_Sans } from 'next/font/google';
import { ThemeProvider } from '@nsa/lib/providers/ThemeProvider';
import { QueryClientProvider } from '@nsa/lib/providers/QueryClientProvider';
import { Toaster } from '@nsa/lib/components/ui/Toaster';
import { SonnerToast } from '@nsa/lib/components/ui/Sonner';
import '@nsa/styles/tailwind.css';
import '@nsa/styles/ol.css';
import { MapProvider } from '@nsa/lib/providers/MapProvider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const dmSans = DM_Sans({
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
      <body className={`${dmSans.className} antialiased h-screen w-screen overflow-y-hidden overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <QueryClientProvider>
            <MapProvider>
              <main>{children}</main>
            </MapProvider>
            <Toaster />
            <SonnerToast />
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
