/* Quietroot — a quiet garden for busy minds. */
"use strict";
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const rand = (a, b) => a + Math.random() * (b - a);
const pick = a => a[Math.floor(Math.random() * a.length)];
const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ================= icons (24px line set) ================= */
const ICON = {
  home: '<path d="M12 21v-9"/><path d="M12 12c0-4.5 3-7.5 8-7.5 0 5-3 8-8 7.5Z"/><path d="M12 15c0-3.5-2.5-6-7-6 0 4 2.5 6.5 7 6Z"/>',
  focus: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9.5 2.5h5"/>',
  breathe: '<path d="M3 8h10a3 3 0 1 0-3-3"/><path d="M3 12h15a3 3 0 1 1-3 3"/><path d="M3 16h7"/>',
  path: '<path d="M10 6h10M10 12h10M10 18h10"/><path d="m4 6 1.2 1.2L7.5 5M4 12l1.2 1.2L7.5 11"/><circle cx="5.5" cy="18" r="1.3"/>',
  settings: '<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2.2"/><circle cx="9" cy="17" r="2.2"/>',
  music: '<path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
  musicOff: '<path d="M9 18V9m0-4 11-2v11"/><circle cx="6.5" cy="18" r="2.5"/><path d="M3 3l18 18"/>',
  back: '<path d="M15 5l-7 7 7 7"/>', chev: '<path d="m9 5 7 7-7 7"/>', check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  up: '<path d="m6 15 6-6 6 6"/>', down: '<path d="m6 9 6 6 6-6"/>', x: '<path d="M6 6l12 12M18 6 6 18"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20Z"/>',
  leaf: '<path d="M5 19c0-8 5-13 14-14 0 9-5 14-14 14Z"/><path d="M5 19 13 11"/>',
  sparkle: '<path d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
  moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z"/>',
  erase: '<path d="m5 15 7.5-7.5 6 6L14.5 17.5H8.5Z"/><path d="M14 20h6"/>',
  wake: '<path d="M3 18h18"/><path d="M7 18a5 5 0 0 1 10 0"/><path d="M12 7v3M5.5 10.5 7 12M18.5 10.5 17 12"/>',
  meds: '<path d="M10.5 3.5a4.95 4.95 0 0 1 7 7l-7 7a4.95 4.95 0 0 1-7-7Z"/><path d="m7 7 7 7"/>',
  shower: '<path d="M4 20V8a4 4 0 0 1 4-4h1a4 4 0 0 1 4 4"/><path d="M10 8h6"/><path d="M12 12v1M15 12v2M18 12v1M13 16v1M16 16v2"/>',
  dress: '<path d="M8 3 4 6l2 4 2-1v12h8V9l2 1 2-4-4-3c-.5 2-2 3-4 3S8.5 5 8 3Z"/>',
  coffee: '<path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2v3M12 2v3"/>',
  work: '<rect x="4" y="5" width="16" height="11" rx="2"/><path d="M2 19h20"/>',
  email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  errand: '<path d="M5 8h14l-1 12H6Z"/><path d="M9 8a3 3 0 0 1 6 0"/>',
  move: '<path d="M6 7v10M18 7v10M3 10v4M21 10v4M6 12h12"/>',
  outside: '<path d="M12 21v-5"/><path d="m12 3-6 9h4l-4 4h12l-4-4h4Z"/>',
  cook: '<path d="M4 11h16v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Z"/><path d="M2 11h2M20 11h2M9 7c0-1.5 1-1.5 1-3M14 7c0-1.5 1-1.5 1-3"/>',
  chores: '<path d="m15 3-4 9"/><path d="M6 12h9l1 9H5Z"/><path d="M8.5 16v5M11.5 16v5"/>',
  call: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  bed: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z"/>',
  own: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z"/>'
};
const icon = (n, cls = "") => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[n] || ICON.own}</svg>`;

/* ================= save data (this device only) ================= */
const today = (d = new Date()) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
const DEF = {
  plants: [], days: [], sound: false, music: false, vol: 0.5, track: "garden", theme: "dark", contrast: false, fs: 1,
  motion: !matchMedia("(prefers-reduced-motion: reduce)").matches,
  breaths: 5, bpat: 0, focusMin: 15, hideClock: false, bed: 0, rake: 4,
  today: {}, feelLog: [], path: { steps: [], done: [], day: "" },
  onboarded: false, goals: [],
  reminders: { plan: { on: false, time: "08:30" }, focus: { on: false, time: "10:30" }, wind: { on: false, time: "21:30" } },
  remFired: {}, effects: [], pathLog: {},
  fsteps: [], ftask: "", companion: false, quiet: false, quietPrevMusic: true
};
let S = structuredClone(DEF);
try { S = Object.assign(S, JSON.parse(localStorage.getItem("calmGarden2") || "{}")); } catch (e) {}
if (!S.path || !Array.isArray(S.path.steps)) S.path = structuredClone(DEF.path);
if (!Array.isArray(S.days)) S.days = [];
S.reminders = Object.assign(structuredClone(DEF.reminders), S.reminders || {});
for (const k of ["effects", "goals", "fsteps"]) if (!Array.isArray(S[k])) S[k] = [];
for (const k of ["remFired", "pathLog"]) if (!S[k] || typeof S[k] !== "object") S[k] = {};
if (S.fs > 1.3 || S.fs < .85) S.fs = 1;
if (S.today.day !== today()) S.today = { day: today() };
if (S.path.day !== today()) { S.path.done = S.path.steps.map(() => false); S.path.day = today(); }
const save = () => { try { localStorage.setItem("calmGarden2", JSON.stringify(S)); } catch (e) {} };

/* ================= sound ================= */
let ac;
function tone(freq = 523, dur = 0.35, vol = 0.06) {
  if (!S.sound) return;
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime;
    o.type = "sine"; o.frequency.value = freq;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + 0.03); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(ac.destination); o.start(t); o.stop(t + dur + 0.05);
  } catch (e) {}
}
const chime = () => { tone(523, .5); setTimeout(() => tone(659, .5), 130); setTimeout(() => tone(784, .8), 260); };

/* ---------- background music: 5 tracks, all generated live (no audio files, no licensing) ----------
   Each track = slow chord pads + an optional sparse melody on a scale where no notes clash,
   plus an optional nature layer made from filtered noise. Nothing loops exactly. */
const NOTE = { A1: 55, D2: 73.42, E2: 82.41, F2: 87.31, G2: 98, A2: 110, B2: 123.47, C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, Fs3: 185, G3: 196, A3: 220, B3: 246.94, C4: 261.63, D4: 293.66, E4: 329.63, Fs4: 369.99, G4: 392, A4: 440, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, Fs5: 739.99, G5: 783.99, A5: 880 };
const TRACKS = {
  garden: { name: "Garden", d: "Warm chords and a soft music box", ic: "home",
    chords: [[NOTE.C3, NOTE.E3, NOTE.G3, NOTE.B3], [NOTE.A2, NOTE.C3, NOTE.E3, NOTE.G3], [NOTE.F2, NOTE.A2, NOTE.C3, NOTE.E3], [NOTE.G2, NOTE.B2, NOTE.D3, NOTE.E3]],
    melody: [NOTE.G4, NOTE.A4, NOTE.C5, NOTE.D5, NOTE.E5, NOTE.G5, NOTE.A5], chordSec: 10, gap: [1800, 4800], bell: 3, cutoff: 1400, echo: .35 },
  rain: { name: "Rain", d: "Gentle rainfall with slow, low chords", ic: "shower",
    chords: [[NOTE.F2, NOTE.C3, NOTE.E3, NOTE.A3], [NOTE.D2, NOTE.A2, NOTE.C3, NOTE.F3], [NOTE.A1, NOTE.E2, NOTE.C3, NOTE.G3], [NOTE.C3, NOTE.G3, NOTE.D4, NOTE.E4]],
    melody: [NOTE.C4, NOTE.E4, NOTE.G4, NOTE.A4, NOTE.C5], chordSec: 13, gap: [4000, 9000], bell: 2, cutoff: 950, echo: .3, layer: "rain" },
  ocean: { name: "Ocean", d: "Slow waves over a deep, steady drone", ic: "breathe",
    chords: [[NOTE.D2, NOTE.A2, NOTE.D3, NOTE.E3], [NOTE.D2, NOTE.A2, NOTE.Fs3, NOTE.A3], [NOTE.D2, NOTE.G2, NOTE.D3, NOTE.E3], [NOTE.D2, NOTE.A2, NOTE.D3, NOTE.Fs3]],
    melody: [NOTE.D4, NOTE.E4, NOTE.Fs4, NOTE.A4, NOTE.B4], chordSec: 14, gap: [6000, 12000], bell: 2, cutoff: 800, echo: .4, layer: "waves" },
  night: { name: "Night sky", d: "Quiet, dreamy chords and distant bells", ic: "moon",
    chords: [[NOTE.A2, NOTE.E3, NOTE.G3, NOTE.B3, NOTE.C4], [NOTE.F2, NOTE.C3, NOTE.E3, NOTE.G3], [NOTE.D2, NOTE.A2, NOTE.C3, NOTE.F3], [NOTE.E2, NOTE.B2, NOTE.D3, NOTE.G3]],
    melody: [NOTE.A4, NOTE.C5, NOTE.D5, NOTE.E5, NOTE.G5, NOTE.A5], chordSec: 12, gap: [2600, 7000], bell: 2.76, cutoff: 1100, echo: .5 },
  drift: { name: "Drift", d: "Pads only, no melody. Best for focus", ic: "focus",
    chords: [[NOTE.C3, NOTE.G3, NOTE.D4, NOTE.E4], [NOTE.A2, NOTE.E3, NOTE.B3, NOTE.C4], [NOTE.F2, NOTE.C3, NOTE.G3, NOTE.A3], [NOTE.G2, NOTE.D3, NOTE.A3, NOTE.B3]],
    melody: null, chordSec: 16, cutoff: 900, echo: .25 }
};
const music = { master: null, timers: [], nodes: [] };
const musicVol = () => 0.28 * S.vol;
function audio() { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === "suspended") ac.resume(); return ac; }
let noiseBuf = null;
function noise(a) {
  if (noiseBuf) return noiseBuf;
  noiseBuf = a.createBuffer(1, a.sampleRate * 4, a.sampleRate);
  const d = noiseBuf.getChannelData(0); let last = 0;
  for (let i = 0; i < d.length; i++) { const w = Math.random() * 2 - 1; last = (last + 0.04 * w) / 1.04; d[i] = last * 3.2 + w * 0.12; } // soft brown-ish noise
  return noiseBuf;
}
function musicStart() {
  if (music.master || !S.music) return;
  let a; try { a = audio(); } catch (e) { return; }
  const T = TRACKS[S.track] || TRACKS.garden;
  const master = a.createGain(); master.gain.value = 0; master.gain.linearRampToValueAtTime(musicVol(), a.currentTime + 4);
  const warm = a.createBiquadFilter(); warm.type = "lowpass"; warm.frequency.value = T.cutoff; warm.Q.value = 0.3;
  const echo = a.createDelay(2); echo.delayTime.value = 0.48;
  const fb = a.createGain(); fb.gain.value = 0.38; const wet = a.createGain(); wet.gain.value = T.echo;
  echo.connect(fb).connect(echo); echo.connect(wet).connect(warm); warm.connect(master).connect(a.destination);
  Object.assign(music, { master, step: 0, nodes: [] });
  const later = (fn, ms) => { music.timers.push(setTimeout(fn, ms)); if (music.timers.length > 80) music.timers = music.timers.slice(-40); };

  const pad = () => {
    if (music.master !== master) return;
    const t = a.currentTime, len = T.chordSec + 3, chord = T.chords[music.step++ % T.chords.length];
    chord.forEach((f, i) => [["sine", 0], ["triangle", 3]].forEach(([type, cents]) => {
      const o = a.createOscillator(), g = a.createGain(), peak = (type === "sine" ? 0.055 : 0.022) * (i === 0 ? 1.25 : 1) * (4 / chord.length);
      o.type = type; o.frequency.value = f; o.detune.value = cents + rand(-3, 3);
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(peak, t + 3.5); g.gain.setValueAtTime(peak, t + len - 5); g.gain.linearRampToValueAtTime(0, t + len);
      o.connect(g).connect(warm); o.start(t); o.stop(t + len + .2);
    }));
    later(pad, T.chordSec * 1000);
  };
  const note = () => {
    if (music.master !== master) return;
    const t = a.currentTime, f = pick(T.melody), o = a.createOscillator(), o2 = a.createOscillator(), g = a.createGain(), g2 = a.createGain();
    o.type = o2.type = "sine"; o.frequency.value = f; o2.frequency.value = f * T.bell; g2.gain.value = 0.12;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.042, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 3.4);
    o.connect(g); o2.connect(g2).connect(g); g.connect(warm); g.connect(echo);
    o.start(t); o2.start(t); o.stop(t + 3.5); o2.stop(t + 3.5);
    later(note, Math.random() < 0.2 ? 650 : rand(...T.gap));
  };
  // nature layers: they skip the low-pass so they stay airy, and go straight to the master
  if (T.layer === "rain") {
    const src = a.createBufferSource(); src.buffer = noise(a); src.loop = true;
    const hp = a.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 700;
    const lp = a.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 5200;
    const g = a.createGain(); g.gain.value = 0.55;
    src.connect(hp).connect(lp).connect(g).connect(master); src.start();
    music.nodes.push(src);
    const drift = () => { if (music.master !== master) return; g.gain.linearRampToValueAtTime(rand(0.4, 0.7), a.currentTime + 6); later(drift, 6000); };
    drift();
    const drop = () => { // the odd heavier drop on a leaf
      if (music.master !== master) return;
      const t = a.currentTime, s = a.createBufferSource(), bp = a.createBiquadFilter(), dg = a.createGain();
      s.buffer = noise(a); bp.type = "bandpass"; bp.frequency.value = rand(1800, 3600); bp.Q.value = 6;
      dg.gain.setValueAtTime(0.5, t); dg.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
      s.connect(bp).connect(dg).connect(master); s.start(t, rand(0, 3)); s.stop(t + 0.1);
      later(drop, rand(120, 900));
    };
    drop();
  }
  if (T.layer === "waves") {
    const src = a.createBufferSource(); src.buffer = noise(a); src.loop = true;
    const lp = a.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 400;
    const g = a.createGain(); g.gain.value = 0.05;
    src.connect(lp).connect(g).connect(master); src.start();
    music.nodes.push(src);
    const wave = () => { // each wave rolls in (~4 s) and draws back (~6 s), never quite the same
      if (music.master !== master) return;
      const t = a.currentTime, up = rand(3.5, 5), down = rand(5, 7.5), peak = rand(0.55, 0.9);
      g.gain.cancelScheduledValues(t); g.gain.setValueAtTime(g.gain.value, t);
      g.gain.linearRampToValueAtTime(peak, t + up); g.gain.linearRampToValueAtTime(0.06, t + up + down);
      lp.frequency.cancelScheduledValues(t); lp.frequency.setValueAtTime(lp.frequency.value, t);
      lp.frequency.linearRampToValueAtTime(rand(1100, 1600), t + up); lp.frequency.linearRampToValueAtTime(380, t + up + down);
      later(wave, (up + down) * 1000 - 300);
    };
    wave();
  }
  pad();
  if (T.melody) later(note, 2500);
}
function musicStop() {
  if (!music.master) return;
  const m = music.master, nodes = music.nodes, t = ac.currentTime;
  music.timers.forEach(clearTimeout); music.timers = []; music.master = null; music.nodes = [];
  m.gain.cancelScheduledValues(t); m.gain.setValueAtTime(m.gain.value, t); m.gain.linearRampToValueAtTime(0, t + 1.5);
  setTimeout(() => { nodes.forEach(n => { try { n.stop(); } catch (e) {} }); m.disconnect(); }, 1700);
}
function setTrack(id) {
  if (!TRACKS[id]) return;
  S.track = id; save();
  if (music.master) { musicStop(); setTimeout(musicStart, 900); } // gentle cross-fade
  else if (S.music) musicStart();
}
function musicVolume() { if (music.master) { const t = ac.currentTime; music.master.gain.cancelScheduledValues(t); music.master.gain.linearRampToValueAtTime(musicVol(), t + 0.3); } }
["pointerdown", "keydown"].forEach(ev => document.addEventListener(ev, () => { if (S.music) musicStart(); }, { capture: true }));
document.addEventListener("visibilitychange", () => { if (ac) document.hidden ? ac.suspend() : ac.resume(); });

/* ================= palette & activities ================= */
const COLORS = [{ n: "Coral", v: "#ff8a6b" }, { n: "Blue", v: "#6fb3e8" }, { n: "Gold", v: "#f2c14e" }, { n: "Violet", v: "#a98be0" }];
const ACTS = {
  focus: { name: "Focus", plant: "fern", why: "a focus session" },
  breathe: { name: "Breathe", plant: "dandelion", why: "a breathing session" },
  path: { name: "Today", plant: "poppy", why: "finishing the day's list" },
  feelings: { name: "Check in", plant: "sunflower", why: "checking in with yourself" },
  sort: { name: "Sort", plant: "tulip", why: "a round of sorting", sub: "Put things where they go", bg: "#35523a" },
  pattern: { name: "Match", plant: "daisy", why: "matching a pattern", sub: "Copy a planting plan", bg: "#7a5634" },
  fireflies: { name: "Fireflies", plant: "bluebell", why: "letting the fireflies go", sub: "Gather slow lights", bg: "#1c2338" },
  rake: { name: "Sand", plant: "lavender", why: "raking the sand", sub: "Rake quiet lines", bg: "#7d6c4f" }
};
const PLANT_NAME = { fern: "Fern", dandelion: "Dandelion", poppy: "Poppy", sunflower: "Sunflower", tulip: "Tulip", daisy: "Daisy", bluebell: "Bluebell", lavender: "Lavender" };
const BED_DEFAULT = ["focus", "breathe", "path", "feelings", "sort", "pattern", "fireflies", "rake", "library"];

/* ================= the lot: skyline + numbered raised beds ================= */
const tod = () => { const h = new Date().getHours(); return h < 5 ? "night" : h < 9 ? "dawn" : h < 17 ? "day" : h < 20 ? "dusk" : "night"; };
const SKY = {
  dawn: { top: "#e9a98f", bot: "#f6d9b8", city: "#6e6168", far: "#9a8a8c", sun: "#fff0c8", leaf: "#6f9a5f", lit: 0, label: "Morning" },
  day: { top: "#7fb7d9", bot: "#d6e9e8", city: "#5d6a73", far: "#8c99a1", sun: "#fff4c2", leaf: "#5f9a55", lit: 0, label: "Daytime" },
  dusk: { top: "#3a3a63", bot: "#e59a73", city: "#2c2a40", far: "#4d4865", sun: "#ffc28a", leaf: "#5b8a52", lit: 1, label: "Evening" },
  night: { top: "#0b1022", bot: "#1d2540", city: "#11141f", far: "#1b2133", sun: "#efeedd", leaf: "#4f7d48", lit: 1, label: "Night" }
};
const MILESTONES = [
  { n: 3, name: "String lights" }, { n: 6, name: "Rain barrel" }, { n: 10, name: "Street tree" }, { n: 15, name: "Fireflies" },
  { n: 21, name: "Brick path" }, { n: 28, name: "Bench" }, { n: 36, name: "Northern lights" }
];
let P = SKY.day, GLOW = false;
const stem = (x, b, t, bend = 4) => `<path d="M${x} ${b}Q${x + bend} ${(b + t) / 2} ${x} ${t}" stroke="${P.leaf}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
const leafAt = (x, y, s = 1) => `<path d="M${x} ${y}q${-9 * s} ${-2 * s} ${-12 * s} ${-9 * s}q${8 * s} 0 ${12 * s} ${9 * s}z" fill="${P.leaf}"/>`;
const PLANT = {
  dandelion: (x, b, h) => { const t = b - h; return stem(x, b, t, 3) + `<circle cx="${x}" cy="${t}" r="7.5" fill="#f4f1e6"/><circle cx="${x}" cy="${t}" r="2.4" fill="#d9c48f"/>`; },
  tulip: (x, b, h, c) => { const t = b - h; return stem(x, b, t, -4) + leafAt(x - 1, b - h * .35) +
    `<path d="M${x - 7} ${t + 1}Q${x - 8} ${t - 11} ${x - 3.5} ${t - 13}L${x} ${t - 7}L${x + 3.5} ${t - 13}Q${x + 8} ${t - 11} ${x + 7} ${t + 1}Q${x} ${t + 7} ${x - 7} ${t + 1}Z" fill="${c}"/>`; },
  daisy: (x, b, h) => { const t = b - h; let p = ""; for (let i = 0; i < 8; i++) p += `<ellipse cx="${x}" cy="${t - 5.5}" rx="2.4" ry="5.2" transform="rotate(${i * 45} ${x} ${t})" fill="#f4f1e6"/>`;
    return stem(x, b, t, 4) + p + `<circle cx="${x}" cy="${t}" r="3" fill="#f2c14e"/>`; },
  bluebell: (x, b, h) => { const t = b - h; let bells = "";
    [[.2, 2], [.55, 9], [.85, 16]].forEach(([f, d]) => { const bx = x + 13 * f + 3, by = t + d + 6; bells += `<path d="M${bx - 4.5} ${by}q4.5 -9 9 0l1 3.5q-5.5 -2 -11 0z" fill="#8ea2ff"/>`; });
    return `<path d="M${x} ${b}Q${x - 2} ${t + 8} ${x + 15} ${t + 2}" stroke="${P.leaf}" stroke-width="2" fill="none"/>` + bells; },
  lavender: (x, b, h) => { const t = b - h; let d = ""; for (let i = 0; i < 6; i++) d += `<ellipse cx="${x + (i % 2 ? 2.2 : -2.2)}" cy="${t + i * 4.5}" rx="2.6" ry="3.6" fill="#a98be0"/>`;
    return stem(x, b, t + 26, 1) + `<path d="M${x} ${t + 26}V${t}" stroke="${P.leaf}" stroke-width="1.6"/>` + d; },
  sunflower: (x, b, h) => { const t = b - h - 12; let p = ""; for (let i = 0; i < 12; i++) p += `<ellipse cx="${x}" cy="${t - 8}" rx="3" ry="6.5" transform="rotate(${i * 30} ${x} ${t})" fill="#f2c14e"/>`;
    return stem(x, b, t, 5) + leafAt(x + 1, b - h * .45, 1.2) + p + `<circle cx="${x}" cy="${t}" r="5.5" fill="#6e4a2e"/>`; },
  poppy: (x, b, h) => { const t = b - h; return stem(x, b, t, -5) +
    `<g fill="#f2603a"><circle cx="${x - 5}" cy="${t - 2}" r="6"/><circle cx="${x + 5}" cy="${t - 2}" r="6"/><circle cx="${x}" cy="${t - 7}" r="6"/></g><circle cx="${x}" cy="${t - 3}" r="2.4" fill="#2b1d1d"/>`; },
  fern: (x, b, h) => { const t = b - h; let l = "";
    for (let i = 0; i < 7; i++) { const y = b - (i + 1) * h / 8, len = 11 - i * 1.2, s = i % 2 ? 1 : -1; l += `<ellipse cx="${x + s * len / 2}" cy="${y}" rx="${len / 2}" ry="2.3" transform="rotate(${s * -25} ${x + s * len / 2} ${y})" fill="#79c48c"/>`; }
    return `<path d="M${x} ${b}Q${x + 3} ${(b + t) / 2} ${x - 1} ${t}" stroke="${P.leaf}" stroke-width="2" fill="none"/>` + l; }
};
/* Sun and moon travel across the sky using the device's clock.
   Sun: rises 6:00 on the left, highest at 13:00, sets 20:00 on the right. Moon: 20:00 to 6:00, same arc. */
