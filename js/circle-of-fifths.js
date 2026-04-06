// Interactive Circle of Fifths - SVG based
// Design: rotating wheel + fixed "window frame" that highlights 7 diatonic chords with degree labels
import { CIRCLE_OF_FIFTHS, NOTES, getDiatonicChords, PROGRESSIONS, noteToIndex, ROMAN_NUMERALS } from './data/theory.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
const TAU = Math.PI * 2;
const SEGMENT_ANGLE = TAU / 12; // 30 degrees per segment

// Layout radii
const R_OUTER = 195;  // outer edge of major ring
const R_MID = 152;    // boundary between major and minor rings
const R_INNER = 105;  // boundary between minor and signature rings (wider minor ring)
const R_CENTER = 65;  // inner edge of signature ring / center circle
const CENTER = 250;
const SVG_SIZE = 500;

// The 7 diatonic chord positions on the circle of fifths.
//
// Key insight: on the CoF, the MINOR ring labels are at the SAME angle as their
// relative major. For C major:
//   External ring (major): F(-1), C(0), G(+1)  → IV, I, V
//   Internal ring (minor): Dm(-1), Am(0), Em(+1) → ii, vi, iii
//   (Dm sits under F, Am sits under C, Em sits under G)
//   vii° (Bdim) is at offset +5 on the major ring
//
// "offset" = position on the CoF wheel relative to the selected key (at 12 o'clock).
// "ring" = which ring the frame should highlight on.
// For minor chords, the frame goes on the minor ring at the SAME offset as their
// relative major (offset -1, 0, +1), NOT at the major-ring position of their root.

const DIATONIC_COF_OFFSETS = [
  // Major chords on the outer ring
  { offset: -1, degree: 4, roman: 'IV',   numLabel: '4', ring: 'major' },
  { offset:  0, degree: 1, roman: 'I',    numLabel: '1', ring: 'major' },
  { offset:  1, degree: 5, roman: 'V',    numLabel: '5', ring: 'major' },
  // Minor chords on the inner ring (same offsets as IV, I, V — they sit directly underneath)
  { offset: -1, degree: 2, roman: 'ii',   numLabel: '2', ring: 'minor' },
  { offset:  0, degree: 6, roman: 'vi',   numLabel: '6', ring: 'minor' },
  { offset:  1, degree: 3, roman: 'iii',  numLabel: '3', ring: 'minor' },
  // Diminished chord on the outer ring (further clockwise)
  { offset:  5, degree: 7, roman: 'vii°', numLabel: '7', ring: 'dim' },
];


function createSvgEl(tag, attrs = {}) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

function polarToCart(cx, cy, r, angle) {
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}

function arcPath(cx, cy, rInner, rOuter, startAngle, endAngle) {
  const s1 = polarToCart(cx, cy, rOuter, startAngle);
  const e1 = polarToCart(cx, cy, rOuter, endAngle);
  const s2 = polarToCart(cx, cy, rInner, endAngle);
  const e2 = polarToCart(cx, cy, rInner, startAngle);
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
  return [
    `M ${s1.x} ${s1.y}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${e1.x} ${e1.y}`,
    `L ${s2.x} ${s2.y}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${e2.x} ${e2.y}`,
    'Z',
  ].join(' ');
}

function labelPos(cx, cy, r, index) {
  const angle = -Math.PI / 2 + index * SEGMENT_ANGLE;
  return polarToCart(cx, cy, r, angle);
}

export class CircleOfFifths {
  constructor(containerEl, mode = 'basic') {
    this.container = containerEl;
    this.mode = mode;
    this.selectedIndex = 0; // C is at index 0
    this.rotation = 0;
    this.isDragging = false;
    this.dragStartAngle = 0;
    this.rotationStart = 0;
    this.progressionPath = null;
    this.transposeOffset = 0;

    this.build();
  }

