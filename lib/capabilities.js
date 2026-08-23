const NO_WINDOW = {
  reducedMotion: true,
  webgl: false,
  coarsePointer: false,
  saveData: false,
};

let cached;

function detectWebGL() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: true })
      || canvas.getContext('webgl', { failIfMajorPerformanceCaveat: true });
    if (!gl) return false;
    const lose = gl.getExtension('WEBGL_lose_context');
    lose?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export function getMotionFlags() {
  if (typeof window === 'undefined') return NO_WINDOW;
  if (cached) return cached;

  cached = {
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    webgl: detectWebGL(),
    coarsePointer: window.matchMedia('(pointer: coarse)').matches,
    saveData: navigator.connection?.saveData === true,
  };
  return cached;
}

/** Motion prefs only — skips WebGL probe so ChromaticWaves can init immediately. */
export function getAmbientFlags() {
  if (typeof window === 'undefined') {
    return { reducedMotion: true, saveData: false, hidden: false };
  }
  return {
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    saveData: navigator.connection?.saveData === true,
    hidden: document.hidden,
  };
}

export function shouldRunAmbient() {
  const { reducedMotion, saveData } = getMotionFlags();
  return !reducedMotion && !saveData;
}

export function shouldRun3D() {
  const { reducedMotion, webgl, saveData } = getMotionFlags();
  return webgl && !reducedMotion && !saveData;
}