const SUNRISE = 6, SUNSET = 20;
function celestial(now = new Date()) {
  const h = now.getHours() + now.getMinutes() / 60;
  const up = h >= SUNRISE && h < SUNSET;
  const f = up ? (h - SUNRISE) / (SUNSET - SUNRISE) : (((h - SUNSET) + 24) % 24) / (24 - (SUNSET - SUNRISE));
  const lift = Math.sin(Math.PI * f);
  const toEdge = up ? Math.min(h - SUNRISE, SUNSET - h) : 0;
  const stars = up ? Math.max(0, 1 - toEdge / 1.5) * 0.6 : 1;
  return { sun: up, x: 24 + 352 * f, y: 112 - 92 * lift, r: up ? 14 + 6 * (1 - lift) : 11, stars };
}
// Skyline band: sky, stars, sun or moon, rooftops with a water tower, the chain-link fence and the lot's unlocked extras.
function drawSkyline() {
  const t = tod(); P = SKY[t]; GLOW = t === "night" || t === "dusk";
  const n = S.plants.length, has = k => n >= k, sky = celestial();
  let s = `<defs>
    <linearGradient id="gSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P.top}"/><stop offset="1" stop-color="${P.bot}"/></linearGradient>
    <mask id="moonMask"><rect width="400" height="150" fill="#fff"/><circle cx="${sky.x + 6}" cy="${sky.y - 4}" r="${sky.r * .95}" fill="#000"/></mask>
    <pattern id="chain" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0 4L4 0L8 4L4 8Z" fill="none" stroke="${GLOW ? "#4a4f57" : "#7b8288"}" stroke-width=".8"/></pattern>
  </defs><rect width="400" height="150" fill="url(#gSky)"/>`;
  if (sky.stars > 0) {
    let st = "";
    for (let i = 0; i < 70; i++) {
      const x = (i * 97.31 + (i % 7) * 13) % 400, y = (i * 53.71) % 110, base = .3 + (i % 5) * .14;
      st += `<circle class="twinkle" style="animation-delay:${-(i % 9) * .7}s;animation-duration:${3 + (i % 4)}s" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${i % 6 ? .6 + (i % 3) * .25 : 1.3}" fill="#fff" opacity="${base.toFixed(2)}"/>`;
    }
    s += `<g opacity="${sky.stars.toFixed(2)}">${st}</g>`;
  }
  if (has(36)) s += `<g opacity="${GLOW ? .5 : .2}" fill="none" stroke-linecap="round"><path d="M-20 40C70 10 170 58 250 26S370 14 430 34" stroke="#79c48c" stroke-width="10"/><path d="M-20 58C90 32 180 70 270 46S380 38 430 52" stroke="#a98be0" stroke-width="6"/></g>`;
  s += sky.sun ? `<circle cx="${sky.x}" cy="${sky.y}" r="${sky.r}" fill="${P.sun}"/>` : `<circle cx="${sky.x}" cy="${sky.y}" r="${sky.r}" fill="${P.sun}" mask="url(#moonMask)"/>`;
  // far rooftops
  s += `<path d="M0 104h30v-18h22v10h26v-26h18v26h34v-14h26v22h40v-30h20v30h30v-12h36v16h34v-22h28v20h36V150H0Z" fill="${P.far}"/>`;
  // near rooftops with a water tower and lit windows after dark
  s += `<g fill="${P.city}"><path d="M0 120h56v-30h40v30h22v-16h50v16h46v-40h42v40h34v-24h60v24h50V150H0Z"/>
    <rect x="236" y="56" width="22" height="18" rx="2"/><path d="M234 56l13-9 13 9z"/><rect x="239" y="74" width="2" height="8"/><rect x="253" y="74" width="2" height="8"/></g>`;
  if (P.lit) { let w = ""; [[64, 98], [80, 106], [176, 110], [222, 90], [232, 102], [270, 96], [312, 108], [350, 112], [366, 104], [104, 112]].forEach(([x, y]) => w += `<rect x="${x}" y="${y}" width="5" height="6" fill="#f2c14e" opacity=".8"/>`); s += w; }
  if (has(10)) s += `<rect x="340" y="104" width="5" height="34" fill="#5a4330"/><circle cx="342" cy="96" r="16" fill="${P.leaf}"/><circle cx="330" cy="104" r="11" fill="${P.leaf}"/><circle cx="354" cy="104" r="11" fill="${P.leaf}"/>`;
  // ground strip and chain-link fence
  s += `<rect y="128" width="400" height="22" fill="${GLOW ? "#1b1d20" : "#3a3d40"}"/><rect y="112" width="400" height="18" fill="url(#chain)"/><path d="M0 112H400" stroke="${GLOW ? "#4a4f57" : "#7b8288"}" stroke-width="1.5"/>`;
  for (let x = 20; x < 400; x += 60) s += `<rect x="${x}" y="110" width="2.5" height="20" fill="${GLOW ? "#4a4f57" : "#7b8288"}"/>`;
  if (has(6)) s += `<rect x="18" y="122" width="22" height="22" rx="3" fill="#2f5b7a"/><path d="M18 128h22M18 138h22" stroke="#24465f" stroke-width="2"/>`;
  if (has(28)) s += `<g fill="#8a6440"><rect x="150" y="132" width="44" height="4" rx="1"/><rect x="150" y="125" width="44" height="3.5" rx="1"/><rect x="153" y="136" width="3" height="8"/><rect x="188" y="136" width="3" height="8"/></g>`;
  if (has(3)) { s += `<path d="M0 106Q100 122 200 106T400 106" fill="none" stroke="#2a2a2a" stroke-width="1"/>`; for (let x = 16; x < 400; x += 32) { const y = 106 + 8 * Math.sin((x / 400) * Math.PI * 2) * (x < 200 ? 1 : -1) * .9; s += `<circle cx="${x}" cy="${(y + 2).toFixed(1)}" r="2.2" fill="#f2c14e" opacity="${GLOW ? 1 : .55}"/>`; } }
  if (has(15) && GLOW) s += [[60, 96], [130, 88], [210, 100], [290, 84], [360, 94]].map(([x, y], i) => `<circle class="amb" style="animation-delay:${-i * 1.3}s" cx="${x}" cy="${y}" r="1.8" fill="#f6eaa0"/>`).join("");
  $("#garden").innerHTML = s;
  $("#todChip").innerHTML = `${icon(GLOW ? "moon" : "sun")}${P.label}`;
}
const bedOrder = () => { const o = Array.isArray(S.bedOrder) && S.bedOrder.length === 9 && BED_DEFAULT.every(k => S.bedOrder.includes(k)) ? S.bedOrder : BED_DEFAULT.slice(); S.bedOrder = o; return o; };
const plantsOf = k => S.plants.filter(p => p.k === k);
function bedArt(k) {
  if (k === "library") return `<g stroke="#f1efe8" stroke-width="2" fill="none" stroke-linejoin="round"><path d="M28 12h18a6 6 0 0 1 6 6v30a6 6 0 0 0-6-6H28z"/><path d="M76 12H58a6 6 0 0 0-6 6v30a6 6 0 0 1 6-6h18z"/></g>`;
  const ps = plantsOf(k).slice(-9);
  if (!ps.length) return `<circle cx="52" cy="34" r="8" fill="none" stroke="#8d7a63" stroke-width="2" stroke-dasharray="3 4"/>`;
  return ps.map((p, i) => { const col = i % 3, row = Math.floor(i / 3), x = 22 + col * 30 + (row % 2) * 6, b = 58 - row * 4, h = 18 + (p.h - 46) * 0.2 - row * 2;
    return PLANT[ACTS[k].plant](x, b, h, COLORS[p.c].v); }).join("");
}
let selBed = null, swapFrom = null;
function drawLot() {
  drawSkyline();
  const order = bedOrder(), sug = suggestion(), n = S.plants.length;
  $("#lot").innerHTML = order.map((k, i) => {
    const num = String(i + 1).padStart(2, "0"), lib = k === "library", count = lib ? 0 : plantsOf(k).length, last = !lib && count ? plantsOf(k).at(-1).t : 0;
    const name = lib ? "Your week" : ACTS[k].name;
    const label = `Plot ${num}, ${name}${lib ? ", patterns from your week" : `, ${count} plant${count === 1 ? "" : "s"}${last ? `, last on ${new Date(last).toLocaleDateString(undefined, { month: "short", day: "numeric" })}` : ""}`}${sug.bed === k ? ". Suggested next" : ""}`;
    return `<button class="bed${sug.bed === k ? " suggest" : ""}${selBed === k ? " sel" : ""}${swapFrom === k ? " swapping" : ""}${lib ? " lib" : ""}" data-bed="${k}" aria-label="${esc(label)}" aria-pressed="${selBed === k}">
      <span class="bed-no" aria-hidden="true">${num}</span><span class="soil" aria-hidden="true"><svg viewBox="0 0 104 62">${bedArt(k)}</svg></span><span class="bed-name" aria-hidden="true">${name}${!lib && count ? ` · ${count}` : ""}</span></button>`;
  }).join("");
  $$("#lot .bed").forEach(b => b.onclick = () => bedTap(b.dataset.bed));
  $("#plantChip").innerHTML = `${icon("leaf")}${n} plant${n === 1 ? "" : "s"}`;
  const next = MILESTONES.find(m => m.n > n), prev = [...MILESTONES].reverse().find(m => m.n <= n)?.n || 0;
  $("#nextName").innerHTML = next ? `Next for the lot: <b>${next.name}</b>` : "<b>Every lot extra unlocked</b>";
  $("#nextLeft").textContent = next ? `${next.n - n} more plant${next.n - n === 1 ? "" : "s"}` : `${n} plants`;
  $("#nextBar").style.width = next ? `${((n - prev) / (next.n - prev)) * 100}%` : "100%";
  renderSign();
}
function bedTap(k) {
  if (swapFrom && swapFrom !== k) {
    const o = bedOrder(), a = o.indexOf(swapFrom), b = o.indexOf(k); [o[a], o[b]] = [o[b], o[a]]; S.bedOrder = o; save();
    swapFrom = null; selBed = k; tone(587, .2); drawLot(); $(`#lot .bed[data-bed="${k}"]`)?.focus(); note("Plots swapped", "Your lot is arranged the way you like."); return;
  }
  swapFrom = null; selBed = selBed === k ? null : k; tone(523, .12); drawLot(); $(`#lot .bed[data-bed="${k}"]`)?.focus();
}
// The plot sign under the lot: the suggested next action, or the story of the plot you tapped.
function renderSign() {
  const box = $("#plotSign");
  if (swapFrom) {
    box.className = "sign swap";
    box.innerHTML = `<p class="sign-plot">Swapping plot ${String(bedOrder().indexOf(swapFrom) + 1).padStart(2, "0")}</p><h2>Tap another plot to swap places</h2><button class="btn" id="swapCancel">Cancel</button>`;
    $("#swapCancel").onclick = () => { swapFrom = null; drawLot(); }; return;
  }
  if (selBed) {
    const k = selBed, num = String(bedOrder().indexOf(k) + 1).padStart(2, "0");
    if (k === "library") {
      box.className = "sign"; box.innerHTML = `<p class="sign-plot">Plot ${num} · Your week</p><h2>See what seems to help you</h2><div class="sign-actions"><button class="btn go" id="signGo">Open Your week</button><button class="btn" id="signSwap">Swap plot</button></div>`;
    } else {
      const ps = plantsOf(k), a = ACTS[k];
      const rows = ps.slice(-3).reverse().map(p => `<li>${PLANT_NAME[a.plant]} from ${a.why}<span>${p.t ? new Date(p.t).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" }) : "Before plant stories began"}</span></li>`).join("");
      box.className = "sign";
      box.innerHTML = `<p class="sign-plot">Plot ${num} · ${a.name}</p><h2>${ps.length ? `${ps.length} ${PLANT_NAME[a.plant].toLowerCase()}${ps.length === 1 ? "" : "s"} growing` : "Nothing planted yet"}</h2>
        ${rows ? `<ul class="story">${rows}</ul>` : `<p class="muted">Finish ${a.why} to plant the first one here.</p>`}
        <div class="sign-actions"><button class="btn go" id="signGo">Go to ${a.name}</button><button class="btn" id="signSwap">Swap plot</button></div>`;
    }
    $("#signGo").onclick = () => show(k === "library" ? "insights" : ["sort", "pattern", "fireflies", "rake"].includes(k) ? k : k);
    $("#signSwap").onclick = () => { swapFrom = k; selBed = null; drawLot(); $("#lot .bed")?.focus(); };
    return;
  }
  const g = suggestion();
  box.className = "sign next";
  box.innerHTML = `<p class="sign-plot">Up next · ${g.where}</p><h2>${esc(g.title)}</h2><p class="muted">${g.sub}</p><button class="btn go block" id="signGo">${g.label}</button>`;
  $("#signGo").onclick = g.run;
}
// One suggested next action, from today's list, the last check-in, the time of day and the setup answers.
function suggestion() {
  const h = new Date().getHours(), st = S.path.steps, nx = S.path.done.findIndex(d => !d);
  const last = S.feelLog.at(-1), lastToday = last && today(new Date(last.t)) === today() ? last : null;
  const tiny = S.fsteps.find(s => !s.done)?.t || S.ftask;
  const focus2 = { bed: "focus", where: "Focus", title: tiny ? tiny : "Start one small thing", sub: "Two minutes is enough to begin. Stop after that if you want.", label: "Start two minutes", run: () => { S.focusMin = 2; save(); show("focus"); } };
  if (lastToday && lastToday.s === 2 && ["low", "overwhelmed", "anxious", "drained"].includes(lastToday.f))
    return { bed: "breathe", where: "Breathe", title: "Slow down for a minute", sub: "You checked in feeling a lot today. Three slow breaths first.", label: "Breathe slowly", run: () => { S.bpat = 0; S.breaths = 3; save(); show("breathe"); } };
  if (lastToday && lastToday.f === "stuck") return focus2;
  if (st.length && nx >= 0) return { bed: "path", where: "Today", title: st[nx].t, sub: `Step ${nx + 1} of ${st.length} on today's list. Just this one.`, label: "Open today's list", run: () => show("path") };
  if (h >= 20 || h < 5) return { bed: "breathe", where: "Breathe", title: "Wind down", sub: "A minute of slow breathing before sleep.", label: "Breathe for a minute", run: () => { S.bpat = 2; S.breaths = 3; save(); show("breathe"); } };
  if (!lastToday && h < 12) return { bed: "feelings", where: "Check in", title: "How are you starting the day?", sub: "Thirty seconds. It shapes what Quietroot suggests.", label: "Check in", run: () => show("feelings") };
  if (S.goals.includes("routine") && !st.length) return { bed: "path", where: "Today", title: "Plan today in a few steps", sub: "Seeing the order makes starting easier.", label: "Plan today", run: () => show("path") };
  if (S.goals.includes("calm") && !S.goals.includes("focus")) return { bed: "breathe", where: "Breathe", title: "One calm minute", sub: "Follow the circle for a few slow breaths.", label: "Breathe for a minute", run: () => show("breathe") };
  return focus2;
}