  build() {
    this.container.innerHTML = '';
    this.layoutSide = true; // default: info panel on the right

    const wrapper = document.createElement('div');
    wrapper.className = 'cof-container cof-container--side';

    // Layout toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'cof-layout-toggle';
    toggleBtn.title = '切换面板位置';
    toggleBtn.innerHTML = '⇄';
    toggleBtn.addEventListener('click', () => {
      this.layoutSide = !this.layoutSide;
      wrapper.classList.toggle('cof-container--side', this.layoutSide);
      wrapper.classList.toggle('cof-container--bottom', !this.layoutSide);
      toggleBtn.innerHTML = this.layoutSide ? '⇅' : '⇄';
    });
    wrapper.appendChild(toggleBtn);

    const svgWrapper = document.createElement('div');
    svgWrapper.className = 'cof-wrapper';

    this.svg = createSvgEl('svg', {
      viewBox: `0 0 ${SVG_SIZE} ${SVG_SIZE}`,
      class: 'cof-svg',
    });

    // === Layer 1: Rotating wheel (all 12 segments) ===
    this.wheelGroup = createSvgEl('g', { class: 'cof-wheel' });
    this.drawSegments();
    this.svg.appendChild(this.wheelGroup);

    // === Layer 2: Progression path overlay ===
    this.pathGroup = createSvgEl('g', { class: 'cof-path-group' });
    this.svg.appendChild(this.pathGroup);

    // === Layer 3: Fixed window frame (does NOT rotate) ===
    this.frameGroup = createSvgEl('g', { class: 'cof-frame' });
    this.drawWindowFrame();
    this.svg.appendChild(this.frameGroup);

    // === Layer 4: Center circle ===
    this.svg.appendChild(createSvgEl('circle', {
      cx: CENTER, cy: CENTER, r: R_CENTER,
      class: 'cof-center',
    }));
    this.centerText = createSvgEl('text', {
      x: CENTER, y: CENTER - 10,
      class: 'cof-center-text',
    });
    this.centerText.textContent = '';
    this.svg.appendChild(this.centerText);

    this.centerSubText = createSvgEl('text', {
      x: CENTER, y: CENTER + 12,
      class: 'cof-center-subtext',
    });
    this.centerSubText.textContent = '';
    this.svg.appendChild(this.centerSubText);

    svgWrapper.appendChild(this.svg);
    wrapper.appendChild(svgWrapper);

    // Info panel
    this.infoPanel = document.createElement('div');
    this.infoPanel.className = 'cof-info';
    wrapper.appendChild(this.infoPanel);

    // Mode-specific panels
    if (this.mode === 'progressions') {
      this.buildProgressionSelector(wrapper);
    }
    if (this.mode === 'transposition') {
      this.buildTranspositionPanel(wrapper);
    }

    this.container.appendChild(wrapper);
    this.bindEvents(svgWrapper);
    this.updateSelection();
  }

  // === Draw the 12 rotating segments ===
  drawSegments() {
    this.segments = [];

    for (let i = 0; i < 12; i++) {
      const startAngle = -Math.PI / 2 + (i - 0.5) * SEGMENT_ANGLE;
      const endAngle = startAngle + SEGMENT_ANGLE;
      const group = createSvgEl('g', { class: 'cof-segment' });
      group.dataset.index = i;

      // Major ring
      group.appendChild(createSvgEl('path', {
        d: arcPath(CENTER, CENTER, R_MID, R_OUTER, startAngle, endAngle),
        class: 'cof-segment__path cof-segment__path--major',
      }));

      // Minor ring
      group.appendChild(createSvgEl('path', {
        d: arcPath(CENTER, CENTER, R_INNER, R_MID, startAngle, endAngle),
        class: 'cof-segment__path cof-segment__path--minor',
      }));

      // Signature ring
      group.appendChild(createSvgEl('path', {
        d: arcPath(CENTER, CENTER, R_CENTER, R_INNER, startAngle, endAngle),
        class: 'cof-segment__path cof-segment__path--inner',
      }));

      // Labels
      const key = CIRCLE_OF_FIFTHS[i];

      const majorPos = labelPos(CENTER, CENTER, (R_OUTER + R_MID) / 2, i);
      const majorLabel = createSvgEl('text', {
        x: majorPos.x, y: majorPos.y, class: 'cof-label cof-label--major',
      });
      majorLabel.textContent = key.major;
      group.appendChild(majorLabel);

      const minorPos = labelPos(CENTER, CENTER, (R_MID + R_INNER) / 2, i);
      const minorLabel = createSvgEl('text', {
        x: minorPos.x, y: minorPos.y, class: 'cof-label cof-label--minor',
      });
      minorLabel.textContent = key.minor;
      group.appendChild(minorLabel);

      const sigPos = labelPos(CENTER, CENTER, (R_INNER + R_CENTER) / 2, i);
      const sigLabel = createSvgEl('text', {
        x: sigPos.x, y: sigPos.y, class: 'cof-label cof-label--signature',
      });
      const sigText = key.sharps > 0 ? `${key.sharps}#` : key.flats > 0 ? `${key.flats}b` : '0';
      sigLabel.textContent = sigText;
      group.appendChild(sigLabel);

      this.wheelGroup.appendChild(group);
      this.segments.push(group);
    }
  }

