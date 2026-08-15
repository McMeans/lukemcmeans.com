import AmbientBackground from '../../components/AmbientBackground';
import SiteChrome from '../../components/SiteChrome';

export default function SiteLayout({ children }) {
  return (
    <>
      <AmbientBackground />
      <SiteChrome>{children}</SiteChrome>
    </>
  );
}
