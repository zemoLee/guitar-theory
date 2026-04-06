// Music theory constants - keys, intervals, modes, chord formulas

export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const NOTES_FLAT = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

// Circle of Fifths order (clockwise from top)
export const CIRCLE_OF_FIFTHS = [
  { major: 'C',  minor: 'Am',  sharps: 0, flats: 0, signature: '' },
  { major: 'G',  minor: 'Em',  sharps: 1, flats: 0, signature: 'F#' },
  { major: 'D',  minor: 'Bm',  sharps: 2, flats: 0, signature: 'F# C#' },
  { major: 'A',  minor: 'F#m', sharps: 3, flats: 0, signature: 'F# C# G#' },
  { major: 'E',  minor: 'C#m', sharps: 4, flats: 0, signature: 'F# C# G# D#' },
  { major: 'B',  minor: 'G#m', sharps: 5, flats: 0, signature: 'F# C# G# D# A#' },
  { major: 'F#', minor: 'D#m', sharps: 6, flats: 0, signature: 'F# C# G# D# A# E#', enharmonic: 'Gb' },
  { major: 'Db', minor: 'Bbm', sharps: 0, flats: 5, signature: 'Bb Eb Ab Db Gb', enharmonic: 'C#' },
  { major: 'Ab', minor: 'Fm',  sharps: 0, flats: 4, signature: 'Bb Eb Ab Db' },
  { major: 'Eb', minor: 'Cm',  sharps: 0, flats: 3, signature: 'Bb Eb Ab' },
  { major: 'Bb', minor: 'Gm',  sharps: 0, flats: 2, signature: 'Bb Eb' },
  { major: 'F',  minor: 'Dm',  sharps: 0, flats: 1, signature: 'Bb' },
];

// Standard guitar tuning (string 6 to string 1, low to high)
export const STANDARD_TUNING = [40, 45, 50, 55, 59, 64]; // MIDI note numbers: E2 A2 D3 G3 B3 E4

// Interval names
export const INTERVALS = {
  0: 'P1', 1: 'm2', 2: 'M2', 3: 'm3', 4: 'M3', 5: 'P4',
  6: 'TT', 7: 'P5', 8: 'm6', 9: 'M6', 10: 'm7', 11: 'M7'
};

// Chord formulas (intervals from root)
export const CHORD_FORMULAS = {
  'major':    [0, 4, 7],
  'minor':    [0, 3, 7],
  'dim':      [0, 3, 6],
  'aug':      [0, 4, 8],
  'maj7':     [0, 4, 7, 11],
  'min7':     [0, 3, 7, 10],
  'dom7':     [0, 4, 7, 10],
  'm7b5':     [0, 3, 6, 10],
  'dim7':     [0, 3, 6, 9],
  'sus2':     [0, 2, 7],
  'sus4':     [0, 5, 7],
  'add9':     [0, 4, 7, 14],
  'maj9':     [0, 4, 7, 11, 14],
  'min9':     [0, 3, 7, 10, 14],
  'dom9':     [0, 4, 7, 10, 14],
  '11':       [0, 4, 7, 10, 14, 17],
  'min11':    [0, 3, 7, 10, 14, 17],
  'maj13':    [0, 4, 7, 11, 14, 21],
  '13':       [0, 4, 7, 10, 14, 21],
};

// Scale formulas (intervals from root)
export const SCALE_FORMULAS = {
  'major':            [0, 2, 4, 5, 7, 9, 11],
  'natural_minor':    [0, 2, 3, 5, 7, 8, 10],
  'harmonic_minor':   [0, 2, 3, 5, 7, 8, 11],
  'melodic_minor':    [0, 2, 3, 5, 7, 9, 11],
  'pentatonic_major': [0, 2, 4, 7, 9],
  'pentatonic_minor': [0, 3, 5, 7, 10],
  'blues':            [0, 3, 5, 6, 7, 10],
  // Modes (same intervals as MODES object, duplicated here for SCALE_FORMULAS lookup)
  'ionian':     [0, 2, 4, 5, 7, 9, 11],
  'dorian':     [0, 2, 3, 5, 7, 9, 10],
  'phrygian':   [0, 1, 3, 5, 7, 8, 10],
  'lydian':     [0, 2, 4, 6, 7, 9, 11],
  'mixolydian': [0, 2, 4, 5, 7, 9, 10],
  'aeolian':    [0, 2, 3, 5, 7, 8, 10],
  'locrian':    [0, 1, 3, 5, 6, 8, 10],
};

// Mode names and their scale degree offsets from major
export const MODES = {
  'ionian':     { degree: 1, intervals: [0, 2, 4, 5, 7, 9, 11], name: 'Ionian (大调)', character: 'bright, happy' },
  'dorian':     { degree: 2, intervals: [0, 2, 3, 5, 7, 9, 10], name: 'Dorian (多利安)', character: 'minor with bright 6th' },
  'phrygian':   { degree: 3, intervals: [0, 1, 3, 5, 7, 8, 10], name: 'Phrygian (弗里几安)', character: 'dark, Spanish flavor' },
  'lydian':     { degree: 4, intervals: [0, 2, 4, 6, 7, 9, 11], name: 'Lydian (利底安)', character: 'bright, dreamy' },
  'mixolydian': { degree: 5, intervals: [0, 2, 4, 5, 7, 9, 10], name: 'Mixolydian (混合利底安)', character: 'major with bluesy 7th' },
  'aeolian':    { degree: 6, intervals: [0, 2, 3, 5, 7, 8, 10], name: 'Aeolian (自然小调)', character: 'sad, melancholic' },
  'locrian':    { degree: 7, intervals: [0, 1, 3, 5, 6, 8, 10], name: 'Locrian (洛克里安)', character: 'dark, unstable' },
};

