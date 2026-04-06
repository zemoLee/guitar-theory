// Guitar Tuner - microphone input + autocorrelation pitch detection
import { midiToFreq } from './data/theory.js';

// Standard tuning: string 6→1
const STRINGS = [
  { name: '6弦 E2', note: 'E2', midi: 40, freq: midiToFreq(40) },
  { name: '5弦 A2', note: 'A2', midi: 45, freq: midiToFreq(45) },
  { name: '4弦 D3', note: 'D3', midi: 50, freq: midiToFreq(50) },
  { name: '3弦 G3', note: 'G3', midi: 55, freq: midiToFreq(55) },
  { name: '2弦 B3', note: 'B3', midi: 59, freq: midiToFreq(59) },
  { name: '1弦 E4', note: 'E4', midi: 64, freq: midiToFreq(64) },
];

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Convert frequency to nearest note info
function freqToNoteInfo(freq) {
  const midi = 12 * Math.log2(freq / 440) + 69;
  const roundedMidi = Math.round(midi);
  const cents = Math.round((midi - roundedMidi) * 100);
  const noteName = NOTE_NAMES[roundedMidi % 12];
  const octave = Math.floor(roundedMidi / 12) - 1;
  return { midi: roundedMidi, cents, noteName, octave, fullName: `${noteName}${octave}` };
}

// Find the closest guitar string to detected frequency
function findClosestString(freq) {
  let closest = 0;
  let minDist = Infinity;
  for (let i = 0; i < STRINGS.length; i++) {
    const dist = Math.abs(1200 * Math.log2(freq / STRINGS[i].freq));
    if (dist < minDist) {
      minDist = dist;
      closest = i;
    }
  }
  return closest;
}

// Autocorrelation pitch detection
function autoCorrelate(buffer, sampleRate) {
  const SIZE = buffer.length;

  // Check if signal is strong enough
  let rms = 0;
  for (let i = 0; i < SIZE; i++) rms += buffer[i] * buffer[i];
  rms = Math.sqrt(rms / SIZE);
  if (rms < 0.01) return -1; // too quiet

  // Trim silence from edges
  let r1 = 0, r2 = SIZE - 1;
  const threshold = 0.2;
  for (let i = 0; i < SIZE / 2; i++) {
    if (Math.abs(buffer[i]) < threshold) { r1 = i; break; }
  }
  for (let i = 1; i < SIZE / 2; i++) {
    if (Math.abs(buffer[SIZE - i]) < threshold) { r2 = SIZE - i; break; }
  }

  const trimmed = buffer.slice(r1, r2);
  const len = trimmed.length;

  // Autocorrelation
  const corr = new Float32Array(len);
  for (let lag = 0; lag < len; lag++) {
    let sum = 0;
    for (let i = 0; i < len - lag; i++) {
      sum += trimmed[i] * trimmed[i + lag];
    }
    corr[lag] = sum;
  }

  // Find first dip then first peak after it
  let d = 0;
  while (corr[d] > corr[d + 1] && d < len) d++;

  let maxVal = -1, maxPos = -1;
  for (let i = d; i < len; i++) {
    if (corr[i] > maxVal) {
      maxVal = corr[i];
      maxPos = i;
    }
  }

  if (maxPos === -1 || maxVal < 0.01) return -1;

  // Parabolic interpolation for sub-sample accuracy
  const y1 = corr[maxPos - 1] || 0;
  const y2 = corr[maxPos];
  const y3 = corr[maxPos + 1] || 0;
  const shift = (y3 - y1) / (2 * (2 * y2 - y1 - y3));
  const period = maxPos + (isFinite(shift) ? shift : 0);

  return sampleRate / period;
}

export class GuitarTuner {
  constructor(container) {
    this.container = container;
    this.audioCtx = null;
    this.analyser = null;
    this.mediaStream = null;
    this.isRunning = false;
    this.animFrameId = null;
    this.selectedString = -1; // -1 = auto detect
    this.smoothedCents = 0;

    this.buildUI();
  }

