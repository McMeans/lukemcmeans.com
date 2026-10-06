import localFont from 'next/font/local';
import '../styles/globals.css';
import '../styles/ambient.css';
import { META_DESCRIPTION } from '../content/agentNote';

const publicSans = localFont({
  src: '../public/fonts/PublicSans.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-public-sans',
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
});

export const metadata = {
  description: META_DESCRIPTION,
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={publicSans.variable} suppressHydrationWarning>
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="Summary for AI agents" />
      </head>
      <body>{children}</body>
    </html>
  );
}