// Diatonic chord qualities for major key (I through vii)
export const DIATONIC_CHORDS = {
  triads:  ['major', 'minor', 'minor', 'major', 'major', 'minor', 'dim'],
  seventh: ['maj7', 'min7', 'min7', 'maj7', 'dom7', 'min7', 'm7b5'],
};

// Roman numeral labels
export const ROMAN_NUMERALS = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];
export const ROMAN_NUMERALS_7TH = ['Imaj7', 'ii7', 'iii7', 'IVmaj7', 'V7', 'vi7', 'viiø7'];

// Common chord progressions
export const PROGRESSIONS = [
  { name: 'I-IV-V-I',       degrees: [0, 3, 4, 0], label: '经典三和弦进行' },
  { name: 'I-V-vi-IV',      degrees: [0, 4, 5, 3], label: '流行四和弦（卡农进行）' },
  { name: 'ii-V-I',         degrees: [1, 4, 0],     label: '爵士核心进行' },
  { name: 'I-vi-IV-V',      degrees: [0, 5, 3, 4], label: '50年代进行' },
  { name: 'vi-IV-I-V',      degrees: [5, 3, 0, 4], label: '流行悲伤进行' },
  { name: 'I-IV-vi-V',      degrees: [0, 3, 5, 4], label: '抒情进行' },
  { name: 'iii-vi-ii-V-I',  degrees: [2, 5, 1, 4, 0], label: '下行五度圈进行' },
  { name: 'I-V-vi-iii-IV-I-IV-V', degrees: [0, 4, 5, 2, 3, 0, 3, 4], label: '卡农完整进行' },
  { name: '12-Bar Blues',    degrees: [0, 0, 0, 0, 3, 3, 0, 0, 4, 3, 0, 4], label: '12小节布鲁斯' },
];

// Solfège / scale degree labels (interval semitones → degree label)
// Maps chromatic interval (0-11) to scale degree string for major scale context
const INTERVAL_TO_DEGREE = {
  0: '1', 1: 'b2', 2: '2', 3: 'b3', 4: '3', 5: '4',
  6: 'b5', 7: '5', 8: 'b6', 9: '6', 10: 'b7', 11: '7',
};

// Get scale degree label for a note relative to a root
export function intervalToDegree(semitones) {
  return INTERVAL_TO_DEGREE[((semitones % 12) + 12) % 12] || '?';
}

// Global display mode: 'note' (音名 C D E) or 'degree' (唱名 1 2 3)
let _displayMode = 'note';
export function getDisplayMode() { return _displayMode; }
export function setDisplayMode(mode) { _displayMode = mode; }
export function toggleDisplayMode() {
  _displayMode = _displayMode === 'note' ? 'degree' : 'note';
  // Dispatch custom event so all components can re-render
  window.dispatchEvent(new CustomEvent('display-mode-change', { detail: _displayMode }));
  return _displayMode;
}

// Helper: get note name from MIDI number
export function midiToNote(midi) {
  return NOTES[midi % 12];
}

// Helper: get frequency from MIDI number
export function midiToFreq(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

// Helper: get note index (0-11) from note name
export function noteToIndex(note) {
  let idx = NOTES.indexOf(note);
  if (idx === -1) idx = NOTES_FLAT.indexOf(note);
  return idx;
}

// Helper: build scale notes from root and formula
export function buildScale(root, formulaName) {
  const rootIdx = noteToIndex(root);
  const formula = SCALE_FORMULAS[formulaName] || SCALE_FORMULAS.major;
  return formula.map(interval => NOTES[(rootIdx + interval) % 12]);
}

// Helper: build chord notes from root and type
export function buildChord(root, type) {
  const rootIdx = noteToIndex(root);
  const formula = CHORD_FORMULAS[type] || CHORD_FORMULAS.major;
  return formula.map(interval => NOTES[(rootIdx + interval) % 12]);
}

// Helper: get diatonic chords for a key
export function getDiatonicChords(key, useSeventh = false) {
  const rootIdx = noteToIndex(key);
  const types = useSeventh ? DIATONIC_CHORDS.seventh : DIATONIC_CHORDS.triads;
  const scaleIntervals = SCALE_FORMULAS.major;
  return scaleIntervals.map((interval, i) => {
    const chordRoot = NOTES[(rootIdx + interval) % 12];
    return {
      degree: i + 1,
      roman: useSeventh ? ROMAN_NUMERALS_7TH[i] : ROMAN_NUMERALS[i],
      root: chordRoot,
      type: types[i],
      notes: buildChord(chordRoot, types[i]),
    };
  });
}
