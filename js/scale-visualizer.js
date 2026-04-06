// Fretboard Scale Visualizer - SVG based
import { NOTES, STANDARD_TUNING, SCALE_FORMULAS, noteToIndex, midiToNote, midiToFreq, intervalToDegree, getDisplayMode, toggleDisplayMode } from './data/theory.js';
import { SCALE_PRESETS } from './data/scales.js';

const SVG_NS = 'http://www.w3.org/2000/svg';

const FRETBOARD_OPTS = {
  numFrets: 12,
  paddingTop: 20,
  paddingBottom: 30,
  paddingLeft: 40,
  paddingRight: 20,
  stringSpacing: 24,
  fretSpacing: 55,
  dotRadius: 10,
  inlayFrets: [3, 5, 7, 9, 12],
  doubleInlayFrets: [12],
};

function createSvgEl(tag, attrs = {}) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

function getIntervalClass(interval) {
  if (interval === 0) return 'root';
  if (interval === 3 || interval === 4) return 'third';
  if (interval === 7) return 'fifth';
  if (interval === 10 || interval === 11) return 'seventh';
  return 'other';
}

// Core fretboard rendering — accepts either a preset key or direct { root, formula } object
function drawFretboardSVG(container, root, formula, description, opts = {}) {
  const rootIdx = noteToIndex(root);
  const o = { ...FRETBOARD_OPTS, ...opts };

  const width = o.paddingLeft + o.paddingRight + o.numFrets * o.fretSpacing;
  const height = o.paddingTop + o.paddingBottom + (STANDARD_TUNING.length - 1) * o.stringSpacing;

  const wrapper = document.createElement('div');
  wrapper.className = 'fretboard-container';

  const svg = createSvgEl('svg', {
    viewBox: `0 0 ${width} ${height}`,
    class: 'fretboard-svg',
    width: width,
    height: height,
  });

  // Nut
  svg.appendChild(createSvgEl('line', {
    x1: o.paddingLeft, y1: o.paddingTop,
    x2: o.paddingLeft, y2: o.paddingTop + (STANDARD_TUNING.length - 1) * o.stringSpacing,
    class: 'fretboard-svg__nut',
  }));

  // Frets
  for (let f = 1; f <= o.numFrets; f++) {
    const x = o.paddingLeft + f * o.fretSpacing;
    svg.appendChild(createSvgEl('line', {
      x1: x, y1: o.paddingTop,
      x2: x, y2: o.paddingTop + (STANDARD_TUNING.length - 1) * o.stringSpacing,
      class: 'fretboard-svg__fret',
    }));
  }

  // Inlays
  for (const f of o.inlayFrets) {
    if (f > o.numFrets) continue;
    const x = o.paddingLeft + (f - 0.5) * o.fretSpacing;
    if (o.doubleInlayFrets.includes(f)) {
      const yMid = o.paddingTop + (STANDARD_TUNING.length - 1) * o.stringSpacing / 2;
      svg.appendChild(createSvgEl('circle', { cx: x, cy: yMid - o.stringSpacing, r: 4, class: 'fretboard-svg__inlay' }));
      svg.appendChild(createSvgEl('circle', { cx: x, cy: yMid + o.stringSpacing, r: 4, class: 'fretboard-svg__inlay' }));
    } else {
      const y = o.paddingTop + (STANDARD_TUNING.length - 1) * o.stringSpacing / 2;
      svg.appendChild(createSvgEl('circle', { cx: x, cy: y, r: 4, class: 'fretboard-svg__inlay' }));
    }
  }

  // Fret numbers
  for (let f = 1; f <= o.numFrets; f++) {
    const x = o.paddingLeft + (f - 0.5) * o.fretSpacing;
    const y = o.paddingTop + (STANDARD_TUNING.length - 1) * o.stringSpacing + 20;
    const text = createSvgEl('text', { x, y, class: 'fretboard-svg__fret-num' });
    text.textContent = f;
    svg.appendChild(text);
  }

  // Strings (1st string at top, 6th at bottom)
  for (let s = 0; s < STANDARD_TUNING.length; s++) {
    const visualRow = STANDARD_TUNING.length - 1 - s;
    const y = o.paddingTop + visualRow * o.stringSpacing;
    const isThick = s < 3;
    svg.appendChild(createSvgEl('line', {
      x1: o.paddingLeft, y1: y,
      x2: o.paddingLeft + o.numFrets * o.fretSpacing, y2: y,
      class: `fretboard-svg__string ${isThick ? 'fretboard-svg__string--thick' : 'fretboard-svg__string--thin'}`,
    }));

    const label = createSvgEl('text', {
      x: o.paddingLeft - 20, y: y,
      class: 'fretboard-svg__fret-num',
      'text-anchor': 'middle', 'dominant-baseline': 'central',
    });
    label.textContent = midiToNote(STANDARD_TUNING[s]);
    svg.appendChild(label);
  }

  // Scale notes
  for (let s = 0; s < STANDARD_TUNING.length; s++) {
    const openMidi = STANDARD_TUNING[s];
    const visualRow = STANDARD_TUNING.length - 1 - s;
    const y = o.paddingTop + visualRow * o.stringSpacing;

    for (let f = 0; f <= o.numFrets; f++) {
      const midi = openMidi + f;
      const noteIdx = midi % 12;
      const noteRelative = (noteIdx - rootIdx + 12) % 12;

      if (!formula.includes(noteRelative)) continue;

      const x = f === 0 ? o.paddingLeft - 2 : o.paddingLeft + (f - 0.5) * o.fretSpacing;
      const intervalClass = getIntervalClass(noteRelative);

      const group = createSvgEl('g', { class: 'fretboard-svg__note' });
      group.dataset.midi = midi;
      group.dataset.note = NOTES[noteIdx];

      group.appendChild(createSvgEl('circle', {
        cx: x, cy: y, r: o.dotRadius,
        class: `fretboard-svg__note-circle fretboard-svg__note-circle--${intervalClass}`,
      }));

      const text = createSvgEl('text', { x, y, class: 'fretboard-svg__note-text' });
      text.textContent = getDisplayMode() === 'degree' ? intervalToDegree(noteRelative) : NOTES[noteIdx];
      group.appendChild(text);

      group.addEventListener('click', () => {
        if (window.guitarAudio) window.guitarAudio.playNote(midiToFreq(midi), 0.8);
      });

      svg.appendChild(group);
    }
  }

  wrapper.appendChild(svg);

  // Legend
  const legend = document.createElement('div');
  legend.className = 'fretboard-legend';
  for (const item of [
    { cls: 'root', label: '根音 (Root)' },
    { cls: 'third', label: '三度 (3rd)' },
    { cls: 'fifth', label: '五度 (5th)' },
    { cls: 'seventh', label: '七度 (7th)' },
    { cls: 'other', label: '其他音级' },
  ]) {
    const el = document.createElement('div');
    el.className = 'fretboard-legend__item';
    el.innerHTML = `<span class="fretboard-legend__dot fretboard-legend__dot--${item.cls}"></span>${item.label}`;
    legend.appendChild(el);
  }
  wrapper.appendChild(legend);

  if (description) {
    const desc = document.createElement('div');
    desc.style.cssText = 'margin-top: 8px; font-size: 0.85rem; color: var(--color-text-dim);';
    desc.textContent = description;
    wrapper.appendChild(desc);
  }

  container.appendChild(wrapper);
  return wrapper;
}