  // === Draw the FIXED window frame ===
  // Shape: a stepped "凸" form (like the physical wheel's black frame):
  //   Two separate frames like the physical wheel:
  //   Frame A (outer/major ring): IV(4), I(1), V(5)  — offsets -1, 0, +1
  //   Frame B (inner/minor ring): ii(2), vi(6), iii(3) — offsets +2, +3, +4
  //   vii°(7) has no frame, just a label outside.
  drawWindowFrame() {
    this.frameGroup.innerHTML = '';

    // --- Helper: build a closed "band" path (annular sector) ---
    const bandPath = (rInner, rOuter, startAngle, endAngle) => {
      return arcPath(CENTER, CENTER, rInner, rOuter, startAngle, endAngle);
    };

    // Both frames span the SAME angle range: offsets -1, 0, +1
    // (minor chords sit directly under their relative major at the same angle)
    const frameStart = -Math.PI / 2 + (-1 - 0.5) * SEGMENT_ANGLE;
    const frameEnd   = -Math.PI / 2 + (1 + 0.5) * SEGMENT_ANGLE;

    // --- 1) Tonic indicator arrow at 12 o'clock ---
    const arrowY = CENTER - R_OUTER - 4;
    this.frameGroup.appendChild(createSvgEl('polygon', {
      points: `${CENTER - 10},${arrowY - 14} ${CENTER + 10},${arrowY - 14} ${CENTER},${arrowY}`,
      class: 'cof-indicator',
    }));

    // --- 2) Highlight tints ---
    // Frame A: major ring fill
    for (const d of DIATONIC_COF_OFFSETS.filter(d => d.ring === 'major')) {
      const sa = -Math.PI / 2 + (d.offset - 0.5) * SEGMENT_ANGLE;
      const ea = sa + SEGMENT_ANGLE;
      this.frameGroup.appendChild(createSvgEl('path', {
        d: arcPath(CENTER, CENTER, R_MID, R_OUTER, sa, ea),
        class: `cof-frame__arc cof-frame__arc--${d.degree === 1 ? 'tonic' : 'diatonic'}`,
      }));
    }
    // Frame B: minor ring fill
    for (const d of DIATONIC_COF_OFFSETS.filter(d => d.ring === 'minor')) {
      const sa = -Math.PI / 2 + (d.offset - 0.5) * SEGMENT_ANGLE;
      const ea = sa + SEGMENT_ANGLE;
      this.frameGroup.appendChild(createSvgEl('path', {
        d: arcPath(CENTER, CENTER, R_INNER, R_MID, sa, ea),
        class: 'cof-frame__arc cof-frame__arc--minor-active',
      }));
    }

    // --- 3) Single unified frame: R_INNER → R_OUTER, no double line at R_MID ---
    this.frameGroup.appendChild(createSvgEl('path', {
      d: bandPath(R_INNER, R_OUTER, frameStart, frameEnd),
      class: 'cof-frame__border',
    }));

    // --- 5) Degree labels: placed at the top-left corner of each cell ---
    // "Top-left" in a radial segment means: near the outer edge, near the CCW (left) edge.
    // For major ring: near R_OUTER, shifted CCW
    // For minor ring: near R_MID, shifted CCW
    const LABEL_ANGLE_OFFSET = -SEGMENT_ANGLE * 0.32; // shift toward left edge of cell

    for (const d of DIATONIC_COF_OFFSETS) {
      const cellCenter = -Math.PI / 2 + d.offset * SEGMENT_ANGLE;
      const cornerAngle = cellCenter + LABEL_ANGLE_OFFSET;

      if (d.ring === 'major') {
        // Top-left corner of major ring cell
        const pos = polarToCart(CENTER, CENTER, R_OUTER - 14, cornerAngle);
        const label = createSvgEl('text', {
          x: pos.x, y: pos.y,
          class: `cof-frame__degree-inset ${d.degree === 1 ? 'cof-frame__degree-inset--tonic' : ''}`,
        });
        label.textContent = d.numLabel;
        this.frameGroup.appendChild(label);

      } else if (d.ring === 'minor') {
        // Top-left corner of minor ring cell
        const pos = polarToCart(CENTER, CENTER, R_MID - 8, cornerAngle);
        const label = createSvgEl('text', {
          x: pos.x, y: pos.y,
          class: 'cof-frame__degree-inset cof-frame__degree-inset--minor',
        });
        label.textContent = d.numLabel;
        this.frameGroup.appendChild(label);

      } else {
        // vii° (dim): outside the frame, label only
        const pos = polarToCart(CENTER, CENTER, R_OUTER + 18, cellCenter);
        const label = createSvgEl('text', {
          x: pos.x, y: pos.y,
          class: 'cof-frame__degree',
        });
        label.textContent = d.numLabel;
        this.frameGroup.appendChild(label);

        const romanPos = polarToCart(CENTER, CENTER, R_OUTER + 34, cellCenter);
        const romanLabel = createSvgEl('text', {
          x: romanPos.x, y: romanPos.y, class: 'cof-frame__roman',
        });
        romanLabel.textContent = d.roman;
        this.frameGroup.appendChild(romanLabel);
      }
    }

    // I and V roman numerals outside the frame (for context)
    const topAngle = -Math.PI / 2;
    const iPos = polarToCart(CENTER, CENTER, R_OUTER + 18, topAngle);
    const iLabel = createSvgEl('text', { x: iPos.x, y: iPos.y, class: 'cof-frame__roman' });
    iLabel.textContent = 'I';
    this.frameGroup.appendChild(iLabel);

    const ivAngle = -Math.PI / 2 + (-1) * SEGMENT_ANGLE;
    const ivPos = polarToCart(CENTER, CENTER, R_OUTER + 18, ivAngle);
    const ivLabel = createSvgEl('text', { x: ivPos.x, y: ivPos.y, class: 'cof-frame__roman' });
    ivLabel.textContent = 'IV';
    this.frameGroup.appendChild(ivLabel);

    const vAngle = -Math.PI / 2 + 1 * SEGMENT_ANGLE;
    const vPos = polarToCart(CENTER, CENTER, R_OUTER + 18, vAngle);
    const vLabel = createSvgEl('text', { x: vPos.x, y: vPos.y, class: 'cof-frame__roman' });
    vLabel.textContent = 'V';
    this.frameGroup.appendChild(vLabel);
  }