/* ================= growing & toast ================= */
function grow(kind) {
  S.plants.push({ k: kind, h: Math.round(rand(46, 78)), c: Math.floor(Math.random() * 4), t: Date.now() });
  askEffect(kind);
  S.today[kind] = true;
  if (!S.days.includes(today())) { S.days.push(today()); S.days = S.days.slice(-60); }
  save(); chime();
  const n = S.plants.length, m = MILESTONES.find(x => x.n === n), plant = PLANT_NAME[ACTS[kind].plant], num = String(bedOrder().indexOf(kind) + 1).padStart(2, "0");
  const el = $("#toast");
  el.innerHTML = `<span class="ti">${icon(m ? "sparkle" : "leaf")}</span><div><b>${m ? `New for the lot: ${m.name}` : `${plant} planted in plot ${num}`}</b><span>${m ? `${plant} planted in plot ${num}` : "Added to your lot"}</span></div>`;
  el.classList.remove("hidden"); el.style.animation = "none"; el.offsetHeight; el.style.animation = "";
  clearTimeout(grow.t); grow.t = setTimeout(() => el.classList.add("hidden"), m ? 5000 : 3200);
}

/* ================= navigation ================= */
const SCREENS = ["welcome", "quiet", "insights", "unwind", "home", "focus", "breathe", "path", "feelings", "sort", "pattern", "fireflies", "rake", "settings"];
const TABS = { home: ["Lot", "home"], focus: ["Focus", "focus"], breathe: ["Breathe", "breathe"], path: ["Today", "path"], settings: ["Settings", "settings"] };
let current = "home";
function show(id) {
  if (current === "breathe" && id !== "breathe") stopBreath();
  if (current === "fireflies") ff.active = false;
  current = id; selBed = null; swapFrom = null;
  $$(".after").forEach(el => el.remove());
  document.body.classList.toggle("no-tabs", id === "welcome" || id === "quiet");
  SCREENS.forEach(s => $(`#s-${s}`).classList.toggle("hidden", s !== id));
  ({ welcome: () => renderWelcome(0), quiet: () => {}, insights: renderInsights, unwind: renderUnwind, home: renderHome, focus: initFocus, breathe: initBreath, path: renderPath, feelings: startFeelings, sort: () => startSort(0), pattern: newBed, fireflies: startFireflies, rake: initSand, settings: renderSettings }[id])();
  const tab = TABS[id] ? id : "home";
  $$(".tab").forEach(b => b.dataset.tab === tab ? b.setAttribute("aria-current", "page") : b.removeAttribute("aria-current"));
  window.scrollTo(0, 0);
  const h = $(`#s-${id} h1, #s-${id} h2`); if (h && id !== "home") { h.tabIndex = -1; h.focus({ preventScroll: true }); }
}
$$(".tab").forEach(b => { const [label, ic] = TABS[b.dataset.tab]; b.innerHTML = icon(ic) + `<span>${label}</span>`; b.onclick = () => show(b.dataset.tab); });
$$("[data-home]").forEach(b => { b.innerHTML = icon("back"); b.setAttribute("aria-label", b.dataset.home === "unwind" ? "Back to Unwind" : "Back to the lot"); b.onclick = () => show(b.dataset.home || "home"); });
$$("[data-go]").forEach(b => b.onclick = () => show(b.dataset.go));
// Guiding captions are announced to screen readers when they change.
$$("[data-say]").forEach(el => { el.setAttribute("aria-live", "polite"); el.setAttribute("role", "status"); });
const say = (id, html) => { const el = $(`#s-${id} [data-say]`); if (el) el.innerHTML = html; };