// Public API: render by preset key (backward compatible)
export function renderFretboard(container, scaleKey, opts = {}) {
  const preset = SCALE_PRESETS[scaleKey];
  if (!preset) return;
  const formula = SCALE_FORMULAS[preset.formula];
  return drawFretboardSVG(container, preset.root, formula, `音程公式: ${preset.description}`, opts);
}

// Public API: render by direct root + formula name
export function renderFretboardDirect(container, root, formulaName, opts = {}) {
  const formula = SCALE_FORMULAS[formulaName];
  if (!formula) return;
  return drawFretboardSVG(container, root, formula, null, opts);
}

// Scale type options for the interactive selector
const SCALE_TYPE_OPTIONS = [
  { group: '基础音阶', items: [
    { key: 'major', label: '大调 (Ionian)' },
    { key: 'natural_minor', label: '自然小调 (Aeolian)' },
    { key: 'harmonic_minor', label: '和声小调' },
    { key: 'melodic_minor', label: '旋律小调' },
  ]},
  { group: '五声 & 布鲁斯', items: [
    { key: 'pentatonic_major', label: '五声大调' },
    { key: 'pentatonic_minor', label: '五声小调' },
    { key: 'blues', label: '布鲁斯音阶' },
  ]},
  { group: '七种调式 (Modes)', items: [
    { key: 'ionian', label: 'Ionian (大调)' },
    { key: 'dorian', label: 'Dorian (多利安)' },
    { key: 'phrygian', label: 'Phrygian (弗里几安)' },
    { key: 'lydian', label: 'Lydian (利底安)' },
    { key: 'mixolydian', label: 'Mixolydian (混合利底安)' },
    { key: 'aeolian', label: 'Aeolian (自然小调)' },
    { key: 'locrian', label: 'Locrian (洛克里安)' },
  ]},
];

// Map mode keys to their interval formulas (modes use same keys as in theory.js MODES)
import { MODES } from './data/theory.js';

function getFormulaByKey(key) {
  if (SCALE_FORMULAS[key]) return SCALE_FORMULAS[key];
  if (MODES[key]) return MODES[key].intervals;
  return null;
}

