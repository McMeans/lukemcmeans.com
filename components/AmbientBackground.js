'use client';

import { useLayoutEffect, useState } from 'react';
import { getAmbientFlags } from '../lib/capabilities';
import ChromaticWaves from './ChromaticWaves';
// Revert tip: swap ChromaticWaves → ReflectBackground and restore tint/fill/opacity props.
// import ReflectBackground from './ReflectBackground';

// OriginKit Chromatic Waves — same field recipe; only palette lifts/sinks with scheme.
const DARK = {
  frequency: 2,
  speed: 1,
  bgColor: '#000000',
  // Same hues, sunk toward black so dots sit flush with the field.
  colors: ['#121C28', '#071A10'],
  cellSize: 34,
  gamma: 6,
  paletteBias: -3,
};

const LIGHT = {
  frequency: 2,
  speed: 1,
  bgColor: '#F4F6F8',
  // Mirrors dark mode: dots sit about as far below the paper as dark's sit above black.
  colors: ['#E3E8ED', '#E1E9E4'],
  cellSize: 34,
  gamma: 5.5,
  paletteBias: -2.5,
};

function readSchemeState() {
  if (typeof window === 'undefined') {
    return { dark: true, animation: false };
  }
  const { reducedMotion, saveData, hidden } = getAmbientFlags();
  return {
    dark: window.matchMedia('(prefers-color-scheme: dark)').matches,
    animation: !reducedMotion && !saveData && !hidden,
  };
}

export default function AmbientBackground() {
  const [state, setState] = useState(readSchemeState);

  // useLayoutEffect so the WebGL preset matches CSS color-scheme before paint.
  useLayoutEffect(() => {
    const scheme = window.matchMedia('(prefers-color-scheme: dark)');

    const sync = () => {
      const next = readSchemeState();
      setState((prev) => (
        prev.dark === next.dark && prev.animation === next.animation ? prev : next
      ));
    };

    document.addEventListener('visibilitychange', sync);
    scheme.addEventListener('change', sync);
    // Fallback: some environments update prefers-color-scheme without a change event.
    const poll = window.setInterval(sync, 1000);
    sync();

    return () => {
      document.removeEventListener('visibilitychange', sync);
      scheme.removeEventListener('change', sync);
      window.clearInterval(poll);
    };
  }, []);

  const preset = state.dark ? DARK : LIGHT;

  return (
    <div
      className="ambient-root"
      style={{
        // CSS media queries own the root fill so light/dark stay in lockstep.
        // Vars still feed the CSS dot fallback + WebGL child.
        '--ambient-bg': preset.bgColor,
        '--ambient-dot': preset.colors[0],
        '--ambient-cell': `${preset.cellSize}px`,
      }}
      aria-hidden="true"
    >
      <ChromaticWaves
        frequency={preset.frequency}
        speed={preset.speed}
        bgColor={preset.bgColor}
        colors={preset.colors}
        cellSize={preset.cellSize}
        gamma={preset.gamma}
        paletteBias={preset.paletteBias}
        animation={state.animation}
      />
    </div>
  );
}