/* ================= home: the lot + one next thing ================= */
const TILE_ART = {
  sort: `<circle cx="52" cy="58" r="17" fill="#ff8a6b"/><rect x="88" y="34" width="32" height="32" rx="4" fill="#6fb3e8"/><path d="M70 74l16 17-16 17-16-17z" fill="#f2c14e"/>`,
  pattern: (() => { let s = ""; const g = [0, -1, 2, 1, 0, -1, -1, 3, 0]; g.forEach((c, i) => { const x = 40 + (i % 3) * 30, y = 26 + Math.floor(i / 3) * 30; s += `<rect x="${x}" y="${y}" width="24" height="24" rx="3" fill="#3b2a1a" opacity=".45"/>` + (c >= 0 ? `<circle cx="${x + 12}" cy="${y + 12}" r="7" fill="${COLORS[c].v}"/>` : ""); }); return s; })(),
  fireflies: `<rect x="62" y="44" width="46" height="58" rx="10" fill="none" stroke="#f1efe8" stroke-opacity=".6" stroke-width="2"/><rect x="68" y="36" width="34" height="9" rx="3" fill="#f1efe8" opacity=".45"/>` +
    [[80, 70], [94, 84], [84, 92], [128, 40], [40, 56], [132, 92]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="#f6eaa0"/>`).join(""),
  rake: `${[0, 9, 18, 27].map(o => `<path d="M0 ${42 + o}C40 ${24 + o} 70 ${64 + o} 170 ${34 + o}" stroke="#f1efe8" stroke-opacity=".35" stroke-width="2.4" fill="none"/>`).join("")}<ellipse cx="104" cy="66" rx="19" ry="13" fill="#4a453e"/>`
};
function renderHome() {
  const h = new Date().getHours();
  $("#greet").textContent = h < 5 ? "Still up?" : h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : h < 21 ? "Good evening" : "Good night";
  $("#dateLine").textContent = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  drawLot();
  const st = S.path.steps, done = S.path.done.filter(Boolean).length;
  const last = S.feelLog.at(-1), lf = last && FEEL.find(f => f.id === last.f);
  $("#qlinks").innerHTML = [
    ["breathe", "breathe", "Breathe", "1 minute"],
    ["feelings", "heart", "Check in", lf && today(new Date(last.t)) === today() ? lf.w : "30 seconds"],
    ["path", "path", "Today", st.length ? `${done} of ${st.length}` : "Plan it"],
    ["unwind", "sparkle", "Unwind", "4 quiet games"]
  ].map(([go, ic, t, s]) => `<button class="qlink" data-go="${go}">${icon(ic)}<span><b>${t}</b><small>${esc(s)}</small></span></button>`).join("");
  $$("#qlinks [data-go]").forEach(b => b.onclick = () => show(b.dataset.go));
  $("#quietBtn").innerHTML = `${icon("moon")}<span>Quiet</span>`;
  $("#quietBtn").setAttribute("aria-label", "Quiet mode: a simpler screen for hard moments");
  $("#quietBanner").classList.toggle("hidden", !S.quiet);
}
function renderUnwind() {
  $("#tiles").innerHTML = ["sort", "pattern", "fireflies", "rake"].map(k => `<button class="tile" data-go="${k}" style="--tbg:${ACTS[k].bg}">
      <svg class="art" viewBox="0 0 170 184" preserveAspectRatio="xMidYMin slice" aria-hidden="true">${TILE_ART[k]}</svg>
      ${S.today[k] ? `<span class="done-badge" aria-label="Done today">${icon("check")}</span>` : ""}<span class="t">${ACTS[k].name}</span><span class="s">${ACTS[k].sub}</span></button>`).join("");
  $$("#tiles [data-go]").forEach(b => b.onclick = () => show(b.dataset.go));
}
function weekStrip() {
  const now = new Date(), mon = new Date(now); mon.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  let count = 0;
  const html = ["M", "T", "W", "T", "F", "S", "S"].map((l, i) => {
    const d = new Date(mon); d.setDate(mon.getDate() + i); const on = S.days.includes(today(d)); if (on) count++;
    return `<div class="day${on ? " on" : ""}${today(d) === today() ? " today" : ""}" aria-label="${d.toLocaleDateString(undefined, { weekday: "long" })}${on ? ", visited" : ""}"><i>${on ? icon("check") : ""}</i>${l}</div>`;
  }).join("");
  return { html, count };
}

/* ================= Quiet mode: one tap to a calmer, simpler screen ================= */
function enterQuiet() {
  if (!S.quiet) { S.quiet = true; S.quietPrevMusic = S.music; }
  if (S.music) { S.music = false; musicStop(); }
  save(); applySettings(); show("quiet");
}
function leaveQuiet() {
  S.quiet = false; S.music = S.quietPrevMusic; save(); applySettings();
  if (S.music) musicStart();
  show("home");
}
$("#quietBtn").onclick = enterQuiet;
$("#quietOff").onclick = leaveQuiet;
$("#qLeave").onclick = leaveQuiet;
$("#qBreathe").onclick = () => { S.bpat = 0; S.breaths = 3; save(); show("breathe"); $("#bStart").click(); };
$("#qCheck").onclick = () => show("feelings");
$("#qTiny").onclick = () => { S.focusMin = 2; save(); show("focus"); };

/* ================= Focus ================= */
const fs = { total: 0, left: 0, endAt: 0, running: false, started: false, iv: null };
// Focus stage: one raised timber bed where the plant grows, and a tape measure that pulls out as time passes.
function drawFocus(p, tapeP = p, breakMode = false) {
  const base = 150, top = base - (10 + 104 * p); let leaves = "";
  [0.12, 0.28, 0.44, 0.6, 0.76].forEach((th, i) => {
    if (p < th) return;
    const g = Math.min(1, (p - th) / 0.12), sd = i % 2 ? 1 : -1, y = base - 2 - (0.16 + i * 0.15) * (base - 2 - top), L = (24 - i * 2) * g;
    leaves += `<path d="M150 ${y}q${sd * L * .5} ${-L * .62} ${sd * L} ${-L * .16}q${-sd * L * .45} ${L * .52} ${-sd * L} ${L * .16}z" style="fill:var(--kale)"/>`;
  });
  let head = "";
  if (p >= 1) { for (let i = 0; i < 6; i++) head += `<ellipse cx="150" cy="${top - 10}" rx="6.5" ry="10" transform="rotate(${i * 60} 150 ${top})" fill="#f2603a"/>`; head += `<circle cx="150" cy="${top}" r="6" fill="#2b1d1d"/>`; }
  else if (p > 0.88) head = `<ellipse cx="150" cy="${top - 5}" rx="6" ry="9" fill="#f2603a"/>`;
  const tapeW = Math.max(0, Math.min(1, tapeP)) * 214, ticks = Array.from({ length: 22 }, (_, i) => `<path d="M${54 + i * 10} 196v${i % 5 ? 4 : 8}" stroke="#2b2a24" stroke-width="1"/>`).join("");
  $("#fSvg").innerHTML = `
    <path d="M150 ${base}Q154 ${(base + top) / 2} 150 ${top}" style="stroke:var(--kale)" stroke-width="3.5" fill="none" stroke-linecap="round"/>${leaves}${head}
    <rect x="60" y="${base}" width="180" height="12" style="fill:var(--soil)"/>
    <rect x="52" y="${base + 8}" width="196" height="26" rx="3" style="fill:var(--timber)"/>
    <path d="M52 ${base + 21}H248" stroke="rgba(0,0,0,.18)" stroke-width="1.5"/>
    <rect x="22" y="188" width="34" height="30" rx="5" style="fill:var(--orange)"/><circle cx="39" cy="203" r="6" fill="#1c1c1c" opacity=".35"/>
    <clipPath id="tapeClip"><rect x="54" y="190" width="${tapeW}" height="22"/></clipPath>
    <g clip-path="url(#tapeClip)"><rect x="54" y="192" width="214" height="18" fill="${breakMode ? "#9cc6e4" : "#e9c23f"}"/>${ticks}</g>
    <rect x="${54 + tapeW - 3}" y="189" width="5" height="24" rx="1" fill="#2b2a24" opacity="${tapeW > 2 ? 1 : 0}"/>`;
}
const mmss = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
function focusUI() {
  const brk = fs.mode === "break", prog = fs.total ? 1 - fs.left / fs.total : 0;
  if (brk) drawFocus(1, prog, true); else drawFocus(fs.bloomed && !fs.started ? 1 : Math.max(.16, prog), prog);
  $("#fTime").textContent = !fs.started ? mmss(S.focusMin * 60) : S.hideClock ? (brk ? "On a break" : fs.running ? "Growing" : "Paused") : mmss(Math.ceil(fs.left));
  $("#fStart").textContent = !fs.started ? (fs.offerBreak ? "Another session" : "Start") : fs.running ? "Pause" : "Resume";
  $("#fStop").textContent = brk ? "End break" : "Finish early";
  $("#fStop").classList.toggle("hidden", !fs.started);
  $("#fBreak").classList.toggle("hidden", fs.started || !fs.offerBreak);
  $("#fMore").classList.toggle("hidden", fs.started || !fs.offerMore);
  $("#fControls").classList.toggle("hidden", fs.started || !fs.optsOpen);
  $("#fSummary").classList.toggle("hidden", fs.started);
  const nextStep = S.fsteps.find(s => !s.done)?.t, taskLine = nextStep || (S.ftask || "").trim();
  $("#fSummary").setAttribute("aria-expanded", !!fs.optsOpen);
  $("#fSummary").innerHTML = `<span><b>${S.focusMin} min</b>${taskLine ? ` · ${esc(taskLine)}` : " · No task named"}${S.companion ? " · Companion on" : ""}</span><span class="opt-label">${fs.optsOpen ? "Done" : "Options"}${icon(fs.optsOpen ? "up" : "down")}</span>`;
  $("#fMins").innerHTML = [2, 5, 10, 15, 25, 45].map(m => `<button data-fmin="${m}" aria-pressed="${m === S.focusMin}" aria-label="${m} minutes">${m}</button>`).join("");
  $$("[data-fmin]").forEach(b => b.onclick = () => { S.focusMin = +b.dataset.fmin; save(); focusUI(); });
  $("#fHide").textContent = S.hideClock ? "Show clock" : "Hide clock";
  $("#fBuddySw").setAttribute("aria-checked", !!S.companion);
  $("#fBuddy").classList.toggle("hidden", !(S.companion && fs.started && fs.mode !== "break"));
  $("#fBuddy").style.animationPlayState = fs.running ? "running" : "paused";
  const task = (fs.started && fs.task) || "";
  $("#fNow").classList.toggle("hidden", !task);
  if (task) $("#fNow").innerHTML = `<span>${fs.mode === "break" ? "Paused for a break" : "Right now"}</span>${esc(task)}`;
}
function initFocus() {
  if (!fs.started) say("focus", "Press Start when you're ready. Can't get going? Open Options to break it into tiny steps, or pick 2 minutes.");
  $("#fTask").value = S.ftask || "";
  renderSteps(); focusUI();
}
const BUDDY_LINES = [
  "Still here with you.", "One small piece at a time.", "If you drifted off, that's normal. Come back to the next tiny bit.",
  "You're doing the hard part: staying with it.", "Unclench your jaw, drop your shoulders. Keep going.", "No need to be perfect. Just keep it moving."
];
function focusTick() {
  fs.left = Math.max(0, (fs.endAt - Date.now()) / 1000);
  if (S.companion && fs.mode === "work" && fs.running) {          // gentle companion check-ins
    const done = fs.total - fs.left, half = fs.total / 2;
    if (!fs.saidHalf && fs.total >= 300 && done >= half) { fs.saidHalf = true; say("focus", "Halfway there. Keep going, or take one slow breath first."); }
    else if (done - (fs.lastBuddy || 0) >= 240) { fs.lastBuddy = done; say("focus", BUDDY_LINES[(fs.buddyI = ((fs.buddyI || 0) + 1)) % BUDDY_LINES.length]); }
  }
  if (current === "focus") focusUI();
  if (fs.left <= 0) focusEnd(true);
}

/* ---------- Break it into tiny steps ---------- */
const STARTERS = ["Open what I need", "Clear a small space", "Write one rough sentence", "List what's involved", "Do the easiest bit first", "Gather the materials"];
function renderSteps() {
  const box = $("#fSteps"), steps = S.fsteps;
  if (!fs.stepsOpen && !steps.length) {
    box.innerHTML = `<div class="fsteps-head"><div><b>Feels too big to start?</b><div class="muted" style="font-size:.85rem">Break it into tiny steps, then focus on just the first one.</div></div><button class="btn sm" id="fStepsOpen">Break it down</button></div>`;
    $("#fStepsOpen").onclick = () => { fs.stepsOpen = true; renderSteps(); $("#fStepIn")?.focus(); };
    return;
  }
  const next = steps.findIndex(s => !s.done);
  box.innerHTML = `<div class="fsteps-head"><b>Tiny steps</b>${steps.length ? `<button class="btn link" id="fStepsClear" style="min-height:32px">Clear</button>` : ""}</div>
    ${steps.map((s, i) => `<div class="fstep${s.done ? " done" : ""}"><button class="check" data-sdone="${i}" aria-label="${s.done ? "Mark not done" : "Mark done"}: ${esc(s.t)}" aria-pressed="${!!s.done}">${icon("check")}</button><span class="t">${esc(s.t)}</span>${!s.done && i === next ? `<button class="btn sm primary" data-sgo="${i}">Start this</button>` : ""}</div>`).join("")}
    <form class="row" id="fStepForm" style="margin-top:10px;flex-wrap:nowrap"><input class="input" id="fStepIn" maxlength="50" placeholder="${steps.length ? "Add another tiny step" : "First tiny step, like Open the document"}" aria-label="Add a tiny step"><button class="btn sm">Add</button></form>
    <div class="chips">${STARTERS.filter(t => !steps.some(s => s.t === t)).slice(0, 4).map(t => `<button data-starter="${esc(t)}">+ ${esc(t)}</button>`).join("")}</div>
    ${steps.length && next < 0 ? `<p class="muted" style="margin-top:10px;font-size:.88rem">Every step done. That's the whole thing, one small piece at a time.</p>` : ""}`;
  const add = t => { t = t.trim(); if (!t || S.fsteps.length >= 12) return; S.fsteps.push({ t: t.slice(0, 50), done: false }); save(); renderSteps(); tone(494, .15); };
  $("#fStepForm").onsubmit = e => { e.preventDefault(); add($("#fStepIn").value); $("#fStepIn")?.focus(); };
  $$("[data-starter]", box).forEach(b => b.onclick = () => add(b.dataset.starter));
  $$("[data-sdone]", box).forEach(b => b.onclick = () => { const s = S.fsteps[+b.dataset.sdone]; s.done = !s.done; save(); renderSteps(); tone(s.done ? 587 : 392, .15); });
  $$("[data-sgo]", box).forEach(b => b.onclick = () => { fs.stepIdx = +b.dataset.sgo; $("#fStart").click(); });
  if ($("#fStepsClear")) $("#fStepsClear").onclick = () => { S.fsteps = []; fs.stepsOpen = false; save(); renderSteps(); };
}
$("#fTask").oninput = e => { S.ftask = e.target.value; save(); };
$("#fTask").onchange = () => focusUI();
$("#fSummary").onclick = () => { fs.optsOpen = !fs.optsOpen; focusUI(); if (fs.optsOpen) $("#fMins button[aria-pressed=true]")?.focus(); };
$("#fBuddySw").onclick = () => { S.companion = !S.companion; save(); focusUI(); tone(523, .12); };
$("#fMore").onclick = () => { S.focusMin = 10; fs.offerMore = false; fs.keepStep = true; $("#fStart").click(); };
function focusEnd(finished) {
  clearInterval(fs.iv);
  const mins = Math.round((fs.total - fs.left) / 60), wasBreak = fs.mode === "break", wasTiny = fs.total === 120, secs = fs.total - fs.left;
  fs.running = fs.started = false; fs.total = fs.left = 0; fs.mode = "work"; fs.offerMore = false;
  if (!wasBreak && fs.stepIdx != null && S.fsteps[fs.stepIdx] && (finished || secs >= 60)) { S.fsteps[fs.stepIdx].done = true; save(); renderSteps(); }
  if (!wasBreak) fs.stepIdx = null;
  if (!wasBreak && finished && wasTiny) {
    fs.offerMore = true; fs.offerBreak = false; fs.bloomed = true;
    say("focus", "Two minutes done. Starting was the hardest part, and you did it. Keep going if you've got momentum, or stop here. Both count.");
    grow("focus"); notify("Two minutes done", "You started. Keep going, or stop here. Both count.", "focus");
    focusUI(); return;
  }
  if (wasBreak) {
    fs.offerBreak = false; fs.bloomed = false;
    say("focus", "Break's over. Another round, or done for now? Both are fine."); tone(659, .5); tone(784, .7);
    notify("Break's over", "Another round, or done for now? Both are fine.", "focus");
  } else if (finished) {
    fs.offerBreak = fs.bloomed = true;
    say("focus", "Session complete, and it bloomed. A short break helps the next session go better."); grow("focus");
    notify("Focus session complete", "Nice work. Time for a short break.", "focus");
  } else {
    fs.offerBreak = mins >= 2; fs.bloomed = false;
    say("focus", mins >= 2 ? `Finished after ${mins} minutes. That still counts, so it's in your garden.` : "Stopped. No problem. You can start again whenever you're ready.");
    if (mins >= 2) grow("focus");
  }
  focusUI();
}
$("#fBreak").onclick = () => {
  fs.mode = "break"; fs.started = fs.running = true; fs.offerBreak = false; fs.total = fs.left = 5 * 60;
  fs.endAt = Date.now() + fs.left * 1000; fs.iv = setInterval(focusTick, 1000);
  $$(".after").forEach(el => el.remove());
  say("focus", "Break time. Step away from the screen: stretch, get water, look out a window. I'll let you know when it's over.");
  focusUI();
};
$("#fStart").onclick = () => {
  if (!fs.started) {
    $$(".after").forEach(el => el.remove());
    fs.mode = "work"; fs.offerBreak = false; fs.offerMore = false; fs.bloomed = false;
    fs.started = true; fs.total = fs.left = S.focusMin * 60; fs.saidHalf = false; fs.lastBuddy = 0;
    const step = fs.stepIdx != null ? S.fsteps[fs.stepIdx]?.t : null;
    if (!fs.keepStep) fs.task = step || $("#fTask").value.trim();
    fs.keepStep = false;
    const lead = S.companion ? "I'm right here with you. " : "";
    say("focus", fs.task ? `${lead}Just this: <b>${esc(fs.task)}</b>. If your mind wanders, that's normal. Come back when you notice.` : `${lead}Started. If your mind wanders, that's normal. Come back when you notice.`);
  }
  if (fs.running) { fs.running = false; clearInterval(fs.iv); fs.left = Math.max(0, (fs.endAt - Date.now()) / 1000); }
  else { fs.running = true; fs.endAt = Date.now() + fs.left * 1000; fs.iv = setInterval(focusTick, 1000); }
  tone(523, .2); focusUI();
};
$("#fStop").onclick = () => { if (fs.running) fs.left = Math.max(0, (fs.endAt - Date.now()) / 1000); focusEnd(false); };
$("#fHide").onclick = () => { S.hideClock = !S.hideClock; save(); focusUI(); };

