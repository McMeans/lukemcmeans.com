'use client';

import { useEffect, useRef } from 'react';

const VERT = `
attribute vec4 a_position;
void main() { gl_Position = a_position; }
`;

const FRAG = `
precision highp float;

uniform vec2 iResolution;
uniform float iTime;
uniform float u_speed;
uniform vec3 u_tint;
uniform vec3 u_base;
uniform float u_scale;
uniform float u_contrast;
uniform float u_iterations;
uniform vec2 u_pointer;
uniform float u_pointerStrength;

#define TAU 6.28318530718
#define MAX_ITER 8

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    float time = iTime * u_speed + 23.0;
    vec2 uv = fragCoord.xy / iResolution.xy;

    vec2 p = mod(uv * TAU * u_scale, TAU) - 250.0;

    vec2 pointerDelta = uv - u_pointer;
    pointerDelta.x *= iResolution.x / max(iResolution.y, 1.0);
    float pointerDist = length(pointerDelta);
    p += normalize(pointerDelta + 1e-4) * u_pointerStrength * exp(-pointerDist * 4.0) * TAU;

    vec2 i = vec2(p);
    float c = 1.0;
    float inten = 0.005;
    float used = 0.0;

    for (int n = 0; n < MAX_ITER; n++) {
        if (float(n) >= u_iterations) break;
        float t = time * (1.0 - (3.5 / float(n + 1)));
        i = p + vec2(
            cos(t - i.x) + sin(t + i.y),
            sin(t - i.y) + cos(t + i.x)
        );
        float sx = sin(i.x + t) / inten;
        float sy = cos(i.y + t) / inten;
        sx = (sx >= 0.0 ? 1.0 : -1.0) * max(abs(sx), 0.05);
        sy = (sy >= 0.0 ? 1.0 : -1.0) * max(abs(sy), 0.05);
        c += 1.0 / length(vec2(p.x / sx, p.y / sy));
        used += 1.0;
    }

    c /= max(used, 1.0);
    c = 1.17 - pow(c, 1.4);

    float lum = pow(abs(c), u_contrast);
    vec3 colour = mix(u_base, u_tint, clamp(lum * 2.0, 0.0, 1.0));

    fragColor = vec4(colour, 1.0);
}

void main() { mainImage(gl_FragColor, gl_FragCoord.xy); }
`;

function hexToRgb(hex) {
  const raw = String(hex || '').replace('#', '').trim();
  const n = raw.length === 3 ? raw.split('').map((c) => c + c).join('') : raw;
  const v = Number.parseInt(n, 16);
  if (!Number.isFinite(v)) return [0.5, 0.5, 0.5];
  return [(v >> 16 & 255) / 255, (v >> 8 & 255) / 255, (v & 255) / 255];
}

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(info || 'shader compile failed');
  }
  return shader;
}

export default function ReflectBackground({
  tint = '#848484',
  backgroundColor = '#000000',
  inkBase,
  scale = 1.5,
  contrast = 8.5,
  iterations = 4,
  opacity = 53,
  blur = 0,
  pointerStrength = 21,
  animation = true,
  speed = 55,
}) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const kickRef = useRef(null);
  const propsRef = useRef({
    tint, inkBase, scale, contrast, iterations, pointerStrength, animation, speed,
  });
  propsRef.current = { tint, inkBase, scale, contrast, iterations, pointerStrength, animation, speed };

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return undefined;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      powerPreference: 'low-power',
    });
    if (!gl) return undefined;

    let program;
    let buffer;
    try {
      const vs = compile(gl, gl.VERTEX_SHADER, VERT);
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
      program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || 'program link failed');
      }
      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -1, -1, 1, -1, -1, 1, 1, 1,
      ]), gl.STATIC_DRAW);
    } catch {
      const lose = gl.getExtension('WEBGL_lose_context');
      lose?.loseContext();
      return undefined;
    }

    const loc = {
      position: gl.getAttribLocation(program, 'a_position'),
      resolution: gl.getUniformLocation(program, 'iResolution'),
      time: gl.getUniformLocation(program, 'iTime'),
      speed: gl.getUniformLocation(program, 'u_speed'),
      tint: gl.getUniformLocation(program, 'u_tint'),
      base: gl.getUniformLocation(program, 'u_base'),
      scale: gl.getUniformLocation(program, 'u_scale'),
      contrast: gl.getUniformLocation(program, 'u_contrast'),
      iterations: gl.getUniformLocation(program, 'u_iterations'),
      pointer: gl.getUniformLocation(program, 'u_pointer'),
      pointerStrength: gl.getUniformLocation(program, 'u_pointerStrength'),
    };

    const pointer = [0.5, 0.5];
    let pointerInside = false;
    let influence = 0;
    let elapsed = 0;
    let lastNow = performance.now();
    let raf = 0;
    let running = true;

    const resize = () => {
      const rect = root.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(rect.width * dpr));
      const h = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
    };

    const draw = (now) => {
      if (!running) return;
      const p = propsRef.current;
      const dt = Math.min(0.05, (now - lastNow) / 1000);
      lastNow = now;
      if (p.animation && !document.hidden) elapsed += dt;

      const target = pointerInside ? 1 : 0;
      influence += (target - influence) * 0.08;

      resize();
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(loc.position);
      gl.vertexAttribPointer(loc.position, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(loc.resolution, canvas.width, canvas.height);
      gl.uniform1f(loc.time, elapsed);
      gl.uniform1f(loc.speed, p.speed / 200);
      gl.uniform3fv(loc.tint, hexToRgb(p.tint));
      gl.uniform3fv(loc.base, hexToRgb(p.inkBase || '#000000'));
      gl.uniform1f(loc.scale, p.scale);
      gl.uniform1f(loc.contrast, p.contrast);
      gl.uniform1f(loc.iterations, Math.max(0, Math.min(8, p.iterations)));
      gl.uniform2f(loc.pointer, pointer[0], pointer[1]);
      gl.uniform1f(loc.pointerStrength, (p.pointerStrength / 100) * influence);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      if (p.animation && !document.hidden) {
        raf = requestAnimationFrame(draw);
      } else {
        raf = 0;
      }
    };

    const kick = () => {
      if (!running || raf) return;
      lastNow = performance.now();
      raf = requestAnimationFrame(draw);
    };

    const onMove = (event) => {
      const rect = root.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;
      pointer[0] = (event.clientX - rect.left) / rect.width;
      pointer[1] = 1 - (event.clientY - rect.top) / rect.height;
      pointerInside = true;
      if (!raf) kick();
    };

    const onLeave = () => {
      pointerInside = false;
      if (!raf) kick();
    };

    const onVisibility = () => {
      if (!document.hidden) kick();
    };

    kickRef.current = kick;
    resize();
    kick();

    const observer = new ResizeObserver(() => {
      if (!raf) kick();
    });
    observer.observe(root);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('blur', onLeave);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      kickRef.current = null;
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('blur', onLeave);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  useEffect(() => {
    if (animation) kickRef.current?.();
  }, [animation]);

  return (
    <div
      ref={rootRef}
      className="reflect-bg"
      style={{ background: backgroundColor }}
    >
      <canvas
        ref={canvasRef}
        style={{ opacity: Math.max(0, Math.min(100, opacity)) / 100 }}
      />
      {blur > 0 ? (
        <div
          className="reflect-bg__blur"
          style={{ backdropFilter: `blur(${blur}px)`, WebkitBackdropFilter: `blur(${blur}px)` }}
        />
      ) : null}
    </div>
  );
}
