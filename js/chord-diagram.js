// SVG Chord Diagram Renderer
import { CHORD_SHAPES } from './data/chords.js';
import { CHORD_FORMULAS, getDisplayMode, intervalToDegree, noteToIndex, NOTES, STANDARD_TUNING } from './data/theory.js';

const SVG_NS = 'http://www.w3.org/2000/svg';

const DEFAULT_OPTS = {
  width: 120,
  height: 140,
  numFrets: 5,
  numStrings: 6,
  paddingTop: 26,
  paddingLeft: 20,
  paddingRight: 10,
  paddingBottom: 10,
  dotRadius: 7,
  showFingers: true,
};

function createSvgEl(tag, attrs = {}) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) {
    el.setAttribute(k, v);
  }
  return el;
}

export function renderChordDiagram(container, chordKey, opts = {}) {
  const chord = typeof chordKey === 'string' ? CHORD_SHAPES[chordKey] : chordKey;
  if (!chord) return;

  const o = { ...DEFAULT_OPTS, ...opts };
  const stringSpacing = (o.width - o.paddingLeft - o.paddingRight) / (o.numStrings - 1);
  const fretSpacing = (o.height - o.paddingTop - o.paddingBottom) / o.numFrets;

  const svg = createSvgEl('svg', {
    viewBox: `0 0 ${o.width} ${o.height}`,
    class: 'chord-box__svg',
  });

  // Determine if we need a fret label (when startFret > 1)
  const isOpenPosition = !chord.startFret || chord.startFret <= 1;
  const displayFrets = chord.frets.map(f => {
    if (f === null || f === 0) return f;
    return isOpenPosition ? f : f - chord.startFret + 1;
  });

  // Draw nut or fret label
  if (isOpenPosition) {
    svg.appendChild(createSvgEl('line', {
      x1: o.paddingLeft, y1: o.paddingTop,
      x2: o.paddingLeft + stringSpacing * (o.numStrings - 1), y2: o.paddingTop,
      class: 'chord-svg__nut',
    }));
  } else {
    svg.appendChild(createSvgEl('text', {
      x: o.paddingLeft - 12,
      y: o.paddingTop + fretSpacing / 2,
      class: 'chord-svg__fret-label',
    })).textContent = chord.startFret + 'fr';
  }

  // Draw frets
  for (let i = 0; i <= o.numFrets; i++) {
    const y = o.paddingTop + i * fretSpacing;
    svg.appendChild(createSvgEl('line', {
      x1: o.paddingLeft, y1: y,
      x2: o.paddingLeft + stringSpacing * (o.numStrings - 1), y2: y,
      class: 'chord-svg__fret',
    }));
  }

  // Draw strings
  for (let i = 0; i < o.numStrings; i++) {
    const x = o.paddingLeft + i * stringSpacing;
    svg.appendChild(createSvgEl('line', {
      x1: x, y1: o.paddingTop,
      x2: x, y2: o.paddingTop + fretSpacing * o.numFrets,
      class: 'chord-svg__string',
    }));
  }

  // Draw barres
  if (chord.barres) {
    for (const barre of chord.barres) {
      const barreDisplayFret = isOpenPosition ? barre.fret : barre.fret - chord.startFret + 1;
      const y = o.paddingTop + (barreDisplayFret - 0.5) * fretSpacing;
      const x1 = o.paddingLeft + barre.from * stringSpacing;
      const x2 = o.paddingLeft + barre.to * stringSpacing;
      svg.appendChild(createSvgEl('rect', {
        x: x1 - 2,
        y: y - 5,
        width: x2 - x1 + 4,
        height: 10,
        class: 'chord-svg__barre',
      }));
    }
  }

  // Draw dots, X, O
  for (let i = 0; i < o.numStrings; i++) {
    const x = o.paddingLeft + i * stringSpacing;
    const fretVal = chord.frets[i];
    const displayFretVal = displayFrets[i];

    if (fretVal === null) {
      // Muted string (X)
      const y = o.paddingTop - 12;
      const size = 5;
      const line1 = createSvgEl('line', {
        x1: x - size, y1: y - size, x2: x + size, y2: y + size,
        class: 'chord-svg__mute',
      });
      const line2 = createSvgEl('line', {
        x1: x + size, y1: y - size, x2: x - size, y2: y + size,
        class: 'chord-svg__mute',
      });
      svg.appendChild(line1);
      svg.appendChild(line2);
    } else if (fretVal === 0) {
      // Open string (O)
      svg.appendChild(createSvgEl('circle', {
        cx: x, cy: o.paddingTop - 12, r: 5,
        class: 'chord-svg__open',
      }));
    } else {
      // Fingered note
      const y = o.paddingTop + (displayFretVal - 0.5) * fretSpacing;
      const isRoot = i === 0 || (chord.frets[0] === null && i === 1);
      svg.appendChild(createSvgEl('circle', {
        cx: x, cy: y, r: o.dotRadius,
        class: `chord-svg__dot ${isRoot ? 'chord-svg__dot--root' : ''}`,
      }));

      // Finger number
      if (o.showFingers && chord.fingers && chord.fingers[i] && chord.fingers[i] > 0) {
        const text = createSvgEl('text', {
          x: x, y: y,
          class: 'chord-svg__finger-text',
        });
        text.textContent = chord.fingers[i];
        svg.appendChild(text);
      }
    }
  }

  container.appendChild(svg);
}

// Compute the actual notes played in a chord shape and their degrees relative to root
function getChordDegreeLabel(chord) {
  // Extract root note name from chord name (e.g., "C", "Am", "F#m", "Cmaj7")
  const nameMatch = chord.name.match(/^([A-G][#b]?)/);
  if (!nameMatch) return '';
  const rootName = nameMatch[1];
  const rootIdx = noteToIndex(rootName);
  if (rootIdx === -1) return '';

  // Get unique notes from the chord frets
  const degrees = new Set();
  for (let i = 0; i < 6; i++) {
    const fretVal = chord.frets[i];
    if (fretVal === null) continue;
    const midi = STANDARD_TUNING[i] + fretVal;
    const noteIdx = midi % 12;
    const interval = ((noteIdx - rootIdx) + 12) % 12;
    degrees.add(intervalToDegree(interval));
  }

  return [...degrees].join('-');
}

export function renderChordBox(container, chordKey) {
  const chord = typeof chordKey === 'string' ? CHORD_SHAPES[chordKey] : chordKey;
  if (!chord) return;

  const box = document.createElement('div');
  box.className = 'chord-box';
  box.dataset.chord = typeof chordKey === 'string' ? chordKey : chord.name;

  const nameEl = document.createElement('div');
  nameEl.className = 'chord-box__name';
  nameEl.textContent = chord.name;
  box.appendChild(nameEl);

  // Degree label (e.g., "1-3-5" or "1-b3-5")
  const degreeEl = document.createElement('div');
  degreeEl.className = 'chord-box__degrees';
  degreeEl.textContent = getChordDegreeLabel(chord);
  box.appendChild(degreeEl);

  renderChordDiagram(box, chordKey);

  container.appendChild(box);
  return box;
}

export function renderChordGrid(container, chordKeys) {
  const grid = document.createElement('div');
  grid.className = 'chord-grid';

  for (const key of chordKeys) {
    renderChordBox(grid, key);
  }

  container.appendChild(grid);
  return grid;
}
