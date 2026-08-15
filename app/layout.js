import localFont from 'next/font/local';
import '../styles/globals.css';
import '../styles/ambient.css';

const publicSans = localFont({
  src: '../public/fonts/PublicSans.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-public-sans',
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
});

export const metadata = {
  description: 'Luke McMeans — software engineer portfolio.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={publicSans.variable} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