  // === Events ===
  bindEvents(svgWrapper) {
    this.svg.addEventListener('click', (e) => {
      const segment = e.target.closest('.cof-segment');
      if (!segment) return;
      const idx = parseInt(segment.dataset.index);
      this.selectKey(idx);
    });

    svgWrapper.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.cof-center')) return;
      this.isDragging = true;
      this.dragStartAngle = this.getPointerAngle(e, svgWrapper);
      this.rotationStart = this.rotation;
      this.wheelGroup.classList.add('cof-wheel--dragging');
      svgWrapper.setPointerCapture(e.pointerId);
    });

    svgWrapper.addEventListener('pointermove', (e) => {
      if (!this.isDragging) return;
      const angle = this.getPointerAngle(e, svgWrapper);
      const delta = angle - this.dragStartAngle;
      this.rotation = this.rotationStart + delta * (180 / Math.PI);
      this.wheelGroup.setAttribute('transform', `rotate(${this.rotation} ${CENTER} ${CENTER})`);
    });

    svgWrapper.addEventListener('pointerup', () => {
      if (!this.isDragging) return;
      this.isDragging = false;
      this.wheelGroup.classList.remove('cof-wheel--dragging');

      // Snap to nearest 30 degrees
      const snapped = Math.round(this.rotation / 30) * 30;
      this.rotation = snapped;
      this.wheelGroup.style.transition = 'transform 0.3s ease-out';
      this.wheelGroup.setAttribute('transform', `rotate(${this.rotation} ${CENTER} ${CENTER})`);
      setTimeout(() => { this.wheelGroup.style.transition = ''; }, 300);

      // Derive selected index from rotation
      const steps = Math.round(-this.rotation / 30) % 12;
      this.selectedIndex = ((steps % 12) + 12) % 12;
      this.updateSelection();
    });
  }

  getPointerAngle(e, wrapper) {
    const rect = wrapper.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.atan2(e.clientY - cy, e.clientX - cx);
  }

  selectKey(index) {
    this.selectedIndex = index;
    this.rotation = -index * 30;
    this.wheelGroup.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    this.wheelGroup.setAttribute('transform', `rotate(${this.rotation} ${CENTER} ${CENTER})`);
    setTimeout(() => { this.wheelGroup.style.transition = ''; }, 500);
    this.updateSelection();
  }

  updateSelection() {
    const idx = this.selectedIndex;
    const key = CIRCLE_OF_FIFTHS[idx];

    // Update center text
    this.centerText.textContent = `${key.major}`;
    this.centerSubText.textContent = `${key.minor}`;

    // Update info panel
    this.updateInfoPanel();

    if (this.mode === 'progressions' && this.progressionPath) {
      this.drawProgressionPath(this.progressionPath);
    }
    if (this.mode === 'transposition') {
      this.updateTranspositionPanel();
    }
  }

  updateInfoPanel() {
    const key = CIRCLE_OF_FIFTHS[this.selectedIndex];
    const diatonic = getDiatonicChords(key.major, false);
    const diatonic7 = getDiatonicChords(key.major, true);

    const sigDisplay = key.sharps > 0
      ? `${key.sharps} 个升号 (${key.signature})`
      : key.flats > 0
        ? `${key.flats} 个降号 (${key.signature})`
        : '无升降号';

    // Build chord display: outer frame (4-1-5) and inner frame (2-6-3)
    const makeCell = (degree, isTonic = false, isMinor = false) => {
      const chord = diatonic[degree - 1];
      const chord7 = diatonic7[degree - 1];
      const chordName = chord.root + (chord.type === 'minor' ? 'm' : chord.type === 'dim' ? 'dim' : '');
      return `<div class="cof-info__chord-cell ${isTonic ? 'cof-info__chord-cell--tonic' : ''} ${isMinor ? 'cof-info__chord-cell--minor' : ''}">
        <span class="cof-info__chord-degree">${degree}</span>
        <span class="cof-info__chord-name">${chordName}</span>
        <span class="cof-info__chord-roman">${chord7.roman}</span>
      </div>`;
    };

    this.infoPanel.innerHTML = `
      <div class="cof-info__key">${key.major}大调 / ${key.minor}</div>
      <div class="cof-info__signature">${sigDisplay}</div>
      <div class="cof-info__section-title">外圈大和弦 (4-1-5)</div>
      <div class="cof-info__chords-row">
        ${makeCell(4)}${makeCell(1, true)}${makeCell(5)}
      </div>
      <div class="cof-info__section-title" style="margin-top:10px;">内圈小和弦 (2-6-3)</div>
      <div class="cof-info__chords-row">
        ${makeCell(2, false, true)}${makeCell(6, false, true)}${makeCell(3, false, true)}
      </div>
      <div class="cof-info__section-title" style="margin-top:10px;">完整顺阶和弦 (1-2-3-4-5-6-7)</div>
      <div class="cof-info__chords-row">
        ${diatonic.map((c, i) => {
          const chordName = c.root + (c.type === 'minor' ? 'm' : c.type === 'dim' ? 'dim' : '');
          return `<div class="cof-info__chord-cell ${i === 0 ? 'cof-info__chord-cell--tonic' : ''}">
            <span class="cof-info__chord-degree">${i + 1}</span>
            <span class="cof-info__chord-name">${chordName}</span>
            <span class="cof-info__chord-roman">${diatonic7[i].roman}</span>
          </div>`;
        }).join('')}
      </div>
    `;
  }

  // === Progression mode ===
  buildProgressionSelector(wrapper) {
    const panel = document.createElement('div');
    panel.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;max-width:500px;width:100%;';

    const label = document.createElement('div');
    label.style.cssText = 'width:100%;font-size:0.85rem;color:var(--color-text-dim);margin-bottom:4px;';
    label.textContent = '选择和弦进行查看路径：';
    panel.appendChild(label);

    const displayProgressions = PROGRESSIONS.filter(p => p.degrees.length <= 8);
    for (const prog of displayProgressions) {
      const btn = document.createElement('button');
      btn.className = 'btn btn--ghost';
      btn.style.fontSize = '0.8rem';
      btn.textContent = prog.name;
      btn.title = prog.label;
      btn.addEventListener('click', () => {
        this.progressionPath = prog.degrees;
        this.drawProgressionPath(prog.degrees);
        panel.querySelectorAll('.btn').forEach(b => { b.classList.remove('btn--primary'); b.classList.add('btn--ghost'); });
        btn.classList.remove('btn--ghost');
        btn.classList.add('btn--primary');
      });
      panel.appendChild(btn);
    }
    wrapper.appendChild(panel);
  }

  drawProgressionPath(degrees) {
    this.pathGroup.innerHTML = '';
    if (!degrees || degrees.length < 2) return;

    const key = CIRCLE_OF_FIFTHS[this.selectedIndex];
    const rootIdx = noteToIndex(key.major);
    const scaleIntervals = [0, 2, 4, 5, 7, 9, 11];

    const cofPositions = degrees.map(deg => {
      const noteIdx = (rootIdx + scaleIntervals[deg]) % 12;
      return CIRCLE_OF_FIFTHS.findIndex(k => noteToIndex(k.major) === noteIdx);
    });

    const r = (R_OUTER + R_MID) / 2;

    for (let i = 0; i < cofPositions.length - 1; i++) {
      const fromIdx = cofPositions[i];
      const toIdx = cofPositions[i + 1];
      if (fromIdx === -1 || toIdx === -1) continue;

      const fromAngle = -Math.PI / 2 + fromIdx * SEGMENT_ANGLE + (this.rotation * Math.PI / 180);
      const toAngle = -Math.PI / 2 + toIdx * SEGMENT_ANGLE + (this.rotation * Math.PI / 180);
      const from = polarToCart(CENTER, CENTER, r, fromAngle);
      const to = polarToCart(CENTER, CENTER, r, toAngle);

      this.pathGroup.appendChild(createSvgEl('line', {
        x1: from.x, y1: from.y, x2: to.x, y2: to.y,
        class: 'cof-path-line',
      }));

      // Arrow
      const mx = (from.x * 0.4 + to.x * 0.6);
      const my = (from.y * 0.4 + to.y * 0.6);
      const angle = Math.atan2(to.y - from.y, to.x - from.x);
      const as = 7;
      this.pathGroup.appendChild(createSvgEl('polygon', {
        points: `${mx + as * Math.cos(angle)},${my + as * Math.sin(angle)} ${mx + as * Math.cos(angle + 2.4)},${my + as * Math.sin(angle + 2.4)} ${mx + as * Math.cos(angle - 2.4)},${my + as * Math.sin(angle - 2.4)}`,
        class: 'cof-path-arrow',
      }));
    }

    // Dots with step numbers
    for (let i = 0; i < cofPositions.length; i++) {
      const idx = cofPositions[i];
      if (idx === -1) continue;
      const angle = -Math.PI / 2 + idx * SEGMENT_ANGLE + (this.rotation * Math.PI / 180);
      const pos = polarToCart(CENTER, CENTER, r, angle);
      this.pathGroup.appendChild(createSvgEl('circle', {
        cx: pos.x, cy: pos.y, r: 8,
        class: 'cof-path-dot',
      }));
      const numText = createSvgEl('text', {
        x: pos.x, y: pos.y,
        class: 'cof-path-num',
      });
      numText.textContent = i + 1;
      this.pathGroup.appendChild(numText);
    }
  }

  // === Transposition mode ===
  buildTranspositionPanel(wrapper) {
    this.transposePanel = document.createElement('div');
    this.transposePanel.className = 'cof-transpose-panel';

    const header = document.createElement('div');
    header.className = 'cof-transpose-panel__header';
    header.innerHTML = '<span class="cof-transpose-panel__title">转调对照表</span>';
    this.transposePanel.appendChild(header);

    // Capo
    const capoDiv = document.createElement('div');
    capoDiv.className = 'cof-capo';
    capoDiv.innerHTML = '<span class="cof-capo__label">Capo 品位：</span>';
    const select = document.createElement('select');
    select.className = 'cof-capo__select';
    for (let i = 0; i <= 11; i++) {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = i === 0 ? '0 (不夹)' : `${i}`;
      select.appendChild(opt);
    }
    select.addEventListener('change', () => {
      this.transposeOffset = parseInt(select.value);
      this.updateTranspositionPanel();
    });
    capoDiv.appendChild(select);
    this.transposePanel.appendChild(capoDiv);
    this.capoSelect = select;

    // Target key
    const targetDiv = document.createElement('div');
    targetDiv.style.cssText = 'display:flex;align-items:center;gap:12px;margin-top:8px;';
    targetDiv.innerHTML = '<span class="cof-capo__label">目标调：</span>';
    const targetSelect = document.createElement('select');
    targetSelect.className = 'cof-capo__select';
    CIRCLE_OF_FIFTHS.forEach((k, i) => {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = k.major;
      targetSelect.appendChild(opt);
    });
    targetSelect.addEventListener('change', () => {
      const targetIdx = parseInt(targetSelect.value);
      const fromNote = noteToIndex(CIRCLE_OF_FIFTHS[this.selectedIndex].major);
      const toNote = noteToIndex(CIRCLE_OF_FIFTHS[targetIdx].major);
      this.transposeOffset = ((toNote - fromNote) + 12) % 12;
      this.capoSelect.value = this.transposeOffset;
      this.updateTranspositionPanel();
    });
    targetDiv.appendChild(targetSelect);
    this.transposePanel.appendChild(targetDiv);
    this.targetSelect = targetSelect;

    this.mappingTableContainer = document.createElement('div');
    this.mappingTableContainer.style.marginTop = '12px';
    this.transposePanel.appendChild(this.mappingTableContainer);

    wrapper.appendChild(this.transposePanel);
    this.updateTranspositionPanel();
  }

  updateTranspositionPanel() {
    if (!this.mappingTableContainer) return;

    const fromKey = CIRCLE_OF_FIFTHS[this.selectedIndex];
    const fromRoot = noteToIndex(fromKey.major);
    const toRoot = (fromRoot + this.transposeOffset) % 12;
    const toKeyEntry = CIRCLE_OF_FIFTHS.find(k => noteToIndex(k.major) === toRoot);
    const toKeyName = toKeyEntry ? toKeyEntry.major : NOTES[toRoot];

    if (this.targetSelect) {
      const idx = CIRCLE_OF_FIFTHS.findIndex(k => noteToIndex(k.major) === toRoot);
      if (idx >= 0) this.targetSelect.value = idx;
    }

    const fromChords = getDiatonicChords(fromKey.major, false);
    const toChords = getDiatonicChords(toKeyName, false);

    let html = `<table class="cof-mapping-table">
      <thead><tr><th>级数</th><th>原调 (${fromKey.major})</th><th>→</th><th>目标调 (${toKeyName})</th></tr></thead><tbody>`;
    for (let i = 0; i < 7; i++) {
      const fc = fromChords[i], tc = toChords[i];
      const fromName = fc.root + (fc.type === 'minor' ? 'm' : fc.type === 'dim' ? 'dim' : '');
      const toName = tc.root + (tc.type === 'minor' ? 'm' : tc.type === 'dim' ? 'dim' : '');
      html += `<tr><td>${fc.roman}</td><td class="from-chord">${fromName}</td><td>→</td><td class="to-chord">${toName}</td></tr>`;
    }
    html += '</tbody></table>';
    this.mappingTableContainer.innerHTML = html;
  }
}

export function renderCircleOfFifths(container, mode = 'basic') {
  return new CircleOfFifths(container, mode);
}
