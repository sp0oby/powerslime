"use client";

import { useEffect, useRef } from "react";

// Fullscreen metaball slime, drawn in the collection's cartoon style:
// ink outline, two-tone body, crescent highlight. Colors are driven by
// `slime:tint` events so each section can recolor the pool.

const VERT = `#version 300 es
in vec2 a; void main(){ gl_Position = vec4(a,0.,1.); }`;

const FRAG = `#version 300 es
precision highp float;
out vec4 o;
uniform vec2 uRes; uniform float uT; uniform vec2 uM; uniform float uMs;
uniform vec3 uA; uniform vec3 uB; uniform float uAg; uniform float uPh;

// softened quartic falloff: no center singularity, and neighbours don't
// sum into one giant bulge the way 1/d^2 does
float blob(vec2 p, vec2 c, float r){ vec2 d=p-c; float k=r*r*1.25/(dot(d,d)+r*r*.25); return k*k; }

float field(vec2 p){
  float asp = uRes.x/uRes.y;
  float f = 0.;
  float t = uT;
  // pool along the bottom edge. uPh is a phase accumulated on the CPU, so
  // scroll speed can change the wave rate without the phase jumping.
  for(int i=0;i<13;i++){
    float fi=float(i);
    float x = mix(-asp-.1, asp+.1, fi/12.) + sin(t*.23+fi*1.9)*.08;
    float y = -1.03 + (.035+.03*uAg)*sin(uPh+fi*1.3) + .025*cos(t*.31+fi*2.1);
    f += blob(p, vec2(x,y), .09 + .025*sin(fi*2.7));
  }
  // splashes climbing the side walls
  for(int i=0;i<4;i++){
    float fi=float(i);
    float s = i<2 ? -1. : 1.;
    float k = mod(fi,2.);
    vec2 c = vec2(s*(asp-.01-k*.04), -.86+k*.16 + .03*sin(t*.4+fi));
    f += blob(p, c, .075-.025*k);
  }
  // loose droplets that rise out of the pool and fall back;
  // scrolling kicks them higher
  for(int i=0;i<10;i++){
    float fi=float(i);
    float ph = fract(t*.05 + fi*.137);
    float h = sin(ph*3.14159);
    vec2 c = vec2(sin(fi*12.9)*asp*.94, -1.0 + h*(.12+.1*fract(fi*.37)+.08*uAg));
    f += blob(p, c, .02+.012*fract(fi*.71));
  }
  // drips hanging off the top corners, stretching and letting go
  for(int i=0;i<6;i++){
    float fi=float(i);
    float s = i<3 ? -1. : 1.;
    float x = s*asp*(.62+.12*mod(fi,3.)+.03*sin(fi*5.1));
    f += blob(p, vec2(x, 1.05), .055+.015*sin(fi*3.3));      // the lip
    float ph = fract(t*(.06+.015*mod(fi,3.)) + fi*.29);
    float fall = ph*ph;
    f += blob(p, vec2(x, .99 - fall*.55), .028*(1.-fall*.5)); // the drop
  }
  // cursor drop
  f += blob(p, uM, .032*max(uMs,.01));
  return f;
}

void main(){
  vec2 uv = gl_FragCoord.xy/uRes;
  float asp = uRes.x/uRes.y;
  vec2 p = (uv*2.-1.)*vec2(asp,1.);
  float px = 2./uRes.y;
  float f = field(p);
  vec2 e = vec2(px,0.);
  vec2 g = vec2(field(p+e.xy)-field(p-e.xy), field(p+e.yx)-field(p-e.yx))/(2.*px);
  float gl = max(length(g),1e-4);
  float dpx = (f-1.)/gl/px;           // signed distance to surface, in pixels
  // the estimate only holds near the surface; deep inside, steep peaks
  // would otherwise read as "close to an edge" and draw ink rings
  dpx = mix(dpx, 400., smoothstep(1.5, 2.6, f));
  if(dpx < -1.5){ o = vec4(0.); return; }
  float ink = 2.2;
  vec2 n = -g/gl;                      // outward normal in 2D
  // lit body with a darker lower rim, like the cel shading in the art
  float lit = dot(n, normalize(vec2(-.4,.9)));
  vec3 body = mix(mix(uB, uA, .55), uA, smoothstep(-.6, .3, lit));
  body = mix(body, mix(uA, vec3(1.), .25), smoothstep(.4, .95, lit)*smoothstep(ink, ink+20., dpx)*.5);
  // crescent highlight hugging the upper-left inner edge
  float hl = smoothstep(.6,.85, dot(n, normalize(vec2(-.55,.85))))
           * smoothstep(ink+2., ink+4., dpx) * (1.-smoothstep(ink+8., ink+11., dpx));
  // small gloss dot
  vec3 col = mix(body, vec3(1.), hl*.9);
  vec3 inkC = uB*.25;
  float edge = smoothstep(ink-.8, ink+.8, dpx);
  col = mix(inkC, col, edge);
  float a = smoothstep(-1.5, .5, dpx);
  o = vec4(col*a, a);
}`;

