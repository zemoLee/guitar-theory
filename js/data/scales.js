// Scale data for fretboard visualization

export const SCALE_PRESETS = {
  // === Major / Minor ===
  'c_major': {
    name: 'C大调音阶', root: 'C', formula: 'major',
    description: '全全半全全全半 (W-W-H-W-W-W-H)',
  },
  'g_major': {
    name: 'G大调音阶', root: 'G', formula: 'major',
    description: '全全半全全全半 (W-W-H-W-W-W-H)',
  },
  'c_natural_minor': {
    name: 'C自然小调', root: 'C', formula: 'natural_minor',
    description: '全半全全半全全 (W-H-W-W-H-W-W)',
  },
  'a_natural_minor': {
    name: 'A自然小调', root: 'A', formula: 'natural_minor',
    description: '全半全全半全全 (W-H-W-W-H-W-W)',
  },

  // === Modes (typical starting notes from C major) ===
  'd_dorian': {
    name: 'D Dorian (多利安)', root: 'D', formula: 'dorian',
    description: '全半全全全半全 — 特征音: 大六度(B)',
  },
  'e_phrygian': {
    name: 'E Phrygian (弗里几安)', root: 'E', formula: 'phrygian',
    description: '半全全全半全全 — 特征音: 小二度(F)',
  },
  'f_lydian': {
    name: 'F Lydian (利底安)', root: 'F', formula: 'lydian',
    description: '全全全半全全半 — 特征音: 增四度(B)',
  },
  'g_mixolydian': {
    name: 'G Mixolydian (混合利底安)', root: 'G', formula: 'mixolydian',
    description: '全全半全全半全 — 特征音: 小七度(F)',
  },
  'a_aeolian': {
    name: 'A Aeolian (自然小调)', root: 'A', formula: 'aeolian',
    description: '全半全全半全全 — 即自然小调',
  },
  'b_locrian': {
    name: 'B Locrian (洛克里安)', root: 'B', formula: 'locrian',
    description: '半全全半全全全 — 特征音: 小二度+减五度',
  },

  // === Pentatonic ===
  'c_pentatonic_major': {
    name: 'C大调五声音阶', root: 'C', formula: 'pentatonic_major',
    description: '1-2-3-5-6 (宫商角徵羽)',
  },
  'g_pentatonic_major': {
    name: 'G大调五声音阶', root: 'G', formula: 'pentatonic_major',
    description: '1-2-3-5-6',
  },
  'a_pentatonic_minor': {
    name: 'A小调五声音阶', root: 'A', formula: 'pentatonic_minor',
    description: '1-b3-4-5-b7',
  },
  'e_pentatonic_minor': {
    name: 'E小调五声音阶', root: 'E', formula: 'pentatonic_minor',
    description: '1-b3-4-5-b7',
  },
  'd_pentatonic_minor': {
    name: 'D小调五声音阶', root: 'D', formula: 'pentatonic_minor',
    description: '1-b3-4-5-b7',
  },

  // === Blues ===
  'a_blues': {
    name: 'A布鲁斯音阶', root: 'A', formula: 'blues',
    description: '1-b3-4-b5-5-b7 (五声小调+蓝调音)',
  },
  'e_blues': {
    name: 'E布鲁斯音阶', root: 'E', formula: 'blues',
    description: '1-b3-4-b5-5-b7',
  },
};