  buildUI() {
    this.container.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'tuner';

    // String selector
    const stringsRow = document.createElement('div');
    stringsRow.className = 'tuner__strings';
    this.stringBtns = [];

    // Auto button
    const autoBtn = document.createElement('button');
    autoBtn.className = 'tuner__string-btn tuner__string-btn--active';
    autoBtn.textContent = '自动';
    autoBtn.addEventListener('click', () => this.selectString(-1));
    stringsRow.appendChild(autoBtn);
    this.stringBtns.push(autoBtn);

    for (let i = 0; i < STRINGS.length; i++) {
      const btn = document.createElement('button');
      btn.className = 'tuner__string-btn';
      btn.innerHTML = `<span class="tuner__string-num">${6 - i}</span><span class="tuner__string-note">${STRINGS[i].note}</span>`;
      btn.addEventListener('click', () => this.selectString(i));

      // Play reference tone on long press / right click
      btn.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        this.playReference(i);
      });

      stringsRow.appendChild(btn);
      this.stringBtns.push(btn);
    }
    wrapper.appendChild(stringsRow);

    // Gauge
    const gauge = document.createElement('div');
    gauge.className = 'tuner__gauge';

    // Gauge scale markings
    const scale = document.createElement('div');
    scale.className = 'tuner__scale';
    for (let c = -50; c <= 50; c += 10) {
      const mark = document.createElement('div');
      mark.className = 'tuner__scale-mark';
      if (c === 0) mark.classList.add('tuner__scale-mark--center');
      const pct = 50 + c;
      mark.style.left = `${pct}%`;
      if (c % 20 === 0) {
        mark.classList.add('tuner__scale-mark--major');
        const label = document.createElement('span');
        label.className = 'tuner__scale-label';
        label.textContent = c > 0 ? `+${c}` : `${c}`;
        mark.appendChild(label);
      }
      scale.appendChild(mark);
    }
    gauge.appendChild(scale);

    // Color zones
    const zones = document.createElement('div');
    zones.className = 'tuner__zones';
    zones.innerHTML = `
      <div class="tuner__zone tuner__zone--red-left"></div>
      <div class="tuner__zone tuner__zone--yellow-left"></div>
      <div class="tuner__zone tuner__zone--green"></div>
      <div class="tuner__zone tuner__zone--yellow-right"></div>
      <div class="tuner__zone tuner__zone--red-right"></div>
    `;
    gauge.appendChild(zones);

    // Needle
    this.needle = document.createElement('div');
    this.needle.className = 'tuner__needle';
    gauge.appendChild(this.needle);

    wrapper.appendChild(gauge);

    // Info display
    const info = document.createElement('div');
    info.className = 'tuner__info';

    this.noteDisplay = document.createElement('div');
    this.noteDisplay.className = 'tuner__note';
    this.noteDisplay.textContent = '—';
    info.appendChild(this.noteDisplay);

    this.freqDisplay = document.createElement('div');
    this.freqDisplay.className = 'tuner__freq';
    this.freqDisplay.textContent = '— Hz';
    info.appendChild(this.freqDisplay);

    this.centsDisplay = document.createElement('div');
    this.centsDisplay.className = 'tuner__cents';
    this.centsDisplay.textContent = '0 cents';
    info.appendChild(this.centsDisplay);

    this.statusDisplay = document.createElement('div');
    this.statusDisplay.className = 'tuner__status';
    this.statusDisplay.textContent = '点击下方按钮开始调音';
    info.appendChild(this.statusDisplay);

    wrapper.appendChild(info);

    // Controls
    const controls = document.createElement('div');
    controls.className = 'tuner__controls';

    this.startBtn = document.createElement('button');
    this.startBtn.className = 'btn btn--primary tuner__start-btn';
    this.startBtn.textContent = '🎤 开始调音';
    this.startBtn.addEventListener('click', () => this.toggle());
    controls.appendChild(this.startBtn);

    // Reference tone buttons
    const refLabel = document.createElement('span');
    refLabel.className = 'tuner__ref-label';
    refLabel.textContent = '播放参考音：';
    controls.appendChild(refLabel);

    for (let i = 0; i < STRINGS.length; i++) {
      const btn = document.createElement('button');
      btn.className = 'btn btn--ghost tuner__ref-btn';
      btn.textContent = STRINGS[i].note;
      btn.addEventListener('click', () => this.playReference(i));
      controls.appendChild(btn);
    }

    wrapper.appendChild(controls);
    this.container.appendChild(wrapper);
  }

  selectString(index) {
    this.selectedString = index;
    this.stringBtns.forEach((btn, i) => {
      btn.classList.toggle('tuner__string-btn--active', i === index + 1);
    });
  }

  async toggle() {
    if (this.isRunning) {
      this.stop();
    } else {
      await this.start();
    }
  }

  async start() {
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const source = this.audioCtx.createMediaStreamSource(this.mediaStream);

      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 4096;
      source.connect(this.analyser);

      this.buffer = new Float32Array(this.analyser.fftSize);
      this.isRunning = true;
      this.startBtn.textContent = '⏹ 停止调音';
      this.startBtn.classList.remove('btn--primary');
      this.startBtn.classList.add('btn--ghost');
      this.statusDisplay.textContent = '正在监听...请弹一根弦';
      this.detect();
    } catch (err) {
      this.statusDisplay.textContent = '无法访问麦克风，请检查浏览器权限';
      console.error('Microphone access error:', err);
    }
  }

  stop() {
    this.isRunning = false;
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(t => t.stop());
      this.mediaStream = null;
    }
    if (this.audioCtx) {
      this.audioCtx.close();
      this.audioCtx = null;
    }
    this.startBtn.textContent = '🎤 开始调音';
    this.startBtn.classList.add('btn--primary');
    this.startBtn.classList.remove('btn--ghost');
    this.statusDisplay.textContent = '调音已停止';
    this.noteDisplay.textContent = '—';
    this.freqDisplay.textContent = '— Hz';
    this.centsDisplay.textContent = '0 cents';
    this.needle.style.left = '50%';
    this.needle.className = 'tuner__needle';
  }

  detect() {
    if (!this.isRunning) return;

    this.analyser.getFloatTimeDomainData(this.buffer);
    const freq = autoCorrelate(this.buffer, this.audioCtx.sampleRate);

    if (freq > 60 && freq < 1000) {
      const noteInfo = freqToNoteInfo(freq);

      // Find target string
      let targetIdx;
      if (this.selectedString >= 0) {
        targetIdx = this.selectedString;
      } else {
        targetIdx = findClosestString(freq);
        // Auto-highlight detected string
        this.stringBtns.forEach((btn, i) => {
          if (i === 0) btn.classList.toggle('tuner__string-btn--active', false);
          else btn.classList.toggle('tuner__string-btn--detected', i === targetIdx + 1);
        });
      }

      const target = STRINGS[targetIdx];
      const cents = 1200 * Math.log2(freq / target.freq);

      // Smooth the cents value
      this.smoothedCents = this.smoothedCents * 0.7 + cents * 0.3;
      const displayCents = Math.round(this.smoothedCents);

      // Update displays
      this.noteDisplay.textContent = noteInfo.fullName;
      this.freqDisplay.textContent = `${freq.toFixed(1)} Hz`;
      this.centsDisplay.textContent = `${displayCents > 0 ? '+' : ''}${displayCents} cents`;

      // Update needle (clamp to ±50 cents range)
      const clamped = Math.max(-50, Math.min(50, this.smoothedCents));
      const pct = 50 + clamped;
      this.needle.style.left = `${pct}%`;

      // Color state
      const absCents = Math.abs(this.smoothedCents);
      this.needle.className = 'tuner__needle';
      if (absCents <= 5) {
        this.needle.classList.add('tuner__needle--green');
        this.statusDisplay.textContent = `✓ ${target.name} 准了！`;
      } else if (absCents <= 15) {
        this.needle.classList.add('tuner__needle--yellow');
        this.statusDisplay.textContent = this.smoothedCents > 0
          ? `${target.name} 稍高，需要松弦`
          : `${target.name} 稍低，需要紧弦`;
      } else {
        this.needle.classList.add('tuner__needle--red');
        this.statusDisplay.textContent = this.smoothedCents > 0
          ? `${target.name} 偏高，松弦调低`
          : `${target.name} 偏低，紧弦调高`;
      }
    }

    this.animFrameId = requestAnimationFrame(() => this.detect());
  }

  playReference(stringIdx) {
    if (window.guitarAudio) {
      window.guitarAudio.playNote(STRINGS[stringIdx].freq, 2);
    }
  }
}

export function renderTuner(container) {
  return new GuitarTuner(container);
}