// Interactive fretboard with root + scale type selectors
export function renderInteractiveFretboard(container, options = {}) {
  const wrapper = document.createElement('div');
  wrapper.className = 'fretboard-interactive';

  // Controls row
  const controls = document.createElement('div');
  controls.className = 'fretboard-interactive__controls';

  // Root selector
  const rootLabel = document.createElement('label');
  rootLabel.className = 'fretboard-interactive__label';
  rootLabel.textContent = '根音：';
  const rootSelect = document.createElement('select');
  rootSelect.className = 'fretboard-interactive__select';
  for (const note of NOTES) {
    const opt = document.createElement('option');
    opt.value = note;
    opt.textContent = note;
    rootSelect.appendChild(opt);
  }
  rootSelect.value = options.defaultRoot || 'C';
  rootLabel.appendChild(rootSelect);
  controls.appendChild(rootLabel);

  // Scale type selector
  const scaleLabel = document.createElement('label');
  scaleLabel.className = 'fretboard-interactive__label';
  scaleLabel.textContent = '音阶：';
  const scaleSelect = document.createElement('select');
  scaleSelect.className = 'fretboard-interactive__select fretboard-interactive__select--wide';
  for (const group of SCALE_TYPE_OPTIONS) {
    const optgroup = document.createElement('optgroup');
    optgroup.label = group.group;
    for (const item of group.items) {
      const opt = document.createElement('option');
      opt.value = item.key;
      opt.textContent = item.label;
      optgroup.appendChild(opt);
    }
    scaleSelect.appendChild(optgroup);
  }
  scaleSelect.value = options.defaultScale || 'major';
  scaleLabel.appendChild(scaleSelect);
  controls.appendChild(scaleLabel);

  // Display mode toggle
  const modeBtn = createModeToggleBtn();
  controls.appendChild(modeBtn);

  wrapper.appendChild(controls);

  // Fretboard container
  const fbContainer = document.createElement('div');
  fbContainer.className = 'fretboard-interactive__board';
  wrapper.appendChild(fbContainer);

  // Render function
  function update() {
    fbContainer.innerHTML = '';
    const root = rootSelect.value;
    const scaleKey = scaleSelect.value;
    const formula = getFormulaByKey(scaleKey);
    if (formula) {
      const label = scaleSelect.options[scaleSelect.selectedIndex].textContent;
      drawFretboardSVG(fbContainer, root, formula, `${root} ${label}`);
    }
  }

  rootSelect.addEventListener('change', update);
  scaleSelect.addEventListener('change', update);
  window.addEventListener('display-mode-change', update);
  update();

  container.appendChild(wrapper);
  return wrapper;
}

// Shared: create a "音名/唱名" toggle button
function createModeToggleBtn() {
  const btn = document.createElement('button');
  btn.className = 'btn btn--ghost fretboard-interactive__mode-btn';
  btn.textContent = getDisplayMode() === 'note' ? '切换唱名 1234567' : '切换音名 CDEFGAB';
  btn.addEventListener('click', () => {
    const mode = toggleDisplayMode();
    btn.textContent = mode === 'note' ? '切换唱名 1234567' : '切换音名 CDEFGAB';
  });
  // Keep button text in sync when toggled from elsewhere
  window.addEventListener('display-mode-change', (e) => {
    btn.textContent = e.detail === 'note' ? '切换唱名 1234567' : '切换音名 CDEFGAB';
  });
  return btn;
}

// Simple major-scale-only picker: just a root note selector, formula locked to 'major'
export function renderMajorScalePicker(container) {
  const wrapper = document.createElement('div');
  wrapper.className = 'fretboard-interactive';

  const controls = document.createElement('div');
  controls.className = 'fretboard-interactive__controls';

  const label = document.createElement('label');
  label.className = 'fretboard-interactive__label';
  label.textContent = '选择调性：';
  const select = document.createElement('select');
  select.className = 'fretboard-interactive__select';
  for (const note of NOTES) {
    const opt = document.createElement('option');
    opt.value = note;
    opt.textContent = `${note} 大调`;
    select.appendChild(opt);
  }
  select.value = 'C';
  label.appendChild(select);
  controls.appendChild(label);

  const modeBtn = createModeToggleBtn();
  controls.appendChild(modeBtn);

  wrapper.appendChild(controls);

  const fbContainer = document.createElement('div');
  fbContainer.className = 'fretboard-interactive__board';
  wrapper.appendChild(fbContainer);

  function update() {
    fbContainer.innerHTML = '';
    drawFretboardSVG(fbContainer, select.value, SCALE_FORMULAS.major, `${select.value} 大调音阶`);
  }

  select.addEventListener('change', update);
  window.addEventListener('display-mode-change', update);
  update();

  container.appendChild(wrapper);
  return wrapper;
}
