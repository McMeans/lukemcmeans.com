import localFont from 'next/font/local';
import LoggdRedirect from '../../components/LoggdRedirect';

const lexend = localFont({
  src: '../../public/fonts/Lexend.woff2',
  weight: '100 900',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

export const metadata = {
  title: 'Add Loggd to Browser',
};

export default function LoggdRedirectPage() {
  return (
    <div className={lexend.className}>
      <LoggdRedirect />
    </div>
  );
}