/* ================= Breathe ================= */
const BPAT = [
  { n: "Relax", d: "In for 4, out for 6. A longer out-breath helps your body slow down.", ph: [["in", 4], ["out", 6]] },
  { n: "Box", d: "In 4, hold 4, out 4, hold 4. Steady and grounding.", ph: [["in", 4], ["hold", 4], ["out", 4], ["hold", 4]] },
  { n: "4-7-8", d: "In 4, hold 7, out 8. Slow and deep, good before sleep.", ph: [["in", 4], ["hold", 7], ["out", 8]] }
];
const BRING = 2 * Math.PI * 136;
let bRun = 0;
function buildOrb() {
  $("#bSvg").innerHTML = `
    <circle cx="150" cy="150" r="136" fill="none" style="stroke:var(--surface-2)" stroke-width="6"/>
    <circle id="bRing" cx="150" cy="150" r="136" fill="none" style="stroke:var(--orange)" stroke-width="6" transform="rotate(-90 150 150)" stroke-dasharray="${BRING}" stroke-dashoffset="${BRING}"/>
    <circle cx="150" cy="150" r="112" fill="none" style="stroke:var(--timber)" stroke-width="3" stroke-dasharray="2 8"/>
    <g class="orb" id="orb"><circle cx="150" cy="150" r="98" style="fill:var(--kale)"/><circle cx="150" cy="150" r="98" fill="none" style="stroke:var(--timber)" stroke-width="8"/></g>
    <text id="bPhase" class="orb-label" x="150" y="144" text-anchor="middle">Ready</text>
    <text id="bNum" class="orb-num" x="150" y="186" text-anchor="middle"></text>`;
}
function initBreath() {
  stopBreath();
  say("breathe", `<b>${BPAT[S.bpat].n}.</b> ${BPAT[S.bpat].d}`);
  $("#bPats").innerHTML = BPAT.map((p, i) => `<button data-bpat="${i}" aria-pressed="${i === S.bpat}">${p.n}</button>`).join("");
  $("#bCounts").innerHTML = [3, 5, 8].map(n => `<button data-breaths="${n}" aria-pressed="${n === S.breaths}">${n} breaths</button>`).join("");
  $$("[data-bpat]").forEach(b => b.onclick = () => { S.bpat = +b.dataset.bpat; save(); initBreath(); });
  $$("[data-breaths]").forEach(b => b.onclick = () => { S.breaths = +b.dataset.breaths; save(); initBreath(); });
}
function stopBreath() { bRun++; buildOrb(); $("#bStart").textContent = "Start"; $("#bCount").textContent = ""; $("#bPats").parentElement.classList.remove("hidden"); }
$("#bStart").onclick = () => {
  if ($("#bStart").textContent === "Stop") { stopBreath(); return; }
  stopBreath();
  const run = ++bRun, steps = BPAT[S.bpat].ph, n = S.breaths, total = n * steps.reduce((a, s) => a + s[1], 0);
  const orb = $("#orb"), ring = $("#bRing"); let elapsed = 0, i = 0;
  $("#bStart").textContent = "Stop"; $("#bPats").parentElement.classList.add("hidden");
  const phase = (kind, sec, cb) => {
    if (run !== bRun) return;
    $("#bPhase").textContent = { in: "Breathe in", hold: "Hold", out: "Breathe out" }[kind];
    if (kind !== "hold") { orb.style.transitionDuration = sec + "s"; orb.classList.toggle("in", kind === "in"); }
    tone({ in: 392, hold: 349, out: 330 }[kind], 0.8, 0.045);
    let left = sec; $("#bNum").textContent = left;
    const iv = setInterval(() => {
      if (run !== bRun) { clearInterval(iv); return; }
      elapsed++; ring.style.strokeDashoffset = BRING * (1 - elapsed / total);
      left--; if (left <= 0) { clearInterval(iv); cb(); } else $("#bNum").textContent = left;
    }, 1000);
  };
  const loop = () => {
    if (run !== bRun) return;
    if (i >= n) {
      $("#bPhase").textContent = "Done"; $("#bNum").textContent = ""; orb.style.transitionDuration = "2s"; orb.classList.remove("in");
      $("#bStart").textContent = "Again"; $("#bCount").textContent = ""; $("#bPats").parentElement.classList.remove("hidden");
      say("breathe", "Done. Notice your shoulders, jaw and hands. Anything a little looser?"); grow("breathe"); return;
    }
    $("#bCount").textContent = `Breath ${i + 1} of ${n}`;
    const step = k => k >= steps.length ? (i++, loop()) : phase(steps[k][0], steps[k][1], () => step(k + 1));
    step(0);
  };
  loop();
};

/* ================= Today ================= */
const STEP = {
  wake: ["Wake up", "#ffd27a"], meds: ["Medication", "#ff9db3"], shower: ["Shower", "#86c8ff"], dress: ["Get dressed", "#b6a4ff"],
  coffee: ["Coffee & food", "#ffb48a"], work: ["Work block", "#86c8ff"], email: ["Emails", "#7fe0bd"], errand: ["Errands", "#ffd27a"],
  move: ["Exercise", "#ff9db3"], outside: ["Go outside", "#7fe0bd"], cook: ["Cook", "#ffb48a"], chores: ["Chores", "#b6a4ff"],
  call: ["Call someone", "#7fe0bd"], rest: ["Downtime", "#ff9db3"], bed: ["Wind down", "#b6a4ff"], own: ["", "#ffd27a"]
};
const stepIc = k => { const c = (STEP[k] || STEP.own)[1]; return `<span class="ic" style="background:color-mix(in srgb,${c} 20%,transparent);color:${c}">${icon(k === "rest" ? "heart" : k)}</span>`; };
let pmode = null, pathMore = false;
$("#moreSteps").onclick = () => { pathMore = !pathMore; renderPath(); };
function renderPath() {
  const Pp = S.path, steps = Pp.steps;
  if (!pmode) pmode = steps.length ? "walk" : "plan";
  if (!steps.length) pmode = "plan";
  $$("[data-pmode]").forEach(b => b.setAttribute("aria-pressed", b.dataset.pmode === pmode));
  $("#planBox").classList.toggle("hidden", pmode !== "plan");
  const next = Pp.done.findIndex(d => !d), done = Pp.done.filter(Boolean).length;
  $("#pHead").innerHTML = steps.length ? `<b>${done} of ${steps.length} done</b><span class="muted">${next < 0 ? "Complete" : ""}</span>` : "";
  $("#pMeter").classList.toggle("hidden", !steps.length);
  $("#pMeter i").style.width = steps.length ? `${done / steps.length * 100}%` : "0";
  if (steps.length) { S.pathLog[today()] = { n: steps.length, d: done }; const keys = Object.keys(S.pathLog); if (keys.length > 40) delete S.pathLog[keys[0]]; save(); }
  if (!steps.length) say("path", "Lay out today as a short list of steps. Seeing the order takes it out of your head and makes the next thing easier to start.");
  else if (pmode === "plan") say("path", "Reorder or remove steps. Fewer, smaller steps usually work better than a long list. Switch to <b>Do</b> when it looks right.");
  else if (next < 0) say("path", "Everything's done. Starting things is the hard part, and you did it all day. Rest counts too.");
  else say("path", `Just this one: <b>${esc(steps[next].t)}</b>. Tap it when it's done.`);
  $("#steps").innerHTML = steps.length ? steps.map((s, i) => pmode === "walk"
    ? `<button class="step${Pp.done[i] ? " done" : ""}${i === next ? " next" : ""}" data-i="${i}" aria-pressed="${!!Pp.done[i]}">${stepIc(s.k)}<span class="t">${esc(s.t)}</span>${i === next ? '<span class="tag">Up next</span>' : ""}<span class="check">${icon("check")}</span></button>`
    : `<div class="step">${stepIc(s.k)}<span class="t">${esc(s.t)}</span><button class="mini" data-mv="${i}" data-d="-1" aria-label="Move up">${icon("up")}</button><button class="mini" data-mv="${i}" data-d="1" aria-label="Move down">${icon("down")}</button><button class="mini" data-rm="${i}" aria-label="Remove">${icon("x")}</button></div>`
  ).join("") : `<div class="card empty">No steps yet. Add a few below.</div>`;
  $$("#steps button.step").forEach(b => b.onclick = () => {
    const i = +b.dataset.i; Pp.done[i] = !Pp.done[i]; tone(Pp.done[i] ? 587 : 392, .25); save();
    if (Pp.done.length > 1 && Pp.done.every(Boolean) && !S.today.pathGrown) { S.today.pathGrown = true; grow("path"); }
    renderPath();
  });
  $$("[data-mv]").forEach(b => b.onclick = () => { const i = +b.dataset.mv, j = i + +b.dataset.d; if (j < 0 || j >= steps.length) return; [steps[i], steps[j]] = [steps[j], steps[i]]; [Pp.done[i], Pp.done[j]] = [Pp.done[j], Pp.done[i]]; save(); renderPath(); });
  $$("[data-rm]").forEach(b => b.onclick = () => {
    const i = +b.dataset.rm, [gone] = steps.splice(i, 1), [wasDone] = Pp.done.splice(i, 1); save(); renderPath();
    undoable(`Removed "${gone.t}"`, () => { steps.splice(i, 0, gone); Pp.done.splice(i, 0, wasDone); save(); renderPath(); });
  });
  const allSteps = Object.entries(STEP).filter(([k]) => k !== "own"), COMMON = ["wake", "meds", "coffee", "work", "move", "bed"];
  const listed = pathMore ? allSteps : allSteps.filter(([k]) => COMMON.includes(k));
  $("#moreSteps").textContent = pathMore ? "Fewer steps" : `More steps (${allSteps.length - COMMON.length})`;
  $("#moreSteps").setAttribute("aria-expanded", pathMore);
  $("#addgrid").innerHTML = listed.map(([k, [t]]) => `<button class="add" data-add="${k}">${stepIc(k)}${t}</button>`).join("");
  $$("[data-add]").forEach(b => b.onclick = () => addStep(b.dataset.add, STEP[b.dataset.add][0]));
}
function addStep(k, t) {
  if (S.path.steps.length >= 12) { say("path", "That's 12 steps, which is plenty for one day. Remove one to add another."); return; }
  S.path.steps.push({ k, t }); S.path.done.push(false); save(); tone(494, .2); renderPath();
}
$$("[data-pmode]").forEach(b => b.onclick = () => { pmode = b.dataset.pmode; renderPath(); });
$("#customForm").onsubmit = e => { e.preventDefault(); const t = $("#customText").value.trim(); if (t) { addStep("own", t.slice(0, 30)); $("#customText").value = ""; } };
$("#sampleMorning").onclick = () => { S.path.steps = ["wake", "meds", "shower", "dress", "coffee", "work"].map(k => ({ k, t: STEP[k][0] })); S.path.done = S.path.steps.map(() => false); save(); renderPath(); };
$("#clearPath").onclick = async () => { if (await ask("Remove all of today's steps?", "Remove")) { S.path.steps = []; S.path.done = []; save(); renderPath(); } };

/* ================= Check in ================= */
const FEEL = [
  { id: "calm", w: "Calm", c: "#7fe0bd", r: "Good to notice. Calm is easier to find again once you know what it feels like in your body.", go: [] },
  { id: "content", w: "Content", c: "#ffd27a", r: "Nice. Let it register for a moment before you rush on to the next thing.", go: [] },
  { id: "restless", w: "Restless", c: "#ffb48a", r: "Restless energy needs somewhere to go. Something for your hands, or a short walk, can help it settle.", go: ["rake", "sort"] },
  { id: "drained", w: "Drained", c: "#a9a3c9", r: "Running low isn't a failing. Water, food, or ten minutes of nothing at all are all reasonable next steps.", go: ["fireflies"] },
  { id: "anxious", w: "Anxious", c: "#86c8ff", r: "Long, slow out-breaths are one of the quickest ways to tell your nervous system you're safe.", go: ["breathe"] },
  { id: "low", w: "Low", c: "#7f9cc9", r: "That's a heavy one. Go easy on yourself today. If it hangs around, talking to someone you trust can help.", go: ["rake"] },
  { id: "overwhelmed", w: "Overwhelmed", c: "#c39bf0", r: "Too much input or too much to do? Cut it down: a quieter space, headphones, dimmer light. Then pick just one thing.", go: ["quiet", "breathe"] },
  { id: "stuck", w: "Stuck", c: "#ff8f8f", r: "Can't get started? That's common, and it isn't laziness. Break it into tiny steps, or try just 2 minutes. Starting is the hardest part.", go: ["focus", "path"] }
];
const GO_LABEL = { breathe: "Breathe for a minute", path: "Plan one small step", focus: "Try just 2 minutes", quiet: "Switch to quiet mode", rake: "Rake some sand", sort: "Sort for a bit", fireflies: "Watch the fireflies" };
const dot = (c, size) => `<span class="dot" style="--c:${c};${size ? `width:${size}px;height:${size}px` : ""}"></span>`;
// Four broad feelings first, then the finer word, so there are never more than four choices at once.
const FEEL_GROUPS = [
  { w: "Okay", s: "Calm or content", ids: ["calm", "content"] },
  { w: "Wired", s: "Restless or anxious", ids: ["restless", "anxious"] },
  { w: "Heavy", s: "Drained or low", ids: ["drained", "low"] },
  { w: "Stuck", s: "Overloaded or can't start", ids: ["overwhelmed", "stuck"] }
];
let feelPick = null;
function startFeelings() {
  feelPick = null;
  $("#feelStep1").classList.remove("hidden"); $("#feelStep2").classList.add("hidden"); $("#feelStep3").classList.add("hidden");
  say("feelings", "How are you, honestly? Pick whatever's closest. There's no wrong answer.");
  $("#moods").innerHTML = FEEL_GROUPS.map((g, i) => { const c = FEEL.find(f => f.id === g.ids[0]).c;
    return `<button class="mood" data-g="${i}">${dot(c)}<span><b>${g.w}</b><small>${g.s}</small></span></button>`; }).join("");
  $$("#moods .mood").forEach(b => b.onclick = () => { tone(523, .15); pickFine(FEEL_GROUPS[b.dataset.g]); });
  renderHistory();
}
function pickFine(g) {
  say("feelings", `<b>${g.w}.</b> Which is closer?`);
  $("#moods").innerHTML = g.ids.map(id => { const f = FEEL.find(x => x.id === id); return `<button class="mood" data-f="${id}">${dot(f.c)}<span><b>${f.w}</b></span></button>`; }).join("") +
    `<button class="btn link" id="moodBack">Pick a different feeling</button>`;
  $$("#moods [data-f]").forEach(b => b.onclick = () => { feelPick = FEEL.find(f => f.id === b.dataset.f); tone(523, .15); askLevel(); });
  $("#moodBack").onclick = startFeelings;
  $("#moods [data-f]").focus();
}
function askLevel() {
  $("#feelStep1").classList.add("hidden"); $("#feelStep2").classList.remove("hidden");
  say("feelings", `<b>${feelPick.w}.</b> How strong is it right now?`);
  $("#levels").innerHTML = [["Mild", 22], ["Moderate", 36], ["Strong", 54]].map(([w, s], i) => `<button class="level" data-l="${i}">${dot(feelPick.c, s)}${w}</button>`).join("");
  $$("#levels .level").forEach(b => b.onclick = () => answer(+b.dataset.l));
}
$("#feelBack").onclick = startFeelings;
function answer(level) {
  $("#feelStep2").classList.add("hidden"); $("#feelStep3").classList.remove("hidden");
  const strong = level === 2 && !["calm", "content"].includes(feelPick.id) ? " Strong feelings take a lot of energy. Naming them is a real skill." : "";
  say("feelings", "Thanks for checking in.");
  $("#reply").innerHTML = `${dot(feelPick.c)}<div><b>${feelPick.w}${["", " · moderate", " · strong"][level]}</b><p class="muted" style="margin-top:4px">${feelPick.r}${strong}</p></div>`;
  // Strong heavy feelings: point gently to real support, without diagnosing.
  const needsSupport = level === 2 && ["low", "overwhelmed", "anxious", "drained"].includes(feelPick.id);
  $("#support").classList.toggle("hidden", !needsSupport);
  $("#feelGo").innerHTML = feelPick.go.map((id, i) => `<button class="btn ${i ? "" : "go "}block" data-go2="${id}">${GO_LABEL[id]}</button>`).join("") + `<button class="btn block" data-home2>Back to the lot</button>`;
  $$("[data-go2]").forEach(b => b.onclick = () => { if (b.dataset.go2 === "focus") { S.focusMin = 2; fs.stepsOpen = true; } if (b.dataset.go2 === "quiet") return enterQuiet(); show(b.dataset.go2); });
  $("[data-home2]").onclick = () => show("home");
  S.feelLog.push({ f: feelPick.id, s: level, t: Date.now() }); S.feelLog = S.feelLog.slice(-14);
  renderHistory(); grow("feelings");
}
function renderHistory() {
  $("#logBox").classList.toggle("hidden", !S.feelLog.length);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  $("#history").innerHTML = S.feelLog.slice().reverse().map(e => { const f = FEEL.find(x => x.id === e.f) || FEEL[0], d = new Date(e.t); return `<div class="hist">${dot(f.c)}<span>${days[d.getDay()]}</span></div>`; }).join("");
}