type RGB = [number, number, number];
const hex = (h: string): RGB => {
  const n = parseInt(h.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

export function tint(a: string, b: string) {
  window.dispatchEvent(new CustomEvent("slime:tint", { detail: { a, b } }));
}

export default function SlimeCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current!;
    const gl = cv.getContext("webgl2", { premultipliedAlpha: true, alpha: true, antialias: false });
    if (!gl) return;

    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const U = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = U("uRes"), uT = U("uT"), uM = U("uM"), uMs = U("uMs"), uA = U("uA"), uB = U("uB"), uAg = U("uAg"), uPh = U("uPh");

    const scale = Math.min(window.devicePixelRatio, 1.5) * 0.6;
    const resize = () => {
      cv.width = Math.round(innerWidth * scale);
      cv.height = Math.round(innerHeight * scale);
      gl.viewport(0, 0, cv.width, cv.height);
    };
    resize();
    addEventListener("resize", resize);

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let col: { a: RGB; b: RGB } = { a: hex("#6cff2e"), b: hex("#0f4a12") };
    let target = { ...col };
    const onTint = (e: Event) => {
      const d = (e as CustomEvent).detail;
      target = { a: hex(d.a), b: hex(d.b) };
    };
    addEventListener("slime:tint", onTint);

    // cursor drop trails the pointer, shrinks when idle
    const m = { x: 0, y: -1.4, tx: 0, ty: -1.4, s: 0, ts: 0, last: 0 };
    const onMove = (e: PointerEvent) => {
      const asp = innerWidth / innerHeight;
      m.tx = (e.clientX / innerWidth * 2 - 1) * asp;
      m.ty = -(e.clientY / innerHeight * 2 - 1);
      m.ts = 1;
      m.last = performance.now();
    };
    addEventListener("pointermove", onMove);

    let lastY = scrollY, ag = 0, raf = 0, visible = true;
    const onVis = () => (visible = !document.hidden);
    document.addEventListener("visibilitychange", onVis);

    const t0 = performance.now();
    let lastNow = t0, ph = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const t = reduce ? 10 : (now - t0) / 1000;
      const lerp = (x: number, y: number, k: number) => x + (y - x) * k;
      for (let i = 0; i < 3; i++) {
        col.a[i] = lerp(col.a[i], target.a[i], 0.04);
        col.b[i] = lerp(col.b[i], target.b[i], 0.04);
      }
      if (now - m.last > 1600) m.ts = 0;
      m.x = lerp(m.x, m.tx, 0.12);
      m.y = lerp(m.y, m.ty, 0.12);
      m.s = lerp(m.s, m.ts, 0.06);
      const dy = Math.abs(scrollY - lastY);
      lastY = scrollY;
      ag = lerp(ag, Math.min(dy / 50, 1.5), 0.06);
      // integrate wave phase so a changing rate never makes it jump
      const dt = Math.min((now - lastNow) / 1000, 0.1);
      lastNow = now;
      if (!reduce) ph += dt * (0.5 + ag * 1.4);

      gl.uniform2f(uRes, cv.width, cv.height);
      gl.uniform1f(uT, t);
      gl.uniform2f(uM, m.x, m.y);
      gl.uniform1f(uMs, m.s);
      gl.uniform3fv(uA, col.a);
      gl.uniform3fv(uB, col.b);
      gl.uniform1f(uAg, ag);
      gl.uniform1f(uPh, ph);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("slime:tint", onTint);
      removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className="slime-canvas" aria-hidden />;
}
