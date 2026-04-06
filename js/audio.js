// Web Audio API - Guitar-like tone synthesis

let audioCtx = null;

function getContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playNote(frequency, duration = 0.8, volume = 0.3) {
  const ctx = getContext();
  const now = ctx.currentTime;

  // Oscillator with custom wave for guitar-like timbre
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();

  // Guitar-like waveform (sum of harmonics)
  const real = new Float32Array([0, 1, 0.5, 0.3, 0.2, 0.1, 0.05]);
  const imag = new Float32Array(real.length).fill(0);
  const wave = ctx.createPeriodicWave(real, imag);
  osc.setPeriodicWave(wave);
  osc.frequency.value = frequency;

  // ADSR envelope
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(volume, now + 0.01);       // Attack
  gainNode.gain.exponentialRampToValueAtTime(volume * 0.6, now + 0.1); // Decay
  gainNode.gain.setValueAtTime(volume * 0.6, now + 0.1);          // Sustain
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration); // Release

  osc.connect(gainNode);
  gainNode.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + duration + 0.05);
}

export function playChord(frequencies, strumDelay = 0.03, duration = 1.5) {
  frequencies.forEach((freq, i) => {
    setTimeout(() => playNote(freq, duration, 0.2), i * strumDelay * 1000);
  });
}

// Initialize audio on first user interaction
export function initAudio() {
  const handler = () => {
    getContext();
    document.removeEventListener('click', handler);
    document.removeEventListener('touchstart', handler);
  };
  document.addEventListener('click', handler, { once: true });
  document.addEventListener('touchstart', handler, { once: true });
}

// Expose globally for scale visualizer note clicks
window.guitarAudio = { playNote, playChord };
