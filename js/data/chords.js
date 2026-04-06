// Guitar chord fingering data
// Format: { name, frets: [6th..1st string], fingers: [6th..1st], barres: [{fret, from, to}] }
// null = muted (X), 0 = open string

export const CHORD_SHAPES = {
  // === Phase 1: C Major open chords ===
  'C': {
    name: 'C', fullName: 'C Major', frets: [null, 3, 2, 0, 1, 0],
    fingers: [null, 3, 2, 0, 1, 0], barres: [], startFret: 0
  },
  'Dm': {
    name: 'Dm', fullName: 'D minor', frets: [null, null, 0, 2, 3, 1],
    fingers: [null, null, 0, 2, 3, 1], barres: [], startFret: 0
  },
  'Em': {
    name: 'Em', fullName: 'E minor', frets: [0, 2, 2, 0, 0, 0],
    fingers: [0, 2, 3, 0, 0, 0], barres: [], startFret: 0
  },
  'F': {
    name: 'F', fullName: 'F Major', frets: [1, 3, 3, 2, 1, 1],
    fingers: [1, 4, 3, 2, 1, 1], barres: [{ fret: 1, from: 0, to: 5 }], startFret: 0
  },
  'G': {
    name: 'G', fullName: 'G Major', frets: [3, 2, 0, 0, 0, 3],
    fingers: [2, 1, 0, 0, 0, 3], barres: [], startFret: 0
  },
  'Am': {
    name: 'Am', fullName: 'A minor', frets: [null, 0, 2, 2, 1, 0],
    fingers: [null, 0, 2, 3, 1, 0], barres: [], startFret: 0
  },

  // === Phase 2: Seventh chords ===
  'Cmaj7': {
    name: 'Cmaj7', fullName: 'C Major 7th', frets: [null, 3, 2, 0, 0, 0],
    fingers: [null, 3, 2, 0, 0, 0], barres: [], startFret: 0
  },
  'Dm7': {
    name: 'Dm7', fullName: 'D minor 7th', frets: [null, null, 0, 2, 1, 1],
    fingers: [null, null, 0, 2, 1, 1], barres: [], startFret: 0
  },
  'Em7': {
    name: 'Em7', fullName: 'E minor 7th', frets: [0, 2, 0, 0, 0, 0],
    fingers: [0, 2, 0, 0, 0, 0], barres: [], startFret: 0
  },
  'Fmaj7': {
    name: 'Fmaj7', fullName: 'F Major 7th', frets: [null, null, 3, 2, 1, 0],
    fingers: [null, null, 3, 2, 1, 0], barres: [], startFret: 0
  },
  'G7': {
    name: 'G7', fullName: 'G Dominant 7th', frets: [3, 2, 0, 0, 0, 1],
    fingers: [3, 2, 0, 0, 0, 1], barres: [], startFret: 0
  },
  'Am7': {
    name: 'Am7', fullName: 'A minor 7th', frets: [null, 0, 2, 0, 1, 0],
    fingers: [null, 0, 2, 0, 1, 0], barres: [], startFret: 0
  },
  'Bm7b5': {
    name: 'Bm7b5', fullName: 'B half-diminished', frets: [null, 2, 3, 2, 3, null],
    fingers: [null, 1, 3, 2, 4, null], barres: [], startFret: 0
  },

  // === G Major open chords ===
  'G_open': {
    name: 'G', fullName: 'G Major (open)', frets: [3, 2, 0, 0, 0, 3],
    fingers: [2, 1, 0, 0, 0, 3], barres: [], startFret: 0
  },
  'Am_open': {
    name: 'Am', fullName: 'A minor (open)', frets: [null, 0, 2, 2, 1, 0],
    fingers: [null, 0, 2, 3, 1, 0], barres: [], startFret: 0
  },
  'Bm_barre': {
    name: 'Bm', fullName: 'B minor (barre)', frets: [null, 2, 4, 4, 3, 2],
    fingers: [null, 1, 3, 4, 2, 1], barres: [{ fret: 2, from: 1, to: 5 }], startFret: 2
  },
  'D': {
    name: 'D', fullName: 'D Major', frets: [null, null, 0, 2, 3, 2],
    fingers: [null, null, 0, 1, 3, 2], barres: [], startFret: 0
  },

  // === Sus chords ===
  'Csus2': {
    name: 'Csus2', fullName: 'C Suspended 2nd', frets: [null, 3, 3, 0, 1, 0],
    fingers: [null, 3, 4, 0, 1, 0], barres: [], startFret: 0
  },
  'Csus4': {
    name: 'Csus4', fullName: 'C Suspended 4th', frets: [null, 3, 3, 0, 1, 1],
    fingers: [null, 3, 4, 0, 1, 1], barres: [], startFret: 0
  },
  'Dsus2': {
    name: 'Dsus2', fullName: 'D Suspended 2nd', frets: [null, null, 0, 2, 3, 0],
    fingers: [null, null, 0, 1, 3, 0], barres: [], startFret: 0
  },
  'Dsus4': {
    name: 'Dsus4', fullName: 'D Suspended 4th', frets: [null, null, 0, 2, 3, 3],
    fingers: [null, null, 0, 1, 2, 3], barres: [], startFret: 0
  },
  'Asus2': {
    name: 'Asus2', fullName: 'A Suspended 2nd', frets: [null, 0, 2, 2, 0, 0],
    fingers: [null, 0, 1, 2, 0, 0], barres: [], startFret: 0
  },
  'Asus4': {
    name: 'Asus4', fullName: 'A Suspended 4th', frets: [null, 0, 2, 2, 3, 0],
    fingers: [null, 0, 1, 2, 4, 0], barres: [], startFret: 0
  },

  // === Extension chords (jazz voicings) ===
  'Cmaj9': {
    name: 'Cmaj9', fullName: 'C Major 9th', frets: [null, 3, 2, 0, 0, 0],
    fingers: [null, 3, 2, 0, 0, 0], barres: [], startFret: 0
  },
  'Dm9': {
    name: 'Dm9', fullName: 'D minor 9th', frets: [null, null, 0, 2, 1, 0],
    fingers: [null, null, 0, 2, 1, 0], barres: [], startFret: 0
  },
  'G9': {
    name: 'G9', fullName: 'G Dominant 9th', frets: [3, 2, 0, 2, 0, 1],
    fingers: [3, 2, 0, 4, 0, 1], barres: [], startFret: 0
  },
  'G13': {
    name: 'G13', fullName: 'G Dominant 13th', frets: [3, 2, 0, 0, 0, 0],
    fingers: [2, 1, 0, 0, 0, 0], barres: [], startFret: 0
  },

  // === Slash chords ===
  'C/G': {
    name: 'C/G', fullName: 'C over G', frets: [3, 3, 2, 0, 1, 0],
    fingers: [3, 4, 2, 0, 1, 0], barres: [], startFret: 0
  },
  'C/E': {
    name: 'C/E', fullName: 'C over E', frets: [0, 3, 2, 0, 1, 0],
    fingers: [0, 3, 2, 0, 1, 0], barres: [], startFret: 0
  },
  'Am/E': {
    name: 'Am/E', fullName: 'Am over E', frets: [0, 0, 2, 2, 1, 0],
    fingers: [0, 0, 2, 3, 1, 0], barres: [], startFret: 0
  },
  'G/B': {
    name: 'G/B', fullName: 'G over B', frets: [null, 2, 0, 0, 0, 3],
    fingers: [null, 1, 0, 0, 0, 3], barres: [], startFret: 0
  },

  // === Diminished ===
  'Bdim': {
    name: 'Bdim', fullName: 'B diminished', frets: [null, 2, 3, 4, 3, null],
    fingers: [null, 1, 2, 4, 3, null], barres: [], startFret: 0
  },

  // === Augmented ===
  'Caug': {
    name: 'C+', fullName: 'C augmented', frets: [null, 3, 2, 1, 1, 0],
    fingers: [null, 4, 3, 1, 2, 0], barres: [], startFret: 0
  },

  // === Inversions ===
  'C_1st_inv': {
    name: 'C/E', fullName: 'C 1st inversion', frets: [0, 3, 2, 0, 1, 0],
    fingers: [0, 3, 2, 0, 1, 0], barres: [], startFret: 0
  },
  'C_2nd_inv': {
    name: 'C/G', fullName: 'C 2nd inversion', frets: [3, 3, 2, 0, 1, 0],
    fingers: [3, 4, 2, 0, 1, 0], barres: [], startFret: 0
  },

  // ============================================================
  // === CAGED System: Open shapes ===
  // ============================================================
  'E_open': {
    name: 'E', fullName: 'E Major (open)', frets: [0, 2, 2, 1, 0, 0],
    fingers: [0, 2, 3, 1, 0, 0], barres: [], startFret: 0
  },
  'A_open': {
    name: 'A', fullName: 'A Major (open)', frets: [null, 0, 2, 2, 2, 0],
    fingers: [null, 0, 1, 2, 3, 0], barres: [], startFret: 0
  },

  // ============================================================
  // === CAGED: C chord in 5 positions ===
  // ============================================================
  'C_caged_C': {
    name: 'C (C型)', fullName: 'C - C shape, open', frets: [null, 3, 2, 0, 1, 0],
    fingers: [null, 3, 2, 0, 1, 0], barres: [], startFret: 0
  },
  'C_caged_A': {
    name: 'C (A型)', fullName: 'C - A shape, 3rd fret', frets: [null, 3, 5, 5, 5, 3],
    fingers: [null, 1, 3, 3, 3, 1], barres: [{ fret: 3, from: 1, to: 5 }], startFret: 3
  },
  'C_caged_G': {
    name: 'C (G型)', fullName: 'C - G shape, 5th fret', frets: [8, 7, 5, 5, 5, 8],
    fingers: [4, 3, 1, 1, 1, 4], barres: [{ fret: 5, from: 2, to: 4 }], startFret: 5
  },
  'C_caged_E': {
    name: 'C (E型)', fullName: 'C - E shape, 8th fret', frets: [8, 10, 10, 9, 8, 8],
    fingers: [1, 3, 4, 2, 1, 1], barres: [{ fret: 8, from: 0, to: 5 }], startFret: 8
  },
  'C_caged_D': {
    name: 'C (D型)', fullName: 'C - D shape, 10th fret', frets: [null, null, 10, 12, 13, 12],
    fingers: [null, null, 1, 3, 4, 2], barres: [], startFret: 10
  },

  // ============================================================
  // === CAGED: G chord in 5 positions ===
  // ============================================================
  'G_caged_E': {
    name: 'G (E型)', fullName: 'G - E shape, 3rd fret', frets: [3, 5, 5, 4, 3, 3],
    fingers: [1, 3, 4, 2, 1, 1], barres: [{ fret: 3, from: 0, to: 5 }], startFret: 3
  },
  'G_caged_D': {
    name: 'G (D型)', fullName: 'G - D shape, 5th fret', frets: [null, null, 5, 7, 8, 7],
    fingers: [null, null, 1, 3, 4, 2], barres: [], startFret: 5
  },
  'G_caged_C': {
    name: 'G (C型)', fullName: 'G - C shape, 7th fret', frets: [null, 10, 9, 7, 8, 7],
    fingers: [null, 4, 3, 1, 2, 1], barres: [{ fret: 7, from: 3, to: 5 }], startFret: 7
  },
  'G_caged_A': {
    name: 'G (A型)', fullName: 'G - A shape, 10th fret', frets: [null, 10, 12, 12, 12, 10],
    fingers: [null, 1, 3, 3, 3, 1], barres: [{ fret: 10, from: 1, to: 5 }], startFret: 10
  },
  'G_caged_G': {
    name: 'G (G型)', fullName: 'G - G shape, open', frets: [3, 2, 0, 0, 0, 3],
    fingers: [2, 1, 0, 0, 0, 3], barres: [], startFret: 0
  },

  // ============================================================
  // === CAGED: Minor chord shapes (movable) ===
  // ============================================================
  'Am_caged_Am': {
    name: 'Am (Am型)', fullName: 'Am - Am shape, open', frets: [null, 0, 2, 2, 1, 0],
    fingers: [null, 0, 2, 3, 1, 0], barres: [], startFret: 0
  },
  'Bm_caged_Am': {
    name: 'Bm (Am型)', fullName: 'Bm - Am shape, 2nd fret', frets: [null, 2, 4, 4, 3, 2],
    fingers: [null, 1, 3, 4, 2, 1], barres: [{ fret: 2, from: 1, to: 5 }], startFret: 2
  },
  'Fm_caged_Em': {
    name: 'Fm (Em型)', fullName: 'Fm - Em shape, 1st fret', frets: [1, 3, 3, 1, 1, 1],
    fingers: [1, 3, 4, 1, 1, 1], barres: [{ fret: 1, from: 0, to: 5 }], startFret: 1
  },
  'Gm_caged_Em': {
    name: 'Gm (Em型)', fullName: 'Gm - Em shape, 3rd fret', frets: [3, 5, 5, 3, 3, 3],
    fingers: [1, 3, 4, 1, 1, 1], barres: [{ fret: 3, from: 0, to: 5 }], startFret: 3
  },
  'Dm_caged_Dm': {
    name: 'Dm (Dm型)', fullName: 'Dm - Dm shape, open', frets: [null, null, 0, 2, 3, 1],
    fingers: [null, null, 0, 2, 3, 1], barres: [], startFret: 0
  },
  'Em_caged_Dm': {
    name: 'Em (Dm型)', fullName: 'Em - Dm shape, 2nd fret', frets: [null, null, 2, 4, 5, 3],
    fingers: [null, null, 1, 3, 4, 2], barres: [], startFret: 2
  },
};

