'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { Renderer, Camera, Mesh, Plane, Program, RenderTarget } from 'ogl';

const PERLIN_VERT = `#version 300 es
in vec2 uv;
in vec2 position;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0., 1.);
}`;

const PERLIN_FRAG = `#version 300 es
precision mediump float;
uniform float uFrequency;
uniform float uTime;
uniform float uSpeed;
uniform float uValue;
uniform vec2 uResolution;
in vec2 vUv;
out vec4 fragColor;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0);
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  uv = (uv - 0.5) * vec2(aspect, 1.0) + 0.5;
  float hue = abs(snoise(vec3(uv * uFrequency, uTime * uSpeed)));
  vec3 rainbowColor = hsv2rgb(vec3(hue, 1.0, uValue));
  fragColor = vec4(rainbowColor, 1.0);
}`;

const DOT_VERT = `#version 300 es
in vec2 uv;
in vec2 position;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0., 1.);
}`;

const DOT_FRAG = `#version 300 es
precision highp float;
uniform vec2 uResolution;
uniform sampler2D uTexture;
uniform int uPaletteCount;
uniform vec3 uPalette[10];
uniform float uPaletteAlpha[10];
uniform float uCellSize;
uniform float uGamma;
uniform float uPaletteBias;
out vec4 fragColor;

void main() {
  vec2 pix = gl_FragCoord.xy;
  float cell = max(uCellSize, 1.0);

  vec2 cellIdx = floor(pix / cell);
  vec2 cellCenter = (cellIdx + 0.5) * cell;
  vec3 col = texture(uTexture, cellCenter / uResolution.xy).rgb;
  float gray = 0.3 * col.r + 0.59 * col.g + 0.11 * col.b;
  gray = pow(clamp(gray, 0.0001, 1.0), uGamma);

  vec2 cellUV = fract(pix / cell) - 0.5;
  float dist = length(cellUV);
  float radius = clamp(gray + uPaletteBias, 0.0, 1.0) * 0.5;
  float aa = fwidth(dist) + 1e-4;
  float mark = 1.0 - smoothstep(radius - aa, radius + aa, dist);

  float g2 = clamp(gray + uPaletteBias, 0.0, 1.0);
  int cnt = max(uPaletteCount, 1);
  vec3 dotCol;
  float dotOpacity;
  if (cnt <= 1) {
    dotCol = uPalette[0];
    dotOpacity = uPaletteAlpha[0];
  } else {
    float scaled = g2 * float(cnt - 1);
    int seg = int(floor(scaled));
    seg = clamp(seg, 0, cnt - 2);
    float f = clamp(scaled - float(seg), 0.0, 1.0);
    dotCol = mix(uPalette[seg], uPalette[seg + 1], f);
    dotOpacity = mix(uPaletteAlpha[seg], uPaletteAlpha[seg + 1], f);
  }
  fragColor = vec4(dotCol, mark * dotOpacity);
}`;

const MAX_COLORS = 10;

function mapLinear(value, inMin, inMax, outMin, outMax) {
  if (inMax === inMin) return outMin;
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}

function mapFrequencyUiToShader(ui) {
  return mapLinear(ui, 1, 10, 0.3, 6);
}
function mapSpeedUiToShader(ui) {
  return ui * 0.05;
}
function mapCellSizeUiToShader(ui) {
  return mapLinear(ui, 1, 100, 6, 60);
}
function mapGammaUiToShader(ui) {
  return mapLinear(ui, 1, 20, 0.5, 8);
}
function mapPaletteBiasUiToShader(ui) {
  return ui * 0.05;
}

