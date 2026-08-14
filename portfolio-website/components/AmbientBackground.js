import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

// Shared blob geometry (position/size/blur/opacity/motion). Color assigned
// per-route from PALETTES so each page has its own atmosphere.
const BLOB_GEOMETRY = [
  { id: 'd1', layer: 1, size: 120, x: -20, y: -15, blur: 120, opacity: 0.35, dur: 82, delay: 0 },
  { id: 'd2', layer: 1, size: 110, x: 70,  y: 60,  blur: 130, opacity: 0.30, dur: 90, delay: -20 },
  { id: 'd3', layer: 1, size: 100, x: 40,  y: -30, blur: 140, opacity: 0.22, dur: 76, delay: -40 },
  { id: 'm1', layer: 2, size: 70,  x: 10,  y: 30,  blur: 80,  opacity: 0.40, dur: 54, delay: -10 },
  { id: 'm2', layer: 2, size: 65,  x: 75,  y: 10,  blur: 85,  opacity: 0.28, dur: 60, delay: -30 },
  { id: 'm3', layer: 2, size: 55,  x: 55,  y: 75,  blur: 90,  opacity: 0.20, dur: 48, delay: -15 },
  { id: 'g1', layer: 3, size: 50,  x: 30,  y: 50,  blur: 70,  opacity: 0.30, dur: 40, delay: -5 },
  { id: 'g2', layer: 3, size: 45,  x: 85,  y: 45,  blur: 75,  opacity: 0.26, dur: 44, delay: -25 },
];

const PALETTES = {
  '/':           ['--brand-teal', '--brand-aqua', '--brand-cyan', '--brand-sky'],
  '/projects':   ['--brand-azure', '--brand-sky', '--brand-royal', '--brand-cyan'],
  '/experience': ['--brand-teal', '--brand-cyan', '--brand-aqua', '--brand-azure'],
  '/education':  ['--accent-orange', '--accent-peach', '--accent-coral', '--brand-teal'],
  '/resume':     ['--brand-violet', '--brand-indigo', '--brand-magenta', '--brand-sky'],
  '/contact':    ['--brand-cyan', '--brand-aqua', '--brand-sky', '--brand-teal'],
};

export default function AmbientBackground() {
  const ref = useRef(null);
  const router = useRouter();
  const palette = PALETTES[router.pathname] || PALETTES['/'];
  const blobs = BLOB_GEOMETRY.map((b, i) => ({
    ...b,
    color: `var(${palette[i % palette.length]})`,
  }));
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const onStart = () => setIsNavigating(true);
    const onDone = () => setIsNavigating(false);
    router.events.on('routeChangeStart', onStart);
    router.events.on('routeChangeComplete', onDone);
    router.events.on('routeChangeError', onDone);
    return () => {
      router.events.off('routeChangeStart', onStart);
      router.events.off('routeChangeComplete', onDone);
      router.events.off('routeChangeError', onDone);
    };
  }, [router.events]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    let raf;
    const onMove = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.transform = `translate3d(${nx * 8}px, ${ny * 8}px, 0)`;
        }
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={`ambient-root${isNavigating ? ' ambient-root--paused' : ''}`} aria-hidden="true">
      <div className="ambient-parallax" ref={ref}>
        {blobs.map((b) => (
          <span
            key={b.id}
            className={`ambient-blob ambient-l${b.layer}`}
            style={{
              '--c': b.color,
              '--sz': `${b.size}vmax`,
              '--x': `${b.x}%`,
              '--y': `${b.y}%`,
              '--bl': `${b.blur}px`,
              '--op': b.opacity,
              '--dur': `${b.dur}s`,
              '--delay': `${b.delay}s`,
            }}
          />
        ))}
      </div>
      <div className="ambient-grain" />
    </div>
  );
}