/* ================= Sort ================= */
const SHAPE = {
  circle: '<circle cx="20" cy="20" r="14"/>', square: '<rect x="7" y="7" width="26" height="26" rx="7"/>',
  triangle: '<path d="M17.4 7.5a3 3 0 0 1 5.2 0l11.3 20a3 3 0 0 1-2.6 4.5H8.7a3 3 0 0 1-2.6-4.5Z"/>', diamond: '<path d="M17.9 5.2a3 3 0 0 1 4.2 0l12.7 12.7a3 3 0 0 1 0 4.2L22.1 34.8a3 3 0 0 1-4.2 0L5.2 22.1a3 3 0 0 1 0-4.2Z"/>'
};
const gem = (s, c, size = 38) => `<svg viewBox="0 0 40 40" width="${size}" height="${size}" aria-hidden="true"><g fill="${c}">${SHAPE[s]}</g><ellipse cx="15" cy="13" rx="5" ry="3" fill="#fff" opacity=".35"/></svg>`;
let sortRound = 0, picked = null;
function startSort(round) {
  sortRound = round; picked = null;
  const byColor = round % 2 === 0, shapes = Object.keys(SHAPE);
  $("#sortRound").textContent = `Round ${round + 1}`; $("#sortNext").classList.add("hidden");
  say("sort", byColor ? "Sort by <b>color</b>. Tap a piece, then tap the matching bin." : "Now sort by <b>shape</b>. Color doesn't matter this round.");
  const items = shuffle(Array.from({ length: round >= 2 ? 12 : 8 }, (_, i) => byColor ? { c: i % 4, s: pick(shapes) } : { c: Math.floor(Math.random() * 4), s: shapes[i % 4] }));
  $("#tray").innerHTML = items.map(it => `<button class="gem" data-c="${it.c}" data-s="${it.s}" aria-pressed="false" aria-label="${COLORS[it.c].n} ${it.s}">${gem(it.s, COLORS[it.c].v)}</button>`).join("");
  const bins = byColor ? COLORS.map((c, i) => ({ key: String(i), c: c.v, label: c.n, art: `<span class="dot" style="--c:${c.v};width:22px;height:22px;box-shadow:none"></span>` }))
    : shapes.map(s => ({ key: s, c: "var(--muted)", label: s[0].toUpperCase() + s.slice(1), art: gem(s, "currentColor", 26) }));
  $("#bins").innerHTML = bins.map(b => `<button class="bin" data-key="${b.key}" data-n="0" style="--c:${b.c}"><span class="bi" style="color:var(--muted)">${b.art}</span><span><span class="lbl" style="display:block">${b.label}</span><span class="cnt">0 sorted</span></span></button>`).join("");
  $$("#tray .gem").forEach(b => b.onclick = () => { $$("#tray .gem").forEach(x => x.setAttribute("aria-pressed", "false")); picked = b; b.setAttribute("aria-pressed", "true"); tone(523, .12); });
  $$("#bins .bin").forEach(bin => bin.onclick = () => {
    if (!picked) { say("sort", "Tap a piece first, then a bin."); return; }
    const want = byColor ? picked.dataset.c : picked.dataset.s;
    if (want !== bin.dataset.key) {
      tone(294, .2); bin.classList.remove("nope"); bin.offsetWidth; bin.classList.add("nope");
      say("sort", byColor ? `Different color. This one is <b>${COLORS[picked.dataset.c].n.toLowerCase()}</b>.` : `Different shape. This one is a <b>${picked.dataset.s}</b>.`); return;
    }
    picked.remove(); picked = null; tone(587, .18);
    bin.dataset.n = +bin.dataset.n + 1; bin.querySelector(".cnt").textContent = `${bin.dataset.n} sorted`;
    if (!$("#tray .gem")) {
      say("sort", "All sorted. Another round, or back to the garden. Either is fine.");
      $("#tray").innerHTML = `<span class="muted" style="font-weight:700">Tray clear</span>`;
      $("#sortNext").textContent = (sortRound + 1) % 2 === 0 ? "Next round · by color" : "Next round · by shape";
      $("#sortNext").classList.remove("hidden"); grow("sort");
    } else say("sort", pick(["Good match.", "That's the one.", "Next piece.", "Nice."]));
  });
}
$("#sortNext").onclick = () => startSort(sortRound + 1);

/* ================= Match (pattern) ================= */
const BEDS = [{ size: 3, colors: 2, flowers: 5 }, { size: 4, colors: 3, flowers: 9 }, { size: 5, colors: 4, flowers: 15 }, { size: 6, colors: 4, flowers: 22 }];
let target = [], mine = [], brush = 0, bedDone = false;
const bloom = c => { let p = ""; for (let i = 0; i < 5; i++) { const a = i * 72 * Math.PI / 180; p += `<circle cx="${20 + Math.sin(a) * 8}" cy="${20 - Math.cos(a) * 8}" r="7" fill="${c}"/>`; } return `<svg viewBox="0 0 40 40" aria-hidden="true">${p}<circle cx="20" cy="20" r="5" fill="#fff6d6"/></svg>`; };
function newBed() {
  const cfg = BEDS[S.bed] || BEDS[0], N = cfg.size * cfg.size; bedDone = false;
  target = Array(N).fill(null);
  shuffle([...Array(N).keys()]).slice(0, cfg.flowers).forEach((idx, i) => target[idx] = i < cfg.colors ? i : Math.floor(Math.random() * cfg.colors));
  mine = Array(N).fill(null); brush = 0;
  $("#bedSizes").innerHTML = BEDS.map((b, i) => `<button data-bed="${i}" aria-pressed="${i === S.bed}">${b.size}×${b.size}</button>`).join("");
  $$("[data-bed]").forEach(b => b.onclick = () => { S.bed = +b.dataset.bed; save(); newBed(); });
  $("#bedHint").setAttribute("aria-pressed", "false"); $("#bedNew").classList.add("hidden");
  say("pattern","Copy the pattern into your grid. Pick a color, then tap a square. The pattern stays put, so take your time.");
  // fit two boards side by side when possible
  const avail = Math.min(540, window.innerWidth) - 36, gap = 5, pad = 18;
  let cs = Math.floor(((avail - 16) / 2 - pad - (cfg.size - 1) * gap) / cfg.size), stacked = false;
  if (cs < 32) { stacked = true; cs = Math.floor((avail - pad - (cfg.size - 1) * gap) / cfg.size); }
  cs = Math.min(cs, 54);
  $("#boards").style.flexDirection = stacked ? "column" : "row"; $("#boards").style.alignItems = "center";
  for (const el of [$("#bedTarget"), $("#bedMine")]) { el.style.gridTemplateColumns = `repeat(${cfg.size}, auto)`; el.style.setProperty("--cs", cs + "px"); }
  $("#bedTarget").innerHTML = target.map(c => `<div class="cell" role="img" aria-label="${c == null ? "empty" : COLORS[c].n}">${c == null ? "" : bloom(COLORS[c].v)}</div>`).join("");
  renderPalette(); renderMine();
}
function renderPalette() {
  const cfg = BEDS[S.bed] || BEDS[0];
  $("#palette").innerHTML = COLORS.slice(0, cfg.colors).map((c, i) => `<button class="sw" data-brush="${i}" aria-pressed="${brush === i}" aria-label="${c.n}">${dot(c.v)}</button>`).join("") +
    `<button class="sw" data-brush="-1" aria-pressed="${brush === -1}" aria-label="Erase">${icon("erase")}</button>`;
  $$("[data-brush]").forEach(b => b.onclick = () => { brush = +b.dataset.brush; renderPalette(); });
}
function renderMine() {
  const hint = $("#bedHint").getAttribute("aria-pressed") === "true";
  $("#bedMine").innerHTML = mine.map((c, i) => `<button class="cell${hint && c !== target[i] ? " off" : ""}" data-i="${i}" aria-label="Square ${i + 1}: ${c == null ? "empty" : COLORS[c].n}">${c == null ? "" : bloom(COLORS[c].v)}</button>`).join("");
  const same = mine.filter((c, i) => c === target[i]).length;
  $("#bedScore").textContent = `${same} of ${mine.length} squares match`;
  $$("#bedMine .cell").forEach(b => b.onclick = () => {
    if (bedDone) return;
    const i = +b.dataset.i; mine[i] = brush < 0 ? null : brush; tone(brush < 0 ? 330 : 494, .15); renderMine();
    $(`#bedMine .cell[data-i="${i}"]`).focus({ preventScroll: true });
    if (mine.every((c, k) => c === target[k])) { bedDone = true; $("#bedNew").classList.remove("hidden"); say("pattern", "A perfect match. Nicely done."); grow("pattern"); }
  });
}
$("#bedHint").onclick = () => { const b = $("#bedHint"); b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") !== "true"); renderMine(); };
$("#bedNew").onclick = newBed;

/* ================= Fireflies ================= */
const ff = { active: false, flies: [], stars: [], grass: [], caught: 0, total: 12, freeing: false, t: 0 };
const W = 640, H = 440, JAR = { x: 320, y: 330, w: 92, h: 104 };
function startFireflies() {
  ff.flies = Array.from({ length: ff.total }, () => ({ x: rand(40, 600), y: rand(40, 250), ph: rand(0, 6.28), sp: rand(.3, .7), st: "free", glow: rand(0, 6.28) }));
  ff.stars = Array.from({ length: 50 }, () => [rand(0, W), rand(0, 200), rand(.4, 1.4)]);
  ff.grass = Array.from({ length: 110 }, (_, i) => [i * 6 + rand(-3, 3), rand(18, 56), rand(-8, 8)]);
  ff.caught = 0; ff.freeing = false; ff.active = true;
  $("#ffFree").classList.add("hidden"); $("#ffAgain").classList.add("hidden"); $("#ffHelp").classList.remove("hidden");
  $("#ffCount").textContent = `0 / ${ff.total}`;
  say("fireflies", "Tap a firefly and it drifts into the jar. They're slow, so there's no rush.");
  const g = $("#ffc").getContext("2d"); let last = performance.now();
  const frame = now => { if (!ff.active) return; const dt = Math.min(50, now - last); last = now; ff.t += dt / 1000; updateFF(dt); drawFF(g); requestAnimationFrame(frame); };
  requestAnimationFrame(frame);
}
function updateFF(dt) {
  for (const f of ff.flies) {
    f.glow += dt / 700;
    if (f.st === "free" && S.motion) { f.x += Math.cos(ff.t * f.sp + f.ph) * .35; f.y += Math.sin(ff.t * f.sp * 1.3 + f.ph) * .25; f.x = Math.max(20, Math.min(W - 20, f.x)); f.y = Math.max(20, Math.min(270, f.y)); }
    if (f.st === "going" || f.st === "leaving") {
      f.p = Math.min(1, f.p + (S.motion ? dt / 1100 : 1)); const e = 1 - Math.pow(1 - f.p, 3);
      f.x = f.fx + (f.tx - f.fx) * e; f.y = f.fy + (f.ty - f.fy) * e - (S.motion ? Math.sin(e * Math.PI) * 40 : 0);
      if (f.p >= 1) f.st = f.st === "going" ? "jar" : "gone";
    }
  }
}
function rr(g, x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
function drawFF(g) {
  const sky = g.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, "#070f27"); sky.addColorStop(1, "#22325c");
  g.fillStyle = sky; g.fillRect(0, 0, W, H);
  g.fillStyle = "#fff"; for (const [x, y, r] of ff.stars) { g.globalAlpha = .35 + .25 * Math.sin(ff.t * .8 + x); g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); }
  g.globalAlpha = 1;
  const mg = g.createRadialGradient(540, 70, 0, 540, 70, 90); mg.addColorStop(0, "rgba(242,239,220,.35)"); mg.addColorStop(1, "rgba(242,239,220,0)"); g.fillStyle = mg; g.fillRect(440, 0, 200, 170);
  g.save(); g.beginPath(); g.rect(0, 0, W, H); g.arc(551, 61, 22, 0, 7); g.clip("evenodd"); g.fillStyle = "#f2efdc"; g.beginPath(); g.arc(540, 70, 24, 0, 7); g.fill(); g.restore();
  g.fillStyle = "#16213c"; g.beginPath(); g.moveTo(0, H); g.lineTo(0, 330); g.bezierCurveTo(160, 300, 420, 320, W, 300); g.lineTo(W, H); g.fill();
  g.fillStyle = "#0d1628"; g.beginPath(); g.moveTo(0, H); g.lineTo(0, 372); g.quadraticCurveTo(320, 348, W, 378); g.lineTo(W, H); g.fill();
  g.strokeStyle = "#0d1628"; g.lineWidth = 3; g.lineCap = "round";
  for (const [x, h, b] of ff.grass) { g.beginPath(); g.moveTo(x, H); g.quadraticCurveTo(x + b * .3, H - h * .6 - 30, x + b, 380 - h); g.stroke(); }
  const fill = ff.caught / ff.total;
  const jg = g.createRadialGradient(JAR.x, JAR.y, 4, JAR.x, JAR.y, 150); jg.addColorStop(0, `rgba(255,226,122,${.5 * fill})`); jg.addColorStop(1, "rgba(255,226,122,0)");
  g.fillStyle = jg; g.fillRect(JAR.x - 160, JAR.y - 160, 320, 320);
  g.fillStyle = `rgba(255,255,255,${.06 + .1 * fill})`; g.strokeStyle = "rgba(255,255,255,.5)"; g.lineWidth = 2.5;
  rr(g, JAR.x - JAR.w / 2, JAR.y - JAR.h / 2, JAR.w, JAR.h, 24); g.fill(); g.stroke();
  g.fillStyle = "rgba(255,255,255,.4)"; rr(g, JAR.x - 32, JAR.y - JAR.h / 2 - 14, 64, 12, 6); g.fill();
  g.strokeStyle = "rgba(255,255,255,.25)"; g.beginPath(); g.moveTo(JAR.x - 30, JAR.y - 30); g.lineTo(JAR.x - 30, JAR.y + 20); g.stroke();
  for (const f of ff.flies) {
    if (f.st === "gone") continue;
    const a = S.motion ? .55 + .45 * Math.sin(f.glow) : .9;
    const r = g.createRadialGradient(f.x, f.y, 0, f.x, f.y, 24); r.addColorStop(0, `rgba(255,226,122,${.6 * a})`); r.addColorStop(1, "rgba(255,226,122,0)");
    g.fillStyle = r; g.beginPath(); g.arc(f.x, f.y, 24, 0, 7); g.fill();
    g.fillStyle = "#fff8d0"; g.beginPath(); g.arc(f.x, f.y, 3, 0, 7); g.fill();
  }
}
function catchFly(f) {
  if (!f || ff.freeing) return;
  f.st = "going"; f.p = 0; f.fx = f.x; f.fy = f.y; f.tx = JAR.x + rand(-30, 30); f.ty = JAR.y + rand(-34, 38);
  ff.caught++; tone(660 + ff.caught * 20, .3, .045); $("#ffCount").textContent = `${ff.caught} / ${ff.total}`;
  if (ff.caught === ff.total) { $("#ffHelp").classList.add("hidden"); $("#ffFree").classList.remove("hidden"); say("fireflies", "The jar is full and glowing. Watch it for a moment. Release them when you're ready."); }
  else if (ff.caught === 6) say("fireflies", "Halfway. The jar is starting to glow.");
}
$("#ffc").addEventListener("pointerdown", e => {
  const r = e.currentTarget.getBoundingClientRect(), x = (e.clientX - r.left) * W / r.width, y = (e.clientY - r.top) * H / r.height;
  let best = null, bd = 46; for (const f of ff.flies) if (f.st === "free") { const d = Math.hypot(f.x - x, f.y - y); if (d < bd) { bd = d; best = f; } }
  catchFly(best);
});
$("#ffHelp").onclick = () => catchFly(ff.flies.find(f => f.st === "free"));
$("#ffFree").onclick = () => {
  ff.freeing = true; $("#ffFree").classList.add("hidden");
  ff.flies.forEach((f, i) => setTimeout(() => { f.st = "leaving"; f.p = 0; f.fx = f.x; f.fy = f.y; f.tx = rand(20, W - 20); f.ty = rand(-40, 60); tone(880 - i * 25, .25, .035); }, i * 160));
  setTimeout(() => { $("#ffAgain").classList.remove("hidden"); say("fireflies", "There they go. Take one slow breath before moving on."); grow("fireflies"); }, ff.total * 160 + 1200);
};
$("#ffAgain").onclick = startFireflies;