function parseHex(input) {
  if (!input) return { r: 0, g: 0, b: 0, a: 1 };
  const hex = String(input).trim().replace(/^#/, '');
  if (hex.length === 6) {
    return {
      r: parseInt(hex.slice(0, 2), 16) / 255,
      g: parseInt(hex.slice(2, 4), 16) / 255,
      b: parseInt(hex.slice(4, 6), 16) / 255,
      a: 1,
    };
  }
  if (hex.length === 3) {
    return {
      r: parseInt(hex[0] + hex[0], 16) / 255,
      g: parseInt(hex[1] + hex[1], 16) / 255,
      b: parseInt(hex[2] + hex[2], 16) / 255,
      a: 1,
    };
  }
  return { r: 0, g: 0, b: 0, a: 1 };
}

function buildPalette(colorList) {
  const rgb = [];
  const alpha = [];
  for (let i = 0; i < MAX_COLORS; i++) {
    if (colorList[i] != null) {
      const { r, g, b, a } = parseHex(colorList[i]);
      rgb.push([r, g, b]);
      alpha.push(a);
    } else {
      rgb.push([0, 0, 0]);
      alpha.push(0);
    }
  }
  return { rgb, alpha };
}

/**
 * OriginKit Chromatic Waves — Perlin noise → halftone dots via OGL.
 * Props mirror the site controls panel.
 */
export default function ChromaticWaves({
  frequency = 2,
  speed = 1,
  bgColor = '#000000',
  colors = ['#2E4460', '#145932'],
  cellSize = 34,
  gamma = 6,
  paletteBias = -3,
  animation = true,
}) {
  const rootRef = useRef(null);
  const containerRef = useRef(null);
  const propsRef = useRef({ frequency, speed, colors, cellSize, gamma, paletteBias, animation });
  propsRef.current = { frequency, speed, colors, cellSize, gamma, paletteBias, animation };

  const kickRef = useRef(null);
  const playingRef = useRef(animation);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const root = rootRef.current;
    if (!container) return undefined;

    let renderer;
    let gl;
    try {
      renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio || 1, 2),
        alpha: true,
        depth: false,
        premultipliedAlpha: false,
        powerPreference: 'high-performance',
        webgl: 2,
      });
      gl = renderer.gl;
      if (!renderer.isWebgl2) {
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return undefined;
      }
      gl.clearColor(0, 0, 0, 0);
    } catch {
      return undefined;
    }

    container.appendChild(gl.canvas);
    Object.assign(gl.canvas.style, {
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
      display: 'block',
    });

    const camera = new Camera(gl, { near: 0.1, far: 100 });
    camera.position.set(0, 0, 3);

    const p = propsRef.current;
    const paletteColors = Array.isArray(p.colors) && p.colors.length ? p.colors : ['#FFFFFF'];
    const palette = buildPalette(paletteColors);
    const paletteCount = Math.min(MAX_COLORS, Math.max(1, paletteColors.length));

    let perlinProgram;
    let dotProgram;
    let perlinMesh;
    let dotMesh;
    let renderTarget;
    let rafId = null;
    let lastTime = 0;
    let running = true;

    try {
      perlinProgram = new Program(gl, {
        vertex: PERLIN_VERT,
        fragment: PERLIN_FRAG,
        depthTest: false,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uFrequency: { value: mapFrequencyUiToShader(p.frequency) },
          uSpeed: { value: p.animation ? mapSpeedUiToShader(p.speed) : 0 },
          uValue: { value: 1 },
          uResolution: { value: [1, 1] },
        },
      });
      perlinMesh = new Mesh(gl, {
        geometry: new Plane(gl, { width: 2, height: 2 }),
        program: perlinProgram,
      });

      renderTarget = new RenderTarget(gl);

      dotProgram = new Program(gl, {
        vertex: DOT_VERT,
        fragment: DOT_FRAG,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        uniforms: {
          uResolution: { value: [1, 1] },
          uTexture: { value: renderTarget.texture },
          uPaletteCount: { value: paletteCount },
          uPalette: { value: palette.rgb },
          uPaletteAlpha: { value: palette.alpha },
          uCellSize: { value: mapCellSizeUiToShader(p.cellSize) },
          uGamma: { value: mapGammaUiToShader(p.gamma) },
          uPaletteBias: { value: mapPaletteBiasUiToShader(p.paletteBias) },
        },
      });
      dotMesh = new Mesh(gl, {
        geometry: new Plane(gl, { width: 2, height: 2 }),
        program: dotProgram,
      });
    } catch {
      if (gl.canvas.parentElement === container) container.removeChild(gl.canvas);
      return undefined;
    }

    const doResize = () => {
      const width = Math.max(1, container.clientWidth || window.innerWidth);
      const height = Math.max(1, container.clientHeight || window.innerHeight);
      renderer.setSize(width, height);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
      renderTarget.setSize?.(gl.canvas.width, gl.canvas.height);
      perlinProgram.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];
      dotProgram.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];
    };

    const renderOnce = () => {
      renderer.render({ scene: perlinMesh, camera, target: renderTarget });
      dotProgram.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];
      renderer.render({ scene: dotMesh, camera });
    };

    const syncUniforms = () => {
      const cur = propsRef.current;
      const cols = Array.isArray(cur.colors) && cur.colors.length ? cur.colors : ['#FFFFFF'];
      const pal = buildPalette(cols);
      perlinProgram.uniforms.uFrequency.value = mapFrequencyUiToShader(cur.frequency);
      perlinProgram.uniforms.uSpeed.value = cur.animation && !document.hidden
        ? mapSpeedUiToShader(cur.speed)
        : 0;
      dotProgram.uniforms.uPaletteCount.value = Math.min(MAX_COLORS, Math.max(1, cols.length));
      dotProgram.uniforms.uPalette.value = pal.rgb;
      dotProgram.uniforms.uPaletteAlpha.value = pal.alpha;
      dotProgram.uniforms.uCellSize.value = mapCellSizeUiToShader(cur.cellSize);
      dotProgram.uniforms.uGamma.value = mapGammaUiToShader(cur.gamma);
      dotProgram.uniforms.uPaletteBias.value = mapPaletteBiasUiToShader(cur.paletteBias);
    };

    const frameInterval = 1000 / 30;
    const update = (time) => {
      if (!running) return;
      const cur = propsRef.current;
      playingRef.current = cur.animation && !document.hidden;
      if (!playingRef.current) {
        rafId = null;
        return;
      }
      if (time - lastTime < frameInterval) {
        rafId = requestAnimationFrame(update);
        return;
      }
      lastTime = time;
      syncUniforms();
      perlinProgram.uniforms.uTime.value = time * 0.001;
      renderer.render({ scene: perlinMesh, camera, target: renderTarget });
      dotProgram.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];
      renderer.render({ scene: dotMesh, camera });
      rafId = requestAnimationFrame(update);
    };

    const kick = () => {
      if (!running || rafId) return;
      lastTime = 0;
      rafId = requestAnimationFrame(update);
    };
    kickRef.current = kick;

    doResize();
    renderOnce();
    root?.classList.add('chromatic-waves--ready');
    if (p.animation) kick();

    let resizePending = false;
    const onResize = () => {
      if (resizePending) return;
      resizePending = true;
      requestAnimationFrame(() => {
        resizePending = false;
        doResize();
        if (!playingRef.current) renderOnce();
        else if (!rafId) kick();
      });
    };

    const onVisibility = () => {
      if (!document.hidden && propsRef.current.animation) kick();
    };

    const observer = new ResizeObserver(onResize);
    observer.observe(container);
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      kickRef.current = null;
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      if (gl.canvas.parentElement === container) container.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  useEffect(() => {
    if (animation) kickRef.current?.();
  }, [animation, frequency, speed, cellSize, gamma, paletteBias, colors]);

  return (
    <div
      ref={rootRef}
      className="chromatic-waves"
      style={{
        background: bgColor,
        '--ambient-bg': bgColor,
        '--ambient-dot': colors[0],
        '--ambient-cell': `${cellSize}px`,
      }}
    >
      <div ref={containerRef} className="chromatic-waves__canvas" />
    </div>
  );
}