// Chord groups for chapter display
export const CHORD_GROUPS = {
  c_major_open: ['C', 'Dm', 'Em', 'F', 'G', 'Am'],
  c_major_7th: ['Cmaj7', 'Dm7', 'Em7', 'Fmaj7', 'G7', 'Am7', 'Bm7b5'],
  g_major_open: ['G_open', 'Am_open', 'Bm_barre', 'C', 'D', 'Em'],
  sus_chords: ['Csus2', 'Csus4', 'Dsus2', 'Dsus4', 'Asus2', 'Asus4'],
  slash_chords: ['C/G', 'C/E', 'Am/E', 'G/B'],
  triads_types: ['C', 'Am', 'Bdim', 'Caug'],
  extensions: ['Cmaj9', 'Dm9', 'G9', 'G13'],
  // CAGED system
  caged_open_major: ['C', 'A_open', 'G', 'E_open', 'D'],
  caged_c_positions: ['C_caged_C', 'C_caged_A', 'C_caged_G', 'C_caged_E', 'C_caged_D'],
  caged_g_positions: ['G_caged_G', 'G_caged_E', 'G_caged_D', 'G_caged_C', 'G_caged_A'],
  caged_minor_examples: ['Am_caged_Am', 'Bm_caged_Am', 'Fm_caged_Em', 'Gm_caged_Em', 'Dm_caged_Dm', 'Em_caged_Dm'],
};