/* ================= Sand ================= */
const STONES = [[170, 140, 40, 28], [462, 270, 50, 34], [300, 360, 26, 18]];
let sandLen = 0, sandGrown = false, lastPt = null;
function initSand() {
  const g = $("#sand").getContext("2d");
  const base = g.createLinearGradient(0, 0, 0, H); base.addColorStop(0, "#efe2c6"); base.addColorStop(1, "#e2d1ad");
  g.fillStyle = base; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 2600; i++) { g.fillStyle = Math.random() < .5 ? "rgba(140,110,70,.12)" : "rgba(255,252,240,.4)"; g.fillRect(rand(0, W), rand(0, H), 1.3, 1.3); }
  drawStones(g); sandLen = 0; sandGrown = false;
  $$("[data-rake]").forEach(b => b.setAttribute("aria-pressed", +b.dataset.rake === S.rake));
  say("rake", "Drag to rake. Try slow circles around the stones, or long waves. Smooth it out whenever you like.");
}
function drawStones(g) {
  for (const [x, y, rx, ry] of STONES) {
    g.fillStyle = "rgba(110,85,50,.22)"; g.beginPath(); g.ellipse(x + 5, y + 8, rx, ry, 0, 0, 7); g.fill();
    const sg = g.createRadialGradient(x - rx * .35, y - ry * .45, 2, x, y, rx * 1.1); sg.addColorStop(0, "#a8a39b"); sg.addColorStop(1, "#5f5a53");
    g.fillStyle = sg; g.beginPath(); g.ellipse(x, y, rx, ry, 0, 0, 7); g.fill();
  }
}
function rakeTo(x, y) {
  const g = $("#sand").getContext("2d");
  if (!lastPt) { lastPt = [x, y]; return; }
  const [lx, ly] = lastPt, dx = x - lx, dy = y - ly, d = Math.hypot(dx, dy); if (d < 2) return;
  const px = -dy / d, py = dx / d, tines = S.rake, gap = 9; g.lineCap = "round";
  for (let k = 0; k < tines; k++) {
    const o = (k - (tines - 1) / 2) * gap;
    g.strokeStyle = "rgba(150,118,72,.42)"; g.lineWidth = 3.2; g.beginPath(); g.moveTo(lx + px * o, ly + py * o); g.lineTo(x + px * o, y + py * o); g.stroke();
    g.strokeStyle = "rgba(255,252,238,.75)"; g.lineWidth = 1.3; g.beginPath(); g.moveTo(lx + px * (o + 2.6), ly + py * (o + 2.6)); g.lineTo(x + px * (o + 2.6), y + py * (o + 2.6)); g.stroke();
  }
  drawStones(g); sandLen += d; lastPt = [x, y];
  if (Math.floor((sandLen - d) / 220) !== Math.floor(sandLen / 220)) tone(220 + Math.random() * 40, .3, .02);
}
const sandXY = e => { const r = $("#sand").getBoundingClientRect(); return [(e.clientX - r.left) * W / r.width, (e.clientY - r.top) * H / r.height]; };
$("#sand").addEventListener("pointerdown", e => { e.currentTarget.setPointerCapture(e.pointerId); lastPt = null; rakeTo(...sandXY(e)); });
$("#sand").addEventListener("pointermove", e => { if ((e.buttons || e.pointerType === "touch") && lastPt) rakeTo(...sandXY(e)); });
$("#sand").addEventListener("pointerup", () => lastPt = null);
$("#sand").addEventListener("pointercancel", () => lastPt = null);
$$("[data-rake]").forEach(b => b.onclick = () => { S.rake = +b.dataset.rake; save(); $$("[data-rake]").forEach(x => x.setAttribute("aria-pressed", x === b)); });
$("#sandClear").onclick = () => { initSand(); tone(262, .6, .03); };
$("#sandAuto").onclick = () => {
  const shapes = [[170, 140, 70], [462, 270, 80], [300, 360, 46]], g = pick(shapes);
  lastPt = null; for (let a = 0; a <= Math.PI * 2.05; a += .06) rakeTo(g[0] + Math.cos(a) * g[2], g[1] + Math.sin(a) * g[2] * .72); lastPt = null;
  const y = rand(60, 380); for (let x = 10; x < 630; x += 6) rakeTo(x, y + Math.sin(x / 40) * 22); lastPt = null;
  say("rake", "A pattern raked for you. Rake more, smooth it out, or press Done.");
};
$("#sandDone").onclick = () => {
  if (sandLen < 300) { say("rake", "Rake a few more lines first. Slow is perfect."); return; }
  if (sandGrown) { say("rake", "This one's already in your garden. Keep raking as long as you like."); return; }
  sandGrown = true; say("rake", "A quiet pattern. Keep going, or smooth it and start fresh."); grow("rake");
};

/* ================= Welcome setup (first launch) ================= */
const GOALS = [
  { id: "focus", t: "Focus and getting started", s: "Starting tasks, staying on them", ic: "focus", c: "var(--mint)" },
  { id: "calm", t: "Calming down", s: "Stress, overwhelm, busy thoughts", ic: "breathe", c: "var(--sky)" },
  { id: "routine", t: "Structure and routine", s: "Knowing what comes next", ic: "path", c: "var(--apricot)" }
];
const SENS = [
  { id: "sound", t: "Music or sudden sounds", s: "Music will start off", ic: "music", c: "var(--lilac)" },
  { id: "motion", t: "Movement and animation", s: "Motion will be reduced", ic: "sparkle", c: "var(--rose)" },
  { id: "bright", t: "Bright screens", s: "Dark mode stays on", ic: "moon", c: "var(--gold)" }
];
const START_TIMES = [["Before 7", "06:30"], ["7–8", "07:30"], ["8–9", "08:30"], ["9–10", "09:30"], ["Later", "10:30"]];
const ob = { goals: new Set(), sens: new Set(), start: "08:30", remind: true };
const choiceBtn = (o, on, key) => `<button class="choice" data-${key}="${o.id}" aria-pressed="${on}"><span class="ic" style="background:color-mix(in srgb,${o.c} 18%,transparent);color:${o.c}">${icon(o.ic)}</span><span class="tx"><span class="t">${o.t}</span><span class="s">${o.s}</span></span><span class="tick">${icon("check")}</span></button>`;
function renderWelcome(step) {
  $("#obDots").innerHTML = [0, 1, 2, 3].map(i => `<i class="${i === step ? "on" : ""}"></i>`).join("");
  const body = $("#obBody");
  if (step === 0) {
    body.innerHTML = `<div class="ob-hero">
        <svg class="mark" viewBox="0 0 96 96" aria-hidden="true"><defs><linearGradient id="obG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7fe0bd"/><stop offset="1" stop-color="#86c8ff"/></linearGradient></defs><rect x="6" y="54" width="84" height="30" rx="3" fill="#b8875a"/><rect x="14" y="60" width="68" height="18" rx="2" fill="#3b3226"/><path d="M48 74V44" stroke="#7fe0bd" stroke-width="4" stroke-linecap="round"/><path d="M48 50c0-14 9-22 22-22 0 14-9 22-22 22Z" fill="url(#obG)"/><path d="M48 58c0-11-7-18-18-18 0 11 7 18 18 18Z" fill="url(#obG)" opacity=".75"/></svg>
        <h1>Welcome to Quietroot</h1>
        <p class="lede">A quiet lot for busy minds.</p>
        <p class="muted">Focus, calm down and plan your day in small steps. Everything you do grows something here, and nothing is ever taken away.</p></div>
      <div class="ob-actions"><button class="btn primary block" id="obNext">Set it up for me</button><button class="btn link" id="obSkip">Skip for now</button></div>
      <p class="center muted" style="font-size:.8rem;margin-top:8px">Three quick questions. Everything stays on this device.</p>`;
  } else if (step === 1) {
    body.innerHTML = `<h2 class="ob-q">What would you like help with?</h2><p class="ob-sub">Pick any that fit. You can use everything either way.</p>
      <div class="stack">${GOALS.map(g => choiceBtn(g, ob.goals.has(g.id), "goal")).join("")}</div>
      <div class="ob-actions"><button class="btn primary block" id="obNext">Continue</button><button class="btn link" id="obBack">Back</button></div>`;
    $$("[data-goal]").forEach(b => b.onclick = () => { const id = b.dataset.goal; ob.goals.has(id) ? ob.goals.delete(id) : ob.goals.add(id); b.setAttribute("aria-pressed", ob.goals.has(id)); });
  } else if (step === 2) {
    body.innerHTML = `<h2 class="ob-q">Is anything uncomfortable for you?</h2><p class="ob-sub">We'll adjust the app. You can change these any time in Settings.</p>
      <div class="stack">${SENS.map(g => choiceBtn(g, ob.sens.has(g.id), "sens")).join("")}</div>
      <div class="ob-actions"><button class="btn primary block" id="obNext">Continue</button><button class="btn link" id="obBack">Back</button></div>`;
    $$("[data-sens]").forEach(b => b.onclick = () => { const id = b.dataset.sens; ob.sens.has(id) ? ob.sens.delete(id) : ob.sens.add(id); b.setAttribute("aria-pressed", ob.sens.has(id)); });
  } else {
    body.innerHTML = `<h2 class="ob-q">When does your day usually start?</h2><p class="ob-sub">Used for one gentle reminder to plan your day. Nothing else.</p>
      <div class="seg" style="margin-bottom:16px">${START_TIMES.map(([l, v]) => `<button data-st="${v}" aria-pressed="${ob.start === v}">${l}</button>`).join("")}</div>
      <button class="choice" id="obRemind" aria-pressed="${ob.remind}"><span class="ic" style="background:color-mix(in srgb,var(--mint) 18%,transparent);color:var(--mint)">${icon("wake")}</span><span class="tx"><span class="t">Remind me to plan my day</span><span class="s">One quiet nudge in the morning</span></span><span class="tick">${icon("check")}</span></button>
      <div class="ob-actions"><button class="btn primary block" id="obNext">Finish</button><button class="btn link" id="obBack">Back</button></div>`;
    $$("[data-st]").forEach(b => b.onclick = () => { ob.start = b.dataset.st; $$("[data-st]").forEach(x => x.setAttribute("aria-pressed", x === b)); });
    $("#obRemind").onclick = e => { ob.remind = !ob.remind; e.currentTarget.setAttribute("aria-pressed", ob.remind); };
  }
  $("#obNext").onclick = () => step < 3 ? renderWelcome(step + 1) : finishWelcome();
  if ($("#obBack")) $("#obBack").onclick = () => renderWelcome(step - 1);
  if ($("#obSkip")) $("#obSkip").onclick = () => { S.onboarded = true; save(); show("home"); };
  window.scrollTo(0, 0);
  const head = $("#obBody h1, #obBody h2"); if (head && step > 0) { head.tabIndex = -1; head.focus({ preventScroll: true }); }
}
function finishWelcome() {
  S.goals = [...ob.goals];
  if (ob.sens.has("sound")) S.music = false;
  if (ob.sens.has("motion")) S.motion = false;
  if (ob.sens.has("bright")) S.theme = "dark";
  const [hh, mm] = ob.start.split(":").map(Number), t = new Date(2000, 0, 1, hh, mm + 30);
  S.reminders.plan = { on: ob.remind, time: `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}` };
  if (S.goals.includes("focus")) S.focusMin = Math.min(S.focusMin, 15);
  if (S.goals.includes("routine") && !S.path.steps.length) { S.path.steps = ["wake", "meds", "shower", "dress", "coffee", "work"].map(k => ({ k, t: STEP[k][0] })); S.path.done = S.path.steps.map(() => false); }
  S.onboarded = true; save(); applySettings();
  if (!S.music) musicStop();
  if (ob.remind) askNotifyPermission();
  show("home");
}

/* ================= Gentle reminders ================= */
const REM = {
  plan: { label: "Plan your day", d: "A morning nudge to set out today's steps", title: "Good morning", body: "Want to lay out today in a few small steps?", go: "path" },
  focus: { label: "Focus nudge", d: "A prompt to start one short session", title: "One small focus session?", body: "Even 5 minutes counts. The hardest part is starting.", go: "focus" },
  wind: { label: "Wind down", d: "An evening reminder to slow down", title: "Time to wind down", body: "A minute of slow breathing can help you switch off.", go: "breathe" }
};
function askNotifyPermission() { try { if ("Notification" in window && Notification.permission === "default") Notification.requestPermission().then(renderRemNote); } catch (e) {} }
function notify(title, body, go) {
  if (!document.hidden) return false;
  try {
    if (!("Notification" in window) || Notification.permission !== "granted") return false;
    const opts = { body, tag: "quietroot", icon: "icon.svg", data: { go } };
    if (navigator.serviceWorker?.controller) navigator.serviceWorker.ready.then(r => r.showNotification(title, opts));
    else { const n = new Notification(title, opts); n.onclick = () => { window.focus(); show(go); n.close(); }; }
    return true;
  } catch (e) { return false; }
}
function inAppNudge(r) {
  const el = $("#toast");
  el.innerHTML = `<span class="ti">${icon(r.go === "path" ? "path" : r.go)}</span><div><b>${r.title}</b><span>${r.body}</span></div><button class="btn sm primary" id="nudgeGo">Open</button>`;
  el.classList.remove("hidden");
  $("#nudgeGo").onclick = () => { el.classList.add("hidden"); show(r.go); };
  clearTimeout(grow.t); grow.t = setTimeout(() => el.classList.add("hidden"), 12000);
}
function checkReminders() {
  const now = new Date(), mins = now.getHours() * 60 + now.getMinutes();
  for (const [k, cfg] of Object.entries(S.reminders)) {
    if (!cfg.on || S.remFired[k] === today()) continue;
    const [h, m] = cfg.time.split(":").map(Number), at = h * 60 + m;
    if (mins < at || mins - at > 120) continue;                 // never send stale reminders
    if (k === "plan" && S.path.done.some(Boolean)) { S.remFired[k] = today(); continue; } // already on it
    if (k === "focus" && fs.started) continue;
    S.remFired[k] = today(); save();
    const r = REM[k];
    if (!notify(r.title, r.body, r.go) && !document.hidden) inAppNudge(r);
  }
}
setInterval(checkReminders, 30 * 1000);
function renderRemNote() {
  const perm = "Notification" in window ? Notification.permission : "unsupported";
  $("#remNote").textContent = perm === "denied" ? "Notifications are blocked for this site, so reminders will only appear inside the app. You can allow them in your browser settings."
    : "Never more than one at a time, and never if you've already started. In this web version, reminders arrive while Quietroot is open or in the background.";
}
function renderSettings() {
  applySettings(); renderInstall();
  $("#remGroup").innerHTML = Object.entries(REM).map(([k, r]) => `<div class="set"><div><div>${r.label}</div><div class="d">${r.d}</div></div>
    <div class="rem-ctrl"><input type="time" data-rtime="${k}" value="${S.reminders[k].time}" aria-label="${r.label} time"><button class="switch" role="switch" data-rem="${k}" aria-checked="${S.reminders[k].on}" aria-label="${r.label}"><i></i></button></div></div>`).join("");
  $$("[data-rem]").forEach(b => b.onclick = () => { const c = S.reminders[b.dataset.rem]; c.on = !c.on; delete S.remFired[b.dataset.rem]; save(); b.setAttribute("aria-checked", c.on); if (c.on) askNotifyPermission(); });
  $$("[data-rtime]").forEach(inp => inp.onchange = () => { if (inp.value) { S.reminders[inp.dataset.rtime].time = inp.value; delete S.remFired[inp.dataset.rtime]; save(); } });
  renderRemNote();
}

