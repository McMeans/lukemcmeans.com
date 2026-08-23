'use client';

import { useEffect, useState } from 'react';
import { getAmbientFlags } from '../lib/capabilities';
import ChromaticWaves from './ChromaticWaves';
// Revert tip: swap ChromaticWaves → ReflectBackground and restore tint/fill/opacity props.
// import ReflectBackground from './ReflectBackground';

// OriginKit Chromatic Waves — dark matches screenshot; light is a lifted equivalent.
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
  // Same hues, lifted toward the paper so dots sit flush.
  colors: ['#DCE3EA', '#D8E2DA'],
  cellSize: 34,
  gamma: 5,
  paletteBias: -2,
};

function readInitialState() {
  if (typeof window === 'undefined') {
    return { dark: true, animation: false };
  }
  const { reducedMotion, saveData, hidden } = getAmbientFlags();
  const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const animation = !reducedMotion && !saveData && !hidden;
  return { dark, animation };
}

export default function AmbientBackground() {
  const [state, setState] = useState(readInitialState);

  useEffect(() => {
    const scheme = window.matchMedia('(prefers-color-scheme: dark)');

    const sync = () => {
      const { reducedMotion, saveData, hidden } = getAmbientFlags();
      setState({
        dark: scheme.matches,
        animation: !reducedMotion && !saveData && !hidden,
      });
    };

    document.addEventListener('visibilitychange', sync);
    scheme.addEventListener('change', sync);
    sync();

    return () => {
      document.removeEventListener('visibilitychange', sync);
      scheme.removeEventListener('change', sync);
    };
  }, []);

  const preset = state.dark ? DARK : LIGHT;

  return (
    <div
      className="ambient-root"
      style={{
        background: preset.bgColor,
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