/* ================= After-activity check ("Did it help?") ================= */
const EFFECT_KINDS = ["focus", "breathe", "sort", "pattern", "fireflies", "rake"];
function askEffect(kind) {
  if (!EFFECT_KINDS.includes(kind) || current !== kind || S.today["asked_" + kind]) return;
  S.today["asked_" + kind] = true;
  const host = $(`#s-${kind} [data-say]`); if (!host) return;
  $$(".after").forEach(el => el.remove());
  const box = document.createElement("div"); box.className = "card after";
  box.innerHTML = `<span class="q">How do you feel now, compared to before?</span><div class="row"><button class="btn sm" data-eff="1">Better</button><button class="btn sm" data-eff="0">Same</button><button class="btn sm" data-eff="-1">Not better</button></div>`;
  host.after(box);
  $$("[data-eff]", box).forEach(b => b.onclick = () => {
    S.effects.push({ k: kind, r: +b.dataset.eff, t: Date.now() }); S.effects = S.effects.slice(-200); save(); tone(523, .15);
    box.innerHTML = `<span class="muted">Noted. Over time, your weekly reflection will show what helps you most.</span>`;
    setTimeout(() => box.remove(), 4000);
  });
}

/* ================= Weekly insights ================= */
function renderInsights() {
  const now = Date.now(), WEEK = 7 * 864e5, MONTH = 30 * 864e5;
  const weekPlants = S.plants.filter(p => p.t && now - p.t < WEEK);
  const weekDays = S.days.filter(d => { const [y, m, dd] = d.split("-").map(Number); return now - new Date(y, m - 1, dd).getTime() < WEEK; }).length;
  const weekFeel = S.feelLog.filter(f => now - f.t < WEEK);
  const wk = weekStrip();
  let html = `<div class="card ins"><h3>This week</h3><div class="week">${wk.html}</div><p style="margin-top:10px">${wk.count ? `${wk.count} day${wk.count === 1 ? "" : "s"} in the lot. Any day you visit counts.` : "Any day you visit counts. Nothing is lost by missing one."}</p></div><div class="stats"><div class="card stat"><b>${weekDays}</b><span>days here</span></div><div class="card stat"><b>${weekPlants.length}</b><span>plants grown</span></div><div class="card stat"><b>${weekFeel.length}</b><span>check-ins</span></div></div>`;
  // what helps
  const eff = S.effects.filter(e => now - e.t < MONTH), by = {};
  eff.forEach(e => { (by[e.k] = by[e.k] || { n: 0, good: 0 }); by[e.k].n++; if (e.r > 0) by[e.k].good++; });
  const rows = Object.entries(by).filter(([, v]) => v.n >= 2).sort((a, b) => b[1].good / b[1].n - a[1].good / a[1].n);
  html += `<div class="card ins"><h3>What seems to help you</h3>${rows.length ? `<div class="helps">${rows.map(([k, v]) => `<div class="help-row"><div class="top"><b>${ACTS[k].name}</b><span class="muted">helped ${v.good} of ${v.n} times</span></div><div class="meter"><i style="width:${v.good / v.n * 100}%"></i></div></div>`).join("")}</div>
    <p style="margin-top:12px">${rows[0][1].good / rows[0][1].n >= .6 ? `${ACTS[rows[0][0]].name} looks like a good go-to when things feel hard.` : "No clear favourite yet. That's useful to know too."}</p>`
    : `<p>After an activity, tap how you feel. Once an activity has two answers, patterns from the last 30 days show up here.</p>`}</div>`;
  // moods
  if (weekFeel.length) {
    const cnt = {}; weekFeel.forEach(f => cnt[f.f] = (cnt[f.f] || 0) + 1);
    const list = Object.entries(cnt).sort((a, b) => b[1] - a[1]), top = FEEL.find(f => f.id === list[0][0]);
    html += `<div class="card ins"><h3>How you've felt this week</h3><div class="moodbar">${list.map(([id, n]) => `<i style="flex:${n};background:${FEEL.find(f => f.id === id).c}"></i>`).join("")}</div>
      <div class="legend">${list.map(([id, n]) => { const f = FEEL.find(x => x.id === id); return `<span>${dot(f.c)}${f.w} · ${n}</span>`; }).join("")}</div>
      <p style="margin-top:10px">Most often: <b style="color:var(--text)">${top.w.toLowerCase()}</b>. ${["calm", "content"].includes(top.id) ? "Good to see." : "That's worth being gentle with yourself about."}</p></div>`;
  } else html += `<div class="card ins"><h3>How you've felt this week</h3><p>No check-ins this week yet. A quick one from the home screen takes 30 seconds.</p></div>`;
  // planning
  const planned = Object.entries(S.pathLog).filter(([d]) => { const [y, m, dd] = d.split("-").map(Number); return now - new Date(y, m - 1, dd).getTime() < WEEK; }).map(([, v]) => v);
  if (planned.length) {
    const total = planned.reduce((a, v) => a + v.n, 0), done = planned.reduce((a, v) => a + v.d, 0);
    html += `<div class="card ins"><h3>Planning</h3><p>You planned <b style="color:var(--text)">${planned.length} day${planned.length === 1 ? "" : "s"}</b> and finished <b style="color:var(--text)">${Math.round(done / total * 100)}%</b> of your steps. ${done / total < .5 ? "Shorter lists might feel lighter. Three steps is plenty." : "Lists of this size seem to work for you."}</p></div>`;
  } else html += `<div class="card ins"><h3>Planning</h3><p>Plan a day in Today and you'll see how it went here.</p></div>`;
  // time of day
  if (weekPlants.length >= 3) {
    const parts = { morning: 0, afternoon: 0, evening: 0, night: 0 };
    weekPlants.forEach(p => { const h = new Date(p.t).getHours(); parts[h < 5 ? "night" : h < 12 ? "morning" : h < 17 ? "afternoon" : h < 22 ? "evening" : "night"]++; });
    const best = Object.entries(parts).sort((a, b) => b[1] - a[1])[0][0];
    html += `<div class="card ins"><h3>Your rhythm</h3><p>You use the garden most in the <b style="color:var(--text)">${best}</b>. If you have something hard to start, that might be a good time to try it.</p></div>`;
  }
  $("#insightsBody").innerHTML = html;
}

/* ================= Backup ================= */
$("#exportBtn").onclick = () => {
  const blob = new Blob([JSON.stringify({ app: "quietroot", v: 1, saved: new Date().toISOString(), data: S }, null, 2)], { type: "application/json" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `quietroot-backup-${today()}.json`; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
};
$("#importBtn").onclick = () => $("#importFile").click();
$("#importFile").onchange = async e => {
  const f = e.target.files[0]; if (!f) return;
  try {
    const j = JSON.parse(await f.text()), d = j && (j.app === "quietroot" || j.app === "calm-garden") ? j.data : null;
    if (!d || !Array.isArray(d.plants)) throw new Error("not a backup");
    e.target.value = "";
    if (!(await ask(`Restore this backup with ${d.plants.length} plants? It replaces what's on this device.`, "Restore"))) return;
    S = Object.assign(structuredClone(DEF), d); save(); applySettings(); show("home");
    note("Backup restored", `${d.plants.length} plants are back in your garden.`);
  } catch (err) { e.target.value = ""; note("Couldn't restore", "That file doesn't look like a Quietroot backup."); }
};
/* Install as an app (Android/desktop Chrome show a real prompt; iPhone needs Share → Add to Home Screen). */
let installEvt = null;
const isInstalled = () => matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
function renderInstall() {
  const btn = $("#installBtn"), note = $("#installNote"), row = btn.closest(".group");
  if (window.CG_SHARED) { row.classList.add("hidden"); row.previousElementSibling.classList.add("hidden"); return; }
  if (isInstalled()) { note.textContent = "Installed. Quietroot works offline on this device."; btn.classList.add("hidden"); return; }
  btn.classList.toggle("hidden", !installEvt && !isIOS);
  if (isIOS) { btn.textContent = "How"; note.textContent = "Tap the Share button in Safari, then Add to Home Screen."; }
  else if (!installEvt) note.textContent = "Open your browser's menu and choose Install app or Add to Home screen.";
}
window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); installEvt = e; if (current === "settings") renderInstall(); });
window.addEventListener("appinstalled", () => { installEvt = null; note("Installed", "Quietroot is on your home screen now."); renderInstall(); });
$("#installBtn").onclick = async () => {
  if (isIOS) { note("Add to Home Screen", "In Safari, tap Share (the square with an arrow), then Add to Home Screen."); return; }
  if (!installEvt) return;
  installEvt.prompt(); const { outcome } = await installEvt.userChoice; installEvt = null; renderInstall();
  if (outcome === "accepted") tone(659, .4);
};

/* In-game confirmation (browser pop-ups are blocked in some places, and these look nicer anyway). */
function ask(text, yes = "OK") {
  return new Promise(res => {
    const bg = $("#askBg"), prev = document.activeElement;
    $("#askText").textContent = text; $("#askYes").textContent = yes; bg.classList.remove("hidden"); $("#askNo").focus();
    const done = v => { bg.classList.add("hidden"); document.removeEventListener("keydown", key); prev?.focus?.(); res(v); };
    const key = e => { if (e.key === "Escape") done(false); };
    document.addEventListener("keydown", key);
    $("#askYes").onclick = () => done(true); $("#askNo").onclick = () => done(false);
    bg.onclick = e => { if (e.target === bg) done(false); };
  });
}
function undoable(msg, undo) {
  const el = $("#toast");
  el.innerHTML = `<span class="ti">${icon("x")}</span><div><b>${esc(msg)}</b></div><button class="btn sm" id="undoBtn">Undo</button>`;
  el.classList.remove("hidden"); $("#undoBtn").onclick = () => { el.classList.add("hidden"); undo(); };
  clearTimeout(grow.t); grow.t = setTimeout(() => el.classList.add("hidden"), 6000);
}
function note(title, body) {
  const el = $("#toast");
  el.innerHTML = `<span class="ti">${icon("sparkle")}</span><div><b>${title}</b><span>${body}</span></div>`;
  el.classList.remove("hidden"); clearTimeout(grow.t); grow.t = setTimeout(() => el.classList.add("hidden"), 4000);
}
// The shared web link can't download files, so backup lives in the installed app only.
if (window.CG_SHARED) $$("#exportBtn, #importBtn").forEach(b => b.closest(".set").classList.add("hidden"));
$("#redoSetup").onclick = () => { ob.goals = new Set(S.goals); show("welcome"); };

/* ================= Settings ================= */
function applySettings() {
  const r = document.documentElement;
  r.dataset.theme = S.theme; r.dataset.contrast = S.contrast ? "high" : ""; r.dataset.motion = S.motion ? "on" : "off";
  r.style.setProperty("--fs", S.fs + "rem");
  $('meta[name="theme-color"]').content = S.theme === "light" ? "#e7e5df" : "#24272a";
  const val = { music: S.music, sound: S.sound, still: !S.motion, contrast: S.contrast };
  $$("[data-set]").forEach(b => b.setAttribute("aria-checked", !!val[b.dataset.set]));
  $$("[data-theme-btn]").forEach(b => b.setAttribute("aria-pressed", b.dataset.themeBtn === S.theme));
  $("#vol").value = Math.round(S.vol * 100);
  $("#trackList").innerHTML = Object.entries(TRACKS).map(([id, t]) => `<button class="choice track" data-track="${id}" aria-pressed="${id === S.track}">
      <span class="ic" style="background:color-mix(in srgb,var(--mint) 14%,transparent);color:var(--mint)">${icon(t.ic)}</span>
      <span class="tx"><span class="t">${t.name}</span><span class="s">${t.d}</span></span><span class="tick">${icon("check")}</span></button>`).join("");
  $$("[data-track]").forEach(b => b.onclick = () => {
    if (!S.music) { S.music = true; }
    setTrack(b.dataset.track); applySettings();
  });
  const mb =$("#musicBtn"); mb.setAttribute("aria-pressed", S.music); mb.setAttribute("aria-label", S.music ? "Turn music off" : "Turn music on"); mb.innerHTML = icon(S.music ? "music" : "musicOff");
}
const setMusic = on => { S.music = on; save(); applySettings(); on ? musicStart() : musicStop(); };
$$("[data-set]").forEach(b => b.onclick = () => {
  const k = b.dataset.set;
  if (k === "music") return setMusic(!S.music);
  if (k === "still") S.motion = !S.motion; else S[k] = !S[k];
  save(); applySettings(); tone(523, .15);
  if (current === "home") drawLot();
});
$$("[data-theme-btn]").forEach(b => b.onclick = () => { S.theme = b.dataset.themeBtn; save(); applySettings(); });
$("#musicBtn").onclick = () => setMusic(!S.music);
$("#vol").oninput = e => { S.vol = e.target.value / 100; save(); musicVolume(); };
$("#fsUp").onclick = () => { S.fs = Math.min(1.25, +(S.fs + .0625).toFixed(4)); save(); applySettings(); };
$("#fsDown").onclick = () => { S.fs = Math.max(.875, +(S.fs - .0625).toFixed(4)); save(); applySettings(); };
$("#resetBtn").onclick = async () => { if (await ask("Start your garden over? All plants and check-ins will be removed. This can't be undone.", "Start over")) { S.plants = []; S.days = []; S.feelLog = []; S.today = { day: today() }; save(); show("home"); } };

/* ================= start ================= */
applySettings(); save();
const startAt = location.hash.slice(1);
show(!S.onboarded ? "welcome" : ["focus", "breathe", "path"].includes(startAt) ? startAt : "home");
try { if (location.hash && !window.CG_SHARED) history.replaceState(null, "", location.pathname); } catch (e) {}
checkReminders();
// Service worker: lets reminders show as real notifications (and later, offline play).
if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
  navigator.serviceWorker.addEventListener("message", e => { if (e.data && SCREENS.includes(e.data.go)) show(e.data.go); });
}
setInterval(() => { if (current === "home" && !document.hidden) drawSkyline(); }, 60 * 1000); // sun, moon and sky follow the clock
document.addEventListener("visibilitychange", () => { if (!document.hidden && current === "home") drawSkyline(); });
